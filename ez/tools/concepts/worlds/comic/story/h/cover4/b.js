/* B · The page: the first screen is page one of the comic, read panel by panel on the page's own cream stock (gutters).
   Title tier, then one panel per step, each a founder acting it (cast2 moments): 1 the four heads with their real calls in balloons,
   2 the close: the round's winner crowned beside one who went the wrong way, the move as a sound effect, 3 the leader holding the
   golden ticket, 4 the leader before the chip, lettered Bet #1: NVIDIA. */
(function(){const C=C4,e=C.esc,ex=C.ex,K=C.CAST;
 const ORD=['GPT','KIMI','CLAUDE','GROK'];
 const head=m=>{const c=C.call(m);return `<div class="b-h b-h-${m.toLowerCase()}${c&&!c.up?' b-mir':''}"><div class="b-hi">${C.img(K+'a-'+m.toLowerCase()+'-predict.jpg','',C.NM[m]+' thinking')}</div>${c?C.balloon(c,'b',m.length*5):''}<b class="b-nm">${e(C.NM[m])}</b></div>`};
 const wins=ex.calls.filter(c=>C.won(c.m)).map(c=>c.m),fails=ex.calls.filter(c=>!C.pass(c)).map(c=>c.m);
 const L=ex.pending?['GROK','GPT']:[wins[0]||ex.calls.find(c=>C.pass(c)).m,fails[0]||ex.calls.find(c=>!C.won(c.m)).m];
 const p2=ex.pending?L.map(m=>C.img(K+'a-'+m.toLowerCase()+'-wait.jpg','',C.NM[m]+' waits for the bell')).join(''):
   `<div class="b-w">${C.img(K+'a-'+L[0].toLowerCase()+'-win.jpg','',C.NM[L[0]]+' crowned')}<span class="b-tag ok">${e(C.NM[L[0]])} ${wins.includes(L[0])?'wins':'passes'}</span></div><div class="b-w">${C.img(K+'a-'+L[1].toLowerCase()+'-lose.jpg','',C.NM[L[1]]+' stamped fail')}<span class="b-tag no">${e(C.NM[L[1]])} fails</span></div>`;
 const setting=C.ld==='grok'?'a-grok-setting.jpg':'a-'+C.ld+'-ticket.jpg';
 const html=`<div class="b-pg">
  <div class="b-t">${C.issue('b-iss')}${C.head('b-h1')}</div>
  <div class="b-cl b-cl1">${C.step(0,'b-c b-cs').replace('</span></p>',`<small class="b-cr">Round ${ex.n} · ${C.coName}</small></span></p>`)}<div class="b-p b-p1 c4-pn"><div class="b-hs">${ORD.map(head).join('')}</div></div></div>
  <div class="b-cl b-cl2">${C.step(1,'b-c b-cs')}<div class="b-p b-p2 c4-pn"><div class="b-ws">${p2}</div>${ex.pending?'':C.bang(C.mv(ex.a),11,'b-mv '+(ex.a>=0?'up':''))}</div></div>
  <div class="b-row">
   <div class="b-cl">${C.step(2,'b-c b-cs')}<div class="b-p b-p3 c4-pn">${C.img(K+'a-'+C.ld+'-ticket.jpg','',C.ldName+' holds the golden ticket','50% 30%')}<b class="b-ld">${C.ldName}</b></div></div>
   <div class="b-cl">${C.step(3,'b-c b-cs')}<div class="b-p b-p4 c4-pn">${C.img(K+setting,'',C.ldName+' before the NVIDIA chip','50% 35%')}${C.bet('b-bet')}</div></div>
  </div>
 </div>`;
 C.build('b',html);C.ready()})();
