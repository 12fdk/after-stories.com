# Messaging rules (StoryBrand)

Every page on this site tells one StoryBrand (SB7) story: **the visitor is the hero, After Stories
is the guide.** This file is the rulebook for any change to copy, sections or page structure. The
facts the story is built from (the brand script, voice, use cases) live in
[`positioning.md`](positioning.md) › *Brand script*. This file says how to use them on the page.
**The fixed lines** (the sentence that says what the app is, the line that leads, the price
line) and the facts are in [`marketing-guidelines.md`](marketing-guidelines.md), word for word
in every language (#81).

Last full audit: 2026-10-03, 9.5/10 (#24, #26). The missing half point is authority: see rule 3.

**Live since 2026-10-18** (App Store app 6815212070); **1.1 since 2026-10-29** (iOS 26 or later,
templates). The call to action is a pair: Apple's official "Download on the App Store" badge and, as its
equal, the web app's "Open app" button (`app.after-stories.com`), since anyone can create an event
in the browser (2026-11-05, app repo #761; Robert, 2026-11-09). Not a form (rules 5 and 11).

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
| Hero + desire | Hero prelude, `h1` and lede | The short sentence above the headline, the line that leads as the `h1`, the full sentence as the lede: all three word for word from `marketing-guidelines.md` §2. One desire, no feature list. The old one-liner is the footer's sign-off. |
| Direct CTA | Header, hero, after the plan, the closer | The pair from `AppStoreCta`: Apple's official "Download on the App Store" badge, then the web app's "Open app" button (`WebAppCta`), everywhere, the badge first. The closer adds a QR code to the App Store for desktop visitors; no form. |
| Transitional CTA | "How it works" in the header | Stays lower-commitment than the direct CTA. |
| Problem (external, internal, philosophical) + villain | "Group chats are where plans go to die." | All three levels in the intro. The villain is **the group chat**, never a competitor by name. |
| Guide: empathy | Intro to "how it works" | Starts with "We've all…", then what After Stories takes off the hero's hands. |
| Plan (process) | The three beats | **Three steps**, never more. Each named with a verb. |
| Plan (objection) | "No iPhone? Plan it in your browser." (`sections/Browser.astro`), right after the plan | Takes away the last objection: someone without an iPhone can start the event in the browser, and their group joins on any phone. Three things they get, one line on what the iPhone app adds, and the web app's button. Never a feature tour. |
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
| `closer` | The closing line before the App Store badge |

`src/data/events.test.ts` checks that every event has all of these, three beats and the guide
voice. A new event page fills every field; the test fails if it doesn't.

## The rules

1. **The visitor is the hero.** Headlines and ledes talk about what *they* get. Don't start a
   section with "We" or "After Stories" (the empathy line starts with "We've all", which is about
   the visitor). No "the best", "revolutionary", "powerful".
2. **One message per page.** One desire, one villain, one direct CTA. A new section has to fit an
   SB7 part above, or it doesn't go on the page.
3. **Authority is honest only.** No testimonials, user counts, ratings, logos or press until real
   ones exist. Authority today = the product's specifics and its promises. The app is live
   (2026-10-18), but there is no rating yet: add real proof (an App Store rating, a quote from a
   real user) to the home page's guide section only once it exists.
4. **Clear beats clever.** A visitor understands what the app is in 5 seconds from the hero alone:
   the hero says "app", who it is for and the two things they get (the stranger test,
   `marketing-guidelines.md` §3). The jokes go in the details (chat mocks, examples), never
   instead of the explanation.
5. **The direct CTA is a pair, repeated, in the same words** (Robert, 2026-11-09). Apple's
   official "Download on the App Store" badge (localized: `ui.appStoreBadge`) and, beside it as its
   equal, the web app's button (`ui.webAppEyebrow` over `ui.navOpenApp`: "In your browser / Open
   app") in the header, the hero, after the plan and the closer, always from `AppStoreCta`, the
   badge first. The home page's browser section has the web app's button alone. The closer adds one
   line above the pair (`ui.closerCta`) and a QR code to the App Store for desktop (`ui.qrCaption`).
   No form, no "get notified".
6. **Failure is a taste.** One sentence, about the group chat and the missing photos. No fear, no
   fake urgency, no countdowns, no "spots are limited".
7. **Success is specific.** Name the photo, the line, the decision, the phone. Never "amazing
   memories".
8. **The 48-hour deletion is always paired with saving the photos** (positioning.md › *What the
   48-hour deletion means*). Never mention one without the other.
9. **One price line, word for word, and nothing else:** *Free to plan, chat and share photos.*
   (owner, 2026-11-05; `marketing-guidelines.md` §8). Under the home page hero's badge only. No amounts,
   nothing about Pro, no "free" anywhere else.
10. **Voice:** warm and witty, cheeky, never laddish. The office page is calmer: no nightlife or
    hangover jokes.
11. **Say what is true about the platform.** After Stories is an iPhone app, iOS 26 or later, and
    a web app at `app.after-stories.com` for a computer or an Android phone. Since 2026-11-05
    anyone can sign up and create an event in the browser (app repo #757, #761), with the chat,
    votes, photos, the carpool, the summary and saving every photo; the invite link opens it too.
    What the iPhone app adds: notifications (the browser e-mails the summary and the deletion
    warning only). Asked whether someone without an iPhone can join, the answer is yes, and they can
    start the event too. The browser is the second, equal call to action (rule 5); the page leads
    with the iPhone app and never sells one against the other. Never promise an Android app. When
    the web app gains or loses something, change the answers in every locale (`src/data/events.ts`
    › `webLimits`, and the same sentence in `src/data/copy/*.ts`).

## Quick check (all must be "yes")

- [ ] Can someone tell what After Stories is, and what to do next, in 5 seconds?
- [ ] Is the visitor the hero, and After Stories the guide?
- [ ] Is the internal problem named, not just the external one?
- [ ] Is there empathy, and only honest authority?
- [ ] Is the plan three steps?
- [ ] Is there one direct CTA, the App Store badge with the web app's button beside it, repeated in the same words?
- [ ] Are both failure and success on the page?
