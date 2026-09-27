import { defineEventHandler, getQuery, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../utils/db';
import { stays } from '../../database/schema/stays';
import { postgisWithinRadius, postgisDistanceKm } from '../../utils/geo';

const nearbySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  radiusKm: z.coerce.number().default(5),
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const parsed = nearbySchema.safeParse(query);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Latitude and longitude are required parameters',
      data: parsed.error.format(),
    });
  }

  const { lat, lng, radiusKm } = parsed.data;

  let results: any[] = [];
  try {
    results = await db
      .select({
        id: stays.id,
        name: stays.name,
        description: stays.description,
        address: stays.address,
        location: stays.location,
        rating: stays.rating,
        priceEst: stays.priceEst,
        amenities: stays.amenities,
        contactInfo: stays.contactInfo,
        distanceKm: postgisDistanceKm(stays.location, lat, lng),
      })
      .from(stays)
      .where(postgisWithinRadius(stays.location, lat, lng, radiusKm))
      .limit(30);
  } catch (err: any) {
    results = [];
  }

  return {
    success: true,
    data: results,
  };
});
