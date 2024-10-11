import OpenAI from 'openai';

import type { SearchType } from '@/components/keyword-discovery/types';

import { systemPrompts } from '../groq/config';

export default class OpenAIClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async getCompletion(
    searchType: SearchType,
    prompt: string,
    nWords: number,
  ): Promise<string> {
    const template = systemPrompts[searchType];

    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that follows instructions carefully and generates SEO keywords in JSON format.`,
          },
          {
            role: 'user',
            content: template(prompt, nWords),
          },
        ],
        model: 'gpt-4o-mini',
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error getting completion:', error);
      return '';
      // throw error;
    }
  }
}
