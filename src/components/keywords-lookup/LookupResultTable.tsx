import { DefaultTooltip } from '@/components/global/DefaultTooltip';
import {
  formatDollarAmount,
  formatNumber,
} from '@/components/global/keyword-metrics-table/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { KeywordMetrics } from '../../lib/google-adwords/types';

interface SearchResultTableProps {
  results: KeywordMetrics[];
}

export default function LookupResultTable({ results }: SearchResultTableProps) {
  // TODO: Include variants
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Term</TableHead>
          <TableHead>Search Volume</TableHead>
          <TableHead>CPC ($)</TableHead>
          <TableHead>
            <div className="flex flex-row">
              <p className="mr-1">Competition Index</p>
              <DefaultTooltip content="Takes values from 0-100 and indicates how competitive ad placement is for the term. It is determined by the number of ad slots filled divided by the total number of ad slots available." />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map(item => (
          <TableRow key={item.term}>
            <TableCell>{item.term}</TableCell>
            <TableCell>{formatNumber(item.monthlySearchVolume)}</TableCell>
            <TableCell>{formatDollarAmount(item.cpc)}</TableCell>
            <TableCell>{formatNumber(item.competitionIndex)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
