export interface KeywordMetrics {
  term: string;
  monthlySearchVolume: number;
  cpc: number;
  competitionIndex: number;
  chart: {
    month: string;
    year: string;
    monthlySearches: number;
  }[];
}
