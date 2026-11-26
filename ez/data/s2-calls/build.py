#!/usr/bin/env python3
"""python3 build.py : writes calls.csv, the log of every Season 2 call with the reasoning each AI gave (owner, 2026-11-20: "log that in a
sheet somewhere... an important data set that at some point you can look at and maybe find some patterns"). One row per AI per trade.
The words are transcribed verbatim from the owner's screenshots of each AI's chat (in <date>/, named in the screenshot column);
"[cut off]" marks text the screenshot does not show, "[hidden]" text covered by the app's scroll button. Side, size and confidence are
the AI's own final lines; side and size were checked against the sheet (every one matches). The outcome columns (move, right, P&L at
$100K a trade) are filled once the trade is graded at the close (TradingView's close-to-close move)."""
import csv, os
D = os.path.dirname(os.path.abspath(__file__))
COLS = ['round', 'season2_trade', 'ticker', 'company', 'called', 'graded_at_close', 'model', 'app_shows', 'side', 'size_pct', 'confidence_pct',
        'why', 'take', 'thesis', 'kill', 'lessons_entry', 'other_reasoning', 'sources_shown', 'journal_receipt', 'process_notes',
        'sheet_check', 'move_pct', 'right', 'pnl_usd', 'screenshot']
T = {'INTU': (113, 1, 'Intuit'), 'KEYS': (114, 2, 'Keysight'), 'ESTC': (115, 3, 'Elastic'), 'ZOOM': (116, 4, 'Zoom'), 'SMTC': (117, 5, 'Semtech'), 'SYM': (118, 6, 'Symbotic'),
     'DELL': (119, 7, 'Dell'), 'WDAY': (120, 8, 'Workday'), 'AMBA': (121, 9, 'Ambarella'), 'HPQ': (122, 10, 'HP'), 'ADSK': (123, 11, 'Autodesk')}
R = []
def add(model, app, tk, side, size, conf, why, shot, called='2026-11-19', graded='2026-11-20', **k):
    n, s2, co = T[tk]
    R.append(dict(round=n, season2_trade=s2, ticker=tk, company=co, called=called, graded_at_close=graded, model=model, app_shows=app,
                  side=side, size_pct=size, confidence_pct=conf, why=why, screenshot=called + '/' + shot, sheet_check='matches the sheet', **k))

# Claude (the app shows the project "Earning Predictoor", mode "Freedom unrestricted"; the model name is not on screen)
CA = 'Claude app, project "Earning Predictoor" (Freedom, unrestricted)'
add('Claude', CA, 'INTU', 'SHORT', 4.0, 56,
    "Short, small: Intuit's own guide says growth slows again tonight, its last two slower quarters were sold, and app software keeps falling.", '01-claude-intu.jpg',
    take="Short, small: Intuit's own guide says growth slows again tonight, its last two slower quarters were sold, and app software keeps falling.",
    thesis="Intuit's last four results days split cleanly: up about 4% twice when online growth held at 25%, down 20% and 3% when it slowed to 22% and 17%. Its own guide has revenue growth at 11% this quarter against 14% last quarter, and application software has fallen three days running on fear of AI agents. I'm watching Global Business Solutions growth against 15%, first-quarter revenue against $4.31 billion, and the second-quarter EPS guide against $3.70.",
    kill="Intuit reports Global Business Solutions growth of 15% or more and first-quarter revenue of $4.313 billion or more, guides second-quarter non-GAAP EPS to a midpoint of $3.66 or more, and lowers no fiscal 2027 line.",
    sources_shown='Intuit results-date notice, Oct 29; Investor Day release, Sep 17; Aug 25 results release, EDGAR',
    process_notes='After the INTU call the owner asked for KEYS and ESTC; Claude checked "the clock, the lessons receipt and when Keysight and Elastic report": both report after the close, about 21:05 UTC, "It is 19:27 UTC, so both locks must be" [cut off].')
add('Claude', CA, 'KEYS', 'LONG', 4.0, 53,
    "Long, small: Keysight is 26% off its high with its AI-test peers, keeps beating its own guide, and took in more orders than it shipped.", '02-claude-keys-estc.jpg',
    take='[cut off]',
    thesis="[cut off] ...along with the rest of the AI-test group, and in my record a raise after that kind of fall was bought five times of seven. I'm watching fourth-quarter revenue against $1.97 billion, orders against $2.0 billion, and the first-quarter revenue guide against $1.90 billion.",
    kill="Keysight reports fourth-quarter revenue under $1.93 billion, or fourth-quarter orders under $1.90 billion, or guides first-quarter revenue to a midpoint under $1.85 billion.")
add('Claude', CA, 'ESTC', 'LONG', 6.0, 52,
    "Long, small: Elastic fell 27% in three weeks and 7% today on no news, while its contracted backlog growth has risen four quarters running.", '02-claude-keys-estc.jpg',
    take="Long, small: Elastic fell 27% in three weeks and 7% today on no news, while its contracted backlog growth has risen four quarters running.",
    thesis="Elastic's contracted backlog due within a year grew 17%, 19%, 20% and 21% over the last four quarters, and the stock rose 12% and 19% on the two reports where that figure reached 20%. It has dropped 27% from its October high, 7% of it today with no filing and its peers flat. I'm watching backlog growth against 20%, revenue against $492 million, and the full-year revenue guide against a $2.009 billion midpoint.",
    kill="Elastic reports current remaining performance obligations growth under 18%, or second-quarter revenue under $487 million, or lowers any fiscal 2027 guidance line.")

# GPT (ChatGPT, project "Investing", workspace "Work"; the model name is not on screen)
GA = 'ChatGPT, project "Investing" (Work)'
add('GPT', GA, 'INTU', 'LONG', 4.5, 57,
    "Higher QuickBooks renewal prices and stronger October sales at small firms should lift subscription and payment revenue.", '03-gpt-intu.jpg',
    other_reasoning="Intuit raised renewal prices on three QuickBooks plans in August. The stronger signal came afterward. In October, small firms' real sales rose 2.6% from September, with gains in all 12 sectors Intuit tracks. I expect that combination to push quarterly revenue above the $4.313 billion top of guidance. The test for the stock is whether Intuit keeps its 13-14% full-year growth outlook for Global Business Solutions. A cut would break my case even if the quarter beats.",
    sources_shown='investors.intuit.com; QuickBooks Blog +3',
    journal_receipt='141 dated entries before this submission, counting each dated top-level heading once. Last sentence: "No spreadsheet submission or trade claimed."',
    process_notes='GPT first stopped ("Following your rule, I\'m stopping. No INTU research or prediction submitted."). The owner asked "Pls submit your prediction. What rule is stopping you from submitting?" GPT: the round requires a complete read of the lessons file (a 9,213-line journal) before a call; it finished the read (worked 2m 19s) and recorded the final Intuit prediction at 19:19 UTC, before the scheduled release, for the Nov 19 close to the Nov 20 close in New York.')
add('GPT', GA, 'KEYS', 'LONG', 5.5, 59,
    "Test gear orders ran ahead of shipments. I expect Keysight to guide January-quarter sales above $2 billion.", '04-gpt-keys-estc.jpg',
    other_reasoning="Keysight is my stronger call. It booked $2.09 billion in orders against $1.85 billion in sales last quarter. The main risk is how quickly it can ship. A January-quarter revenue forecast above $2 billion would clear the roughly $1.98 billion investors were expecting.",
    sources_shown='investor.keysight.com +2',
    journal_receipt='"I read all 142 dated entries." Last sentence: "Higher QuickBooks renewal prices and stronger October sales at small firms should lift subscription and payment revenue."',
    process_notes='Worked for 6m 56s. "Both calls are final for the November 19 close to the November 20 close in New York."')
add('GPT', GA, 'ESTC', 'LONG', 7.0, 55,
    "Annual cloud sales grew 27% and more customers signed six-figure contracts. I expect Elastic to raise its subscription forecast.", '04-gpt-keys-estc.jpg',
    other_reasoning="Elastic has more uncertainty around timing. Revenue under contract for the coming year grew 21% against 15% sales growth. My test is whether Elastic raises its full-year sales-led subscription forecast above the prior $1.688 billion midpoint.",
    sources_shown='ir.elastic.co +2',
    journal_receipt='"I read all 142 dated entries." (same receipt as KEYS)')

# Qwen (chat.qwen.ai, Qwen4-Max)
QA = 'chat.qwen.ai, Qwen4-Max'
add('Qwen', QA, 'INTU', 'LONG', 4.0, 58,
    "Priced for AI ruin at 13x. Guide already reset, quarter is QuickBooks not tax, stock down 13% in three days. Relief bounce beats fear.", '05-qwen-intu.jpg',
    lessons_entry="LESSONS ENTRY 1: I looked at what the price already paid for (13.5x a reaffirmed FY27 guide, ~10% FCF yield, 6.6% buyback yield, -62% from peak), at whether tonight's quarter can even contain the thing everyone fears (Oct quarter is QuickBooks/Credit Karma, not tax season; Claude Personal Finance is read-only and Intuit is an Anthropic/OpenAI distribution partner), at the guidance-shock channel (none new: FY27 reset Aug 25, reaffirmed Sept 17, SBC change already in consensus), and at the run-in base rate (15 of 18 up after a >=5% slide; November up-moves +3.5-4%). I chose LONG +4.0% at 58%. What would prove me wrong: (a) online paying customer growth <=3% again or Credit Karma below 11% and the stock closes down - then \"cheap plus reset guidance\" is not a floor and I should stop buying fallen software into prints; (b) a clean beat with reaffirmed guidance that still closes red, as in August - then narrative and flow dominate fundamentals on this name and I must weight trend/sector rotation above valuation; (c) a move above +9% - then my habit of shrinking magnitude toward the seasonal median underestimates high-vol regimes, and I should size nearer the implied move when a stock is 60% drawn down. Also logged: the harness date was one day off the company calendar; verify the release timestamp and the exact pre-print close before every call.",
    sources_shown='207 sources',
    journal_receipt='"No lessons file existed before this round; this is entry 1."',
    process_notes='[cut off] "...mislabeled to Nov 18 - I ignored it."')
add('Qwen', QA, 'KEYS', 'LONG', 5.0, 56,
    "Orders up 56% and record backlog, yet the Street models only 15% growth next year. Stock already down 26%; the bar is low tonight.", '06-qwen-keys.jpg',
    lessons_entry="LESSONS ENTRY 2: For KEYS I looked at the guidance-shock channel first: consensus now sits exactly on the Q4 guide, unlike August when the guide was 6.3% above the Street and the stock still closed -6.3%. So I anchored on the FY27 bar (+15% revenue vs orders +56% and record backlog), the 20.5x FY27 multiple after a 26% derating with flat estimates, and the two prior November guide events (+10%, +8.8%). Chose LONG +5.0% at 56%, deliberately smaller than the 7.4% average reaction because August proved beats get sold here. Proves me wrong: Q1 FY27 revenue guided at or below ~$1.95B, or supply-conversion commentary that caps FY27 at the Street's 15% and the stock closes red - then supply, not demand, is the whole story and I should treat backlog as a ceiling, not a cushion. A second red close on a big beat means I must flip my default to shorting AI-complex beats in a de-rating tape regardless of valuation.",
    other_reasoning="Couldn't verify: exact Q1 FY27 consensus for KEYS (I inferred ~$1.98B from the FY27 total), any post-release data for either name, and Barchart's GAAP-based EPS tables disagree with the non-GAAP consensus elsewhere - I used the company's own non-GAAP guidance.")
add('Qwen', QA, 'ESTC', 'SHORT', 8.0, 55,
    "Market grades Elastic on subscription acceleration, not beats. Whisper sits above guidance and Datadog just guided consumption flat.", '07-qwen-estc.jpg',
    lessons_entry="LESSONS ENTRY 3: For ESTC I looked at the reaction function rather than the beat streak: five straight consensus beats, three selloffs, because the grade is sales-led subscription acceleration and cRPO conversion. I weighed the whisper ($0.88) above the guide top ($0.82), the back-half-loaded FY27 raise, Datadog's flat sequential Q4 guide and largest-customer optimization, TD Cowen's cautious observability checks plus $400M insider selling, and a 23x multiple that is still a premium to a 13-15x software tape, against cRPO +21%, Citi's +60% September federal bookings check and two prior big up-reactions. Chose SHORT -8.0% at 55%, sized toward the -12%/-15% historical down cluster rather than the average. Proves me wrong: sales-led subscription growth accelerates again with cRPO at 20%+ and a FY raise, and the stock closes up - then contracted backlog does convert and I should stop treating peer consumption data as a read-through to commitment-based models. Also proves me wrong if a low-quality print rallies anyway: that would mean the 27% three-week slide already cleared the sellers, and pre-print capitulation matters more than the metric.",
    other_reasoning="Real counterweight, and why this is only 55%: cRPO +21% reported / +20% cc, RPO +27%, record $100k+ customer adds, Citi's federal check showing September bookings +60% and a $132 target, and the last two reactions were +19.3% and +12.3%. If sales-led accelerates again I'm wrong fast. Implied move is +/-13-16%, so I'm sizing near the historical down-move cluster (-12% to -15%), not near the average. (in 06-qwen-keys.jpg)",
    sources_shown='143 sources; www.barchart.com')

# Gemini (Gemini app; the model picker reads "Gemini Neon" = Gemini 4 Neon, announced by Google on 18 Nov 2026)
GE = 'Gemini app, model picker "Gemini Neon"'
add('Gemini', GE, 'INTU', 'LONG', 5.0, 61,
    "Down 52% YTD to 15x earnings with EPS estimates already cut 34%; a routine beat and steady FY27 guide should spark [hidden]f bounce.", '08-gemini-intu.jpg',
    other_reasoning="[cut off] ...$4.30B-$4.31B (+11% YoY). Valuation has compressed to a floor: 15x forward P/E and 11.5x EV/FCF, down from ~24x at the start of the year, with ~81% gross margins and active buybacks, the market is already pricing in permanent growth deceleration. Seasonality limits the downside catalyst. Q1 is a seasonally light quarter for TurboTax, and management already reaffirmed its FY27 outlook ($23.28B-$23.51B revenue, $22.88-$23.12 non-GAAP EPS) at Investor Day in September. Simply beating a lowered bar and holding FY27 guidance steady removes the immediate fear of another guide-down. With options pricing a +/-5.2% move today (roughly +/-$16, putting $331 in range against $332 technical resistance), a clean beat-and-reiterate points to a measured rebound right around the implied move.",
    sources_shown='investing.com; Barchart.com',
    process_notes='Its final line reads "TICKER:" where the others name the ticker. The price levels it cites ($331, $332) sit about 7% above Intuit\'s 19 Nov close of $310.02 (TradingView), and +/-$16 is 5.2% of about $308, so the levels and the percentage do not agree.')
add('Gemini', GE, 'KEYS', 'SHORT', 6.0, 58,
    "Supply constraints capping FY27 revenue conversion clash with 82% Buy ratings and a broken chart, echoing August's post-earnings drop.", '09-gemini-keys-estc.jpg',
    take='[cut off]')
add('Gemini', GE, 'ESTC', 'LONG', 11.5, 62,
    "Broad software selloff dragged ESTC back to its pre-Q1 price despite four straight beats and real AI search momentum.", '09-gemini-keys-estc.jpg',
    other_reasoning="[cut off] ...straight quarters (13.5% average surpr[ise]... rallying +19.3% on its August report and +12.3%... in May. AI search is a tailwind, not a seat-count threat. While \"SaaSpocalypse\" fears and insider selling dragged shares down, Elastic's consumption-based search and AI agent workloads are benefiting from AI adoption (Citi raised its target to $132 on Nov 12). A standard beat-and-raise off washed-out pre-print positioning should spark a sharp snapback.",
    sources_shown='optionslam.com; Benzinga')

# Grok (Grok app, project "Earnings Zeason", mode Expert)
GR = 'Grok app, project "Earnings Zeason" (Expert)'
add('Grok', GR, 'INTU', 'SHORT', 2.4, 65,
    "Heavy washout and AI-disruption overhang leave residual owned slower-growth story as confirmation; beat unlikely to re-anchor ownership before next close.", '10-grok-intu.jpg',
    other_reasoning="INTU reports after the close on Nov 19; graded from the last pre-release close to the first close after. Stock has been heavily washed out (~50% YTD, near lows) on AI-disruption fears for QuickBooks/TurboTax and a prior FY27 guide reset to 9-10% growth. Last print was a beat that still closed -3.2% with further drift. The dominant narrative remains owned enough that a print confirming AI investment needs and slower customer growth maps as confirmation rather than an incremental ownership reset. Options anchor ~+/-8-9%. Lessons filter (pure confirmation on residual owned story digests lower even after large washout; NVDA residual AI ownership example) supports further digestion.",
    sources_shown='30 pages',
    journal_receipt='28 dated entries. Last sentence of the last entry: "BRK.B: -0.4% (resolved +0.76%)."',
    process_notes='The owner pasted the prompt as a file ("pasted-text.txt", "Refer to the attached content"); thought for 25s. Its final line reads "TICKER: SHORT, -2.4 %" (a sign on the size).')
add('Grok', GR, 'KEYS', 'SHORT', 2.2, 60,
    "Residual owned AI test-demand story maps solid print as confirmation; washout not deep enough to re-anchor ownership before next close.", '11-grok-keys-estc.jpg',
    other_reasoning="AI infrastructure test/measurement demand is the dominant owned narrative (recent strong revenue/EPS growth, products tied to AI/6G/EV). Stock has run YTD but pulled back; residual cycle ownership is high enough that a solid print confirming continuity maps as confirmation rather than an ownership reset. Options ~+/-9-10%. Lessons filter (residual owned AI story digests clear beats lower even after washout) supports modest downside.",
    sources_shown='40 pages', process_notes='Final line "KEYS: SHORT, -2.2 %" (a sign on the size).')
add('Grok', GR, 'ESTC', 'LONG', 2.8, 58,
    "Lower residual ownership of search-AI growth plus last-print upside digestion leaves room for better-than-feared AI adoption to drive positive close.", '11-grok-keys-estc.jpg',
    other_reasoning="Search AI platform / observability / security growth story is less fully owned than mega-cap AI names. Last print was a beat with a large positive close. Incremental AI adoption or guidance that clears a better-than-feared threshold can still produce upside digestion. Options wide (~+/-15%). Lean positive on lower residual ownership plus recent positive reaction pattern.",
    sources_shown='40 pages', process_notes='Final line "ESTC: LONG, +2.8 %".')

# the calls of 23 Nov (Zoom, Semtech, Symbotic; graded at the 24 Nov close): one screenshot per AI, each its three final blocks only
# (the owner's crops; the app is not on screen). Each block also reads "MARKET: S&P 500 DOWN, n % over the same window" (in market_line).
def d23(model, tk, side, size, conf, why, shot, mkt, **k):
    add(model, '[not on screen]', tk, side, size, conf, why, shot, called='2026-11-23', graded='2026-11-24',
        process_notes='Also wrote "MARKET: S&P 500 DOWN, ' + mkt + ' over the same window".' + k.pop('pn', ''), **k)
d23('Qwen', 'ZOOM', 'SHORT', 4.0, 56, "Zoom must clear an EPS bar above its own guidance while every revenue estimate is being cut. Today it lagged the chip-led rally.", '01-qwen.png', '0.7 %', pn=' The ticker is written ZM.')
d23('Qwen', 'SMTC', 'LONG', 5.0, 57, "Chips got their leader back and Semtech's bar sits at the low end of raised guidance, with most of next year already booked.", '01-qwen.png', '0.7 %')
d23('Qwen', 'SYM', 'SHORT', 4.0, 54, "Symbotic already popped 16% today on flat volume, and management pre-said margins and system starts would be flat. Cash is the test.", '01-qwen.png', '0.7 %')
d23('Gemini', 'ZOOM', 'SHORT', 5.5, 60, "Sluggish 4% sales growth with YoY EPS contraction and a broken software chart echo August's 7% post-earnings drop.", '02-gemini.png', '0.4 %')
d23('Gemini', 'SMTC', 'SHORT', 7.5, 59, "After a Nvidia-driven sympathy rip into the print, recent analyst target cuts and a damaged chart favor a post-earnings fade.", '02-gemini.png', '0.4 %')
d23('Gemini', 'SYM', 'SHORT', 9.5, 64, "One EPS beat in eight quarters and two straight post-earnings drops leave shares exposed to another fade off today's bounce.", '02-gemini.png', '0.4 %')
d23('Grok', 'ZOOM', 'SHORT', 2.8, 64, "Residual owned mature AI-features story after washout; continuity print digests lower on confirmation, not incremental stabilization.", '03-grok.png', '-0.9 %', pn=' Final line "ZOOM: SHORT, -2.8 %" (a sign on the size).')
d23('Grok', 'SMTC', 'SHORT', 3.6, 66, "Residual owned AI-connectivity cycle after sharp drop; continuity confirmation digests further lower.", '03-grok.png', '-0.9 %', pn=' Final line "SMTC: SHORT, -3.6 %" (a sign on the size).')
d23('Grok', 'SYM', 'SHORT', 4.1, 63, "Residual owned automation growth story; known backlog does not clear better-than-feared threshold on continuity print.", '03-grok.png', '-0.9 %', pn=' Final line "SYM: SHORT, -4.1 %" (a sign on the size).')
d23('Claude', 'ZOOM', 'SHORT', 3.0, 55, "Last guide was flat and cost Zoom 7%. Tonight\u2019s has to top $1.296 billion, the day after the market jumped 4%.", '04-claude.png', '0.5 %', pn=' The ticker is written ZM.')
d23('Claude', 'SMTC', 'SHORT', 3.0, 54, "The quarter was told in October and the stock rose 16% today. I see it beating chip peers and still closing lower.", '04-claude.png', '0.5 %')
d23('Claude', 'SYM', 'SHORT', 5.0, 56, "Up 16% before reporting, the Walmart order is old news, and management said the next step-up comes late in 2027.", '04-claude.png', '0.5 %', pn=' Then: "The grade is scheduled for Nov 24 after the close. I will not report any after-hours move as a result."')
d23('GPT', 'ZOOM', 'SHORT', 4.5, 55, "Online sales barely grew and a reseller is cutting back. I expect Zoom\u2019s winter sales forecast to come in near $1.29 billion.", '05-gpt.png', '0.8 %', pn=' The ticker is written ZM.')
d23('GPT', 'SMTC', 'LONG', 9.0, 58, "Orders for 800G chips are rising and faster copper chips are shipping. I expect Semtech to guide winter sales above $450 million.", '05-gpt.png', '0.8 %')
d23('GPT', 'SYM', 'LONG', 7.0, 56, "Symbotic went from 46 warehouse installations underway to 77 in a year. I expect a December-quarter sales forecast above $815 million.", '05-gpt.png', '0.8 %')

# the calls of 24 Nov (Dell, Workday, Ambarella, HP, Autodesk; all report after the close, graded at the 25 Nov close): the owner's
# screenshots (8:16 to 8:18 pm on his phone), each AI's final blocks only. Not in the sheet yet when logged (its cells were empty).
def d24(model, app, tk, side, size, conf, why, shot, mkt, **k):
    add(model, app, tk, side, size, conf, why, shot, called='2026-11-24', graded='2026-11-25',
        process_notes='Also wrote "MARKET: S&P 500 ' + mkt + ' over the same window".' + k.pop('pn', ''), **k)
GK = 'Grok app, chat "Earnings Zeason" (Expert)'
d24('Grok', GK, 'DELL', 'SHORT', 3.2, 65, "Residual owned AI-server cycle after washout and one-day bounce; continuity confirmation digests lower.", '01-grok.jpg', 'DOWN, -0.8 %', pn=' Final line "DELL: SHORT, -3.2 %" (a sign on the size).')
d24('Grok', GK, 'WDAY', 'SHORT', 2.1, 62, "Residual owned enterprise-software story after decline; continuity print digests as confirmation.", '01-grok.jpg', 'DOWN, -0.8 %', pn=' Final line "WDAY: SHORT, -2.1 %" (a sign on the size).')
d24('Grok', GK, 'AMBA', 'SHORT', 4.4, 64, "Residual owned AI-connectivity exposure; continuity confirmation digests further lower.", '01-grok.jpg', 'DOWN, -0.8 %', pn=' Final line "AMBA: SHORT, -4.4 %" (a sign on the size).')
d24('Grok', GK, 'HPQ', 'SHORT', 1.9, 60, "Residual owned mature hardware narrative; continuity print digests lower on confirmation.", '01-grok.jpg', 'DOWN, -0.8 %', pn=' Final line "HPQ: SHORT, -1.9 %" (a sign on the size).')
d24('Grok', GK, 'ADSK', 'SHORT', 2.3, 61, "Residual owned design-software story; continuity confirmation digests lower.", '01-grok.jpg', 'DOWN, -0.8 %', pn=' Final line "ADSK: SHORT, -2.3 %" (a sign on the size).')
d24('GPT', GA, 'DELL', 'LONG', 8.0, 59, "Dell has racks running at Nscale. I expect its January-quarter adjusted earnings forecast to top $7.10 a share.", '02-gpt.jpg', 'UP, 0.4 %', pn=' The ticker of the first block is hidden under the app\'s back button ("[hidden]: LONG, 8.0 %"); its WHY names Dell and it comes before WDAY, so it is read as DELL.')
d24('GPT', GA, 'WDAY', 'SHORT', 5.0, 55, "More bookings came from existing customers. I expect January-quarter subscription growth to slow to 10% or less.", '02-gpt.jpg', 'UP, 0.4 %')
d24('GPT', GA, 'AMBA', 'LONG', 8.5, 55, "Sales of Ambarella’s two newer camera chips are climbing. I expect its January-quarter sales forecast to top $115 million.", '02-gpt.jpg', 'UP, 0.4 %')
d24('GPT', GA, 'HPQ', 'SHORT', 7.0, 62, "HP’s PC shipments fell 31% as memory costs rose. I expect its fiscal 2027 adjusted profit forecast below $3.18 a share.", '02-gpt.jpg', 'UP, 0.4 %')
d24('GPT', GA, 'ADSK', 'LONG', 5.5, 58, "Autodesk is cutting multiyear discounts while engineering firms keep buying software. I expect it to raise its annual billings forecast.", '02-gpt.jpg', 'UP, 0.4 %')
d24('Claude', CA, 'DELL', 'SHORT', 3.0, 52, "Likely beats and raises, but chip tape has set every AI close this month. A coin; I expect it to beat server peers by 3 points.", '03-claude.jpg', 'UP, 0.3 %', sources_shown='Dell Q3 preview, Admiral Markets [the rest cut off]')
d24('Claude', CA, 'WDAY', 'SHORT', 3.0, 55, "Backlog growth guided down to 11-12% from 14%, year reaffirmed not raised, staff cu[cut off] last two November reports fell 6-8%.", '03-claude.jpg', 'UP, 0.3 %')
d24('Claude', CA, 'AMBA', 'SHORT', 6.0, 64, "Closed lower after six of its last seven reports, mostly beats; chip fund is 23% under its 50-day average.", '03-claude.jpg', 'UP, 0.3 %')
d24('Claude', CA, 'HPQ', 'SHORT', 3.5, 59, "First 2027 guide comes after HP said PC units will fall; this year’s EPS holds 19 cents of one-off refunds. I expect under $3.", '03-claude.jpg', 'UP, 0.3 %')
d24('Claude', CA, 'ADSK', 'SHORT', 2.5, 53, "Last two raises were sold about 4% e[hidden]t is the one software name here that has not fallen yet. Close to a coin.", '03-claude.jpg', 'UP, 0.3 %')
QW = 'chat.qwen.ai, Qwen4-Max'
d24('Qwen', QW, 'DELL', 'SHORT', 5.0, 58, "HPE beat and raised guidance and got sold 13% today. Dell's problem is memory cost per server, not orders. Same tape, same risk.", '04-qwen-a.jpg', 'DOWN, 0.5 %')
d24('Qwen', QW, 'HPQ', 'SHORT', 2.0, 55, "HP's bar is its own guidance midpoint and DRAM costs are rising into the FY27 margin guide. Printing margin is the test.", '04-qwen-a.jpg', 'DOWN, 0.5 %')
d24('Qwen', QW, 'AMBA', 'SHORT', 3.0, 54, "Ambarella fell 12% today and lost a Buy rating. No data-center exposure to offset it, and the chip tape is still selling beats.", '04-qwen-a.jpg', 'DOWN, 0.5 %')
d24('Qwen', QW, 'WDAY', 'SHORT', 3.0, 55, "Workday guides cRPO to 11-12%, no longer ahead of revenue. Last November it beat and still fell on cautious guidance.", '04-qwen-a.jpg', 'DOWN, 0.5 %')
d24('Qwen', QW, 'ADSK', 'LONG', 0.5, 52, "Autodesk is up 20% since early October while software broke, and consensus sits inside its own guide. Small edge, near a coin flip.", '05-qwen-b.jpg', 'DOWN, 0.5 %')
GE = 'Gemini app, Gemini Neon'
d24('Gemini', GE, 'DELL', 'SHORT', 4.5, 57, "Pre-print target cuts from Barclays, Morgan Stanley, and Citi highlight memory cost and PC headwinds that can overshadow an AI server beat.", '06-gemini-a.jpg', 'UP, 0.3 %')
d24('Gemini', GE, 'WDAY', 'SHORT', 3.5, 58, "Slowing 10.7% revenue growth and recent analyst target cuts leave little room for a rally on a routine software beat.", '06-gemini-a.jpg', 'UP, 0.3 %')
d24('Gemini', GE, 'AMBA', 'SHORT', 4.0, 56, "A 10% pre-print drop and a modeled Q4 sequential slowdown leave Ambarella exposed to another fade despite high analyst targets.", '06-gemini-a.jpg', 'UP, 0.3 %')
d24('Gemini', GE, 'HPQ', 'SHORT', 4.5, 62, "Rising memory costs and a sluggish PC market hit HPQ directly with EPS already expected to fall nearly 20% year over year.", '06-gemini-a.jpg', 'UP, 0.3 %')
d24('Gemini', GE, 'ADSK', 'LONG', 3.5, 58, "Thirteen straight EPS beats, stable estimates, and a fresh Loop Capital upgrade make Autodesk the cleanest long in a cautious software tape.", '07-gemini-b.jpg', 'UP, 0.3 %')
for r in R:
    if r['called'] == '2026-11-24': r['sheet_check'] = 'not in the sheet yet (logged from the screenshots)'

# outcomes (round -> close-to-close move, %; the sheet's moves, entered by the owner on 20 Nov after the close; TradingView's
# 15-minute-delayed read at 21:15 UTC: INTU -12.79, KEYS -6.93, ESTC -2.02, all within 0.3 of the sheet, which wins)
MOVES = {113: -12.79, 114: -7.07, 115: -2.20, 116: 2.75, 117: -16.97, 118: 6.92, 119: 0.6, 120: 0.68, 121: -19.77, 122: 11.49, 123: -3.49}
order = {'INTU': 0, 'KEYS': 1, 'ESTC': 2, 'ZOOM': 3, 'SMTC': 4, 'SYM': 5, 'DELL': 6, 'WDAY': 7, 'AMBA': 8, 'HPQ': 9, 'ADSK': 10}; mo = {'GPT': 0, 'Claude': 1, 'Grok': 2, 'Gemini': 3, 'Qwen': 4}
R.sort(key=lambda r: (order[r['ticker']], mo[r['model']]))
for r in R:
    m = MOVES.get(r['round'])
    if m is not None:
        s = 1 if r['side'] == 'LONG' else -1; r['move_pct'] = m; r['right'] = 'yes' if s * m > 0 else 'no'; r['pnl_usd'] = round(s * m * 1000)
with open(os.path.join(D, 'calls.csv'), 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=COLS); w.writeheader(); [w.writerow({c: r.get(c, '') for c in COLS}) for r in R]
print(len(R), 'rows ->', os.path.join(D, 'calls.csv'))
