import { defineEventHandler } from 'h3';
import { db } from '../../utils/db';
import { trips } from '../../database/schema/trips';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async () => {
  let userTrips: any[] = [];
  try {
    userTrips = await db.select().from(trips).orderBy(desc(trips.createdAt)).limit(50);
  } catch (err: any) {
    userTrips = [];
  }

  return {
    success: true,
    data: userTrips,
  };
});
