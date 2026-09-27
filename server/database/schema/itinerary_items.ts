import { pgTable, uuid, text, integer, boolean } from 'drizzle-orm/pg-core';
import { tripDays } from './trip_days';
import { places } from './places';

export const itineraryItems = pgTable('itinerary_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  tripDayId: uuid('trip_day_id').references(() => tripDays.id, { onDelete: 'cascade' }).notNull(),
  placeId: uuid('place_id').references(() => places.id, { onDelete: 'set null' }),
  customTitle: text('custom_title'),
  orderIndex: integer('order_index').notNull(),
  startTime: text('start_time'),
  durationMinutes: integer('duration_minutes'),
  notes: text('notes'),
  isCompleted: boolean('is_completed').default(false).notNull(),
});

export type ItineraryItem = typeof itineraryItems.$inferSelect;
export type NewItineraryItem = typeof itineraryItems.$inferInsert;
