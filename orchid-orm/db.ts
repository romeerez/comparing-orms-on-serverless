import 'dotenv/config';
import { rakeDb } from 'rake-db';
import path from 'path';

rakeDb({
  connectionString: process.env.DATABASE_URL as string,
  ssl: true,
}, {
  migrationsPath: path.resolve(__dirname, 'migrations'),
});