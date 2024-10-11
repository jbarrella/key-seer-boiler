'use client';

import { useState } from 'react';

import { getAutocompleteData } from './actions/autocomplete';
import { getTrends } from './actions/trends';
import { CategoryCompletions } from './CategoryCompletions';
import KeywordBreakdownInputForm from './InputForm';
import NoDataMessage from './NoDataMessage';
import Overview from './Overview';
import TopRelatedSearches from './TopRelatedSearches';
import TrendsAnalysis from './TrendsAnalysis';
import type { AutocompleteData, TrendsData } from './types';

export default function Breakdown() {
  const [countryName, setCountryName] = useState<string | null>(null);
  const [autocompleteData, setAutocompleteData] = useState<AutocompleteData | null>(
    null,
  );
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [dataFetchErrorOccurred, setDataFetchErrorOccurred] = useState<boolean>(false);

  async function loadBreakdown(formData: FormData) {
    const term = (formData.get('searchTerm') as string).toLowerCase();

    // Fetch autocomplete data
    getAutocompleteData(term, countryName)
      .then((data) => {
        // Trigger map loading animation
        setTrendsData(null);

        setAutocompleteData(data);
        setDataFetchErrorOccurred(false);
      })
      .catch((error) => {
        setDataFetchErrorOccurred(true);
        setAutocompleteData(null);
        console.error('Error fetching autocomplete data:', error);
      });

    // Fetch trends data
    getTrends(term, countryName)
      .then((trendsData) => {
        setTrendsData(trendsData);
      })
      .catch((error) => {
        console.error('Error fetching Google Trends data:', error);
      });
  }

  console.log('rendering Breakdown');

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="margined flex w-full flex-row justify-center lg:px-[20%]">
        <KeywordBreakdownInputForm
          setCountryName={setCountryName}
          loadBreakdown={loadBreakdown}
        />
      </div>
      {dataFetchErrorOccurred && <NoDataMessage />}
      <div className="mt-10 w-full bg-slate-100 pb-6">
        <div className="margined flex w-full flex-col gap-6">
          {autocompleteData && <Overview data={autocompleteData} />}
          {autocompleteData && <TopRelatedSearches data={autocompleteData} />}
          {autocompleteData && (
            <TrendsAnalysis data={trendsData} countryName={countryName} />
          )}
          {autocompleteData && <CategoryCompletions data={autocompleteData} />}
        </div>
      </div>
    </div>
  );
}
