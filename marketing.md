# After Stories — Marketing Plan (living doc)

Owner: Robert · Maintained by: Hermes (social pipeline agent) · Last updated: 2026-10-27

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
| Coming soon / waitlist | ~~**Get notified**~~ · Coming soon · after-stories.com | after-stories.com (link in bio) |
| Live on the App Store (today, since 2026-10-18) | **after-stories.com** + the icon — and nothing else (no "Download on the App Store" text, Robert 2026-10-29) | after-stories.com (link in bio) |

> CTA wording follows `docs/messaging.md` (the CTA-wording rulebook): Apple's official
> "Download on the App Store" badge words, the same everywhere, no form, no "free"
> (§5 never-claim). Verified live 2026-10-18.

TikTok URLs in post text are not clickable — the end card carries the destination, the post
text says "link in bio". Since 2026-10-26 that line is the **last** line of the post text (or
only the pinned comment); line 1 is the viewer question (§3 Truth exception, §5 Lane 0).

- Funnel (pre-launch): TikTok profile → after-stories.com (link in bio) →
  waitlist sign-up (Umami event `waitlist-signup`). After launch: App Store
  installs, with a `ct=tiktok` token on the App Store link once tracking
  supports it (§7).

## 3. Content rules

Three rules that are not negotiable:

- **New content, always (Robert, 2026-10-11):** every episode is a fresh shoot. Never reuse
  footage from a video that has been posted — a feed of reordered old clips reads as "the
  same content" and kills organic reach. Vary the film between episodes (place, light,
  season, props, a different story beat) AND the music (a fresh Openverse track every episode, §3 "The sound") AND the presentation style (§5 "Style rotation") so
  each one reads as brand new; the type stays the brand.
- **One video per episode (Robert, 2026-10-13):** make a single video per episode, not an
  A/B pair. Two cuts of one shoot may still exist as an A/B test, but the default — and the
  nightly build (§6) — is one video.
- **Truth (motion guideline §4):** every line on screen and in the post comes from the brand
  sources, verbatim or clearly paraphrased. No invented numbers, features, prices, dates or
  testimonials. `aiMedia: true` on every spec (the post file then starts with the AI-label
  reminder). One exception (Robert, 2026-10-21, reach first): the post caption may end with
  one short question to the viewer that states no fact about the product (e.g. "Who's the
  planner in your group?"). On-screen product lines stay verbatim; **story and scenario
  beats may say anything that states no fact about the product** (Robert, 2026-10-25, the
  reach lane): a narrator's scenario, story beat or question is fine — "my group has been
  planning the same night for weeks" claims nothing about the app — but the moment a line
  makes a product fact, it is verbatim from the claim sheet (no invented numbers either,
  in scenarios or on screen). The caption-question exception applies to video narrative in
  the same way.
- **No faces, no UI, no logos in AI footage.** The real icon appears only on the end card. If a
  generated still shows a face, a readable screen or a brand logo, regenerate it. (Also the
  standing image rule: no visible faces at all — from behind / blurred, or no people.)
- **Real app footage is allowed (Robert, 2026-10-26, spark#171):** the real After Stories
  screen recordings in `/nas/spark/footage/after-stories/app/` (`INDEX.md` lists what each
  shows, by second) may be shown full screen. The phone-screen ban below is about AI-drawn
  screens and screens we do not own; it still holds for every AI still and clip. The
  recordings use demo data (Priya, Zoe, "Best view in London"): never present a demo name,
  message or count as a real user, review or result. A video with real footage and type only
  has no AI media → `aiMedia: false` and no AI label.

- Text-slide colours: background #0B0C0E · text #FFFFFF · accent #FF2D6F
  (the brand skin from "Look, style and sound" below; only used if a carousel is
  ever made — `marketing-post --colors-from` reads this line, so keep its format).

### Look, style and sound — the After Stories video identity

**The brand skin (locked) and the default look:**
- Reel `bold` look, re-skinned in the brand: **Anybody 800 at 75 % width**
  (`assets/after-stories/anybody-latin.woff2`), **pink `#FF2D6F`** accent bars with near-black
  `#0B0C0E` type (the brand's inverted beat), `#0B0C0E` end card.
- **Default (style S0) footage style** — a style in §5 may set its own footage line
  (flash snapshot, macro, flat-lay…); the no-faces / no-UI / no-logos rules below hold for
  every style. **Footage style (one shared line in every still prompt):** 35 mm film still, warm tungsten
  with magenta-pink accents, grain, candid. Golden hour and blue hour are the native light.
  Mood and B-roll only — places, light, motion, hands, backs, silhouettes. **No faces, no
  readable UI, no logos** (the real icon only on the end card). No people with visible faces
  at all (standing image rule): from behind, blurred, or nobody.
- **Never show a phone screen in AI footage (Robert, 2026-10-12; clarified 2026-10-13, hard rule;
  real app recordings are exempt since 2026-10-26, §3):** phones
  are allowed in a shot — only the screen is banned. A phone lies face-down (screen on the table) or
  is held showing its back; the screen is never readable, on, off or blurred (it reads as a product
  screen we do not own, so a visible screen is a re-shoot). A dark back that could be mistaken for a
  screen also fails: keep the camera module clearly lit and unmistakable. Check the animated clip:
  LTX drift can rotate a phone and reveal the screen — review every frame, not just the still.
  Omitting the phone is always safe but no longer required.
- **Pacing:** cuts on the 0.5 s grid; the hook line is on screen at frame 0; the end card
  holds 1.5 s, clears 0.5 s, loops. Shot count and shot length are set by the style (§5);
  S0 is 4–6 shots of 2–4 s.

**The sound (changed 2026-10-22 — Robert, 2026-10-21: "the same boring music, and not the
openverse.org that I have asked you to"). This rule is permanent: do not go back to the synth.**
- **Every episode uses a real track from Openverse** (openverse.org; music from Jamendo) via
  the motion repo tooling: `audio: { bed: 'track', track: { file: 'assets/openverse/<file>.mp3',
  start: <s>, gain: 0 } }`. Never `bed: 'music'` (the music.mjs synth groove) and never `beat`
  for After Stories, except the last-resort fallback below.
- **Mood from the §6 Music variant column** (it is now a mood index):

  | # | Mood | Search words (try in order) |
  |---|---|---|
  | 0 | upbeat, happy | "upbeat happy pop" · "feel good indie" · "summer pop" |
  | 1 | chill | "chill lofi hip hop" · "chillhop" · "laid back beats" |
  | 2 | playful, funky | "funk groove" · "disco funk" · "playful" |
  | 3 | big, cinematic | "epic cinematic" · "uplifting orchestral" · "trailer" |
  | 4 | warm acoustic | "acoustic guitar happy" · "folk ukulele" · "warm acoustic" |
  | 5 | electronic, energetic | "electro house" · "synthwave" · "edm energetic" |

  A mood repeats only ≥ 6 episodes later (the column already rotates).
- **Pick:** `cd /workspace/motion && node tools/openverse.mjs search "<words>" --min 30 --max 240 --n 12`.
  Take the first listed result that (a) has an id that is NOT already in
  `assets/openverse/credits.json` (a track is never reused, by any brand), (b) has a creator
  different from the last 3 After Stories tracks (§8 log), and (c) has no "corporate",
  "background", "jingle" or "logo" in the title. Then `node tools/openverse.mjs get <id>`.
  The tool only accepts CC0 / PDM / CC BY (commercial-safe).
- **Start:** `start: 0` for a track under 45 s; otherwise skip the intro, start ≈ 30 % into
  the track, rounded to a whole second (the hook needs sound at frame 0). Log the start.
- **Credit:** the renderer reads it from `credits.json` and writes `Music: …` into the post
  file by itself. A missing credit is a render error; never write it by hand.
- `clips: false` unless the style says otherwise (S5) or the clip sound IS the idea.
- **Fallback:** Openverse down / rate-limited (429) / no usable hit → the next search word in
  the row, then the other words of the neighbouring mood (n±1). Only if all fail:
  `bed: 'music'` with `variant` = the mood index, plus a §8 line "OPENVERSE FALLBACK — <reason>"
  so Robert sees it.
- Mixes to −14 LUFS, two-pass loudnorm (the renderer does this). The `beat`/`music` synths
  stay in the pipeline for the other brands.

### Hashtags and sound

- **Max 5 hashtags per TikTok post** (TikTok's cap, Robert 2026-10-11 — count the brand tag).
  Build the set from the use case's ASO keyword set in positioning.md: one broad tag, 2–3
  niche tags, and `#afterstories` — the searchable home of the series (e.g. trip:
  `#friends #grouptrip #daytrip #tripplanner #afterstories`).
- **Sound:** the `-silent.mp4` + a currently trending TikTok sound is the **default post
  route for Lane 0 and Lane 1 builds** (2026-10-25; Lane 0 2026-10-26; an N2 photo post gets
  its trending sound in the app); for Lane 2 posts the embedded track stands
  and a trending sound is optional when the hook fits it. Trend sounds are the main
  organic-reach lever and the one thing a spec file cannot hold — for Lane 1, at publish
  time, use the TikTok app's trending audio over the embedded bed (the `-silent.mp4` exists
  for exactly this); the embedded Openverse track is the floor. Exception: R5 (the voice is
  the sound) — post the main mp4, never the -silent.mp4. If Robert posts the -silent.mp4
  with a TikTok sound, delete the "Music: …" line from the post text (it credits the embedded
  track only). The delivery message says so.
- Pinned comment on every video: the one-liner + the CTA ("after-stories.com — link in bio"),
  because TikTok search indexes comments too.

### Guardrails — the checklist before anything is posted

1. Fresh footage: no shot was posted before (check against the motion repo's `reels/` and
   the shipped NAS folders), and the episode's look differs from the last one.
2. Every on-screen line traces to the brand sources (shotlist names the source + check
   date); Lane 1 story beats: §3 Truth story/scenario exception — they state no product
   fact.
3. Launch status re-checked; CTA matches it.
4. No faces, no readable UI, no logos in AI footage (real app recordings from the footage
   library are the exception, §3); icon only on the end card. Never show a
   phone screen (phones are fine face-down or back-to-camera, camera module lit and
   unmistakable). Review every frame of the clip, not just the still (LTX drift).
5. Deletion is only shown after the save-all-photos beat.
6. No price, no invented numbers, no testimonials.
7. `aiMedia: true` when the post has any AI media (then the AI-label reminder leads the post
   file); `aiMedia: false` for real footage + type only.
8. ffprobe verified 1080×1920/30 fps; human reviewed the contact sheets.
9. Max 5 hashtags, including `#afterstories`; pinned comment set.
10. Music: an Openverse track (`bed: 'track'`), new id, mood = the row's Music variant,
    credit line in the post file (or the fallback logged in §8).
11. Format: the §5 format (N, R or S) differs from the previous build's; format id + track
    file recorded in the row Status and the §8 line.

## 4. Cadence

**Reach first (Robert, 2026-10-21):** "The only focus is getting attention to the app, so
reach is the most important. Style etc could be anything." Every video so far stayed under
300 views except the first (669). Reach comes from watch time, completion, rewatches,
shares, comments and profile taps. So a finishable, surprising video ranks above polish,
and a short video people rewatch beats a pretty one they swipe. The style rotation (§5)
exists to find what the algorithm promotes. The hard rules (§3) and the claim sheet (§5)
do not bend for reach.

**The 2026-10-25 escalation (Robert, verbatim):** "None of the new after-stories tiktok
posts has made it above 300. So the change is not good enough. Try something more
different. Rewrite the marketing plan so it tries new things." — the S0–S7 rotation built
since 2026-10-22 did not break 300 either.

**The diagnosis (2026-10-25):** a polished brand video is recognized as an ad in the first
second and swiped away — the first test audience never finishes, and the push dies at the
small-account baseline. Research (directional, not TikTok-sourced — theviralapp.com 2026
algorithm piece; thecontentlabs.app, 8,500-video study): ~31% of videos from sub-1K
accounts stall around 300 views, so 300 is partly baseline, not a verdict. The fix is
structural: the video has to look like content first and marketing second. The §5 **format
lanes** do that — Lane 1 (reach formats, native) was 3 of 4 builds and Lane 2 (the S0–S7
brand formats) 1 of 4, until 2026-10-26 (Lane 0 and the `N1 → N2 → R` rotation, §5).

**Five levers, in this order (2026-10-25 research, directional):**
1. **Native look** — phone-cam feel, natural light, real-environment candid footage, plain
   big captions; the brand skin survives only in the accent colour, the end card and the
   font family (§5 "Native look").
2. **A curiosity hook at frame 0** — a question, a mystery or a proof, never a product
   claim (§5 "Hook doctrine").
3. **Rewatch / loop** — 2026's strongest signal; a loopable seam + a second-watch detail
   on every build (§5 "Loop and rewatch").
4. **Watch minutes, then completion** — length per format; finished, never padded.
5. **Fast emotion** — humour and curiosity over warm and trust; value first: the product
   at the 40–60 % mark, a soft CTA at the end.

**Review window: 7 days, not 48 h** (2026-10-25) — a sub-1K account's push takes longer to
show; the §7 scoreboard runs on 7-day numbers. Never repost a stalled video: fresh cut,
new hook archetype, new footage.

**The 2026-10-26 finding (Robert's TikTok Studio screenshot, spark#171):** 26 posts, all in a
**252–283 view band**, 0 comments on every post, about 1 like per 270 views. The Lane 1 builds
stalled too: R1 `as-office-chat` 283, the no-CTA R2 `as-private-by-design` 274. So the §9
decision rule (2026-10-25) has fired: the end-card CTA was not the cause. Every post so far
shared five things, and no format has changed any of them:
1. no human (no voice, no real hands, nothing filmed for real);
2. AI visuals only (the AI label on every post);
3. the real app never shown;
4. a brand voice (claim lines; brand name and "link in bio" in the caption);
5. posting: often 2–3 posts on one day, uploaded from TikTok Studio on the web.

Two tracks from 2026-10-26, run together:
- **Content track (Hermes): Lane 0** (§5) changes variables 2–4 — real app footage (N1), a
  photo-mode post (N2), a human voice when Robert opts in (N3), and his phone footage (N4).
- **Account track (*Robert*, §9):** variable 5 and the account itself — **at most one post
  per day**, posted from the **TikTok phone app** (trending sounds, photo mode and
  text-to-speech are only there), the Account status check, and the traffic-source numbers
  that tell a distribution limit from a content failure.

Organic reach on TikTok is a frequency game: 3–4 posts/week, every series represented, never
two of the same series back to back.

#### Phase 1 — waitlist phase (now → launch)
Goal: waitlist sign-ups + a recognizable presence, so launch day is not cold.

**Production is one video per night (Robert's rule 2026-10-16, supersedes the 3–4/week
cadence):** the nightly job builds the first `queued` row in table order EVERY night —
no due-date gate — and hands it over, so Robert always has a fresh episode to post.
Built episodes wait in his posting backlog until he posts them. The plan keeps the
series rotation (two builds in a row never the same series), a fresh shoot per episode,
a fresh Openverse track per episode (mood rotating, §3) and the presentation style
rotating (§5 "Style rotation"), all pre-launch ("Get notified") until launch is announced.
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
- Re-cut the 2–3 best waitlist videos with the new CTA and re-post (fresh hooks) — one-shot,
  done at the 2026-10-18 launch (every end card now runs the download CTA; see the reel
  specs). Standing rule: never re-post a stalled video (§7).
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

A 6–20 s vertical video (1080×1920, 30 fps; length set by the style) built in the
motion repo:
AI mood footage (ComfyUI) + on-screen type in the brand skin, rendered by the Reel template.
The default shape, style S0 (see the shipped `after-stories-corporate` cuts); the
other styles are in "Style rotation" below:

1. **Hook (frame 0):** the pain or the question, in the site's own words, on screen immediately.
2. **The promise (3–4 shots, ~2 s each):** the life the app enables, as AI mood footage —
   places, light, motion, hands, backs, silhouettes. Never the product UI.
3. **The twist / proof:** one concrete fact from the brand sources ("48 hours later, it's gone.").
4. **End card:** real app icon + name + the CTA that matches the launch status.

### Content pillars — the standing series

Organic growth on TikTok comes from a repeatable format people subscribe to, not one-off promos.
Run four standing series. Each episode is one use case or one feature; the series is the angle (what the episode says); the style (§5 "Style rotation") is
how it looks and moves, and rotates independently.

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

### Format lanes — what a build looks like (added 2026-10-25)

Content (scene, claim lines, CTA, series, mood) comes from the §6 row unchanged. In Lane 1
the row's Hook column is the product beat (placed per the format, never at frame 0), and
frame 0 comes from the Hook doctrine bank; log the shipped frame-0 line in the post log's
Hook cell. In Lane 2 the row's hook stays the frame-0 line. The lane and format change the
presentation only. Every format keeps the hard rules (§3), the end card (icon +
after-stories.com — no download text since 2026-10-29, brand skin), `aiMedia` per its
spec note, and an Openverse track (Lane 1 builds deliver the
`-silent.mp4` as the default post route, §3 "Sound").

**Lane 1 — Reach formats (native, content-first): the R slot, 1 of every 3 builds since
2026-10-26** (§5 rotation). The video looks
like a person's post, not a brand post: content curiosity at frame 0 (§5 "Hook doctrine"),
the product at the 40-60% mark, a soft end card.

| Format | Name | Length | What it looks like | Spec notes |
|---|---|---|---|---|
| R1 | Story captions (group-chat storytime) | 15–30 s | a first-person planning-chaos story told in 6-10 caption beats of 4-7 words (1-2.5 s each) over raw-feel footage; the product twist lands in the last 1-2 beats | footage line `shot on a phone, natural available light, slight handheld wobble, candid, real rooms and streets, from behind, no faces, no readable screens, no logos, grain`; the beats are the scene texts (4-7 words, lower area, minimal styling — §5 "Native look"); 6-10 scenes + the end card; no voice; `aiMedia: true`; the story beats state no product fact (§3 Truth); the twist beats are verbatim claim lines; a length WARN is expected when the total leaves the 15-20 s sweet |
| R2 | Investigator / the 48 h mystery | 15–25 s | a mystery cold open ("Every group chat has a secret. This one has a deadline."), 4-6 escalating beats, the 48 h deletion is the twist — the save beat comes first, always | same footage line as R1; cold open 2–2.5 s, clue beats 1.5–2 s, reveal at the 40–60 % mark; a length WARN is expected over 20 s; the mystery beats claim nothing about the product (scenarios only, §3 Truth); the save line and the deletion line are verbatim claim-sheet lines, in that order; captions per Native look; audio: Openverse floor (§3 "The sound"), `hits: false`, `clips: false`; end card standard; `aiMedia: true` |
| R3 | Meme list / fast humor | 8–15 s | 4-6 punchy beats ("The six stages of planning a night out") over fast 0.5-1.5 s cuts, mostly stills with `zoom: true` | humor-first: the beats are scenario jokes that claim nothing about the product; list beats 1–1.5 s; the punchline beat (the last content beat) is the row's verbatim claim line; stills from the fresh shoot; captions per Native look; audio: Openverse floor (§3 "The sound"), `hits: false`, `clips: false`; end card standard; `aiMedia: true`; a length WARN under 15 s is expected |
| R4 | Proof Drop | 8–12 s | frame 0 is the concrete proof, not a claim: the most-liked photo (a generated group photo — backs only, no faces), a decision sitting on top of the event, or the 6 am cut-off (a cleared table at dawn, an analogue clock near 6 — the event ends at 6 the next morning; no deletion at frame 0); then 2-3 fast beats | the proof image is one fresh ComfyUI still (no faces, no screens, no logos); frame 0 always carries a 4–7 word curiosity caption that states no product fact (e.g. "the only photo anyone asked for"); any 48 h line comes after the verbatim save line "Save every photo with one tap first."; beats 2-4 are verbatim claim lines; captions per Native look; audio: Openverse floor (§3 "The sound"), `hits: false`, `clips: false`; end card standard; `aiMedia: true`; a length WARN is expected |
| R5 | Voice lane — PAUSED (*Robert) | 20-40 s | the R1 or R2 story with a human voice: Robert records a ≤ 40 s narration on his phone (or a TTS provider once configured — the Hermes TTS 403'd on 2026-10-25); the job pre-mixes the voice over the Openverse bed (bed ducked about 18 dB under the voice, sidechain) to `assets/<slug>/voice-mix.mp3` and sets it as the spec's `bed: 'track'` file | paused until Robert opts in (§9); his delivery per build: a ≤ 40 s narration file + the story beats; `audio.track.credit` = the bed's credits.json credit string (the mixed file is not in credits.json); `aiMedia: true` (AI footage); post the main mp4 — the voice is the sound, never the -silent.mp4 (§3 "Sound") |

**Lane 0 — Native formats (N1–N4; added 2026-10-26, spark#171).** Each format changes a
variable that all 26 stalled posts shared (§4, the 2026-10-26 finding); a new style of AI
b-roll is not a new test. The `social-video` skill, section "TikTok — it must look like a
post, not an ad", has the recipes (fit the footage, cut photo-mode slides).

| Format | Name | Length | What it looks like | Spec notes |
|---|---|---|---|---|
| N1 | Real app demo | 7–15 s | frame 0: a situation people know, from the Hook doctrine bank ("POV: you said you'd plan the trip"), over a fresh still or the first app cut; then 2–3 cuts of the **real app recording** doing the row's feature (the vote, decisions on top, the live chat with ❤️, the morning-after summary, "Save all photos"); the row's verbatim claim line on the app cut; a soft end card | footage from `/nas/spark/footage/after-stories/app/` (`INDEX.md`), padded to 1080×1920 on `#0B0C0E` (the skill's recipe — never let the template crop the UI); a moment of footage is used once: log `<file> <start>–<end> s` in the shotlist and pick a different moment from the last N1 builds; captions per Native look, `at: 'top'` when bottom would cover the UI; `aiMedia: false` if no AI still is used; Openverse floor + the `-silent.mp4` + trending-sound route |
| N2 | Photo-mode carousel | 4–8 slides | a TikTok **photo** post: slide 1 the hook in big type over a fresh still ("things every group chat says before a trip"); the middle slides a relatable list (scenario lines, no product fact); the last slide a real app frame with the row's verbatim claim line | rendered as a reel (one 2 s scene per slide, `zoom: false`), then one PNG per slide (skill recipe); deliver the `slide-*.png` files + post text, not a video; `marketing-post ledger-add` with `contentType: carousel`; Robert posts in photo mode from the phone app and adds a trending sound there; `aiMedia: true` when a slide uses an AI still |
| N3 | Voice story — opt-in (*Robert*) | 15–30 s | an N1 or R1 story read aloud | the job writes the lines to read under `TTS:` in the post file; Robert adds TikTok's own text-to-speech in the app, or records them; post the main mp4 (the voice is the sound). Paused until Robert opts in (§9), then it replaces R5. |
| N4 | Phone-filmed — opt-in (*Robert*) | 10–30 s | Robert's own phone footage (a real table, the morning-after coffee, the group from behind) | only from files in `/nas/spark/footage/after-stories/phone/`; the job cuts, captions and mixes; never generate stand-ins. Paused until footage exists. |

**Lane 2 — Brand formats (S0–S7): paused from 2026-10-26** — every S post stalled in the
band. The S0–S7 table and its rules stay below for reference and for the ASO baseline; the
rotation does not pick S until the §7 scoreboard brings it back.

**Rotation (since 2026-10-26; it replaces the 3+1 rule):**
- The order is `N1 → N2 → R → N1 → N2 → R …`. Look at the format tag of the most recent
  `built` Status (by build date): an N1 tag → this build is N2; an N2 tag → this build is
  the next **R** format; any other tag (R, S or none) → this build is N1.
- The R slot keeps its own pointer: the R format after the one in the most recent
  `built … · R#` Status, order `R1 → R2 → R3 → R4 → R1 …` (R5 stays paused; N3 replaces it).
- N3 and N4 enter the order only when Robert opts in (§9); then N3 or N4 takes the R slot.
- **Fit check:** if the row can't be built in the due format without breaking a rule, use
  the next format in the order and say why in §8 (examples: N1 when the footage does not
  show the row's feature — then N2; R2 needs the save beat before the deletion line).
  The next night continues from the format actually used.
- Every 48 h row keeps the save-first order in every format.

### Hook doctrine — what frame 0 may be (added 2026-10-25)

Frame 0 is **content curiosity, not a product claim**. A feature-claim cold open is the
pattern that stalled the S-era builds (ad recognition in the first second). The hook is a
question, a mystery, a scenario or a proof — and it states no product fact. Product claims
enter after frame 0, verbatim from the claim sheet.

**Curiosity hook bank (scenario/question openers — none claims a product fact):**
- Question-form site lines (verbatim): "wait which weekend did we land on?" ·
  "can someone send the pics??" · "did anyone actually book the house" · "Who's the planner
  in your group?" (the §3 caption-question bank)
- Scenario/mystery openers (state no product fact, no invented numbers): "Every group chat
  has a secret. This one has a deadline." · "POV: 6 am. The plan is already made." ·
  "My group has been planning the same night for weeks." · "The plan changed again
  today."
- Proof-drop openers: the image IS the hook (R4) — the proof image on frame 0, plus a 4–7
  word curiosity caption with no product fact (the renderer needs frame-0 text).

**Banned openers (stalled in the S era):** a feature claim at frame 0 ("Polls that turn
into decisions."), teacher/how-to framing ("Here's how to plan a night out"), a bare
contrarian without setup, and any invented number ("400 messages", "six phones") — in a
hook, a scenario or on screen.

### Native look — Lane 1's visual rules (added 2026-10-25)

- **Footage:** the phone-cam line (per the format's spec note) replaces the 35 mm film line
  for Lane 1 — natural available light, real rooms and streets, slight handheld wobble,
  grain kept in. The no-faces / no-phone-screen / no-UI / no-logo rules hold: they are §3
  hard rules, not a style choice.
- **Captions:** `look: 'clean'` (scrim, no pink bars), `font` = the brand Anybody face
  with `upper: false`, `accent: '#FF2D6F'`, `ink: '#FFFFFF'`, `bg: '#0B0C0E'`; every
  caption scene has one `text` of 4–7 words, `at: 'bottom'`, no `sub` (the template
  enforces ≥ 44 px); the end card uses `end.text: 'after-stories.com'`, no `end.sub`,
  `end.seconds: 2`, `end.image` = the icon — the URL and the logo, nothing else (Robert
  2026-10-29: no "Download on the App Store" text on any end card; the spec's accent check
  is skipped without `end.sub`, expected). The brand skin
  survives in the accent colour, the end card and the font family only.
- **Imperfections stay:** grain, wobble, an uncomposed frame. A perfectly centred,
  perfectly graded cut reads as an ad.
- **Length:** 8-30 s per format (earn watch minutes, still complete). The `-silent.mp4` +
  trending sound route is the Lane 1 default (§3 "Sound"); R5 is the exception (the voice
  is the sound — post the main mp4).

### Loop and rewatch (added 2026-10-25)

- **Loopable seam:** the last content beat sets up the first one, so a replay re-opens the
  story (the end card still holds 1.5 s and clears 0.5 s before the seam, as always).
- **Second-watch detail:** every build hides one small detail only noticed on replay — a
  camera module lit on a face-down phone, a blank card on the table, the same mug in the
  first and last frame. It is the rewatch bait; rewatch/loop is 2026's strongest signal.
- Every shotlist names both, in the lines `Loop seam:` and `Second-watch detail:`; a
  shotlist missing either fails the design review (§5 pipeline).

### Style rotation — Lane 2 presentation (S0–S7; added 2026-10-22, the table unchanged)

Content (hook, scene, claim lines, CTA, series) comes from the §6 row unchanged; the style
changes presentation only. Every style keeps the hard rules (§3), the end card (icon + CTA,
brand skin), the hook at frame 0, `aiMedia: true`, and an Openverse track.

| Style | Name | Length | What it looks like | Spec notes |
|---|---|---|---|---|
| S0 | Film mood (baseline) | 15–20 s | the default shape above | 35 mm film footage line; the `bold` look |
| S1 | Type only | 8–12 s | no footage; 4–6 lines from the claim sheet (the row's feature/use case), each 1–1.5 s, hard cuts on the grid, alternating `#0B0C0E` / `#FF2D6F` full-frame backgrounds | backgrounds are PNGs made with `ffmpeg -f lavfi -i nullsrc=s=1080x1920:d=0.04,geq=r='11':g='12':b='14',format=rgb24 -frames:v 1 assets/<slug>/bg-dark.png` (and `geq=r='255':g='45':b='111'` → `bg-pink.png`); the `color=c=0xHEX` source shifts the hex by 1–2 per channel in this ffmpeg build (measured 2026-10-22 — use geq); no ComfyUI; text `at: 'center'`; `aiMedia: false` (no AI media in a type-only reel, so the post file carries no AI label); `hits: false` in the spec audio (the template's default layers a thump/whoosh/chime over the track — Robert 2026-10-22: the swish on every cut is "way off"; the track alone is the voice of the edit); a length WARN is expected |
| S2 | One-liner loop | 6–9 s | one LTX clip (one shot, 4–6 s) carrying the hook, then the end card; built to be rewatched | a scene over 4 s gives a WARN (expected); `zoom: true`; generate the clip with `--seconds 6` (pipeline step 4) so the shot never outruns it |
| S3 | Flash snapshot | 12–16 s | 5–7 shots of 1.5–2.5 s | footage line `direct on-camera flash party snapshot, disposable-camera look, hard shadows, red-eye-free, candid, from behind` (no faces); stills only or ≤ 2 clips; the `bold` look |
| S4 | Countdown | 12–16 s | the hook, then 3 numbered beats `1.` `2.` `3.`, each one verbatim claim-sheet line over a flat-lay still (paper, table top), then the end card | the numbers are list markers, not claims; needs 3 claim lines that fit the row |
| S5 | Slow burn / ASMR | 12–16 s | 2 long LTX clips (4–6 s) of a tactile detail (steam, pouring, paper, rain), little type (hook + one line) | `clips: true`, track `gain: -6` so the ambience sounds through; both clips `--seconds 6` (pipeline step 4) |
| S6 | Question | 10–15 s | frame 0 is a question-form site line (the row's hook if it is a question; otherwise a question-form line from the same use-case page, e.g. "can someone send the pics??", "did anyone actually book the house", "wait which weekend did we land on?"); S0 footage, 3–4 shots | the caption ends with one viewer question (§3 Truth exception) |
| S7 | Fast montage | 10–14 s | 8–10 cuts of 0.5–1.5 s from the fresh shoot (mostly stills with `zoom: true`), type only on frame 0 and the end card; made for posting the `-silent.mp4` over a trending sound | moods 0, 2 or 5 suit it, but take the row's mood anyway |

**Rotation rules (Lane 2 pointer — Lane 2 is paused since 2026-10-26; when the §7 scoreboard
brings it back, this pointer picks the style):**
- Order: `S1 → S7 → S2 → S3 → S4 → S5 → S6 → S0 → S1 …`.
- The next style is the one after the style in the most recent `built …` Status that has an
  S tag (S0–S7; R tags are ignored here).
- Never the same style twice in a row.
- **Fit check:** if the row can't be built in that style without breaking a rule, skip to
  the next style in order and say why in §8 (examples: S4 can't find 3 claim lines for the
  row; S6 has no question-form site line; a 48 h row in S1/S2 where the save beat can't come
  before the deletion line). Skipping doesn't move the rotation pointer further; the next
  night continues from the style actually used.
- Every 48 h row keeps the save-first order in every style.
- The §7 reach scoreboard (lane-aware) decides the lane and format weights (see its
  "Stalled" rule).

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
| Friends without an iPhone | **STALE since launch 2026-10-18** — the web version is gone (docs/messaging.md rule 11): never claim friends without an iPhone can join. The as-nobody-left-out row (Nov 16 #2) needs a rework before build. |
| Privacy | "No feed, no followers, no strangers." · "Each event is its own private space." · "Never your location." · "Photos are stripped of GPS and camera data before upload." · "Sign in with Apple means no passwords." |
| Office events | "Skip the 30 emails." · "No admins, no profiles, no feed." · "No work chat left behind." · "There are no company accounts, licences or admin settings." |
| One event = one day | "One event covers one day and its night, until 6 the next morning." · "For a weekend away, make one event per day." |
| Launch status | **LAUNCHED 2026-10-18** (App Store app 6815212070, iPhone only, iOS 27+). CTA: "Download on the App Store" (§2). The deployed `llms-full.txt` still shows the pre-launch status line — the live site + `docs/messaging.md` + `docs/positioning.md` are the current sources of truth. |

**Never claim:** a weekend or a whole festival in ONE event (multi-day is "not yet" —
one event per day); an Android app **or a web version** (none exists since launch 2026-10-18 — docs/messaging.md rule 11); location sharing,
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
   last episode's, §3 "New content, always"); the style (S0–S7) and its footage line.
3. **Stills** (one per shot, one shared style, 9:16; S1: no stills, ffmpeg backgrounds
   instead): `comfy-gen --aspect 9:16 --prompt "…"
   --prefix <slug>-s1 --copy-to /workspace/motion/assets/<slug>/` (~40 s each).
4. **Clips** (only the moving shots, ≤ 5 per video): `comfy-gen --model ltx --image …
   --seconds 4 --prefix <slug>-c1 …` (~2 min each).
5. **Spec** → `reels/<slug>.json`: brand skin (Anybody 800 @ 75 % width, accent `#FF2D6F` on
   `#0B0C0E`), `aiMedia: true`, `end.image` = the icon, `post` caption without hashtags,
   `hashtags` list, audio `bed: 'track'` with the Openverse file picked in §3 "The sound"
   (fetch it before the spec), `clips: false` unless the style or the clip sound needs it
   (§3, §5 Style rotation).
6. **Render:** `motion-render -- npm --prefix remotion run --silent reel -- reels/<slug>.json`
   (~1 min). Fix ERROR lines; fix WARN lines where possible.
7. **Verify** with ffprobe (1080×1920, 30 fps, h264, yuv420p) — never trust the renderer's PASS
   line.
8. **Deliver** to `/nas/spark/videos/<slug>/` (MP4, silent version, review sheets, post file;
   an N2 carousel: the `slide-*.png` files + post file). The hand-over ends with the posting
   notes: phone app, at most one post per day, which file and which sound (§4, §9).
9. **Human review of `contact.png` / `phone.png` before posting** — the agent cannot see images.
10. **Commit** `docs/<slug>.md`, `reels/<slug>.json`, used `assets/<slug>/` to the motion repo
    (`master`) and push, and the new `assets/openverse/<file>.mp3` + `credits.json`. Never commit `out/`.

**One video per episode (since 2026-10-13):** the default is a single spec — the angle
that fits the episode (problem-first, payoff-first or feature-twist), not a mandatory A/B
pair. Two cuts of one shoot remain available as a deliberate A/B test when a hook is worth
testing; the nightly build (§6) always makes one.

**The music mood rotates (since 2026-10-22):** the §6 Music variant column is the mood
index (§3 "The sound"); a mood repeats only ≥ 6 episodes later, and a track is never
reused. `bed` is `track`, never `music` or `beat` (fallback only, §3).

**Time budget:** ~45 s per still, 2–6 min per clip, ~1 min per cut. A full episode (6 shots,
5 clips, 1 cut) ≈ 25–50 min — comfortably inside one nightly window. S1 needs
no ComfyUI and takes ~10 min; S2 ~15 min.

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

One row = one TikTok episode: a 6–30 s vertical reel (length set by the format, §5), or an
N2 photo-mode carousel (since 2026-10-26),
built by the nightly job and posted by hand by Robert. Rules for every row:

- **Which row is built:** each night the job builds one row: the first row in table order
  whose Status is `queued` (or empty) — **every night, no due-date gate** (Robert's
  2026-10-16 rule: one new video per day). When it is built, the job sets Status to
  `built <yyyy-mm-dd> <reel slug> · <format id: N1-N4, R1-R5 or S0-S7> · <track file name>`. When Robert tells it an episode is posted, the Status
  becomes `posted <yyyy-mm-dd>`; the next prune removes the row, and the history lives in
  the §8 post log, not here.
- **Posting is Robert's call:** 3–4 rows per week are planned (§4). The `built …, ready`
  rows at the top are his posting backlog; built episodes wait until he posts them.
- **Pre-launch CTA:** "Get notified" · "Coming soon · after-stories.com" until Robert
  announces launch (§2). If he says it's released, flip the CTA before building the next
  row.
- **One video per episode.** Fresh shoot: the Look / scene column is the start point and
  must differ from the last episodes (§3).
- **Music mood + format:** the Music variant column is the mood index for the Openverse
  track (§3 "The sound"); the format comes from the §5 rotation (N1 → N2 → R, since
  2026-10-26), not from the table. The Look / scene column is the scene; the
  format may restyle it (e.g. R1 raw-feel captions, S3 flash, S1 no footage).
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
| Nov 2 | 1 | as-dinner | D | dinner-nights | “Plan the dinner, game or movie night.” | warm kitchen, tungsten, table set for six, steam and plates | 5 | built 2026-10-17 as-dinner |
| Nov 2 | 2 | as-polls | C | polls → decisions | “Polls that turn into decisions.” | three options on the table as physical cards → one card wins | 0 | built 2026-10-18 as-polls |
| Nov 2 | 3 | as-office-xmas | D | office-events · Christmas party | “Skip the 30 emails.” | office after hours, Christmas lights on, one team table | 1 | built 2026-10-19 as-office-xmas |
| Nov 2 | 4 | as-friendsgiving-date | A | dinner-nights · Friendsgiving | “Friendsgiving: Six people, three possible evenings, and the date still isn't set.” | rainy apartment window, a stack of mismatched borrowed chairs, wet autumn leaves on the sill, grey-violet dusk | 2 | built 2026-10-20 as-friendsgiving-date |
| Nov 9 | 1 | as-friendsgiving | D | dinner-nights (Potluck) · Friendsgiving | “Friendsgiving: Put three evenings to a vote and the group picks one.” | potluck table from above, mismatched dishes arriving in hands, amber lamps, rust and cream | 3 | built 2026-10-21 as-friendsgiving |
| Nov 9 | 2 | as-morning-after | B | the morning after | “Wake up to the story.” | pale morning, coffee on the table, window light, the night's photos | 4 | built 2026-10-22 as-morning-after · S1 · lucky-acoustic-ea4ef155.mp3 |
| Nov 9 | 3 | as-photos-stuck | A | photos stuck on phones | “Hundreds of photos stuck on six phones” | six phones face-down on a wooden bench after a hike (camera modules lit), muddy boots, cold golden hour | 5 | built 2026-10-22 as-photos-stuck · S7 · super-power-pop-rock-3d2e7e62.mp3 |
| Nov 9 | 4 | as-likes | C | likes → the most-liked photo | “Tap ❤️ on the ones that matter.” | winter market at night, mulled-wine steam, mittened hands, string lights | 0 | built 2026-10-23 as-likes · S2 · alexzavesa-man-mountain-electro-house-57598aab.mp3 |
| Nov 16 | 1 | as-reunion | D | family-reunion · US Thanksgiving | “Plan the family reunion together.” | long table, three generations' hands, late-afternoon sun (built) | 1 | built 2026-10-24 as-reunion · S3 · playfulness-b6fb4ded.mp3 |
| Nov 16 | 2 | as-nobody-left-out | C | web for friends without an iPhone | “Friends without an iPhone join from the web.” | mixed group from behind, one person with a laptop, all in the loop | 2 | rework needed (stale claim since launch, §5) — not buildable as written |
| Nov 16 | 3 | as-office-chat | A | office-events · Christmas party | “Four tools, one party, and nobody knows what was decided.” | office kitchenette at 5 pm, tinsel spilling from a drawer, paper cups, cool fluorescent to warm desk lamp | 3 | built 2026-10-25 as-office-chat · R1 · prologue-9c2a001e.mp3 |
| Nov 16 | 4 | as-private-by-design | C | private by design | “No feed, no followers, no strangers.” | empty private room at dusk, a circle of chairs, no screens at all | 4 | built 2026-10-25 as-private-by-design · R2 · nocturno-no-2-0436564c.mp3 · NO-CTA end card (experiment, §8) |
| Nov 23 | 1 | as-thanksgiving-after | B | family-reunion · Thanksgiving weekend | “The photo of the day, the line of the reunion, what you decided.” | day-after kitchen, folded tablecloth, leftover pie under foil, flat grey November light | 5 | built 2026-10-25 as-thanksgiving-after · R3 · spencer-newton-hey-original-mix-electro-5919437e.mp3 |
| Nov 23 | 2 | as-ski-day | D | trips (Ski day) · ski season opens | “Ski day: Which day, where to, who brings what.” | cable car at blue hour, skis against a fence, frost, cold blue with a pink sunset edge | 0 | built 2026-10-26 as-ski-day · N1 · alexzavesa-lo-squalo-edm-e6e5e10e.mp3 |
| Nov 23 | 3 | as-friends-xmas-date | A | dinner-nights · Christmas with friends | “Picking one evening for six people shouldn't take two weeks of messages.” | coat hooks overloaded with scarves, a paper advent calendar, a door left ajar onto a warm hallway | 1 | built 2026-10-27 as-friends-xmas-date · N2 · groove-avec-yollon-pie-funk-f525e0a2.mp3 |
| Nov 23 | 4 | as-save-first | C | save all photos, then 48 h | “Save every photo. Then it's gone.” | a hand taps a photo into a phone's gallery (no screen), then the event empties | 2 | built 2026-10-29 as-save-first · R3 · the-groove-experiment-b8d73983.mp3 |
| Nov 30 | 0 | as-kids-carpool | A | school carpool (Robert request 2026-10-29: next TikTok = the kids carpool) | “The school run, planned as a group.” | school pickup at 3 pm: a line of parked cars by the school gate, a teacher's hand on a door handle (no face), wool coats, cold pink-grey afternoon light | 0 | built 2026-10-29 as-kids-carpool · N1 · synth fallback (mood-0, no Openverse track 2026-10-29) |
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
same columns, same verbatim check, the series and mood rotations kept, a new slug and a
new look per row — and logs it in §8.

## 7. Review procedure

90-day goal is raw installs (positioning.md › Measuring):

- **App Store Connect:** installs by source (App Store search / referrer / web referrer). The
  invite page's link carries `ct=invite`; add a `ct=tiktok` token to the App Store link we use
  from TikTok when the tracking supports it, so TikTok-driven installs count separately.
- **Umami:** after-stories.com visits from `tiktok` referrer.
- **TikTok native:** watch time, follows, profile visits, and — in the waitlist phase — the
  waitlist form's sign-ups attributed to TikTok traffic.
- **Per-video review after 7 days (was 48 h, changed 2026-10-25):** hook rate (views past
  3 s), completion, shares. Keep a one-line log in the motion repo next to each shotlist:
  what worked, what got cut. The
  "events that reach the summary" metric from PostHog sits next to installs to answer "are
  these installs worth anything".
- **Reach scoreboard (added 2026-10-22, lane-aware since 2026-10-25):** the job can't
  read TikTok metrics, so Robert reports views; the job writes them into that episode's
  post-log result cell (with lane + format + mood in the Video cell). The baseline to beat
  is 300 views (best so far 669) — flagged as the small-account baseline per the
  2026-10-25 directional research (theviralapp.com; thecontentlabs.app 8,500-video study),
  not a verdict on a single video. **Stalled = under 300 views at 7 days; a stalled video
  is never re-posted or re-cut.** Lane 1: an R format with ≥ 3 posted videos, all
  stalled, leaves the rotation and the review proposes a replacement in §9 for Robert.
  (Lane 2 is paused since 2026-10-26; it returns only if its median beats Lane 0's.) Lane 2: once every S style has ≥ 2 posted episodes with views, a
  style whose episodes all stayed under 300 leaves the S rotation. The "repeats only after
  4 builds" rule always holds. Record each change as a §8 line.
- **Lane 0 and the account test (added 2026-10-26):** for each posted video Robert also
  reports, from TikTok Studio, the **For You share of traffic**, the **average watch time**
  and the **% watched in full** — views alone can't tell the two failure modes apart. Read
  them like this: For You share low (under ~50 %) → TikTok is not distributing the account
  (account track); For You share high but watch time under ~3 s → the first second loses
  people (hook / format). The test: 3 N1 + 3 N2 posts, each posted from the phone app on a
  day with no other post. A format with a post over 500 views gets every second build.
  If all six stall in the band, the content is not the limit: Hermes keeps building at one
  per night, and the §9 account items come first (Robert decides on a fresh account).

## 8. Learnings log

**Post log** (one line per post, updated when the 48 h and 7-day numbers land):

| Date | Video | Hook | 48 h / 7-day result (views / hook rate / shares) | Verdict |
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
| built 2026-10-17 | **as-dinner** (fresh warm-kitchen shoot — one low tungsten pendant over a table set for six, steam, candle stubs, face-down cards, morning-after table) — queue row Nov 2 #1 (Series D), music v5 | Picking one evening for six people shouldn't take two weeks of messages. | due on post | frame-0 hook is the site's pain line; the row's headline “Plan the dinner, game or movie night.” runs mid-deck (Series D shape); AI label on |
| built 2026-10-18 | **as-polls** (fresh attic games-room shoot — blank cards on an oak table under golden-hour dormer light, overnight into pale blue morning, overhead/side-macro) — queue row Nov 2 #2 (Series C, polls → decisions), music v0 | Polls that turn into decisions. | due on post | first post on the LAUNCH CTA “Download on the App Store” (app live 2026-10-18, app 6815212070); design loop task 20261018-2209; AI label on |
| built 2026-10-19 | **as-office-xmas** (fresh after-hours office shoot — pushed-together desks as one team table, warm-white fairy lights and pink tinsel on pine-green partitions, pale-mint fluorescent spill) — queue row Nov 2 #3 (Series D, office-events · Christmas party), music v1 | Skip the 30 emails. | due on post | post by ~Nov 14; AI label on; launch CTA; second audience (organizer is the buyer) |
| built 2026-10-20 | **as-friendsgiving-date** (fresh rainy-dusk apartment shoot — rain-streaked window, a stack of mismatched borrowed chairs, wet autumn leaves on the sill, cold grey-violet light with magenta-pink accents; shot 4 is a still — both LTX card-clip takes drifted the card count 3→2, so the design's still fallback was used) — queue row Nov 2 #4 (Series A, dinner-nights · Friendsgiving), music v2 | Friendsgiving: Six people, three possible evenings, and the date still isn't set. | due on post | post by ~Nov 15; AI label on; launch CTA; #hosting swapped in for #potluck (date-picking angle) |
| built 2026-10-21 | **as-friendsgiving** (fresh loft overhead shoot — three mismatched tables pushed together seen straight down, several amber lamps pooling at frame edges, rust/cream/mulled-wine palette, dishes arriving in hands from behind; s2 a still per the LTX drift lesson, s5 re-rendered once — first take showed a table set for the meal) — queue row Nov 9 #1 (Series D, dinner-nights · Friendsgiving), music v3 | Friendsgiving: Put three evenings to a vote and the group picks one. | due on post | post by ~Nov 15 (Friendsgiving hook); AI label on; launch CTA; #potluck + #planwithfriends in place of #hosting (as-friendsgiving-date already used #hosting) |
| built 2026-10-22 | **as-morning-after** (style S1 — type only: flat #0B0C0E / #FF2D6F beats, no footage; first Openverse track: “Lucky Acoustic”, lucky-acoustic-ea4ef155.mp3, mood 4) — queue row Nov 9 #2 (Series B, the morning after) | Wake up to the story. | due on post | first rotation build (the 2026-10-22 system): Robert's manual test build; no AI label (no AI media); views to be reported into the §7 scoreboard |
| built 2026-10-22 | **as-photos-stuck** (fresh winter post-hike shoot — six face-down unbranded phones on a weathered bench in cold golden hour as the hero object, slate-blue shadows, mud and moss; style S7 fast montage of 9 stills; Openverse mood-0 fallback track “Super Power Pop Rock”, super-power-pop-rock-3d2e7e62.mp3) — queue row Nov 9 #3 (Series A, photos stuck on phones) | Chasing replies and asking for the photos afterwards. | due on post | hook swapped from the table line (not on the live site + invented number — llms-full.txt re-checked 2026-10-22); Openverse mood 5 had 0 usable tracks (API 500s) → mood-0 fallback per §3; post the -silent.mp4 over a trending sound; AI label on; launch CTA |
| built 2026-10-23 | **as-likes** (fresh winter night-market shoot — mittened hands round a steaming mulled-wine mug, cranberry knit, teal-navy night with gold string-light bokeh, cream steam; style S2 one-liner loop, one 6 s LTX clip; Openverse mood-5 fallback track “Man mountain (Electro House)”, alexzavesa-man-mountain-electro-house-57598aab.mp3) — queue row Nov 9 #4 (Series C, likes → the most-liked photo) | Tap ❤️ on the ones that matter. | due on post | AI label on; launch CTA; the ❤️ renders as a monochrome DejaVu fallback glyph (Anybody has no U+2764 — no tofu, hook kept verbatim); §2 post-text form “after-stories.com (link in bio)” on purpose (CTA on the end card + pinned comment); post the -silent.mp4 over a trending sound if desired (delete the “Music:” line then) |
| built 2026-10-24 | **as-reunion** (fresh late-autumn farmhouse back-porch shoot — POV down a long trestle table, direct flash against low peach-gold sun through the screen door, sage/powder-blue/peach/red-gingham palette, hands only, a child's pink scooter; style S3 flash snapshot, 6 fresh stills; Openverse mood-2 fallback track “playfulness” by Pan:core, playfulness-b6fb4ded.mp3) — queue row Nov 16 #1 (Series D, family-reunion · US Thanksgiving) | Plan the reunion together. | due on post | post by ~Nov 22 (US Thanksgiving calendar hook); AI label on; launch CTA; hook swapped from the table line to the site's verbatim line per the §9 watch item (llms-full.txt re-checked 2026-10-24); #family #familyreunion #thanksgiving #reunionplanning #afterstories |
| built 2026-10-25 | **as-thanksgiving-after** (fresh day-after-kitchen shoot — flat overcast grey November window light, empty quiet kitchen with a pie in crinkled foil, a stack of food containers, a cloth folded unevenly on a chair and an open fridge; one coral-pink enamel mug as the second-watch detail; Lane 1 R3 meme list of 5 fresh stills, no clips; Openverse mood-5 track “Spencer Newton - Hey (Original Mix)(Electro House)”, spencer-newton-hey-original-mix-electro-5919437e.mp3, start 90) — queue row Nov 23 #1 (Series B, family-reunion · US Thanksgiving weekend) | The day after Thanksgiving, ranked. | due on post | post by ~Nov 22 (US Thanksgiving calendar hook); AI label on; launch CTA; the claim-line punchline “The photo of the day, the line of the reunion, what you decided.” is a verbatim excerpt of the /family-reunion/ morning-after line (llms-full.txt re-checked 2026-10-25); #family #familyreunion #thanksgiving #dayafterthanksgiving #afterstories |
| built 2026-10-26 | **as-ski-day** (fresh 9:16 blue-hour ski-lift still — skis against a frosted fence, cold deep blue with a pink sunset edge, one small pink bobble hat; plus 3 real app cuts: the “What are we watching?” vote, the “When?” calendar date pick and the “The morning after” summary — first N1 build) — queue row Nov 23 #2 (Series D, trips · Ski day · ski season opens), music v0→v5 fallback | POV: you said you’d plan the trip. | due on post | post by ~Nov 29 (ski season opens); AI label on (1 fresh still); launch CTA; first Lane 0 N1 (rotation after R3); #friends #grouptrip #skiday #skiing #afterstories |
| built 2026-10-27 | **as-friends-xmas-date** (fresh small-flat hallway + kitchen shoot — coat hook overloaded with wool scarves in deep green/cream/red, door ajar onto bright window light; coat-hook rail with cream mittens + a small brown paper bag with two clementines; steel fridge with blank slips under coloured magnets, steaming mug; cold pale daylight dominant, one warm tungsten glow, 35 mm grain; first N2 photo-mode carousel, 6 slides + end card, 1 real app frame) — queue row Nov 23 #3 (Series A, dinner-nights · Christmas with friends), music v1→v2 fallback | wait which weekend did we land on? | due on post | post by ~Dec 5 (Christmas-with-friends calendar hook); AI label on (slides 1, 3, 4 are AI stills); launch CTA; the real app frame is 03_TheEvent.mp4 6.0 s (the Girls' Night In "Everything is decided" screen, demo data never presented as real users); the slide-6 top caption is the row's exact line "Picking one evening for six people shouldn't take two weeks of messages." (verbatim /dinner-nights/ pain line, llms-full.txt re-checked 2026-10-27); #friends #christmasdinner #dinnerparty #partyplanner #afterstories
| built 2026-10-29 | **as-kids-carpool** (fresh 9:16 school-street still — a child from behind in a camel hooded wool coat walking past parked family cars, cold pink-grey hazy afternoon light, long shadows, a small red child's mitten as the second-watch detail; plus 2 real app cuts from 02_CarPool.mp4: the "The cars" list with Way out / Way home and the car-list chat message — the kids-carpool feature, Robert's 2026-10-29 steer) — queue row Nov 30 #0 (Series A, school carpool), music mood 0 → synth fallback | Who's driving the kids on Thursday? | due on post | Robert's steer build (2026-10-29: "next TikTok = the kids carpool"); AI label on (1 fresh still); launch CTA; second Lane 0 N1 (rotation after R); the on-screen lines "Nobody counts seats in the car park." and "Every kid in a car." are verbatim /match-day/ lines (llms-full.txt re-checked 2026-10-29); the row hook "The school run, planned as a group." is the row's own line, not a verbatim site line (flagged for Robert to swap); OPENVERSE FALLBACK — all mood-0/1/2 Openverse searches returned only used ids or 0 hits 2026-10-29 → `bed: 'music'` variant 0 (documented last resort, §3); #parents #groupchat #kidsfootball #carpool #afterstories |

- 2026-10-27 (nightly, §7 review + build as-friends-xmas-date): no 7-day reviews due with data — the builds since 10-16 await Robert's posts (TikTok hook/completion/share metrics are not reachable by the job, manual posting, §9). Funnel this week: 0 attributed social traffic, 0 sign-ups, 27 pageviews (prev 7d 36) — reach-first, and the first Lane 0 **N2** (photo-mode carousel) is the rotation step after N1 (as-ski-day, 2026-10-26). **Format:** N2, 6 slides (4–8 per §5) rendered as a 14 s reel (one 2 s scene per slide, `zoom: false`), one PNG per slide cut 0.3 s before scene end; `look: 'clean'`, brand Anybody skin, `aiMedia: true` (slides 1, 3, 4 are AI stills). Slide 1 hook "wait which weekend did we land on?" (verbatim question-form site line, Hook doctrine bank, no product fact) over the fresh hallway still; slides 2/5 type-only ("thirty film suggestions, no decision" and "the date still isn't set" — the first verbatim /dinner-nights/ pain line and a scenario beat); slides 3/4 the verbatim pain lines "who's cooking? who brings what?" / "everyone says 'whatever works'" over the fresh coat-hook and fridge stills; slide 6 the **real app frame** 03_TheEvent.mp4 6.0 s (the Girls' Night In "Everything is decided" screen; demo data never presented as real users) with the row's exact line "Picking one evening for six people shouldn't take two weeks of messages." at top (bottom would cover the UI). **Production:** 3 fresh 9:16 stills (comfy-gen --prefix as-social-20261027-xdate*; several calendar takes regenerated — Flux drew numbers/writing on the paper squares; shipped stills vision-checked clean: no faces, no numbers or writing, no logos, no screens); one real app frame padded 1080×1920 on #0B0C0E (frame-verified stable, no transition); render checks all PASS except the expected WARNs (slide-6 72-char caption; 14 s total — N2 is 4–8 slides × 2 s, short is expected). Second-watch detail: the small clementines paper bag (small, in the slide 3/4 stills). **Music:** the row's mood 1 (chill) had 0 usable Openverse hits on all three words (30–400 s, 2026-10-27); mood-0 words: only the already-used 3d2e7e62 / 0 / 0; mood-2 word "funk groove" (30–400 s): "Groove avec yollon pie funK" by GASNOPROD (groove-avec-yollon-pie-funk-f525e0a2.mp3, 381 s, start 114, gain −6, bed 'track', clips false, hits false) — fresh id + fresh creator, no banned title words; mood 2 last used 2026-10-24 (as-reunion) — the ≥6-episode rule is broken, allowed by the fallback. The loud funk source hit the limiter: gain 0 → 5.2 dB limiting, −3 → 3.9 dB, −6 → 3.0 dB (PASS), loudness −13.8 LUFS, true peak −1.4 dBTP. **Gate 1** passed all 7 items. Claude design loop task 20261027-2257 (review round 1 FAIL: the mood-3 fallback track was rejected — moods 0/2 only — so the mood-2 track above replaced it; slide 6 had to carry the row's exact table line; the look shifted cold-daylight-dominant; the second-watch detail had to be small — all fixed and re-reviewed). Post route: photo mode from the TikTok phone app + a trending sound in the app (then delete the "Music:" line from the post text); pin the comment. NAS: /nas/spark/videos/as-friends-xmas-date/.
- 2026-10-26 (nightly, §7 review + build as-ski-day): no 7-day reviews due with data — the
  builds since 10-16 await Robert's posts (TikTok hook/completion/share metrics are not
  reachable by the job, manual posting, §9). Funnel this week: 0 attributed social traffic,
  0 sign-ups, 30 pageviews (prev 33) — reach-first, and the first Lane 0 N1 (real app demo)
  is the strongest product-focused play (§4 2026-10-26 finding). **Format:** N1 (rotation
  after the most recent `built` Status R3 as-thanksgiving-after, 2026-10-25). **Media:**
  one fresh 9:16 still (phone-cam line, blue-hour ski lift line, skis on a frosted fence,
  cold deep blue with a pink sunset edge, one small pink bobble hat as the second-watch
  detail; comfy-gen --prefix as-social-20261026-ski, vision-checked clean — no faces,
  screens, logos or text) + 3 real app cuts padded to 1080×1920 on #0B0C0E (logged:
  03_TheEvent.mp4 3.0–5.5 s the vote; 01_Create.mp4 12.8–14.3 s the “When?” calendar;
  03_TheEvent.mp4 28.0–30.0 s “The morning after”; all frame-verified 2026-10-26, the
  calendar cut stays on the “When?” screen — the “Where?” step starts after 14.7 s).
  10.0 s cut (2.0 + 2.5 + 1.5 + 2.0 + 2.0 end card), `look: 'clean'`, `aiMedia: true`,
  render checks all PASS except the expected WARNs (10 s inside the N1 7–15 s window;
  limiter 3.5 dB, true peak −1.4 dBTP PASS). Frame 0 “POV: you said you'd plan the trip”
  (Hook doctrine, no product fact); captions “somebody says: let's vote” (scenario, no
  product fact — the review round-1 swap of a riskier line), “Which day, where to, who
  brings what.” (verbatim trips claim, llms-full.txt re-checked 2026-10-26) and “Wake up
  to the story.” (claim sheet); end card “Download on the App Store” · after-stories.com
  (live since 2026-10-18). **Music:** the row's mood 0 had all three search words
  exhausted (only the already-used 3d2e7e62), mood 4 words returned only the used
  ea4ef155 and mood 1 had 0 hits → fallback n−1 mood 5, word “edm energetic” (30–400 s
  window): “AleXZavesa - Lo squalo (EDM)” (alexzavesa-lo-squalo-edm-e6e5e10e.mp3, 303 s,
  start 91, gain 0, bed 'track', clips false, hits false); fresh id + creator (not in the
  last 3: Spencer Newton, Daniel Bautista, Hyperreal); mood 5 was last used 2026-10-25 —
  the ≥6-episode rule is broken, allowed by the fallback (logged here). **Gate 1** passed
  all 7 items. Claude design loop task 20261026-2237 (review round 1 FAIL on bookkeeping
  only — marketing.md Status/post-log/§8 bullet — plus a minor caption risk; round 2
  after the fixes). Post route: the -silent.mp4 + a trending TikTok sound is the Lane 0
  default (§3 Sound); delete the “Music:” line if the trending sound is used. NAS:
  /nas/spark/videos/as-ski-day/.
- 2026-10-26 (Robert's message: "all the tiktok videos for after-stories get below 300 views.
  Any idea what i can do to break that ?" — then "update the social-video skill for the new
  formats … It also has a marketing plan, that also need to be updated.", spark#171): Robert's
  TikTok Studio screenshot shows 26 posts in a **252–283 view band**, 0 comments on every post.
  R1 `as-office-chat` 283 and the no-CTA R2 `as-private-by-design` 274 stalled too, so the
  2026-10-25 decision rule fired (the CTA was not the cause). **Changes:** §3 real app footage
  allowed (the App Store preview recordings, copied to `/nas/spark/footage/after-stories/app/`
  with an `INDEX.md`; AI-drawn screens stay banned; demo data never shown as real users);
  `aiMedia` per post. §4 the 2026-10-26 finding (five shared variables) and the two tracks.
  §5 **Lane 0** N1 real app demo, N2 photo-mode carousel, N3 voice (opt-in), N4 phone-filmed
  (opt-in); rotation `N1 → N2 → R` replaces the 3+1 rule; **Lane 2 (S0–S7) paused**. §2 the
  "link in bio" line moves to the last line of the post text. §6 rows may be carousels; N tags.
  §7 the For You share / watch time / full-watch numbers and the 3 + 3 Lane 0 test. §9 the
  account items. The `social-video` skill (v1.4.0) carries the recipes; the `social-post`
  template's manual hand-over now ends with the posting notes. The §6 rows, the claim sheet,
  the calendar hooks, the CTA and the sound rules are unchanged.
- 2026-10-25 (nightly, §7 review + build as-thanksgiving-after): no 7-day reviews due with
  data — the builds since 10-16 await Robert's posts (TikTok hook/completion/share metrics are
  not reachable by the job, manual posting, §9). Funnel this week: 0 attributed social traffic,
  0 waitlist sign-ups, 30 pageviews (prev 7d 36) — the build stays product-focused but
  reach-first. **Format:** Lane 1 R3 (meme list / fast humor, 8–15 s), chosen by the §5 3+1
  rule — the three latest builds are as-private-by-design (R2), as-office-chat (R1) and
  as-reunion (S3) (not all-R → Lane 1); R3 follows R2 in the pointer order and is unused in the
  last 4 builds. Frame 0 is a curiosity list title (“The day after Thanksgiving, ranked.”, no
  product fact); beats 2–5 are scenario jokes (no product fact, no invented numbers); the last
  content beat is the row's verbatim claim line “The photo of the day, the line of the
  reunion, what you decided.” — a verbatim excerpt of the live /family-reunion/ morning-after
  sentence “Everyone gets the summary: the photo of the day, the line of the reunion, what you
  decided.” (llms-full.txt re-checked 2026-10-25). **Production:** 5 fresh 9:16 stills from one
  day-after-kitchen shoot (s1 wide kitchen reused as frame 0 and the claim beat = the loop seam;
  s2 pie close-up; s3 Tupperware stack; s4 folded cloth on a chair; s5 open fridge), all
  `zoom: true`, no LTX clips (R3 is stills-first, `clips: false`); the second-watch detail is
  the coral-pink enamel mug (the only accent colour), present in s1 and s2; every still
  vision-checked clean (no faces, screens, logos or text). 10.5 s cut; render checks all PASS
  except the two expected WARNs (claim-line 64 chars; total under the 15–20 s sweet spot,
  expected for R3). **Music:** mood 5 (electronic, energetic) — the 30–240 s Openverse search
  returned 0 usable for all three words (“electro house” / “synthwave” / “edm energetic”), so
  `--max` was widened to 400 s: “Spencer Newton - Hey (Original Mix)(Electro House)”
  (spencer-newton-hey-original-mix-electro-5919437e.mp3, 300 s, start 90, gain 0, bed 'track');
  fresh id (not in credits.json) + fresh creator (not the last 3: Pan:core, Hyperreal, Daniel
  Bautista; also unused by AlexZavesa / Kara Square), no banned words. **Gate 1** passed all 7
  items. Claude design loop task 20261025-2212. Post route: the -silent.mp4 + a trending TikTok
  sound is the Lane 1 default (§3 Sound); delete the “Music:” line if the trending sound is used.
  NAS: /nas/spark/videos/as-thanksgiving-after/.
- 2026-10-25 (manual, Robert's test video): built **as-office-chat** (Nov 16 #3, series A) as the
  first **Lane 1 · R1 (story captions)** build from the new format-lane plan — the first R-tagged
  build (3+1 rule: no prior R tags → R1). Skipped the first queued row **as-nobody-left-out**:
  its claim ("friends without an iPhone join from the web") is stale since launch 2026-10-18 —
  the live site answers "No" (claim sheet); the row needs a rework before any build, and the
  next nightly build must skip it the same way. R1 spec: 8 story beats, frame 0 a scenario with
  no product claim, twist beats verbatim ("Skip the 30 emails." / "No work chat left behind." —
  verified on the live /office-events/ page 2026-10-25), raw-feel footage line, `look: 'clean'`,
  no voice, fresh Openverse track "Prologue" by Hyperreal (mood 3), `hits: false`. 12/12 render
  checks PASS (18.0 s, -13.9 LUFS); every still and clip frame passed the face/screen/logo
  guardrail check (s1 and s7 needed three takes — flux crowd shots leak faces; final s7 is the
  empty-sofa still, so the plan's c4 clip was dropped: 3 LTX clips + 5 stills). Post route: the
  -silent.mp4 + a trending TikTok sound is the default (§3 Sound) — delete the "Music:" line if
  the trending sound is used. NAS: /nas/spark/videos/as-office-chat/.
- 2026-10-25 (Robert's message 2026-10-25: "None of the new after-stories tiktok posts has
  made it above 300. So the change is not good enough. Try something more different.
  Rewrite the marketing plan so it tries new things."): plan rewritten around the **format
  lanes**. **Diagnosis:** every S0-S7 build (and the S-era film baseline) stayed under 300
  — the account posts polished brand content, and polished reads as an ad in the first
  second (research, directional, not TikTok-sourced: theviralapp.com 2026 algorithm piece;
  thecontentlabs.app 8,500-video study — ~31% of sub-1K account videos stall at ~300 as
  baseline; rewatch/loop is 2026's strongest signal; fast emotions humor/curiosity beat
  warm/trust 6-7x; Proof Drop / Investigator hooks escape the stall ~96%; value-first
  structure; never repost a stalled video). **Changes:** §5 Format lanes — Lane 1 reach
  formats R1 (story captions), R2 (Investigator / 48 h mystery), R3 (meme list), R4 (Proof
  Drop), R5 (voice, PAUSED *Robert) at 3 of 4 builds, Lane 2 S0-S7 brand formats at 1 of 4
  (baseline, table unchanged); new Hook doctrine (frame 0 = content curiosity, no product
  claim; banned openers), Native look (phone-cam line, plain big captions, brand skin only
  in accent / end card / font), Loop and rewatch (loopable seam + second-watch detail).
  §3: Truth clarified (story beats state no product fact) and the -silent + trending-sound
  route is the Lane 1 default. §4: diagnosis + five levers in order + 7-day review window.
  §7: scoreboard lane-aware on 7-day numbers. §9: four new *Robert* items (R5 voice,
  silent+trending default, reply-with-video, phone-filmed lane); the backlog item replaced
  (posting order: R-tagged builds first, calendar post-by dates win, at most one earlier
  build per three Lane 1 posts). The 71 §6 rows, the S0-S7
  table, the claim sheet, calendar hooks, the CTA and the sound rules are unchanged.
- 2026-10-24 (nightly, §7 review + build as-reunion): no 48 h reviews due with data — the builds since 10-16 await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: 0 attributed social traffic, 0 waitlist sign-ups, 27 pageviews (prev 7d 118) — the build stays product-focused (as-reunion, Series D, family-reunion · US Thanksgiving, style S3, mood-2 fallback; post by ~Nov 22 per the Thanksgiving calendar hook). Production notes: style S3 flash snapshot (rotation pointer after S2 from as-likes, 2026-10-23) — 6 fresh 9:16 stills from one late-autumn farmhouse back-porch shoot (s1d/s2c/s3b/s4/s5b/s6), 14.0 s cut: 6 × 2.0 s stills + 2.0 s end card, all render checks PASS, ffprobe 1080×1920/30 fps/h264/yuv420p. Hook swap: the table hook “Plan the family reunion together.” → the live family-reunion page says “Plan the reunion together.” (llms-full.txt re-checked 2026-10-24; the §9 watch item applied). Re-shoots: the s1 hook takes (s1, s1b, s1c) all showed visible faces → the shipped s1d is a POV down the table with one hand entering from the frame edge and no people in frame; the s2 pie hand-off LTX clip (c1) was generated and frame-checked but frames 3–4 show a third hand drifting in (LTX drift) → the design's still fallback s2c with the template push-in was used; c1 not committed. All six stills plus the 7 clip frames were vision-checked clean (no faces, no screens, no text, no logos; the s5b phone is back-to-camera with the camera module lit). Music: the row's mood 1 (chill) had no usable Openverse track 2026-10-24 (“chill lofi hip hop” 0, “chillhop” 0, “laid back beats” 0) → n+1 mood 2: “playfulness” by Pan:core, CC BY 3.0, via Jamendo, 55 s, start 17, bed 'track'; mood 2 is unused by Openverse tracks so far and creator Pan:core is unused (last 3: AlexZavesa, Kara Square, Jesse Keller). Gate 1 pass; Claude design loop task 20261024-2207 (review round 1 FAIL on bookkeeping only — no content issues — fixed in this run).
- 2026-10-23 (nightly, §7 review + build as-likes): no 48 h reviews due with data — the builds since 10-16 await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: 0 attributed social traffic, 0 waitlist sign-ups, 32 pageviews (prev 7d 143) — the build stays product-focused (as-likes, Series C feature spotlight, likes → the most-liked photo, style S2, mood-5 fallback). Production notes: S2 one-liner loop (rotation pointer after S7 from as-photos-stuck, 2026-10-22) — one fresh 9:16 still + one 6 s LTX clip (as-likes-s1 → as-likes-c1; still and 8 clip frames vision-checked clean: no faces, no screens, no text, no logos, no morphing); 8.0 s total (6.0 s scene + 2.0 s end card), render checks all PASS with only the two expected S2 WARNs (6 s one-shot scene; total under the 15–20 s sweet spot). Hook “Tap ❤️ on the ones that matter.” verbatim (nights-out page beat, llms-full.txt re-checked 2026-10-23). Glyph: the Anybody font has no U+2764 (fontTools cmap check 2026-10-23) — the heart renders as a monochrome DejaVu Sans fallback glyph in the ink colour (confirmed on the first render's frame 0, no tofu), so the hook stayed verbatim; no swap. Music: the row's mood 0 had no usable Openverse track 2026-10-23 (“upbeat happy pop” returned only the already-used 3d2e7e62; “feel good indie” 0; “summer pop” 0) → n±1 mood-5 word “electro house”: “Man mountain (Electro House)” by AlexZavesa, CC BY 3.0, via Jamendo, 297 s, start 89 (no 30–240 s hit — every usable hit is 297–300 s); the last mood-5 row was as-dinner (10-17), 6 episodes earlier — the ≥6-episodes rule is met; creator AlexZavesa unused. Caption: the §2 post-text form “after-stories.com (link in bio)” is used on purpose (the CTA sits on the end card and the pinned comment) — same as as-polls and as-photos-stuck; the caption carries the hook line, a clear paraphrase of the most-liked-photo morning-after line and the §3 Truth-exception viewer question. Hashtags from the nights-out ASO set in positioning.md: #friends #nightout #partyplanner #groupphotos #afterstories. Design loop task 20261023-2213.
- 2026-10-22 (nightly, §7 review + build as-photos-stuck): no 48 h reviews due with data — the builds since 10-16 await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: 0 attributed social traffic, 0 waitlist sign-ups, 41 pageviews (prev 7d 168) — the build stays product-focused (as-photos-stuck, Series A, photos stuck on phones, S7, mood-0 fallback; row Nov 9 #3). Production notes: style S7 fast montage (rotation pointer after S1 — first S7 build), 9 fresh stills from one post-hike cold-golden-hour shoot; s1 re-shot once (first take had 8 phones + an Apple logo), s3 re-shot twice (garbled boot modules, then dark visible screens), s6 re-shot twice (Apple logo on both takes) — final set s1b/s2/s3c/s4/s5/s6c/s7/s8/s9, every still vision-checked clean (no faces, no screens, no logos, no text). Hook swap: the table hook “Hundreds of photos stuck on six phones” is not on the live site and “Hundreds” would be an invented number (llms-full.txt re-checked 2026-10-22) → the shipped hook is the verbatim excerpt “Chasing replies and asking for the photos afterwards.” (trips-page pain line); the table cell stays as the planning line (as-halloween-chat precedent). Music: Openverse mood 5 (the row's mood) returned 0 usable tracks — “electro house” 0 usable, “synthwave” 0, “edm energetic” API 500s — so per the §3 n±1 fallback mood 0: “Super Power Pop Rock” by Kara Square, CC BY 3.0, via Jamendo, 188 s, start 56, bed 'track'; mood 0 repeats 4 episodes after as-polls (10-18), under the ≥6 rule — allowed by the fallback, logged here. Design loop task 20261022-2222.
- 2026-10-22 (first rotation build): as-morning-after (Nov 9 #2) built manually as Robert's test of the new system — style S1 (type only, no footage) + the first Openverse track ("Lucky Acoustic", ea4ef155, mood 4, warm acoustic). 10.0 s; checks.json all PASS except the expected S1 length WARN; `aiMedia: false` (no AI media — now in the §5 S1 spec note). Views: to be reported.
- 2026-10-22 (Robert's message 2026-10-21: "All after stories tiktok videos have gone under 300 views,
  except the first one (669). The videos all use the same boring music, and not the openverse.org
  that I have asked you to. For the music, save that so it's remembered. For the videos, change
  them, to try different styles, themes etc, to see if we can break out of the 300 limit. The only
  focus is getting attention to the app, so reach is the most important. Style etc could be
  anything. Change the current plan."): plan changed. **Music:** §3 "The sound" replaced: every
  episode now gets a fresh Openverse track (`bed: 'track'`), mood from the Music variant column
  (now a mood index), credit added by the renderer. The synth `music.mjs` bed is fallback only.
  This is permanent. (The motion repo has defaulted to Openverse since 2026-10-17, but this
  file's `bed: 'music'` rule overrode it; that's why every video sounded the same.) **Styles:**
  new §5 Style rotation S0–S7 (type only, one-liner loop, flash snapshot, countdown, slow burn,
  question, fast montage, film baseline), one per build, starting at S1, recorded in the row
  Status. **Reach first** added to §4; §3 Truth gets one caption-question exception; §3 look/
  pacing now per style; §7 reach scoreboard. The 71 §6 rows (hooks, looks, values) are
  unchanged. Hard rules unchanged.

- 2026-10-21 (nightly, §7 review + build as-friendsgiving): no 48 h reviews due with data — the builds since 10-16 await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: 0 attributed social traffic, 0 waitlist sign-ups, 41 pageviews (prev 7d 200) — the build stays product-focused (as-friendsgiving, Series D, dinner-nights · Friendsgiving, music v3; post by ~Nov 15 per the Friendsgiving calendar hook). Production notes: s2 kept as a still (no countable-object clip — LTX drift lesson from 10-20); s5 re-rendered once (first take showed a table set for the meal, not the cleared morning after); 5 stills + 3 clips (c1/c3/c4), every still and 4 frames per clip vision-checked clean. Hashtags: #potluck + #planwithfriends in place of #hosting (as-friendsgiving-date used #hosting; the potluck use case carries the niche tags). Design loop task 20261021-2205.
- 2026-10-20 (nightly, §7 review + build as-friendsgiving-date): no 48 h reviews due with data — the builds since 10-16 await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: 0 attributed social traffic, 0 waitlist sign-ups, 36 pageviews (prev 7d 200) — the build stays product-focused (as-friendsgiving-date, Series A, dinner-nights · Friendsgiving, music v2; post by ~Nov 15 per the Friendsgiving calendar hook). Production notes: both LTX takes of the shot-4 card clip drifted the card count from three to two mid-clip (a mismatch with the on-screen "Put three evenings to a vote" line), so the design's fallback was used — the verified still s4_00003 with the template slow push-in; the reel is 4 stills + 1 clip (c1, the rain drip, every frame checked clean). Hashtags: #hosting in place of #potluck (this episode is the date-picking angle, not the potluck table).

- 2026-10-19 (nightly, §7 review + build as-office-xmas): no 48 h reviews due with data — the as-polls build (10-18) and the earlier builds await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: 0 attributed social traffic, 0 waitlist sign-ups, 33 pageviews (prev 7d 203) — the build stays product-focused (as-office-xmas, office-events · Christmas party, Series D, music v1; post by ~Nov 14 per the calendar hook).
- 2026-10-18 (nightly, §7 review + LAUNCH): no 48 h reviews due with data — the as-dinner build (10-17) and the earlier builds await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: no attributed social traffic, 0 waitlist sign-ups — the build stays product-focused (as-polls). **The app launched 2026-10-18** (App Store 6815212070, iPhone only, iOS 27+; verified via site-brief + the live "Download on the App Store" badges + docs/messaging.md "Live since 2026-10-18" + docs/positioning.md "Launched 2026-10-18"). Consequences, applied in this run: §2 CTA table flipped to the live row with the messaging.md wording ("Download on the App Store", no "Get notified", no "free" per §5); the claim sheet's "Friends without an iPhone" line is now stale and the web/Android never-claim item widened (messaging.md rule 11 — no web version); **the as-nobody-left-out row (Nov 16 #2) must be reworked before its build night**; the deployed `llms-full.txt` still carries the pre-launch status line — the live site and the repo docs are the current sources of truth.
- 2026-10-17 (nightly, §7 review): no 48 h reviews due with data — the as-trips-a/b A/B (due 10-14) and the as-match-day / as-halloween-chat builds (10-16) await Robert's posts; TikTok hook/completion/share metrics are not reachable by the job (manual posting, §9). Funnel this week: no attributed social traffic, 0 waitlist sign-ups — the build stays product-focused (as-dinner).
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
  Done 2026-10-24: the built reel uses the site's line "Plan the reunion together." on screen.
- Posting backlog: the built rows wait in §6 (`as-halloween-a/b` must go out before
  Oct 31). The job only builds `queued` rows, so a large backlog does not stop it; Robert
  tells it which ones are posted.
- *Robert (2026-10-25, reach lane):* **R5 voice lane** — record a ≤ 40 s narration on the
  phone per build, or configure a TTS provider (the Hermes TTS 403'd on 2026-10-25). Until
  then the lane is paused and the rotation skips R5. Since 2026-10-26 N3 replaces it (below).
- *Robert (2026-10-25):* **post the Lane 1 `-silent.mp4` with a trending TikTok sound by
  default** (the §3 sound default); delete the "Music:" line from the post text when the
  trending sound is used.
- *Robert (2026-10-25):* **reply to comments with a short video** when a comment is worth
  answering (the native reply format — the cheapest reach); the job builds a 5-8 s answer
  cut on request.
- *Robert (2026-10-25):* optional — **phone-filmed lane**: Robert films 10-30 s on his
  phone (a real table, a real morning-after coffee, the group from behind) and the job
  cuts, captions and mixes it. The most native lane of all; paused until he opts in.
- *Robert:* posting order (2026-10-26, replaces the 2026-10-25 order): **at most one post
  per day**, in the 18:00–21:00 window, from the **TikTok phone app** (not TikTok Studio on the
  web). Post the newest Lane 0 (N) builds first, then the R builds; calendar post-by dates still
  win. The S-tagged and older builds are stock: at most one of them per week. Never re-post a
  stalled video (§7). Report views, For You share, average watch time and % watched in full at
  48 h and 7 days per video (§7).
- *Robert (2026-10-26, account track):* check **Account status** in the TikTok app (Profile →
  ☰ → Settings and privacy → Account → Account status, or "Account check" in TikTok Studio)
  for posts marked "ineligible for the For You feed"; check the account is a **personal
  creator** account, not Business (Business accounts only get the commercial sound library);
  spend 10–15 min in the niche (party, friends, trip planning) before and after posting:
  watch, like and comment like a real user. If the six-post Lane 0 test (§7) also stalls,
  decide on a fresh account.
- *Robert (2026-10-26):* opt in to **N3 voice** — say "N3 on" and choose TikTok's in-app
  text-to-speech (the job writes the lines) or your own recording. Opt in to **N4** by putting
  phone clips in `/nas/spark/footage/after-stories/phone/`.

- *2026-10-25 (experiment — the ~300 ceiling):* every posted video on `@after.stories6` sits
  in a uniform **256–283 view band** — all styles (S0–S7), both sound routes, and the new
  native R1 (`as-office-chat`, 283) alike; only the very first post ever got past it (669,
  likely the new-creator boost). Uniform output across varied inputs → the ceiling is at the
  account/distribution level, not the content. Two tracks: (a) account work is Robert's
  (check the account type — Business accounts are limited; engage in-niche 10–20 min/day,
  post 18:00–21:00, reply to every comment within the hour); (b) controlled content test —
  **as-private-by-design (R2, built 2026-10-25) ends on a deliberate soft line**
  (“what's your group's worst planning story?” + after-stories.com, no icon, no
  “Download on the App Store” anywhere on screen; the CTA moves to the pinned comment) to
  isolate the end-card CTA as an ad signal. Decision rule: if it also stalls at ~300, the
  account track is the fix and content keeps running at current quality; if it breaks the
  band, end cards go soft (question/comment-prompt) across the plan and the CTA lives in
  the pinned comment by default. Mood-4 music note: “folk ukulele”, “warm acoustic” and
  “uplifting orchestral” returned 0 usable Openverse hits (2026-10-25) → fell back to
  “acoustic guitar” (adjacent) and used “Nocturno No. 2” by Daniel Bautista (CC BY 3.0,
  credited in credits.json).

- *2026-10-29 (nightly, build as-save-first + pacing fix):* **Pipeline gap found and fixed.**
  The 2026-10-28 run answered `[SILENT]` ("no row due"): the job prompt carried a
  "week starts within 7 days" due-gate that `marketing.md` §4 has overridden since
  Robert's 2026-10-16 rule ("every night, no due-date gate"). Result: an 18-day drought
  (the next `queued` row was Nov 23 #4) with only 1 unposted build left. **Fix (Robert's
  choice, 2026-10-29):** the job prompt step 5 now says build every night — no due-date
  gate — and keep a **≥3 unposted build buffer** (a backlog never stops the job);
  verified on disk. **Build:** as-save-first (R3 Meme list / fast humor, rotation after
  R2), 9.5 s, 5 fresh stills (one face-down-phone still re-shot twice — Flux drew the
  screen up, then a second phone + laptop; final take clean), punchline is the verbatim
  claim line "Save every photo. Then it's gone." (save-first holds), **STANDARD end card
  (CTA + icon)** — this is the control in Robert's A/B: as-private-by-design (no-CTA
  soft end card) vs this one isolates the end-card CTA as an ad signal. Music:
  "The Groove Experiment" by Dust Harvesting (CC BY 3.0, fresh id/creator; mood-0/2
  search words "playful ukulele"/"funny slapstick"/"quirky bass groove" returned 0
  usable hits 2026-10-29 → "groove" search). All render checks PASS (9.5 s length WARN
  expected for R3); contact-sheet review: no faces, phone face-down, no other screens,
  logo only on the end card. NAS: /nas/spark/videos/as-save-first/.

- *2026-10-29 (steer — the kids carpool):* Robert: "Next tiktok movie should focus on the
  kids car pool." The only carpool row (as-match-day, "The carpool, sorted.") is built
  (2026-10-16, football) — so a new row **as-kids-carpool** was inserted at the TOP of the
  queue (Nov 30 #0, queued; the nightly job builds the first queued row → this one is
  built tonight 22:00). Scene: school pickup at 3 pm, line of parked cars by the gate,
  cold pink-grey afternoon light; no kids' faces (standing image rule — from behind /
  no faces), claim from the school-run group angle. Also noted: **After Stories 1.1 is
  released** (READY_FOR_DISTRIBUTION) and 1.2 is WAITING_FOR_REVIEW (submitted 2026-10-29
  11:31 UTC) — verified in ASC (app 6815212070).

- *2026-10-29 (nightly, §7 review + build as-kids-carpool):* no 7-day reviews due with data — the builds since 10-16 await Robert's posts (TikTok hook/completion/share metrics are not reachable by the job, manual posting, §9). Funnel this week: 0 attributed social traffic, 0 sign-ups, 25 pageviews (prev 7d 43) — reach-first, so the build stays product-focused on the carpool feature. **Format:** N1 (rotation: last built Status is R, as-save-first, 2026-10-29 → the next format in the N1 → N2 → R order is N1), 10.5 s, `look: 'clean'`, `aiMedia: true`. **Row:** Nov 30 #0 as-kids-carpool — the first queued row (the steer inserted it at the top of the queue; as-friends-xmas stays queued for the next build). **Frame 0:** "Who's driving the kids on Thursday?" (6 words, scenario question, no product fact, Hook doctrine). **App cuts:** 02_CarPool.mp4 9.0–11.5 s (the "The cars" list, Way out tab, 3×3 seats, Move controls) and 02_CarPool.mp4 18.5–20.5 s (the chat: "Away game on Sunday! I've made the car list" + likes), both padded 1080×1920 on #0B0C0E, both frame-verified stable 2026-10-29; banned moments (03_TheEvent 3.0–5.5 / 6.0 / 28.0–30.0, 01_Create 12.8–14.3) not used. Demo data (names, seats) never presented as real users. **On-screen lines:** "Nobody counts seats in the car park." and "Every kid in a car." — verbatim /match-day/ lines (llms-full.txt re-checked 2026-10-29); the row hook "The school run, planned as a group." is the row's own line (not on the site — flagged so Robert can swap it). **Music:** OPENVERSE FALLBACK — the row's mood 0 and the mood-1/mood-2 fallback words all returned only already-used ids or 0 hits on 2026-10-29 ("upbeat happy pop" → only the used 3d2e7e62; "feel good indie"/"summer pop"/"chill lofi hip hop"/"chillhop"/"laid back beats"/"funk groove"/"disco funk" → 0; "playful" → only the used b6fb4ded) → the documented last resort, `bed: 'music'` variant 0. **Production:** 1 fresh 9:16 still (comfy-gen --prefix as-kids-carpool-s1, vision-checked clean: no faces, no readable signs/plates/writing, no logos, no phone screens; the red mitten landed on the child's hand, not a wing mirror — the shipped second-watch detail); loop seam: S4 returns to the S1 still; all render checks PASS (10.5 s inside the N1 7–15 s window, only the expected length WARN; -14.2 LUFS, true peak -1.4 dBTP, limiter 0.9 dB); phone.png reviewed: no faces, captions clear of key UI, end card icon + CTA + url. Claude design loop task 20261029-2233 (round 1 FAIL on bookkeeping — pinned comment / brand last line / word count — all fixed; round 2 PASS). Post route: the -silent.mp4 + a trending TikTok sound is the Lane 0 default (§3 Sound); no embedded Openverse track in this build (synth fallback) — nothing to delete if the trending sound is used. NAS: /nas/spark/videos/as-kids-carpool/.

- *2026-10-29 (standing rule — end card):* Robert: "remove the download text in the end.
  Always just finish with after-stories.com and a logo. Nothing else." **Every end card
  from now on = the app icon + `after-stories.com`, no "Download on the App Store"
  (or any other) text** — spec shape: `end.text: 'after-stories.com'`, no `end.sub`,
  `end.image` = the icon, `end.seconds: 2`. The as-save-first build (2026-10-29) was
  re-cut with this end card (same cuts/track, end card re-rendered); the as-save-first
  post text and pinned comment are unchanged (they already carried the URL). The
  2026-10-25 A/B now reads: as-private-by-design (soft question end card) vs as-save-first
  (URL + logo end card) — the download-text ad signal is out of both.
