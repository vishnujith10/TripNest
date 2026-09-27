import { defineEventHandler, getRouterParam, createError } from 'h3';
import { db } from '../../../utils/db';
import { trips } from '../../../database/schema/trips';
import { tripDays } from '../../../database/schema/trip_days';
import { itineraryItems } from '../../../database/schema/itinerary_items';
import { places } from '../../../database/schema/places';
import { eq, asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const tripId = getRouterParam(event, 'id');

  if (!tripId) {
    throw createError({ statusCode: 400, statusMessage: 'Trip ID is required' });
  }

  let trip: any = null;
  let days: any[] = [];

  try {
    const tripRows = await db.select().from(trips).where(eq(trips.id, tripId)).limit(1);
    trip = tripRows[0] || null;

    if (trip) {
      const dayRows = await db.select().from(tripDays).where(eq(tripDays.tripId, tripId)).orderBy(asc(tripDays.dayNumber));

      days = await Promise.all(
        dayRows.map(async (day) => {
          const items = await db
            .select({
              id: itineraryItems.id,
              tripDayId: itineraryItems.tripDayId,
              placeId: itineraryItems.placeId,
              customTitle: itineraryItems.customTitle,
              orderIndex: itineraryItems.orderIndex,
              startTime: itineraryItems.startTime,
              durationMinutes: itineraryItems.durationMinutes,
              notes: itineraryItems.notes,
              isCompleted: itineraryItems.isCompleted,
              place: {
                id: places.id,
                name: places.name,
                category: places.category,
                location: places.location,
                coverImage: places.coverImage,
              },
            })
            .from(itineraryItems)
            .leftJoin(places, eq(itineraryItems.placeId, places.id))
            .where(eq(itineraryItems.tripDayId, day.id))
            .orderBy(asc(itineraryItems.orderIndex));

          // Extract route coordinates for mapping timeline
          const routeCoordinates = items
            .filter((item) => item.place && item.place.location)
            .map((item) => item.place!.location);

          return {
            ...day,
            items,
            routeCoordinates,
          };
        })
      );
    }
  } catch (err: any) {
    // Graceful error fallback
  }

  if (!trip) {
    throw createError({ statusCode: 404, statusMessage: 'Trip not found' });
  }

  return {
    success: true,
    data: {
      ...trip,
      days,
    },
  };
});
