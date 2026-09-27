import { pgTable, uuid, text, doublePrecision, integer, jsonb, timestamp, index } from 'drizzle-orm/pg-core';
import { geometryPoint } from './custom-types';

export const places = pgTable(
  'places',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    category: text('category').notNull(),
    address: text('address'),
    location: geometryPoint('location').notNull(),
    rating: doublePrecision('rating').default(0),
    priceTier: integer('price_tier').default(1),
    openingHours: jsonb('opening_hours'),
    coverImage: text('cover_image'),
    images: jsonb('images').$type<string[]>(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    locationIdx: index('places_location_idx').using('gist', table.location),
    categoryIdx: index('places_category_idx').on(table.category),
  })
);

export type Place = typeof places.$inferSelect;
export type NewPlace = typeof places.$inferInsert;
