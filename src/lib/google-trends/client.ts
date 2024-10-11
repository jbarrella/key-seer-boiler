import axios from 'axios';

import { API_URL, COOKIE, PATHS } from './constants';
import type { WidgetId } from './types';
import {
  composeExploreReq,
  extractTokenAndReq,
  parseExploreResponse,
  parseInterestWidgetResponse,
} from './utils';

const { getJson } = require('serpapi');

async function makeRequest(
  path: string,
  req: object,
  token?: string,
  // 360 or -120 appear to be good defaults or new Date().getTimezoneOffset();
  tz: number = -120,
  // language
  hl: string = 'en-US',
) {
  const reqString = JSON.stringify(req);
  try {
    const { data } = await axios.get(`${API_URL}/${path}`, {
      params: { req: reqString, tz, hl, token },
      headers: {
        cookie: COOKIE,
      },
    });
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

async function getExploreData(term: string, countryCode: string, timeframe: string) {
  const req = composeExploreReq(term, countryCode, timeframe);

  const response = await makeRequest('explore', req);

  return parseExploreResponse(response);
}

async function getInterestWidgetData(exploreData: object, widgetId: WidgetId) {
  const { token, req } = extractTokenAndReq(exploreData, widgetId);

  const response = await makeRequest(PATHS[widgetId], req, token);

  return parseInterestWidgetResponse(response);
}

export async function getInterestStats(
  term: string,
  countryCode: string,
  timeframe: string = 'today 5-y',
) {
  // const exploreData = await getExploreData(term, countryCode, timeframe);

  // console.log('got explore data:', exploreData);

  // const interestOverTime = await getJson(
  //   {
  //     api_key:
  //       '4d0ede9f5cb4d452a2e73c84a54eec23058feed7dff4507ffe2077b627da6edf',
  //     engine: 'google_trends',
  //     q: 'cataclysm',
  //     data_type: 'TIMESERIES'
  //   },
  //   (json: any) => {
  //     console.log(json);
  //     console.log('that was the data');
  //   }
  // );

  // let interestOverTime = await getInterestWidgetData(exploreData, 'TIMESERIES');
  // interestOverTime = interestOverTime.default.timelineData.map((item: any) => ({
  //   time: item.formattedAxisTime,
  //   value: item.value[0]
  // }));

  // let interestByRegion = await getInterestWidgetData(exploreData, 'GEO_MAP');
  // interestByRegion = interestByRegion.default.geoMapData.map((item: any) => ({
  //   geoName: item.geoName,
  //   value: item.value[0]
  // }));

  const interestByRegion: any[] = [];
  const interestOverTime: any[] = [];

  return {
    interestOverTime,
    interestByRegion,
  };
}
