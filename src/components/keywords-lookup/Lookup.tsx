'use client';

import type { Tag } from 'emblor';
import { TagInput } from 'emblor';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { KeywordMetrics } from '../../lib/google-adwords/types';
import { CommonErrors } from '../global/CommonErrors';
import { COUNTRIES, GLOBAL_LABEL } from '../global/constants';
import KeywordMetricsTable from '../global/keyword-metrics-table/KeywordMetricsTable';
import PendingButton from '../global/PendingButton';
import type { ErrorType } from '../global/types';
import { getKeywordHistoricalMetrics } from './actions';
import { MAX_TAGS, TAG_X_PADDING } from './constants';

export default function Lookup() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [countryId, setCountryId] = useState<string | null>(null);
  const [searchData, setSearchData] = useState<KeywordMetrics[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);

  async function getTermsStats() {
    if (tags.length === 0) {
      console.warn('No search terms provided');
      return;
    }

    const terms = tags.map(tag => tag.text);
    try {
      const data = await getKeywordHistoricalMetrics(terms, countryId);
      setSearchData(data);
    } catch (error: any) {
      console.log('error in Lookup.tsx', error.message);
      setError(error.message as ErrorType);
    }
  }

  console.log('rendering Lookup');

  return (
    <div className="margined flex w-full flex-col items-center justify-center">
      <div className="mb-5 flex w-full flex-row justify-center">
        <form action={getTermsStats} className="flex w-full flex-col gap-4">
          <TagInput
            tags={tags}
            setTags={(newTags) => {
              setTags(newTags);
            }}
            maxTags={MAX_TAGS}
            showCount={true}
            placeholder="Add a term and hit enter"
            addTagsOnBlur={true}
            styleClasses={{
              inlineTagsContainer: 'p-3 flex flex-row flex-wrap min-h-[50px]',
              tag: {
                body: `flex items-center gap-2 rounded-xl h-full whitespace-nowrap ${TAG_X_PADDING}`,
                closeButton: `hover:text-red-600 pl-0 ${TAG_X_PADDING}`,
              },
              input: 'flex flex-grow px-0 shadow-none',
            }}
            activeTagIndex={activeTagIndex}
            setActiveTagIndex={(index) => {
              setActiveTagIndex(index);
            }}
          />
          <div className="flex flex-row gap-4">
            <Select
              onValueChange={(country) => {
                setCountryId(country);
              }}
            >
              <SelectTrigger className="w-[210px]">
                <SelectValue placeholder={GLOBAL_LABEL} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>{GLOBAL_LABEL}</SelectItem>
                <SelectSeparator />
                {Object.entries(COUNTRIES).map(([name, id]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <PendingButton />
          </div>
        </form>
      </div>
      {error && <CommonErrors error={error} />}
      {searchData.length > 0 && <KeywordMetricsTable keywords={searchData} />}
    </div>
  );
}
