import OpenAI from 'openai';

export class AIAgentService {
  private openai: OpenAI;
  
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(userMessage: string, history: any[] = []) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: `You are a helpful Web3 assistant.` },
        ...history,
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  }
}

export const aiAgentService = new AIAgentService();