// The live poll on the home and event pages (src/components/sections/Poll.astro): a visitor's
// one vote, and the results it leaves. The chosen answer becomes the decision, as in the app.

export interface PollOption {
  label: string;
  votes: number;
}

export interface PollResult {
  options: (PollOption & { share: number; chosen: boolean })[];
  decided: string;
}

/** Each answer's share of the votes, in whole percent (0 when nobody has voted). */
export function shares(options: PollOption[]): number[] {
  const total = options.reduce((sum, o) => sum + o.votes, 0);
  return options.map((o) => (total === 0 ? 0 : Math.round((o.votes / total) * 100)));
}

/** The poll after one vote for the answer at `index`. */
export function vote(options: PollOption[], index: number): PollResult {
  if (index < 0 || index >= options.length) throw new RangeError(`No answer ${index}`);
  const after = options.map((o, i) => ({ ...o, votes: o.votes + (i === index ? 1 : 0) }));
  const share = shares(after);
  return {
    options: after.map((o, i) => ({ ...o, share: share[i], chosen: i === index })),
    decided: options[index].label,
  };
}
