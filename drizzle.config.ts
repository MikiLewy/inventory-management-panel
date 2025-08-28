'use server';

import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  out: './src/server/db/migrations',
  dialect: 'postgresql',
  schema: './src/server/db/schema',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
