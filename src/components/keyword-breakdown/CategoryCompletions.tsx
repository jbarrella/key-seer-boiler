'use client';

import { useState } from 'react';

import type { KeywordMetrics } from '@/lib/google-adwords/types';

import KeywordMetricsTable from '../global/keyword-metrics-table/KeywordMetricsTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import KeywordCard from './KeywordCard';
import type { AutocompleteData, Category } from './types';

export function CategoryCompletions({ data }: { data: AutocompleteData }) {
  const keywordLookup = data.keywordMetricsLookup;
  const [expandedItems, setExpandedItems] = useState<Record<string, string[]>>({});

  const handleAccordionChange = (category: string, value: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter(item => item !== value)
        : [...(prev[category] || []), value],
    }));
  };

  function buildTopCategoryCompletionsKeywordMetrics(
    category: Category,
  ): KeywordMetrics[] {
    return Object.values(keywordLookup).filter(k =>
      category.modifierTerms
        .flatMap(c => c.completions)
        .map(c => c.text)
        .includes(k.term),
    );
  }

  const renderTop10 = (category: Category) => (
    <div className="mb-6">
      <h3 className="mb-2 text-lg font-semibold">Top Results</h3>
      <KeywordMetricsTable
        keywords={buildTopCategoryCompletionsKeywordMetrics(category)}
        baseTerm={data.baseTerm}
      />
    </div>
  );

  const renderCategory = (category: Category) => (
    <div key={category.title} className="w-full rounded-xl bg-white p-8">
      <h2 className="mb-4 text-center text-2xl font-bold capitalize">
        {category.title}
      </h2>
      {renderTop10(category)}
      <h3 className="text-lg font-semibold">All Results</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.modifierTerms.map((modifier, index) => (
          <Accordion
            key={index}
            type="multiple"
            value={expandedItems[category.title] || []}
            onValueChange={value =>
              setExpandedItems(prev => ({ ...prev, [category.title]: value }))}
            className="w-full"
          >
            <AccordionItem value={`${category}-item-${index}`}>
              <AccordionTrigger
                onClick={() => handleAccordionChange(category.title, `item-${index}`)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="ml-2 text-lg font-semibold">{modifier.text}</span>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {modifier.completions.length}
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {modifier.completions.map((completion, index) => (
                    <KeywordCard
                      key={index}
                      keyword={completion.text}
                      relevance={completion.relevance}
                      volume={keywordLookup[completion.text]?.monthlySearchVolume}
                      cpc={keywordLookup[completion.text]?.cpc}
                      competition={keywordLookup[completion.text]?.competitionIndex}
                    />
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-6">
      {data.completions.categories.map(category => renderCategory(category))}
    </div>
  );
}
