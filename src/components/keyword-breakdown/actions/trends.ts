'use server';

import DataForSEOClient from '@/lib/data-for-seo/client';

import { COUNTRIES } from '../../global/constants';
import type { TrendsData } from '../types';

const dataForSEOClient = new DataForSEOClient(
  process.env.DATAFORSEO_USERNAME,
  process.env.DATAFORSEO_PASSWORD,
);

export async function getTrends(
  term: string,
  countryName: string,
): Promise<TrendsData> {
  const countryCode = COUNTRIES[countryName];

  return await dataForSEOClient.getGoogleTrends(term, countryCode);

  // return {
  //   interestByRegion: [
  //     {
  //       geoName: 'United States',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'Canada',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'United Kingdom',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'Australia',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'Germany',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'France',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'Japan',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'Brazil',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'India',
  //       interest: Math.floor(Math.random() * 101)
  //     },
  //     {
  //       geoName: 'South Africa',
  //       interest: Math.floor(Math.random() * 101)
  //     }
  //   ]
  // };
}
