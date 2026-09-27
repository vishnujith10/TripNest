import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { trips } from './trips';
import { places } from './places';
import { geometryPoint } from './custom-types';

export const tripMemories = pgTable('trip_memories', {
  id: uuid('id').defaultRandom().primaryKey(),
  tripId: uuid('trip_id').references(() => trips.id, { onDelete: 'cascade' }).notNull(),
  placeId: uuid('place_id').references(() => places.id, { onDelete: 'set null' }),
  mediaUrl: text('media_url').notNull(),
  caption: text('caption'),
  loggedAt: timestamp('logged_at', { withTimezone: true }).defaultNow().notNull(),
  location: geometryPoint('location'),
});

export type TripMemory = typeof tripMemories.$inferSelect;
export type NewTripMemory = typeof tripMemories.$inferInsert;
