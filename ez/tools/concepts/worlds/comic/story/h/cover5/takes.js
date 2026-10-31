/* cover5 takes: one painted world each. Slots in % of the plate (x, y, w, h), r = turn, k = skewY, fs = font size in cqw of the plate.
   p = the 9:16 phone plate, l = the 16:9 desktop plate. Measured on img/<take>-p.jpg and -l.jpg with a 5% grid. */
window.C5T={
/* 1 · The Palace: a 1930s movie palace in the rain. The marquee carries the title, the four poster cases are the cast with their calls
   on the poster cards, the box office glass carries the close, the brass tray holds the golden ticket, the pavement the next feature. */
marquee:{alt:'A movie palace at night: the marquee, the four models on poster cases, the box office',
 p:{slots:[
  {t:'mq',x:6,y:7.6,w:88,h:16.6,html:'<h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1><span class="c5-iss"><b>Season 1</b> · <i>No. 80 graded</i></span>',fs:6.6},
  {t:'step:0',x:5,y:25.6,w:90,h:3.2,fs:3.2},
  {t:'call:KIMI,n',x:4.6,y:50.4,w:19,h:5.3,fs:3.3},{t:'call:CLAUDE,n',x:28.6,y:50.6,w:19,h:5.3,fs:3.3},{t:'call:GPT,n',x:52.6,y:50.6,w:19,h:5.3,fs:3.3},{t:'call:GROK,n',x:76.6,y:50.6,w:19,h:5.3,fs:3.3},
  {t:'step:1',x:2.5,y:65.5,w:28,h:9,fs:2.9},
  {t:'close',x:35,y:64.5,w:27,h:11,fs:4.6},
  {t:'tkp',x:43.7,y:76.7,w:13.6,h:3.6,fs:2.5,html:'<span class="c5-tk"><b>Grok</b></span>'},
  {t:'step:2',x:68,y:65.5,w:29.5,h:9,fs:2.9},
  {t:'step:3',x:8,y:84,w:84,h:3,fs:3.2},
  {t:'bet',x:8,y:88,w:84,h:9,fs:8,html:'<span class="c5-bet"><em>Next feature</em><b>Bet #1: NVIDIA</b><small>The first of many</small></span>'}]},
 l:{slots:[
  {t:'mq',x:6.5,y:12,w:55,h:15,r:-9.6,fs:3.1,html:'<h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1><span class="c5-iss"><b>Season 1</b> · <i>No. 80 graded</i></span>'},
  {t:'step:0',x:8,y:79,w:48,h:3,fs:1.2},
  {t:'call:KIMI,n',x:9.5,y:71,w:8,h:5.6,fs:1.35},{t:'call:CLAUDE,n',x:20.6,y:71,w:8.6,h:5.6,fs:1.35},{t:'call:GPT,n',x:32.6,y:71,w:8.8,h:5.6,fs:1.35},{t:'call:GROK,n',x:45.6,y:71,w:9.2,h:5.6,fs:1.35},
  {t:'step:1',x:77,y:14,w:20,h:10,fs:1.15},
  {t:'close',x:66.6,y:47.5,w:14.4,h:18,fs:1.9},
  {t:'tkp',x:68.8,y:66,w:6.4,h:3,fs:.95,html:'<span class="c5-tk"><b>Grok</b></span>'},
  {t:'step:2',x:62,y:71.5,w:24,h:6,fs:1.15},
  {t:'step:3',x:30,y:84,w:42,h:3,fs:1.25},
  {t:'bet',x:30,y:88,w:42,h:10,fs:3.4,html:'<span class="c5-bet"><em>Next feature</em><b>Bet #1: NVIDIA</b><small>The first of many</small></span>'}]}},

/* 2 · Fight night: the ring is the competition. Four corners, four fighters, their calls printed on the canvas by each corner,
   the close in the middle of the ring, the jumbotron's three faces carry the title, the ring card is the golden ticket and the next bout. */
arena:{alt:'Fight night: a boxing ring under one light, a model in each corner, the bell and the ring card',
 p:{slots:[
  {t:'jf',x:34.5,y:3.5,w:32,h:15.5,fs:5.6,html:'<h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span><br>trade<br>earnings</span></h1>'},
  {t:'jl',x:19,y:4.5,w:14.5,h:14,k:9,fs:3.1,html:'<span class="c5-h1b">Who calls<br>it best?</span>'},
  {t:'jr',x:67.6,y:4.5,w:15,h:14,k:-9,fs:3.1,html:'<span class="c5-iss"><b>Season 1</b><br><i>No. 80</i></span>'},
  {t:'step:0',x:3,y:23,w:44,h:6,fs:2.8},{t:'step:1',x:54,y:23,w:43,h:6,fs:2.8},
  {t:'call:KIMI,n',x:17,y:48.6,w:19,h:5.4,r:-18,fs:3.3},{t:'call:CLAUDE,n',x:64,y:48.6,w:19,h:5.4,r:18,fs:3.3},
  {t:'close',x:37,y:51.5,w:26,h:6,fs:4},
  {t:'call:GPT,n',x:20,y:62.5,w:20,h:5.6,r:16,fs:3.5},{t:'call:GROK,n',x:60,y:62.5,w:20,h:5.6,r:-16,fs:3.5},
  {t:'card',x:50,y:80.8,w:28,h:12,r:13,fs:3.1,html:'<span class="c5-tk"><em>Golden ticket</em><b>Grok</b><small>Next bout: Bet #1 NVIDIA</small></span>'},
  {t:'step:2',x:2,y:93,w:47,h:3,fs:2.6},{t:'step:3',x:51,y:95.5,w:47,h:3,fs:2.6}]},
 l:{slots:[
  {t:'jf',x:31,y:2.5,w:38,h:16,fs:2.4,html:'<h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'jr',x:79,y:3,w:19,h:8,fs:1.4,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80</i></span>'},
  {t:'call:CLAUDE,n',x:29,y:40,w:16,h:7,r:-6,fs:2},{t:'call:GROK,n',x:55,y:38,w:16,h:7,r:6,fs:2},
  {t:'close',x:41,y:51,w:20,h:7,fs:1.9},
  {t:'call:GPT,n',x:26,y:65,w:17,h:8,r:8,fs:2.2},{t:'call:KIMI,n',x:62,y:63,w:17,h:8,r:-8,fs:2.2},
  {t:'card',x:72.5,y:79,w:24,h:15.5,r:9,fs:1.5,html:'<span class="c5-tk"><em>Golden ticket</em><b>Grok</b><small>Next bout: Bet #1 NVIDIA</small></span>'},
  {t:'step:0',x:1.5,y:4,w:27,h:4,fs:1.05},{t:'step:1',x:1.5,y:9.5,w:27,h:4,fs:1.05},{t:'step:2',x:1.5,y:15,w:27,h:4,fs:1.05},{t:'step:3',x:1.5,y:20.5,w:27,h:4,fs:1.05}]}},

/* 3 · The floor at the bell: an exchange hall. The big wall board is the title and the next bet, each trading post's display
   is a model's call, the balcony cornice carries the close by the bell, the four steps are carved in the plinth under the golden ticket. */
floor:{alt:'An exchange floor at night: the bell, the wall board, four trading posts and the golden ticket under glass',
 p:{slots:[
  {t:'wb',x:23.5,y:4,w:57,h:17,fs:5.2,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80 graded</i></span><h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade<br>earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'close',x:30,y:23.6,w:66,h:3.6,fs:3.2,html:null},
  {t:'call:KIMI,n',x:1.5,y:31.8,w:21,h:4.6,fs:3.1},{t:'call:CLAUDE,n',x:28.4,y:31.8,w:18,h:4.6,fs:3.1},{t:'call:GPT,n',x:54.4,y:31.8,w:18,h:4.6,fs:3.1},{t:'call:GROK,n',x:77.6,y:31.8,w:19.4,h:4.6,fs:3.1},
  {t:'tkp',x:40,y:71,w:22,h:5.6,r:-2,fs:3.4,html:'<span class="c5-tk"><em>Golden ticket</em><b>Grok</b></span>'},
  {t:'rules',x:16,y:84.5,w:68,h:13,fs:2.75,html:'<span class="c5-rules">'+[0,1,2,3].map(i=>'<span class="c5-st"><b>'+(i+1)+'</b><span>'+['They predict the move <u>before</u> earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'][i]+'</span></span>').join('')+'</span>'},
  {t:'bet',x:10,y:57,w:80,h:3.5,fs:3.2,html:'<span class="c5-bet"><b>Behind the vault door: Bet #1 NVIDIA</b></span>'}]},
 l:{slots:[
  {t:'wb',x:52,y:2,w:44,h:20,fs:2.3,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80 graded</i></span><h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'close',x:20,y:15,w:28,h:6,r:-10,fs:1.4},
  {t:'call:KIMI,n',x:6,y:23,w:16,h:6.5,fs:1.4},{t:'call:CLAUDE,n',x:32,y:28.5,w:14,h:6,fs:1.4},{t:'call:GPT,n',x:52.5,y:33.5,w:13,h:5.5,fs:1.3},{t:'call:GROK,n',x:69.8,y:33.5,w:12,h:5.5,fs:1.3},
  {t:'tkp',x:79.6,y:68.5,w:6.4,h:9,r:-4,fs:.9,html:'<span class="c5-tk"><em>Golden ticket</em><b>Grok</b></span>'},
  {t:'rules',x:3,y:83,w:52,h:15,fs:1.2,html:'<span class="c5-rules">'+[0,1,2,3].map(i=>'<span class="c5-st"><b>'+(i+1)+'</b><span>'+['They predict the move <u>before</u> earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'][i]+'</span></span>').join('')+'</span>'},
  {t:'bet',x:83,y:76,w:16.5,h:7,fs:1.7,html:'<span class="c5-bet"><em>Vault</em><b>Bet #1: NVIDIA</b></span>'}]}},

/* 4 · The game show: the reveal board is the title and the answer (the close), each contestant's podium shows a name on its top screen
   and the locked-in answer on its front, the prize on the plinth is the golden ticket, the curtain hides the next prize. */
show:{alt:'A TV game show: the reveal board, the four models at their podiums, the golden ticket on a plinth before the curtain',
 p:{slots:[
  {t:'board',x:11,y:4.5,w:78,h:23,fs:6.4,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80</i></span><h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade<br>earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'name:KIMI',x:5.4,y:50.4,w:17.4,h:3,fs:2.7},{t:'name:CLAUDE',x:32,y:50.4,w:16.6,h:3,fs:2.7},{t:'name:GPT',x:57.8,y:50.4,w:16.4,h:3,fs:2.7},{t:'name:GROK',x:83,y:50.4,w:14.4,h:3,fs:2.7},
  {t:'call:KIMI',x:4,y:57.4,w:17.6,h:10.6,fs:5},{t:'call:CLAUDE',x:31.6,y:57.4,w:16.4,h:10.6,fs:5},{t:'call:GPT',x:57.6,y:57.4,w:16.4,h:10.6,fs:5},{t:'call:GROK',x:82.6,y:57.4,w:15,h:10.6,fs:5},
  {t:'strip',x:2,y:68.6,w:96,h:2.2,fs:2.3,html:'<span class="c5-st"><b>1</b><span>Locked in <u>before</u> earnings</span></span><span class="c5-st"><b>2</b><span>The close reveals the answer:</span></span>'},
  {t:'close',x:3,y:28.8,w:94,h:2.8,fs:2.8,html:null},
  {t:'tkp',x:31.6,y:75,w:36.8,h:10.4,r:-1,fs:4.2,html:'<span class="c5-tk"><em>The prize · golden ticket</em><b>Grok</b><small>#1 on the leaderboard</small></span>'},
  {t:'step:3',x:8,y:89.2,w:84,h:3,fs:2.8},
  {t:'bet',x:10,y:92.6,w:80,h:6.4,fs:5.2,html:'<span class="c5-bet"><em>Behind the curtain</em><b>Bet #1: NVIDIA</b></span>'}]},
 l:{slots:[
  {t:'board',x:9.5,y:6,w:61.5,h:29,fs:3.2,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80 graded</i></span><h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'call:KIMI,n',x:7,y:64,w:13.4,h:20,fs:2.1},{t:'call:CLAUDE,n',x:30.6,y:64,w:13,h:20,fs:2.1},{t:'call:GPT,n',x:47,y:64,w:12.6,h:20,fs:2.1},{t:'call:GROK,n',x:64,y:64,w:11.6,h:20,fs:2.1},
  {t:'close',x:9.5,y:89,w:66,h:5,fs:1.5,html:null},
  {t:'tkp',x:81.2,y:51.8,w:14,h:8,r:-9,fs:1.25,html:'<span class="c5-tk"><em>Golden ticket</em><b>Grok</b></span>'},
  {t:'bet',x:80.5,y:66,w:19,h:12,fs:1.9,html:'<span class="c5-bet"><em>Behind the curtain</em><b>Bet #1: NVIDIA</b></span>'},
  {t:'steps',x:76,y:83,w:23.5,h:15,fs:1,html:[0,1,2,3].map(i=>'<span class="c5-st"><b>'+(i+1)+'</b><span>'+['They predict the move <u>before</u> earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'][i]+'</span></span>').join('')}]}},

/* 5 · Race night: the tote board posts the four entries and their calls, the photo finish is the close,
   the winner's-circle plaque is the golden ticket, the betting-window plate is the next bet. */
track:{alt:'Race night: the tote board, the four models racing to the finish, the winner\'s circle',
 p:{slots:[
  {t:'tote',x:14.2,y:4.8,w:72.6,h:21.6,fs:3.3,html:['KIMI','CLAUDE','GPT','GROK'].map(m=>'<span class="c5-row" data-m="'+m+'"></span>').join('')},
  {t:'crest',x:39,y:.4,w:22,h:2.6,fs:1.9,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80</i></span>'},
  {t:'sky',x:3,y:26.4,w:94,h:4.4,fs:3.7,html:'<h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'close',x:12,y:53.4,w:76,h:4.6,fs:3.4,html:null},
  {t:'tkp',x:42.4,y:64.3,w:17.4,h:4.6,fs:2.6,html:'<span class="c5-tk"><em>Golden ticket</em><b>Grok</b></span>'},
  {t:'rail',x:3,y:58.4,w:94,h:5.4,fs:2.4,html:[0,1,2,3].map(i=>'<span class="c5-st"><b>'+(i+1)+'</b><span>'+['They predict the move <u>before</u> earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'][i]+'</span></span>').join('')},
  {t:'bet',x:31.4,y:92.4,w:41,h:5.4,fs:3,html:'<span class="c5-bet"><em>Betting window</em><b>Bet #1: NVIDIA</b></span>'}]},
 l:{slots:[
  {t:'tote',x:3,y:13,w:31,h:30,fs:1.35,html:['KIMI','CLAUDE','GPT','GROK'].map(m=>'<span class="c5-row" data-m="'+m+'"></span>').join('')},
  {t:'sky',x:38,y:3,w:30,h:17,fs:2.1,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80</i></span><h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'close',x:38,y:23,w:30,h:6,fs:1.4,html:null},
  {t:'tkp',x:75,y:8.8,w:14.4,h:8.6,r:-4,fs:1.25,html:'<span class="c5-tk"><em>Golden ticket</em><b>Grok</b></span>'},
  {t:'rail',x:66.6,y:66,w:23,h:14.6,fs:.95,html:[0,1,2,3].map(i=>'<span class="c5-st"><b>'+(i+1)+'</b><span>'+['They predict the move <u>before</u> earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'][i]+'</span></span>').join('')},
  {t:'bet',x:66.6,y:81,w:23,h:9,fs:1.6,html:'<span class="c5-bet"><em>Betting window</em><b>Bet #1: NVIDIA</b></span>'}]}},

/* 6 · The studio: the cover is a live sports show. The film plays on the big studio screen, the four monitors over the pundits show
   their calls, the desk's lower third carries the title, the on-air box the season, the gold card on the desk the golden ticket. */
studio:{alt:'A TV sports studio: the film on the big screen, the four models at the desk under their monitors',
 p:{slots:[
  {t:'film',x:12.4,y:4.4,w:75.4,h:21.8,html:'<span class="c5-filmslot"></span>'},
  {t:'step:0',x:4,y:26.6,w:92,h:3,fs:2.8},
  {t:'call:KIMI,n',x:6.4,y:30.6,w:20.4,h:7.2,fs:3.4},{t:'call:CLAUDE,n',x:29,y:30.6,w:20.6,h:7.2,fs:3.4},{t:'call:GPT,n',x:51.4,y:30.6,w:20.6,h:7.2,fs:3.4},{t:'call:GROK,n',x:74,y:30.6,w:20.6,h:7.2,fs:3.4},
  {t:'close',x:4,y:62.2,w:92,h:4.6,fs:3.1,html:null},
  {t:'chy',x:16,y:68.9,w:70,h:5.4,fs:4.4,html:'<h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'onair',x:28.6,y:75.8,w:26.4,h:4,fs:2.4,html:'<span class="c5-iss"><b>On air · Season 1</b> · <i>No. 80</i></span>'},
  {t:'tkp',x:61.8,y:66,w:10.8,h:13.6,fs:2.4,html:'<span class="c5-tk"><em>Golden<br>ticket</em><b>Grok</b></span>'},
  {t:'steps',x:3,y:82,w:94,h:16,fs:2.7,html:'<span class="c5-st"><b>2</b><span>The market close grades every prediction</span></span><span class="c5-st"><b>3</b><span>#1 on the leaderboard holds the golden ticket</span></span><span class="c5-st"><b>4</b><span>We follow its call on every bet:</span></span><span class="c5-bet"><b>Bet #1: NVIDIA</b></span>'}]},
 l:{slots:[
  {t:'film',x:31.2,y:3,w:38,h:24.5,html:'<span class="c5-filmslot"></span>'},
  {t:'scr',x:4.5,y:3.6,w:24.5,h:20,fs:2,html:'<span class="c5-iss"><b>Season 1</b> · <i>No. 80</i></span><h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>'},
  {t:'scr2',x:71,y:3.6,w:25,h:20,fs:1.06,html:'<span class="c5-st"><b>1</b><span>They predict the move <u>before</u> earnings</span></span><span class="c5-st"><b>2</b><span>The market close grades every prediction</span></span><span class="c5-st"><b>3</b><span>#1 on the leaderboard holds the golden ticket</span></span><span class="c5-st"><b>4</b><span>We follow its call on every bet</span></span>'},
  {t:'chy',x:12,y:86.2,w:78,h:5.6,fs:1.6,html:['KIMI','CLAUDE','GPT','GROK'].map(m=>'<span class="c5-cw" data-m="'+m+'"></span>').join('')},
  {t:'close',x:30,y:78.6,w:40,h:4.4,fs:1.3,html:null},
  {t:'onair',x:14.6,y:66.6,w:15.4,h:5.4,fs:1.05,html:'<span class="c5-iss"><b>On air</b> · <i>Bet #1: NVIDIA next</i></span>'},
  {t:'tkp',x:68.2,y:67.4,w:5,h:9.6,r:4,fs:.62,html:'<span class="c5-tk"><em>Golden</em><b>Grok</b></span>'}]}},
};
