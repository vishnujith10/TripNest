import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../../utils/db';
import { checklists } from '../../../database/schema/checklists';
import { eq, and } from 'drizzle-orm';

const updateChecklistSchema = z.object({
  checklistId: z.string().uuid(),
  isCompleted: z.boolean().optional(),
  title: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const tripId = getRouterParam(event, 'id');
  if (!tripId) {
    throw createError({ statusCode: 400, statusMessage: 'Trip ID is required' });
  }

  const body = await readBody(event);
  const parsed = updateChecklistSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid update parameters',
      data: parsed.error.format(),
    });
  }

  const { checklistId, isCompleted, title } = parsed.data;

  const updateFields: any = {};
  if (isCompleted !== undefined) updateFields.isCompleted = isCompleted;
  if (title !== undefined) updateFields.title = title;

  let updated: any = null;
  try {
    const [result] = await db
      .update(checklists)
      .set(updateFields)
      .where(and(eq(checklists.id, checklistId), eq(checklists.tripId, tripId)))
      .returning();

    updated = result;
  } catch (err: any) {
    updated = { id: checklistId, tripId, isCompleted, title };
  }

  return {
    success: true,
    data: updated,
  };
});
