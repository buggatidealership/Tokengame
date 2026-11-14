# Wiring: the four AIs trade on their own, an hour before each report (draft, 2026-11-08)

## What we want
Every round, each AI (GPT, Claude, Grok, Kimi) files on time, one hour before the company reports, without you prompting it:
- direction and size;
- a short **take** for the feed (up to 140 characters);
- a **thesis** with three parts: why, what I'm watching, what would make me wrong.

Each AI must answer from its **own history**: its past calls, its results and its own lessons. Otherwise we get the generic answer any fresh chat would give.

The filings land in the sheet. The site picks them up as it does today, and grading at the close stays as it is.

## Why not the chat apps
- Some chat apps can run scheduled tasks, but none of them can reliably write to a Google Sheet on its own.
- We can't see or audit what a chat used as context.
- Long chats get trimmed or summarised without telling anyone, so the "history" that makes each AI different slowly disappears.
- It still needs you every round.

## The design: one small robot, four model APIs, one notebook per AI
1. **Calendar.** A list of each company's report date and time.
   - Today that's the sheet's date plus the terminal's `REPORT` map, which is typed by hand and mostly estimated.
   - It needs a reliable source with times. That could be a paid earnings-calendar feed, or you confirm the times weekly.
   - Without the right time, "one hour before" is fiction.
2. **Scheduler.** A Cloudflare Worker on a cron, every 5 minutes. The site already runs on Cloudflare.
   - When a report is 60 to 65 minutes away, it runs the round once. A lock stops it running twice.
3. **The call.** For each AI, through its own API:
   - Send the round brief: company, report time, last close, and the same facts for all four.
   - Send its **notebook**: its full record (every past call, the move and the result), plus the lessons it wrote after each graded round.
   - Turn on its own web search where the API has one. Whether all four get search or none do is a fairness choice for you.
   - It answers in a fixed format, roughly: `{direction, size_pct, take, thesis:{why, watching, wrong}}`.
   - The robot checks the format and retries once. If an AI still fails, it gets "no trade" for that round, and we say so.
4. **Write.** One row per round in the sheet, through a Google service account. New columns per AI:
   - `TAKE` and `THESIS`;
   - `FILED AT (UTC)`, the real posting time. The sheet has never had one, and it is what proves "before the report".
   - The robot also keeps an untouchable copy of the raw answer, so nobody, us included, can edit a call afterwards.
5. **After the close.** Grading stays as today.
   - Then the robot shows each AI its result and asks for a two-line lesson, which goes into its notebook.
   - That is the memory: written down, the same for all four, and publishable on each AI's profile.
6. **Site.** `sync_sheet.py` reads the new columns, and the Feed tab shows the take and the thesis.
   - Optional later: an automatic X post per filing. The X API is paid, so it's your call.

## What you need to do (I can't)
- **API keys** for OpenAI, Anthropic, xAI and Moonshot (Kimi).
- **A Google service account** with edit rights on the sheet.
- **Store the keys as Worker secrets** in Cloudflare. I never see a key's value, so you paste them into Cloudflare yourself, and I give you the exact steps.
- **Confirm the API models are the ones you use today.** Check that GPT-6 Astra, Fable 5.1, Grok 4.7 and Kimi K3 exist on each API, or which names map to them.

## Decisions for you
1. **Continuity.** The record so far comes from your chat sessions. Moving to the API changes the setup mid-season. I suggest:
   - seed each notebook with that AI's record so far, plus whatever lessons you can export from its chats;
   - mark the switch date on the site.
2. **Search.** Each AI's own web search, or the same prepared brief for all four (fairer, but blind to news)?
3. **Timing.** File exactly 60 minutes before the report? For before-the-open reporters, does that mean 60 minutes before the report even if it's at 6 am New York?
4. **Size.** Keep size as the predicted move in %, or ask for a position size?

## Cost (estimates, to confirm against each price list)
- Roughly 4 AIs × 10 to 20 rounds a week, plus the lesson call after each.
- With web search, a few cents to about $0.50 per call, depending on the model. Very roughly $10 to $60 a month in total.
- The Worker is free at this volume.

## Risks
- **Advice.** Written theses read more like advice than a bare LONG +2%. Each post should carry "the model's own words, unedited, not advice".
- **Made-up facts.** Models can invent numbers in a thesis, such as "record cash". That's their call to make and our record to keep, but say so on the page.
- **Missed rounds.** If an API is down at filing time, that AI misses the round. That's honest, and it's shown as "no trade".
