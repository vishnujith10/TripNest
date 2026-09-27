import { pgTable, uuid, text, doublePrecision, jsonb, timestamp, index } from 'drizzle-orm/pg-core';
import { geometryPoint } from './custom-types';

export const stays = pgTable(
  'stays',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    address: text('address'),
    location: geometryPoint('location').notNull(),
    rating: doublePrecision('rating').default(0),
    priceEst: doublePrecision('price_est').default(0),
    amenities: text('amenities').array(),
    contactInfo: jsonb('contact_info'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    locationIdx: index('stays_location_idx').using('gist', table.location),
  })
);

export type Stay = typeof stays.$inferSelect;
export type NewStay = typeof stays.$inferInsert;
