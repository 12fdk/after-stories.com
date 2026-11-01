#!/usr/bin/env python3
"""Build after-stories.com for the weekly blog job.

    python3 tools/build.py            # full Astro build (npm)
    python3 tools/build.py --check    # typecheck-only, no emit

Prints the tail of the build log and exits non-zero on failure. The container
has npm, not pnpm — `npm install` may touch package-lock.json; the blog job
checks it out after staging (the lock file is committed here, so npm is
expected to keep it stable; if npm rewrites it, the job restores it).
"""
import subprocess
import sys

def main() -> int:
    check = "--check" in sys.argv
    cmd = ["npm", "run", "build"]
    if check:
        cmd = ["npm", "exec", "--", "astro", "check"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    tail = (r.stdout or "")[-3000:] + ((r.stderr or "")[-3000:])
    sys.stdout.write(tail)
    return r.returncode

if __name__ == "__main__":
    sys.exit(main())
