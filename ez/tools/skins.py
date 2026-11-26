#!/usr/bin/env python3
"""Make "old newspaper" skins of the Season page (ez/v15-season.html) and check their contrast.

    python3 ez/tools/skins.py          # check every skin, then write ez/v15-season-news-<name>.html
    python3 ez/tools/skins.py --check  # check only

Same idea as tools/palettes.py: v15-season.html is the source, each skin is that page with
  1. the PALETTE block swapped (palettes.block()),
  2. its Google Fonts added (a second <link>),
  3. one <style id="skin"> block of CSS overrides after the page's own styles,
  4. one tiny <script id="skin-js"> that only sets --issue (the dateline's issue number = graded rounds + 1).
Layout, copy and data stay identical. Edit v15, then rerun this script; never edit the generated files.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.dont_write_bytecode = True
sys.path.insert(0, HERE)
import palettes  # noqa: E402  (block(), check(), ratio(), KEYS, PAIRS)

EZ = os.path.join(HERE, "..")
SRC = os.path.join(EZ, "v15-season.html")

def gf(*families):
    return '<link href="https://fonts.googleapis.com/css2?%s&display=swap" rel="stylesheet">' % "&".join("family=" + f for f in families)

# ---------- shared newspaper base: flat paper, ink rules, no offset shadows ----------
BASE = """
/* SKIN (tools/skins.py): an old-newspaper look over the same page. CSS only, plus the --issue number. */
body{background-image:none}
/* flat print: hairline ink frames instead of offset drop shadows */
.btn,.btn:hover,.btn:active,.btn.lt,.pc,.pc.lead,.up-p,.bf-back,.face,.lq,.mach,.sc,.mx,.mcb,.mx-out,.verdict,.gbox,.mx-bet b,
.bk-r,.bk-out,.cwin,.flipb,.up-s,.lsw,.chip,.arw,.un-more,.howb,.due,.sh .no,.crown,.stamp,.mx-lose{box-shadow:0 0 0 1px var(--ink)}
.btn:hover,.btn:active,.mcb:active{transform:none}
.mcb[aria-pressed=true],.chip[aria-current=true]{box-shadow:0 0 0 1px var(--ink),0 0 0 3px var(--field),0 0 0 4px var(--ink)}
.bk-r.win{box-shadow:0 0 0 2.5px var(--ink)}
.top{background:var(--field);backdrop-filter:none;-webkit-backdrop-filter:none;border-bottom:3px double var(--ink)}
/* the dateline under the masthead (--issue comes from the data: graded rounds + 1) */
.hero::before{content:"Vol. I \\00b7  No. " var(--issue,"1") " \\00b7  Season one \\00b7  Price: one prediction";display:block;margin:0 0 22px;padding:6px 0 5px;
  border-top:1px solid var(--ink);border-bottom:3px double var(--ink);text-align:center;font:700 11px/1.3 var(--fm);letter-spacing:.14em;text-transform:uppercase;color:var(--ink)}
/* the score bar as a printed ticker strip: newsprint, hairline rules, figures in the skin's mono */
.tick{background:var(--card);color:var(--ink);border-bottom:1px solid var(--ink);box-shadow:0 1px 0 var(--card),0 2px 0 var(--ink)}
.tick .tl{background:var(--ink);color:var(--card);font-family:var(--fm)}
.tick .tc>span{color:var(--ink);font-family:var(--fm);font-weight:700;letter-spacing:.02em;border-right:1px solid var(--ink)}
.tick .tc b{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
.tick .tc .up{color:var(--up)}.tick .tc .dn{color:var(--dn)}
.tick .tp{background:var(--card);color:var(--ink);border-left:1px solid var(--ink)}
.tick .tp:hover{background:var(--yel);color:var(--ink)}
.tick .tw:focus-visible{outline-color:var(--ink)}
/* column rules between sections */
.sec{border-top:3px double var(--ink);margin-top:72px;padding-top:40px}
.sh{padding-bottom:16px;border-bottom:1px solid var(--ink)}
footer{border-top:3px double var(--ink)}
/* films: a light print tone, still clearly visible */
.art img,.art video{filter:grayscale(.35) sepia(.15)}
/* phones: the masthead on one line next to the live chip */
@media(max-width:640px){.brand b{white-space:nowrap;font-size:17px!important}.live{flex:0 1 auto;min-width:0;padding:8px 9px;font-size:10px;letter-spacing:0}.brand b small{display:none}.sec{margin-top:56px;padding-top:30px}.hero::before{font-size:9.5px;letter-spacing:.08em;margin-bottom:16px}}
"""

DISPLAY = (".st-h h2,.bf-back h2,h1,h2,.pc h3,.ctop,.bk-h h4,.up-p .nm,.up-s .nm,.cwin small,.cwin .wn,.mx-of,"
           ".motto,.gbox h3,.lq h3,.bk-out small,.cc .n,.due b,.un-seal b,.art .soon,.stamp,.pcalls .nm,.lsw button")

SKINS = {
    # 1. Broadsheet: a serious financial daily, 1920s to 50s. Blackletter masthead, serif heads and body, column rules.
    "broadsheet": dict(
        title="Broadsheet",
        line="A serious financial daily: blackletter masthead, Playfair headlines over Caslon body, double column rules, square hairline frames on newsprint.",
        fonts=gf("UnifrakturMaguntia", "Playfair+Display:ital,wght@0,400..900;1,400..900", "Libre+Caslon+Text:ital,wght@0,400;0,700;1,400"),
        palette=dict(field="#f4f0e6", field2="#ebe5d6", ink="#1a1714", ink2="#3f3a33", dim="#5f584d", card="#faf7ef",
                     yel="#e4dcc6", red="#8e2a1f", grn="#2e5e3a", cob="#23407a", gold="#6e5418", tbc="#7d2a55",
                     up="#2e5e3a", dn="#8e2a1f",
                     slab="#1a1714", slab2="#110f0d", slabA="#26221e", slabB="#1a1714", slabC="#211d19",
                     **{"on-slab": "#faf7ef", "on-slab2": "#c9c1b0", "on-slab3": "#ece6d8", "dn-hi": "#e88a7c"}),
        ez=dict(green="#a7c7a4", red="#dda194"),
        css=BASE + """
:root{--fd:'Playfair Display',Georgia,serif;--fb:'Libre Caslon Text',Georgia,serif}
body{font-size:15.5px}
/* square corners everywhere except the round dots and the model logos */
*:not(.lg):not(i){border-radius:0!important}
""" + DISPLAY + """{text-transform:none;font-weight:700;letter-spacing:0}
h1{font-weight:800;letter-spacing:-.01em;line-height:1.02}
h1 .hl{background:none;font-style:italic;font-weight:700}
h2{font-weight:800;line-height:1.05}
.brand .mark{border-radius:0}
.brand b{font:400 26px/1 'UnifrakturMaguntia',serif;text-transform:none;letter-spacing:0;word-spacing:0}
.brand b small{font:700 9.5px/1.3 var(--fm);letter-spacing:.14em;text-transform:uppercase;margin-top:3px}
.eb{background:none;color:var(--ink);padding:0;font-style:normal;border-bottom:1px solid var(--ink)}
.sh .no{background:none;box-shadow:none;font:700 15px/1 var(--fd);padding:0;font-style:italic}
.pc .rk,.pc-w b,.mx-big,.mx-bet b,.due b,.bk-r .rk{font-weight:700;font-variant-numeric:lining-nums tabular-nums}
/* the leader: no foil here, a printed LEADER ribbon and a double rule */
.pc.r1{background:var(--card);animation:none;box-shadow:0 0 0 1px var(--ink),0 0 0 3px var(--card),0 0 0 4px var(--ink)}
.pc.r1::after{content:"Leader";position:absolute;right:-1px;top:-1px;padding:3px 7px 2px;background:var(--ink);color:var(--card);font:700 9px/1 var(--fm);letter-spacing:.14em;text-transform:uppercase}
.pc .crown{background:var(--card)}
.tick .tl{font:italic 700 13px/1 var(--fd);letter-spacing:0;text-transform:none}
.cwin small,.cwin .wn{font-style:italic}
.mx-big{letter-spacing:-.01em}
/* the machine: Playfair is wider than Anton, so the label inside the pot steps down */
.m-pot-t{font-size:25px;font-weight:700}
""",
    ),
    # 2. Extra: a 1929 crash-era tabloid. Huge condensed heads, EXTRA! banners, yellowed halftone paper, one red spot colour.
    "extra": dict(
        title="Extra",
        line="A 1929 crash tabloid: huge condensed heads, red EXTRA! banners, yellowed halftone paper, rotated rubber-stamp tags.",
        fonts=gf("Libre+Caslon+Text:ital,wght@0,400;0,700;1,400", "Courier+Prime:wght@400;700"),
        palette=dict(field="#efe4c4", field2="#e6d8b0", ink="#15120c", ink2="#3b342a", dim="#5a5040", card="#f6edd2",
                     yel="#e5d39b", red="#a81f19", grn="#2c5a2e", cob="#1f3d7a", gold="#6b5212", tbc="#8a2050",
                     up="#2c5a2e", dn="#a3231c",
                     slab="#15120c", slab2="#0e0c08", slabA="#221e16", slabB="#15120c", slabC="#1c1912",
                     **{"on-slab": "#f6edd2", "on-slab2": "#cfc3a3", "on-slab3": "#ece2c4", "dn-hi": "#ef8a7a"}),
        ez=dict(green="#9fc28f", red="#e3937f"),
        css=BASE + """
:root{--fb:'Libre Caslon Text',Georgia,serif;--fm:'Courier Prime','Courier New',monospace}
/* yellowed paper with a faint halftone dot */
body{background-image:radial-gradient(color-mix(in srgb,var(--ink) 9%,transparent) 1px,transparent 1.4px);background-size:5px 5px}
*:not(.lg):not(i){border-radius:2px!important}
h1{font-size:clamp(40px,7vw,96px);line-height:.9;letter-spacing:0}
h1 .hl{background:none;color:var(--red)}
h2{font-size:clamp(34px,5.4vw,64px);line-height:.92}
.brand .mark{border-radius:2px}
.brand b{font:400 22px/1 var(--fd);letter-spacing:.02em}
.brand b small{font:700 10px/1.2 var(--fm)}
.top{border-bottom:5px solid var(--ink)}
.hero::before{border-top:5px solid var(--ink);border-bottom:2px solid var(--ink);font-family:var(--fm)}
/* section labels become EXTRA! banners */
.eb{background:var(--red);color:var(--on-slab);font:400 18px/1 var(--fd);letter-spacing:.06em;padding:6px 10px 5px;transform:rotate(-2deg)}
.eb::before{content:"Extra! ";color:var(--on-slab)}
.tick{border-bottom:3px solid var(--ink);box-shadow:none}
.tick .tl{background:var(--red);color:var(--on-slab);font:400 15px/1 var(--fd);letter-spacing:.06em}
.tick .tc>span{font-size:13px}
.sh .no{background:var(--ink);color:var(--card);box-shadow:none;transform:rotate(-4deg)}
.sec{border-top:5px solid var(--ink)}
.sh{border-bottom:2px solid var(--ink)}
/* rubber stamps: the crown and Winner tags, and Calls are in */
.crown{background:var(--card);color:var(--red);box-shadow:0 0 0 2px var(--red);transform:rotate(-7deg)}
.bk-r .crown{transform:rotate(6deg)}
.stamp{transform:rotate(-3deg)}
/* the leader: the red spot colour, ink-free text on it */
.pc.r1{background:var(--red);color:var(--on-slab);animation:none;box-shadow:0 0 0 2px var(--ink)}
.pc.r1 .pc-w span,.pc.r1 .rk{color:var(--on-slab)}
.motto .e{color:var(--grn)}
""",
    ),
    # 3. Stock pages: the old market listings. Agate mono numbers, a condensed serif head, tight ruled rows, small caps.
    "stockpages": dict(
        title="Stock pages",
        line="The market listings page: faded grey-green newsprint, agate mono figures, condensed serif heads, tight ruled rows and small caps.",
        fonts=gf("Instrument+Serif:ital@0;1", "IBM+Plex+Mono:wght@400;500;600;700", "Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400"),
        palette=dict(field="#e6e9df", field2="#dde1d4", ink="#1c1f1a", ink2="#3d4239", dim="#575d52", card="#eef0e8",
                     yel="#d3d8c6", red="#8a3328", grn="#35573b", cob="#2b4470", gold="#5f5320", tbc="#6e3355",
                     up="#35573b", dn="#8a3328",
                     slab="#22261f", slab2="#181b16", slabA="#2c3128", slabB="#22261f", slabC="#282c24",
                     **{"on-slab": "#eef0e8", "on-slab2": "#c2c7b8", "on-slab3": "#e2e5da", "dn-hi": "#e59585"}),
        ez=dict(green="#adc6a6", red="#dcaa9e"),
        css=BASE + """
:root{--fd:'Instrument Serif',Georgia,serif;--fb:'Source Serif 4',Georgia,serif;--fm:'IBM Plex Mono',ui-monospace,monospace}
*:not(.lg):not(i){border-radius:0!important}
.art img,.art video{filter:grayscale(.5) sepia(.1)}
""" + DISPLAY + """{letter-spacing:.01em}
h1{font-size:clamp(38px,5.6vw,72px);line-height:.95}
h1 .hl{background:none;font-style:italic}
.brand .mark{border-radius:0}
.brand b{font:400 24px/1 var(--fd);text-transform:none;letter-spacing:0}
.brand b small{font:500 10px/1.2 var(--fm);letter-spacing:.12em}
/* labels in small caps, figures in agate mono */
.eb,.st-h span,.bk-sec,.ua-h,.car-cap,.due small,.mx-q{font-variant:small-caps}
.eb{background:none;color:var(--ink);padding:0;border-bottom:1px solid var(--ink);text-transform:lowercase;font-size:13px;letter-spacing:.12em}
.sh .no{background:none;box-shadow:none;font:600 13px/1 var(--fm);padding:0}
.pc-w b,.mx-big,.mx-bet b,.bk-r .rk,.pc .rk,.due b,.mcb{font-family:var(--fm);font-weight:600;letter-spacing:-.02em}
.mx-big{font-size:clamp(46px,7vw,84px)}
.pc-w b{font-size:30px}
.tick .tl{background:none;color:var(--ink);border-right:1px solid var(--ink);font-variant:small-caps;text-transform:lowercase;font-size:13px}
.tick .tc>span{font-weight:500;font-size:12px;min-height:28px}
/* tight table-like rows */
.roster{gap:6px}
.pc,.bk-r,.up-s{box-shadow:none;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);background:var(--card)}
.cc li{border-radius:0!important}
.bk-rows{gap:4px}
/* the leader: a shaded row with a heavier rule, no foil */
.pc.r1{background:var(--yel);animation:none;border-top:3px solid var(--ink);border-bottom:3px solid var(--ink)}
@media(max-width:640px){.pc-w b{font-size:22px}.pc .rk{font-size:14px}}
""",
    ),
}

ISSUE_JS = ('<script id="skin-js">/* tools/skins.py: the dateline\'s issue number, graded rounds + 1 */'
            'try{document.documentElement.style.setProperty("--issue",\'"\'+(ROUNDS.length+1)+\'"\')}catch(e){}</script>\n')

# extra pairs a skin must pass on top of palettes.PAIRS: ink text on the up/down fills, and the skin's own pairs
def check_skin(name, S):
    ok = palettes.check(name, S["palette"])
    bad = []
    for fill in ("green", "red"):
        r = palettes.ratio("#0a0a0a", S["ez"][fill])
        if r < 4.5:
            bad.append("on-ez on ez-%s %.2f" % (fill, r))
    P = S["palette"]
    if name == "extra":  # the leader card and EXTRA! banners: on-slab text on the red spot colour; red headline word on paper
        for fg, bg, need in (("on-slab", "red", 4.5), ("red", "field", 4.5), ("yel", "slab", 4.5)):
            r = palettes.ratio(P[fg], P[bg])
            if r < need:
                bad.append("%s on %s %.2f" % (fg, bg, r))
    if bad:
        print("%-10s extra pairs FAIL: %s" % (name, "; ".join(bad)))
    return ok and not bad

def build(src, name, S):
    out = re.sub(r"  /\* PALETTE .*?/\* END PALETTE \*/", lambda m: palettes.block(S["palette"]), palettes.strip_main(src), count=1, flags=re.S)
    out = re.sub(r"<title>([^<]*)</title>", lambda m: "<title>%s News %s</title>" % (m.group(1), S["title"]), out, count=1)
    out = out.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- GENERATED by tools/skins.py from v15-season.html (skin: %s). Edit v15, then rerun. -->" % name, 1)
    link_end = out.index('rel="stylesheet">', out.index("fonts.googleapis.com/css2")) + len('rel="stylesheet">')
    out = out[:link_end] + "\n" + S["fonts"] + out[link_end:]
    ez = ":root{--ez-green:%s;--ez-red:%s}\n" % (S["ez"]["green"], S["ez"]["red"])
    out = out.replace("</style>\n</head>", "</style>\n<style id=\"skin\">\n" + ez + S["css"].strip() + "\n</style>\n</head>", 1)
    if '<style id="skin">' not in out:
        sys.exit("could not place the skin style block")
    out = out.replace("</body>", ISSUE_JS + "</body>", 1)
    return out

def main():
    ok = all([check_skin(n, S) for n, S in SKINS.items()])
    if "--check" in sys.argv:
        sys.exit(0 if ok else 1)
    src = open(SRC, encoding="utf8").read()
    if not re.search(r"  /\* PALETTE .*?/\* END PALETTE \*/", src, re.S):
        sys.exit("no PALETTE block in v15-season.html")
    for n, S in SKINS.items():
        open(os.path.join(EZ, "v15-season-news-%s.html" % n), "w", encoding="utf8").write(build(src, n, S))
        print("wrote v15-season-news-%s.html" % n)
    sys.exit(0 if ok else 2)

if __name__ == "__main__":
    main()
