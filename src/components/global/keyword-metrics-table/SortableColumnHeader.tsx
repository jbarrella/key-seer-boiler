import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { DefaultTooltip } from '@/components/global/DefaultTooltip';
import { Button } from '@/components/ui/button';
import type { KeywordMetrics } from '@/lib/google-adwords/types';

interface SortableHeaderProps {
  column: Column<KeywordMetrics>;
  columnTitle: string;
  tooltipContent?: string;
}

export default function SortableColumnHeader({
  column,
  columnTitle,
  tooltipContent,
}: SortableHeaderProps) {
  const isSorted = column.getIsSorted();

  return (
    <div className="flex flex-row items-center justify-center">
      <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === 'asc')}>
        {columnTitle}
        {isSorted === 'asc' && <ArrowUp className="ml-2 size-4 stroke-red-400" />}
        {isSorted === 'desc' && <ArrowDown className="ml-2 size-4 stroke-green-400" />}
        {!isSorted && <ArrowUpDown className="ml-2 size-4" />}
      </Button>
      {tooltipContent && <DefaultTooltip content={tooltipContent} />}
    </div>
  );
}
