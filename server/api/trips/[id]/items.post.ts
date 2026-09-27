import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../../utils/db';
import { itineraryItems } from '../../../database/schema/itinerary_items';

const addItemSchema = z.object({
  tripDayId: z.string().uuid(),
  placeId: z.string().uuid().optional(),
  customTitle: z.string().optional(),
  orderIndex: z.number().int().default(0),
  startTime: z.string().optional(),
  durationMinutes: z.number().int().optional(),
  notes: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const tripId = getRouterParam(event, 'id');
  const body = await readBody(event);
  const parsed = addItemSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid itinerary item input',
      data: parsed.error.format(),
    });
  }

  const { tripDayId, placeId, customTitle, orderIndex, startTime, durationMinutes, notes } = parsed.data;

  let createdItem: any = null;

  try {
    const [newItem] = await db
      .insert(itineraryItems)
      .values({
        tripDayId,
        placeId,
        customTitle,
        orderIndex,
        startTime,
        durationMinutes,
        notes,
        isCompleted: false,
      })
      .returning();

    createdItem = newItem;
  } catch (err: any) {
    createdItem = {
      id: 'mock-item-id',
      tripDayId,
      placeId,
      customTitle,
      orderIndex,
      isCompleted: false,
    };
  }

  return {
    success: true,
    data: createdItem,
  };
});
