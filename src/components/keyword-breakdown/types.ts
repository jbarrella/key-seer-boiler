import type { KeywordMetrics } from '@/lib/google-adwords/types';
import type { Completion } from '@/lib/google-autocomplete/types';

export interface ModifierTerm {
  text: string;
  completions: Completion[];
}

export interface Category {
  title: 'questions' | 'comparisons' | 'prepositions';
  modifierTerms: ModifierTerm[];
}

export interface CompletionsData {
  baseCompletions: Completion[];
  categories: Category[];
}

export interface AutocompleteData {
  baseTerm: string;
  completions: CompletionsData;
  keywordMetricsLookup: Record<string, KeywordMetrics>;
}

export interface TrendsData {
  interestOverTime: InterestOverTimeDataPoint[];
  interestByRegion: Region[];
}

export interface Region {
  geoName: string;
  interest: number;
}

export interface InterestOverTimeDataPoint {
  time: string;
  formattedTime: string;
  formattedAxisTime: string;
  value: number[];
  formattedValue: string[];
}
