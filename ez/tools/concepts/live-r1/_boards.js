/* live-r1 boards: lays the shots out on a plain HTML board and screenshots it into ez/ */
const fs=require('fs');
const PILL=[
 ['NOW','Today\'s pill','"Next: SK" on phones, "Next: SK Hynix (000660.KS)" on desktop. True, but static: it reads the same on Friday at 1pm, after the bell and on Saturday.'],
 ['A','The bug','A broadcast scorebug: how many rounds are in play, what happens to them, the clock to the 4pm New York close. Shows: rounds at the bell / calls due today / on the next card (UPCOMING, PENDING, resolves date), the bell from Intl. Critique: the clearest at a glance; the countdown only shows when a close actually grades something.'],
 ['B','The crawl','A ticker inside the pill: today\'s card, the last close\'s results (move, winner), the season count. Starts still, crawls after 2.5 s, a hover or tap holds it, still with reduced motion. Critique: most "TV", but 108px of moving text in the corner of the eye is the distraction NN/g warns about and needs a pause (WCAG 2.2.2); weakest on phones.'],
 ['C','Departures','A split-flap board: round number, company, status ("Calls due", "Bell 2h51m", "Results soon", "Mon card"). Flaps settle on load and when the status changes, never on a timer; a tap flips to the next round of the day (1/8). Critique: the most "it changes" without constant motion; tile text is small on a 320px phone.'],
 ['D','Now serving','A ticket stub torn from the roll: "Now serving No. 46-53, calls due" / "No. 43-45, bell 2h 51m"; desktop adds a stub with 45 graded / 71 to come. Critique: the most at home in the ticket world and the number visibly climbs every sync; a range reads less sharply than one number.'],
 ['E','The session','The trading day as a dial (phones) or a bar 9:30 to 4:00 (desktop) that fills while the market is open, a bell at the end, words for what the bell does today. Critique: the only one that moves with the clock itself; on a day when the bell grades nothing (Mon) it still counts down, which can imply an event that is not ours.']];
const PAGE=[
 ['P1','The wire','A slim strip under the header (scrolls away with the page): today\'s card lit gold, the last close\'s results with the winner and how far off, the season count. Swiped by a thumb, never moves by itself.',[['page-P1-mon-390-0.png',0,560],['page-P1-fri-390-0.png',0,560]],['Mon 1:09 pm','Fri 1:09 pm (rebuilt)']],
 ['P2','Freshness lines','A red date stamp on the record ("Graded through Fri Oct 23 close", from the newest resolves date) and on the board (what that close did: each AI\'s calls that day, whether the order changed). The sync time is shown dashed: it needs SYNCED_AT in ez-data.js before it can go on the page.',[['page-P2-mon-390-0.png',90,650],['page-P2-mon-390-1.png',150,710]],['The record, Mon','The standings, Mon']],
 ['P3','Stamps on the cards','Rubber stamps on the record cards whose state changed at the last close or changes today: "Fresh · Graded · Fri close" (green), "Bell in 2h 51m" on cards with calls in, "Today · Calls due" on today\'s rounds. Worked out from the dates, so they come off by themselves.',[['page-P3-mon-390-0.png',90,650],['page-P3-fri-390-0.png',90,650]],['Mon: R45 graded Fri','Fri 1:09 pm: R43 at the bell']],
 ['P4','The week on the card','Five day stubs under the film, Mon to Fri of this week, with each day\'s rounds (by call date): past days show what is graded, today is lit, and a season count closes it (45 graded, 0 with calls in, 71 to come).',[['page-P4-mon-390-0.png',380,940],['page-P4-fri-390-0.png',380,940]],['Mon: 39 rounds this week','Fri 1:09 pm (rebuilt)']]];
const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const CSS=`body{margin:0;background:#e9e4d8;font:15px/1.4 Barlow,system-ui,sans-serif;color:#1b181c}
.b{padding:28px 32px 36px}h1{font:400 34px/1 Anton,Impact,sans-serif;letter-spacing:.02em;margin:0 0 6px;text-transform:uppercase}
.sub{margin:0 0 22px;color:#4d463c;max-width:1500px}.o{background:#fff;border:2px solid #1b181c;box-shadow:4px 4px 0 #1b181c;padding:14px 16px 16px;margin:0 0 20px}
.o h2{margin:0 0 4px;font:400 24px/1 Anton,Impact,sans-serif;text-transform:uppercase;letter-spacing:.02em}.o h2 i{font-style:normal;background:#f2b632;padding:0 8px;margin-right:8px}
.o p{margin:0 0 10px;max-width:1540px;color:#3a342c}.r{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}.c small{display:block;font:700 12px/1 Barlow,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#6a5f4c;margin:0 0 5px}
.c div{background-repeat:no-repeat;border:1px solid #1b181c}`;
function cell(f,x,y,w,h,label,S){const im=S+f;return `<div class="c"><small>${esc(label)}</small><div style="width:${w}px;height:${h}px;background-image:url('file://${im}');background-size:auto;background-position:-${x}px -${y}px;zoom:1"></div></div>`}
module.exports=async function(b,S,EZ){
  /* pill board: crops in CSS px of 2x shots; background-size halves them */
  const bg=(f,x,y,w,h,label,full)=>`<div class="c"><small>${esc(label)}</small><div style="width:${w}px;height:${h}px;background-image:url('file://${S+f}');background-size:${full}px auto;background-position:-${x}px -${y}px"></div></div>`;
  let h=`<div class="b"><h1>Live, round 1 · the header pill</h1><p class="sub">Five redesigns of the "Next" pill on the real X2+ page, each fed only by ez-data.js and the clock (the 4pm New York close via Intl). Moments: Mon Oct 26 1:09 pm ET (data as it stands: 45 graded, 8 calls due today, none in yet) · Fri Oct 23 1:09 pm and 4:20 pm ET (rebuilt from the sheet: R43 to R45 with calls in, before and after the bell) · Sat Oct 24 11 am ET. Phones hold 108px beside the logo and the X (96px at 320); every shot measured: no sideways scroll, no overlap.</p>`;
  for(const [k,n,d] of PILL){h+=`<section class="o"><h2><i>${k==='NOW'?'Now':k}</i>${esc(n)}</h2><p>${esc(d)}</p><div class="r">`+
    bg(`pill-${k}-mon-390.png`,0,0,390,58,'390 · Mon 1:09 pm',390)+bg(`pill-${k}-fri-390.png`,190,0,200,58,'Fri 1:09 pm',390)+bg(`pill-${k}-bell-390.png`,190,0,200,58,'Fri 4:20 pm, after the bell',390)+
    bg(`pill-${k}-sat-390.png`,190,0,200,58,'Sat 11 am',390)+bg(`pill-${k}-mon-320.png`,0,0,320,58,'320 · Mon',320)+`</div><div class="r" style="margin-top:10px">`+
    bg(`pill-${k}-mon-1280.png`,40,0,740,61,'1280 · Mon 1:09 pm',1280)+bg(`pill-${k}-fri-1280.png`,40,0,740,61,'1280 · Fri 1:09 pm',1280)+`</div></section>`}
  h+='</div>';
  await shoot(b,h,EZ+'x2p-live-r1-pill.png',1640);
  let g=`<div class="b"><h1>Live, round 1 · page-wide elements</h1><p class="sub">Four ways to show the season moving, each in place on the real page at 390px, from ez-data.js and the clock only. Left: Mon Oct 26 1:09 pm ET as the data stands; right: Fri Oct 23 1:09 pm ET rebuilt from the sheet (R43 to R45 with calls in) unless labelled. Measured at 320, 390 and 1280px: no sideways scroll.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:0 20px">`;
  for(const [k,n,d,shots,labs] of PAGE){g+=`<section class="o"><h2><i>${k}</i>${esc(n)}</h2><p>${esc(d)}</p><div class="r">`+shots.map((s,i)=>bg(s[0],0,s[1],390,s[2]-s[1],labs[i],390)).join('')+`</div></section>`}
  g+='</div></div>';
  await shoot(b,g,EZ+'x2p-live-r1-page.png',1700);
};
async function shoot(b,html,out,W){const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});
  const f='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv/board-'+require('path').basename(out,'.png')+'.html';
  fs.writeFileSync(f,`<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@500;700&display=swap" rel="stylesheet"><style>${CSS}</style>${html}`);
  await require('./_fonts.js')(p);await p.goto('file://'+f);await p.waitForTimeout(1500);await p.screenshot({path:out,fullPage:true});await p.close();console.log('board',out)}
