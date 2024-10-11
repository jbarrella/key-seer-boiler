import type { KeywordMetrics } from '@/lib/google-adwords/types';

import KeywordMetricsTable from '../global/keyword-metrics-table/KeywordMetricsTable';
import type { AutocompleteData } from './types';

export default function TopRelatedSearches({ data }: { data: AutocompleteData }) {
  const keywordLookup = data.keywordMetricsLookup;

  function buildTopRelatedSearchesKeywordMetrics(): KeywordMetrics[] {
    return Object.values(keywordLookup).filter(k =>
      data.completions.baseCompletions.map(c => c.text).includes(k.term),
    );
  }

  return (
    <div className="w-full rounded-xl bg-white p-8">
      <h2 className="mb-4 text-center text-2xl font-bold">Top Related Searches</h2>
      <KeywordMetricsTable
        keywords={buildTopRelatedSearchesKeywordMetrics()}
        baseTerm={data.baseTerm}
      />
    </div>
  );
}
