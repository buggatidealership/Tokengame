#!/usr/bin/env python3
"""Make colour variants of the Season page (ez/v15-season.html) and check their contrast.

    python3 ez/tools/palettes.py          # check every palette, then write ez/v15-season-<name>.html
    python3 ez/tools/palettes.py --check  # check only

v15-season.html is the source. Its colours live in one block between "/* PALETTE" and "/* END PALETTE */".
Each variant is the same page with that block swapped, so layout and copy changes are made once, in v15,
then this script is rerun. Research behind the choices: ez/RESEARCH-colour.md.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
EZ = os.path.join(HERE, "..")
SRC = os.path.join(EZ, "v15-season.html")

KEYS = ["field", "field2", "ink", "ink2", "dim", "card", "yel", "red", "grn", "cob", "gold", "tbc", "up", "dn",
        "slab", "slab2", "slabA", "slabB", "slabC", "on-slab", "on-slab2", "on-slab3", "dn-hi"]

PALETTES = {
    # the original: mint pitch, sports-card yellow. Kept for reference, not written out.
    "pitch": dict(field="#e4f2ea", field2="#ecf7f0", ink="#0e1726", ink2="#46526a", dim="#7d889c", card="#ffffff",
                  yel="#ffd21f", red="#ff3b2f", grn="#00a862", cob="#1f4fff", gold="#e8a317", tbc="#d9138f",
                  up="#00a862", dn="#ff3b2f",
                  slab="#0e1726", slab2="#0b0f18", slabA="#141c2c", slabB="#0e1524", slabC="#131d33",
                  **{"on-slab": "#ffffff", "on-slab2": "#aeb8cc", "on-slab3": "#e6ebf5", "dn-hi": "#ff6b61"}),
    # 1. Paper: built for long reading. Warm grey ground (lower glare than pure white), charcoal ink (not #000),
    #    a soft apricot highlight instead of loud yellow. Up/down stay green/red; every call also carries ▲/▼.
    "paper": dict(field="#f2f0eb", field2="#f8f7f3", ink="#1f1d1a", ink2="#4a4640", dim="#6b665e", card="#fffdf9",
                  yel="#ffc48c", red="#b8352a", grn="#1d7348", cob="#2f55d4", gold="#9a6412", tbc="#a8246f",
                  up="#1d7348", dn="#b8352a",
                  slab="#2a2723", slab2="#1f1d1a", slabA="#34312c", slabB="#2a2723", slabC="#302d28",
                  **{"on-slab": "#fbfaf7", "on-slab2": "#c9c3b8", "on-slab3": "#eeeae3", "dn-hi": "#ff5a4f"}),
    # 2. Colour-safe: Okabe-Ito colours (made for colour-blind readers). Up = blue, down = vermilion, so the
    #    1 in 12 men with red-green colour blindness can tell calls apart without the arrows. Sky-blue highlight.
    "colorsafe": dict(field="#e9f1fa", field2="#f3f7fc", ink="#0f1b2d", ink2="#3e4c63", dim="#5f6c82", card="#ffffff",
                      yel="#a9d4ff", red="#bb4a00", grn="#006c9e", cob="#0060a8", gold="#a56a00", tbc="#a84d82",
                      up="#006c9e", dn="#bb4a00",
                      slab="#0f2742", slab2="#0b1c30", slabA="#16335a", slabB="#0f2742", slabC="#132e50",
                      **{"on-slab": "#f3f7fc", "on-slab2": "#b3c4da", "on-slab3": "#e3ebf5", "dn-hi": "#ff5a4f"}),
    # 3. Daylight: maximum contrast for phones outdoors. Pure white ground, near-black ink, a lime highlight
    #    (the brightest colour that still carries black text), deeper accents so small text clears AAA.
    "daylight": dict(field="#ffffff", field2="#f4f4f4", ink="#0a0a0a", ink2="#30343b", dim="#50565f", card="#ffffff",
                     yel="#c8f53a", red="#b3261e", grn="#0b6b3a", cob="#1c3fd1", gold="#7a5200", tbc="#9c1c6b",
                     up="#0b6b3a", dn="#b3261e",
                     slab="#0a0a0a", slab2="#000000", slabA="#161616", slabB="#0a0a0a", slabC="#121212",
                     **{"on-slab": "#ffffff", "on-slab2": "#c4c7cc", "on-slab3": "#ececec", "dn-hi": "#ff4136"}),
    # 4. Warm ($EZ): the brand's own colours on a low-blue, "night shift" ground. Parchment background and warm
    #    near-black ink (less blue light, softer than white), gold from the $ as the highlight, green from the E for up,
    #    red from the Z for down. Every text pair still clears the contrast checks below.
    "warm": dict(field="#f3ead8", field2="#f8f1e3", ink="#2a1f14", ink2="#55483a", dim="#6c5f4f", card="#fcf6ea",
                 yel="#ffc72c", red="#b3322a", grn="#1d7646", cob="#2f53a3", gold="#7f5500", tbc="#a1236a",
                 up="#1d7646", dn="#b3322a",
                 slab="#2a1f14", slab2="#20180f", slabA="#35291c", slabB="#2a1f14", slabC="#302418",
                 **{"on-slab": "#fcf6ea", "on-slab2": "#cdbfa8", "on-slab3": "#efe5d3", "dn-hi": "#ff5a4f"}),
    # 5. Binder: the colours of Variant 1 ("The Binder", v1-binder.html). Kraft-paper ground, warm ink, the pale
    #    foil yellow as the highlight, and the binder's dark green for the dark panels. Its up/down greens and reds
    #    are darkened a step so they pass as text on the paper.
    "binder": dict(field="#f3ead8", field2="#e8dcc2", ink="#231d16", ink2="#5a4f42", dim="#6b6152", card="#fffaf0",
                   yel="#ffe38a", red="#c0271f", grn="#137a37", cob="#2f53a3", gold="#8a5a00", tbc="#a1236a",
                   up="#137a37", dn="#c0271f",
                   slab="#2f3b33", slab2="#262f29", slabA="#3a473e", slabB="#2f3b33", slabC="#35423a",
                   **{"on-slab": "#fffaf0", "on-slab2": "#d6cfbd", "on-slab3": "#f3ead8", "dn-hi": "#ff786e"}),
}
WRITE = ["paper", "colorsafe", "daylight", "warm", "binder"]

# dn-hi: the $EZ red as TEXT on the dark rows (Up next calls). The brand red where it reads, a lighter tint where it doesn't.
# text/background pairs the page actually uses, with the level they must clear
# (4.5 = WCAG AA for normal text, 3.0 = AA for large text and graphics)
PAIRS = [("ink", "field", 7), ("ink", "card", 7), ("ink2", "field", 4.5), ("ink2", "card", 4.5), ("dim", "card", 4.5),
         ("dim", "field", 3), ("up", "card", 4.5), ("dn", "card", 4.5), ("up", "field", 3), ("dn", "field", 3),
         ("cob", "card", 4.5), ("tbc", "card", 4.5), ("ink", "yel", 7), ("on-slab", "slab", 7), ("on-slab2", "slab", 4.5),
         ("on-slab3", "slab", 7), ("on-slab", "red", 4.5), ("on-slab", "dn", 4.5), ("yel", "slab", 4.5), ("dn-hi", "slab", 4.5)]

def lum(h):
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)

def check(name, P):
    bad = []
    for fg, bg, need in PAIRS:
        r = ratio(P[fg], P[bg])
        if r < need:
            bad.append("%s on %s %.2f (needs %.1f)" % (fg, bg, r, need))
    # up vs down must differ in lightness too (what a red-green colour-blind reader relies on)
    d = abs(lum(P["up"]) - lum(P["dn"]))
    print("%-10s %s   up/down lightness gap %.3f" % (name, "OK" if not bad else "FAIL: " + "; ".join(bad), d))
    return not bad

def block(P):
    v = lambda k: P[k]
    return ("  /* PALETTE (tools/palettes.py swaps this block) */\n"
            "  --field:%s;--field2:%s;--ink:%s;--ink2:%s;--dim:%s;--card:%s;\n"
            "  --yel:%s;--red:%s;--grn:%s;--cob:%s;--gold:%s;--tbc:%s;\n"
            "  --up:%s;--dn:%s;\n"
            "  --slab:%s;--slab2:%s;--slabA:%s;--slabB:%s;--slabC:%s;\n"
            "  --on-slab:%s;--on-slab2:%s;--on-slab3:%s;--dn-hi:%s;\n"
            "  /* END PALETTE */") % tuple(v(k) for k in KEYS)

def main():
    ok = all([check(n, P) for n, P in PALETTES.items()])
    if "--check" in sys.argv:
        sys.exit(0 if ok else 1)
    src = open(SRC, encoding="utf8").read()
    if not re.search(r"  /\* PALETTE .*?/\* END PALETTE \*/", src, re.S):
        sys.exit("no PALETTE block in v15-season.html")
    for n in WRITE:
        out = re.sub(r"  /\* PALETTE .*?/\* END PALETTE \*/", lambda m: block(PALETTES[n]), src, count=1, flags=re.S)
        out = re.sub(r"<title>([^<]*)</title>", lambda m: "<title>%s %s</title>" % (m.group(1), n.capitalize().replace("Colorsafe", "Colour-safe")), out, count=1)
        out = out.replace("<!--", "<!-- GENERATED by tools/palettes.py from v15-season.html (palette: %s). Edit v15, then rerun. -->\n<!--" % n, 1)
        open(os.path.join(EZ, "v15-season-%s.html" % n), "w", encoding="utf8").write(out)
        print("wrote v15-season-%s.html" % n)
    sys.exit(0 if ok else 2)

if __name__ == "__main__":
    main()
