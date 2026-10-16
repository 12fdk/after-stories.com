import { describe, expect, it } from "vitest";
import { shares, vote } from "./poll";

const options = [
  { label: "Swimming at the lake", votes: 4 },
  { label: "Hike to the ridge", votes: 2 },
  { label: "Day in the old town", votes: 1 },
];

describe("shares", () => {
  it("is each answer's part of the votes, in whole percent", () => {
    expect(shares(options)).toEqual([57, 29, 14]);
  });

  it("is zero for every answer before anyone votes", () => {
    expect(shares([{ label: "A", votes: 0 }, { label: "B", votes: 0 }])).toEqual([0, 0]);
  });
});

describe("vote", () => {
  it("adds the visitor's vote and makes their answer the decision", () => {
    const result = vote(options, 2);
    expect(result.options.map((o) => o.votes)).toEqual([4, 2, 2]);
    expect(result.options.map((o) => o.share)).toEqual([50, 25, 25]);
    expect(result.options.map((o) => o.chosen)).toEqual([false, false, true]);
    expect(result.decided).toBe("Day in the old town");
  });

  it("leaves the options it was given alone", () => {
    vote(options, 0);
    expect(options[0].votes).toBe(4);
  });

  it("refuses an answer that isn't there", () => {
    expect(() => vote(options, 3)).toThrow(RangeError);
    expect(() => vote(options, -1)).toThrow(RangeError);
  });
});
