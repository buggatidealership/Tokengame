/* Round H7 · cover5: the X3+ first screen as one painted world. Shared builder.
   A take = one painted plate per width (9:16 phone, 16:9 desktop) + slots measured on that plate, in % of its box.
   Every word and number is page text set into a blank painted surface; every number from ROUNDS, __x2pPnl, SE.
   Where the world has a screen, the live film's own frame (.vt-f: the video, its play and sound buttons) is moved into it. */
window.C5=(function(){
  const D=document,H=D.documentElement,S=window.SE,esc=S.esc,NM=S.NM;
  const IMG='tools/concepts/worlds/comic/story/h/cover5/img/';
  const lead=S.lead();
  const A=(window.__x2pPnl&&__x2pPnl().A)||{};
  const pnl=m=>A[m]?A[m].pnl:0;
  const money=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
  /* the example: the newest graded round (today R80, Exxon Mobil, +2.17%, GPT closest) */
  const g=ROUNDS[ROUNDS.length-1];
  const pc=c=>{const s=String(c[1]);return {m:c[0],up:/^UP/i.test(s),sz:parseFloat(s.replace(/[^0-9.]/g,''))||0,miss:parseFloat(c[2])}};
  const ex={n:g.n,t:S.tk(g.ticker),co:g.co,calls:(g.calls||[]).map(pc),a:+g.a,win:String(g.win||'').toUpperCase()};
  const pass=c=>(c.up&&ex.a>0)||(!c.up&&ex.a<0);
  const won=m=>ex.win.split(/[^A-Z]+/).includes(m);
  const call=m=>ex.calls.find(c=>c.m===m)||{m,up:1,sz:0};
  const mv=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(2)+'%';
  const graded=ROUNDS.length;
  const STEPS=['They predict the move before earnings','The market close grades every prediction','#1 on the leaderboard holds the golden ticket','We follow its call on every bet'];
  const T={
    head:()=>`<h1 class="c5-h1" aria-label="4 AIs trade earnings. Who calls it best?"><span class="a">4 AI<span class="wc-lc">s</span> trade earnings</span><span class="b">Who calls it best?</span></h1>`,
    h1a:()=>`<span class="c5-h1a" aria-hidden="true">4 AI<span class="wc-lc">s</span> trade earnings</span>`,
    h1b:()=>`<span class="c5-h1b" aria-hidden="true">Who calls it best?</span>`,
    iss:()=>`<span class="c5-iss"><b>Season 1</b> <i>No. ${graded}</i></span>`,
    season:()=>`<span class="c5-iss"><b>Season 1</b></span>`,
    no:()=>`<span class="c5-iss"><i>No. ${graded}</i></span>`,
    name:m=>`<span class="c5-nm">${esc(NM[m])}</span>`,
    call:(m,o)=>{const c=call(m),p=pass(c),w=won(m);o=o||{};return `<span class="c5-call ${c.up?'up':'dn'} ${p?'ok':'no'}${w?' win':''}">${o.name?`<em>${esc(NM[m])}</em>`:''}<b>${c.up?'▲':'▼'}${c.sz}%</b>${o.stamp===0?'':`<s>${w?'Win':p?'Pass':'Fail'}</s>`}<span class="c5-sr">${esc(NM[m])} predicted ${c.up?'up':'down'} ${c.sz}%: ${p?'right way':'wrong way'}${w?', closest, wins the round':''}</span></span>`},
    close:o=>`<span class="c5-close"><em>Round ${ex.n} · ${esc(ex.co)} (${esc(ex.t)})</em><b class="${ex.a>=0?'up':'dn'}">${mv(ex.a)}</b>${o&&o.lab?`<small>${o.lab}</small>`:''}</span>`,
    win:()=>`<span class="c5-win"><em>Closest call</em><b>${esc(NM[ex.win.split(/[^A-Z]+/)[0]]||'Nobody')}</b></span>`,
    tk:()=>`<span class="c5-tk"><em>Golden ticket</em><b>${esc(NM[lead])}</b><small>#1 · ${money(pnl(lead))}</small></span>`,
    bet:()=>`<span class="c5-bet"><em>Bet #1</em><b>NVIDIA</b><small>The first of many</small></span>`,
    step:(i,o)=>`<span class="c5-st"><b>${i+1}</b><span>${esc(STEPS[i]).replace('before','<u>before</u>')}</span></span>`,
    film:()=>`<span class="c5-filmslot"></span>`,
    meet:()=>`<span class="c5-meet">Meet the four models ↓</span>`,
  };
  /* mount a take: plate + slots, then hide the live cover's code boxes; the film's frame moves into the 'film' slot if there is one */
  function mount(id,cfg){
    const cv=D.querySelector('#wc-book .wc-cover');if(!cv)return;
    const L=innerWidth>=900?'l':'p',sl=cfg[L];
    H.classList.add('c5-on','c5-'+id);cv.classList.add('c5-cv');
    const box=D.createElement('div');box.className='c5 c5-'+L;box.style.setProperty('--ar',sl.ar||(L==='l'?'16/9':'9/16'));
    box.innerHTML=`<div class="c5-pl"><img class="c5-img" src="${IMG}${id}-${L}.jpg" alt="${esc(cfg.alt||'')}">${(sl.slots||[]).map(s=>{
      const st=`left:${s.x}%;top:${s.y}%;width:${s.w}%;${s.h!=null?`height:${s.h}%;`:''}--r:${s.r||0}deg;--k:${s.k||0}deg;${s.fs?`--fs:${s.fs};`:''}${s.css||''}`;
      return `<div class="c5-s c5-${s.t.split(':')[0]} ${s.cls||''}" style="${st}">${typeof s.html==='string'?s.html:render(s.t)}</div>`}).join('')}</div>${sl.after||''}`;
    cv.insertBefore(box,cv.firstChild);
    box.querySelectorAll('[data-m]').forEach(el=>{el.innerHTML=T.call(el.dataset.m,{name:1})});
    const fs=box.querySelector('.c5-filmslot'),vf=cv.querySelector('.sh-film .vt-f');
    if(fs&&vf){fs.append(vf);H.classList.add('c5-filmin')}
    const mt=box.querySelector('.c5-meet');if(mt){mt.setAttribute('role','link');mt.tabIndex=0}
    window.__c5={take:id,layout:L,lead,ex:ex.t+'#'+ex.n+' '+ex.a+' win '+ex.win,calls:ex.calls.map(c=>c.m+(c.up?'+':'-')+c.sz+(pass(c)?':P':':F')).join(' '),graded};
    H.classList.add('t3-ready')}
  const render=t=>{const [k,a]=t.split(':');if(k==='call')return T.call(a.split(',')[0],{name:/n/.test(a.split(',')[1]||''),stamp:/x/.test(a.split(',')[1]||'')?0:1});if(k==='step')return T.step(+a);if(k==='name')return T.name(a);return T[k]?T[k]():''};
  return {mount,T,ex,lead,pnl,money,graded,NM,esc,STEPS}})();
