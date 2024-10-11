import type { Dispatch, SetStateAction } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { GLOBAL_LABEL } from '../global/constants';
import PendingButton from '../global/PendingButton';
import { Input } from '../ui/input';
import { COUNTRIES } from './constants';

interface KeywordBreakdownInputFormProps {
  setCountryName: Dispatch<SetStateAction<string>>;
  loadBreakdown: (formData: FormData) => Promise<void>;
}

export default function KeywordBreakdownInputForm({
  setCountryName,
  loadBreakdown,
}: KeywordBreakdownInputFormProps) {
  return (
    <form action={loadBreakdown} className="flex w-full flex-col gap-4">
      <Input
        className="w-full border-2 bg-white p-2"
        name="searchTerm"
        type="text"
        placeholder="e.g. Paris Olympics"
      />
      <div className="flex flex-row gap-4">
        <Select
          onValueChange={(countryName) => {
            setCountryName(countryName);
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
        <PendingButton />
      </div>
    </form>
  );
}
