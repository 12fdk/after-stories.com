# After Stories — positioning and use cases

> From the owner interview on 2026-10-03. This is the source for the landing page, the App Store
> page (app repo #38) and every campaign. When a decision here changes, change this file first.

## The decisions

| Topic | Decision |
| --- | --- |
| Name | **After Stories** everywhere (app repo #245, #246). Not "AFTER". |
| Audience | Friend groups, international. Worldwide on day one. **Second audience: colleagues planning an office event** (added 2026-10-03). |
| Language | **English only** at launch. Localise once install data shows where users come from. |
| The pain | **Planning the event** (it gets lost in the group chat) and **collecting the photos afterwards** (everyone's are stuck on their own phone). |
| The hook | ***The morning after*** summary: the best photo, the best line, what you decided, and *save all photos*. |
| Hero use case | **The trip / weekend away.** It needs multi-day events (app repo, new issue). |
| Ephemerality | **A selling point.** The event is **deleted 48 hours after it ends**. |
| Voice | **Warm and witty.** Friends first, light humour, broad appeal (#165). Cheeky, never laddish. |
| Price | Free. **Say nothing about price** in marketing, so a paid tier stays possible. |
| Non-iPhone friends | A **web version** at launch. Nobody in the group is left out. |
| Growth | **The invite link** and **App Store search (ASO)**. No paid ads at launch. |
| 90-day goal | **Raw installs.** |

## Positioning

**For** groups of friends making a plan together,
**who** lose the plan in the group chat and never see each other's photos afterwards,
**After Stories** is one private place per event: plan it, live it, and wake up to the story.
**Unlike** a group chat plus a shared album, decisions stay visible, everyone's photos land in one
place, and then the whole thing disappears.

**One-liner:** *Plan it together. Live it together. Wake up to the story.*

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
| 1 | **Trip / weekend away** (cabin, city break, ski) | **Hero** | Dates, house, who drives, what to eat | Hundreds of photos on six phones | **No: needs multi-day events** |
| 2 | **Night out** | Proof | Where to meet, where next | "What happened last night?" | Yes |
| 3 | **Birthday / celebration** | Proof | Date poll, venue, gift | Everyone's photos of the guest of honour | Yes (≤ 50 people) |
| 4 | **Bachelor(ette) / hen & stag** | Proof | Lots of decisions, one organiser | Photos you want gone in 48 h | Needs multi-day for weekends |
| 5 | **Festival / concert** | Proof | Tickets, meeting point, camp | Chaos, photos everywhere | Needs multi-day for festivals |
| 6 | **Dinner / game / movie night** | Proof | Which day, which film, who cooks | Light. The poll is the payoff | Yes |
| 7 | **Office event** (team dinner, Friday bar, summer/Christmas party, offsite) | Proof, **own page** | Outlook + Doodle + a dozen emails | Everyone's photos from the party, and no work chat that lives forever | Yes (≤ 50 people); offsite needs multi-day |

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
  1. **Sign in with Apple only, iPhone first.** Colleagues on Android or without a personal
     Apple ID need the web version (#132) on day one. This audience makes it non-negotiable.
  2. **The 17+ age rating** and the nightlife-flavoured copy. Fine for adults, but the app must
     not read as a party app on a work phone.
  3. **50 members per event.** Covers a team or a small company, not a 200-person Christmas party.
  4. **Company devices and policies.** IT may block unmanaged apps; the web version helps.
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
   one screen: who invited you, to what, what the app is, and a big App Store button, plus the web
   version for non-iPhone friends. **This page matters more than after-stories.com.**
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

1. **Hero:** the trip. *Plan it together. Live it together. Wake up to the story.* Visual: a
   *morning after* summary card for a cabin weekend.
2. **The pain:** *The plan got lost in the group chat. The photos never left everyone's phone.*
3. **How it works:** three beats, not eight. *Plan* (polls → decisions), *Live* (one stream,
   photos, likes), *The morning after* (the summary, save all photos).
4. **It ends:** the 48-hour message, paired with *save all photos*.
5. **Works for:** chips for night out, birthday, bachelorette, festival, dinner night, **office
   event** (the chip links to its own page, `/office-events`).
6. **Private by design:** only the people in the event; no location, ever (photos stripped,
   places are venues); Sign in with Apple; deleted 48 h after.
7. **Get it:** App Store button, and the web version for friends without an iPhone.

No price line. English only. Keep IndexNow and the Umami tracking.

## Brand script (StoryBrand, 2026-10-03)

The site copy follows this. When the copy changes, check it still tells this story.

| SB7 | After Stories |
| --- | --- |
| **Hero** | The friend (or colleague) who ends up organising the plan. |
| **Desire** (one) | A great time with their people, planned and remembered, without being the one who chases everyone. |
| **Villain** | **The group chat**: where plans go to die and photos never leave anyone's phone. |
| **External problem** | The plan is buried under hundreds of messages; the photos are stuck on six phones. |
| **Internal problem** | *You're* always the one scrolling up, chasing replies and begging for the pictures. It feels like a second job. |
| **Philosophical problem** | Getting your friends together shouldn't feel like a second job. |
| **Guide: empathy** | "We've all been the one holding the group chat together." |
| **Guide: authority** | Honest only: the product's specifics and its promises. No testimonials, numbers or logos until real ones exist (after launch). |
| **Plan (process)** | 1. Plan it together (create the event, send the link, vote). 2. Live it together (one stream). 3. Wake up to the story. |
| **Plan (agreement)** | No feed, no followers, no strangers. Never your location. Gone 48 hours after, photos saved first. Nobody left out (web for non-iPhone friends). |
| **Direct CTA** | Get notified at launch (hero button and after the plan both jump to the one form, at the end). |
| **Transitional CTA** | "How it works" in the header. |
| **Failure** | Another plan in the group chat, and photos that never come. Light, never fear. |
| **Success** | Waking up the morning after to the whole story: the photo everyone loved, the line everyone's quoting, what you decided, every picture already on your phone. Nobody had to make it. |
| **One-liner** | *Plan it together. Live it together. Wake up to the story.* Long form: "After Stories is the private app for your group's trip, party or night out: decide the plan together, live it in one place and wake up to everyone's photos, so nobody has to chase anyone." |

Each event page tells the same story for its own hero: the problem line names how organising *that* event feels, and the closer paints that event's morning after (success) and the group-chat alternative (failure).
