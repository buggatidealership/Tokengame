#!/bin/bash
# the cast's 5 s loops and the burning bag, kling-25-turbo from the 2K stills (start frame); made seamless after (loopify)
cd "$(dirname "$0")"
L=' The camera is locked off and does not move. Subtle, slow motion only, the scene otherwise still.'
python3 vid.py gr7-cast-grok-v kling-25-turbo "{\"prompt\":\"He breathes slowly, wiggles his toes in the water of the sink and gives a slow cocky nod.$L\",\"aspect_ratio\":\"9:16\",\"duration_ms\":5000,\"resolution\":\"1080p\"}" img/gr7-cast-grok-st.jpg &
python3 vid.py gr7-cast-claude-v kling-25-turbo "{\"prompt\":\"He raises his eyebrows and gives the sign a small shake toward the camera, his glasses catching the light.$L\",\"aspect_ratio\":\"9:16\",\"duration_ms\":5000,\"resolution\":\"1080p\"}" img/gr7-cast-claude-st.jpg &
python3 vid.py gr7-cast-gpt-v kling-25-turbo "{\"prompt\":\"He flips the gold coin with his thumb, catches it and keeps a smug half-smile.$L\",\"aspect_ratio\":\"9:16\",\"duration_ms\":5000,\"resolution\":\"1080p\"}" img/gr7-cast-gpt-st.jpg &
python3 vid.py gr7-cast-kimi-v kling-25-turbo "{\"prompt\":\"He glances down at the falling chart on the scroll, then back at the camera with a small smirk; the red line glows.$L\",\"aspect_ratio\":\"9:16\",\"duration_ms\":5000,\"resolution\":\"1080p\"}" img/gr7-cast-kimi-st.jpg &
python3 vid.py gr7-burn-fire-v kling-25-turbo "{\"prompt\":\"The flames flicker and sway, sparks rise and the coins glow in the fire.$L\",\"aspect_ratio\":\"1:1\",\"duration_ms\":5000,\"resolution\":\"1080p\"}" img/gr7-burn-fire.jpg &
wait
