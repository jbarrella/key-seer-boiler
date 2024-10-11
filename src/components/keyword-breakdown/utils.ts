import type { Completion } from '@/lib/google-autocomplete/types';

import type { CompletionsData, ModifierTerm } from './types';

function stringContainsWords(str: string, words: string[]): boolean {
  return words.every((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(str);
  });
}

export function filterCompletionsContainingWords(
  completions: Completion[],
  words: string[],
): Completion[] {
  return completions.filter(completion =>
    stringContainsWords(completion.text, words),
  );
}

export function removeDuplicates(completions: Completion[]): Completion[] {
  return completions.filter(
    (completion, index, self) =>
      index === self.findIndex(t => t.text === completion.text),
  );
}

export function flattenCompletions(completions: CompletionsData) {
  const allCategoryCompletions = completions.categories.flatMap(category =>
    category.modifierTerms.flatMap((modifier: ModifierTerm) =>
      modifier.completions.map(completion => completion.text),
    ),
  );

  const allBaseCompletions = completions.baseCompletions.map(
    completion => completion.text,
  );

  return [...allBaseCompletions, ...allCategoryCompletions];
}
