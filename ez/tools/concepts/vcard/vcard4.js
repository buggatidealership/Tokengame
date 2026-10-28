// node vcard4.js <round> <out.mp4> <reveal_s> : v4, the post as fight night (owner, 2026-10-28, night: "you're turning it into a fight night...
// not a statistic"; the empty space beside the card filled with a ticket element; what makes a viewer come back and follow).
// Left: the round's slab with its film. Right: a fight ticket on the site's stock. Before the reveal it is the fight card: the two
// corners (bulls / bears), each AI with its call and its belt rank, the champion and the gap, "Bulls or bears? Reply" (replies are the
// strongest signal X ranks on). After the reveal it is the result: the bell (the move), which corner won, the decision (closest call),
// biggest W and L, the belt after the round, and the next fight night with its companies (the reason to follow).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const N=+process.argv[2],OUT=path.resolve(process.argv[3]),REV=+process.argv[4],TMP=path.join(require('os').tmpdir(),'vc4-'+N);fs.mkdirSync(TMP,{recursive:true});
const EZ=path.resolve(__dirname,'..','..','..');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:3});await FONTS(p);
 await p.goto('http://localhost:8897/v46-live-x2plus.html#/round/'+N,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(3500);
 const I=await p.evaluate(n=>{document.querySelectorAll('#x2pRm video').forEach(v=>{v.pause();v.style.visibility='hidden'});document.querySelectorAll('#x2pRm .snd').forEach(e=>e.style.visibility='hidden');
  const c=document.querySelector('#x2pRm .card').getBoundingClientRect(),v=document.querySelector('#x2pRm video').getBoundingClientRect();const op=getComputedStyle(document.querySelector('#x2pRm video')).objectPosition;
  const P=window.__x2pPnl(),u=ROUNDS.find(u=>u.n==n),M=['GROK','CLAUDE','GPT','KIMI'];
  const sea=k=>{const o={};M.forEach(m=>{let s=0;for(const [r,x] of Object.entries(P.A[m].per))if(+r<=k)s+=x.v;o[m]=s});return o};
  const pre=sea(n-1),post=sea(n);const per={};u.calls.forEach(c=>{if(c[1])per[c[0]]=P.A[c[0]].per[n].v});
  const md={};M.forEach(m=>{const x=MODELS[m];md[m]={bg:x.bg,fg:x.fg,d:x.d,fr:x.fr||'',dot:x.dot||'',dotc:x.dotc||'',ver:x.ver}});
  const K=s=>{const a=String(s||'').split('/');return a.length<2?'':('0'+a[0]).slice(-2)+('0'+a[1]).slice(-2)};
  const pend=(typeof PENDING!=='undefined'?PENDING:[]).filter(r=>r.resolves);const nx=pend.map(r=>K(r.resolves)).sort()[0];
  const next=pend.filter(r=>K(r.resolves)===nx).map(r=>({t:r.ticker,co:r.co,lg:CO_LOGOS[r.ticker]?CO_LOGOS[r.ticker].f:null,cap:(typeof CAPS!=='undefined'&&CAPS[r.ticker])||0})).sort((a,b)=>b.cap-a.cap);
  const nd=pend.find(r=>K(r.resolves)===nx);
  return {c:{x:c.left,y:c.top,w:c.width,h:c.height},v:{x:v.left-c.left,y:v.top-c.top,w:v.width,h:v.height},op,u:{n:u.n,co:u.co,t:u.ticker,a:u.a,win:u.win,calls:u.calls,lg:CO_LOGOS[u.ticker]?CO_LOGOS[u.ticker].f:null},pre,post,per,md,next,nextDay:nd?nd.resolves:null,film:FILMS[n]&&FILMS[n].f}},N);
 const shot=async f=>fs.writeFileSync(path.join(TMP,f),await p.screenshot({clip:{x:I.c.x,y:I.c.y,width:I.c.w,height:I.c.h}}));
 await shot('card.png');
 await p.evaluate(()=>{const f=document.querySelector('#x2pRm .card .face.front');const wv=f.querySelector('.cwin .wv');if(wv)wv.innerHTML='<span class="wn">?</span>';
  const ds=f.querySelector('.zr .ds'),gr=f.querySelector('.zr .gr');if(ds)ds.textContent='Final grade';if(gr)gr.textContent='?'});await p.waitForTimeout(200);await shot('cardA.png');
 const H=960,s=H/I.c.h,cw=Math.round(I.c.w*s),cx=36,cy=60;
 const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};const usd=v=>(v<0?'−$':'+$')+Math.abs(Math.round(v)).toLocaleString('en-US');
 const lg=m=>{const x=I.md[m];return `<span class="lg" style="background:${x.bg}"><svg viewBox="0 0 24 24"><path fill="${x.fg}" ${x.fr?`fill-rule="${x.fr}"`:''} d="${x.d}"/>${x.dot?`<path fill="${x.dotc}" d="${x.dot}"/>`:''}</svg></span>`};
 const u=I.u,calls=u.calls.filter(c=>c[1]).map(c=>({m:c[0],up:/UP/.test(c[1]),v:c[1].replace(/^(UP|DOWN)\s*/,'').replace('%',''),off:+c[2]}));
 const rank=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).map(e=>e[0]);const rp=rank(I.pre),rq=rank(I.post);const champ=rp[0],gap=I.pre[rp[0]]-I.pre[rp[1]];
 const bulls=calls.filter(c=>c.up),bears=calls.filter(c=>!c.up);
 const fighter=c=>{const r=rp.indexOf(c.m)+1;return `<div class="fr">${lg(c.m)}<div class="nm"><b>${NM[c.m]}</b><i>${r===1?'<em>★ Champ</em>':'No. '+r} · ${usd(I.pre[c.m])}</i></div><div class="cr ${c.up?'u':'d'}">${c.up?'Bull':'Bear'}</div><div class="cl ${c.up?'u':'d'}">${c.up?'+':'−'}${c.v}%</div></div>`};
 const corner=(t,list,cls)=>`<div class="cn ${cls}"><div class="ch">${t}<span>${list.length}</span></div>${list.length?list.map(fighter).join(''):'<div class="emp">Empty corner</div>'}</div>`;
 const coLg=u.lg?`<img class="co-lg" src="file://${path.join(EZ,'media',u.lg)}">`:'';
 const andL=a=>a.length<3?a.join(' & '):a.slice(0,-1).join(', ')+' & '+a[a.length-1];const day=d=>{if(!d)return '';const [m,dd,y]=d.split('/');const D=new Date(2000+(+y%100),+m-1,+dd);return D.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})};
 const CSS=`*{box-sizing:border-box;margin:0}body{width:1080px;height:1080px;background:#0b0a14;position:relative;overflow:hidden;color:#f3ead6;font-family:"Saira Condensed",sans-serif}
body::before{content:"";position:absolute;inset:0;background:repeating-conic-gradient(from 0deg at 28% 50%,rgba(255,255,255,.035) 0 2deg,transparent 2deg 9deg)}
.cd{position:absolute;left:${cx}px;top:${cy}px;height:${H}px;filter:drop-shadow(0 20px 34px rgba(0,0,0,.65))}
.top{position:absolute;left:${cx}px;right:36px;top:16px;display:flex;align-items:center;gap:10px;font:800 20px/1 "Barlow Condensed",sans-serif;letter-spacing:.08em;text-transform:uppercase}
.top img{width:34px;height:34px}.top .e{color:#03c870}.top .z{color:#ff3a31}.top .r{margin-left:auto;font:700 17px/1 "Saira Condensed";letter-spacing:.14em;color:#f2b632}
.tk{position:absolute;left:${cx+cw+26}px;right:30px;top:${cy}px;height:${H}px;background:#f8f0d9;color:#1b181c;display:flex;flex-direction:column;filter:drop-shadow(5px 6px 0 rgba(0,0,0,.6));
 -webkit-mask:radial-gradient(circle at 0 50%,transparent 11px,#000 11.5px) 0 0/51% 26px repeat-y,radial-gradient(circle at 100% 50%,transparent 11px,#000 11.5px) 100% 0/51% 26px repeat-y}
.tk::after{content:"";position:absolute;inset:0;pointer-events:none;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .25 0 0 0 0 .15 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");mix-blend-mode:multiply}
.bd{height:50px;flex:none;display:flex;align-items:center;justify-content:center;gap:12px;font:700 18px/1 "Barlow Condensed";letter-spacing:.24em;text-transform:uppercase;color:#f8f0d9}
.bg{background:#1f7a45}.br{background:#b3261e}.bd b{color:#fdbc2a}
.in{flex:1;padding:22px 30px 20px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-height:0}
.tally{display:flex;justify-content:center;align-items:baseline;gap:14px;font:400 40px/1 Anton;text-transform:uppercase}.tally i{font:700 18px 'Saira Condensed';font-style:normal;letter-spacing:.2em;color:#5a5360}
.card{display:grid;border-top:3px solid #1b181c;border-bottom:3px solid #1b181c}.fr{display:grid;grid-template-columns:40px 1fr auto 104px;align-items:center;gap:12px;padding:11px 0;border-bottom:1px dashed rgba(27,24,28,.3)}.fr:last-child{border-bottom:0}
.fr .lg{width:40px;height:40px;border-radius:9px;display:grid;place-items:center}.fr .lg svg{width:26px;height:26px}.fr .nm b{font:400 28px/1 Anton;text-transform:uppercase;font-weight:400}.fr .nm i{display:block;font:600 15px/1.1 'Saira Condensed';font-style:normal;color:#5a5360;margin-top:3px}.fr .nm em{font-style:normal;color:#a5770c;font-weight:700;letter-spacing:.06em}
.fr .cr{font:700 13px/1 'Saira Condensed';letter-spacing:.18em;text-transform:uppercase;border:2px solid;border-radius:3px;padding:4px 6px}.fr .cl{font:400 38px/1 Anton;text-align:right}
.ifs{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ifs>div{border:2px solid #1b181c;border-radius:4px;padding:9px 11px;font:400 21px/1.1 Anton;text-transform:uppercase}.ifs i{display:block;font:700 13px/1 'Saira Condensed';font-style:normal;letter-spacing:.16em;margin-bottom:5px}
.eb{font:700 16px/1 "Saira Condensed";letter-spacing:.18em;text-transform:uppercase;color:#b3261e;text-align:center}
.ev{display:flex;align-items:center;justify-content:center;gap:14px}.co-lg{height:46px;max-width:90px;object-fit:contain}
.co{font:400 50px/1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.01em;white-space:nowrap;text-align:center}
.sub{font:600 18px/1.1 "Saira Condensed";text-align:center;color:#4a4450}
.vs{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:start}
.cn{display:flex;flex-direction:column;gap:9px}.ch{display:flex;justify-content:space-between;align-items:baseline;font:400 26px/1 Anton;text-transform:uppercase;padding-bottom:6px;border-bottom:3px solid}
.ch span{font-size:34px}.cn.u .ch{color:#1d7a43;border-color:#1d7a43}.cn.d .ch{color:#b3221b;border-color:#b3221b}
.vv{font:400 30px/1 Anton;color:#1b181c;align-self:center;padding-top:30px}
.f{display:grid;grid-template-columns:30px 1fr;grid-template-rows:auto auto;column-gap:7px;align-items:center}.f .lg{grid-row:1/3;width:30px;height:30px;border-radius:7px;display:grid;place-items:center}
.f .lg svg{width:20px;height:20px}.nm b{font:400 21px/1 Anton;text-transform:uppercase}.nm i{display:block;font:600 13px/1.1 "Saira Condensed";font-style:normal;color:#5a5360;margin-top:2px}.nm em{font-style:normal;color:#a5770c;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
.f .cl{grid-column:2;font:400 28px/1 Anton;margin-top:3px}.u{color:#1d7a43}.d{color:#b3221b}.emp{font:600 16px "Saira Condensed";color:#8a8290}
.st{background:#1b181c;color:#f3ead6;border-radius:4px;padding:12px 16px;display:grid;gap:4px;text-align:center}.st i{font:700 13px/1 "Saira Condensed";font-style:normal;letter-spacing:.2em;text-transform:uppercase;color:#fdbc2a}
.st b{font:400 25px/1.05 Anton;text-transform:uppercase;font-weight:400}.st small{font:600 15px/1.1 "Saira Condensed";color:#cfc6b3}
.cta{text-align:center;font:400 34px/1 Anton;text-transform:uppercase;color:#b3221b;letter-spacing:.01em}.cta small{display:block;font:700 15px/1.2 "Saira Condensed";letter-spacing:.16em;color:#5a5360;margin-top:6px}
.bell{display:flex;align-items:baseline;justify-content:center;gap:12px}.bell i{font:700 15px/1 "Saira Condensed";font-style:normal;letter-spacing:.2em;text-transform:uppercase;color:#5a5360}.bell b{font:400 78px/.9 Anton;font-weight:400}
.wcn{text-align:center;font:400 30px/1 Anton;text-transform:uppercase;padding:8px 0;border-top:3px solid;border-bottom:3px solid}
.dec{display:flex;align-items:center;justify-content:center;gap:10px;font:400 26px/1 Anton;text-transform:uppercase}.dec i{font:700 14px/1 "Saira Condensed";font-style:normal;letter-spacing:.18em;color:#a5770c}
.dec .lg{width:28px;height:28px;border-radius:6px;display:grid;place-items:center}.dec .lg svg{width:18px;height:18px}.dec small{font:600 16px "Saira Condensed";color:#5a5360;text-transform:none}
.wl{display:grid;grid-template-columns:1fr 1fr;gap:10px}.wl>div{border:2px solid #1b181c;border-radius:4px;padding:8px 10px;display:grid;gap:3px}.wl i{font:700 13px/1 "Saira Condensed";font-style:normal;letter-spacing:.16em;text-transform:uppercase}
.wl b{font:400 22px/1 Anton;text-transform:uppercase;font-weight:400}.wl em{font:400 28px/1 Anton;font-style:normal}
.blt{display:grid;gap:5px}.blt .h{font:700 14px/1 "Saira Condensed";letter-spacing:.2em;text-transform:uppercase;color:#a5770c;text-align:center}
.blt .r{display:grid;grid-template-columns:24px 30px 1fr auto 40px;align-items:center;gap:9px;font:400 25px/1 Anton;text-transform:uppercase;padding:3px 0;border-bottom:1px dashed rgba(27,24,28,.25)}
.blt .r .lg{width:30px;height:30px;border-radius:5px;display:grid;place-items:center}.blt .r .lg svg{width:16px;height:16px}.blt .r.c b{color:#a5770c}.blt .mvr{font:700 14px "Saira Condensed";text-align:right}
.nx{border-top:3px double #1b181c;padding-top:10px;display:grid;gap:8px;text-align:center}.nx .h{font:400 22px/1 Anton;text-transform:uppercase}.nx .h span{color:#b3221b}
.nx .lgs{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap}.nx .lgs img{height:34px;max-width:76px;object-fit:contain}.nx small{font:700 14px/1 "Saira Condensed";letter-spacing:.16em;text-transform:uppercase;color:#5a5360}`;
 const head=`<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Saira+Condensed:wght@600;700&family=Barlow+Condensed:wght@700;800&display=swap"><style>${CSS}</style>
<div class="top"><img src="file://${path.join(EZ,'tools','site','ez-logo.svg')}"><span><span class="e">E</span>arnings <span class="z">Z</span>eason</span><span class="r">earningszn.xyz</span></div>`;
 const A=head+`<img class="cd" src="cardA.png"><div class="tk"><div class="bd bg"><b>★</b>Fight night · Round ${u.n}<b>★</b></div><div class="in">
<div class="eb">Main event · earnings</div><div class="ev">${coLg}<div class="co">${u.co}</div></div>
<div class="sub">4 AIs called it before the report. Locked.</div>
<div class="tally"><span class="u">${bulls.length} ${bulls.length===1?'bull':'bulls'}</span><i>vs</i><span class="d">${bears.length} ${bears.length===1?'bear':'bears'}</span></div><div class="card">${calls.slice().sort((a,b)=>rp.indexOf(a.m)-rp.indexOf(b.m)).map(fighter).join('')}</div><div class="ifs"><div><i class="u">If it goes up</i>${bulls.length?andL(bulls.map(c=>NM[c.m]))+' '+(bulls.length===1?'gets':'get')+' paid':'Nobody gets paid'}</div><div><i class="d">If it goes down</i>${bears.length?andL(bears.map(c=>NM[c.m]))+' '+(bears.length===1?'gets':'get')+' paid':'Nobody gets paid'}</div></div>
<div class="st"><i>The belt</i><b>Champ ${NM[champ]} · ${usd(I.pre[champ])}</b><small>${NM[rp[1]]} is ${usd(gap).slice(1)} behind</small></div>
<div class="cta">Bulls or bears?<small>Reply with your corner 👇</small></div></div><div class="bd br">The bell · market close</div></div>`;
 const w=String(u.win).split(/\s*&\s*/).filter(Boolean),wc=calls.find(c=>c.m===w[0]);const up=u.a>0,rightN=calls.filter(c=>c.up===up).length;
 const pn=Object.entries(I.per).sort((a,b)=>b[1]-a[1]),bw=pn[0],bl=pn[pn.length-1];const newChamp=rq[0]!==champ;
 const blt=rq.map((m,i)=>{const d=rp.indexOf(m)-i;return `<div class="r ${i===0?'c':''}"><span>${i+1}</span>${lg(m)}<b>${NM[m]}</b><span class="${I.post[m]<0?'d':'u'}">${usd(I.post[m])}</span><span class="mvr ${d>0?'u':d<0?'d':''}">${d>0?'▲'+d:d<0?'▼'+(-d):'–'}</span></div>`}).join('');
 const B=head+`<img class="cd" src="card.png"><div class="tk"><div class="bd bg"><b>★</b>Fight night · Round ${u.n}<b>★</b></div><div class="in">
<div class="ev">${coLg}<div class="co">${u.co}</div></div>
<div class="bell"><i>The bell</i><b class="${up?'u':'d'}">${up?'+':'−'}${Math.abs(u.a).toFixed(2)}%</b></div>
<div class="wcn ${up?'u':'d'}">${up?'Bulls':'Bears'} win · ${rightN} of ${calls.length} right</div>
${w.length?`<div class="dec"><i>Decision</i>${w.map(m=>lg(m)+NM[m]).join(' <small>&amp;</small> ')}<small>${wc?wc.off.toFixed(2).replace(/\.?0+$/,''):''}% off</small></div>`:`<div class="dec"><i>Decision</i>Nobody</div>`}
<div class="wl"><div><i class="u">Biggest W</i><b>${NM[bw[0]]}</b><em class="${bw[1]<0?'d':'u'}">${usd(bw[1])}</em></div><div><i class="d">Biggest L</i><b>${NM[bl[0]]}</b><em class="${bl[1]<0?'d':'u'}">${usd(bl[1])}</em></div></div>
<div class="blt"><div class="h">${newChamp?'★ New champ: '+NM[rq[0]]+' ★':'★ '+NM[rq[0]]+' keeps the belt ★'}</div>${blt}</div>
${I.next.length?`<div class="nx"><div class="h">Next fight night · <span>${day(I.nextDay)}</span></div><div class="lgs">${I.next.slice(0,6).map(x=>x.lg?`<img src="file://${path.join(EZ,'media',x.lg)}">`:`<b>${x.t}</b>`).join('')}</div><small>${I.next.length} fights · follow for the bell</small></div>`:''}
</div><div class="bd br">Graded at the close</div></div>`;
 fs.writeFileSync(path.join(TMP,'A.html'),A);fs.writeFileSync(path.join(TMP,'B.html'),B);
 const f=await b.newPage({viewport:{width:1080,height:1080}});
 for(const k of ['A','B']){await f.goto('file://'+path.join(TMP,k+'.html'));await f.evaluate(()=>document.fonts.ready);await f.waitForTimeout(500);
  const ov=await f.evaluate(()=>{const e=document.querySelector('.co'),m=document.querySelector('.ev').clientWidth-60;let s=50;while(e.scrollWidth>m&&s>26){s-=2;e.style.fontSize=s+'px'}const i=document.querySelector('.in');return i.scrollHeight-i.clientHeight});
  if(ov>0)console.log(k,'overflow',ov);await f.screenshot({path:path.join(TMP,k+'.png')})}
 await b.close();
 const X=Math.round(cx+I.v.x*s),Y=Math.round(cy+I.v.y*s),W=Math.round(I.v.w*s),Hh=Math.round(I.v.h*s),ox=parseFloat(I.op)||50,src=path.join(EZ,'media',I.film+'.mp4'),sz=Math.max(W,Hh);
 const mix=`clip((T-${REV})/0.4\,0\,1)`;
 const fx=`[0:v]format=gbrp[a];[1:v]format=gbrp[b];[a][b]blend=all_expr='A*(1-${mix})+B*${mix}'[bg];[2:v]scale=${sz}:${sz},crop=${W}:${Hh}:(in_w-${W})*${ox/100}:(in_h-${Hh})/2[f];[bg][f]overlay=${X}:${Y}:shortest=1,format=yuv420p[v]`;
 execFileSync('ffmpeg',['-loglevel','error','-y','-framerate','30','-loop','1','-i',path.join(TMP,'A.png'),'-framerate','30','-loop','1','-i',path.join(TMP,'B.png'),'-i',src,'-filter_complex',fx,'-map','[v]','-map','2:a?','-c:v','libx264','-preset','slow','-crf','20','-r','30','-c:a','aac','-b:a','128k','-movflags','+faststart','-shortest',OUT]);
 fs.copyFileSync(path.join(TMP,'A.png'),OUT.replace(/\.mp4$/,'-A.png'));fs.copyFileSync(path.join(TMP,'B.png'),OUT.replace(/\.mp4$/,'-B.png'));
 console.log(OUT)})().catch(e=>{console.error(e);process.exit(1)});
