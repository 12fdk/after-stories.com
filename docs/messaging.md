# Messaging rules (StoryBrand)

Every page on this site tells one StoryBrand (SB7) story: **the visitor is the hero, After Stories
is the guide.** This file is the rulebook for any change to copy, sections or page structure. The
facts the story is built from (the brand script, voice, use cases) live in
[`positioning.md`](positioning.md) › *Brand script*. This file says how to use them on the page.

Last full audit: 2026-10-03, 9.5/10 (#24, #26). The missing half point is authority: see rule 3.

## Before any copy or layout change

1. Read the brand script in `positioning.md` and this file.
2. Make the change.
3. Run the **`mcpmarket-me:storybrand-messaging`** skill over every page you touched and score it
   0–10. Don't open the PR below **9/10**, and never below the score the page had before.
4. Put the score (before → after) and any gap you left open in the PR.
5. If the story itself changed (a new desire, villain, plan or promise), change the brand script in
   `positioning.md` first, then the copy.

## Where each part lives

### Home page (`src/pages/index.astro`)

| SB7 part | Section | Rule |
| --- | --- | --- |
| Hero + desire | Hero `h1` and lede | The one-liner, word for word. One desire, no feature list. |
| Direct CTA | Header pill, hero button, after the plan, the form in the closer | Same words everywhere: "Get notified (at launch)". All jump to the one form at the end. |
| Transitional CTA | "How it works" in the header | Stays lower-commitment than the direct CTA. |
| Problem (external, internal, philosophical) + villain | "Group chats are where plans go to die." | All three levels in the intro. The villain is **the group chat**, never a competitor by name. |
| Guide: empathy | Intro to "how it works" | Starts with "We've all…", then what After Stories takes off the hero's hands. |
| Plan (process) | The three beats | **Three steps**, never more. Each named with a verb. |
| Plan (agreement) | "Only the people in the event. That's a promise." + the 48 h section | Promises the app actually keeps. |
| Failure | `closer-stakes` | One light sentence. A taste, never fear. |
| Success | The closer and the morning-after card | Concrete: the photo, the line, the decisions, every picture on your phone. |

### Event pages (`src/pages/[event].astro`, copy in `src/data/events.ts`)

Each event page tells the same story for its own hero. The fields map to SB7:

| Field | SB7 part |
| --- | --- |
| `headline`, `lede` | Hero + desire for this event |
| `todayTitle`, `today` | External problem (the villain's version of this event) |
| `problem` | Internal + philosophical problem: how organising *this* event feels, and why it shouldn't |
| `empathy` | Guide: "We've all…" + what After Stories takes off the organiser's hands |
| `beats` | The three-step plan |
| `privacy` / `defaultPrivacy` | Agreement plan |
| `success` | This event's morning after, when it went right |
| `stakes` | This event's group-chat alternative |
| `closer` | The closing line before the form |

`src/data/events.test.ts` checks that every event has all of these, three beats and the guide
voice. A new event page fills every field; the test fails if it doesn't.

## The rules

1. **The visitor is the hero.** Headlines and ledes talk about what *they* get. Don't start a
   section with "We" or "After Stories" (the empathy line starts with "We've all", which is about
   the visitor). No "the best", "revolutionary", "powerful".
2. **One message per page.** One desire, one villain, one direct CTA. A new section has to fit an
   SB7 part above, or it doesn't go on the page.
3. **Authority is honest only.** No testimonials, user counts, ratings, logos or press until real
   ones exist. Authority today = the product's specifics and its promises. After launch, add real
   proof (an App Store rating, a quote from a real user) to the home page's guide section.
4. **Clear beats clever.** A visitor understands what the app is in 5 seconds from the hero alone.
   The jokes go in the details (chat mocks, examples), never instead of the explanation.
5. **The direct CTA is a button, repeated, in the same words.** Header, hero, after the plan, and
   the form at the end. The page makes its case before the form (#22): the form stays in the closer.
6. **Failure is a taste.** One sentence, about the group chat and the missing photos. No fear, no
   fake urgency, no countdowns, no "spots are limited".
7. **Success is specific.** Name the photo, the line, the decision, the phone. Never "amazing
   memories".
8. **The 48-hour deletion is always paired with saving the photos** (positioning.md › *What the
   48-hour deletion means*). Never mention one without the other.
9. **Never say anything about price.**
10. **Voice:** warm and witty, cheeky, never laddish. The office page is calmer: no nightlife or
    hangover jokes.

## Quick check (all must be "yes")

- [ ] Can someone tell what After Stories is, and what to do next, in 5 seconds?
- [ ] Is the visitor the hero, and After Stories the guide?
- [ ] Is the internal problem named, not just the external one?
- [ ] Is there empathy, and only honest authority?
- [ ] Is the plan three steps?
- [ ] Is there one direct CTA, as a button, repeated in the same words?
- [ ] Are both failure and success on the page?
