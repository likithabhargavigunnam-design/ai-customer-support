import axios from 'axios';

export class EmbeddingService {
  private static apiKey = process.env.OPENAI_API_KEY;

  static async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/embeddings',
        {
          input: text,
          model: 'text-embedding-3-small'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data[0].embedding;
    } catch (error) {
      console.error('Embedding Service Error:', error);
      throw new Error('Failed to generate embedding');
    }
  }
}
