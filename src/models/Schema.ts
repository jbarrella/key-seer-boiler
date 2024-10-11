import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

export const Feature = pgEnum('feature', ['KEYWORDS_LOOKUP', 'KEYWORD_BREAKDOWN']);

export const userUsageDaily = pgTable('user_usage_daily', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  feature: Feature('feature').notNull(),
  usage: integer('usage').notNull(),
}, table => ({
  userFeatureUnique: uniqueIndex('user_feature_unique').on(table.userId, table.feature),
}));
