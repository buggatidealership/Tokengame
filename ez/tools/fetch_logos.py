"""Fetch a company logo for every ticker in ez-data.js and write the CO_LOGOS block.

    pip install pillow
    python3 ez/tools/fetch_logos.py           # download missing logos to ez/media/logos/, then rewrite CO_LOGOS

Source: financialmodelingprep.com/image-stock/<TICKER>.png (public, no key). ALIAS maps a sheet ticker to the
one the source knows. A logo that is light on transparent (made for dark screens) is marked dark:1, so the page
puts it on a dark badge. Remove a file and re-run to refresh it. Tickers with no logo keep the ticker badge.

Existing files are never overwritten, so a hand-picked logo stays. Check new ones by eye: the source is sometimes wrong.
Hand-picked so far (Wikimedia Commons): 2317.TW Foxconn wordmark, 9602.T the Toho mark (the source had the wrong Toho)."""
import os, re, sys, urllib.request, io
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.join(HERE, "..")
DATA = os.path.join(EZ, "ez-data.js"); OUT = os.path.join(EZ, "media", "logos")
ALIAS = {"TSMC": "TSM", "8267.T": "AONNF"}
src = open(DATA).read()
tickers = set(re.findall(r'^\s*\["\d+","([^"]+)"', src, re.M))
tickers |= set(t for t in re.findall(r'ticker:"([^"]+)"', src))
os.makedirs(OUT, exist_ok=True)
entries = {}
for t in sorted(tickers):
    t = t.upper(); fn = re.sub(r"[^A-Z0-9.]", "", t) + ".png"; path = os.path.join(OUT, fn)
    if not os.path.exists(path):
        try:
            req = urllib.request.Request("https://financialmodelingprep.com/image-stock/%s.png" % ALIAS.get(t, t), headers={"User-Agent": "Mozilla/5.0"})
            data = urllib.request.urlopen(req, timeout=20).read()
            Image.open(io.BytesIO(data)).verify(); open(path, "wb").write(data)
        except Exception as e:
            print("no logo for", t, "(", e, ")"); continue
    im = Image.open(path).convert("RGBA"); px = [p for p in im.getdata() if p[3] > 128]
    if not px: continue
    lum = sum(0.2126*r + 0.7152*g + 0.0722*b for r, g, b, a in px) / len(px)
    cover = len(px) / (im.size[0] * im.size[1])
    entries[t] = '"%s":{f:"logos/%s"%s}' % (t, fn, ",dark:1" if lum > 200 and cover < .95 else "")
block = "var CO_LOGOS={" + ",".join(entries[k] for k in sorted(entries)) + "};"
new = re.sub(r"var CO_LOGOS=\{.*?\};", lambda m: block, src, count=1, flags=re.S)
if new == src: print("CO_LOGOS unchanged")
else: open(DATA, "w").write(new); print("WROTE CO_LOGOS:", len(entries), "logos")
