"""Build the live site (Cloudflare Pages, earningszn.xyz) into ../site from the built X2+ page.

Run from ez/:  python3 tools/v22/build.py tools/v22 && python3 tools/site/make_site.py
Copies only what the page can load: the page, ez-data.js, ez-learn.js, every media file named in
ez-data.js or the page, the host's poses it names (media/commissioner/web), all ticker logos, and the
caching and security rules (_headers). SITE_OUT=<dir> builds elsewhere (a test build that leaves site/ alone).
The live page was X2 (v24) until 2026-10-20; the owner chose X2+ (v46) for earningszn.xyz.
"""
import os, re, shutil, sys
EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.environ.get('SITE_OUT') or os.path.join(os.path.dirname(EZ), 'site')
URL = 'https://earningszn.xyz/'
# SITE_PAGE=<file> builds another page (2026-10-22: X3+ on its own preview branch); the live site is always X2+
page = open(os.path.join(EZ, os.environ.get('SITE_PAGE') or 'v46-live-x2plus.html'), encoding='utf-8').read()
data = open(os.path.join(EZ, 'ez-data.js'), encoding='utf-8').read()
if os.path.isdir(OUT):
    shutil.rmtree(OUT)
os.makedirs(os.path.join(OUT, 'media'))
# the page: the built X2 file is a fragment for the artifact viewer; give it a real document shell
head = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
if re.search(r'<html[\s>]', page[:2000], re.I):
    doc = page
else:
    doc = head + '</head>\n<body>\n' + page + '\n</body>\n</html>\n'
doc = re.sub(r'<title>[^<]*</title>', '<title>$EZ \u00b7 Earnings Zeason</title>', doc, count=1)
# what a public page needs and an artifact did not: the canonical address and share tags (a share image comes next)
meta = ('<link rel="canonical" href="' + URL + '">\n<meta property="og:type" content="website">\n<meta property="og:url" content="' + URL + '">\n'
        '<meta property="og:title" content="$EZ \u00b7 Earnings Zeason">\n<meta name="twitter:card" content="summary_large_image">\n')
doc = doc.replace('</head>', meta + '</head>', 1)
# The standings as printed tickets and the proof on the ticket kept production on today's board and stats switch (2026-10-22/23,
# window.__x2pClassicBoard / __x2pClassicProof, which x2plus.js still honours). Both live since 2026-10-23 (owner: "Everything"), so
# production is X2+ as it is; SITE_CLASSIC=1 builds the old board and switch again if they are ever needed.
if os.environ.get('SITE_CLASSIC') == '1':
    doc = doc.replace('</head>', '<script>window.__x2pClassicBoard=1;window.__x2pClassicProof=1</script>\n</head>', 1)
# Cloudflare's zone setting keeps .js files in browsers for 4 hours whatever _headers says (owner, 2026-10-20: a sync did not
# show up). The page itself refreshes within a minute, so it asks for each script by a version stamped from its content.
import hashlib
for f in ('ez-data.js', 'ez-learn.js'):
    v = hashlib.sha256(open(os.path.join(EZ, f), 'rb').read()).hexdigest()[:10]
    doc, n = re.subn(r'src="' + re.escape(f) + '"', 'src="' + f + '?v=' + v + '"', doc)
    assert n, f + ' is not loaded by the page'
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(doc)
for f in ('ez-data.js', 'ez-learn.js'):
    shutil.copy2(os.path.join(EZ, f), OUT)
media = os.path.join(EZ, 'media')
names = set(re.findall(r'[\w.-]+', data + page))
n = 0
for f in os.listdir(media):
    p = os.path.join(media, f)
    if os.path.isfile(p):
        stem = re.sub(r'\.(mp4|webm|jpg|jpeg|png|webp)$', '', f)
        if f in names or stem in names:
            shutil.copy2(p, os.path.join(OUT, 'media', f)); n += 1
shutil.copytree(os.path.join(media, 'logos'), os.path.join(OUT, 'media', 'logos'))
# the host's poses live in a subfolder the loop above does not look into
cw = os.path.join(media, 'commissioner', 'web'); os.makedirs(os.path.join(OUT, 'media', 'commissioner', 'web'))
for f in sorted(os.listdir(cw)):
    if f in page:
        shutil.copy2(os.path.join(cw, f), os.path.join(OUT, 'media', 'commissioner', 'web', f)); n += 1
open(os.path.join(OUT, '_headers'), 'w').write("""/media/*
  Cache-Control: public, max-age=31536000, immutable
/ez-data.js
  Cache-Control: public, max-age=60
/
  Cache-Control: public, max-age=60
/index.html
  Cache-Control: public, max-age=60
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN
""")
open(os.path.join(OUT, 'robots.txt'), 'w').write("User-agent: *\nAllow: /\n")
total = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(OUT) for f in fs)
big = [f for r, _, fs in os.walk(OUT) for f in fs if os.path.getsize(os.path.join(r, f)) > 25 * 2**20]
print('site/: %d media files + logos, %.1f MB total%s' % (n, total / 1e6, ('; OVER 25 MiB: ' + str(big)) if big else ''))
sys.exit(1 if big else 0)
