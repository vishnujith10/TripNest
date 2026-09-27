import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { trips } from './trips';

export const tripDays = pgTable('trip_days', {
  id: uuid('id').defaultRandom().primaryKey(),
  tripId: uuid('trip_id').references(() => trips.id, { onDelete: 'cascade' }).notNull(),
  dayNumber: integer('day_number').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  title: text('title'),
});

export type TripDay = typeof tripDays.$inferSelect;
export type NewTripDay = typeof tripDays.$inferInsert;
