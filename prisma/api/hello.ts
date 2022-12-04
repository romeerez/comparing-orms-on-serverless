import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const users = await prisma.user.findMany();
    response.status(200).json({ users });
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
}
