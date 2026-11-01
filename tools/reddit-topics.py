#!/usr/bin/env python3
"""reddit-topics.py — what people planning nights out, dinners, birthdays and
group trips with friends are actually asking: coordination, the group chat,
the photos, the bill, and privacy.

Feeds the weekly blog job (see prompt.md §2) with real reader demand instead of
whatever the model imagines a group hangout worries about.

    python3 tools/reddit-topics.py                 # ranked digest, ~60 lines
    python3 tools/reddit-topics.py --json          # same data, machine-readable
    python3 tools/reddit-topics.py --refresh       # ignore the cache
    python3 tools/reddit-topics.py --windows month,year --max-seconds 1800

A failed scrape is a normal outcome, not a bug: prompt.md §2 falls back to the
ranked topic bank, which was derived from the same subreddits by hand.

WHY RSS AND NOT THE JSON API: reddit.com/r/<sub>/top.json returns 403 to both a
datacenter IP and a home IP now. The Atom feed at /r/<sub>/top/.rss is still
served, so that is what this uses. It is rate-limited though — measured
2026-08-27 (bike-stories, same tool), an anonymous request comes back with
x-ratelimit-remaining 0 and a ~54s reset, so the real budget is about one feed
a minute. That is why requests are paced at 50s, retried with backoff, and
cached to .cache/ for most of a day. The 600s budget therefore buys the first
~10 subreddits, which is what SUBREDDITS is ordered for.

WHY A SCRIPT AND NOT A FEW CURL COMMANDS IN THE BRIEF: the Hermes agent's
terminal blocks `-c` / `-e` flags, so `python3 -c '...'` and clever one-liners
fail at runtime with BLOCKED. And raw feeds are ~50 KB each — a dozen of them
would bury the model's context. A plain command that prints a small digest
survives both constraints.

Failure is not fatal: if every feed fails, this exits 2 having printed a clear
message, and the brief falls back to the ranked topic bank in prompt.md.

Stdlib only: it runs inside the Hermes container, where there is no pip.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".cache" / "reddit-topics"
POSTS = ROOT / "src" / "content" / "blog"

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")
ATOM = {"a": "http://www.w3.org/2005/Atom"}

# ORDER MATTERS. Reddit rate-limits hard and the time budget truncates the tail,
# so this is a priority list, highest-value first.
#
# The readers are the people planning something with friends — a night out, a
# dinner, a birthday, a weekend away — and their pain lives in coordination:
# the group chat that drowns the plan, the "what time was it again?" scroll,
# the photos stuck on everyone's phone, the bill that never gets settled, and
# the parts that should stay private. r/Hangout and r/planning carry the
# "how do I get us to actually do something" questions; r/birthday and
# r/WeddingPlanning carry the hosting logistics; r/groupchat and r/DateNight
# carry the chat chaos and the awkwardness; the Ask subs are broad but their
# "how do I split the bill / keep a surprise secret / stop being the only
# organizer" threads are exactly this product's reader.
SUBREDDITS = [
    "Hangout", "planning", "birthday", "WeddingPlanning", "groupchat",
    "DateNight", "AskFem", "AskMen", "socializing", "LifeProTips",
]
# Month only by default: at about one feed a minute, 10 subs x 2 windows cannot
# finish inside a scheduled run. Pass --windows month,year by hand when you
# want the deeper corpus and can wait.
WINDOWS = ["month"]

# Theme buckets. A title can land in several; each is counted once per theme.
# Keep these lowercase and substring-matched (short words on word boundaries,
# see _matches) — cheap, and good enough to rank.
#
# Seeded from the topic bank in prompt.md §2 (coordination chaos, the
# "what time was it again?" logistics, the photos and the morning after,
# privacy, the bill, getting the group to decide, hosting, flaking) plus the
# subjects existing posts already own, so that "ALREADY COVERED" is meaningful.
THEMES: dict[str, tuple[str, list[str]]] = {
    "coordination-chaos": ("Group-chat chaos and planning that falls apart", [
        "group chat", "groupchat", "organizing", "organise", "coordinate",
        "coordination", "chaos", "fall apart", "fell apart", "nobody replies",
        "no reply", "who is going", "is anyone going", "planning a night out",
        "plan a night out", "organize a night", "planning with friends",
        "group trip", "group outing"]),
    "time-venue-questions": ("\u201cWhat time?\u201d and \u201cwhere exactly?\u201d — the basic logistics", [
        "what time", "where is it", "where are we", "door code", "address",
        "location", "meet at", "meet up", "meet point", "meet in", "which day",
        "what day", "when is it", "time was it", "change of plans", "changed plans"]),
    "photos-memories": ("The photos and the morning after", [
        "photos", "pictures", "snapshots", "photos from", "shared photos",
        "save the photos", "memory", "memories", "night to remember",
        "morning after", "next day", "forget the night", "remember the night",
        "group photo", "best photo"]),
    "privacy": ("Privacy and the group that shouldn't be public", [
        "private", "privacy", "invite only", "invite-only", "uninvited",
        "not my friends", "stalker", "creepy", "who can see", "public",
        "no strangers", "secret party", "surprise", "surprise party",
        "keep it private"]),
    "bill-money": ("Splitting the bill and money with friends", [
        "split the bill", "splitting the bill", "split the check", "splitting",
        "go dutch", "dutch", "venmo", "square away", "owe you", "settle up",
        "who pays", "pays for", "cost per person", "how much do i bring",
        "bring money"]),
    "decision-votes": ("Getting the group to actually decide", [
        "vote", "voting", "poll", "polls", "decide", "decision", "decisions",
        "can't decide", "cant decide", "everyone has opinions", "choose a",
        "where should we", "what should we", "which place", "which restaurant",
        "film night", "movie night"]),
    "birthday-hosting": ("Hosting a birthday or party without doing everything", [
        "birthday party", "birthday", "party planning", "party", "host a",
        "hosting", "surprise party", "anniversary", "celebration", "dinner party",
        "guest list", "rs"]),
    "social-awkwardness": ("Social friction: flaking, FOMO and the awkward bits", [
        "flaked", "flake", "flaking", "no show", "noshow", "stood up", "cancelled",
        "fomo", "awkward", "embarrassing", "group project", "effort", "always the one",
        "organizer guilt", "planner guilt"]),
}

# Titles that are jokes, screenshots, brag-posts or venting. On these subs the
# "my X lasted 20 years" story posts dominate /top and carry no query intent.
NOISE = [
    "haha", "lol", "lmao", "meme", "rate my", "my setup", "look what",
    "haul", "unboxing", "day in the life", "psa:", "just wanted to share",
    "guess the", "who else", "relatable", "me when", "pov", "before and after",
    "before & after", "update:", "photo dump", "progress pic", "progress pics",
    "i built", "built this", "finally finished", "finished my", "proud of",
    "look at this", "[oc]", "album", "sunset", "the previous owner",
    # Deliberately NOT "found this": on home subs "found this behind my wall,
    # what is it?" is a real hidden-cost question, unlike on the bike sub.
    # Rhetorical and venting posts. These carry a "?" or a question word, so
    # is_useful() would wave them through. They are community discourse, not
    # queries.
    "is it just me", "am i the only", "anyone else feel", "does anyone else feel",
    "my favourite part", "my favorite part", "best perks", "perks of being",
    "rant", "vent", "unpopular opinion", "am i wrong", "aita", ", right?",
    "why do you", "why do people", "so tired of", "i'm done with", "im done with",
    "the audacity", "you won't believe", "you wont believe",
]

# Rhetorical tag questions ending a title — "…, right?", "…, isn't it?". These
# are agreement-fishing, not queries, and a plain NOISE substring can't catch
# them reliably because of intervening quote marks.
TAG_QUESTION = re.compile(
    r"\b(right|isn'?t it|aren'?t they|am i wrong|or is it just me)\s*[?!]+\s*$")
QUESTION_WORDS = [
    "how", "what", "why", "when", "which", "anyone", "does", "do you", "should",
    "tips", "advice", "help", "is it", "is this", "can i", "any way", "best way",
    "struggl", "cant", "can't", "trouble", "problem", "recommend", "worth", " vs ",
    "or replace", "normal", "safe to", "need a", "do i need",
]


def cache_path(sub: str, window: str) -> Path:
    return CACHE / f"{sub}-{window}.xml"


def read_cache(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except OSError:
        return None


def save_cache(path: Path, body: str, verbose: bool) -> None:
    """Best effort. A read-only checkout must not cost us a fetched feed."""
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(body, encoding="utf-8")
    except OSError as e:
        if verbose:
            print(f"  (cache not written: {e.__class__.__name__})", file=sys.stderr)


def fetch(sub: str, window: str, pace: float, ttl: int, refresh: bool,
          verbose: bool, deadline: float) -> tuple[str | None, bool]:
    """Return (xml, from_cache). None means this feed is unavailable.

    Reddit rate-limits anonymous RSS hard — 429 is the normal response to any
    enthusiasm — so requests are paced, backed off, and finally given up on.
    Progress goes to stderr on every feed: a scheduled run is killed after 600s
    of silence, and the backoffs alone can exceed that.
    """
    path = cache_path(sub, window)
    if not refresh and path.exists() and (time.time() - path.stat().st_mtime) < ttl:
        cached = read_cache(path)
        if cached:
            if verbose:
                print(f"  r/{sub:<16} [{window}] cached", file=sys.stderr)
            return cached, True

    url = f"https://www.reddit.com/r/{sub}/top/.rss?t={window}"
    for attempt in range(4):
        if time.time() > deadline:
            if verbose:
                print(f"  r/{sub:<16} [{window}] skipped (time budget spent)", file=sys.stderr)
            break
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA,
                                                       "Accept": "application/atom+xml"})
            with urllib.request.urlopen(req, timeout=25) as r:
                body = r.read().decode("utf-8", "replace")
            save_cache(path, body, verbose)
            if verbose:
                print(f"  r/{sub:<16} [{window}] ok ({len(titles_from(body))} posts)",
                      file=sys.stderr)
            time.sleep(pace)
            return body, False
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and attempt < 3:
                wait = 30 * (attempt + 1)
                if verbose:
                    print(f"  r/{sub:<16} [{window}] {e.code} — waiting {wait}s",
                          file=sys.stderr)
                time.sleep(min(wait, max(0.0, deadline - time.time())))
                continue
            if verbose:
                print(f"  r/{sub:<16} [{window}] unavailable (HTTP {e.code})", file=sys.stderr)
            break
        except Exception as e:                                    # network, DNS, timeout
            if verbose:
                print(f"  r/{sub:<16} [{window}] unavailable ({type(e).__name__})",
                      file=sys.stderr)
            break

    stale = read_cache(path) if path.exists() else None            # stale beats nothing
    if stale:
        if verbose:
            print(f"  r/{sub:<16} [{window}] using stale cache", file=sys.stderr)
        return stale, True
    return None, False


def titles_from(xml: str) -> list[str]:
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return []
    out = []
    for entry in root.findall("a:entry", ATOM):
        node = entry.find("a:title", ATOM)
        if node is not None and node.text:
            out.append(re.sub(r"\s+", " ", node.text).strip())
    return out


# Reddit titles are full of smart punctuation. Normalise it before matching, or
# a pattern like ", right?" misses «Being "Abused," Right?» purely on quote style.
_SMART = str.maketrans({"\u2018": "'", "\u2019": "'", "\u201c": '"', "\u201d": '"',
                        "\u2013": "-", "\u2014": "-", "\u2026": "..."})


def normalise(title: str) -> str:
    return title.translate(_SMART)


def is_useful(title: str) -> bool:
    low = f" {normalise(title).lower()} "
    if len(title) < 20:
        return False
    # _matches, not `in` — plain substring matching had "rant" killing every
    # title containing a word that merely contains it (the original bug was
    # "rant" inside "restaurants"; here it would be "nbd" or "rust").
    if any(_matches(n, low) for n in NOISE):
        return False
    if TAG_QUESTION.search(low):
        return False
    # All-caps venting posts carry no query intent.
    if sum(c.isupper() for c in title) > len(title) * 0.6:
        return False
    return any(_matches(w, low) for w in QUESTION_WORDS) or "?" in title


# Short keywords must match on word boundaries, with an optional plural "s".
# Plain substring matching put "bathroom" under bars ("bar") and "multiple"
# under paying ("tip") — both seen in a real run — while a strict boundary
# missed "Best bars in Berlin?". Multi-word phrases stay substring matches,
# since those are specific enough on their own.
_BOUNDARY_CACHE: dict[str, re.Pattern] = {}


def _matches(word: str, low: str) -> bool:
    if " " in word or len(word) > 9:
        return word in low
    pat = _BOUNDARY_CACHE.get(word)
    if pat is None:
        pat = _BOUNDARY_CACHE[word] = re.compile(rf"(?<![a-z]){re.escape(word)}s?(?![a-z])")
    return bool(pat.search(low))


def themes_of(title: str) -> list[str]:
    low = f" {normalise(title).lower()} "
    return [key for key, (_, words) in THEMES.items()
            if any(_matches(w, low) for w in words)]


def covered_themes(posts_dir: Path = POSTS) -> dict[str, list[str]]:
    """Map theme -> [slugs] for themes an existing post already addresses.

    Matched against the frontmatter title, the primary keyword and the slug
    only — a post that mentions permits in passing is not a post about permits.
    """
    out: dict[str, list[str]] = {}
    if not posts_dir.is_dir():
        return out
    for path in sorted(posts_dir.glob("*.md")):
        head = path.read_text(encoding="utf-8")[:3000].split("\n---", 1)[0]
        subject = " ".join(
            line.split(":", 1)[1] for line in head.split("\n")
            if line.split(":", 1)[0].strip() in ("title", "keyword") and ":" in line
        )
        for key in themes_of(f"{subject} {path.stem.replace('-', ' ')}"):
            out.setdefault(key, []).append(path.stem)
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--subs", help="comma-separated subreddits (default: the group-hangout set)")
    ap.add_argument("--windows", default=",".join(WINDOWS), help="top windows: month,year")
    ap.add_argument("--pace", type=float, default=50.0,
                    help="seconds between requests; Reddit allows about one feed a minute")
    ap.add_argument("--max-seconds", type=float, default=600.0,
                    help="total time budget; stops fetching and reports what it has")
    ap.add_argument("--ttl", type=int, default=20 * 3600, help="cache lifetime in seconds")
    ap.add_argument("--refresh", action="store_true", help="ignore the cache")
    ap.add_argument("--themes", type=int, default=8, help="how many themes to report")
    ap.add_argument("--examples", type=int, default=3, help="example titles per theme")
    ap.add_argument("--json", action="store_true", dest="as_json")
    ap.add_argument("--quiet", action="store_true", help="no progress on stderr")
    a = ap.parse_args()

    subs = [s.strip() for s in (a.subs.split(",") if a.subs else SUBREDDITS) if s.strip()]
    windows = [w.strip() for w in a.windows.split(",") if w.strip()]
    verbose = not a.quiet

    if verbose:
        print(f"Reading {len(subs)} subreddits x {len(windows)} windows "
              f"(~{a.pace:.0f}s apart, cached {a.ttl // 3600}h, "
              f"{a.max_seconds:.0f}s budget)...", file=sys.stderr)

    deadline = time.time() + a.max_seconds
    seen: set[str] = set()
    entries: list[tuple[str, str, int]] = []          # (title, sub, rank)
    ok = cached = failed = 0
    # Windows outer, subs inner: with a budget that truncates, every subreddit
    # should get its "month" feed before any subreddit gets its "year".
    for window in windows:
        for sub in subs:
            xml, from_cache = fetch(sub, window, a.pace, a.ttl, a.refresh, verbose, deadline)
            if xml is None:
                failed += 1
                continue
            ok += 1
            cached += 1 if from_cache else 0
            for rank, title in enumerate(titles_from(xml)):
                key = re.sub(r"[^a-z0-9]+", "", title.lower())[:60]
                if key in seen:
                    continue
                seen.add(key)
                entries.append((title, sub, rank))

    if not entries:
        print("reddit-topics: every feed failed (Reddit is blocking or offline).\n"
              "Fall back to the ranked topic bank in prompt.md — that is expected "
              "and fine.", file=sys.stderr)
        return 2

    useful = [(t, s, r) for t, s, r in entries if is_useful(t)]
    covered = covered_themes()

    buckets: dict[str, dict] = {}
    for title, sub, rank in useful:
        for key in themes_of(title):
            b = buckets.setdefault(key, {"key": key, "label": THEMES[key][0],
                                         "count": 0, "weight": 0.0,
                                         "titles": [], "covered_by": covered.get(key, [])})
            b["count"] += 1
            b["weight"] += 1.0 / (rank + 3)           # higher in /top = stronger demand
            b["titles"].append(title)

    ranked = sorted(buckets.values(), key=lambda b: (b["weight"], b["count"]), reverse=True)
    for b in ranked:
        b["weight"] = round(b["weight"], 2)
        b["titles"] = sorted(b["titles"], key=len)[-a.examples * 3:][::-1][:a.examples]

    fresh_themes = [b for b in ranked if not b["covered_by"]]
    done_themes = [b for b in ranked if b["covered_by"]]

    if a.as_json:
        print(json.dumps({
            "feeds_ok": ok, "feeds_failed": failed, "feeds_from_cache": cached,
            "posts_seen": len(entries), "posts_useful": len(useful),
            "themes": ranked,
        }, indent=2, ensure_ascii=False))
        return 0

    print(f"REDDIT DEMAND — {ok} feeds ({cached} cached, {failed} unavailable), "
          f"{len(entries)} posts, {len(useful)} carrying a real question")
    print()
    print(f"UNCOVERED THEMES — strongest demand first")
    if not fresh_themes:
        print("  (every theme is already covered — write a fresher angle on a top one)")
    for i, b in enumerate(fresh_themes[:a.themes], 1):
        print(f"{i:2}. {b['label']}  [{b['key']}]  {b['count']} posts, weight {b['weight']}")
        for t in b["titles"]:
            print(f"      · {t[:110]}")
    print()
    print("ALREADY COVERED")
    for b in done_themes[:8]:
        print(f"  - {b['label']} ({b['count']}) → {', '.join(sorted(set(b['covered_by'])))}")
    print()
    print("TOP QUESTION TITLES VERBATIM — the reader's own words, use them")
    on_topic = [e for e in useful if themes_of(e[0])]
    for title, sub, rank in sorted(on_topic, key=lambda e: e[2])[:15]:
        print(f"  · [r/{sub}] {title[:110]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
