import { orchidORM, createModel } from 'orchid-orm';
import { columnTypes } from "pqb";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is missing')
}

const Model = createModel({
  columnTypes,
});

class User extends Model {
  table = 'user'
  columns = this.setColumns((t) => ({
    id: t.serial().primaryKey(),
    name: t.text(0, 255),
    email: t.text(0, 255),
  }))
}

const db = orchidORM({
  connectionString,
  ssl: true,
}, {
  user: User
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const users = await db.user;
    response.status(200).json({ users });
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
}
