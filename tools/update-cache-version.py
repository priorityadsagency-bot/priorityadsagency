"""Cache busting for the Priority Ads Agency website.

Run this every time assets/style.css or assets/main.js is edited:
    python tools/update-cache-version.py   (run inside the priority-website folder)
It stamps each page's links with ?v=<content hash>, so browsers keep the files for a year
but download the new version immediately after a change.
"""
import hashlib, pathlib, re
site = pathlib.Path(__file__).resolve().parent.parent
pages = list(site.glob("*.html")) + list(site.glob("portfolio/*.html"))
changed = 0
for name in ("style.css", "main.js", "consent.js", "webmcp.js"):
    v = hashlib.md5((site / "assets" / name).read_bytes()).hexdigest()[:10]
    pat = re.compile(r'(assets/' + re.escape(name) + r')(\?v=[0-9a-f]+)?(")')
    for p in pages:
        h = p.read_text(encoding="utf-8"); n = pat.sub(r'\g<1>?v=' + v + r'\3', h)
        if n != h: p.write_text(n, encoding="utf-8"); changed += 1
    print(f"{name}: v={v}")
print(f"updated {changed} page references")
