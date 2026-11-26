#!/bin/bash
# EZ Green Room (v52-green-room.html, a mockup): copy the page, ez-data.js and only the media it reads into $1, ready for wrangler.
# usage: bash tools/concepts/worlds/greenroom/deploy.sh <outdir>   (run from ez/)
set -e;O=${1:?outdir};rm -rf "${O:?}";mkdir -p "$O/media/logos"
cp v52-green-room.html "$O/index.html";cp ez-data.js "$O/"
cp media/gr7-title-34.jpg media/gr7-title-169.jpg media/gr7-grit.jpg media/gr7-plate.webp media/gr7-plate-gold.webp media/gr7-title.woff2 media/gr7-label.woff2 media/gr7-body.woff2 \
   media/gr7-screen.jpg media/gr7-cliff.jpg media/gr7-end-34.jpg media/gr7-end-169.jpg media/gr7-burn-bag.jpg media/gr7-burn-fire.jpg media/gr7-logo.svg "$O/media/"
for m in grok claude gpt kimi; do cp media/gr7-cast-$m.jpg media/gr7-cast-$m.mp4 media/gr7-cast-$m.webm media/gr7-face-$m.jpg "$O/media/"; done
cp -r media/logos/. "$O/media/logos/"
# the films of the last bell (the page shows the newest graded day)
node -e '
global.window=global;eval(require("fs").readFileSync("ez-data.js","utf8"));
var d=s=>{var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?Date.UTC(2000+ +m[3],m[1]-1,+m[2]):0},last=Math.max.apply(null,ROUNDS.map(r=>d(r.resolves)));
ROUNDS.filter(r=>d(r.resolves)>=last-864e5).forEach(r=>{var f=FILMS[r.n];if(f)console.log(f.f+".mp4\n"+f.p+".jpg")})' | while read f; do cp "media/$f" "$O/media/"; done
du -sh "$O"
