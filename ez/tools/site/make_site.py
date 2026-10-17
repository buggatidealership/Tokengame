"""Build the live site (Cloudflare Pages) into ../site from the built X2 page.

Run from ez/:  python3 tools/v22/build.py tools/v22 && python3 tools/site/make_site.py
Copies only what X2 can load: the page, ez-data.js, ez-learn.js, every media file named in
ez-data.js or the page, all ticker logos, and the caching rules (_headers).
"""
import os, re, shutil, sys
EZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(os.path.dirname(EZ), 'site')
page = open(os.path.join(EZ, 'v24-live-x2.html'), encoding='utf-8').read()
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
open(os.path.join(OUT, '_headers'), 'w').write("""/media/*
  Cache-Control: public, max-age=31536000, immutable
/ez-data.js
  Cache-Control: public, max-age=60
/
  Cache-Control: public, max-age=60
/index.html
  Cache-Control: public, max-age=60
""")
total = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(OUT) for f in fs)
big = [f for r, _, fs in os.walk(OUT) for f in fs if os.path.getsize(os.path.join(r, f)) > 25 * 2**20]
print('site/: %d media files + logos, %.1f MB total%s' % (n, total / 1e6, ('; OVER 25 MiB: ' + str(big)) if big else ''))
sys.exit(1 if big else 0)
