import axios from 'axios';
import { prisma } from '../index';
import { EmbeddingService } from './embedding.service';

export class AIService {
  private static apiKey = process.env.OPENAI_API_KEY;

  static async generateResponse(ticketId: string, userMessage: string, tenantId: string) {
    // 1. Semantic Search in Knowledge Base
    const embedding = await EmbeddingService.generateEmbedding(userMessage);
    
    // Prisma doesn't natively support vector similarity in findMany yet
    // We use raw query for vector search
    const vectorString = `[${embedding.join(',')}]`;
    const kbItems: any[] = await prisma.$queryRawUnsafe(`
      SELECT title, content, 1 - (embedding <=> cast('${vectorString}' as vector)) as similarity
      FROM "KnowledgeBaseItem"
      WHERE "tenantId" = '${tenantId}'
      ORDER BY similarity DESC
      LIMIT 3;
    `);

    const ragContext = kbItems
      .filter(item => item.similarity > 0.7)
      .map(item => `Context: ${item.title}\n${item.content}`)
      .join('\n\n');

    // 2. Fetch chat history
    const history = await prisma.message.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
      take: 10
    });

    const context = history.map(m => ({
      role: m.isBot ? 'assistant' : 'user',
      content: m.content
    }));

    // 2. Add current message
    context.push({ role: 'user', content: userMessage });

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-turbo',
          messages: [
            { 
              role: 'system', 
              content: `You are an elite customer support AI for SmartSupport. Use the following context if relevant to answer the user's question:\n\n${ragContext}` 
            },
            ...context
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm having trouble connecting to my brain. Please try again in a moment.";
    }
  }

  static async analyzeSentiment(content: string) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Analyze the sentiment of the following message. Respond with ONLY one word: POSITIVE, NEUTRAL, or NEGATIVE.' },
            { role: 'user', content }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      return 'NEUTRAL';
    }
  }
}
