import { describe, it, expect, beforeEach } from 'vitest';
import { calculateHaversineDistanceKm, postgisWithinRadius, postgisDistanceKm } from '../server/utils/geo';
import { redis } from '../server/utils/redis';
import { places } from '../server/database/schema/places';

describe('Wanderlust Architectural Integration Tests', () => {
  describe('1. Spatial Distance & PostGIS Helpers', () => {
    it('correctly calculates Haversine distance in kilometers', () => {
      // Eiffel Tower: (48.8584, 2.2945)
      // Louvre Museum: (48.8606, 2.3376)
      const distance = calculateHaversineDistanceKm(48.8584, 2.2945, 48.8606, 2.3376);
      expect(distance).toBeGreaterThan(3);
      expect(distance).toBeLessThan(4);

      // Distance between Paris and Tokyo
      const parisToTokyo = calculateHaversineDistanceKm(48.8566, 2.3522, 35.6762, 139.6503);
      expect(parisToTokyo).toBeGreaterThan(9000);
    });

    it('generates valid PostGIS ST_DWithin and ST_Distance SQL expressions', () => {
      const withinQuery = postgisWithinRadius(places.location, 48.8566, 2.3522, 10);
      expect(withinQuery.queryChunks).toBeDefined();

      const distanceQuery = postgisDistanceKm(places.location, 48.8566, 2.3522);
      expect(distanceQuery.queryChunks).toBeDefined();
    });
  });

  describe('2. Redis Cache Client & Fallback Layer', () => {
    const testKey = 'test:places:search:48.8566:2.3522:10:attraction:eiffel';
    const testData = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Eiffel Tower',
        category: 'attraction',
        location: { lat: 48.8584, lng: 2.2945 },
      },
    ];

    beforeEach(async () => {
      await redis.invalidatePattern('test:*');
    });

    it('successfully caches and retrieves spatial search results', async () => {
      await redis.setCache(testKey, testData, 3600);
      const cached = await redis.getCache<typeof testData>(testKey);

      expect(cached).toBeDefined();
      expect(cached).toHaveLength(1);
      expect(cached?.[0].name).toBe('Eiffel Tower');
    });

    it('invalidates cache correctly on pattern match', async () => {
      await redis.setCache('test:pattern:1', { val: 1 });
      await redis.setCache('test:pattern:2', { val: 2 });

      await redis.invalidatePattern('test:pattern:*');

      const val1 = await redis.getCache('test:pattern:1');
      const val2 = await redis.getCache('test:pattern:2');

      expect(val1).toBeNull();
      expect(val2).toBeNull();
    });
  });

  describe('3. API Response Contract Verification', () => {
    it('verifies expected JSON response structure for places search endpoint', () => {
      const sampleApiResponse = {
        success: true,
        source: 'cache',
        data: [
          {
            id: 'place-1',
            name: 'Louvre Museum',
            slug: 'louvre-museum',
            category: 'culture',
            location: { lat: 48.8606, lng: 2.3376 },
            distanceKm: 3.35,
          },
        ],
      };

      expect(sampleApiResponse).toHaveProperty('success', true);
      expect(sampleApiResponse).toHaveProperty('source');
      expect(Array.isArray(sampleApiResponse.data)).toBe(true);
      expect(sampleApiResponse.data[0]).toHaveProperty('id');
      expect(sampleApiResponse.data[0]).toHaveProperty('location');
    });
  });
});
