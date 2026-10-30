---
name: ez-visual-story
description: How to design any EZ page element (section, card, ticket, chart, label, copy, order of sections) so the picture tells the story and words only label it. Use before proposing or building any design, mockup, layout, wording or sequencing change on the EZ site (X2+, X3+, X4+, X5+, earningszn.xyz), and whenever the owner talks about design.
---

# Visual story: what took "Meet the cast" from card 1 to card 2

Reverse-engineered on 2026-10-30 from the owner's own messages (29 to 30 Oct) and the builds R4 to R10 in world-comic.js.

**Card 1** was a stat sheet: a ranked list of P&L, the right-way count and the last five, with a "Makes the buyback call" chip and a pastel wedge for decoration.
**Card 2** tells the same numbers as a story:
- a Season 1 ticket, whose #1 stub is the Golden ticket;
- the lab's country as a waving flag behind each face;
- the leader's face in holo;
- the P&L counting up as you scroll;
- the words cut down to labels ("Current P&L", "We bet on its call").

## Where the ideas came from (be honest about this)

The owner supplied the metaphors: the ticket stock and its borders, "Season one" in place of "Admit one", the flags, the US vs China rivalry, and "a living comic book... motion, fluidity". I supplied the execution. The gap to close is that I should arrive at those metaphors myself, before being told.

## The test every element must pass

1. **Name the story, not the data.** Write the section's job in one line as a story with stakes, e.g. "four rivals from two countries race for the one ticket we bet on", not "the standings". If you can't find the conflict, the stakes or the change over time, find it before designing.
2. **Every fact needs a carrier.** List the facts the section must convey. For each one, ask what in the page's own world could show it without a sentence:
   - which country → a flag;
   - who we bet on → the golden ticket;
   - leader → holo;
   - money → a bill, a count-up;
   - up or down → green or red, a corner, an arrow.

   A fact that has no carrier stays as a short label.
3. **Decoration must encode something.** If a shape, colour or motion carries no fact, cut it or give it one. Card 1's pastel wedge meant nothing; card 2's flag means "where this lab is from".
4. **Build from objects the site already owns.** Use Season 1 tickets, the graded certificate, the dollar bill, comic panels and balloons. Do not invent a new widget when an existing object can carry the meaning. Every reuse ties the page together.
5. **Motion means something.** A count-up means money accruing. A line drawing in means progression. A wave means a living rival. A punch-in means a new entrant. No motion only because it looks nice, and nothing moves with reduced motion.
6. **Words: the audience's vocabulary, exact about who does what.** Crypto traders say "P&L" and "W/L". "We bet on its call" is right; "makes the buyback call" was wrong, because the AI doesn't buy back. Cut any word the picture already says (the "US" chip next to a flag).
7. **The cover-the-text check.** Hide every word: what can a newcomer still tell? Then show only the words: is anything left that a picture already says? Both answers should be short.
8. **Check the story against the data.** A visual story can lie louder than text. If the golden ticket holder is 1 of 5 in its last five calls, or every hit-rate line is falling, the picture must not imply a hot streak or rising skill. Show the tension or flag it to the owner. Never invent a happier story.
9. **Contrast carries meaning, repetition doesn't.** A flag says something because Kimi's differs from the other three. If every item had the same mark, the mark would carry nothing. Use a carrier where it separates items.
10. **The owner's no-go zones stay.** No flags on the landing cover. No numbers on Starring. The guardrails (no return promises, "the pool can be wiped out") hold. A good principle never overrides an explicit instruction.

## Lessons extracted from the iterations

Each lesson is the reason behind a change the owner liked, not the owner's pointer itself. Each comes with the iteration that taught it.

11. **Explain by walking through one real case, step by step.**
    - People grasp a mechanism through one real instance with cause and effect: these four called it, the close came in, this one passed, it got paid, it moves on.
    - An abstract "how it works" teaches less than that one instance.
    - Pick the instance that shows the mechanism most clearly. A round where everyone was right teaches nothing about grading; one where a single model was right teaches all of it.
    - *Taught by:* the "One round, start to finish" iterations, R2 to R7, 29 Oct.
12. **A carrier belongs only where its fact belongs to that section's story.**
    - The flag works on Meet the models, whose story is rival labs. On the landing page the story is "what EZ does", so a flag there is noise. The same goes for M5's faces, where the story is "the leader".
    - Before reusing a carrier, ask whether this section's story needs that fact.
    - *Taught by:* "you don't need the flag on the landing page / on M5", 30 Oct.
13. **Two carriers for one fact: keep the stronger and cut the other.**
    - A flag plus a "US" chip says the same thing twice. Doubling it is clutter, not emphasis.
    - *Taught by:* the "US" chip removed, 30 Oct.
14. **A thing's own identity is the fastest carrier.**
    - A company is recognised by its brand colour before its name is read. A model is recognised by its face and colour.
    - Use identity where an element stands for that thing.
    - *Taught by:* the brand-colour tickets, B1, 30 Oct.
15. **Build takes from separable parts.**
    - The owner often combines takes: "everything from B1 except the predictions from B3".
    - Design takes whose parts can be swapped (background, layout of the calls, header), and label the parts, so a combination is quick to build.
16. **The strength of a claim must match the size of the sample, and so must its picture.**
    - With about 60 calls, nothing can be said about improving or declining. A coin's 95% range is still 37 to 63%.
    - Show the uncertainty (a luck band, how far into the sample we are) rather than a verdict either way.
    - This is the honest version of lesson 8: don't tell a sadder story than the data either.
    - *Taught by:* "it's not like none of them are improving... we need 100 to 150", 30 Oct.
17. **One name per thing, and words that mean one thing.**
    - "Report" can mean many things; "earnings" is what the audience says.
    - Two "how ... works" in one frame blur together.
    - "Won" means the closest call in a round while the board ranks by P&L. Say which one a word means wherever both appear.
    - *Taught by:* "before the earnings", "How it works / How a round works", 29 Oct; helper a's flag on "wins", 30 Oct.
18. **Don't state the obvious or explain the frame.**
    - "A real one, step by step" tells nothing; of course it is real.
    - Every sentence must add a fact the picture cannot.
    - *Taught by:* R7, 29 Oct.
19. **No dead space, and design each format for itself.**
    - Empty areas and stretched panels read as unfinished.
    - On desktop, recompose the content for the wider shape, scaled to its own container. Do not stretch the phone version.
    - *Taught by:* the R6 panel squares, 29 Oct; the "white space" notes.
20. **Look at the live page before proposing.**
    - Verify what exists before calling it missing. "Every round so far" already showed the winner. The real gap was that a key line had to explain it, which is lesson 7's test.
    - *Taught by:* my wrong proposal, 30 Oct.

21. **A mark must not bury its subject.**
    - A stamp, burst or label sits on top of the thing it is about. Keep it to about a quarter of the area so the subject (the company, the film) stays readable.
    - Bigger is not clearer once it hides what it marks.
    - *Taught by:* the winner stamps in "Every round so far" S1, 30 Oct.
22. **No neutral surfaces.**
    - A plain white or blank fill carries nothing and reads as unfinished.
    - Every surface should carry identity (the company's colours) or the world's texture (halftone, panels), unless the white itself means something.
    - Check every box: why is this background this colour?
    - *Taught by:* "everything that has a white background that doesn't absolutely need one, why have it", 30 Oct.
    - A pale dot screen on white is still a neutral surface: it reads as an empty page with texture. The ground of a panel must be a colour or material that belongs to its story (the fight's corners, the ticket's stock, the company's colour). Caught again on 30 Oct ("again, the white, that's always horrible").
23. **A carrier must decode at first sight, without a legend.**
    - "Punched in tens" needed a key and still wasn't understood, even by the owner.
    - If an encoding needs explaining, choose one people already know: a line going up, a stamp, a crown, money.
    - *Taught by:* C3 rejected, 30 Oct.
24. **Translate statistics into everyday words, or don't show them.**
    - "19 times in 20" is a statistician's phrase. Most visitors read it as noise.
    - Say what it means for them, or let the picture carry it with no number at all.
    - *Taught by:* the luck band's caption, 30 Oct.
25. **One story, one best carrier, even across sections.**
    - A second element that tells the same story in another form adds length, not meaning. Lead-change panels repeat the line race; a "race for wins" panel repeats the grid of winners.
    - Keep the one that tells it best, usually the simplest graph or the picture people already scroll through.
    - *Taught by:* C6 and S3 dropped, C4 kept, 30 Oct.
26. **The motion is the argument.**
    - P3 works because the punch acts out "this round is now on the record".
    - An idea only lands when its execution makes the point felt. Ask what the movement itself says, not only what the picture shows.
    - *Taught by:* panel 5 P3, 30 Oct.

27. **One world, unless a change of world is itself the point.**
    - A section that switches its ground, palette or style (Smart or lucky's dark sunburst on a cream comic) reads as a different site and breaks the story.
    - A comic can change style on purpose, as a splash page does at the climax. Then the change must carry meaning and be the only one.
    - Before shipping, scroll the whole page and ask whether every section looks like the same book.
    - *Taught by:* "the background of smart or lucky is different to the rest... doesn't really feel part of the story", 30 Oct.
28. **Design for the return visit, not only the first one.**
    - The first visit needs "what is this". The return visit needs "what changed since I was here": who leads now, the latest predictions, the next close.
    - The page people come back to (the Leaderboard) should open on what is new, and make the newest thing the liveliest.
    - *Taught by:* "the leaderboard is where you want to come back to... who's leading right now, what are the latest predictions", 30 Oct.
29. **A guide, not a salesman.**
    - The page helps someone understand something complex and doesn't ask for attention.
    - Delight comes from craft: fluid motion, elegant composition, a picture that makes the idea click. It never comes from loudness or a call to act.
    - "Dry" means a fact presented without that craft. Any element that is only a table, a number or a sentence still owes the reader that moment.
    - *Taught by:* "nothing should feel dry... somebody that isn't trying to ask for attention, somebody that's trying to help you understand something complex", 30 Oct.

30. **Lead with what the visitor came for, not a summary of it.**
    - On Upcoming, people want to know what each AI is saying. A "1 up / 3 down" count answers a question nobody asked.
    - Show the content itself (the calls) and let the arrangement summarise it (bulls against bears).
    - *Taught by:* "if somebody comes in they want to see what's the main event, what are they predicting", 30 Oct.
31. **Familiarity is a carrier.** A company's own signature element is recognised before any word is read: Amazon's smile-arrow, Apple's bite, Nike's swoosh.
    - Drawn in the page's style, it makes each card "scream the name" and feel known.
    - A bigger logo is not the same thing; the brand's own gesture is.
    - *Taught by:* "the Amazon little arrow... behind the card... it needs to feel familiar to people", 30 Oct.
32. **Magic is small, lasting life in still things.**
    - Harry Potter's moving pictures work because a still frame keeps quietly living: a loop, a breath, a glance.
    - One-shot entrance animations are not enough. Some elements should keep a gentle, endless motion that rewards looking (a cinemagraph from a round's film, a waving flag, a ticking clock).
    - Keep it quiet so it never asks for attention (lesson 29), and still with reduced motion.
    - *Taught by:* "a comic book that is alive... these moving images, moving pictures... these tiny elements that made the movie magical", 30 Oct.
33. **Every element must pass the value test: what does the viewer gain from it?**
    - The Leaderboard is "who holds the golden ticket, and the stats people expect from a leaderboard" (the P&L, its last 7 days, W-L, hit rate, form, best and worst round).
    - Reverse-engineer what people expect from the genre (sports tables, trading competitions, fantasy leagues) before inventing.
    - An element that is clever but answers no question goes.
    - *Taught by:* "is this information valuable to a viewer or user", 30 Oct.
34. **Dryness shows by contrast.** A plain table or text on a blank ground looks dry precisely because the section above it is alive.
    - The whole page must share the same richness, so audit the weakest section, not the best.
    - *Taught by:* "when I'm on the video... this feels like a comic... then you scroll down to smart or lucky and all of a sudden it becomes very dry again", 30 Oct.
35. **An analogy must be common, not clever.**
    - "Sixteen coins ran the same season" is clear to someone who thinks in numbers and opaque to most people.
    - Test an analogy on everyday experience. If it needs numeracy to decode, it fails (lesson 24).
    - *Taught by:* "for most humans that is not fully understandable", 30 Oct.
36. **One number per fact.** "+$65,478" and "+65.5%" on a $100,000 start say the same thing twice. Keep the one people read (the dollars).
    - *Taught by:* "remove the +65.5% because it already says +65K", 30 Oct.
37. **Don't re-teach what the journey already taught.**
    - Once the Overview has explained that we bet on the leader's call, a "We bet on its call" chip on every later view is noise.
    - Each view assumes what the earlier ones taught.
    - *Taught by:* "it's obvious after somebody went through the overview page", 30 Oct.

38. **A ground comes from the page's own printed world, never from stock "energy" effects.**
    - Sunbursts, radial rays, smoke clouds and glows are generic devices for excitement. They belong to no material on this site, so they read as cheap and off-style however well drawn.
    - The site's grounds are things that could be printed: cream stock, Ben-Day dots, ink-outlined panels, hard offset shadows, tickets and bills. Excitement comes from the content (a fight, a reveal), not from the wallpaper behind it.
    - An effect around a subject must never compete with it: a halo of smoke round a logo hides the very thing it frames (lesson 21). A blow-up that drifts keeps the subject whole; a cloud that swallows its edges does not.
    - *Taught by:* "the background... it's out of style from the site. It looks a bit cheapish" (circling the sunburst rays), and "that cloudish area... it's a bit too much", 30 Oct.
39. **A process is grasped either as one shape at a glance or as one step per beat, never as a grid read all at once.**
    - The loop (four steps around a circle) works because the reader sees the cycle before reading a word: the shape says "this repeats".
    - The alternative is to show one step alone, then the next, so each idea lands before the next arrives. Test both; the worst is four boxes of text competing at once.
    - Each step's words name the actor and the act plainly ("They predict the move before earnings", "The model with the highest P&L holds the golden ticket"): "prediction" reads faster than "call" for a newcomer.
    - *Taught by:* "the loop alive... from an easy to understand perspective, I think that one is the best", and "each slide that shows up one at a time, which makes it easier for people to see... predictions is easier to understand", 30 Oct.
40. **Keep a familiar function, give it a crafted feel.**
    - People know what a filter, a tab or a scoreboard does. Reinventing the function costs understanding; reinventing the feel (a filter that is part of the comic, a switch that animates the meaning) adds delight without any learning.
    - *Taught by:* "it's a filter in the traditional sense, but it's a nice experience of a filter", 30 Oct.
41. **A ranking reads fastest as a confrontation.**
    - "Who's winning?" is answered by two faces and the gap between them (the golden ticket holder against the challenger) before any table. The table then serves those who want more.
    - The gap is the story's tension: how close the chase is.
    - *Taught by:* "the who's winning, golden ticket. VS Challenger... and the gap, as an interesting idea... the title fight still remains my favorite", 30 Oct.

42. **Life is discovered, not announced.**
    - A living picture works when the viewer notices on their own that it moves: a needle drifting, a blade turning, a glint. If the motion tells you where to look, it has become a show and competes with what you came to read.
    - Keep the amplitude small, the tempo slow, one moving thing per picture, and never move the words or the numbers.
    - *Taught by:* "it should be things that are more subtle... subtle enough to realize, hey, these things are actually alive, but not like, oh my God, I don't know where to look", 30 Oct.
43. **In an explanation, animate the cause producing its effect.**
    - Motion earns its place in the introduction when it shows the mechanism happening in front of the reader: the bell rings, the move lands, each prediction is stamped pass or fail. Seeing the cause make the effect teaches faster than any caption.
    - Motion that only decorates the explanation (a wobble, a sparkle) teaches nothing and should go there first.
    - *Taught by:* "the market grades every call, the bell... that is really easy to understand... the animations need to visualize value or visualize understanding, make it easy to absorb information", 30 Oct.
44. **A device must survive the data growing.**
    - An idea built on today's 70 rounds must still read at 300 (a scroll that plays every round, a strip of every call). Ask how it looks at the end of the season and the next one before proposing it.
    - Likewise an idea must say how it would know what it shows (a "since your last visit" needs a record of the visit: only the visitor's own browser has it).
    - *Taught by:* "the bigger the season, the tougher it's going to be to keep that animation", and "we have to think about feasibility... how do we track people's visits", 30 Oct.
45. **Use the audience's own time frames, and open on the whole picture.**
    - Crypto traders read performance as 24h, 7d and all time. Offer those windows in that language, and open on the complete one (the season), since a visitor first wants the full standings; the shorter windows are for the return visit.
    - *Taught by:* "last 24 hours, last 7 days, and then the entire season, because that relates more to the crypto crowd... season should be the default", 30 Oct.

## How this skill learns (owner, 2026-10-30)

- A pick is a direction, not a lock (owner: "it doesn't mean, oh, okay, that means lock this down"): keep refining the picked take, and keep checking it against this skill.

Every time the owner gives pointers and an iteration lands, update this file the same day:
- Ask why the new version is better, find the general reason, and add it as a numbered lesson with what taught it.
- Do not copy the pointer itself. "Remove the US chip" is a pointer; "two carriers for one fact" is the lesson.
- If a new lesson contradicts an old one, rewrite the old one rather than stacking both.
- Commit the change with the work it came from.

## How to work with it

- **Before the first mockup,** write a three-line brief per element:
  - **story:** the conflict or stakes in one line;
  - **facts → carriers:** which visual carries each fact;
  - **words left:** only what no picture can say.
- **Then make several genuinely different takes,** each with a different carrier or metaphor, not a re-skin.
- **Mockups by default** (owner, 2026-10-30): every proposal arrives with its mockups; do not ask whether to make them. Ask a clarifying question whenever a phrase in the owner's brain dump can be read two ways, alongside the mockups.
- **Propose, don't wait.** When an element on the page fails the test, say so and mock up the fix, even if the owner didn't mention it.
- **Say how it could fail.** The usual case: a viewer doesn't decode the visual without text. Analytics are off, so the only test is a person looking at it; ask the owner.
