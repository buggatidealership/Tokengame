"""Build the live site (Cloudflare Pages, earningszn.xyz) into ../site from the built X2+ page.

Run from ez/:  python3 tools/v22/build.py tools/v22 && python3 tools/site/make_site.py
Copies only what the page can load: the page, ez-data.js, ez-learn.js, every media file named in
ez-data.js or the page, the host's poses it names (media/commissioner/web), all ticker logos, and the
caching and security rules (_headers). SITE_OUT=<dir> builds elsewhere (a test build that leaves site/ alone).
The live page was X2 (v24) until 2026-10-20; the owner chose X2+ (v46) for earningszn.xyz.
"""
import os, sys, re, shutil
EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.environ.get('SITE_OUT') or os.path.join(os.path.dirname(EZ), 'site')
URL = 'https://earningszn.xyz/'
# SITE_PAGE=<file> builds another page. Since 2026-10-30 (owner: "push this to production... so we have the comic version
# live") the live site was X3+, the comic. Since 2026-11-02 (owner: "feel free to ship to production. So at least the overview page v1 is done")
# the live site was X2+ again (the chip world). Since 2026-11-03, night (owner: "You can push the new page live") the live site is
# X6+ (v50, the Saturday-morning show); SITE_PAGE=v46-live-x2plus.html builds X2+ (the preview branch), v47 X3+ (x3plus).
# SITE_PAGE may be an absolute path (a copy of the built page, so a builder's later build.py run cannot change it mid-build).
page = open(os.path.join(EZ, os.environ.get('SITE_PAGE') or 'v50-live-x6plus.html'), encoding='utf-8').read()
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
doc = re.sub(r'<title>[^<]*</title>', '<title>Earnings Zeason \u00b7 4 AIs trade earnings</title>', doc, count=1)
# what a public page needs and an artifact did not: the canonical address and share tags (a share image comes next)
meta = ('<link rel="canonical" href="' + URL + '">\n<meta property="og:type" content="website">\n<meta property="og:url" content="' + URL + '">\n'
        '<meta property="og:title" content="$EZ \u00b7 Earnings Zeason">\n<meta name="twitter:card" content="summary_large_image">\n')
# (overnight, 2026-10-27) the share card and the icons: a link to the site on X showed a bare text card and browsers a blank tab.
# The card is media/share-d.png (since 2026-10-28: the live headline "4 AIs trade earnings to run our buybacks." over the host; options a to d from ez/tools/concepts/share/share.js);
# a new card needs a new file name (media is cached for a year, and X keeps a card for days). The icons are the EZ. logo.
# Since 2026-11-03 (X6+ live) the card is media/share-x6a.jpg: X6+'s own title card ("EZ. presents Four AIs Trade Earnings" over the
# painted town), shot at 1200x630 with the header, the crawl and the week pills hidden (a week number on a card X keeps for days goes stale).
SHARE = 'share-x6a.jpg'
DESC = "We track four AIs on every earnings trade, so you don't have to. $100K on every trade, graded at the close."
meta2 = ('<meta name="description" content="' + DESC + '">\n<meta property="og:description" content="' + DESC + '">\n'
         '<meta property="og:image" content="' + URL + 'media/' + SHARE + '">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
         '<meta property="og:image:alt" content="EZ. presents Four AIs Trade Earnings, lettered over a painted town with a stock exchange on the hill.">\n'
         '<meta name="twitter:title" content="$EZ \u00b7 Earnings Zeason">\n<meta name="twitter:description" content="' + DESC + '">\n<meta name="twitter:image" content="' + URL + 'media/' + SHARE + '">\n'
         '<meta property="og:site_name" content="Earnings Zeason">\n<meta name="twitter:site" content="@earningszn">\n'
         '<link rel="icon" href="media/icon.svg" type="image/svg+xml">\n<link rel="icon" href="media/icon-32.png" sizes="32x32" type="image/png">\n<link rel="apple-touch-icon" href="media/icon-180.png">\n')
doc = re.sub(r'<meta name="description"[^>]*>\n?', '', doc)  # the page's own older line (it still said "Zeason one")
# (launch day, QA) the title and the share tags go first in <head>: after about 1.26 MB of inline styles they were past what some link
# preview fetchers read (Signal reads 1 MB; others are said to read less), so a link to the home page could show no picture
_tm=re.search(r'<title>[^<]*</title>\n?', doc)
_tt=_tm.group(0) if _tm else ''
if _tm: doc = doc.replace(_tt, '', 1)
_cs=re.search(r'<meta charset=[^>]*>\n?', doc[:5000], re.I)
_at=(_cs.end() if _cs else doc.index('<head>')+len('<head>'))
doc = doc[:_at] + ('\n' if not doc[:_at].endswith('\n') else '') + _tt.rstrip('\n') + '\n' + meta + meta2 + doc[_at:]
# The standings as printed tickets and the proof on the ticket kept production on today's board and stats switch (2026-10-22/23,
# window.__x2pClassicBoard / __x2pClassicProof, which x2plus.js still honours). Both live since 2026-10-23 (owner: "Everything"), so
# production is X2+ as it is; SITE_CLASSIC=1 builds the old board and switch again if they are ever needed.
# The fight-night Upcoming, rounds opening as the record's slab and the logos printed into the paper went live on 2026-10-23
# (owner: "push pls"), so production is X2+ as it is again. SITE_HOLD=1 sets window.__x2pHold, which x2plus.js still honours,
# to keep the next held changes off a production build.
# (2026-10-26) the proof's lighter ink (the PROOFLI block) went live with the owner's "push everything to production"; no hold left
if os.environ.get('SITE_HOLD') == '1':
    doc = doc.replace('</head>', '<script>window.__x2pHold=1</script>\n</head>', 1)
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
for f in (SHARE, 'icon.svg', 'icon-32.png', 'icon-180.png', 'icon-512.png'):
    shutil.copy2(os.path.join(media, f), os.path.join(OUT, 'media', f)); n += 1
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
  Strict-Transport-Security: max-age=31536000
""")
open(os.path.join(OUT, 'robots.txt'), 'w').write("User-agent: *\nAllow: /\n")
# (overnight 2026-10-27, launch audit) a missing path answered with the page itself and a 200, which Cloudflare then cached under
# /media for a year (R43, 2026-10-24); with a 404.html Pages answers a missing file with this page and a real 404
# (launch-day QA) /favicon.ico answered 404 (browsers and some apps ask for it whatever the page links): the EZ. logo, 16/32/48 px
try:
    from PIL import Image as _Img
    _Img.open(os.path.join(EZ, 'media', 'icon-180.png')).convert('RGBA').save(os.path.join(OUT, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
except Exception as _e:
    print('favicon.ico not written:', _e)
open(os.path.join(OUT, '404.html'), 'w', encoding='utf-8').write('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Not found \u00b7 Earnings Zeason</title><meta name="robots" content="noindex"><link rel="icon" href="/media/icon.svg" type="image/svg+xml"><style>html{color-scheme:dark}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0a14;color:#f8f0d9;font:600 18px/1.4 system-ui,sans-serif;text-align:center;padding:16px}a{color:#fdbc2a}img{width:96px;height:96px;display:block;margin:0 auto 18px}</style></head><body><main><img src="/media/icon.svg" alt="EZ."><p>Nothing here.</p><p><a href="/">Back to Earnings Zeason</a></p></main></body></html>\n')
# every round its own link (owner, 2026-10-28): /r/<n> pages whose share picture is that round's own slab (tools/site/round_cards.js;
# pictures cached in media/share by a hash of what they show, so a build draws only new or changed rounds). SITE_NOCARDS=1 skips it.
if not os.environ.get('SITE_NOCARDS'):
    import subprocess
    # one retry (a busy local server can time out a shot), then stop: a production deploy without /r/ breaks every shared
    # round link (2026-10-30, R61: the first try timed out and the build went on without the pages)
    cmd = ['node', os.path.join(EZ, 'tools', 'site', 'round_cards.js'), OUT]
    if subprocess.run(cmd, cwd=EZ).returncode and subprocess.run(cmd, cwd=EZ).returncode:
        sys.exit('round_cards failed twice: the /r/ pages are missing, do not deploy this build')
total = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(OUT) for f in fs)
big = [f for r, _, fs in os.walk(OUT) for f in fs if os.path.getsize(os.path.join(r, f)) > 25 * 2**20]
print('site/: %d media files + logos, %.1f MB total%s' % (n, total / 1e6, ('; OVER 25 MiB: ' + str(big)) if big else ''))
sys.exit(1 if big else 0)
