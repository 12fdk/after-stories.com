#!/usr/bin/env python3
"""browser-screens.py — the web app's screenshots into the site, as the pages use them.

    python3 tools/browser-screens.py                       # every locale, from ../after-stories
    python3 tools/browser-screens.py --from PATH/out       # another capture directory
    python3 tools/browser-screens.py --langs en,da --dry-run

The pictures are shot in the app repo (after-stories/web/screenshots/, its README.md):

    cd ../after-stories/web/app && npm ci && npm run build
    cd ../screenshots && npm install && node capture.mjs

That leaves `out/<locale>/<shot>-browser.png`: a 1280×800 window at 2×, the app's column in the
middle of the page. This takes each shot the site shows, crops it to the app's column (the empty
page on both sides goes, so the app reads larger), scales it to 1600 px wide and writes
`public/app/<locale>/<shot>-browser.webp`.

It fails, writing nothing, when a locale or a shot is missing, or when the picture's shape no longer
matches the `width`/`height` its component declares (`SHOTS` below): the web app's layout moved, so
change the component's numbers with the new pictures. Needs Pillow (`python3 -m pip install pillow`).
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("browser-screens.py needs Pillow: python3 -m pip install pillow")

SITE = Path(__file__).resolve().parents[1]
DEFAULT_FROM = SITE.parent / "after-stories" / "web" / "screenshots" / "out"
LOCALES = ["en", "da", "de", "fr", "es"]
#: The shots the pages show, and the component that declares each one's size.
SHOTS = {"live": SITE / "src" / "components" / "sections" / "Browser.astro"}
WIDTH = 1600
QUALITY = 82
#: How far a pixel may be from the page's background and still count as background.
TOLERANCE = 12


def app_column(im: Image.Image) -> tuple[int, int]:
    """The left and right edge of the app on the page: the columns that differ from the background."""
    rgb = im.convert("RGB")
    px = rgb.load()
    w, h = rgb.size
    bg = px[5, h // 2]
    rows = range(0, h, 25)
    differs = lambda x: any(sum(abs(a - b) for a, b in zip(px[x, y], bg)) > TOLERANCE for y in rows)
    left = next((x for x in range(w) if differs(x)), 0)
    right = next((x for x in range(w - 1, -1, -1) if differs(x)), w - 1)
    return max(left - 2, 0), min(right + 3, w)


def declared_size(component: Path) -> tuple[int, int]:
    """The `width` and `height` the component gives its screenshot's <img>."""
    text = component.read_text(encoding="utf-8")
    m = re.search(r'-browser\.webp`\}[\s\S]*?width="(\d+)"[\s\S]*?height="(\d+)"', text)
    if not m:
        sys.exit(f"{component.relative_to(SITE)}: no width/height for the screenshot")
    return int(m.group(1)), int(m.group(2))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--from", dest="source", type=Path, default=DEFAULT_FROM, help="the capture's out/ directory")
    parser.add_argument("--langs", default=",".join(LOCALES), help="comma-separated locales (default: all five)")
    parser.add_argument("--dry-run", action="store_true", help="check and report, write nothing")
    args = parser.parse_args()
    langs = args.langs.split(",")

    missing = [f"{lang}/{shot}-browser.png" for lang in langs for shot in SHOTS
               if not (args.source / lang / f"{shot}-browser.png").is_file()]
    if missing:
        print(f"Not in {args.source}:", *missing, sep="\n  ", file=sys.stderr)
        print("Shoot them first: see the top of this file.", file=sys.stderr)
        return 1

    # Everything is made and checked before anything is written.
    results: list[tuple[Path, Image.Image]] = []
    failed = False
    for shot, component in SHOTS.items():
        want = declared_size(component)
        for lang in langs:
            im = Image.open(args.source / lang / f"{shot}-browser.png").convert("RGB")
            left, right = app_column(im)
            cropped = im.crop((left, 0, right, im.height))
            out = cropped.resize((WIDTH, round(WIDTH * cropped.height / cropped.width)), Image.LANCZOS)
            target = SITE / "public" / "app" / lang / f"{shot}-browser.webp"
            ok = out.size == want
            failed |= not ok
            print(f"{lang}/{shot}: app at x {left}–{right} of {im.width} → {out.width}×{out.height}"
                  + ("" if ok else f"  ✗ {component.name} says {want[0]}×{want[1]}"))
            results.append((target, out))

    if failed:
        print("\nThe web app's layout changed the pictures' shape. Check them, then set the new width and"
              " height in the component and run this again.", file=sys.stderr)
        return 1
    if args.dry_run:
        print("\nDry run: nothing written.")
        return 0
    for target, out in results:
        target.parent.mkdir(parents=True, exist_ok=True)
        out.save(target, "WEBP", quality=QUALITY, method=6)
        print(f"wrote {target.relative_to(SITE)} ({target.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
