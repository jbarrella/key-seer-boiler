import axios from 'axios';

import type { TrendsData } from '@/components/keyword-breakdown/types';

interface SearchData {
  keywords: string[];
  item_types: string[];
  location_code?: string;
}

export default class DataForSEOClient {
  private baseUrl: string = 'https://api.dataforseo.com/v3';
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  async getGoogleTrends(term: string, countryCode: string): Promise<TrendsData> {
    const data: SearchData = {
      keywords: [term],
      item_types: ['google_trends_map'],
    };

    if (countryCode) {
      data.location_code = countryCode;
    }

    try {
      const response = await axios({
        method: 'post',
        url: `${this.baseUrl}/keywords_data/google_trends/explore/live`,
        auth: {
          username: this.username,
          password: this.password,
        },
        data: [
          {
            keywords: [term],
            item_types: ['google_trends_map'],
            location_code: countryCode,
          },
        ],
        headers: {
          'content-type': 'application/json',
        },
      });

      const interestByRegion = response.data.tasks[0].result[0].items[0].data.map(
        (i: any) => ({
          geoName: i.geo_name,
          interest: i.values[0],
        }),
      );

      return {
        interestOverTime: [],
        interestByRegion,
      };
    } catch (error) {
      console.error('Error fetching Google Trends data:', error);
      throw error;
    }
  }
}
