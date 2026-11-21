# PSA grading architecture -> EZ grading system (research notes, 2026-10-21)

Source quality key: [P] primary (grader's own page), [P*] primary text reached through the r.jina.ai reader because psacard.com / beckett.com block direct fetches (Cloudflare 403), [S] secondary (blog, news, forum), [SQ] secondary and the sources conflict. Beckett's own site could not be read at all (403 even via reader); Beckett facts below come from search snippets of beckett.com pages and secondary guides, flagged.

Raw fetched copies: /tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/psa/ (gs.md, a117.md, half.md, cert1.md, info.md, about.md, cgcscale.md).

---

## 1. PSA end to end

| Step | What PSA says | Why collectors trust it |
|---|---|---|
| Submission | "Choose your items / Build your submission (online or app) / Get your items to PSA" [P* psacard.com/info]. Declared value sets the service tier [P* half-grades article]. | Fee tied to declared value; a paper trail per order. |
| Order stages | Arrived, Order Prep, Research & ID, Grading, Assembly, QA Checks, Shipped/Complete [S cardshopfinder, forums]. FAQ confirms Research & ID, Grading (with the second review formerly "QA1"), QA Checks ("formerly QA2", checks the holder), Complete; payment then grade reveal [P psacard.com/support/faq]. | Visible pipeline; people watch it move. |
| Authentication | "Every card entering the PSA grading room is examined by at least two authentication and grading professionals" and they must agree [P FAQ]. Fakes/alterations get no grade: N1 trimming, N2 restoration, N3 recoloration, N4 questionable authenticity, N5 altered stock, N6 below minimum size, N7 cleaning, N8 miscut, N9 don't grade [P* gradingstandards]. Some can be holdered as "Authentic" or "Authentic Altered (AA)". | The grade first says "this is real and unaltered". |
| Grading | 10-point scale (below). Mostly objective (centering measured, defects located), with a stated subjective "eye appeal" element: "graders reserve the right ... to make a judgment call" [P* gradingstandards]. | Published standard, two graders, guarantee. |
| Encapsulation | "Sonically sealed in a tamper-evident holder" [P* /info]; tamper-evident since 1991, "if someone does attempt to violate the holder, it will leave some evidence" [P FAQ]. | The grade only counts while the card stays in the slab: the PSA Guarantee "assures the accuracy of the grade ... as long as it remains in its tamper-evident holder" [P* /about]. |
| Label | Front: identity + grade + cert no. + hologram. LightHouse label since 2017: on/off hologram, fugitive ink, UV logo, QR code on back; back also carries barcode + cert number [S allvintagecards; S blakecrosley quoting PSA]. Since 2008 the grade number sits on its own line under the descriptor (e.g. "NM-MT" / "8") [S quoting PSA]. Since June 2024 a blue label marks autograph-only items [S]. | Hard to fake; scannable. |
| Grade reveal | "Check grades online, or use the PSA app for an interactive, flip-to-reveal experience" [P* /info]. | Ritual moment, shareable. |
| Cert verification | psacard.com/cert or app scan. Cert page shows item info, SecureScan front/back images, auction prices, registry sets, "Population w/Qual" and "Population Higher" [P* Cert/40726949; P FAQ]. Caveats printed on it: "Data entry errors may occur..." and "Verification ... does not eliminate risk" (fakes reuse real cert numbers) [P*]. | Anyone can check any slab; the database is the source of truth, the label a pointer. |
| Population report | Count of every card graded, per grade (1-10, half grades, qualified grades in own columns) [P* half-grades article]. "Pop 1" = only one at that grade; "pop higher" = how many graded above. Note: psacard.com/pop returned a sign-in page through the reader on 2026-10-21 (may be bot gating; unverified whether login is now required). | Scarcity becomes measurable. |
| Set Registry | Collectors register graded cards into sets; weighted GPA; Set Rating divides by the whole checklist so missing cards lower it; qualified grades count lower (e.g. 9 with qualifier counts as 7); bonus points for top-pop items (+1 tied highest, +2 sole highest); annual awards [S search snippets of psacard.com/psasetregistry/rules, /faq]. | Turns grading into a competitive game and a reason to resubmit. |

Scale facts: PSA "over 65 million items certified since ... 1991" [P* /about]. PSA graded 19.26M cards in 2025, about 72% share; 26.8M across major graders; TCG/non-sport 16.8M (+95% YoY), sports 10.0M (-12%) [S GemRate year review via X, truncated]. H1 2025: Pokemon = 97 of PSA's top 100 cards by volume; overall gem (PSA 10) rate 43%, TCG 50%, sports 34% [S cllct/Yahoo, GemRate data]. 2021 boom: PSA paused Value/Regular/Express in late March 2021 with roughly a 10M-card backlog; Collectors Universe taken private Feb 2021 (~$853M) [S Sports Collectors Digest, AOL]. One result reports a second pause of PSA value tiers from June 2, 2026 (single source, unverified) [S].

## 2. PSA 1-10 scale

Current names (label descriptor + number): GEM MT 10, MINT 9, NM-MT 8, NM 7, EX-MT 6, EX 5, VG-EX 4, VG 3, GOOD 2, FR 1.5, PR 1; plus AUTHENTIC / AUTHENTIC ALTERED. The old scale combined "PR-FR 1"; half grades (Feb 1, 2008) split Fair 1.5 from Poor 1 [P* half-grades article; P* article 117].

Criteria (PSA article 117, older but on psacard.com) [P*]; current page says GEM MT 10 is 55/45 front, 75/25 back [SQ: several guides; older text said 55/45 to 60/40]:
- 10 Gem Mint: "virtually free from any physical defects", four perfectly sharp corners, sharp focus, full original gloss, no staining, slight print imperfection allowed; centering ~55/45 front, 75/25 back.
- 9 Mint: one minor flaw (very slight wax stain on reverse, minor print imperfection, or slightly off-white borders); 60/40-65/35 front, 90/10 back.
- 8 NM-MT: "appears Mint 9 at first glance", slightest fraying at one or two corners etc.; 65/35-70/30 front, 90/10 back.
- 7 NM: slight surface wear on close inspection, slight corner fraying, most gloss kept; 70/30-75/25 front.
- 6 EX-MT: visible wear or print defect, very light scratch, slight notching; 80/20 front.
- 5 EX: minor rounding of corners, minor edge chipping; 85/15.
- 4 VG-EX: corners slightly rounded, light crease possible; 85/15.
- 3 VG: rounding evident, crease possible; 90/10.
- 2 GOOD: accelerated rounding, several creases; 90/10.
- 1.5 FR / 1 PR: extreme wear, heavy creases, missing pieces.
Drivers: centering, corners, edges, surface (focus, gloss, staining, print). "A 5% leeway is given to the front centering minimum standards for cards which grade NM7 or better" [P* article 117].

Half grades: every whole grade 1-9 can get a .5 except there is no 9.5 [P* half-grades]. "In most cases, a card would have to exhibit centering that is five to ten percentage points better than the tolerance" to get the bump; "the half-point does not represent the mid-point between grades" but a premium example [P*].

Qualifiers: a card meets a grade but has one significant flaw. MK (marks) and MC (miscut) are always applied; OC (off-center), ST (staining), PD (print defect), OF (out of focus) are now at grader discretion and usually reduce the number instead [P FAQ; S 2021 customer update snippet]. Written joined: "NM-MT 8 OC". Half grades never carry qualifiers [P*]. Qualified grades sell below clean grades [S] and count lower in the Registry [S].

Label lines (front), as seen on current PSA labels [S guides; layout not published by PSA as a diagram]:
- Left column: line 1 YEAR + BRAND/SET (e.g. "1999 POKEMON GAME", "2023 POKEMON SV PROMO"); line 2 SUBJECT (e.g. "CHARIZARD-HOLO"); line 3 VARIETY if any (e.g. "1ST EDITION", "REVERSE HOLO", "SPECIAL ILLUSTRATION RARE").
- Right column: line 1 card number "#4"; line 2 grade descriptor "GEM MT"; line 3 numeric grade "10" (number on its own line since 2008).
- Bottom: barcode, cert number, hologram (LightHouse). Back: barcode + cert again, QR.
So "2026 $EZ SEASON 1" follows the real pattern (year + brand + set). PSA labels use the set name, not "set 1"; "SEASON 1" reads as a set name, which is fine.

## 3. Beckett and CGC

Beckett (BGS) [mostly S; beckett.com unreadable]: four subgrades on the front label: Centering, Corners, Edges, Surface. Overall is not an average; "the lowest subgrade carries the most weight" and the final grade "rarely, if ever, exceeds two levels above the lowest" (search snippet attributed to beckett.com; another guide says 0.5 above, [SQ]). Gem Mint 9.5 minimum: "at least three grades of 9.5 and the fourth to be no less than a 9" (beckett.com snippet). Pristine 10 criteria include 50/50 front centering. Black Label: all four subgrades 10 (BGS Black introduced Nov 28, 2014 per secondary). Label colours [SQ]: one Beckett page says Black = perfect 10s, Gold = Gem Mint (9.5) / Pristine 10, Silver = others; an older page says Gold 9.5-10, Silver 8.5-9, White below. Black Label is the hobby's top status symbol (Beckett news "BGS Black sparks added interest in perfect 10s").

CGC Cards [P cgccards.com/card-grading/grading-scale]: Pristine 10 = "virtually flawless ... centering is 50/50 ... flawless color and registration", gets "a special CGC Cards Pristine 10 label" (gold, 2023 [S]); Gem Mint 10 = 10 overall but one criterion short of Pristine, ~55/45 front, 75/25 back; Mint+ 9.5 then half grades all the way down; Authentic AU, Authentic Altered AA, Authentic ART. CGC dropped subgrades in 2023 [S quoting CGC]. Security: microprinting, UV ink, holographic foil, cert number, barcode, QR [S quoting CGC].

## 4. Pop reports, registry, value

- Pop language: "Pop 1" (only one at that grade), "PSA 10 pop", "pop higher" (cert page field), gem rate (share of submissions getting 10). Modern Pokemon gem rates are high (TCG 50% H1 2025 [S]) so a modern PSA 10 is not scarce by itself; scarcity lives in low pop and vintage.
- PSA's own 2008 data show the grade multiplier: 1952 Topps Mantle PSA 7 $35,000 / 8 $62,000 / 9 $225,000; 1955 Topps Koufax $850 / $2,200 / $18,000; "cards that grade between PSA 1-6 will usually sell for about 50-65% of the next highest grade" [P* half-grades article]. "The Population Report will play a major role in the valuation" [P*].
- Pokemon PSA 10 vs 9 [S, all blogs, no rigorous study]: vintage holos often 5-20x (1st Ed Charizard ~10x, e.g. $528,000 vs $58,112 in one month per NewsBreak); modern SV-era 1.3-2x. Grey Felt Hat Pikachu: ~84,000 graded, PSA 10 pop over 40,000 [S cllct].
- PSA markets "Increased rarity: a high PSA grade can add both scarcity and value" [P* /about]. EZ must NOT borrow this line (guardrail: grades describe accuracy, never value).

## 5. Pokemon card vs label (no duplication)

Card shows (bottom strip): illustrator, regulation mark (tournament legality, not rarity), set symbol or 3-letter set code, collector number "4/102" (number / printed set total; a number above the total = secret rare, e.g. 224/198), rarity symbol (circle common, diamond uncommon, star rare; SV: two black stars double rare, two silver ultra rare, one gold illustration rare, two gold special illustration rare, three gold hyper rare) [S tcg guides; CGC article on rarity symbols is semi-primary]. Holo types: holo (foil art window), reverse holo (foil everywhere but the art), full art, secret rare.

Label translates the card into words and adds only what the card cannot say: year + set NAME (not the symbol), "#4" (no "/102"), subject name, variety in words ("HOLO", "1ST EDITION", "REVERSE HOLO"), and the verdict (descriptor, number, cert). It never repeats art, HP, attacks, illustrator, rarity glyph.

EZ rule from this: the label = identity + verdict; the card (film + stats) = evidence. Ticker, the four calls, the move, the sizes live on the card only. Do not print the ticker or move on the label unless it is the "variety" (see 6).

## 6. Draft EZ mapping (for discussion)

Pipeline mapped one to one:
| PSA | EZ |
|---|---|
| Submission | The four AIs post their calls before the report (prompt, ticker, date). "Submitted" = calls posted. |
| Research & ID | Round identified: company, report time, which close grades it. |
| Authentication (N codes) | Proof each call was public before the report (timestamped X post). A call that can't be proven pre-report = "NO GRADE" (EZ's N4), never quietly dropped. Missing AI = qualifier, not a fake. |
| Grading | The next market close: direction right/wrong, size miss in %. No human judgment ("eye appeal") at all; EZ is stricter than PSA here and can say so. |
| Encapsulation / tamper-evident | The sheet row is frozen once graded; round films are final (CLAUDE.md). The slab = "this record can't be edited". |
| Label | 2026 $EZ SEASON 1 / COMPANY / variety ; #32 / descriptor / grade ; barcode + cert + hologram. |
| Grade reveal | Card flip at the close (the site already flips). |
| Cert lookup | /cert/<n>: the sheet row, four calls, close, X post links, pop and pop higher. No prices. |
| Pop report | Count of rounds per grade this season; "Pop 3 at 10". |
| Set Registry | Each AI's career = its "set": every call it made graded; GPA like PSA's; missing rounds lower its set rating (mirrors the board rule "fewer than half the rounds: ranked after"). |

Draft 10-point round grade (simulated on the 32 graded rounds in ez-data.js, 2026-10-21):
- Direction band (primary, like PSA centering): all right -> 9; 3/4 (or 2/3) -> 7; 2/4 -> 5; 1/4 (or 1/3) -> 3; none -> 1.
- Precision bump +1 (like PSA's half-point "premium example"): average miss <= 1.5% when all right, <= 3% otherwise.
- Result: 10 GEM = all four right AND average miss <= 1.5%.
- Black/Pristine slab: all four right AND every single call within 2% (rounds 12 Hon Hai, 13 RPM, 30 TSMC). Under a stricter 1.5% rule none qualify.
- Simulated pop: 10 x5 (12, 13, 29, 30, 32; of which 3 pristine), 9 x3 (1, 5, 31), 8 x1, 7 x7, 6 x2, 5 x3, 4 x3, 3 x4, 1 x4. Gem rate 5/32 = 16% (vs PSA modern TCG ~50%), so a 10 means something.
- Words: either PSA's descriptors (GEM MT 10 ... PR 1; generic hobby terms) or EZ's own (PERFECT / STRONG / SPLIT / ROUGH / REKT already on the site). Recommend EZ words for the descriptor + number on its own line, the PSA way ("PERFECT" over "10").
- Subgrades, Beckett style, only on the cert page or flip side: DIRECTION (x/4), PRECISION (avg miss %), CLOSEST (best call's miss), CONSENSUS (all same side?). Keep the label itself one grade.
- Qualifier: use for genuine defects of the round, not drama: "3AI" / incomplete round (rounds 1-8 had no Grok) is the honest PSA analog of MC/MK. Shock moves (|move| >= ~2x season median, e.g. CCL 13.53%, ACN 16.02%) belong in the VARIETY line ("SHOCK MOVE"), the way "1ST EDITION" or "HOLO" describes the card, not its condition.
- Per-AI career grade (Registry GPA): grade each call 1-10 (direction right = 6+; miss <= 1% = 10, <= 2% = 9, ...), average with weights all 1. Current hit rates for context: GPT 56%, Kimi 47%, Claude 59%, Grok 67% (24 calls); avg miss 4.1 / 4.7 / 4.7 / 3.1%.

Status words, collector language:
- Upcoming: "AWAITING SUBMISSION · CALLS DUE OCT 21" (or "NOT YET SUBMITTED").
- Pending (calls posted, waiting for the close): "SUBMITTED · IN GRADING · GRADE AT CLOSE OCT 21". PSA's own stage word is "Grading"; "At grading" is not a phrase PSA uses.
- Graded: show the grade; "GRADED OCT 21" can sit by the cert. Optional "GRADE REVEAL" moment at the close (PSA's app does flip-to-reveal).
- Pokemon-style collector number on the card side: "32/116" (round / rounds planned in Season 1) while the label keeps "#32".

Guardrails and risks:
- Never say a grade adds value or rarity (PSA's own marketing does; EZ must not).
- Don't copy PSA's red label header, LightHouse logo, "PSA" mark or Beckett's "Black Label" name verbatim; use EZ's own marks and a name like "BLACK SLAB" or "PRISTINE". (CLAUDE.md: never impersonate a real organisation.) Grade words like "Gem Mint" are generic hobby terms.
- High gem rates killed scarcity for modern Pokemon; keep EZ's 10 rare by rule, not by luck, and publish the rule.
