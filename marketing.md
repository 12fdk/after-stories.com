# After Stories — Marketing Plan (living doc)

Owner: Robert · Maintained by: Hermes (social pipeline agent) · Last updated: 2026-10-15

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
  repo, in the same sections (spark#136). Nothing was dropped. References like
  "§5.6" in the text below use the OLD numbers; they map like this:

  | Old | New |
  |---|---|
  | §0 Launch status | §2 |
  | §1 The engine | §5 (format) and §3 (the non-negotiable rules) |
  | §2 Series, §4 Production pipeline | §5 |
  | §2.5 Look and sound, §3 Hashtags, §7 Guardrails | §3 |
  | §5 Calendar and cadence | §4 |
  | §5.5 Calendar hooks, §5.6 Episode queue | §6 |
  | §6 Measurement | §7 (review) and §8 (post log) |

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
  season, props, a different story beat) AND the music bed (§2.5) so each one reads as brand
  new; the type stays the brand.
- **One video per episode (Robert, 2026-10-13):** make a single video per episode, not an
  A/B pair. Two cuts of one shoot may still exist as an A/B test, but the default — and the
  nightly build (§5.6) — is one video.
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

**Production is queue-driven (since 2026-10-13):** one fresh episode per night, built by the
nightly job (§5.6), ready by morning. Robert posts when he wants — the queue (§5.6) is the
plan: series rotation (A → C → D → B → C → D …), fresh shoot per episode, music bed rotating
(§4), all pre-launch ("Get notified") until launch is announced.

- **Calendar beats inside the queue:** office-events with the Christmas party hook posts by
  ~Nov 14 (§5.5); family-reunion with the US Thanksgiving hook posts by ~Nov 22. The queue
  keeps those in their right windows.
- **Re-check the CTA status weekly** — it flips to "Available on the App Store" the day
  Robert says launch (§0 / Phase 2).
- **Posted so far:** `as-moments` + corporate pair (Oct 8) · `as-trips-a` (Oct 12, posted) ·
  `as-halloween-a/b` + `as-gone-a/b` (built Oct 12–13, ready to post). Nothing from any
  posted shoot may be reused (§1 "New content, always").

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
   last episode's, §1 "New content, always").
3. **Stills** (one per shot, one shared style, 9:16): `comfy-gen --aspect 9:16 --prompt "…"
   --prefix <slug>-s1 --copy-to /workspace/motion/assets/<slug>/` (~40 s each).
4. **Clips** (only the moving shots, ≤ 5 per video): `comfy-gen --model ltx --image …
   --seconds 4 --prefix <slug>-c1 …` (~2 min each).
5. **Spec** → `reels/<slug>.json`: brand skin (Anybody 800 @ 75 % width, accent `#FF2D6F` on
   `#0B0C0E`), `aiMedia: true`, `end.image` = the icon, `post` caption without hashtags,
   `hashtags` list, audio `bed: 'music'` (the warm groove; never the clicky `beat` bed) with
   `clips: false` unless the clip sound is the idea (§2.5).
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
testing; the nightly build (§5.6) always makes one.

**The music bed rotates (since 2026-10-13):** set `audio.variant` (0–5) in the spec so no
two episodes share a bed. Pick the next unused variant from the episode queue (§5.6); a
variant may repeat only ≥ 6 episodes later. `bed` stays `music`, never `beat`.

**Time budget:** ~45 s per still, 2–6 min per clip, ~1 min per cut. A full episode (6 shots,
5 clips, 1 cut) ≈ 25–50 min — comfortably inside one nightly window.

## 6. Content plan

### Calendar hooks — plan episodes against the calendar (added 2026-10-12)

The calendar is the reach engine: a video posted into a real planning moment (people
actually planning THAT event) outperforms a video about an event in general. Plan each
episode ~1–3 weeks before the moment, post in the audience's evening, and let the hook
name the moment in the site's own voice (the event-page lines already carry most of it —
check the live page before writing).

The app's use cases map to these moments (site pages in parentheses; multi-day moments
work one event per day, per the site's FAQ):

| When (2026–27) | Moment | Episode (use case) | Angle |
|---|---|---|---|
| Now (late Oct) | Autumn day trips | trips | "A day away should be the easy part of having friends." (already live as as-trips) |
| ~Oct 24 (post by Oct 28) | **Halloween** | nights-out | the costume party: where to meet, where next — "Piece it together tomorrow." |
| ~Nov 10 (post by Nov 14) | **Office Christmas party planning** | office-events | "Stop planning the team party in Outlook, Doodle and 30 emails." (its own page, calmer register) |
| ~Nov 19 (post by Nov 22) | **US Thanksgiving long weekend** (Thu Nov 26 + Black Friday) | family-reunion | the whole family, the photos on twelve phones; save every photo with one tap |
| ~Nov 26 (post by Nov 29) | Ski season starts | trips | "Ski day" (site's trips page lists it); cold light, new film style |
| ~Dec 24 (post by Dec 28) | **New Year's Eve** | nights-out | the night out with the biggest stakes of the year; the morning after carries it |
| ~Dec 28–31 | New Year, winter trips | trips / dinner-nights | the easy January day away |
| ~Feb 7 (post by Feb 11) | **Super Bowl LXI** watch party (Sun Feb 14, 2027) | dinners/party | friends planning the watch party: where, who brings what; "A poll becomes a decision." |
| ~Feb 2 (post by Feb 5) | **Mardi Gras** (Tue Feb 9, 2027; niche, US) | nights-out / trips | optional; strong only for US audience data |
| ~March 10 (post by March 13) | **St. Patrick's Day** (March 17, 2027) | nights-out | "The night out shouldn't need a project manager." (nights-out page) |
| ~March 20 (post by March 24) | **Spring break** (Mar–Apr 2027) + Easter (Sat March 28, 2027; Denmark school week off) | trips / family-reunion | the spring weekend away; long weekend = one event per day |
| ~May 3 (post by May 7) | **Graduation season** (May–June 2027) | graduation (own page) | the party of the year, the photos of the grad, the venue poll |
| ~May 24 (post by May 28) | **Summer vacation starts** (Denmark schools out late May; US June) | trips | the summer day trip: beach day, boat trip (site chips) |
| ~June 7 (post by June 11) | **Festival season** (June–July 2027) | festivals (own page) | tickets, meeting point, camp — "the chaos, the photos everywhere" |
| ~August (before mid-August) | Football season kicks off (European + NFL 2027, Sep 2027) | match-day (own page) | "Plan match day with your teammates: sort the carpool." |
| ~Oct 2027 | Halloween, autumn trips | nights-out / trips | the loop repeats every year |

Standing rules for calendar episodes:
- **Fresh shoot per moment** (§1 "New content, always") — the film's light and props match
  the moment (Halloween = candlelight and pumpkins, NYE = confetti light at midnight from
  outside, winter = cold blue light). The moment gives the episode its look for free.
- Hook in the first frame names the moment ("Halloween planning" energy) without inventing
  facts; the CTA and the 48 h beat stay standard.
- 5 hashtags max (§3): one broad (#friends), 2–3 niche tied to the moment (#halloween #partyplanner),
  and #afterstories.
- Log each posting and the 48 h numbers in the post log (§6) — the calendar doubles as the
  A/B archive of what each moment earned.

Date notes: 2027 dates above are fixed or near-fixed (Easter March 28, Mardi Gras Feb 9,
Super Bowl Feb 14, St. Patrick's March 17 — checked 2026-10-12); re-verify the moving ones
(Spring break, festival dates, league openers) ~2 weeks before shooting.

### Episode queue — the plan the nightly job reads (added 2026-10-13)

Every night one fresh episode is built and delivered by morning, ready to post. The job
reads this section: take the first row that is not `posted`, build exactly that episode,
mark it `built <date>`, and leave the rest. Rules that hold for every row:

- **Pre-launch only:** CTA is "Get notified" / "Coming soon · after-stories.com" until Robert
  announces launch (§0). If he says it's released, flip the CTA before building the next one.
- **One video per episode.** Fresh shoot (new place, light, season, props, story beat).
- **Music bed varies:** the `variant` column picks `audio.variant` (0–5) in the spec; no
  variant repeats within 6 episodes.
- **Copy is verbatim** from the live site (re-check `llms-full.txt` the night of the build —
  the table is checked 2026-10-13). The hook is the frame-0 line.
- **Phone rule:** never a visible phone screen (face-down / back-to-camera, camera module lit).
- If a row's calendar window (§5.5) opens before its turn, it jumps to the front of the queue.

| # | slug | series | hook (verbatim, checked 10-13) | fresh-shoot style | variant | status |
|---|------|--------|--------------------------------|-------------------|---------|--------|
| — | as-moments | A | (group chats) | — | 0 | posted 10-08 |
| — | corporate a/b | D | (team event) | — | 0 | posted 10-08 |
| — | as-trips-a | A | Group chats are where plans go to die. | summer day trip | 0 | posted 10-12 |
| — | as-halloween-a/b | D | A night out shouldn't need a project manager. | halloween night out | 0 | built 10-12, ready |
| — | as-gone-a/b | C | 48 hours later, it's gone. | dusk rooftop → morning | 0 | built 10-13, ready |
| 1 | as-birthday | D | Plan the birthday together. Everyone gets the photos. | evening, indoor party, balloons + candlelight, confetti | 1 | built 2026-10-13, ready |
| 2 | as-one-stream | C | One private stream. | blue hour, friends' backs, city lights, one shared view | 2 | built 2026-10-14, ready |
| 3 | as-festival | D | Plan the festival together. Keep every photo of the chaos. | festival field, golden hour, flags and haze, hands not faces | 3 | queued |
| 4 | as-morning-after | B | Wake up to the story. | pale morning, coffee on the table, window light, the night's photos | 4 | queued |
| 5 | as-dinner | D | Plan the dinner, game or movie night. | warm kitchen, tungsten, table set for six, steam and plates | 5 | queued |
| 6 | as-polls | C | Polls that turn into decisions. | three options on the table as physical cards → one card wins | 0 | queued |
| 7 | as-office-xmas | D | Skip the 30 emails. | office after hours, Christmas lights on, one team table | 1 | queued (calendar: by ~Nov 14) |
| 8 | as-nobody-left-out | C | Friends without an iPhone join from the web. | mixed group from behind, one person with a laptop, all in the loop | 2 | queued |
| 9 | as-match-day | D | The carpool, sorted. | match-day street, stadium glow, boots and flasks, no faces | 3 | queued |
| 10 | as-private-by-design | C | No feed, no followers, no strangers. | empty private room at dusk, a circle of chairs, no screens at all | 4 | queued |
| 11 | as-bachelor | D | Keep the photos. Lose the chat. | send-off morning, beach, from behind, long shadows | 5 | queued |
| 12 | as-trips-bring | B | Bring every photo home. | airport → car → home: one day, three lights, the box of photos grows | 0 | queued |
| 13 | as-reunion | D | Plan the family reunion together. | long table, three generations' hands, late-afternoon sun (calendar: by ~Nov 22) | 1 | queued |
| 14 | as-save-first | C | Save every photo. Then it's gone. | a hand taps a photo into a phone's gallery (no screen), then the event empties | 2 | queued |

**Rotation:** the series column alternates D (use case) and C (feature spotlight) with a B
(payoff) in between, so no two builds in a row are the same shape; D rotates the use case
(birthday → festival → dinner → office → match → reunion …). When the queue runs short, the
job generates more rows from the site's use-case pages + the Series C feature list, same
format, same verbatim check, same variant rotation.

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

## 9. Open questions & watch items

- *Robert:* TikTok upload API — paused on the TikTok developer account (spark#118);
  until it lands every video is posted by hand from the Telegram delivery.
- *Robert:* the launch date — flips the CTA everywhere (§2).
- `ct=tiktok` App Store token — add when the tracking supports it (§7).
- after-stories.com has no `/go/?src=` hop yet (travel/event have one); until it
  does, TikTok traffic shows only as the `tiktok` referrer in Umami.
