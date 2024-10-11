import axios from 'axios';

import { MICRO_TO_USD } from '../constants';

export default class GoogleAdwordsClient {
  private baseUrl = 'https://googleads.googleapis.com/v17';

  private customerId: string;
  private developerToken: string;
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;

  constructor(
    customerId: string,
    developerToken: string,
    clientId: string,
    clientSecret: string,
    refreshToken: string,
  ) {
    this.customerId = customerId;
    this.developerToken = developerToken;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
  }

  private async fetchAccessToken() {
    const { access_token } = await fetch(`https://www.googleapis.com/oauth2/v3/token`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token',
      }),
      next: {
        revalidate: 3600,
      },
    }).then(res => res.json());
    return access_token;
  }

  private async fetchKeywordsMetrics(keywords: string[], countryId: string) {
    const accessToken = await this.fetchAccessToken();

    try {
      const searchResults = await axios
        .post(
          `${this.baseUrl}/customers/${this.customerId}:generateKeywordHistoricalMetrics`,
          {
            keywords,
            geoTargetConstants: countryId ? [`geoTargetConstants/${countryId}`] : null,
            keywordPlanNetwork: 'GOOGLE_SEARCH_AND_PARTNERS',
            historicalMetricsOptions: {
              includeAverageCpc: true,
            },
            language: 'languageConstants/1000',
          },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Developer-Token': this.developerToken,
            },
          },
        )
        .then(res => res.data.results);
      return searchResults;
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  }

  private formatResults(results: any) {
    return results.map((result: any) => {
      return {
        term: result.text,
        variants: result.closeVariants,
        monthlySearchVolume: result.keywordMetrics?.avgMonthlySearches,
        cpc: result.keywordMetrics?.averageCpcMicros
          ? result.keywordMetrics.averageCpcMicros * MICRO_TO_USD
          : null,
        // The competition index for the query in the range [0, 100]. Shows how competitive ad placement is for a keyword. The level of competition from 0-100 is determined by the number of ad slots filled divided by the total number of ad slots available. If not enough data is available, null is returned.
        competitionIndex: result.keywordMetrics?.competitionIndex,
        chart: result.keywordMetrics?.monthlySearchVolumes.map((month: any) => ({
          // Convert to title case
          month:
            month.month.charAt(0).toUpperCase() + month.month.slice(1).toLowerCase(),
          year: month.year,
          monthlySearches: month.monthlySearches,
        })),
      };
    });
  }

  public async getKeywordHistoricalMetrics(terms: string[], countryId: string) {
    const searchResults = await this.fetchKeywordsMetrics(terms, countryId);

    const results = this.formatResults(searchResults);

    // console.log(results[0].chart);

    return results;
  }
}
