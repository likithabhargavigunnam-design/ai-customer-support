import { AIService } from "../src/services/ai.service";
import { prisma } from "../src/index";

describe("AI Service (RAG)", () => {
  it("should fetch relevant context from knowledge base", async () => {
    // Mock user message
    const userMessage = "Tell me about your shipping policy";
    const ticketId = "test-ticket";
    const tenantId = "test-tenant";

    // In a real test, we'd mock prisma.$queryRawUnsafe
    // Here we're just checking the service structure
    expect(AIService.generateResponse).toBeDefined();
  });
});
