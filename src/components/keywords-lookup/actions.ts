'use server';

import GoogleAdwordsClient from '@/lib/google-adwords/client';
import { checkUsage, incrementUsage } from '@/utils/usageLimits';

const googleAdwordsClient = new GoogleAdwordsClient(
  process.env.NEXT_PUBLIC_G_CUSTOMER_ID,
  process.env.G_DEVELOPER_TOKEN,
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  process.env.G_REFERSH_TOKEN,
);

export async function getKeywordHistoricalMetrics(terms: string[], countryId: string) {
  await checkUsage('KEYWORDS_LOOKUP');

  const metrics = await googleAdwordsClient.getKeywordHistoricalMetrics(
    terms,
    countryId,
  );

  await incrementUsage('KEYWORDS_LOOKUP');

  return metrics;
}
