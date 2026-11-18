#!/bin/bash
# bash mk.sh <src.mp4> <name> <poster second> : a review copy under 15 MB (720x900) and its poster
S=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/review/v
nice ffmpeg -loglevel error -y -i "$1" -vf scale=720:900 -c:v libx264 -preset medium -crf 25 -maxrate 1700k -bufsize 3400k -profile:v high -pix_fmt yuv420p -c:a aac -b:a 112k -movflags +faststart "$S/$2.mp4"
ffmpeg -loglevel error -y -ss "$3" -i "$1" -frames:v 1 -vf scale=540:675 -q:v 5 "$S/$2.jpg"
ls -la "$S/$2.mp4" "$S/$2.jpg" | awk '{print $5}' | tr '\n' ' '; echo "$2"
