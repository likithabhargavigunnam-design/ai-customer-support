const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe('CREATE EXTENSION IF NOT EXISTS vector;');
    console.log('pgvector extension enabled successfully');
  } catch (e) {
    console.error('Failed to enable pgvector:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
