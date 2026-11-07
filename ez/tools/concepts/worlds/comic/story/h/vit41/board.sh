#!/bin/sh
# board.sh <shots dir> <width> <out.png> [scale]   today's live section beside the belt and the deck, titled
D=$1; W=$2; O=$3; S=${4:-100}
T=$(mktemp -d)
i=0
for v in now belt deck; do
  case $v in now) t="Today (live): vitrine + drawers";; belt) t="Belt (default, __x2pSwipe unset)";; deck) t="Deck (__x2pSwipe='deck')";; esac
  convert "$D/sec-$W-$v.png" -resize $S% -background '#15131a' -gravity north -splice 0x56 -fill '#f8f0d9' -font DejaVu-Sans-Bold -pointsize 24 -annotate +0+14 "$t" "$T/$i.png"
  i=$((i+1))
done
convert "$T/0.png" "$T/1.png" "$T/2.png" -background '#15131a' -gravity north +smush 24 -bordercolor '#15131a' -border 20 \
  -gravity north -splice 0x60 -fill '#ffd21f' -pointsize 30 -annotate +0+18 "Every round so far, H41 at ${W}px: the caption, and the swiping element under the Mag 7 (drawers off)" "$O"
rm -rf "$T"
