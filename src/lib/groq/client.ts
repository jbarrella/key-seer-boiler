import Groq from 'groq-sdk';

import type { SearchType } from '@/components/keyword-discovery/types';

import { systemPrompts } from './config';

export default class GroqClient {
  private client: Groq;

  constructor(apiKey: string) {
    this.client = new Groq({ apiKey });
  }

  async getCompletion(
    searchType: SearchType,
    prompt: string,
    nWords: number,
  ): Promise<string> {
    const template = systemPrompts[searchType];
    // console.log(template);

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
        model: 'llama3-8b-8192',
        response_format: { type: 'json_object' },
        // model: 'llama-3.1-8b-instant'  // more intelligent, but slower
      });

      return completion.choices[0].message.content;
    } catch (error) {
      // console.error('Error getting completion:', error);
      return '';
      // throw error;
    }
  }
}
