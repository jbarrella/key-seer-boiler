import { BarChart } from '@/components/charts/BarChat';
import {
  formatDollarAmount,
  formatNumber,
} from '@/components/global/keyword-metrics-table/utils';

import { Badge } from '../ui/badge';
import type { AutocompleteData } from './types';

export default function Overview({ data }: { data: AutocompleteData }) {
  console.log('rendering Overview');

  const keywordLookup = data.keywordMetricsLookup;

  // https://coolors.co/9333e9-290628-dcedff-94b0da-f9564f
  // https://coolors.co/9333e9-b1ddf1-614344-332c23-fd3e81
  return (
    <div className="flex w-full flex-row gap-6 pt-6 max-sm:flex-col">
      <div className="flex min-w-[250px] flex-col justify-center gap-2 rounded-xl bg-white p-8">
        <h2 className="mb-5 rounded-lg border bg-white p-2 text-center text-4xl font-semibold">
          {data.baseTerm}
        </h2>
        <Badge variant="outline" className="bg-[#f35b04] text-sm text-white">
          Volume:
          {' '}
          {formatNumber(keywordLookup[data.baseTerm]?.monthlySearchVolume)}
        </Badge>
        <Badge variant="outline" className="bg-[#7678ed] text-sm text-white">
          CPC: $
          {formatDollarAmount(keywordLookup[data.baseTerm]?.cpc)}
        </Badge>
        <Badge variant="outline" className="bg-[#f7b801] text-sm text-white">
          Competition:
          {' '}
          {keywordLookup[data.baseTerm]?.competitionIndex}
        </Badge>
      </div>
      <BarChart
        className="h-[300px] rounded-xl bg-white p-8"
        data={keywordLookup[data.baseTerm]?.chart}
        index="month"
        categories={['monthlySearches']}
        tickGap={25}
        yAxisLabel="Search Volume"
        showLegend={false}
        yAxisWidth={100}
        valueFormatter={value => value.toLocaleString()}
      />
    </div>
  );
}
