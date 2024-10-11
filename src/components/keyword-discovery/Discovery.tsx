'use client';

import { useState } from 'react';

import KeywordMetricsTable from '../global/keyword-metrics-table/KeywordMetricsTable';
import NoDataMessage from '../keyword-breakdown/NoDataMessage';
import { getDiscoveryData } from './actions';
import KeywordDiscoveryInputForm from './InputForm';
import type { DiscoveryData, SearchType } from './types';

export default function Discovery() {
  const [searchType, setSearchType] = useState<SearchType | null>(null);
  const [countryId, setCountryId] = useState<string | null>(null);
  const [baseTerm, setBaseTerm] = useState<string | null>(null);
  const [discoveryData, setDiscoveryData] = useState<DiscoveryData | null>(null);
  const [dataFetchErrorOccurred, setDataFetchErrorOccurred] = useState<boolean>(false);

  async function loadDiscovery(formData: FormData) {
    const term = (formData.get('searchTerm') as string).toLowerCase();

    setBaseTerm(term);

    getDiscoveryData(searchType, term, countryId)
      .then((discoveryData) => {
        setDiscoveryData(discoveryData);
        setDataFetchErrorOccurred(false);
      })
      .catch((error) => {
        console.error('Error fetching Google Trends data:', error);
        setDataFetchErrorOccurred(true);
      });
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="margined flex w-full flex-row justify-center lg:px-[20%]">
        <KeywordDiscoveryInputForm
          setCountryId={setCountryId}
          setSearchType={setSearchType}
          loadDiscovery={loadDiscovery}
        />
      </div>
      {dataFetchErrorOccurred && <NoDataMessage />}
      <div className="margined mt-10 w-full bg-slate-100">
        {discoveryData && (
          <div className="my-6 w-full rounded-xl bg-white p-8">
            <p className="mb-4">
              Found
              {' '}
              <span className="rounded-md bg-stone-100 px-2 py-1 font-bold">
                {discoveryData.keywordMetrics.length}
              </span>
              {' '}
              results
            </p>
            <KeywordMetricsTable
              keywords={discoveryData.keywordMetrics}
              baseTerm={baseTerm}
            />
          </div>
        )}
      </div>
    </div>
  );
}
