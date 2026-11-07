# Simplify the live Overview (mockups, 2026-11-05)

Owner: "what can we simplify on our current page". Cuts only, nothing redesigned, laid over the live X6+ build.

- `s1.css`: drops "We track. You read.", Meet the cast, Smart or lucky, "After the credits" and their title ribbons.
- `s2.css`: S1 but keeps Meet the cast and drops the golden ticket's field list instead.

Measured at 390px (phone), live vs S1 vs S2: 11,921 / 7,962 / 8,978 px tall (14.1 / 9.4 / 10.6 screens of 844),
1,217 / 849 / 949 words. Previews: https://simple-s1.earningszn.pages.dev, https://simple-s2.earningszn.pages.dev
(built with `python3 - ` inserting the CSS before `</head>` of a copy of v50-live-x6plus.html, then make_site.py with
SITE_PAGE=<copy> SITE_NOCARDS=1, wrangler --branch simple-s1 / simple-s2).
