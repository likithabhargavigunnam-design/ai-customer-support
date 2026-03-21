import { Router } from 'express';
import { prisma } from '../index';
import { EmbeddingService } from '../services/embedding.service';

const router = Router();

router.post('/', async (req: any, res) => {
  const { title, content } = req.body;
  const embedding = await EmbeddingService.generateEmbedding(content);
  
  const vectorString = `[${embedding.join(',')}]`;
  
  // prisma.$executeRaw doesn't support vector types easily in template strings
  // We use raw query to insert
  await prisma.$executeRawUnsafe(`
    INSERT INTO "KnowledgeBaseItem" (id, title, content, embedding, "tenantId", "createdAt")
    VALUES ('${Math.random().toString(36).substring(7)}', '${title}', '${content}', cast('${vectorString}' as vector), '${req.tenantId}', now())
  `);

  res.json({ message: 'Knowledge base item added' });
});

router.get('/', async (req: any, res) => {
  const items = await prisma.knowledgeBaseItem.findMany({
    where: { tenantId: req.tenantId }
  });
  res.json(items);
});

export default router;
