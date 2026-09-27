import { defineEventHandler, getRouterParam, createError } from 'h3';
import { db } from '../../../utils/db';
import { tripMemories } from '../../../database/schema/trip_memories';
import { places } from '../../../database/schema/places';
import { eq, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const tripId = getRouterParam(event, 'id');

  if (!tripId) {
    throw createError({ statusCode: 400, statusMessage: 'Trip ID is required' });
  }

  let memories: any[] = [];
  try {
    memories = await db
      .select({
        id: tripMemories.id,
        tripId: tripMemories.tripId,
        placeId: tripMemories.placeId,
        mediaUrl: tripMemories.mediaUrl,
        caption: tripMemories.caption,
        loggedAt: tripMemories.loggedAt,
        location: tripMemories.location,
        place: {
          id: places.id,
          name: places.name,
        },
      })
      .from(tripMemories)
      .leftJoin(places, eq(tripMemories.placeId, places.id))
      .where(eq(tripMemories.tripId, tripId))
      .orderBy(desc(tripMemories.loggedAt));
  } catch (err: any) {
    memories = [];
  }

  return {
    success: true,
    data: memories,
  };
});
