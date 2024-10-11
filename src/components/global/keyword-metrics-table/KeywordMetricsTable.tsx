import type {
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { KeywordMetrics } from '../../../lib/google-adwords/types';
import SortableColumnHeader from './SortableColumnHeader';
import { formatDollarAmount, formatNumber } from './utils';

interface KeywordMetricsTableProps {
  keywords: KeywordMetrics[];
  baseTerm?: string;
}

export default function KeywordMetricsTable({
  keywords,
  baseTerm,
}: KeywordMetricsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'monthlySearchVolume', desc: true },
  ]);

  console.log('rendering KeywordMetricsTable');

  const getCompetitionIndexColor = (ci: number) => {
    if (!ci) {
      return 'bg-gray-500';
    }
    if (ci <= 14) {
      return 'bg-green-500';
    }
    if (ci <= 28) {
      return 'bg-lime-500';
    }
    if (ci <= 42) {
      return 'bg-yellow-500';
    }
    if (ci <= 56) {
      return 'bg-amber-500';
    }
    if (ci <= 70) {
      return 'bg-orange-500';
    }
    if (ci <= 84) {
      return 'bg-red-500';
    }
    return 'bg-pink-500';
  };

  const columns: ColumnDef<KeywordMetrics>[] = [
    {
      accessorKey: 'term',
      header: 'Term',
      cell: ({ row }) => {
        const term = row.original.term;
        return (
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(term)}`}
            className="hover:underline"
          >
            {row.original.term.split(' ').map((word, index) => {
              if (!baseTerm) {
                return <span key={index}>{`${word} `}</span>;
              }
              const baseTerms = baseTerm.split(' ');
              const isBaseTerm = baseTerms.includes(word);
              return (
                <span
                  key={index}
                  className={!isBaseTerm ? 'font-semibold' : 'text-gray-500'}
                >
                  {`${word} `}
                </span>
              );
            })}
          </a>
        );
      },
    },
    {
      accessorKey: 'monthlySearchVolume',
      header: ({ column }) => {
        return <SortableColumnHeader column={column} columnTitle="Search Volume" />;
      },
      cell: ({ row }) => formatNumber(row.original.monthlySearchVolume),
      sortUndefined: 'last',
    },
    {
      accessorKey: 'cpc',
      header: ({ column }) => {
        return <SortableColumnHeader column={column} columnTitle="CPC ($)" />;
      },
      cell: ({ row }) => formatDollarAmount(row.original.cpc),
      sortUndefined: 'last',
    },
    {
      accessorKey: 'competitionIndex',
      header: ({ column }) => {
        return (
          <SortableColumnHeader
            column={column}
            columnTitle="KD"
            tooltipContent="Keyword Difficulty: A measure of the difficulty of ranking for a keyword. Calculated by dividing the average CPC by the search volume. Lower index means easier to rank."
          />
        );
      },
      cell: ({ row }) => {
        const ci = row.original.competitionIndex;
        return (
          <span
            className={`rounded px-2 py-1 text-white ${getCompetitionIndexColor(ci)}`}
          >
            {formatNumber(ci)}
          </span>
        );
      },
      sortUndefined: 'last',
    },
  ];

  const table = useReactTable({
    data: keywords,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  className={header.id != 'term' ? 'text-center' : ''}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className={cell.column.id !== 'term' ? 'text-center' : ''}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <span className="text-sm text-gray-700">
          Page
          {' '}
          {table.getState().pagination.pageIndex + 1}
          {' '}
          of
          {' '}
          {table.getPageCount()}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
