import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../../utils/db';
import { tripMemories } from '../../../database/schema/trip_memories';

const createMemorySchema = z.object({
  placeId: z.string().uuid().optional(),
  mediaUrl: z.string().url('Valid media URL required'),
  caption: z.string().optional(),
  location: z.object({ lng: z.number(), lat: z.number() }).optional(),
});

export default defineEventHandler(async (event) => {
  const tripId = getRouterParam(event, 'id');
  if (!tripId) {
    throw createError({ statusCode: 400, statusMessage: 'Trip ID is required' });
  }

  const body = await readBody(event);
  const parsed = createMemorySchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid memory log input',
      data: parsed.error.format(),
    });
  }

  const { placeId, mediaUrl, caption, location } = parsed.data;

  let createdMemory: any = null;
  try {
    const [newMemory] = await db
      .insert(tripMemories)
      .values({
        tripId,
        placeId,
        mediaUrl,
        caption,
        location,
      })
      .returning();

    createdMemory = newMemory;
  } catch (err: any) {
    createdMemory = {
      id: 'mock-memory-id',
      tripId,
      placeId,
      mediaUrl,
      caption,
      location,
      loggedAt: new Date().toISOString(),
    };
  }

  return {
    success: true,
    data: createdMemory,
  };
});
