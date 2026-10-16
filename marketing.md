# After Stories — Marketing Plan (living doc)

Owner: Robert · Maintained by: Hermes (social pipeline agent) · Last updated: 2026-10-16

> Plan for a TikTok content program built to grow organic awareness and installs of the
> **After Stories** app. Every word of copy in this plan must come from the brand sources named
> below — never from memory. Voice: **warm and witty, friends first, light humour, cheeky,
> never laddish** (owner decision, 2026-10-03).

**Brand sources (read before writing any video):**
- `after-stories.com` repo › `docs/positioning.md` — positioning, use cases, growth rules, the
  StoryBrand brand script. This file is the single source of truth for what we say.
- `after-stories.com` repo › `docs/messaging.md` — the messaging rulebook (who is the hero, the
  villain, the CTA wording).
- Live site `https://after-stories.com/` (and `llms.txt`) — the verbatim lines on screen.

**Locked marketing decisions (from positioning.md):**
- Name: **After Stories** everywhere. Not "AFTER".
- Audience: friend groups, international, worldwide on day one. Second audience: colleagues
  planning an office event.
- The pain: **planning the event** (it gets lost in the group chat) and **collecting the photos
  afterwards** (everyone's are stuck on their own phones).
- The villain: **the group chat** — never a competitor by name.
- The hook: the **morning after** summary.
- Hero use case: **the trip / weekend away**.
- Ephemerality is a selling point: the event is **deleted 48 hours after it ends** — but never
  mention deletion without first showing **save all photos** (site rule, `events.ts` header).
- **Say nothing about price.**
- Non-iPhone friends: a **web version** at launch — "Nobody left out."
- Growth: the invite link and ASO. **No paid ads at launch.** 90-day goal: raw installs.

## 1. What this is & how it's updated

- Hermes owns this file and runs every step in it. Robert reviews it and owns
  the decisions marked *Robert* in §9.
- Moved here on 2026-10-15 from the app repo (`12fdk/after-stories/marketing.md`,
  now a pointer) so all three social apps keep their plan in the landing-page
  repo, in the same sections (spark#136). Nothing was dropped.
- Pipeline: the nightly Hermes job `after-stories-social-content` (shared
  `social-post` template, channel **manual**) builds the next due §6 episode
  each night in the motion repo, checks its look with `marketing-post
  ledger-add`, saves it to the NAS and sends the video + post text to Robert,
  who posts it on TikTok by hand. Nothing is published automatically.
- Editing rules for this file:
  - Append-only to §8: never delete or rewrite past log rows.
  - Plan changes go in §6, plus a §8 row that says why. §3 and §4 change only
    on Robert's say-so. Update `Last updated` on every edit.
  - Never put secrets, API keys or tokens in this file.

## 2. Product & funnel

### Launch status decides the CTA (re-check before every video)

Pull the current status from `site-brief https://after-stories.com` (it records the check date).

| Status | End card / CTA | Post text |
| --- | --- | --- |
| Coming soon / waitlist (today) | **Get notified** · Coming soon · after-stories.com | after-stories.com (link in bio) |
| Live on the App Store | **Available on the App Store** | after-stories.com (link in bio) |

TikTok URLs in post text are not clickable — the end card carries the destination, the post
text says "link in bio".

- Funnel (pre-launch): TikTok profile → after-stories.com (link in bio) →
  waitlist sign-up (Umami event `waitlist-signup`). After launch: App Store
  installs, with a `ct=tiktok` token on the App Store link once tracking
  supports it (§7).

## 3. Content rules

Three rules that are not negotiable:

- **New content, always (Robert, 2026-10-11):** every episode is a fresh shoot. Never reuse
  footage from a video that has been posted — a feed of reordered old clips reads as "the
  same content" and kills organic reach. Vary the film between episodes (place, light,
  season, props, a different story beat) AND the music bed (§3 "Look, style and sound") so
  each one reads as brand new; the type stays the brand.
- **One video per episode (Robert, 2026-10-13):** make a single video per episode, not an
  A/B pair. Two cuts of one shoot may still exist as an A/B test, but the default — and the
  nightly build (§6) — is one video.
- **Truth (motion guideline §4):** every line on screen and in the post comes from the brand
  sources, verbatim or clearly paraphrased. No invented numbers, features, prices, dates or
  testimonials. `aiMedia: true` on every spec (the post file then starts with the AI-label
  reminder).
- **No faces, no UI, no logos in AI footage.** The real icon appears only on the end card. If a
  generated still shows a face, a readable screen or a brand logo, regenerate it. (Also the
  standing image rule: no visible faces at all — from behind / blurred, or no people.)

- Text-slide colours: background #0B0C0E · text #FFFFFF · accent #FF2D6F
  (the brand skin from "Look, style and sound" below; only used if a carousel is
  ever made — `marketing-post --colors-from` reads this line, so keep its format).

### Look, style and sound — the After Stories video identity

**The look (locked, reused since the approved `as-moments` / corporate cuts):**
- Reel `bold` look, re-skinned in the brand: **Anybody 800 at 75 % width**
  (`assets/after-stories/anybody-latin.woff2`), **pink `#FF2D6F`** accent bars with near-black
  `#0B0C0E` type (the brand's inverted beat), `#0B0C0E` end card.
- **Footage style (one shared line in every still prompt):** 35 mm film still, warm tungsten
  with magenta-pink accents, grain, candid. Golden hour and blue hour are the native light.
  Mood and B-roll only — places, light, motion, hands, backs, silhouettes. **No faces, no
  readable UI, no logos** (the real icon only on the end card). No people with visible faces
  at all (standing image rule): from behind, blurred, or nobody.
- **Never show a phone screen (Robert, 2026-10-12; clarified 2026-10-13, hard rule):** phones
  are allowed in a shot — only the screen is banned. A phone lies face-down (screen on the table) or
  is held showing its back; the screen is never readable, on, off or blurred (it reads as a product
  screen we do not own, so a visible screen is a re-shoot). A dark back that could be mistaken for a
  screen also fails: keep the camera module clearly lit and unmistakable. Check the animated clip:
  LTX drift can rotate a phone and reveal the screen — review every frame, not just the still.
  Omitting the phone is always safe but no longer required.
- **Pacing:** 4–6 shots of 2–4 s, cuts on the 0.5 s grid (120 BPM), something new every 2 s.
  The hook line is on screen at frame 0. The end card holds 1.5 s, clears 0.5 s, loops.

**The sound (changed 2026-10-11):**
- **No more clicky SFX beds.** The `beat` bed (isolated kick/hat/whoosh/chime cues) is what
  the last few videos shipped with, and it reads as mechanical clicks. Robert dropped it for
  the After Stories TikToks.
- **Use `bed: 'music'`** in every spec: a warm, deterministic groove from `music.mjs` in the
  motion repo — C major at 120 BPM (so it sits on the cut grid), soft kick on the downbeats,
  light backbeat, eighth-note hats, plucked bass, lo-fi e-piano chord stabs and a sparse
  marimba lead. The groove stops at the end card: a short riser, one soft hit, a bell chord,
  then a fade so the loop seam is clean.
- `clips: false` on the After Stories specs: the music is the voice of the edit; the LTX
  ambience stays out so the groove is clean (keep `clips: true` only when the clip sound IS
  the idea, e.g. a splash).
- The `beat` bed stays in the pipeline for the other brands (SonicSnap, CND, …).
- Mixes to −14 LUFS, two-pass loudnorm, as before.

### Hashtags and sound

- **Max 5 hashtags per TikTok post** (TikTok's cap, Robert 2026-10-11 — count the brand tag).
  Build the set from the use case's ASO keyword set in positioning.md: one broad tag, 2–3
  niche tags, and `#afterstories` — the searchable home of the series (e.g. trip:
  `#friends #grouptrip #daytrip #tripplanner #afterstories`).
- **Sound:** use a currently trending sound when the hook fits it; the embedded music bed is
  the floor, not the ceiling. Trend sounds are the main organic-reach lever and the one thing a
  spec file cannot hold — so at publish time, prefer the TikTok app's trending audio over the
  embedded bed when the edit allows (the `-silent.mp4` exists for exactly this).
- Pinned comment on every video: the one-liner + the CTA ("after-stories.com — link in bio"),
  because TikTok search indexes comments too.

### Guardrails — the checklist before anything is posted

1. Fresh footage: no shot was posted before (check against the motion repo's `reels/` and
   the shipped NAS folders), and the episode's look differs from the last one.
2. Every on-screen line traces to the brand sources (shotlist names the source + check date).
3. Launch status re-checked; CTA matches it.
4. No faces, no readable UI, no logos in AI footage; icon only on the end card. Never show a
   phone screen (phones are fine face-down or back-to-camera, camera module lit and
   unmistakable). Review every frame of the clip, not just the still (LTX drift).
5. Deletion is only shown after the save-all-photos beat.
6. No price, no invented numbers, no testimonials.
7. `aiMedia: true`; the AI-label reminder leads the post file.
8. ffprobe verified 1080×1920/30 fps; human reviewed the contact sheets.
9. Max 5 hashtags, including `#afterstories`; pinned comment set.

## 4. Cadence

Organic reach on TikTok is a frequency game: 3–4 posts/week, every series represented, never
two of the same series back to back.

#### Phase 1 — waitlist phase (now → launch)
Goal: waitlist sign-ups + a recognizable presence, so launch day is not cold.

**Production is one video per night (Robert's rule 2026-10-16, supersedes the 3–4/week
cadence):** the nightly job builds the first `queued` row in table order EVERY night —
no due-date gate — and hands it over, so Robert always has a fresh episode to post.
Built episodes wait in his posting backlog until he posts them. The plan keeps the
series rotation (two builds in a row never the same series), a fresh shoot per episode,
the music bed rotating (§5), all pre-launch ("Get notified") until launch is announced.
The "week of" column is now a calendar anchor for the moment's timing (post by that
week's deadline), not a production gate.

- **Calendar beats are in the plan:** each row sits in the week before its moment (§6
  calendar hooks) — e.g. office-events with the Christmas party hook in the week of Nov 2
  (post by ~Nov 14), family-reunion with the US Thanksgiving hook in the week of Nov 16
  (post by ~Nov 22).
- **Re-check the CTA status weekly** — it flips to "Available on the App Store" the day
  Robert says launch (§2 / Phase 2).
- **Posted so far:** see the §8 post log. Built but not yet posted episodes stay in §6 with
  their `built …, ready` status until Robert posts them. Nothing from any posted shoot may
  be reused (§3 "New content, always").

#### Phase 2 — launch (App Store live)
- Flip every end card to the download CTA the same day.
- Re-cut the 2–3 best waitlist videos with the new CTA and re-post (fresh hooks).
- Post 4×/week for the first month; the invite link and word of mouth are the growth engine —
  the content job is to make new groups *want* the invite.

#### Cadence rules
- Post in the target audience's evening (18:00–21:00 local) — the content is for friend groups,
  worldwide, English; test, then keep the best two slots.
- Reply to every comment in the first hour. Seed the pinned comment.
- Duets/stitches: reply to "group chat horror" content with a 10 s "here's what happens instead"
  cut — the cheapest reach we get.

## 5. Format playbook

### The engine: what a TikTok here is

A 15–20 s vertical video (1080×1920, 30 fps) built in the motion repo:
AI mood footage (ComfyUI) + on-screen type in the brand skin, rendered by the Reel template.
The proven shape (see the shipped `after-stories-corporate` cuts):

1. **Hook (frame 0):** the pain or the question, in the site's own words, on screen immediately.
2. **The promise (3–4 shots, ~2 s each):** the life the app enables, as AI mood footage —
   places, light, motion, hands, backs, silhouettes. Never the product UI.
3. **The twist / proof:** one concrete fact from the brand sources ("48 hours later, it's gone.").
4. **End card:** real app icon + name + the CTA that matches the launch status.

### Content pillars — the standing series

Organic growth on TikTok comes from a repeatable format people subscribe to, not one-off promos.
Run four standing series. Each episode is one use case or one feature; the format stays the
same, the subject changes.

#### Series A — "The group chat" (problem-first)
- **Format:** the villain story. Opens on the pain line, shows the chaos (plans buried, photos
  stuck on phones), lands on the promise, end card.
- **Hook bank (verbatim site lines):** "Group chats are where plans go to die." · "The plan
  sinks under 400 messages." · "Your trip is buried in the group chat." ·
  "Everyone has the photos. Nobody has the photos." (paraphrase — check against the site before
  using)
- **Best for:** cold reach, the first video a new viewer sees.

#### Series B — "The morning after" (payoff-first)
- **Format:** opens on the best-looking shot and the promise line ("Wake up to the story."),
  the pain comes second. The summary is the star: the photo everyone loved, the line of the
  night, what you decided, every picture on your phone.
- **Hook bank:** "Wake up to the story." · "Nobody had to make it." ·
  "The best photo. The best line. What you decided." (all from the brand script › Success)
- **Best for:** converting viewers who are already curious; the A/B partner of every Series A
  episode (same footage, two cuts — the cheap part).

#### Series C — "Gone in 48 hours" (feature spotlight: ephemerality)
- **Format:** one twist video per episode, built around a single feature. The deletion series:
  show the photos being saved first (always), then the event disappearing. Frame it as freedom,
  not loss.
- **Hook bank:** "48 hours later, it's deleted." · "Save every photo. Then it's gone."
- **Feature spotlights in the same shape:**
  1. **Polls → decisions:** "A poll becomes a decision." — nobody scrolls back 300 messages.
  2. **One stream:** "One stream for the whole event." — no chat that lives forever.
  3. **Nobody left out:** "Friends without an iPhone join from the web."
  4. **Private by design:** "No feed, no followers, no strangers." · "Never your location."
     (photos stripped of GPS and camera data before upload — the site's exact claim).
- **Best for:** the differentiator videos. Ephemerality is the thing no competitor says; it is
  the most shareable hook we have.

#### Series D — "Works for this too" (use-case walk-through)
- **Format:** one episode per event type, same skeleton, one line that proves it fits: the site's
  event-page headline, its problem line, its morning-after line.
- **Episode list (match the live site pages; re-check `llms.txt` before each):**
  trips (the hero — make 3 episodes, one per angle), nights-out, birthdays, bachelor-parties,
  festivals, dinner-nights, office-events, match-day, graduation, family-reunion, recital,
  fundraiser.
- **Office events get a different register:** warm, still witty, no hangover jokes (positioning
  › use case 7). The organizer is the buyer.
- **Best for:** ASO adjacency — each episode's hashtags mirror the use case's ASO keyword set so
  search-driven TikTok viewers find it.

#### What we do not make
- Weddings, big events, anything public (the 50-member cap and the 48 h deletion don't fit).
- Anything that implies a social network, a feed, or a following. We are a private app per event.
- Hangover-porn content as a brand: light humour yes, "cheeky, never laddish".

### Claim sheet — what each §6 feature may say (added 2026-10-15)

Verbatim from the live site (home page, the use-case pages and `llms-full.txt`, read
2026-10-15). Use these lines, not paraphrased numbers or promises. If a line here and the
site disagree, the site wins.

| Feature | Verbatim line(s) |
|---|---|
| Polls → decisions | "Polls that turn into decisions" · "Polls become decisions, jobs get a name, and it all stays on top in order." · "Put three evenings to a vote and the group picks one." |
| Timeline | "A timeline of everything the group decided" · "It all sits on top of the event, so nobody asks again." |
| One stream | "One private stream for messages and photos" · "One stream for the whole event" · "Tap ❤️ on the ones that matter." |
| The morning after | "The morning-after summary: the most-liked photo, the line of the night, the decisions" · "Wake up to the story." · "Nobody had to make it." |
| Save all photos | "Save every photo to your phone with one tap" · "Save every photo with one tap first." |
| 48 h deletion (always after the save line) | "Deleted for everyone 48 hours after the event" · "Before that, everyone gets a reminder and can save all the photos to their own phone with one tap." · "You keep the memories. The app forgets the rest." · "What happens on the trip stays in the trip." |
| Group size | "Up to 50 people per event" · "Up to 50. That fits most groups, from a handful of friends to a big party." |
| Friends without an iPhone | "Friends without an iPhone join from the web." · "The invite link works for everyone." |
| Privacy | "No feed, no followers, no strangers." · "Each event is its own private space." · "Never your location." · "Photos are stripped of GPS and camera data before upload." · "Sign in with Apple means no passwords." |
| Office events | "Skip the 30 emails." · "No admins, no profiles, no feed." · "No work chat left behind." · "There are no company accounts, licences or admin settings." |
| One event = one day | "One event covers one day and its night, until 6 the next morning." · "For a weekend away, make one event per day." |
| Launch status | "Coming soon to the App Store for iPhone" · CTA "Get notified" (§2) |

**Never claim:** a weekend or a whole festival in ONE event (multi-day is "not yet" —
one event per day); an Android app (non-iPhone friends use the web); location sharing,
maps or "find your friends"; a public feed, sharing out or a share of the summary to other
apps; more than 50 people; that it works for weddings, big or public events; an "Add to
calendar"; that photos are kept or backed up after 48 h; a launch date; any price ("free"
included); any user count, rating, review or testimonial; a competitor by name.

### Production pipeline (per video)

All production lives in the motion repo (`/workspace/motion`), via the `social-video` and
`video-from-url` skills. The pipeline:

1. `cd /workspace/motion && git pull --ff-only`; reuse the brand setup in
   `assets/after-stories/` (icon-512.png + Anybody font) — already proven in the corporate
   campaign. Refresh the brief with `site-brief https://after-stories.com --name <slug>` when a
   campaign is older than ~2 weeks, so the verbatim lines and the CTA status are current.
2. **Shotlist** → `docs/<slug>.md` in the motion repo: platform, angle, hook (verbatim line +
   source), 4–6 shots of 2–4 s, which shots move (clip) and which are stills, and the fresh
   shoot's style line (which place/light/season/props this episode uses — different from the
   last episode's, §3 "New content, always").
3. **Stills** (one per shot, one shared style, 9:16): `comfy-gen --aspect 9:16 --prompt "…"
   --prefix <slug>-s1 --copy-to /workspace/motion/assets/<slug>/` (~40 s each).
4. **Clips** (only the moving shots, ≤ 5 per video): `comfy-gen --model ltx --image …
   --seconds 4 --prefix <slug>-c1 …` (~2 min each).
5. **Spec** → `reels/<slug>.json`: brand skin (Anybody 800 @ 75 % width, accent `#FF2D6F` on
   `#0B0C0E`), `aiMedia: true`, `end.image` = the icon, `post` caption without hashtags,
   `hashtags` list, audio `bed: 'music'` (the warm groove; never the clicky `beat` bed) with
   `clips: false` unless the clip sound is the idea (§3).
6. **Render:** `motion-render -- npm --prefix remotion run --silent reel -- reels/<slug>.json`
   (~1 min). Fix ERROR lines; fix WARN lines where possible.
7. **Verify** with ffprobe (1080×1920, 30 fps, h264, yuv420p) — never trust the renderer's PASS
   line.
8. **Deliver** to `/nas/spark/videos/<slug>/` (MP4, silent version, review sheets, post file).
9. **Human review of `contact.png` / `phone.png` before posting** — the agent cannot see images.
10. **Commit** `docs/<slug>.md`, `reels/<slug>.json`, used `assets/<slug>/` to the motion repo
    (`master`) and push. Never commit `out/`.

**One video per episode (since 2026-10-13):** the default is a single spec — the angle
that fits the episode (problem-first, payoff-first or feature-twist), not a mandatory A/B
pair. Two cuts of one shoot remain available as a deliberate A/B test when a hook is worth
testing; the nightly build (§6) always makes one.

**The music bed rotates (since 2026-10-13):** set `audio.variant` (0–5) in the spec so no
two episodes share a bed. Take it from the Music variant column of the §6 plan; a
variant may repeat only ≥ 6 episodes later. `bed` stays `music`, never `beat`.

**Time budget:** ~45 s per still, 2–6 min per clip, ~1 min per cut. A full episode (6 shots,
5 clips, 1 cut) ≈ 25–50 min — comfortably inside one nightly window.

## 6. Content plan

Plan period: week of Oct 19, 2026 – week of Feb 22, 2027 (next extension due by ~Feb 8, 2027).

### Calendar hooks — the moments this plan piggybacks on (added 2026-10-12, rebuilt 2026-10-15)

The calendar is the reach engine: a video posted into a real planning moment (people
actually planning THAT get-together) outperforms a video about an event in general. Post
~1–3 weeks before the group starts planning (often well before the date), post in the
audience's evening, and let the hook name the moment in the site's own voice (the
event-page lines already carry most of it — check the live page before writing).

**The lens is the friend group** (and, second, colleagues): moments when a small group
plans a get-together and then wants everyone's photos — up to 50 people, one day and its
night per event. Moments that are about couples, weddings, big public crowds or one
family's private ritual are left out or demoted (list below, and §9).

| Moment | Date | Post by | Use case (site page) | Angle | §6 rows |
|---|---|---|---|---|---|
| **Halloween** | Sat Oct 31, 2026 | Oct 28 | nights-out (costume party / house party) | where to meet, where next; "Piece it together tomorrow." | Oct 19 #1, Oct 26 #3 |
| **Friendsgiving** | no fixed date; usually the days before Thanksgiving (~Nov 19–25) | Nov 15 | dinner-nights (Potluck) | picking the evening and who brings what — friends, not family | Nov 2 #4, Nov 9 #1 |
| **Office Christmas party** (second audience) | late Nov – mid Dec; the organiser starts in early Nov | Nov 14 (first row) | office-events (own page, calmer register) | "Skip the 30 emails."; four tools, one party; the morning after with no work chat left behind | Nov 2 #3, Nov 16 #3, Dec 14 #1 (Jan 11 #3: the January kick-off) |
| **US Thanksgiving long weekend** | Thu Nov 26, 2026 (+ Fri–Sun) | Nov 22 | family-reunion | the whole family in one plan; the photo of the day afterwards | Nov 16 #1, Nov 23 #1 |
| **Ski season opens** | late Nov – Dec (resort opening dates vary) | Nov 29 | trips (Ski day chip) | which day, where to, who brings what | Nov 23 #2 |
| **Christmas with friends** (friends' Christmas dinner, Christmas drinks) | December; Christmas is Fri Dec 25, 2026 | Dec 5 | dinner-nights; nights-out (Friday drinks) | picking one December evening for six people | Nov 23 #3, Nov 30 #1, Dec 7 #3 |
| Christmas concerts (choir, school, amateur shows) | December (pattern) | Dec 6 | recital | friends and family who come to watch; every photo of the performance | Nov 30 #3 |
| Christmas-break day trips | Dec 24, 2026 – Jan 3, 2027 (pattern) | Dec 20 | trips (Lake day) | the easy day away between the holidays | Dec 14 #4 |
| **New Year's Eve** | Thu Dec 31, 2026 | Dec 28 | nights-out (New Year's Eve chip) | where to start, where next; the night's coordinator; New Year's Day morning after | Dec 14 #2, Dec 21 #1, #3 |
| New Year trips / January weekends away | Jan 2027 (pattern) | Jan 8 | trips (hero) | "The next trip, without the 300 messages." | Dec 28 #2, Jan 4 #1 |
| **Hen & stag / bachelor(ette) planning** | send-offs for spring–summer get planned in winter (pattern, no figure claimed) | from Dec 28 | bachelor-parties | one organiser, a dozen decisions; keep the photos, lose the chat | Dec 28 #1, Jan 18 #4 |
| **MLK Day long weekend** (US) | Mon Jan 18, 2027 | Jan 13 | trips (weekend away = one event per day) | vote on the day, the place and who drives | Jan 11 #1 |
| **Burns Night** (UK, niche) | Mon Jan 25, 2027 | Jan 21 | dinner-nights | supper with friends: the food, not the logistics | Jan 18 #1 |
| **Lunar New Year** | Sat Feb 6, 2027 (Year of the Goat) | Feb 1 | family-reunion | the reunion dinner: plan it together, bring every photo home | Jan 25 #1 |
| **Six Nations opening weekend** (rugby, UK/IE/FR/IT) | Fri Feb 5 – Sat Feb 6, 2027 | Feb 3 | dinner-nights (Watch party chip) | friends round for the match: who brings what | Jan 25 #3 |
| **Galentine's Day** | Sat Feb 13, 2027 | Feb 8 | birthdays (celebrating someone) / brunch with friends | the friends' version of Valentine's — the friend group is the whole point | Feb 1 #1 |
| **Super Bowl LXI** watch party | Sun Feb 14, 2027 (SoFi Stadium) | Feb 10 | dinner-nights (Watch party chip) | put the questions to a vote: where, who brings what | Feb 8 #1 |
| **Presidents' Day + UK February half-term** | Mon Feb 15, 2027 (US); half-term mostly Feb 15–19 in England (some areas Feb 8–12) | Feb 10 | trips (Ski day) | the winter long weekend away | Feb 1 #3 |
| Festival season | summer 2027 (e.g. Glastonbury Jun 23–27); groups plan in winter–spring | — (no date in the post) | festivals (own page) | plan the festival together; every photo of the chaos | Feb 15 #2 |
| **St. Patrick's Day** | Wed Mar 17, 2027 | Mar 13 | nights-out (Pub quiz, Bar crawl) | where to meet and where to go next | Feb 22 #2 |
| **Spring break + Easter** | Mar–Apr 2027; Easter Sun Mar 28, 2027 | Mar 21 | trips (Road trip) | the spring day away; long weekend = one event per day | Feb 22 #4 |
| **Graduation season** | May–June 2027 | from Feb 22; peak in the next plan | graduation (own page) | three chats and the best photo on someone else's phone | Feb 22 #1 |
| Summer holidays | late May (DK schools) – Aug 2027 | ~May 28 | trips (Beach day, Boat trip) | the summer day trip | next plan |
| Festival season peak | June–July 2027 | ~June 11 | festivals | tickets, meeting point, camp | next plan |
| Football season kicks off | Aug–Sep 2027 | mid-Aug | match-day | "The carpool, sorted." | next plan |
| Halloween 2027 | Sun Oct 31, 2027 | Oct 27 | nights-out | the loop repeats every year | next plan |
| Milestone birthdays | all year | — | birthdays | fills weeks without a big moment | Oct 19 #3, Jan 11 #2, Feb 15 #4 |

**Left out on purpose** (see §9): **weddings and engagement season** (not marketed:
the 50-member cap and the 48 h deletion), **Valentine's Day** (Sun Feb 14 — couples, not
groups; Galentine's covers the friend angle), **Mardi Gras** (Tue Feb 9, 2027 — a US public
street event, niche), **Diwali** (Sun Nov 8, 2026) and **Hanukkah** (Dec 4–12, 2026) — no
audience data for them and no use-case page; **Black Friday** (shopping, not a get-together).

Standing rules for calendar episodes:
- **Fresh shoot per moment** (§3 "New content, always") — the film's light and props match
  the moment (Halloween = candlelight and capes, NYE = confetti light at midnight from
  outside, winter = cold blue light). The moment gives the episode its look for free.
- The hook names the moment with a short prefix ("Halloween:", "Burns Night:") and then a
  site line, verbatim or clearly paraphrased; never invent facts about the moment (no
  dates, statistics or "everyone is…" claims). The CTA and the 48 h beat stay standard.
- 5 hashtags max (§3): one broad (#friends), 2–3 niche tied to the moment (#halloween
  #partyplanner), and #afterstories.
- Log each posting and the 48 h numbers in the §8 post log — the calendar doubles as the
  archive of what each moment earned.

Dates checked 2026-10-15 by web search: Super Bowl LXI (Sun Feb 14, 2027 — the NFL called
it "tentative" when it awarded the game; re-check before the Feb 8 row is built), Lunar New
Year 2027 (Sat Feb 6), Mardi Gras / Easter 2027 (Feb 9 / Mar 28), Six Nations 2027 opening
weekend (Feb 5–6), UK February half-term 2027 (varies by council; Feb 15–19 is the common
week), Glastonbury 2027 (Jun 23–27), Friendsgiving (no fixed date). Fixed or rule-based:
Halloween, Christmas, NYE, Burns Night (Jan 25), Galentine's (Feb 13), St. Patrick's (Mar 17),
US Thanksgiving (4th Thu of Nov), MLK Day (3rd Mon of Jan), Presidents' Day (3rd Mon of Feb).
**Not verified (patterns, not dates):** Friendsgiving, office-party season, ski-resort
openings, Christmas concerts, hen/stag planning season, spring break, graduation and
festival planning — never state a date or a statistic for them in a post.

### The plan — what the nightly job reads (episode queue until 2026-10-15)

One row = one TikTok episode: a 15–20 s vertical reel (no carousels on this channel),
built by the nightly job and posted by hand by Robert. Rules for every row:

- **Which row is built:** each night the job builds one row: the first row in table order
  whose Status is `queued` (or empty) — **every night, no due-date gate** (Robert's
  2026-10-16 rule: one new video per day). When it is built, the job sets Status to
  `built <yyyy-mm-dd> <reel slug>`. When Robert tells it an episode is posted, the Status
  becomes `posted <yyyy-mm-dd>`; the next prune removes the row, and the history lives in
  the §8 post log, not here.
- **Posting is Robert's call:** 3–4 rows per week are planned (§4). The `built …, ready`
  rows at the top are his posting backlog; built episodes wait until he posts them.
- **Pre-launch CTA:** "Get notified" · "Coming soon · after-stories.com" until Robert
  announces launch (§2). If he says it's released, flip the CTA before building the next
  row.
- **One video per episode.** Fresh shoot: the Look / scene column is the start point and
  must differ from the last episodes (§3).
- **Music bed varies:** the Music variant column is `audio.variant` (0–5) in the spec; no
  variant repeats within 6 episodes (the column already follows the rotation).
- **Series rotate:** two rows in a row never have the same series (A problem-first,
  B payoff-first, C "Gone in 48 hours" / feature spotlight, D "Works for this too", §5).
- **Copy is verbatim** from the live site (re-check `llms-full.txt` the night of the build —
  the table was checked 2026-10-15). The hook is the frame-0 line; "(para.)" marks a
  paraphrase. Claims only from the §5 claim sheet.
- **Phone rule:** never a visible phone screen (face-down / back-to-camera, camera module lit).
- **Deletion only after the save beat**, in every row that mentions 48 h (§3).
- If a calendar window opens earlier than planned, its row may move up; note it in §8.

| Week of | # | Slug | Series | Use case / feature (· moment) | Hook (frame 0) | Look / scene (fresh shoot; differs from the last) | Music variant | Status |
|---|---|---|---|---|---|---|---|---|
| Oct 19 | 1 | as-halloween-a/b | D | nights-out · Halloween | “A night out shouldn't need a project manager.” | halloween night out (built) | 0 | built 10-12, ready |
| Oct 19 | 2 | as-gone-a/b | C | 48 h, photos saved first | “48 hours later, it's gone.” | dusk rooftop → morning (built) | 0 | built 10-13, ready |
| Oct 19 | 3 | as-birthday | D | birthdays | “Plan the birthday together. Everyone gets the photos.” | evening, indoor party, balloons + candlelight, confetti (built) | 1 | built 2026-10-13, ready |
| Oct 26 | 1 | as-one-stream | C | one stream | “One private stream.” | blue hour, friends' backs, city lights, one shared view (built) | 2 | built 2026-10-14, ready |
| Oct 26 | 2 | as-match-day | D | match-day | “The carpool, sorted.” | match-day street, stadium glow, boots and flasks, no faces | 3 | built 2026-10-16 as-match-day |
| Oct 26 | 3 | as-halloween-chat | A | nights-out · Halloween | “Halloween: The plan changed four times. The chat has 400 messages.” | costume rail and hallway mirror at blue hour, capes on hooks, glitter on the floorboards, backs only | 4 | built 2026-10-16 as-halloween-chat |
| Nov 2 | 1 | as-dinner | D | dinner-nights | “Plan the dinner, game or movie night.” | warm kitchen, tungsten, table set for six, steam and plates | 5 | queued |
| Nov 2 | 2 | as-polls | C | polls → decisions | “Polls that turn into decisions.” | three options on the table as physical cards → one card wins | 0 | queued |
| Nov 2 | 3 | as-office-xmas | D | office-events · Christmas party | “Skip the 30 emails.” | office after hours, Christmas lights on, one team table | 1 | queued |
| Nov 2 | 4 | as-friendsgiving-date | A | dinner-nights · Friendsgiving | “Friendsgiving: Six people, three possible evenings, and the date still isn't set.” | rainy apartment window, a stack of mismatched borrowed chairs, wet autumn leaves on the sill, grey-violet dusk | 2 | queued |
| Nov 9 | 1 | as-friendsgiving | D | dinner-nights (Potluck) · Friendsgiving | “Friendsgiving: Put three evenings to a vote and the group picks one.” | potluck table from above, mismatched dishes arriving in hands, amber lamps, rust and cream | 3 | queued |
| Nov 9 | 2 | as-morning-after | B | the morning after | “Wake up to the story.” | pale morning, coffee on the table, window light, the night's photos | 4 | queued |
| Nov 9 | 3 | as-photos-stuck | A | photos stuck on phones | “Hundreds of photos stuck on six phones” | six phones face-down on a wooden bench after a hike (camera modules lit), muddy boots, cold golden hour | 5 | queued |
| Nov 9 | 4 | as-likes | C | likes → the most-liked photo | “Tap ❤️ on the ones that matter.” | winter market at night, mulled-wine steam, mittened hands, string lights | 0 | queued |
| Nov 16 | 1 | as-reunion | D | family-reunion · US Thanksgiving | “Plan the family reunion together.” | long table, three generations' hands, late-afternoon sun | 1 | queued |
| Nov 16 | 2 | as-nobody-left-out | C | web for friends without an iPhone | “Friends without an iPhone join from the web.” | mixed group from behind, one person with a laptop, all in the loop | 2 | queued |
| Nov 16 | 3 | as-office-chat | A | office-events · Christmas party | “Four tools, one party, and nobody knows what was decided.” | office kitchenette at 5 pm, tinsel spilling from a drawer, paper cups, cool fluorescent to warm desk lamp | 3 | queued |
| Nov 16 | 4 | as-private-by-design | C | private by design | “No feed, no followers, no strangers.” | empty private room at dusk, a circle of chairs, no screens at all | 4 | queued |
| Nov 23 | 1 | as-thanksgiving-after | B | family-reunion · Thanksgiving weekend | “The photo of the day, the line of the reunion, what you decided.” | day-after kitchen, folded tablecloth, leftover pie under foil, flat grey November light | 5 | queued |
| Nov 23 | 2 | as-ski-day | D | trips (Ski day) · ski season opens | “Ski day: Which day, where to, who brings what.” | cable car at blue hour, skis against a fence, frost, cold blue with a pink sunset edge | 0 | queued |
| Nov 23 | 3 | as-friends-xmas-date | A | dinner-nights · Christmas with friends | “Picking one evening for six people shouldn't take two weeks of messages.” | coat hooks overloaded with scarves, a paper advent calendar, a door left ajar onto a warm hallway | 1 | queued |
| Nov 23 | 4 | as-save-first | C | save all photos, then 48 h | “Save every photo. Then it's gone.” | a hand taps a photo into a phone's gallery (no screen), then the event empties | 2 | queued |
| Nov 30 | 1 | as-friends-xmas | D | dinner-nights · Christmas with friends | “Christmas with friends: Which night? Who's cooking?” (para.) | candlelit long table in a small flat, paper crowns, clementines, fogged window | 3 | queued |
| Nov 30 | 2 | as-timeline | C | timeline of decisions | “A timeline of everything the group decided.” | blank paper tickets pinned left to right along a string in warm lamp light, the decisions in order | 4 | queued |
| Nov 30 | 3 | as-show-night | D | recital (Choir concert) · Christmas concerts | “Plan the show night together. Everyone gets the photos.” | church hall from the back row, folding chairs, fairy lights, sheet music on a stand | 5 | queued |
| Dec 7 | 1 | as-trips-bring | B | trips · the morning after | “Bring every photo home.” | airport → car → home: one day, three lights, the box of photos grows | 0 | queued |
| Dec 7 | 2 | as-fresh-event | C | one event per night (Book club) | “Each night is its own event. Last week's chat doesn't pile up.” | a stack of books, tea, a low lamp, a fresh empty table each week (match cut) | 1 | queued |
| Dec 7 | 3 | as-xmas-drinks | D | nights-out (Friday drinks) · Christmas drinks | “Christmas drinks: Plan the night out. Piece it together tomorrow.” | pub doorway at blue hour from outside, a wreath, breath in the cold, backs in wool coats | 2 | queued |
| Dec 7 | 4 | as-send-the-pics | A | photos never come | “can someone send the pics??” | the boot of a car after a weekend away, six bags and a cool box, frost on the rear window, morning sun | 3 | queued |
| Dec 14 | 1 | as-office-after | B | office-events · the morning after | “Everyone gets the photos. No work chat left behind.” | office the morning after the party: paper crowns on desks, chairs stacked, grey-pink daylight | 4 | queued |
| Dec 14 | 2 | as-nye-plan | D | nights-out (New Year's Eve) | “New Year's Eve: Ask the group where to start and where to go next.” | city street at 11 pm, sparklers in gloved hands, gold confetti in wet-asphalt reflections | 5 | queued |
| Dec 14 | 3 | as-keep-memories | C | 48 h, photos saved first | “You keep the memories. The app forgets the rest.” | cabin table cleared at dawn: candles out, a box of prints, the lid closing | 0 | queued |
| Dec 14 | 4 | as-winter-day-trip | D | trips (Lake day) · Christmas break | “A day away should be the easy part of having friends.” | frozen lake at golden hour, a thermos, skates on the ice, long shadows | 1 | queued |
| Dec 21 | 1 | as-nye-chat | A | nights-out · New Year's Eve | “New Year's Eve: someone always ends up as the night's coordinator.” | stairwell of a party building, coats piled on the banister, a door of warm light and muffled bass | 2 | queued |
| Dec 21 | 2 | as-never-location | C | never your location | “Never your location.” | ski-lodge window at night, a paper trail map with a pencil circle round the hut, no screens | 3 | queued |
| Dec 21 | 3 | as-nye-morning | B | nights-out · the morning after NYE | “New Year's Day: Piece it together tomorrow.” (para.) | Jan 1 morning, streamers on a balcony rail, pale gold light, two cold glasses and a coffee | 4 | queued |
| Dec 28 | 1 | as-bachelor | D | bachelor-parties · send-off planning season | “Keep the photos. Lose the chat.” | send-off morning, beach, from behind, long shadows | 5 | queued |
| Dec 28 | 2 | as-which-weekend | A | trips · the plan gets lost | “wait which weekend did we land on?” | wall calendar with three weekends circled in three pens, a cabin key on a hook, low winter sun | 0 | queued |
| Dec 28 | 3 | as-fifty | C | up to 50 people | “Up to 50. That fits most groups, from a handful of friends to a big party.” | a long hallway lined with coats and boots, from the doorway, warm party glow at the far end | 1 | queued |
| Jan 4 | 1 | as-new-year-trip | D | trips · New Year getaway | “The next trip, without the 300 messages.” | empty train platform at dawn in snow, backpacks, steam from the engine | 2 | queued |
| Jan 4 | 2 | as-jobs | C | jobs get a name | “Who brings the cake, who books the table.” | blank paper tags tied to a cake box, a speaker and car keys on a hall table, soft daylight | 3 | queued |
| Jan 4 | 3 | as-second-job | A | the organiser's second job | “Getting your friends together shouldn't feel like a second job.” | Sunday-night desk lamp, sticky notes curling, a cold tea, rain on the window | 4 | queued |
| Jan 4 | 4 | as-night-in | B | dinner-nights (Game night) · the morning after | “The story of a good night.” | game pieces on a rug the morning after, low winter sun, an empty pizza board | 5 | queued |
| Jan 11 | 1 | as-mlk-weekend | D | trips · US MLK long weekend (one event per day) | “Long weekend: Vote on the day, the place and who drives.” | snowy cabin porch at blue hour, firewood stack, boots in a row, a lit window | 0 | queued |
| Jan 11 | 2 | as-birthday-chats | A | birthdays · three chats | “One birthday, three chats, and the best photo is on someone else's phone.” | an unlit birthday cake on a kitchen counter, three coats on three chairs, tungsten and pink fairy lights | 1 | queued |
| Jan 11 | 3 | as-kickoff | D | office-events (Kick-off) | “Kick-off: Plan the team event.” | meeting room turned into a dinner table, kraft-paper runner, January daylight to candlelight | 2 | queued |
| Jan 11 | 4 | as-reminder | C | the 48 h reminder, save all first | “Everyone gets a reminder and can save all the photos with one tap.” (para.) | a darkroom-red hallway clock at 47:59 on a paper card, then dawn light through blinds | 3 | queued |
| Jan 18 | 1 | as-burns-night | D | dinner-nights · Burns Night | “Burns Night: Hosting should be about the food, not the logistics.” | tartan blanket, candlelit supper table, small glasses, peat fire, dark wood | 4 | queued |
| Jan 18 | 2 | as-one-tap | C | save every photo with one tap | “Save every photo to your phone with one tap.” | darkroom red light, prints drying on a line, one becomes many | 5 | queued |
| Jan 18 | 3 | as-every-phone | B | trips · the morning after | “Come home with every photo from every phone.” | car boot unloaded at dusk, sleeping bags, a dog's lead, porch light coming on | 0 | queued |
| Jan 18 | 4 | as-hen-chat | A | bachelor-parties · the organiser | “One organiser. A dozen decisions. Nobody answering.” | spa robes on hooks, an empty pool at dawn, steam on tiles | 1 | queued |
| Jan 25 | 1 | as-lunar-reunion | D | family-reunion · Lunar New Year | “Lunar New Year: Plan the reunion together. Bring every photo home.” | red lanterns, a round table from above, dumplings, hands of three generations, red-gold light | 2 | queued |
| Jan 25 | 2 | as-on-top | C | decisions on top of the event | “It all sits on top of the event, so nobody asks again.” | a fridge door with three paper slips under magnets → one remains, morning kitchen light | 3 | queued |
| Jan 25 | 3 | as-six-nations | D | dinner-nights (Watch party) · Six Nations opening weekend | “Six Nations weekend: put a name on who brings what.” | living room with scarves over the sofa back, a rugby ball on the rug, TV glow from behind (screen out of frame) | 4 | queued |
| Jan 25 | 4 | as-family-chat | A | family-reunion · the family group chat | “Twenty-four people, one lake, and the plan is in a family group chat.” | a winter lake jetty in fog, a row of wellies, a picnic basket under snow | 5 | queued |
| Feb 1 | 1 | as-galentines | D | birthdays · Galentine's | “Galentine's: Celebrating someone should be fun for the people throwing it too.” | pink-lit brunch table, coupe glasses, carnations, bright window light | 0 | queued |
| Feb 1 | 2 | as-no-gps | C | photos stripped of GPS and camera data | “Photos are stripped of GPS and camera data before upload.” | blank-backed prints slid into plain paper sleeves on a sunlit desk, a strip of masking tape, no writing | 1 | queued |
| Feb 1 | 3 | as-half-term-ski | D | trips (Ski day) · Presidents' Day / UK half-term | “Ski day: The day, the place, the plan and every photo, in one place.” | chairlift at noon, hard sun on snow, gloves and goggles on a bench, deep blue sky | 2 | queued |
| Feb 1 | 4 | as-book-the-house | A | trips · nobody booked | “did anyone actually book the house” | a dark holiday-cottage doorway, a key safe, suitcases on the step, cold dusk | 3 | queued |
| Feb 8 | 1 | as-super-bowl | D | dinner-nights (Watch party) · Super Bowl LXI | “Watch party: Put the questions to a vote and get the answers in one place.” | game-day snacks on a coffee table, plain foam fingers (no logos), lamp light, backs on a sofa | 4 | queued |
| Feb 8 | 2 | as-tonight-tomorrow | B | nights-out · the morning after | “Make tonight easy to plan, and tomorrow easy to remember.” | Sunday-night street after rain, neon-pink reflections, takeaway boxes on a step | 5 | queued |
| Feb 8 | 3 | as-no-admins | C | office: private by design | “No admins, no profiles, no feed.” | an empty open-plan office at night, chairs pushed in, one desk lamp left on | 0 | queued |
| Feb 8 | 4 | as-trip-links | A | trips · the plan is buried | “Three links to places, buried in the chat” | a paper map with three coffee-cup rings, a pin, a dark café table, rain outside | 1 | queued |
| Feb 15 | 1 | as-match-photo | B | match-day · the photo of the match | “The photo of the match, saved.” | floodlit winter pitch from the sideline, steam off a thermos, muddy studs | 2 | queued |
| Feb 15 | 2 | as-festival | D | festivals · summer plans start | “Plan the festival together. Keep every photo of the chaos.” | festival field, golden hour, flags and haze, hands not faces | 3 | queued |
| Feb 15 | 3 | as-one-day | C | one event = one day (weekends: one per day) | “One event covers one day and its night, until 6 the next morning.” | a 24-hour time-lapse of a cottage window: noon, dusk, night, 6 am | 4 | queued |
| Feb 15 | 4 | as-milestone | D | birthdays (Milestone birthday) | “Milestone birthday: Vote on the date and the venue.” | a rented hall being dressed, gold number balloons (no number readable), ladders, afternoon light | 5 | queued |
| Feb 22 | 1 | as-graduation-chats | A | graduation · three chats | “One graduation, three chats, and the best photo is on someone else's phone.” | an empty mortarboard on a chair, garden bunting, late-spring light | 0 | queued |
| Feb 22 | 2 | as-st-patricks | D | nights-out (Pub quiz) · St. Patrick's Day | “St. Patrick's Day: Vote on where to meet and where to go next.” | green-lit pub window from the street, a chalkboard (no words), umbrellas, blue hour | 1 | queued |
| Feb 22 | 3 | as-stays-in-trip | C | 48 h, photos saved first | “What happens on the trip stays in the trip.” | a beach house at dawn: towels on a rail, a box of prints carried out, then an empty deck | 2 | queued |
| Feb 22 | 4 | as-spring-break | D | trips · spring break / Easter | “Spring break: Plan the trip together. Bring every photo home.” | road trip in spring: blossom over a lay-by, an open van door, bright pastel morning | 3 | queued |

**When the plan runs short** (fewer than 7 `queued` rows — a week at one per day), the job adds rows
from the site's use-case pages, the Series C feature list and the next calendar hooks —
same columns, same verbatim check, the series and variant rotations kept, a new slug and a
new look per row — and logs it in §8.

## 7. Review procedure

90-day goal is raw installs (positioning.md › Measuring):

- **App Store Connect:** installs by source (App Store search / referrer / web referrer). The
  invite page's link carries `ct=invite`; add a `ct=tiktok` token to the App Store link we use
  from TikTok when the tracking supports it, so TikTok-driven installs count separately.
- **Umami:** after-stories.com visits from `tiktok` referrer.
- **TikTok native:** watch time, follows, profile visits, and — in the waitlist phase — the
  waitlist form's sign-ups attributed to TikTok traffic.
- **Per-video review after 48 h:** hook rate (views past 3 s), completion, shares. Keep a
  one-line log in the motion repo next to each shotlist: what worked, what got cut. The
  "events that reach the summary" metric from PostHog sits next to installs to answer "are
  these installs worth anything".

## 8. Learnings log

**Post log** (one line per post, updated when each 48 h review lands):

| Date | Video | Hook | 48 h result (hook rate / shares / waitlist) | Verdict |
|---|---|---|---|---|
| 2026-10-08 | as-moments | Group chats… | — | posted |
| 2026-10-08 | corporate a/b | Your team event lives in 5 apps. | — | posted |
| 2026-10-12 | **as-trips-a** (fresh summer shoot) | Group chats are where plans go to die. | due 2026-10-14 | A/B vs as-trips-b (post ~10-14) |
| ~2026-10-21 | **as-halloween-a** (fresh Halloween shoot) | A night out shouldn't need a project manager. | due ~2026-10-23 | A/B vs as-halloween-b (post ~10-23) |
| ready 2026-10-13 | **as-gone-a/b** (fresh day/night shoot) — first Series C "Gone in 48 hours" | 48 hours later, it's gone. | due on post | A/B vs as-gone-b; post A ~2026-10-14, B ~2026-10-16 |
| ready 2026-10-13 | **as-birthday** (fresh indoor night-party shoot) — queue row #1 (Series D) | Plan the birthday together. Everyone gets the photos. | due on post | post tomorrow evening (audience 18:00–21:00); AI label on |
| ready 2026-10-14 | **as-one-stream** (fresh blue-hour city shoot) — queue row #2 (Series C, one stream), music variant 2 | One private stream. | due on post | post tomorrow evening (audience 18:00–21:00); AI label on |
| built 2026-10-16 | **as-match-day** (fresh match-day night shoot — stadium floodlight glow, boots/flasks, from behind) — queue row Oct 26 #2 (Series D), music v3 | The carpool, sorted. | due on post | daily one-per-night cadence (Robert 2026-10-16); AI label on |
| built 2026-10-16 | **as-halloween-chat** (fresh interior costume-prep hallway shoot — capes on a rail, hallway mirror, glitter, tungsten vs dusk-violet) — queue row Oct 26 #3 (Series A), music v4 | Halloween: A night out shouldn't need a project manager. | due on post | post by Oct 28 (Halloween); AI label on; hook swapped from the table line — see §8 2026-10-16 |

- 2026-10-16 (nightly build, as-halloween-chat): the §6 table hook for row Oct 26 #3
  ("The plan changed four times. The chat has 400 messages.") carries two numbers that are not
  on the live site (llms-full.txt re-checked the night of the build 2026-10-16: the match-day
  page says "a hundred messages" and the fundraiser page says "scattered across a group chat" —
  no "400", no "four times"). The §3 truth rule bans invented numbers, so the verbatim site
  hook "Halloween: A night out shouldn't need a project manager." (nights-out page pain line)
  was used instead. The table hook cell stays as the planning line; this log row records the
  shipped hook.
- 2026-10-16 (Robert's rule: "Change that to automated. So I have a new video for
  after stories once a day."): production cadence changed from 3–4/week to **one
  video per night** — the nightly job now builds the first `queued` row in table
  order every night, no due-date gate (§4 Phase 1, §6 which-row-is-built). The
  "week of" column stays as the moment's calendar anchor (post by its deadline),
  not a production gate. "Runs short" threshold: 7 rows. The cron job prompt was
  updated to match (job after-stories-social-content).
- 2026-10-15 (Robert's request: "do the same for after-stories. Take the different types of
  apps into account"): §6 converted from the numbered episode queue to a dated plan — 71
  rows from the week of Oct 19, 2026 to the week of Feb 22, 2027 (Oct 6 · Nov 19 · Dec 14 ·
  Jan 16 · Feb 16 by week-of), 3–4 per week, columns Week of / # / Slug / Series / Use case /
  Hook / Look / scene / Music variant / Status. Posted rows (as-moments, corporate a/b,
  as-trips-a) left out (they are in the post log above); the four built rows (six videos) kept with their
  status verbatim at the top (Robert's posting backlog). The 12 queued rows kept slug,
  series, hook, look and variant; moved into dated weeks so the variant rotation holds:
  as-match-day Oct 26, as-dinner/as-polls/as-office-xmas Nov 2 (office by ~Nov 14),
  as-morning-after Nov 9 (no longer framed as the Halloween morning after),
  as-reunion/as-nobody-left-out/as-private-by-design Nov 16 (reunion by ~Nov 22),
  as-save-first Nov 23, as-trips-bring Dec 7, as-bachelor Dec 28, as-festival Feb 15.
  53 new rows, each with a new slug and look. Calendar hooks rebuilt for friend groups
  (added Friendsgiving, Christmas with friends, Christmas concerts, MLK weekend, Burns Night,
  Lunar New Year, Six Nations, Galentine's, Presidents' Day / half-term, hen & stag planning;
  dropped Mardi Gras to "left out"; dates web-checked). §5: claim sheet + never-claim list.
  §4: production wording now follows the dated plan. §1: the old-to-new section map removed
  and every reference in the body updated to the new numbers. Channel unchanged: TikTok
  only, posted by hand.

## 9. Open questions & watch items

- *Robert:* TikTok upload API — paused on the TikTok developer account (spark#118);
  until it lands every video is posted by hand from the Telegram delivery.
- *Robert:* the launch date — flips the CTA everywhere (§2).
- `ct=tiktok` App Store token — add when the tracking supports it (§7).
- after-stories.com has no `/go/?src=` hop yet (travel/event have one); until it
  does, TikTok traffic shows only as the `tiktok` referrer in Umami.
- Audience markets are unknown (no TikTok data yet). The plan leans US/UK (Thanksgiving,
  MLK, Super Bowl, Burns Night, Six Nations, half-term); re-weight once the §7 reviews show
  where viewers are.
- Super Bowl LXI date was "tentative" when the NFL awarded it — re-check before the Feb 8
  row is built. UK half-term varies by council (Feb 15–19 is the common week).
- Left out on purpose (re-open only on Robert's say-so): weddings / engagement season
  (not marketed), Valentine's Day (couples), Mardi Gras (US public event), Diwali and
  Hanukkah (no audience data, no use-case page).
- `as-reunion` keeps its queue hook "Plan the family reunion together."; the live page says
  "Plan the reunion together." — the build-night verbatim check should use the site's line.
- Posting backlog: four built rows (six videos) wait in §6 (`as-halloween-a/b` must go out before
  Oct 31). The job only builds `queued` rows, so a large backlog does not stop it; Robert
  tells it which ones are posted.
