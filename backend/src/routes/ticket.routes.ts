import { Router } from 'express';
import { prisma } from '../index';
import { aiQueue } from '../utils/ai.worker';

const router = Router();

router.post('/', async (req: any, res) => {
  const { subject, userId } = req.body;
  const ticket = await prisma.ticket.create({
    data: { 
      subject, 
      createdById: userId,
      tenantId: req.tenantId
    }
  });
  res.json(ticket);
});

router.get('/', async (req: any, res) => {
  const tickets = await prisma.ticket.findMany({
    where: { tenantId: req.tenantId },
    include: { createdBy: true, assignedTo: true }
  });
  res.json(tickets);
});

router.get('/:id', async (req: any, res) => {
  const ticket = await prisma.ticket.findUnique({
    where: { 
      id: req.params.id,
      tenantId: req.tenantId
    },
    include: { messages: { orderBy: { createdAt: 'asc' } } }
  });
  res.json(ticket);
});

router.post('/:id/messages', async (req: any, res) => {
  const { content, userId } = req.body;
  
  // Verify ticket belongs to tenant
  const ticket = await prisma.ticket.findUnique({
    where: { id: req.params.id, tenantId: req.tenantId }
  });

  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

  const message = await prisma.message.create({
    data: { content, ticketId: req.params.id, senderId: userId }
  });

  // Queue AI response
  await aiQueue.add('generate-ai-response', {
    ticketId: req.params.id,
    userMessage: content,
    tenantId: req.tenantId
  });

  res.json(message);
});

export default router;
