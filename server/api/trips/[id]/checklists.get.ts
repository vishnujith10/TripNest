import { defineEventHandler, getRouterParam, createError } from 'h3';
import { db } from '../../../utils/db';
import { checklists } from '../../../database/schema/checklists';
import { places } from '../../../database/schema/places';
import { stays } from '../../../database/schema/stays';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const tripId = getRouterParam(event, 'id');

  if (!tripId) {
    throw createError({ statusCode: 400, statusMessage: 'Trip ID required' });
  }

  let items: any[] = [];
  try {
    items = await db
      .select({
        id: checklists.id,
        tripId: checklists.tripId,
        type: checklists.type,
        title: checklists.title,
        isCompleted: checklists.isCompleted,
        linkedPlaceId: checklists.linkedPlaceId,
        linkedStayId: checklists.linkedStayId,
        place: {
          id: places.id,
          name: places.name,
          category: places.category,
        },
        stay: {
          id: stays.id,
          name: stays.name,
          address: stays.address,
        },
      })
      .from(checklists)
      .leftJoin(places, eq(checklists.linkedPlaceId, places.id))
      .leftJoin(stays, eq(checklists.linkedStayId, stays.id))
      .where(eq(checklists.tripId, tripId));
  } catch (err: any) {
    items = [];
  }

  // Categorize items into 3 Kanban columns: bucket_place, stay_shortlist, prep_task
  const categorized = {
    bucketPlaces: items.filter((i) => i.type === 'bucket_place'),
    stayShortlist: items.filter((i) => i.type === 'stay_shortlist'),
    prepTasks: items.filter((i) => i.type === 'prep_task'),
  };

  return {
    success: true,
    data: categorized,
  };
});
