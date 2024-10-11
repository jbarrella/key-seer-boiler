import { SearchType } from '@/components/keyword-discovery/types';

const instructionSuffix = 'Return only a JSON array of strings and nothing more.';
const nKeywords = 20;

export const systemPrompts: Record<
  SearchType,
  (term: string, nWords: number) => string
> = {
  [SearchType.LEFT_ANCHORED]: (term: string, nWords: number) =>
    `generate exactly ${nKeywords} random SEO long-tail keywords of ${nWords} words each that would make sense if the first word was "${term}". ${instructionSuffix}`,
  [SearchType.RIGHT_ANCHORED]: (term: string, nWords: number) =>
    `generate exactly ${nKeywords} random SEO long-tail keywords of ${nWords} words each that would make sense if the last word was "${term}". ${instructionSuffix}`,
  [SearchType.AROUND]: (term: string, nWords: number) =>
    `generate exactly ${nKeywords} random SEO long-tail keywords of ${nWords} words each that relate to "${term}". ${instructionSuffix}`,
  [SearchType.TOPIC]: (term: string, nWords: number) =>
    `generate exactly ${nKeywords} random SEO long-tail keywords of ${nWords} words each that relate to the following topic: "${term}". ${instructionSuffix}`,
};
