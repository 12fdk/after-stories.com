# After Stories — positioning and use cases

> From the owner interview on 2026-10-03. This is the source for the landing page, the App Store
> page (app repo #38) and every campaign. When a decision here changes, change this file first.
>
> **Launched 2026-10-18** on the App Store (app 6815212070), in Danish, English, French, German
> and Spanish. **1.1 (2026-10-29)**: iOS 26 or later, the templates (*Plan together*, *Party*,
> *Game day* with the kids' carpool, *Free form*) and a cover picture per event. Since 2026-10-20
> friends without an iPhone join from the browser (`app.after-stories.com`, app repo #463), and since
> 2026-11-05 anyone can sign up and create an event there (app repo #757, #761).
> **1.3 (2026-10-31)**: one event can run over several days.
>
> **What we say in every channel is in [`marketing-guidelines.md`](marketing-guidelines.md)**
> (#81, owner 2026-11-05): the sentence that says what the app is, the line that leads, the three
> proofs and the facts. This file keeps the market decisions and the brand script.

## The decisions

| Topic | Decision |
| --- | --- |
| Name | **After Stories** everywhere (app repo #245, #246). Not "AFTER". |
| What it is | **"An app for one event with your group"**, said the same way every time (owner, 2026-11-05, #81; `marketing-guidelines.md` §2.1). |
| The line that leads | ***Plan it together. Everyone gets the photos.*** The older one-liner (*Plan it together. Live it together. Wake up to the story.*) is the sign-off: it never stands alone (owner, 2026-11-05). |
| Audience | Friend groups, international. Worldwide on day one. **Second audience: colleagues planning an office event** (added 2026-10-03). |
| Language | The app ships in Danish, English, French, German and Spanish; so does the site. |
| The pain | **Planning the event** (it gets lost in the group chat) and **collecting the photos afterwards** (everyone's are stuck on their own phone). |
| The hook | ***The morning after*** summary: the best photo, the best line, what you decided, and *save all photos*. |
| Hero use case | **The trip / weekend away.** One event runs over several days since 1.3 (app repo #273). |
| Ephemerality | **A selling point.** The event is **deleted 48 hours after it ends**. |
| Voice | **Warm and witty.** Friends first, light humour, broad appeal (#165). Cheeky, never laddish. |
| Price | **One fixed line: *Free to plan, chat and share photos.*** Nothing else about price: no amounts, nothing about Pro (owner, 2026-11-05; until then we said nothing). The one paid thing is photo quality (app repo #547). |
| No iPhone | **The browser is the second way in, the App Store's equal** (Robert, 2026-11-09). On Android or a computer, `app.after-stories.com` does what the app does: sign up (Sign in with Apple or an e-mail login link) with or without an invite, create and start an event, chat, vote, share photos, take tasks, the carpool, the summary the morning after and saving every photo (app repo #463, #495, #531, #757, #761). The invite link opens it there. **What the iPhone app (iOS 26 or later) adds:** notifications (the browser sends an e-mail for the summary and before deletion only), place search and scanning a QR code. Say all of that honestly; never promise an Android app. |
| Growth | **The invite link** and **App Store search (ASO)**. No paid ads at launch. |
| 90-day goal | **Raw installs.** |

## Positioning

**For** groups of friends making a plan together,
**who** lose the plan in the group chat and never see each other's photos afterwards,
**After Stories** is an app for one event with their group: everyone votes on the plan, shares
photos in one place, and saves them all with one tap the morning after.
**Unlike** a group chat plus a shared album, decisions stay visible, everyone's photos land in one
place, and then the whole thing disappears.

**The line that leads:** *Plan it together. Everyone gets the photos.*
**The sign-off:** *Plan it together. Live it together. Wake up to the story.*

**Why not WhatsApp + a shared album?** Four answers, in this order:

1. **Decisions don't get lost.** A poll becomes a decision, and the decisions become a timeline.
   Nobody scrolls back 300 messages to find the restaurant.
2. **Photos are collected for you.** Everyone's photos are in the event. One tap saves them all.
   Nobody has to run the album.
3. **The morning after.** A summary of the trip that nobody had to make.
4. **It ends.** 48 hours after, it's gone. No chat that hangs around forever, no photo that
   resurfaces in five years.

## The use cases

Lead with one, prove the rest. The hero sells the app. The others are shown as "works for this
too" (a row of chips on the site, screenshots 5–8 on the App Store, one ASO keyword set each).

| # | Use case | Role | The planning pain | The photo/story payoff | Fits the product today? |
| --- | --- | --- | --- | --- | --- |
| 1 | **Trip / weekend away** (cabin, city break, ski) | **Hero** | Dates, house, who drives, what to eat | Hundreds of photos on six phones | Yes since 1.3 (several days in one event) |
| 2 | **Night out** | Proof | Where to meet, where next | "What happened last night?" | Yes |
| 3 | **Birthday / celebration** | Proof | Date poll, venue, gift | Everyone's photos of the guest of honour | Yes (≤ 50 people) |
| 4 | **Bachelor(ette) / hen & stag** | Proof | Lots of decisions, one organiser | Photos you want gone in 48 h | Yes; a weekend since 1.3 |
| 5 | **Festival / concert** | Proof | Tickets, meeting point, camp | Chaos, photos everywhere | Yes; several days since 1.3 |
| 6 | **Dinner / game / movie night** | Proof | Which day, which film, who cooks | Light. The poll is the payoff | Yes |
| 7 | **Office event** (team dinner, Friday bar, summer/Christmas party, offsite) | Proof, **own page** | Outlook + Doodle + a dozen emails | Everyone's photos from the party, and no work chat that lives forever | Yes (≤ 50 people); an offsite over several days since 1.3 |
| 8 | **Kids' game day** (a child's match: away game, cup, tournament day) | Proof, **own page** (`/match-day/`, owner 2026-10-29) | The parents' chat: who drives, how many seats, who takes which child home | The goal photo from every parent's phone | Yes since 1.1: the *Game day* template with the car view (children's first names, cars with seats out and home, anyone moves a child). Not yet: the car view in the browser, *repeat for the next game*, the score |

The hero of use case 8 is **the parent**, not the player: the page talks to parents, the children are
first names a parent types in and never use the app (18+).

Not marketed: weddings and big events (the 50-member cap, and guests won't accept 48 h
deletion), and anything public.

## The office event (use case 7)

**The pitch:** *Stop planning the team party in Outlook, Doodle and 30 emails. One event: vote on
the date, decide the place, share the photos, and it's gone 48 hours later.*

The same pain as the friend group (the plan is scattered, the photos never get shared), but the
"today" is different: **Outlook + Doodle + email threads** instead of the group chat. Its own
"why not" answer: *a Doodle answers one question; an event answers all of them, and then holds
the night itself.*

- **The organiser is the buyer:** the colleague who always ends up arranging the Christmas
  party, an office manager, a team lead. One person installs, invites 10–50.
- **Market it on its own page** (`/office-events`) and its own ASO keyword set, not on the hero.
  It needs a calmer register than the trip: warm, still witty, no hangover jokes.
- **48 h deletion is a feature here too:** no permanent chat with your boss, no party photos
  lingering on a company drive.
- **What could stop it** (check before spending on this audience):
  1. ~~**The organiser needs an iPhone.**~~ No longer (2026-11-05, app repo #761): the organiser
     can create the event in the browser too, and colleagues on Android or a computer join there.
     The office page says so.
  2. **The 17+ age rating** and the nightlife-flavoured copy. Fine for adults, but the app must
     not read as a party app on a work phone.
  3. **50 members per event.** Covers a team or a small company, not a 200-person Christmas party.
  4. **Company devices and policies.** IT may block unmanaged apps.
  5. **No calendar invite.** A decided date doesn't land in Outlook. An *Add to calendar* on a
     decision with a day would close the loop (not in the eight steps today).

## What the 48-hour deletion means for the message

It is the brand, but its fear has to be answered in the same sentence: **you keep your photos,
the app forgets the rest.**

- Say: *"Everything disappears 48 hours after. Save the photos with one tap first."*
- Say: *"What happens on the trip stays in the trip."*
- Never say only "it deletes everything". Always pair it with *save all photos*.
- The 48 h must be the rule the app actually enforces (app repo #256 / #221) before any copy
  ships with the number in it.

## Where the installs come from, and what that means

1. **The invite link is the real landing page.** Every event brings 3–15 people who have never
   heard of the app. The invite page (`after.12f.dk`, app repo `web/after-link`) has to say in
   one screen: who invited you, to what, what the app is, and *Open in AFTER* / a big App Store
   button. On Android or a computer it opens the web app instead (app repo #495). **This page
   matters more than after-stories.com.**
2. **ASO.** People search for the job, not for the brand. Keyword sets, one per use case:
   - Trip: *group trip planner, trip with friends, shared trip photos, travel poll*
   - Planning: *group planner, event poll, plan with friends, group decision, vote*
   - Photos: *shared photo album, collect photos, party photos, event photos*
   - Night/party: *night out, party planner, birthday planner, bachelorette*
   - Office: *office party planner, team event, work party, Doodle alternative, team poll*

   Category: **Social Networking**, with **Travel** as the secondary category while the trip is
   the hero.
3. **The morning-after summary drives repeat use and word of mouth.** No share-out at launch
   (it is not in the eight steps), but it is the first candidate if installs stall.

## Measuring the 90-day goal (raw installs)

- App Store Connect: installs by source (App Store search / referrer / web referrer). The invite
  page's App Store link carries a campaign token (`ct=invite`) so invite-driven installs are
  counted apart from ASO.
- PostHog (product events only): invites sent per event, invite → install → join rate. Follow the
  global PostHog simulator and review-device filters.
- Activation is not the goal, but report "events that reach the summary" next to installs, so we
  can see whether the installs are worth anything.

## The landing page (after-stories.com) — what changes

The current page sells v1: moment tiles, *I'm going home*, *While you were gone…*, awards and
"Log the night". All of that was removed in app repo #208. The new page:

1. **Hero:** the short sentence, then the line that leads (*Plan it together. Everyone gets the
   photos.*), then the full sentence as the lede (`marketing-guidelines.md` §2). Visual: the
   app's morning-after screen.
2. **The pain:** *The plan got lost in the group chat. The photos never left everyone's phone.*
3. **How it works:** three beats, not eight. *Plan* (polls → decisions), *Live* (one stream,
   photos, likes), *The morning after* (the summary, save all photos).
4. **It ends:** the 48-hour message, paired with *save all photos*.
5. **Works for:** chips for night out, birthday, bachelorette, festival, dinner night, **office
   event** (the chip links to its own page, `/office-events`).
6. **Private by design:** only the people in the event; no location, ever (photos stripped,
   places are venues); Sign in with Apple on iPhone, an e-mail in the browser; deleted 48 h
   after.
7. **Get it:** the official "Download on the App Store" badge (header, hero, after the plan,
   closer), and a QR code in the closer for desktop visitors. For iPhone, iOS 26 or later.

The price line (the decisions above) sits under the hero's badge. Keep IndexNow and the Umami
tracking.

## Brand script (StoryBrand, 2026-10-03)

The site copy follows this. How it maps onto each page, the rules and the pre-PR check:
[`messaging.md`](messaging.md).

| SB7 | After Stories |
| --- | --- |
| **Hero** | The friend (or colleague) who ends up organising the plan. |
| **Desire** (one) | A great time with their people, planned and remembered, without being the one who chases everyone. |
| **Villain** | **The group chat**: where plans go to die and photos never leave anyone's phone. |
| **External problem** | The plan is buried under hundreds of messages; the photos are stuck on six phones. |
| **Internal problem** | *You're* always the one scrolling up, chasing replies and begging for the pictures. It feels like a second job. |
| **Philosophical problem** | Getting your friends together shouldn't feel like a second job. |
| **Guide: empathy** | "We've all been the one holding the group chat together." Every event page opens its plan with its own "We've all…" line (`empathy` in `src/data/events.ts`), then what After Stories takes off the organiser's hands. |
| **Guide: authority** | Honest only: the product's specifics and its promises. No testimonials, numbers, ratings or logos until real ones exist (live since 2026-10-18, no rating yet). |
| **Plan (process)** | 1. Plan it together (create the event, send the link, vote). 2. Live it together (one stream). 3. Wake up to the story. |
| **Plan (agreement)** | No feed, no followers, no strangers. Never your location. Gone 48 hours after, photos saved first. No new account: Sign in with Apple, no password. |
| **Direct CTA** | Apple's official "Download on the App Store" badge, the same words everywhere: in the header on every page, the hero, after the plan and the closer. The closer has one line above it and a QR code for desktop. No form. |
| **Transitional CTA** | "How it works" in the header. |
| **Failure** | Another plan in the group chat, and photos that never come. Light, never fear. |
| **Success** | Waking up the morning after to the whole story: the photo everyone loved, the line everyone's quoting, what you decided, every picture already on your phone. Nobody had to make it. |
| **One-liner** | *Plan it together. Everyone gets the photos.* Sign-off: *Plan it together. Live it together. Wake up to the story.* Long form: the sentence in `marketing-guidelines.md` §2.1. Until 2026-11-05: "After Stories is the private app for your group's trip, party or night out: decide the plan together, live it in one place and wake up to everyone's photos, so nobody has to chase anyone." |

Each event page tells the same story for its own hero (`src/data/events.test.ts` checks every part is there): the problem line names how organising *that* event feels, and the closer paints that event's morning after (success) and the group-chat alternative (failure).
