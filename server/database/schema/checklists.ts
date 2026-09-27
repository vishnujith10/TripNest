import { pgTable, uuid, text, boolean } from 'drizzle-orm/pg-core';
import { trips } from './trips';
import { places } from './places';
import { stays } from './stays';

export const checklists = pgTable('checklists', {
  id: uuid('id').defaultRandom().primaryKey(),
  tripId: uuid('trip_id').references(() => trips.id, { onDelete: 'cascade' }).notNull(),
  type: text('type', { enum: ['bucket_place', 'stay_shortlist', 'prep_task'] }).notNull(),
  title: text('title').notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  linkedPlaceId: uuid('linked_place_id').references(() => places.id, { onDelete: 'set null' }),
  linkedStayId: uuid('linked_stay_id').references(() => stays.id, { onDelete: 'set null' }),
});

export type ChecklistItem = typeof checklists.$inferSelect;
export type NewChecklistItem = typeof checklists.$inferInsert;
