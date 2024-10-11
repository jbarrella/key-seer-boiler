import { Sparkles } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { COUNTRIES, GLOBAL_LABEL } from '../global/constants';
import PendingButton from '../global/PendingButton';
import { Input } from '../ui/input';
import { SearchType } from './types';

interface KeywordDiscoveryInputFormProps {
  setCountryId: Dispatch<SetStateAction<string>>;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
  loadDiscovery: (formData: FormData) => Promise<void>;
}

export default function KeywordDiscoveryInputForm({
  setCountryId,
  setSearchType,
  loadDiscovery,
}: KeywordDiscoveryInputFormProps) {
  return (
    <form action={loadDiscovery} className="flex w-full flex-col gap-4">
      <Input
        className="w-full border-2 bg-white p-2"
        name="searchTerm"
        type="text"
        placeholder="e.g. Paris Olympics"
      />
      <div className="flex flex-row gap-4">
        {/* TODO: Move this to a dedicated component */}
        <Select
          onValueChange={(countryId) => {
            setCountryId(countryId);
          }}
        >
          <SelectTrigger className="w-[210px] bg-white">
            <SelectValue placeholder={GLOBAL_LABEL} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>{GLOBAL_LABEL}</SelectItem>
            <SelectSeparator />
            {Object.keys(COUNTRIES).map(name => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(searchType) => {
            setSearchType(searchType as SearchType);
          }}
        >
          <SelectTrigger className="w-[210px] bg-white">
            <SelectValue placeholder="Left Anchored" />
          </SelectTrigger>
          <SelectContent>
            <SelectSeparator />
            {Object.entries(SearchType).map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <PendingButton
          className="h-[40px] grow bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white disabled:bg-gray-400"
          label={(
            <p className="flex flex-row">
              Generate
              <Sparkles className="ml-2 size-5" />
            </p>
          )}
        />
      </div>
    </form>
  );
}
