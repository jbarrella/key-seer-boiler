import { AutocompleteQuery } from './AutocompleteQuery';
import { fetchCompletions } from './client';

export async function generateCompletionsForTerm(
  term: string,
  gl?: string,
  client: string = 'chrome',
) {
  // Space before and after the term to ensure term itself is strictly matched
  // e.g. 'postgres|' will return 'postgresql ...'
  const queries = [
    new AutocompleteQuery(`${term} |`),
    new AutocompleteQuery(`| ${term}`),
  ];

  return generateCompletions(queries, gl, client);
}

export async function generateCompletionsWithPrefix(
  term: string,
  prefix: string,
  gl?: string,
  client: string = 'chrome',
) {
  const queries = [
    new AutocompleteQuery(`${prefix} ${term} |`),
    new AutocompleteQuery(`${prefix} | ${term}`),
    new AutocompleteQuery(`${term} ${prefix} |`),
  ];

  return generateCompletions(queries, gl, client);
}

export async function generateCompletionsWithOutsideOperator(
  term: string,
  operator: string,
  gl?: string,
  client: string = 'chrome',
) {
  const queries = [
    new AutocompleteQuery(`| ${operator} ${term}`),
    new AutocompleteQuery(`${term} ${operator} |`),
  ];

  return generateCompletions(queries, gl, client);
}

async function generateCompletions(
  queries: AutocompleteQuery[],
  gl?: string,
  client: string = 'chrome',
) {
  const completions = await Promise.all(
    queries.map(q => fetchCompletions(q, gl, client)),
  );

  return completions.flat();
}
