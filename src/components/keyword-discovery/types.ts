import type { KeywordMetrics } from '@/lib/google-adwords/types';

export interface DiscoveryData {
  keywordMetrics: KeywordMetrics[];
}

export enum SearchType {
  LEFT_ANCHORED = 'Left Anchored',
  RIGHT_ANCHORED = 'Right Anchored',
  AROUND = 'Around',
  TOPIC = 'Topic',
}
