import { formatNumber } from '@/components/global/keyword-metrics-table/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface KeywordCardProps {
  keyword: string;
  relevance: number;
  volume: number;
  cpc: number | string | null;
  competition: number | string;
}

export default function Component({
  keyword,
  relevance,
  volume,
  cpc,
  competition,
}: KeywordCardProps) {
  function getColor(value: number) {
    if (value > 1000) {
      return 'bg-orange-700';
    }
    if (value > 700) {
      return 'bg-orange-600';
    }
    if (value > 400) {
      return 'bg-orange-500';
    }
    if (value > 200) {
      return 'bg-orange-400';
    }
    return 'bg-orange-300';
  }

  const formatCPC = (cpc: number | string | null) => {
    if (typeof cpc === 'number') {
      return `$${formatNumber(cpc)}`;
    }
    return '-';
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="mb-2 flex flex-row justify-between text-wrap">
          <h3 className="text-wrap text-sm font-semibold" title={keyword}>
            {keyword}
          </h3>
          <span className="ml-2 text-xs font-semibold text-gray-500">{relevance}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={`${getColor(volume)} text-xs text-white`}>
            Vol:
            {' '}
            {formatNumber(volume)}
          </Badge>
          <Badge variant="outline" className="bg-slate-500 text-xs text-white">
            CPC:
            {' '}
            {formatCPC(cpc)}
          </Badge>
          <Badge variant="outline" className="bg-slate-500 text-xs text-white">
            CI:
            {' '}
            {formatNumber(competition)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
