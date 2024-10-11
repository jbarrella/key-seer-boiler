'use server';

import GoogleAdwordsClient from '@/lib/google-adwords/client';
import type { KeywordMetrics } from '@/lib/google-adwords/types';
import {
  generateCompletionsForTerm,
  generateCompletionsWithOutsideOperator,
  generateCompletionsWithPrefix,
} from '@/lib/google-autocomplete/utils';

import {
  COMPARISON_OPERATORS,
  COUNTRIES,
  PREPOSITIONS,
  QUESTION_PREFIXES,
} from '../constants';
import type { AutocompleteData, Category, CompletionsData, ModifierTerm } from '../types';
import {
  filterCompletionsContainingWords,
  flattenCompletions,
  removeDuplicates,
} from '../utils';

const googleAdwordsClient = new GoogleAdwordsClient(
  process.env.NEXT_PUBLIC_G_CUSTOMER_ID,
  process.env.G_DEVELOPER_TOKEN,
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  process.env.G_REFERSH_TOKEN,
);

async function getQuestions(
  term: string,
  countryCode?: string,
): Promise<ModifierTerm[]> {
  const calls: Promise<ModifierTerm>[] = [];

  QUESTION_PREFIXES.forEach((prefix) => {
    calls.push(
      generateCompletionsWithPrefix(term, prefix, countryCode).then((completions) => {
        return {
          text: prefix,
          completions: removeDuplicates(
            filterCompletionsContainingWords(completions, [prefix, term]),
          ),
        };
      }),
    );
  });

  return Promise.all(calls);
}

async function getComparisons(
  term: string,
  countryCode?: string,
): Promise<ModifierTerm[]> {
  const calls: Promise<ModifierTerm>[] = [];

  COMPARISON_OPERATORS.forEach((op) => {
    calls.push(
      generateCompletionsWithOutsideOperator(term, op, countryCode).then(
        (completions) => {
          return {
            text: op,
            completions: removeDuplicates(
              filterCompletionsContainingWords(completions, [op, term]),
            ),
          };
        },
      ),
    );
  });

  return Promise.all(calls);
}

async function getPrepositions(
  term: string,
  countryCode?: string,
): Promise<ModifierTerm[]> {
  const calls: Promise<ModifierTerm>[] = [];

  PREPOSITIONS.forEach((prep) => {
    calls.push(
      generateCompletionsWithPrefix(term, prep, countryCode).then((completions) => {
        return {
          text: prep,
          completions: removeDuplicates(completions),
        };
      }),
    );
  });

  return Promise.all(calls);
}

async function getCategoryCompletions(
  term: string,
  countryCode?: string,
): Promise<Category[]> {
  const [questions, comparisons, prepositions] = await Promise.all([
    getQuestions(term, countryCode),
    getComparisons(term, countryCode),
    getPrepositions(term, countryCode),
  ]);

  return [
    {
      title: 'questions',
      modifierTerms: questions,
    },
    {
      title: 'comparisons',
      modifierTerms: comparisons,
    },
    {
      title: 'prepositions',
      modifierTerms: prepositions,
    },
  ];
}

async function getCompletions(
  term: string,
  countryCode?: string,
): Promise<CompletionsData> {
  const baseCompletions = await generateCompletionsForTerm(term, countryCode);
  const categories = await getCategoryCompletions(term, countryCode);

  return {
    baseCompletions,
    categories,
  };
}

function baseTermHasMetrics(
  keywordMetrics: KeywordMetrics[],
  baseTerm: string,
): boolean {
  return !!keywordMetrics.find((k: KeywordMetrics) => k.term === baseTerm)
    ?.monthlySearchVolume;
}

export async function getAutocompleteData(
  baseTerm: string,
  countryName?: string,
): Promise<AutocompleteData> {
  const { code: countryCode = null, id: countryId = null }
    = COUNTRIES[countryName] || {};

  const completions = await getCompletions(baseTerm, countryCode);

  const allTerms = [baseTerm, ...flattenCompletions(completions)];
  const keywordMetrics = await googleAdwordsClient.getKeywordHistoricalMetrics(
    allTerms,
    countryId,
  );

  if (!baseTermHasMetrics(keywordMetrics, baseTerm)) {
    throw new Error('No data found for base term');
  }

  const keywordMetricsLookup = keywordMetrics.reduce(
    (acc: Record<string, KeywordMetrics>, curr: KeywordMetrics) => {
      acc[curr.term] = curr;
      return acc;
    },
    {},
  );

  return {
    baseTerm,
    completions,
    keywordMetricsLookup,
  };
}
