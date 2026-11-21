import json, subprocess, sys
# five new beds for the painted wrap-up (w7p, 174 BPM grid), each a different genre; run from launchvid/hedra
MID = (" Follow these sections exactly. 0 to 6 s: the groove at about half energy, already moving. 6 to 13 s: building, a layer added every two bars. "
       "13 to 15 s: a short riser. At exactly 15.0 s: the drop, the full groove arrives with the bass. 15 to 25 s: the full groove. "
       "25 to 27 s: a short break, the drums drop out, a riser. At exactly 27.0 s: the biggest moment of the track, every layer in. "
       "27 to 33 s: the full groove. At 33.5 s: one final hit, then a one second tail. Exactly 35 seconds.")
TAIL = " A beat from 0.0 s, no silent intro, instrumental, no vocals."
P = {
 'w8-synth': "Retro synthwave, outrun, exactly 87 BPM half-time (174 BPM grid): punchy gated-reverb snare, driving analog bass in eighth notes, sparkling arpeggios, a bold heroic lead synth, neon night drive, cinematic and confident, triumphant not dark.",
 'w8-horns': "Stadium hip hop victory beat, exactly 87 BPM: hard boom bap drums, big soulful brass horn stabs and a horn melody, a deep bass line, record scratches between phrases, swagger and celebration, a champion's walk-out.",
 'w8-jungle': "Classic 1990s jungle, exactly 174 BPM: chopped amen breakbeats, rolling deep sub bass, rave piano stabs, a warm pad, energetic and joyful, old-school rave with modern punch.",
 'w8-chip': "Chiptune arcade victory theme, exactly 174 BPM: 8-bit square-wave lead melody, fast arpeggios, punchy noise-channel drums, a bouncy bass, a game's final boss defeated, bright and triumphant, polished modern production with retro sounds.",
 'w8-rock': "Energetic pop punk rock instrumental, exactly 174 BPM: driving live drums, distorted electric guitar power chords, a melodic lead guitar riff, a punchy bass guitar, stadium energy, a sports highlight montage, triumphant and fun.",
}
n = sys.argv[1]
inp = {"prompt": P[n] + TAIL + MID, "duration_ms": 35000, "force_instrumental": True}
r = subprocess.run(['python3', 'ha.py', n, 'elevenlabs-music', json.dumps(inp)], capture_output=True, text=True)
print(n, r.stdout.strip()[:200], r.stderr.strip()[-300:])
