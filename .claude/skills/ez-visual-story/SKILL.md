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

0. **Comic first, never a dashboard in costume (the owner has had to say this on almost every round).** My first drafts come out as spreadsheets because I start from the data (a grid of labelled boxes: a header strip, "Bulls ▲" over a list, a value beside a label) and only then skin it. Start the other way round, from the characters acting: each AI is a character who *says* its call in a balloon, the bull 🐂 and the bear 🐻 are characters too, the market close is an event with a sound effect, the round is a beat in a story. Layout follows the beat, not a table. Before showing anything, check it against "Meet the models", the one section the owner calls a comic: a character on a ticket, its flag waving behind it, its words on a tilted caption box, and nothing else. Reject a draft that has any of these:
   - a box nested in a box, or a labelled container holding a list (a dashboard widget);
   - a white or pale empty rectangle, or a container bigger than its content (one call in a box sized for four);
   - label-and-value pairs where a character could say the thing ("Kimi: up 1.5%" in a balloon beats "BULLS ▲ / Kimi +1.5%");
   - a card with no character, no action and no comic device (balloon, caption, sound effect, motion lines, a drawn gesture);
   - the same structure repeated so the page reads as rows of a table.
   Fun to read matters as much as easy to read: the information is wrapped in the joke, the face, the gesture.
   Hard rules added 30 Oct, evening, after the owner had to repeat them again ("you keep making the same mistake... those learnings are definitely not getting through"):
   - **No white or pale backgrounds inside a module**, unless the owner asks for one. A module's ground is art, colour or the scene itself.
   - **No dead space.** Every container hugs its content; a panel is filled edge to edge by its art or its content; gutters are tight, like a comic page's. Measure it before showing (empty area per card), do not eyeball it.
   - **Never lay content over a logo or over the art's subject.** People recognise the logo first; predictions sit beside or around it, lettered into the scene, never stickered on top.
   - **No native emoji** (🐂 🐻 and the like). If a symbol is needed it is drawn in the comic's own line and colour.
   - **A pattern is not a background.** Ben-Day dots and halftones carry shading or meaning in places; a whole module filled with dots reads as "pyjamas".
   - **Name and ticker together** wherever a company is labelled (the stub, the tag), never the ticker alone.
   - **Before any board reaches the owner,** check every module against this list and fix what fails; say in the report which checks ran.
   - **Briefs pass on the want, never the owner's throwaway example as an instruction.** The 30 Oct brief quoted "emojis for bulls and bears... just as an example" as the fix, and every helper drew emojis; this list and its checks go into every brief.
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

46. **Decide what the audience compares before deciding how it moves.**
    - Ask first how this crowd already reads the thing (crypto traders compare traders by P&L over a time window), then show exactly that, in their word: "P&L" printed beside the figure, the window named.
    - A derived number on top of the primaries (the gap between two P&Ls the viewer can already see) is one number too many unless it is the story itself (lesson 36).
    - The animation comes last: it serves the comparison, not the other way round.
    - *Taught by:* "what are we trying to portray here? How do the crypto people usually look at P&L comparison between traders?... I don't know if the gap is really that relevant... there should be P&L somewhere there", 30 Oct.
47. **Read every screen as a stranger who just landed.**
    - What is obvious to us (whose money, over what time, why these two) is not obvious to someone who does not know the project. Each view must say what it is showing in its own labels, without the explanation further up.
    - *Taught by:* "it's not instantly clear. To me, yes. But to most... they don't know what this project is about", 30 Oct.
48. **The participants are the best ground.**
    - Painting a panel in the colours of the ones competing in it (Grok's black, Claude's orange, each in its own corner) makes the rivalry visible before any word and fills the space with meaning instead of texture. A large comic rendering of a participant's own mark can do the same.
    - Generalise: when a panel is about someone, let their identity be the ground (lesson 14 at the scale of the whole panel; it is the cure for lesson 22).
    - *Taught by:* "I like the fact that it just has the background colors of the models... these are probably first principle thinking that can be applied elsewhere", 30 Oct.
49. **The climax must land like a comic beat.**
    - When the result is revealed, the comic's own impact language carries it: the winner crowned, the wrong side hit by a lettered FAIL with a smack, as a panel would draw a punch. A quiet fade wastes the moment the whole page builds to.
    - *Taught by:* "when the close gets revealed... he gets crowned, and then all the others were fail... there needs to be like a slap", 30 Oct.
50. **Where a mark sits tells what it means.**
    - A face in a tile's top corner reads as "who this is about", not "who won". A result belongs where results are printed (the stamp on the ticket's stub, beside the move), so the reader does not have to guess the convention.
    - *Taught by:* "people might think, why is the logo in the top right?... the stamp should go here", 30 Oct.
51. **An interaction must work on the device in the hand.**
    - Hover and "plays as you pass" depend on a mouse or on slow scrolling; on a phone they either never fire or become autoplay. Design the phone behaviour first, then add desktop extras.
    - *Taught by:* "the glance moves once you pass... on desktop that's fine, on mobile I don't think that'll work", 30 Oct.
52. **An example chosen to explain must be calm and typical, not the loudest.**
    - A walkthrough teaches through its example, so the example should show the rule plainly (a clear split of right and wrong) in a picture that does not compete with the explanation. Spectacle belongs in the record, not in the lesson.
    - *Taught by:* "maybe we use another card because this one is very in your face... it screams LSD", 30 Oct.

53. **No unprinted paper inside the comic.** A white or blank panel reads as a default widget, not a page of the world, and empty corners read as unfinished. Every ground is printed by something from the story (the ticket stock, a halftone in a participant's colour, the market's green and red); keep it calm enough to read.
    - *Taught by:* "I'm just not a big fan of white backgrounds... the module itself that encompasses everything is a bit horrible", 30 Oct.
54. **A control and its effect belong in the same view.** If a filter changes something further down, the visitor must see the filter while looking at the change, or the change reads as random.
    - *Taught by:* "you should be able to filter... as you scroll down to the scoreboard as well, because it's not directly obvious that the scoreboard is directly changing", 30 Oct.
55. **Animate on comprehension, not on arrival.** An explaining animation starts when the panel is fully read, and moves slow enough to follow beat by beat; if it is over before the reader knows what they are looking at, it explained nothing.
    - *Taught by:* "by the time I understood what I was looking at, the animation sort of already happened", 30 Oct.
56. **A clip starts at the question, not at the setup.** When a film illustrates one step, play only the part that step is about (here: calls already up, market about to resolve), so the reader spends seconds, not twenty.
    - *Taught by:* "the animation should happen midway through... so they don't have to watch the entire 20 seconds", 30 Oct.
57. **The headline number sits where the eye lands first.** On a ranked card, the figure people compare (P&L) goes beside the name with its percentage, and the supporting stats line up evenly beneath it.
    - *Taught by:* "PNL needs to go up here. And then it also needs to say the percentage... the W-L should be in the middle", 30 Oct.
58. **A comparison needs a shared axis.** When the visitor's job is to compare contestants, each stat must sit in one column across all of them, stacked, so the eye runs down it and the order shows at once. Rich separate objects (cards in a grid) make the eye hunt left, right and down. Put the craft into the rows, not into separate objects.
    - *Taught by:* the scoreboard's 2x2 cards on desktop: "with a traditional leaderboard... you can instantly compare them... with one glance", 30 Oct.
59. **When two windows share a screen, every figure names its window, and one view has one rank.** An unlabelled "P&L" under a "Last 24 hours" switch reads as the 24-hour figure; a season rank on the stub and a window rank on a sticker give one card two places.
    - *Taught by:* "it should say season P&L... so users understand that that is the total", 30 Oct.
60. **Judge every big element at its biggest size.** A raster logo blown up past its native pixels, or a display face that looks lively at phone size, turns cheap on a desktop. Draw marks at or below their native resolution, and check the type at the largest size it will be drawn.
    - *Taught by:* the Amazon main event on desktop: "super low definition... on a big screen this font actually doesn't make sense", 30 Oct.
61. **Literal fixes give increments; a committed direction gives the wow.** Following the owner's words point by point only improves the page a step at a time. Read what the words point at, then pick one tradition or idea and take it all the way, as an expert in it would, before the owner asks. Show several such leaps side by side, each complete, rather than one careful variation of today's page.
    - *Taught by:* "as soon as you try to stick too much to what I'm saying, the improvements are incremental... trust my gut... go away and do something amazing, that's always the wow", 30 Oct.
62. **Unfold at reading speed: one change per beat, and the beat says what happened.** A comic reads because each panel holds while the eye takes it in. Motion that lands every stamp at once is a slideshow at 4x. Reveal one fact per beat, hold it long enough to read (about 2 s or a tap), and let the motion itself explain the fact (the bell rings, then the needle moves, then the stamp lands), never decorate it.
    - *Taught by:* "the unfolding happens too fast for a human to visualize and understand what is happening... every animation explains exactly what's happening", 30 Oct.
63. **The last frame of a section introduces the next.** A page is one journey, not a stack of modules: end each section on the beat that opens the following one (a round ends by joining the record, "every round stays here", and the record begins). The reader is handed forward, never dropped.
    - *Taught by:* V3's "round 56 joins the record... see every round", which the owner wants "from section to section", 30 Oct.
64. **The owner's noun is a pointer, not the design.** When the owner names a device ("a tiny crown"), ask what job it does, then pick the treatment that does that job best in this design, which may not be the named one. Picking the literal device because the owner said it is the incremental trap of lesson 61.
    - *Taught by:* the leader mark: the owner picked X2 gold leaf over X1 tiny crown, which I had recommended "because that's what I told you", 30 Oct.
65. **Every line must be true of the product.** Genre copy that does not fit ("Collect all four!" where nothing is collected) breaks the spell and reads as filler. Borrow a tradition's devices, never its claims.
    - *Taught by:* Z4's checklist, 30 Oct.
66. **The art is the design; the frame only serves it.** The films are interior-level art made for each company; the page's own elements must reach that level (drawn, lit, from inside the scene), or be built from that art. A box of text beside good art is the overlay the owner keeps rejecting.
    - *Taught by:* "think about the animation production... every single video we do... unfolding from within the environment... every element has been thought through and crafted", 30 Oct.

67. **A comic is its art, not its chrome.** Flat fills, thick even outlines, hard offset shadows and a comic font are the costume of a comic; on their own they read as a child's layout. A real comic page is rendered: forms modelled by light (key, fill, rim), volume, materials, perspective and depth, with the ink and halftone as a layer on top (the Spider-Verse recipe: 3D realism under a comic layer). Before calling something "comic", ask where its light comes from and what it is made of; if the answer is "a CSS box", it is not there yet.
68. **A reference is a source of elements, never an asset to paste.** When the owner shows a picture or a film as the look, take it apart into what it is made of (where the light falls, which materials, how deep the set is, which marks a viewer remembers) and design the module out of those elements, from scratch, with its own data. Pasting the reference's frames into the page answers "make it look like this" with "here it is again" and designs nothing.
69. **Depth the owner calls "high level" is built into each element, not laid over the module.** The owner rated the pop cover's extruded "EARNINGS ZEASON" (a gradient fill, a thick ink outline, a stacked solid extrusion, a thin highlight) as high level, and the same card with only a new surface (halftone in the shade, misregistration) as "just a change in colour". When a module should look crafted, rebuild every element inside it (titles, names, numbers, labels, badges, the frame) with its own volume, light and outline; a texture pass over flat content does not read as a change.
70. **Hand-drawn detail is many small irregularities, not one clean effect.** A stock comic page beats a code-drawn one by density: letters each at their own size, angle and baseline with halftone inside them; dots that grow with the shadow; tapered ink strokes instead of even rays; bursts and clouds with inner layers; elements breaking the panel borders; thick outer and thin inner lines; no empty stretch. A single even effect (one font string, one dot grid, one sunburst) reads as a template, however bright. Before showing a comic board, zoom in and compare it letter by letter with a real page.
71. **The loudest treatment is spent once per section.** Extruded 3D pop lettering, gloss and bursts belong to the section's headline only; on every element they compete and nothing reads first (owner, 2026-10-31: "otherwise it pops too much"). Inner elements still get handmade detail, but in a quieter craft (ink line, cut paper, stamp, screen-print, hand lettering), so detail and hierarchy coexist. Rank each element by importance before choosing its treatment.
72. **Hand-tuned by default, painted where code cannot paint.** The default for every element is hand-tuned shapes, drawn one by one; a generic effect is the exception that needs a reason (owner, 2026-10-31: "speed is trade off for quality"). Painted scenes, characters and textures come from Hedra; each is placed for one job (a section's establishing shot, a character, a prop), and its finish is chosen per section (3D with comic ink, pop art, anime cel, noir ink), held together by the brand's colours and one ink line. Never assume one finish for the whole page.
73. **New quality in one piece raises the bar for its neighbours.** When one element reaches painted quality (the die count, the doors), the plain boxes beside it suddenly read as cheap. Redesign the whole module and its neighbours to the same level: the module's shape, material and how it formats the facts, not just the element in it (owner, 2026-10-31: "reinvent means rethink it from scratch... the module itself has to be reinvented").
    - *Taught by:* "why isn't there... 3D realism, but with a layer of American comic... it feels like... a child designed the page... where's the modeling", 31 Oct, after all ten quick-fire takes were rejected.
74. **Established assets are givens, never re-invented.** Once the owner has made or picked an asset (the four founder characters, the films' art, a picked layout), every new direction builds on it; replacing it with a new invention reads as generic, "a traditional website cheaply made using AI" (owner, 2026-10-31, on robot oracles drawn when the founders already existed). A fresh-eyes brief must still hand over the cast and the picks as fixed.
75. **The picture of a round shows its outcome.** A tile or thumbnail stands for what happened (the winner crowned, the move revealed), not the setup before it; the setup makes every tile look alike and hides the reason to tap (owner, 2026-10-31: "the thumbnail... should be the outcome... the end frame").
76. **The pieces that already work set the style for the rest.** When one section reaches the bar (the painted rack, the die count), the next round copies its language (its finish, palette and density) rather than starting a new metaphor per section; a backdrop in a different style (the doors) reads as a different site (owner, 2026-10-31: "it has a different style to... the NVIDIA bet or Every round so far").
77. **Simplify before decorating.** When several rich takes all miss, the fix is usually fewer, clearer elements in the layout that already works, each redesigned, not more objects (owner, 2026-10-31, on five first screens: "it just needs to be a bit more simplified"). And show the real data in every example: a row of question marks tells the visitor nothing.

78. **When the content already works elsewhere, re-render it rather than invent a metaphor for it.** Six new metaphors for "smart or lucky" (fog, coins, an ad, jars, a monitor, a drag strip) all asked the visitor to learn a new picture; the owner wanted the P&L dashboard people already read on the Leaderboard, drawn in the comic's own craft. A chart people know, painted into the world, beats a clever picture they must decode (lesson 23). Out of the Fog was liked for the chart in it, not for the fog.
    - *Taught by:* "none of them speak to me... why not just have the P&L dashboard... re-rendered... my favorite one is Out of the Fog, because it has charts", 31 Oct.
79. **The page is one comic; the cut between sections is part of the design.** A section is a panel of one book, not a box on a scroll. Design the gutter and the arrival of each section (a "Meanwhile..." caption, a page turn, a splash, an abrupt cut) with the same care as the section, and give each panel its small, quiet life once it is there (lesson 32). A strong section that sits in its own world (a different ground) breaks the book, however good it is (lesson 27).
    - *Taught by:* "the background of the website itself is essentially supposed to be the comic... one box at a time... a unified storybook" and "small animations, small visual effects... that's what brings the comic alive", 31 Oct.

80. **Never put a code-drawn object beside painted ones.** Next to painted, lit pieces, an object drawn in code (a vector lamp, a CSS cone) reads as a placeholder, however tidy; once a section is painted, every object in it comes from the same painted source (owner, 2026-10-31, on the loading lamps: the drawn one was "horrible... not even worth a try"). The same goes for a stand-in picture where the real subject is missing: show the subject itself, crafted (a round with no film shows its company's logo, painted), never a generic scene.

81. **A painted object takes live data through its painted parts, not through a box laid on it.** The proof ticket works when the painting is the paper itself (border-image with the bands and teeth kept whole and the sides repeating) and every word and number sits inside its painted frame as page text; it would read pasted on as a card floated over the painting. Paint the object empty, cut it out, and let the page write on it. Measure the painted frame (band heights, inner rule) and pad the text inside it, or figures touch the printed line.

80. **Integrated means the scene would have made the mark itself.** A chart, a balloon or a number laid over a painting reads as pasted however good both are. In the scene it takes the scene's light and reflections, its perspective, its material (grease pencil on glass, a trace etched in a board, chalk on a slate, a balloon inked in the panel's own line), and it is partly covered by what stands in front of it. Before showing anything, ask: could this mark exist in that place, made by someone in it?
    - *Taught by:* "the charts look like they've been just pasted on top of the background"; "the background does not feel part of the predictions"; the prediction circles on the card back "look super cheap compared to the rest", 31 Oct.
81. **One book, many inks.** A comic can change its finish from chapter to chapter (the Overview in 3D with comic ink, the Leaderboard in noir) as long as the story, the cast and the cuts hold it together; the change of ink then marks a new chapter instead of a different site (lesson 27's "a change of world must be itself the point"). And a character's pose can carry the outcome: crowned when it won, hit by the FAIL when it went the wrong way.
82. **A section on the page's paper reads as a module laid on a table.** The NVIDIA section worked because the vault, the countdown chip and the parts list share one lit world; the cream page paper showing at its sides was the one thing that broke it. Each chapter owns its ground edge to edge (its colour from the logo: black, green, red, gold, all dark), so the reader moves from one world into the next instead of from box to box. Where two grounds meet is a cut and is designed like one (lesson 79).
83. **Rough first, paint last.** Painted layers are expensive and slow to revise; a coded or primitive mockup is cheap and settles the composition, the words and the order. Show the rough versions, let the owner pick, then have Hedra paint only the picked one, with the rough as its reference. A caption box from an older style (the yellow V1 captions) is the first thing to go when a section gets its own world: the scene says it, or the words become part of the scene.
84. **The bet section is the floor.** Every section must reach its finish before anything else is added to it: painted plates as crisp as a 2K/4K film frame, one light, live numbers living inside the picture (a diegetic display, like the countdown in the chip's dies), and three panels that each state one thing (the place, the clock, the machine). Do not animate, decorate or re-word a section that has not reached that finish: redesign it from the ground up first, one section at a time. Words laid over a painting by code read as pasted on; when words must live in a picture, have Hedra paint the surface they live on (a blank plate, sign or ring) and set the text into it.
85. **Every number needs a surface.** A figure lit or printed on nothing (the fight-night cover's calls floating in the air over the ring) reads pasted on however good the painting is. The test: name the object in the scene the number is printed, chalked, lit or engraved on. If there is none, the world has to grow one (a scorecard in a hand, a ring card, an arena board), or the number leaves that picture.
86. **What can be touched shows it can be touched.** In a painted world nothing looks clickable by default, so every interactive object gets a small motion of its own kind that draws the eye (a lamp that pulses, a lever that twitches, a cover that lifts a little, a key that glows), quiet, slow and never more than one per view, and it stops once used. Motion is how the scene says "this one is for you".
87. **The cast is introduced in its own chapter.** Putting the four founders on the cover spends the reveal before the reader is ready for it; the cover sells the world and the question, and the characters first appear where they are met (Meet the models). The same holds for any big reveal: show it where the story introduces it, not earlier.
88. **Drawn, not rendered.** The bar is the vault (`ez/media/bet-vault-h2.jpg`): brush and ink, heavy blacks, dry brush, splatter, a spot colour carrying the light. A world painted with smooth surfaces and photographic light reads as 3D realism even with comic lettering on top, and it breaks the book. Ask the painter for the drawn look first, and show every take in more than one drawn style so the style can be picked apart from the world.
89. **Ration the cast.** Once the characters exist, putting one on every tile spends them: a face everywhere stops meaning anything. Show who won with the world's own marks (a cover line, a crown on a sign, gold on the winner's call) and keep the faces for the places where a character is the point.
90. **Let the picture make the claim.** A sentence that tells the reader what a chart says ("a coin does that 1 time in 45") crowds the view and takes the fun away. If the chart can't make that point by itself, fix the chart, then cut the sentence.
91. **One voice per page.** A page keeps one heading face across its chapters (on the Overview, the bet chapter's Bangers heading). Each world may bring its own type only on another tab. A new face per section makes a page read as a collage, not a book.
92. **Data surfaces face the reader and stay sharp.** A chart, scoreboard or slate is seen head-on, never tilted away. Its marks and labels are as crisp as the NVIDIA chip's digits: no glow, blur or bloom on the mark itself, and nothing crosses a label or runs past the bezel. Keep each label on one line, name then value, so it doesn't stack into a column of crowded words.
93. **Order is narrative.** Each chapter introduces what the next one needs: names on the cover, faces in Meet the models, then the record, then the test, then the stakes. Decide a section's world from what comes before and after it (fight night, then gambling, then the bet), not on its own.
94. **Good ideas that don't fit go on the shelf, labelled.** A strong idea for the wrong place (the Hall of Fame for the Overview) is kept for the place and moment it fits (a later tab, between seasons) and written down. The owner wants things to ship over time.
95. **Teach by doing.** A visitor learns a loop fastest by running it: each step is one object that asks to be touched and opens onto one fact (the letter opens to the predictions, the bell rings the result, the ticket turns to the leader). Four labelled squares explain; four objects in one world let the visitor do it.
96. **Transitions belong to the world.** A code wipe between two paintings breaks the spell, because the eye sees the seam. The move from one scene to the next is a painted event: a door that opens, a ticket that turns. Make it painted or filmed (in-between frames, a short generated clip), or don't do it at all.
97. **The logo is the style guide.** The EZ. logo (flat badge, black ground, a few spot colours, hard slanted shapes) and the vault (brush ink, black, one gold light) are one family: mostly black, a few logo colours carrying the light, hard edges. Realism, beige and stock effects fall outside it however polished they are.
98. **Mood is a fact.** Dark, heavy noir says "risk, stakes, money on the line", so it belongs where the stakes are (the bet). The record, the cast and the test are a show and should be bright and flashy. Lighting a whole site in noir makes every chapter read as danger, and the bet loses its weight.
99. **Every chapter has three beats, like a film scene:** (1) an establishing picture that says what the chapter is about and makes its claim (the vault = the pool); (2) the live instrument, with the data in the world (the timer in the chip); (3) a short visual beat on why it matters, with one or two lines at most. A chapter without beat 1 or 3 is a chart without a reason to look at it.
100. **Few, fresh, and more coming.** "Latest" is felt through scarcity and a gap: show only the newest few (four on the wire), and hang blank sheets for the prints still to come. The empty slots say "this is ongoing" with no words. The full archive sits below for anyone who wants it.
101. **When the owner prefers today's version, redraw it, don't replace it.** Today's layout already carries the facts in the right proportions. The failure was the finish (code-drawn boxes) and the missing world, not the structure. Keep the real estate, paint every element by hand, and build the place it lives in.
102. **The card is about its subject; a person is a face behind it.** On Meet the models the model is the subject (name, record, origin); the founder is the living portrait in the frame. Featuring the person over the thing being tracked turns a record into a celebrity page.
103. **Scroll is the interaction; motion only shows a flow.** A comic is read by turning on, not by poking. Tap-to-unfold objects and clips that play on tap ask the reader to work before they understand, and they pile up into noise. The reader scrolls through panels. Each panel shows its fact at once, and at most one small loop shows a fact moving (fees running into the pool).
104. **Facts are painted on the world; voices are balloons.** A number that describes the world belongs on the object (69% engraved on the pool's rim), not in a paragraph under it. A sentence someone says ("The pool gets bet on the top AI's call") goes in a speech balloon or a narration caption drawn into the panel. Plain text outside the picture is what is left when neither fits, so keep it to almost nothing.
105. **Narration sits in the panel's top-left corner, not under it.** In comics the narrator's caption box overlaps the top-left of the panel it introduces, and is read before the picture. A line set as a paragraph under the picture is read last, as a footnote, and looks pasted on. Put the context line in a lettered caption box on the panel's corner.
106. **Size follows the job.** The establishing picture sets the mood, but the instrument (the chart, the timer) carries the facts. When the opener is as big as the instrument it steals the reader's attention and their screen. Keep the opener smaller (about two-thirds) and give the room to the live thing.
107. **Correct is not memorable.** A take can follow every rule (format kept, numbers on surfaces, a world behind) and still not stand out. Every chapter needs one striking idea: a hero moment, scale contrast, dramatic light or a camera angle. Check every board for the one frame someone would screenshot.
108. **One style, taken from what works.** When one section lands (the bet's chip and vault), its art style becomes the style of every section: the same kind of picture (one real object, painted comic, one warm key light, a black void), the same palette, the same lettering. A new world for each chapter breaks the book apart, and each world costs the owner a new decision.
109. **Fewer beats beat more ideas.** The top of a page needs two beats and the film: what we do (one picture, one headline) and how it works (one panel of four frames). Every extra world, object or animation is one more thing to judge before anything can ship. When a round of mockups keeps growing, cut back to the smallest sequence that tells the story, and fix the page one section at a time.
110. **The subject is the AI; the person is the animated layer.** The models are what trades, so they are drawn as what they are (a chip, a die). The founder caricature lives inside that object as the moving, funny layer: a glimpse through the glass. It earns attention without becoming the focal point. A picture that leads with the face turns the record into a celebrity page.
111. **Every object obeys the world it's in.** A bell on a circuit board breaks the chip world, however clearly it says "the close". Before drawing an object, ask whether it could exist in this world, and find this world's own version of the idea (on a chip, a buzzer and a readout). A metaphor that has to leave the world to make its point costs more belief than it gains in clarity.
112. **One typeface, hierarchy by size and colour.** Heads that do the same job share one size. Labels sit a clear step between the heads and the body. A second role gets a different colour, not a different face: new typefaces read as new worlds, and several of them make a page look assembled.
113. **"Pasted on" means the text has no process.** Words on an object look laid over it when they ignore its surface: flat colour, no grain, no light, edges too clean. Make each label the way that object would carry it (etched, silkscreened, stamped, printed into the ceramic), with the surface's texture and light running through the letters. Apply this to every label on the object, not only the one the owner pointed at.
114. **Compact when the job is comparing.** When the reader's task is to compare (four models, their records), put them side by side in one beat: one row each, the same columns. Spreading them across several beats turns comparing into remembering. Keep the separate beats for introducing one thing at a time.
115. **Motion only where it carries something.** A pulse that means nothing is a distraction, and a still, well-shaded object reads calmer and more crafted. Animate a state change or an invitation to act; leave the rest still.
116. **Narration stays outside the world; facts live inside it.** A word that explains the page to the reader ("1 Call") is the narrator speaking. Printed on the object, it reads as part of the object ("it's on the chip, what does that mean?"). Put the narrator's words in the comic's own narration layer (heads, caption boxes, numbered sub-heads), and put the data on the objects.
117. **Number anything that has an order.** A 2×2 grid can be read across or down. When the sequence is the point, number it, so the order can't be misread.
118. **Gutters carry the structure, weighted.** The gap between beats and the gap between frames say different things, so they must look different: a strong, drawn break between beats, a lighter one between frames. A flat line gives no rhythm. Draw both in the world's material.
119. **Repeated parts get identical geometry.** When several objects share a layout (four chips, four cards), every common part has the same size and position on each, measured to the pixel. Small differences read as sloppiness, and they break comparison. Generate one master and vary only the colour and the content, not separate paintings.
120. **Show the fact; make it feel alive, don't hide it behind a tap.** The NVIDIA timer works because the number is there at once, big and lit, and its seconds tick. The reader gets "this matters" from the word and the picture together. Facts that need a tap to appear are facts most people never see. Keep the facts visible and add life with small effects native to the object: a display that flickers or re-scans, a glint on gold, a blinking cursor. Make the number the face of the picture.
121. **One world per page, one universe across pages (conceptual integrity).** Decide a world's rules once (its objects, its light, its materials, its rendering, its perspective, its type, its motion), make every element obey them, and break them only on purpose, for the one thing that must be seen. Every element must be explainable by the same rules as its neighbours ("what is this physically, and where does its light come from?"). The principle is universal. The world is chosen per page: the Overview lives on the chip and in the vault, and the Leaderboard may get a world of its own. What never changes from page to page: the data (one source, the sheet), the words for the same thing, the logo, the core palette, the nav, the voice and the meaning of every gesture. Like a comic universe drawn by different artists: different worlds, one canon.
122. **The design questions to ask yourself, every section, before showing it** (owner, 2026-11-01: "what other questions am I not asking in design... you have to ask yourself those questions instead of me"):
   1. *Hierarchy:* what is the one thing a visitor must take away, and is it the biggest, brightest thing?
   2. *Sequence:* what came just before, and what does this hand over to?
   3. *Words:* front-loaded, parallel, one term per concept, label rather than explain.
   4. *Motion:* does anything move without a reason? Does every state change show?
   5. *Interaction:* what looks touchable, and is it? What answers a touch?
   6. *Return:* why would someone come back tomorrow? What has changed since their last visit, and when is the next bell?
   7. *Trust:* can a sceptic check this fact without trusting us (the sheet, the X post's time, a hash)?
   8. *Share:* what does a screenshot of this look like on X? What does its link card show?
   9. *Edge states:* no calls today, a tie, nobody right, a missing film, after the NVIDIA date, a new model joining.
   10. *Data honesty:* scales, sample sizes, and no picture happier than the numbers.
   11. *Reach:* legible at 320px one-handed, with reduced motion, with a screen reader, on a slow phone.
   12. *Feeling:* where are the suspense, the reveal and the payoff?
    - *Taught by:* "you can change the character's style depending on what sections they're showing up in... the leaderboard tab can have a different style itself, can have like noir ink"; "when they fail, hit by the fail... you can do that one", 31 Oct.

123. **One member of a set reads as the whole set.** A frame that shows only the leader can read as "this is the only one". Show the field first, then mark the leader inside it: the rank is a relation, so the picture must hold everything that is being ranked. When the last frame of a sequence introduces what comes next, make it the payoff of the sequence (the "oh, this looks sick" moment) and the doorway to the next section.
    - *Taught by:* owner, 2026-11-02, on BOARD showing only Grok on the gold lid: "people could misunderstand it as, ooh, grok is the only model. So maybe there should be a board... and then it introduces them to the meet the models section."

124. **Use the domain's own verbs.** Say what the visitor already knows how the thing works in: a trade "goes long or short", "the close ends every trade", "every trade is written to the ledger". Generic process words ("submit predictions", "grades them") make a trader translate. One verb per frame, parallel lines, the same noun all the way down (trade, trade, trade). This is the floor for every line on the page.
    - *Taught by:* owner, 2026-11-02, on the four frame lines rewritten in the trade's words: "the wording was 10 times better this time. If that could be the new floor."
125. **Introduce, don't inform.** A card that presents a character carries who it is (its face, big, and one sentence of personality drawn from its real behaviour) and one fresh fact that shows the season is live (its last round, this week). Histories, streaks and full records belong on the board people come back to check. Only the character moves; every other part is still, so the eye goes where the uniqueness is.
    - *Taught by:* owner, 2026-11-02, on Meet the models: "the characters to be bigger... just having the character animated here is good enough... the numbers is quite a lot to take in... last five should be something in the leaderboard... last round with a company logo... the last 7 days, so people understand there's time in this... each character's personality gets reflected through one sentence."

126. **An insight is a true, surprising, checkable fact, wrapped in the world.** Each one has four parts:
    - the claim, in one sentence;
    - the number behind it;
    - its sample ("on 72 calls"), so a sceptic can weigh it;
    - a way back to the rounds that prove it.

    Then it gets the same craft as everything else, so it's worth coming back to: some visitors return for the look, some for the insight, and the insight only keeps them if it holds up. Beauty must never lend a weak pattern more trust than its sample earns. A pattern a coin could produce in 80 rounds is not an insight. Say so, or leave it out. Databases (Crunchbase, CB Insights) show everything and explain nothing. We show few things, each one meant.
    - *Taught by:* owner, 2026-11-02: "it's essentially turning it into interesting insights... information you want to come back to because it's unique... wrapped in a beautiful way... they might just come back for the insights because they feel trustworthy or because the way the insights are presented... is what makes it valuable."

127. **Every rule names what it rests on.** A rule is universal when it rests on the reader or on logic, things that don't change with the page:
    - perception: contrast, grouping, motion pulling the eye, reading order;
    - memory limits;
    - honesty with numbers: scales, samples, chance.

    A rule depends on the use case when it rests on a goal, an audience or a medium:
    - density (compact when comparing, spacious when introducing);
    - one world per page;
    - dark for the bet, bright elsewhere;
    - brand voice.

    Before applying a rule, ask "what does this depend on?" If the answer is the reader or the truth, apply it everywhere. If it is the job of the page, check that the job is the same here; if it isn't, say which condition fails and choose again.

    Universal rules still have edges: reading direction is cultural, and "seven plus or minus two" is overstated. So even universal rules are stated with their reason, never as slogans. New lessons from here on say which kind they are.
    - *Taught by:* owner, 2026-11-02: "I do not know what laws or rules or mental frameworks, human-derived mental frameworks, are use-case dependent and which ones aren't. So when do you apply some? When do you apply others that are... universal?" (Earlier: "for the overview page, that is correct. For the leaderboard page it depends... So it's use case dependent or no?")

128. **Set up the next section, then pay it off** (universal: anticipation and reveal). The last beat of a section can show the next section's objects with their facts withheld, lit with placeholders ("–") and only the identity filled in (the face). The visitor learns the shape first ("this is a leaderboard") and gets the numbers as the reward one scroll later. It is the comic's page-turn: the panel before the reveal.
    - *Taught by:* owner, 2026-11-02, on frame 4: "illuminate the cards with the placeholder of '-' where numbers or data will appear to then see them 'reveal' in the meet the models section... set up the next section but making them understand it's a leaderboard."
129. **Colour is introduced by a character and carried forward** (use-case dependent: a page with recurring characters). The page opens in one colour (the chip's green). Each model brings its own colour when it is introduced, and later sections borrow those colours, so colour itself tells the story of who joined. A section's theme is earned, never a random accent.
130. **A section shows a hero and a handful, not the archive** (universal: attention). Up top, one item worth looking at (the latest, or the best by a stated rule), then a short row of recent ones, then a control to see more. The whole archive at once tells the visitor "there is a lot" and nothing else.
131. **Data marks get the room, labels follow the colour** (universal: data-ink). When each series has its colour and the table under the chart names the colours, a label column beside the chart only steals width from the lines. Let the chart run to the edge.
132. **A control must look like a control, and nothing else may** (universal: affordance). If the switch does not read as tappable, and decorative knobs and buttons do, the visitor taps the wrong thing or nothing. One obvious control; decoration that looks pressable is removed.
133. **Stillness is a choice, not a lack** (use-case dependent: dense explainer frames). Where the frames carry numbers to read, motion competes with reading and costs the phone. Show every fact at once and keep it still; motion goes only where it carries a fact the still picture cannot.
134. **What the eye sees is not what the phone pays for** (universal: rendering). A layer drawn under a perspective transform is rastered at its own laid-out size; a small panel laid out at painting size can cost a phone tens of megabytes and black out the page. Lay surfaces out at the size they show, times the pixel ratio.
135. **The picture the eye lands on must carry its own sentence** (universal: attention goes to pictures first). A caption under a busy painting gets skipped, and the meaning with it. Fuse the words into the picture, or show the words first and the picture after, one focal thing per beat.
136. **Rank is position and size, not a numeral** (universal: reading order). A leaderboard reads top to bottom with #1 largest; four equals side by side read as a set, not an order.
137. **The overview shows, the tab lets you choose** (use-case dependent: a landing with a detail tab). Selectors, windows and filters ask a newcomer a question they can't answer yet. Show the one view they must see; put the choices where people come to explore.
    - *Taught by:* owner, 2026-11-02: "green at the beginning dominates, when you get to the model sections you introduce other colors through each model's chip background color that can then be used for the next sections."

## How this skill learns (owner, 2026-10-30)

- A pick is a direction, not a lock (owner: "it doesn't mean, oh, okay, that means lock this down"): keep refining the picked take, and keep checking it against this skill.

Every time the owner gives pointers and an iteration lands, update this file the same day:
- Ask why the new version is better, find the general reason, and add it as a numbered lesson with what taught it.
- Do not copy the pointer itself. "Remove the US chip" is a pointer; "two carriers for one fact" is the lesson.
- If a new lesson contradicts an old one, rewrite the old one rather than stacking both.
- Commit the change with the work it came from.

## How to work with it

- **Rewrite the prompt before answering it** (owner, 2026-10-30: "think about what I want, not what I say... take my prompt and write a better version of it based on what you think I want or need... then answer it"). The owner is not an expert in animation, design or production, and a brain dump says what he noticed, not always what he needs. For any long or open prompt:
  1. Read it for the want under the words: the job the change does for a visitor, the feeling he is reaching for, the problem behind the symptom he pointed at.
  2. Write the prompt an expert in that field would have written for the same want (the specialist's terms, the constraints that matter, what good looks like), and show it to him in a few lines at the top of the reply, so he can correct the reading before it costs a round.
  3. Answer that prompt, leading the design: go past the literal ask where the want calls for it, and say where you did.
  - **Guardrails:** his explicit asks, locks and "keep this" stay unless you flag why one fights the want; a word that could be read two ways still gets a question (the ask-don't-assume rule), asked alongside the mockups; the data rules never bend.
- **Before the first mockup,** write a three-line brief per element:
  - **story:** the conflict or stakes in one line;
  - **facts → carriers:** which visual carries each fact;
  - **words left:** only what no picture can say.
- **Then make several genuinely different takes,** each with a different carrier or metaphor, not a re-skin.
- **Settle words with pictures before mockups** (owner, 2026-10-31: "I only have one word to say it because I am not a specialist... keep generating these images if you need me to answer questions"): when a word could mean several things ("3D", "modules", "alive"), show a small board of reference pictures (the site's own films and assets first) labelled with what each one means, get a yes or no per picture, then build.
- **Converge by quick-fire** (owner, 2026-10-30): on a new direction, first show about ten quick, rough, very different versions side by side; the owner picks one "but not entirely"; iterate outward from that one; repeat until it converges. Breadth first, polish after the pick.
- **Mockups by default** (owner, 2026-10-30): every proposal arrives with its mockups; do not ask whether to make them. Ask a clarifying question whenever a phrase in the owner's brain dump can be read two ways, alongside the mockups.
- **Propose, don't wait.** When an element on the page fails the test, say so and mock up the fix, even if the owner didn't mention it.
- **Say how it could fail.** The usual case: a viewer doesn't decode the visual without text. Analytics are off, so the only test is a person looking at it; ask the owner.
