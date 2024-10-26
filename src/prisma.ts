import { PrismaClient, Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const NANO_ID_LENGTH = 10;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query'],
});

// Middleware for generating unique IDs
prisma.$use(async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>) => {
  if (params.model === 'Note' && params.action === 'create') {
    let isUnique = false;
    let uniqueID;

    // Generate a new ID until it's unique
    while (!isUnique) {
      uniqueID = nanoid(NANO_ID_LENGTH); // Adjust length as needed
      const existingRecord = await prisma.note.findUnique({
        where: { id: uniqueID },
      });
      if (!existingRecord) isUnique = true; // ID is unique
    }

    // Assign the unique ID to the new record
    params.args.data.id = uniqueID;
  }

  return next(params);
});

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
