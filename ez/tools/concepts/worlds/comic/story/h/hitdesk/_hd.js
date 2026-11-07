/* Round H7, area hitdesk: "you are evaluating AIs". Four worlds for Smart or lucky. Shared core on top of ../pnl/_lib.js (PN: live
   P&L windows) and ../pnl2/_g.js (PG: the painting at a known scale, a box mapped onto a four-cornered surface with matrix3d).
   HD.hit: each AI's hit rate after every graded round, (right + 1) / (calls + 2), so every line starts at 50/50 (the Leaderboard's rule).
   A take (window.HDT) gives: id, title, paint {phone, wide} = {src, iw, ih, Q:[surfaces as quads tl,tr,br,bl], hot:[...]},
   draw(root, S, st) to fill its surfaces for the state st = {mode:'hit'|'pnl', win:'season'|'d7'|'d1'}, and the controls it owns.
   Every control is a [data-set="mode:hit"] style element inside the scene (a key, a knob, a tab of paper). Classes hd-. */
(function(){
if(window.HD)return;
const MS=PN.MS,NM=PN.NM,P=PN.P,RS=PN.RS;
/* hit rate series */
const ser={},cnt={};MS.forEach(m=>{let r=0,c=0;ser[m]=[.5];RS.forEach(x=>{const k=P[m].per[x.n];if(k){c++;if(k.v>0)r++}ser[m].push((r+1)/(c+2))});cnt[m]={r,c,raw:c?r/c:0}});
const rank=MS.slice().sort((a,b)=>ser[b][ser[b].length-1]-ser[a][ser[a].length-1]);
const HIT={ser,cnt,rank,n:RS.length,first:RS[0],last:RS[RS.length-1]};
/* screen ink per model: on a dark screen Grok's black becomes the phosphor white */
const scr={GPT:'#3be37f',CLAUDE:'#ff8a3d',KIMI:'#4fa3ff',GROK:'#f3ead2'};
const ink=m=>PN.col(m);
const pct=v=>Math.round(v*100)+'%';
/* the chart in data terms for a state: series 0..1 (hit) or $ (pnl), the order, the base line value */
function data(st){if(st.mode==='hit')return {ser:HIT.ser,rank:HIT.rank,n:HIT.n,lo:.3,hi:.8,base:.5,fmt:pct,end:m=>HIT.ser[m][HIT.n],
    lab:'Hit rate',sub:'right on direction, round by round',baseLab:'Coin flip 50%'};
  const w=PN.W[st.win],all=[].concat(...MS.map(m=>w.ser[m])),lo0=Math.min(0,...all),hi0=Math.max(0,...all),pd=(hi0-lo0||1)*.1;
  return {ser:w.ser,rank:w.rank,n:w.n,lo:lo0-pd,hi:hi0+pd,base:0,fmt:PN.$k,end:m=>w.tot[m],lab:w.full,sub:'$100K on every call',baseLab:'Break even $0',w}}
/* the state, the mount */
function mount(){const T=window.HDT,sp=document.querySelector('.wc-splash');if(!T||!sp)return;document.documentElement.classList.add('hd-on');
  sp.setAttribute('aria-label','Smart or lucky?');sp.insertAdjacentHTML('beforeend',`<div class="hd hd-${T.id}"><h2 class="hd-sr">Smart or lucky? ${T.title}</h2><div class="hd-st"><div class="hd-sfs"></div><div class="hd-hot"></div></div><div class="hd-sr" aria-live="polite"></div></div>`);
  const root=sp.querySelector('.hd'),st={mode:window.HD_MODE||'hit',win:window.HD_WIN||'season'};root.st=st;
  const draw=anim=>{const wide=innerWidth>=900,C=wide?T.paint.wide:T.paint.phone,stage=root.querySelector('.hd-st');
    const S=PG.stage(stage,HD.IMG+C.src,C.iw,C.ih,C.crop?C.crop(stage.clientWidth):{});root.dataset.mode=st.mode;root.dataset.win=st.win;root.classList.toggle('hd-wide',wide);
    if(C.hl)PG.over(stage,HD.IMG+C.hl,S,C.iw,C.ih,'hd-hl');
    const box=root.querySelector('.hd-sfs');box.innerHTML='';
    const surf=C.Q.map((Q,i)=>{const el=document.createElement('div');el.className='hd-sf hd-sf'+i;box.appendChild(el);const p=Q.map(q=>S.P(q[0],q[1])),[w,h]=PG.size(p);PG.quad(el,S,Q,w,h);el.w=w;el.h=h;return el});
    const hot=root.querySelector('.hd-hot');hot.innerHTML='';(C.hot||[]).forEach(o=>{const b=document.createElement('button');b.type='button';b.className='hd-k '+(o.cls||'');b.dataset.set=o.set;b.setAttribute('aria-label',o.label);
      const [x,y]=S.P(o.x,o.y);b.style.cssText=`left:${(x-o.w*S.s/2).toFixed(1)}px;top:${(y-o.h*S.s/2).toFixed(1)}px;width:${(o.w*S.s).toFixed(1)}px;height:${(o.h*S.s).toFixed(1)}px`;hot.appendChild(b)});
    T.draw(root,surf,st,data(st),{S,C,anim,wide});sync()};
  const sync=()=>{root.querySelectorAll('[data-set]').forEach(b=>{const [k,v]=b.dataset.set.split(':'),on=v==='*'?false:st[k]===v;b.setAttribute('aria-pressed',on);b.classList.toggle('hd-on1',on)});
    const d=data(st);root.querySelector('div.hd-sr').textContent=`${d.lab}: `+d.rank.map(m=>NM[m]+' '+d.fmt(d.end(m))).join(', ')};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-set]');if(!b)return;let [k,v]=b.dataset.set.split(':');if(v==='*'){const o=k==='mode'?['hit','pnl']:['season','d7','d1'];v=o[(o.indexOf(st[k])+1)%o.length];if(k==='win'&&st.mode!=='pnl')st.mode='pnl'}if(st[k]===v)return;
    const was=b.dataset.set,isKey=b.classList.contains('hd-k');st[k]=v;draw(true);
    if(T.press)T.press(root,root.querySelector((isKey?'.hd-k':'.hd-sfs')+' [data-set="'+was+'"],'+(isKey?'.hd-k':'.hd-sfs [data-set]')+'[data-set="'+was+'"]'),st)});
  root.addEventListener('keydown',e=>{const b=e.target.closest&&e.target.closest('svg [data-set]');if(b&&(e.key==='Enter'||e.key===' ')){e.preventDefault();b.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
  draw(!window.PN_STILL);let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;draw(false)}});return root}
/* helpers */
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const svgEl=(el,w,h,inner,cls)=>{el.innerHTML=`<svg class="hd-sv ${cls||''}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}">${inner}</svg>`;return el.firstChild};
/* spread labels so they never touch */
const spread=(a,gap,min,max)=>PN.spread(a,gap,min,max);
window.HD={HIT,data,mount,scr,ink,pct,esc,svgEl,spread,IMG:'/tools/concepts/worlds/comic/story/h/hitdesk/img/'};
})();
