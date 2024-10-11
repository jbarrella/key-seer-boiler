'use server';

import GoogleAdwordsClient from '@/lib/google-adwords/client';
// import GroqClient from '@/lib/groq/client';
import OpenAIClient from '@/lib/openai/client';

import type { DiscoveryData, SearchType } from './types';

// const groqClient = new GroqClient(process.env.GROQ_API_KEY);
const openaiClient = new OpenAIClient(process.env.OPENAI_API_KEY);
const googleAdwordsClient = new GoogleAdwordsClient(
  process.env.NEXT_PUBLIC_G_CUSTOMER_ID,
  process.env.G_DEVELOPER_TOKEN,
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  process.env.G_REFERSH_TOKEN,
);

export async function generateKeywords(
  searchType: SearchType,
  baseTerm: string,
  nWords: number,
): Promise<string[]> {
  // const response = await groqClient.getCompletion(searchType, baseTerm, nWords);
  const response = await openaiClient.getCompletion(searchType, baseTerm, nWords);
  return response.split(',');
}

export async function getDiscoveryData(
  searchType: SearchType,
  baseTerm: string,
  countryId: string,
): Promise<DiscoveryData> {
  const promises = [
    ...Array(20)
      .fill(null)
      .map(() => generateKeywords(searchType, baseTerm, 2)),
    ...Array(10)
      .fill(null)
      .map(() => generateKeywords(searchType, baseTerm, 3)),
    ...Array(5)
      .fill(null)
      .map(() => generateKeywords(searchType, baseTerm, 4)),
  ];
  const keywords = await Promise.all(promises);

  const keywordMetrics = await googleAdwordsClient.getKeywordHistoricalMetrics(
    keywords.flat(),
    countryId,
  );

  return { keywordMetrics };
}
