#!/bin/bash
# cut.sh <name> <out-name> <width> : key the flat magenta out of img/master/<name>.jpg, trim, despill, resize to <width>, save img/web/rounds7-<out>.png
set -e;mkdir -p img/web;src=img/master/$1.jpg;[ -f $src ] || src=img/$1.jpg
c=$(convert $src -crop 20x20+10+10 -resize 1x1\! -format '#%[hex:p{0,0}]' info:)
convert $src -resize $(( $3 * 2 ))x -alpha set -fuzz 26% -transparent "$c" -channel A -morphology Erode Disk:1 -blur 0x.7 +channel -trim +repage \
  -channel G -fx "a<0.98 ? max(g, min(r,b)*0.85) : g" +channel -resize ${3}x -define png:compression-level=9 img/web/rounds7-$2.png
identify -format "%f %wx%h %b\n" img/web/rounds7-$2.png
