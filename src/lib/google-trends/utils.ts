import type { WidgetId } from './types';

export function parseExploreResponse(response: any) {
  // Remove the first 4 characters from the response data which contain '`)]}'
  return JSON.parse(response.slice(4));
}

export function parseInterestWidgetResponse(response: any) {
  // Remove the first 6 characters from the response data which contain '`)]}','
  return JSON.parse(response.slice(6));
}

export function composeExploreReq(
  term: string,
  countryCode: string,
  timeframe: string,
) {
  return {
    comparisonItem: [
      {
        keyword: term,
        geo: countryCode,
        time: timeframe,
      },
    ],
    category: 0,
    property: '',
  };
}

export function extractTokenAndReq(exploreData: any, widgetId: WidgetId) {
  const widget = exploreData.widgets.find((w: any) => w.id === widgetId);
  return { token: widget?.token, req: widget?.request };
}
