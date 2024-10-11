import axios from 'axios';

import type { AutocompleteQuery } from './AutocompleteQuery';
import { API_URL } from './constants';

async function makeRequest(
  // Query string
  q: string,
  // Cursor position
  cp?: number,
  // Localization as two-letter country code e.g. 'us'
  gl?: string,
  // Client type ['chome', 'firefox', 'gws-wiz-serp']
  client: string = 'chrome',
) {
  try {
    const { data } = await axios.get(API_URL, {
      params: { q, cp, gl, client },
    });
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

function formatResults(completions: any) {
  return completions[1].map((completion: any, index: number) => ({
    text: completion,
    relevance: completions[4]['google:suggestrelevance'][index],
    // TODO: Figure out meaning of type codes
    // type: completions[4]['google:suggestsubtypes'][index]
  }));
}

export async function fetchCompletions(
  query: AutocompleteQuery,
  gl?: string,
  client: string = 'chrome',
) {
  const { q, cp } = query.translate();
  const data = await makeRequest(q, cp, gl, client);

  return formatResults(data);
}
