import { Worker, Queue } from 'bullmq';
import { AIService } from '../services/ai.service';
import { io, prisma } from '../index';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const aiQueue = new Queue('ai-responses', { connection });

const worker = new Worker('ai-responses', async (job) => {
  const { ticketId, userMessage, tenantId } = job.data;
  
  // 1. Generate AI response
  const botResponse = await AIService.generateResponse(ticketId, userMessage, tenantId);
  
  // 2. Save to database
  const message = await prisma.message.create({
    data: {
      content: botResponse,
      ticketId,
      isBot: true
    }
  });

  // 3. Emit via Socket.io
  io.to(ticketId).emit('new_message', message);
  
  // 4. Update ticket status/sentiment if needed
  const sentiment = await AIService.analyzeSentiment(userMessage);
  await prisma.ticket.update({
    where: { id: ticketId },
    data: { 
      metadata: { 
        sentiment,
        lastAiInteraction: new Date().toISOString()
      }
    }
  });

}, { connection });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`${job?.id} failed with ${err.message}`);
});
