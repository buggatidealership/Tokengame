/* r1035 H (owner, 2026-10-27, night: "remove the round number and you just have Season 1 and then Live and then have W-L, hit rate and P&L
   inside that bar, and the ticket is pasted against Season 1... tied to the ticket... not a ticket itself"): the board's header row (it
   already shares the tickets' columns) becomes a bar sitting on the first ticket: "Season 1" and the Live tag over the rank and AI
   columns, the three labels over their own columns. window.__hV = 'C' red band, 'D' logo-black plate, 'E' a cream header strip joined
   to the first ticket by the bet's punched holes. Live = a round's calls due or graded today in New York on a weekday. */
(function(){var V=window.__hV,d=document,h=d.querySelector('#standings .lbh'),ol=d.querySelector('#standings ol.lbl');if(!h||!ol)return;
 var live=(function(){try{var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"2-digit",month:"numeric",day:"numeric",weekday:"short"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  if(p.weekday==="Sat"||p.weekday==="Sun")return false;var t=+p.month+"/"+(+p.day)+"/"+p.year,nd=function(s){var q=String(s||"").split("/");return q.length===3?(+q[0])+"/"+(+q[1])+"/"+q[2].slice(-2):""};
  return [].concat(ROUNDS,PENDING,UPCOMING).some(function(r){return nd(r.called)===t||nd(r.resolves)===t})}catch(e){return false}})();
 var s=d.createElement('span');s.className='hb-s';s.setAttribute('aria-hidden','true');s.innerHTML='<b>Season 1</b><span class="hb-lv'+(live?'':' off')+'"><i></i>'+(live?'Live':'Off air')+'</span>';h.insertBefore(s,h.firstChild);
 h.classList.add('hb','hb'+V);
 var st=d.createElement('style');st.textContent=
  'html.x2p #standings .lbh.hb{align-items:center;padding:0;min-height:38px;margin:0!important;position:relative;z-index:2}'+
  'html.x2p #standings .lbh.hb>span{grid-row:1;align-self:center}'+
  'html.x2p #standings .lbh.hb>.hb-s{grid-column:1/3;display:flex;align-items:center;gap:9px;padding-left:14px;white-space:nowrap}'+
  'html.x2p #standings .lbh.hb>.hb-s b{font:italic 900 15px/1 Kanit,sans-serif;letter-spacing:.04em;text-transform:uppercase}'+
  '.hb-lv{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:999px;font:700 9.5px/1 "Saira Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase}'+
  '.hb-lv i{width:6px;height:6px;border-radius:50%;background:#ff3a31;box-shadow:0 0 0 3px rgba(255,58,49,.25)}.hb-lv.off i{background:#8b8a90;box-shadow:none}'+
  'html.x2p #standings .lbh.hbC{background:linear-gradient(#c22d2a,#a3201f);box-shadow:3px 4px 0 #000}'+
  'html.x2p #standings .lbh.hbC>span:not(.hb-s){color:#f8f0d9!important}html.x2p #standings .lbh.hbC .hb-s b{color:#f8f0d9}html.x2p #standings .lbh.hbC .hb-lv{background:#04070e;color:#f8f0d9}'+
  'html.x2p #standings .lbh.hbD{background:#04070e;box-shadow:inset 0 0 0 1px rgba(253,188,42,.55),3px 4px 0 #000;border-top:3px solid #fdbc2a}'+
  'html.x2p #standings .lbh.hbD>span:not(.hb-s){color:rgba(248,240,217,.85)!important}html.x2p #standings .lbh.hbD .hb-s b{color:#fdbc2a}html.x2p #standings .lbh.hbD .hb-lv{color:#ff6a62;box-shadow:inset 0 0 0 1px rgba(255,58,49,.55)}'+
  'html.x2p #standings .lbh.hbE{background:#f8f0d9;box-shadow:3px 4px 0 #000;border-radius:10px 10px 0 0;border-bottom:1px dashed rgba(4,7,14,.25)}'+
  'html.x2p #standings .lbh.hbE>span:not(.hb-s){color:rgba(4,7,14,.6)!important}html.x2p #standings .lbh.hbE .hb-s b{color:#04070e}html.x2p #standings .lbh.hbE .hb-lv{color:#b8262a;background:rgba(255,58,49,.1);box-shadow:inset 0 0 0 1px rgba(184,38,42,.45)}'+
  'html.x2p #standings .lbh.hbE::after{content:"";position:absolute;left:10px;right:10px;bottom:-1.9px;height:3.8px;background:radial-gradient(circle,#0b0a12 1.35px,rgba(11,10,18,0) 1.75px) 0 50%/6.5px 100% repeat-x}';
 d.head.appendChild(st)})();
