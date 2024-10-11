export class AutocompleteQuery {
  constructor(public q: CursorString) {}

  translate(): { q: string; cp: number } {
    return {
      q: this.q.replace('|', ''),
      cp: this.q.indexOf('|'),
    };
  }
}

// Special syntax is used to denote cursor position using '|'
// e.g. 'postgres |' will translate to {q: 'postgres ', cp: 9}
type CursorString = `${string}|${string}`;
