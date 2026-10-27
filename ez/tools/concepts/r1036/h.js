/* r1036 header bar concepts (owner, 2026-10-27, night: "morphing elements from our logo into a ticketized version of the headline bar...
   or history about tickets... something that was pasted on top of tickets"). The board's header row (it shares the tickets' columns)
   holds "Season 1" + Live over the rank and AI columns and W-L / Hit rate / P&L over their own; window.__hV picks the object:
   A tax stamp (admission-tax stamps were pasted on tickets and torn through at the gate), B season book cover (1890s season tickets came
   bound in a leather book), C the logo (black, the green and red slashes leading in as on the logo, the gold square), D dating press (Edmondson tickets were dated
   in a press as they were issued), E pad header (a ticket pad's glued chipboard top). */
(function(){var V=window.__hV,d=document,h=d.querySelector('#standings .lbh'),ol=d.querySelector('#standings ol.lbl');if(!h||!ol)return;
 var live=window.__live!=null?window.__live:(function(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"2-digit",month:"numeric",day:"numeric",weekday:"short"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  if(p.weekday==="Sat"||p.weekday==="Sun")return false;var t=+p.month+"/"+(+p.day)+"/"+p.year,nd=function(s){var q=String(s||"").split("/");return q.length===3?(+q[0])+"/"+(+q[1])+"/"+q[2].slice(-2):""};
  return [].concat(ROUNDS,PENDING,UPCOMING).some(function(r){return nd(r.called)===t||nd(r.resolves)===t})}catch(e){return false}})();
 var dt=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",month:"short",day:"numeric"}).format(new Date()).toUpperCase();
 var lv=live?'Live':'Off air',s=d.createElement('span');s.className='hb-s';s.setAttribute('aria-hidden','true');
 s.innerHTML={A:'<b>Season 1</b><span class="hv">'+lv+'<small>'+dt+'</small></span>',B:'<b>Season 1</b><span class="hv"><i></i>'+lv+'</span>',C:'<b>Season 1<i class="kd"></i></b><span class="hv"><i></i>'+lv+'</span>',
  D:'<b>Season 1</b><span class="hv"><small>'+dt+'</small>'+lv+'</span>',E:'<b>Season 1</b><span class="hv"><i></i>'+lv+'</span>'}[V];
 h.insertBefore(s,h.firstChild);h.classList.add('hb','hb'+V);if(!live)h.classList.add('hb-off');
 var X='html.x2p #standings .lbh.hb';
 var css=X+'{align-items:center;padding:0;min-height:42px;margin:0!important;position:relative;z-index:2}'+X+'>span{grid-row:1;align-self:center;position:relative;z-index:1}'+
  X+'>.hb-s{grid-column:1/3;display:flex;align-items:center;gap:9px;padding-left:14px;white-space:nowrap}'+X+'>.hb-s>b{font:400 17px/1 Anton,sans-serif;letter-spacing:.03em;text-transform:uppercase}'+
  X+' .hv{display:inline-flex;align-items:center;gap:5px;font:700 9.5px/1 "Saira Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase}'+
  X+' .hv i{width:6px;height:6px;border-radius:50%;background:#ff3a31;box-shadow:0 0 0 3px rgba(255,58,49,.25)}'+X+'.hb-off .hv i{background:#8b8a90;box-shadow:none}'+
  /* A tax stamp: a green stamp strip with perforated top and bottom edges, a cream frame line, the date cancelled in red ink over it */
  'html.x2p #standings .lbh.hbA{background:#1f6b3f;color:#f8f0d9;min-height:46px;-webkit-mask:radial-gradient(circle 3px at 50% 0,#0000 96%,#000) top/9px 51% repeat-x,radial-gradient(circle 3px at 50% 100%,#0000 96%,#000) bottom/9px 51% repeat-x;mask:radial-gradient(circle 3px at 50% 0,#0000 96%,#000) top/9px 51% repeat-x,radial-gradient(circle 3px at 50% 100%,#0000 96%,#000) bottom/9px 51% repeat-x}'+
  'html.x2p #standings .lbh.hbA::before{content:"";position:absolute;inset:7px 6px;border:1px solid rgba(248,240,217,.55);outline:1px solid rgba(248,240,217,.25);outline-offset:-4px;pointer-events:none}'+
  'html.x2p #standings .lbh.hbA>span:not(.hb-s){color:#f8f0d9!important}html.x2p #standings .lbh.hbA .hb-s b{color:#f8f0d9;font-family:"Playfair Display",Anton,serif}'+
  'html.x2p #standings .lbh.hbA .hv{flex-direction:column;gap:1px;color:#ff6a62;border:1.5px solid #ff6a62;border-radius:50%;padding:5px 8px;transform:rotate(-10deg);font-size:8.5px;background:rgba(0,0,0,.12)}html.x2p #standings .lbh.hbA .hv small{font:inherit;font-size:7px;letter-spacing:.1em}'+
  /* B season book cover: dark leather, a gold-tooled double rule, "Season 1" in gold foil, a row of binding stitches tying it to the tickets */
  'html.x2p #standings .lbh.hbB{background:radial-gradient(120% 140% at 20% 0,#4a3022,#24160f 70%);border-radius:6px 6px 0 0;box-shadow:inset 0 1px 0 rgba(255,220,170,.15),3px 4px 0 #000;min-height:46px}'+
  'html.x2p #standings .lbh.hbB::before{content:"";position:absolute;inset:5px 6px 9px;border:1px solid rgba(214,166,62,.7);outline:1px solid rgba(214,166,62,.35);outline-offset:-4px;pointer-events:none}'+
  'html.x2p #standings .lbh.hbB::after{content:"";position:absolute;left:12px;right:12px;bottom:3px;height:2px;background:repeating-linear-gradient(90deg,#e9dcc0 0 6px,transparent 6px 11px);opacity:.85}'+
  'html.x2p #standings .lbh.hbB>span:not(.hb-s){color:#e2bd62!important}html.x2p #standings .lbh.hbB .hb-s b{background:linear-gradient(100deg,#b8860b,#fdbc2a 40%,#fff1b8 55%,#d9a21c 75%,#b8860b);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}'+
  'html.x2p #standings .lbh.hbB .hv{color:#f8f0d9;background:#a3201f;padding:3px 8px 3px 6px;clip-path:polygon(0 0,100% 0,90% 50%,100% 100%,0 100%)}html.x2p #standings .lbh.hbB .hv i{width:5px;height:5px;background:#f8f0d9;box-shadow:none}'+
  /* C the logo: the logo black, the cut edge of the E on the left, green and red slashes at the right end, the gold square after Season 1 */
  'html.x2p #standings .lbh.hbC{background:#04070e;color:#f8f0d9;clip-path:polygon(10px 0,100% 0,100% 100%,0 100%);box-shadow:3px 4px 0 #000;overflow:hidden}'+
  'html.x2p #standings .lbh.hbC::after{content:"";position:absolute;left:6px;top:0;bottom:0;width:20px;background:linear-gradient(105deg,transparent 0 22%,#03c870 22% 50%,transparent 50% 58%,#ff3a31 58% 86%,transparent 86%);opacity:.9}'+
  'html.x2p #standings .lbh.hbC>span:not(.hb-s){color:rgba(248,240,217,.85)!important}html.x2p #standings .lbh.hbC .hb-s{padding-left:30px!important}html.x2p #standings .lbh.hbC .hb-s b{font:italic 900 17px/1 Kanit,sans-serif;color:#f8f0d9;display:inline-flex;align-items:flex-end;gap:2px}'+
  'html.x2p #standings .lbh.hbC .kd{display:inline-block;width:5px;height:5px;background:#fdbc2a;margin-bottom:2px}html.x2p #standings .lbh.hbC .hv{color:#ff6a62;padding:3px 8px;border-radius:999px;box-shadow:inset 0 0 0 1px rgba(255,58,49,.55)}'+
  /* D dating press: a buff Edmondson card, "Season 1" printed, today\'s date pressed in purple dating-press ink, joined by punched holes */
  'html.x2p #standings .lbh.hbD{background:#e7cf9b;color:#1b181c;box-shadow:3px 4px 0 #000;border-bottom:1px dashed rgba(4,7,14,.25)}'+
  'html.x2p #standings .lbh.hbD::after{content:"";position:absolute;left:10px;right:10px;bottom:-1.9px;height:3.8px;background:radial-gradient(circle,#0b0a12 1.35px,rgba(11,10,18,0) 1.75px) 0 50%/6.5px 100% repeat-x}'+
  'html.x2p #standings .lbh.hbD>span:not(.hb-s){color:rgba(27,24,28,.7)!important}html.x2p #standings .lbh.hbD .hb-s b{color:#1b181c}'+
  'html.x2p #standings .lbh.hbD .hv{color:#5b3a8c;font:700 10px/1 "Courier New",monospace;letter-spacing:.06em;gap:6px;transform:rotate(-2deg)}html.x2p #standings .lbh.hbD .hv small{font:inherit;opacity:.85}html.x2p #standings .lbh.hbD.hb-off .hv{color:#6d6a73}'+
  /* E pad header: the grey chipboard header glued to the top of a pad of tickets, the red padding glue along its edge */
  'html.x2p #standings .lbh.hbE{background:repeating-linear-gradient(115deg,rgba(255,255,255,.04) 0 2px,transparent 2px 5px),#7d786d;color:#1b181c;box-shadow:3px 4px 0 #000;border-bottom:4px solid #b8262a}'+
  'html.x2p #standings .lbh.hbE>span:not(.hb-s){color:rgba(20,18,23,.85)!important}html.x2p #standings .lbh.hbE .hb-s b{color:#141217}html.x2p #standings .lbh.hbE .hv{color:#141217;background:rgba(255,255,255,.22);padding:3px 8px;border-radius:2px}';
 var st=d.createElement('style');st.textContent=css;d.head.appendChild(st)})();
