// Round 33, Avg miss boards: composes the shots made by ../launch-r33-avgmiss.js (now, ring, punch, stamp, card at 320/390/1280,
// device scale 2) into ez/x2p-launch-r33-avgmiss-1.png (390px, today beside the four), -2.png (close-ups at twice the pixels) and
// -desktop.png (1280px). usage: node board.js [shotdir]
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const IN=process.argv[2]||S+'am/',OUT=path.join(__dirname,'..','..','..');
const uri=f=>'data:image/png;base64,'+fs.readFileSync(IN+f).toString('base64');
const O=[
 ['now','Today','Bright white discs and flat red rings with crisp outlines; black dots with white rims. On cream card it reads as a sticker laid on top: white ink does not sit on cream like that.'],
 ['ring','1 · Ring die','The target is the card: rings blind-debossed (no ink, only the die\'s shadow and lip), ring numbers in small red ink. Each call an ink dot stamped into the stock, a red x for the wrong way. Each AI\'s average is one ring: red ink, dashed; the leader\'s in hot-foil gold.'],
 ['punch','2 · Conductor\'s punch','A fare-stage ticket: printed stages 0 to 12+% off and a red "Wrong way" stage. Every call is a hole punched through the card in its stage, the night showing through; each AI its own punch shape, as each conductor\'s was. One scale for all four. A printed caret marks the average, foil for the leader.'],
 ['stamp','3 · Scorer\'s card','A ruled scoring form printed in ink. Every call a rubber-stamped tally stroke in its column (within 1%, 1 to 3%, 3 to 6%, over 6%), the wrong way in red ink; the count printed small above each. The average pressed in the last column, foil for the leader.'],
 ['card','4 · Punched card','Each AI\'s season as a data card with 0 to 9 printed in every column: one column per round, the hole punched out of the digit for how many % off (closest at the top), the wrong way in a red row at the foot. Also shows when: holes moving up over the season means closer calls.']];
const css=`body{margin:0;background:#0b0a14;color:#efe6d2;font:500 15px/1.4 "Barlow",sans-serif;padding:34px 36px 40px}
h1{font:400 34px/1 Anton,Impact,sans-serif;letter-spacing:.02em;text-transform:uppercase;margin:0 0 6px;color:#f3ead6}
.lede{margin:0 0 26px;max-width:1500px;color:#cfc6b2}.lede b{color:#f2b632;font-weight:600}
.row{display:flex;gap:26px;align-items:flex-start}.c{flex:none;display:grid;gap:9px;align-content:start}
h2{font:400 21px/1 Anton,Impact,sans-serif;letter-spacing:.03em;text-transform:uppercase;margin:0;color:#f2b632}.c.now h2{color:#a49fb4}
.c p{margin:0;color:#d6cebb;font-size:13.5px;line-height:1.38}img{display:block}
.src{margin-top:26px;color:#a49fb4;font-size:12.5px;max-width:1700px}.src a{color:#a49fb4}`;
const head='<link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@500;600&display=swap" rel="stylesheet"><style>'+css+'</style>';
const sources='Research: blind emboss and deboss read through light and shadow alone (<a>barnardandwestwood.com/blind-embossing-debossing</a>, <a>support.jukeboxprint.com blind letterpress</a>); foil sits on the sheet in a shallow impression (<a>en.wikipedia.org/wiki/Hot_stamping</a>); each railway conductor\'s punch made its own shape so a ticket could be traced (<a>si.edu/object/nmah_1061199</a>, <a>en.wikipedia.org/wiki/Ticket_punch</a>); fare stages printed in numbered boxes and punched (<a>en.wikipedia.org/wiki/Bell_Punch</a>); punched cards print the digits 0 to 9, the zone rows are unprinted (<a>homepage.divms.uiowa.edu/~jones/cards/codes.html</a>, <a>computinghistory.org.uk/det/1425</a>); position along a common scale is read most accurately (Cleveland and McGill; <a>en.wikipedia.org/wiki/Graphical_perception</a>).';
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
 const shoot=async(html,file,w)=>{const p=await b.newPage({viewport:{width:w,height:400},deviceScaleFactor:1});await p.setContent('<!doctype html><html><head>'+head+'</head><body>'+html+'</body></html>');
   await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:file,fullPage:true});await p.close()};
 // 1: the phone, at the size a phone shows it (the 2x shots drawn at half size)
 const card=(o,w,suf)=>'<div class="c'+(o[0]==='now'?' now':'')+'" style="width:'+w+'px"><h2>'+o[2-1]+'</h2><p>'+o[2]+'</p><img src="'+uri(o[0]+suf)+'" style="width:'+w+'px"></div>';
 await shoot('<h1>Avg miss, printed into the card</h1><p class="lede">Owner, 2026-10-24: the targets "still feel like they\'re slapped on to the piece of paper". Four ways to make every mark a print process on the ticket\'s own card. <b>The page\'s own numbers</b> (every call\'s % off, the averages: Grok 3.77%, GPT 4.54%, Claude 4.65%, Kimi 4.98%); gold only for the view\'s leader; the band question and the four folder tabs kept. 390px phone, every option the same height as the other three views.</p><div class="row">'+O.map(o=>card(o,358,'-390.png')).join('')+'</div><p class="src">'+sources+'</p>',OUT+'/x2p-launch-r33-avgmiss-1.png',2040);
 // 2: close-ups at twice the pixels: the top half of each view, where the print detail shows
 const {execSync}=require('child_process');
 for(const o of O){execSync(`python3 -c "from PIL import Image;i=Image.open('${IN+o[0]}-390.png');i.crop((22,165,i.width-22,585)).save('${IN+o[0]}-close.png')"`)}
 await shoot('<h1>Close up, at twice the pixels</h1><p class="lede">The same 390px phone, the top of each view at the 2x pixels a phone draws: the deboss\'s shadow and lip, the stamped ink\'s voids, the punched holes\' cut edge, the foil only on the leader.</p><div class="row" style="flex-wrap:wrap;row-gap:30px">'+O.map(o=>'<div class="c'+(o[0]==='now'?' now':'')+'" style="width:672px"><h2>'+o[1]+'</h2><img src="'+uri(o[0]+'-close.png')+'" style="width:672px"></div>').join('')+'</div>',OUT+'/x2p-launch-r33-avgmiss-2.png',2140);
 // desktop: the 1280px page's ticket (600px wide)
 await shoot('<h1>Avg miss at 1280px</h1><p class="lede">The proof ticket is 600px wide on desktop; the same height as the other three views.</p><div class="row" style="flex-wrap:wrap;row-gap:30px">'+O.map(o=>'<div class="c'+(o[0]==='now'?' now':'')+'" style="width:600px"><h2>'+o[1]+'</h2><img src="'+uri(o[0]+'-1280.png')+'" style="width:600px"></div>').join('')+'</div>',OUT+'/x2p-launch-r33-avgmiss-desktop.png',1960);
 await b.close();console.log('boards written')})();
