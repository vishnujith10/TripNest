import { sql, SQL } from 'drizzle-orm';

export interface LocationParams {
  lat: number;
  lng: number;
  radiusKm: number;
}

/**
 * Generates PostGIS ST_DWithin SQL expression for distance filtering.
 * Uses geography casting for accurate meter-based spatial search.
 */
export function postgisWithinRadius(tableLocationColumn: any, lat: number, lng: number, radiusKm: number): SQL {
  const radiusMeters = radiusKm * 1000;
  return sql`ST_DWithin(
    ${tableLocationColumn}::geography,
    ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
    ${radiusMeters}
  )`;
}

/**
 * Generates PostGIS ST_Distance SQL expression in kilometers.
 */
export function postgisDistanceKm(tableLocationColumn: any, lat: number, lng: number): SQL<number> {
  return sql<number>`ST_Distance(
    ${tableLocationColumn}::geography,
    ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
  ) / 1000.0`;
}

/**
 * Haversine formula calculation in pure TypeScript for unit tests and fallback distance validation.
 */
export function calculateHaversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}
