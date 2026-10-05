"""Fetch a company logo for every ticker in ez-data.js and write the CO_LOGOS block.

    pip install pillow
    python3 ez/tools/fetch_logos.py           # download missing logos to ez/media/logos/, then rewrite CO_LOGOS

Source: financialmodelingprep.com/image-stock/<TICKER>.png (public, no key). ALIAS maps a sheet ticker to the
one the source knows. A logo that is light on transparent (made for dark screens) is marked dark:1, so the page
puts it on a dark badge. c is the brand colour (most common strong colour), used for themed tiles. Remove a file and re-run to refresh it. Tickers with no logo keep the ticker badge.

Existing files are never overwritten, so a hand-picked logo stays. Check new ones by eye: the source is sometimes wrong.
Hand-picked so far (Wikimedia Commons): 2317.TW Foxconn wordmark, 9602.T the Toho mark (the source had the wrong Toho), DHL wordmark on its yellow.
KIOXIA, NINTENDO, SOFTBANK reuse 285A.T, 7974.T, 9984.T; SHEL.L and SIE.DE use the US listings (SHEL, SIEGY)."""
import os, re, sys, urllib.request, io
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); EZ = os.path.join(HERE, "..")
DATA = os.path.join(EZ, "ez-data.js"); OUT = os.path.join(EZ, "media", "logos")
ALIAS = {"TSMC": "TSM", "8267.T": "AONNF", "BMW": "BMW.DE", "DHL": "DHL.DE"}
# brand colours the logo file gets wrong (a white logo on black, or a grey one): set by hand
BRAND = {"005930.KS": "#1428a0", "GS": "#7399c6", "MS": "#002b51", "UNH": "#002677", "STX": "#4f9a3a", "SIE.DE": "#009999"}
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
    # the brand colour: the most common clearly coloured pixel (else the darkest common one), for themed tiles
    import colorsys
    buckets = {}
    for r, g, b, a_ in px:
        h, l, sat = colorsys.rgb_to_hls(r/255, g/255, b/255)
        if sat > .35 and .15 < l < .85:
            k = (r//24, g//24, b//24); buckets[k] = buckets.get(k, 0) + 1
    if buckets and max(buckets.values()) > len(px) * .08:
        k = max(buckets, key=buckets.get); col = "#%02x%02x%02x" % tuple(min(255, c*24+12) for c in k)
    else:
        col = "#12131a"
    col = BRAND.get(t, col)
    entries[t] = '"%s":{f:"logos/%s",c:"%s"%s}' % (t, fn, col, ",dark:1" if lum > 200 and cover < .95 else "")
block = "var CO_LOGOS={" + ",".join(entries[k] for k in sorted(entries)) + "};"
new = re.sub(r"var CO_LOGOS=\{.*?\};", lambda m: block, src, count=1, flags=re.S)
if new == src: print("CO_LOGOS unchanged")
else: open(DATA, "w").write(new); print("WROTE CO_LOGOS:", len(entries), "logos")
