/* Round H22 · chips6: Meet the models, final asset. "N2 clean, with the swap" (owner, 2026-11-01 ~21:30 UTC).
   ONE master painting (img/chip6-*.webp, from img/m6-c.jpg via shift.py): a real ceramic CERDIP EPROM (lid with sintered grain, frit seal
   seam, pin-1 notch and dimple, gold DIP pins) with an exposed silicon die (pad ring, I/O cells, seal ring, memory arrays, standard-cell
   rows, routing, gold bond wires). Every chip is that same painting; the ceramic is re-coloured per model in code (a multiply layer
   clipped to the body, the plate, label and cavity laid back over it from the same image), so every part sits in the same place.
   Layout, left to right: the gold logo plate (top left) with the small etched flag under it; the label beside the plate (name + version,
   No., Last 5, W-L, Season P&L); the die at the right end. The die's silicon runs from the plate's top to the flag's bottom; the founder's
   loop fills the die's core (inside the pad ring) edge to edge: no mask, no vignette, no blend. Small print etched in the ceramic between
   the plate and the flag: the lab (the chip's maker) and the date code (YYWW of the last graded round) with the lot (rounds graded).
   Self-contained: needs only window.__x2pPnl, ROUNDS and MODELS (the built X2+ page). Optional: window.__C6IMG (image folder, default this
   folder), window.__C6MEDIA (default 'media/'), window.__C6FP = etch | print | enamel (default etch).
   DOM: inserts <section class="ch c6"> before #standings and hides #standings (or appends to <main>). window.__c6 = {boxes, rebuild, data}. */
(function(){
const D=document,W=window;if(!W.__x2pPnl||!W.ROUNDS||!W.MODELS)return;
const IMG=W.__C6IMG||'tools/concepts/worlds/comic/story/h/chips6/img/',MED=W.__C6MEDIA||'media/',FP=W.__C6FP||'etch';
if(!D.getElementById('t1-fonts')){const l=D.createElement('link');l.id='t1-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&display=block';D.head.appendChild(l)}
/* ---------- geometry: the master painting's own pixels (1228 x 458 after the crop), measured on img/m6-master.jpg ---------- */
const G={size:[1228,458],
  body:[21,36,1201,394],                 /* the ceramic lid (tinted) */
  plate:[68,79,236,227],                 /* gold logo plate, outer ink edge */
  pad:[73,84,231,222],                   /* its gold face */
  flag:[99.5,267.5,204.5,337.5],         /* the flag: 62% of the plate's width, 3:2, centred under it, its bottom on the die's bottom */
  mark:[68,236,236,262],                 /* the small print, between the plate and the flag */
  label:[252,77,833,370],                /* the black epoxy label, outer */
  print:[266,89,819,358],                /* its printable face */
  cavity:[856,48,1194,371],              /* the gold cavity (kept over the tint) */
  die:[897,79,1150,337.5],               /* the silicon die's edge: top = the plate's top, bottom = the flag's bottom */
  core:[916,97,1132,318]};               /* the die's core inside the pad ring: the founder's loop */
const TG={size:[1164,483],strip:[124,74,1032,157],wins:[[207,240,61,59],[450,240,58,59],[692,240,59,59],[940,240,60,59]],
  labels:[[109,323,295,385],[356,323,543,385],[601,323,790,385],[848,323,1040,385]]};
const MK={"Qwen":{"cc":"CN","fr":true,"d":"M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z"},"Mistral":{"cc":"EU","fr":true,"d":"M3.428 3.4h3.429v3.428h3.429v3.429h-.002 3.431V6.828h3.427V3.4h3.43v13.714H24v3.429H13.714v-3.428h-3.428v-3.429h-3.43v3.428h3.43v3.429H0v-3.429h3.428V3.4zm10.286 13.715h3.428v-3.429h-3.427v3.429z"},"Gemini":{"cc":"US","fr":false,"d":"M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"},"Nemotron":{"cc":"US","fr":false,"d":"M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"}};
Object.assign(MK,W.__C6MARKS||{});
/* ---------- live data ---------- */
const A=W.__x2pPnl().A,MD=W.MODELS;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},CC={us:'United States',cn:'China',eu:'European Union'};
const LAB={GPT:'OPENAI',CLAUDE:'ANTHROPIC',GROK:'XAI',KIMI:'MOONSHOT AI'};
const TINT={GROK:'#5b5e66',CLAUDE:'#dd6a3a',GPT:'#1f9a70',KIMI:'#3a63d6'};
const rank=Object.keys(A).filter(m=>MD[m]).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0];
const pnl=m=>A[m].bal-100000,$=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const wl=m=>A[m].W+'-'+A[m].L,ver=m=>(MD[m].ver||'').replace(/^(GPT-|Grok |Kimi )/i,'');
const Gd=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)),L5=Gd.slice(-5),LAST=Gd[Gd.length-1];
const last5=m=>L5.map(r=>{const p=A[m].per[r.n];return p?(p.v>0?'W':'L'):'-'});
/* date code: YYWW (ISO week) of the last graded round's close; lot: the rounds graded */
const dcode=(()=>{const s=(LAST&&(LAST.resolves||LAST.called))||'';const m=s.match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return '';
  const d=new Date(Date.UTC(2000+ +m[3],+m[1]-1,+m[2])),t=new Date(d);t.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));
  const wk=Math.ceil(((t-Date.UTC(t.getUTCFullYear(),0,1))/864e5+1)/7);return String(t.getUTCFullYear()%100).padStart(2,'0')+String(wk).padStart(2,'0')})();
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const INK={cr:'#f1e8cf',mut:'#cdc4aa',lbl:'#b3aa90',up:'#46e88a',dn:'#ff5a4e',gd:'#ffd21f'};
/* ---------- drawing helpers ---------- */
const T=(x,y,s,t,o={})=>`<text x="${x}" y="${y}" font-size="${s}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||INK.cr}" class="${o.cls||'ch-an'}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const lab=(x,y,s,t,a)=>T(x,y,s,t,{a,c:INK.lbl,cls:'ch-lb',ls:s*.1});
const fit=(w,ax,inner,y)=>`<g class="ch-fit" data-w="${w}" data-ax="${ax}" data-y="${y}">${inner}</g>`;
const path=(d,fr,col)=>`<path d="${d}" fill="${col}" ${fr?'fill-rule="evenodd"':''}/>`;
const mark=(m,x,y,s,col)=>{const M=MD[m]||{};return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24">${path(M.d||'',M.fr,col)}${M.dot?path(M.dot,0,col):''}</svg>`};
const star=(cx,cy,r,rot=0)=>{let p='';for(let i=0;i<10;i++){const a=rot+Math.PI*i/5-Math.PI/2,rr=i%2?r*.42:r;p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2)}return p+'Z'};
function flagSm(c,x,y,w,h){let s=`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 30 20" preserveAspectRatio="none">`;
  if(c==='us'){s+='<rect width="30" height="20" fill="#efe6d0"/>';for(let i=0;i<7;i++)s+=`<rect y="${i*40/13}" width="30" height="${20/13}" fill="#b8202a"/>`;s+='<rect width="13" height="10.77" fill="#1d2f6b"/>'}
  else if(c==='cn'){s+='<rect width="30" height="20" fill="#d42a1e"/>'+`<path d="${star(5,5,3)}" fill="#ffd21f"/>`;[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(([a,b,r])=>s+=`<path d="${star(a,b,1,r)}" fill="#ffd21f"/>`)}
  else{s+='<rect width="30" height="20" fill="#1d3a94"/>';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<path d="${star(15+6*Math.cos(a),10+6*Math.sin(a),1.05)}" fill="#ffd21f"/>`}}
  return s+'</svg>'}
function cells(seq,x,y,c,gap){return seq.map((k,i)=>{const X=x+i*(c+gap),col=k==='W'?INK.up:k==='L'?INK.dn:'#5d584c',sw=c*.17,
  g=k==='W'?`<path d="M${X+c*.2} ${y+c*.52}L${X+c*.42} ${y+c*.74}L${X+c*.8} ${y+c*.28}" stroke="#000" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
   :k==='L'?`<path d="M${X+c*.27} ${y+c*.27}L${X+c*.73} ${y+c*.73}M${X+c*.73} ${y+c*.27}L${X+c*.27} ${y+c*.73}" stroke="#000" stroke-width="${sw}" stroke-linecap="round"/>`
   :`<path d="M${X+c*.3} ${y+c*.5}H${X+c*.7}" stroke="#000" stroke-width="${sw}" stroke-linecap="round"/>`;
  return `<g><rect x="${X}" y="${y}" width="${c}" height="${c}" rx="${c*.1}" fill="${col}"/>${g}</g>`}).join('')}
/* boxes: a master rect [x0,y0,x1,y1] -> % of the painting */
const pc=(v,t)=>(v/t*100).toFixed(4)+'%';
const at=(r,S)=>`left:${pc(r[0],S[0])};top:${pc(r[1],S[1])};width:${pc(r[2]-r[0],S[0])};height:${pc(r[3]-r[1],S[1])}`;
const clip=(r,S)=>`clip-path:inset(${pc(r[1],S[1])} ${pc(S[0]-r[2],S[0])} ${pc(S[1]-r[3],S[1])} ${pc(r[0],S[0])})`;
/* a surface: an SVG in the master's own units, laid exactly on its box */
const surf=(r,S,cls,inner,filt)=>{const w=r[2]-r[0],h=r[3]-r[1];return `<div class="c6-sf ${cls}" style="${at(r,S)}"><svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${filt?`<g filter="url(#${filt})">`:''}${inner(w,h)}${filt?'</g>':''}</svg></div>`};
const img=(n,w2,w1,cls,st)=>`<img class="${cls}" src="${IMG+n}-${w1}.jpg" srcset="${IMG+n}-${w1}.webp ${w1}w, ${IMG+n}-${w2}.webp ${w2}w" sizes="(min-width:1000px) 580px, 100vw" alt="" draggable="false" decoding="async" style="${st||''}">`;
/* ---------- the label: one fixed grid of printed fields (as chips5) ----------
   row 1 [ NAME version ......... ][ NO. n ]   row 2 [ LAST 5 cells ...... ][ W-L ]   row 3 [ SEASON P&L ........ +$148,480 ] */
const COLS=.70;
function labelB(m,i,w,h){const u=h/100,nm=NM[m].toUpperCase(),v=ver(m).toUpperCase(),ns=27*u,ls=12.5*u,c=14*u,gap=3*u,cx=w*COLS,pdx=3.5*u;
  const fd=(k,x,y,fw,fh)=>`<rect class="c6-fd" data-k="${k}" x="${x}" y="${y}" width="${fw}" height="${fh}" fill="none"/>`;
  const rule=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${INK.lbl}" stroke-width="${.9*u}" opacity=".55"/>`;
  let s=fd('name',0,0,cx,34*u)+fd('no',cx,0,w-cx,34*u)+fd('last5',0,34*u,cx,33*u)+fd('wl',cx,34*u,w-cx,33*u)+fd('pnl',0,67*u,w,33*u);
  s+=rule(0,34*u,w,34*u)+rule(0,67*u,w,67*u)+rule(cx,3*u,cx,64*u);
  s+=fit(cx-2*pdx,'start',T(pdx,26*u,ns,nm)+T(pdx,26*u,ns*.6,v,{c:INK.mut,cls:'ch-an ch-ver'}),26*u);
  s+=lab(cx+pdx,11.5*u,ls*.8,'NO.')+T(w-pdx,30*u,17*u,String(i+1),{a:'end',c:i?INK.cr:INK.gd});
  s+=lab(pdx,56*u,ls,'LAST 5')+cells(last5(m),pdx+ls*3.5,56*u-c*.86,c,gap);
  s+=lab(cx+pdx,44.5*u,ls*.8,'W-L')+fit(w-cx-2*pdx,'end',T(w-pdx,63*u,17*u,wl(m),{a:'end'}),63*u);
  s+=lab(pdx,92*u,ls,'SEASON P&L')+fit(w-2*pdx-ls*6.2,'end',T(w-pdx,95*u,27*u,$(pnl(m)),{a:'end',c:pnl(m)>=0?INK.up:INK.dn,cls:'ch-an ch-pl'}),95*u);
  return s}
/* ---------- the flag, made by the chip's own process (etch default; print and enamel kept from chips5) ---------- */
function fshapes(c){const S=[];
  if(c==='us'){S.push(['w','rect',0,0,30,20]);for(let i=0;i<7;i++)S.push(['r','rect',0,i*40/13,30,20/13]);S.push(['b','rect',0,0,13,10.77]);
    for(let r=0;r<5;r++)for(let k=0;k<(r%2?4:5);k++)S.push(['w','star',1.4+k*2.55+(r%2)*1.27,1.3+r*2.05,.62,0])}
  else if(c==='cn'){S.push(['r','rect',0,0,30,20]);S.push(['y','star',5,5,3,0]);[[10,2,.9],[12,4,.5],[12,7,.1],[10,9,-.3]].forEach(([a,b,r])=>S.push(['y','star',a,b,1,r]))}
  else{S.push(['b','rect',0,0,30,20]);for(let i=0;i<12;i++){const a=i*Math.PI/6;S.push(['y','star',15+6*Math.cos(a),10+6*Math.sin(a),1.05,0])}}
  return S}
const shp=(s,sx,sy,a)=>s[1]==='rect'?`<rect x="${s[2]*sx}" y="${s[3]*sy}" width="${s[4]*sx}" height="${s[5]*sy}" ${a}/>`:`<path d="${star(s[2]*sx,s[3]*sy,s[4]*sx,s[5])}" ${a}/>`;
let fid=0;
function flagP(c,w,h){const id='c6f'+(++fid),sx=w/30,sy=h/20,S=fshapes(c),u=w/200;
  if(FP==='print'){const P={r:'#a8232b',w:'#ece2c8',b:'#22336e',y:'#e9b92b'};
    return `<g filter="url(#c6Ink)">${S.map(s=>shp(s,sx,sy,`fill="${P[s[0]]}"`+(s[0]==='b'?` transform="translate(${.7*u} ${.5*u})"`:''))).join('')}</g>`}
  if(FP==='enamel'){const EN={r:['#d8323a','#9c1620'],w:['#fbf4e2','#d9ccae'],b:['#3552a8','#17265e'],y:['#ffe27a','#d39a18']};
    let d=`<defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2b8"/><stop offset=".45" stop-color="#e4b24a"/><stop offset="1" stop-color="#8a5a10"/></linearGradient>`;
    Object.entries(EN).forEach(([k,[a,b]])=>d+=`<linearGradient id="${id}${k}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`);
    d+='</defs>';const wire=`stroke="url(#${id}g)" stroke-width="${1.3*u}" stroke-linejoin="round"`;
    return d+S.map(s=>shp(s,sx,sy,`fill="url(#${id}${s[0]})" ${s!==S[0]?wire:''}`)).join('')+`<rect x="${1.6*u}" y="${1.6*u}" width="${w-3.2*u}" height="${h-3.2*u}" fill="none" stroke="url(#${id}g)" stroke-width="${3.2*u}"/>`}
  /* etch: the flag etched into the chip's metal layer: red fields bare copper, white tinned, blue heat-blued steel, yellow gold plate;
     every raised edge catches the gold key light from the top left (a pale lip, a dark wall); an etched trench round the edge */
  const MT={r:['#ec8a72','#b4362a','#64160e'],w:['#f4efe4','#c9c1b0','#8d8577'],b:['#5e7cc8','#2c418a','#121d4a'],y:['#fff0a0','#e2b03a','#8a5c0c']};
  let d='<defs>';Object.entries(MT).forEach(([k,[a,b,c2]])=>d+=`<linearGradient id="${id}${k}" x1="0" y1="0" x2=".55" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`);
  d+=`<pattern id="${id}h" width="${2.2*u}" height="${2.2*u}" patternUnits="userSpaceOnUse"><path d="M0 ${2.2*u}L${2.2*u} 0" stroke="#000" stroke-width="${.5*u}" opacity=".22"/></pattern>`;
  d+=`<radialGradient id="${id}k" cx=".15" cy="0" r="1.1"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".55"/><stop offset=".55" stop-color="#ffcf70" stop-opacity="0"/></radialGradient></defs>`;
  const lit=s=>shp(s,sx,sy,`fill="#fff3d0" opacity=".55" transform="translate(${-.9*u} ${-.9*u})"`)+shp(s,sx,sy,`fill="#2a1206" opacity=".7" transform="translate(${1.1*u} ${1.3*u})"`)+shp(s,sx,sy,`fill="url(#${id}${s[0]})"`);
  return d+`<rect width="${w}" height="${h}" fill="#2a1408"/>`+S.map(lit).join('')+S.filter(s=>s[0]==='b').map(s=>shp(s,sx,sy,`fill="url(#${id}h)"`)).join('')
    +`<rect width="${w}" height="${h}" fill="url(#${id}k)" style="mix-blend-mode:screen"/>`+`<rect x=".5" y=".5" width="${w-1}" height="${h-1}" fill="none" stroke="#1a0c04" stroke-width="${1.6*u}" opacity=".8"/>`}
/* the small print, laser-marked into the ceramic (frosted, a faint burn halo): the maker, then the date code and lot */
const smallPrint=m=>(w,h)=>T(w/2,h*.44,h*.4,LAB[m],{a:'middle',c:'#2a241d',cls:'ch-lb c6-sp',ls:h*.06})+T(w/2,h*.94,h*.36,(dcode?dcode+' · ':'')+'LOT R'+Gd.length,{a:'middle',c:'#2a241d',cls:'ch-lb c6-sp',ls:h*.05});
const vid=m=>{const b=MED+'founder-'+m.toLowerCase()+'-anim';return `<video muted loop playsinline preload="metadata" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`};
/* ---------- one chip ---------- */
function chip(m,i){const S=G.size,lit=m===lead,c='chip6';
  const keep=[G.plate,G.label,G.cavity].map(r=>img(c,1228,800,'c6-keep',clip([r[0]-4,r[1]-4,r[2]+4,r[3]+4],S))).join('');
  return `<div class="c6-pic${lit?' c6-lead':''}" style="--tint:${TINT[m]}">
   ${lit?`<i class="c6-rays" style="background-image:url(${IMG}rays6.webp)"></i>`:''}${img(c,1228,800,'c6-base')}<i class="c6-tint" style="${clip(G.body,S)}"></i>${keep}
   <div class="c6-die c6-core" style="${at(G.core,S)}">${vid(m)}</div>
   ${surf(G.pad,S,'c6-gold c6-pad',(w,h)=>{const s=Math.min(w,h)*.72;return mark(m,(w-s)/2,(h-s)/2,s,'#3a2606')})}
   ${surf(G.flag,S,'c6-flag',(w,h)=>flagP(FLAG[m],w,h))}
   ${surf(G.mark,S,'c6-mark',smallPrint(m),'c6Etch')}
   ${surf(G.print,S,'c6-print c6-label',(w,h)=>labelB(m,i,w,h),'c6Ink')}
   ${img(c,1228,800,'c6-lx',clip(G.label,S))}
   <i class="c6-box c6-diebox" style="${at(G.die,S)}"></i><i class="c6-box c6-platebox" style="${at(G.plate,S)}"></i></div>`}
/* ---------- the fifth chip: four labs still in inference (kept from chips5) ---------- */
const TRY=['Mistral','Qwen','Gemini','Nemotron'];
function tryChip(){const S=TG.size,c='try6';
  const strip=surf(TG.strip,S,'c6-print',(w,h)=>fit(w*.94,'mid',T(w/2,h*.74,h*.56,'IN INFERENCE',{a:'middle',c:INK.gd}),h*.74),'c6Ink');
  const dies=TRY.map((t,i)=>{const[cx,cy,rx,ry]=TG.wins[i],k=.8;return `<div class="c6-try c6-try${i}" style="${at([cx-rx*k,cy-ry*k,cx+rx*k,cy+ry*k],S)}"><svg viewBox="0 0 24 24" aria-hidden="true">${path((MK[t]||{}).d||'',(MK[t]||{}).fr,INK.cr)}</svg><i class="c6-scan"></i></div>`}).join('');
  const labs=TRY.map((t,i)=>{const r=TG.labels[i],w0=r[2]-r[0],h0=r[3]-r[1],ins=[r[0]+w0*.06,r[1]+h0*.14,r[2]-w0*.05,r[3]-h0*.14];
    return surf(ins,S,'c6-print',(w,h)=>{const cc=((MK[t]||{}).cc||'US').toLowerCase(),fh=h*.6,fw=fh*1.5;return fit(w-fw-h*.35,'start',T(0,h*.82,h*.74,t.toUpperCase()),h*.82)+flagSm(cc,w-fw,(h-fh)/2,fw,fh)},'c6Ink')}).join('');
  const lx=[TG.strip,...TG.labels].map(r=>img(c,1164,780,'c6-lx',clip(r,S))).join('');
  return `<div class="c6-pic c6-t" style="aspect-ratio:${S[0]}/${S[1]}">${img(c,1164,780,'c6-base')}${strip}${dies}${labs}${lx}</div>`}
/* ink filters: silkscreen (#c6Ink) and laser marking (#c6Etch) */
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <filter id="c6Ink" x="-5%" y="-10%" width="110%" height="120%" color-interpolation-filters="sRGB">
  <feMorphology in="SourceGraphic" operator="dilate" radius=".35" result="sp"/><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="sp" in2="n" scale=".7" xChannelSelector="R" yChannelSelector="G" result="dp"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="3" result="v"/>
  <feColorMatrix in="v" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.3 1.55" result="va"/><feComposite in="dp" in2="va" operator="in" result="pr"/>
  <feGaussianBlur in="pr" stdDeviation=".28" result="bl"/><feMerge><feMergeNode in="bl"/><feMergeNode in="pr"/></feMerge></filter>
 <filter id="c6Etch" x="-5%" y="-10%" width="110%" height="120%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="11" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.4 1.6" result="fr"/>
  <feComposite in="SourceGraphic" in2="fr" operator="in" result="f"/><feGaussianBlur in="SourceAlpha" stdDeviation=".8" result="h"/>
  <feFlood flood-color="#5a4a38" flood-opacity=".35"/><feComposite in2="h" operator="in" result="burn"/><feMerge><feMergeNode in="burn"/><feMergeNode in="f"/></feMerge></filter>
</defs></svg>`;
/* ---------- mount ---------- */
const st=D.getElementById('standings'),sec=D.createElement('section');sec.className='ch c6 c6-fp-'+FP+(W.__C6GRID?' c6-grid':'');sec.setAttribute('aria-label','Meet the models');
function fitAll(){sec.querySelectorAll('.ch-ver').forEach(t=>{const n=t.previousElementSibling;if(!n)return;const b=n.getBBox();t.setAttribute('x',b.x+b.width+(+n.getAttribute('font-size'))*.22)});
  sec.querySelectorAll('.ch-fit').forEach(g=>{g.removeAttribute('transform');const w=+g.dataset.w,bb=g.getBBox();
  if(bb.width>w){const k=w/bb.width,ax=g.dataset.ax==='end'?bb.x+bb.width:g.dataset.ax==='mid'?bb.x+bb.width/2:bb.x,y=+g.dataset.y;g.setAttribute('transform',`translate(${ax} ${y}) scale(${k}) translate(${-ax} ${-y})`);g.dataset.k=k.toFixed(3)}else g.dataset.k='1'})}
function build(){
  sec.innerHTML=`${DEFS}<h2 class="ch-h"><span class="ch-w">Meet the</span> <span class="ch-w ch-w2">models</span></h2>
   <p class="ch-sub"><span>Ranked by season P&amp;L.</span> <span>$100K on every call.</span></p>
   <ol class="ch-beats ch-b" aria-hidden="true"><li class="ch-beat"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-g"><b>Season 1</b> <span>· the board, by P&amp;L</span></div>
     <div class="c6-four">${rank.map((m,i)=>`<div class="c6-one" data-m="${m}">${chip(m,i)}</div>`).join('')}</div></div></div></li>
    <li class="ch-beat ch-tb"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-t"><b>No. 5?</b> <span>· not signed yet</span></div>${tryChip()}</div></div></li></ol>
   <ol class="ch-sr">${rank.map((m,i)=>`<li>No. ${i+1} ${esc(MD[m].ver)}, ${CC[FLAG[m]]}: last five ${last5(m).map(k=>k==='W'?'right':k==='L'?'wrong':'no call').join(', ')}; ${wl(m)} W-L; season P&L ${$(pnl(m))}</li>`).join('')}
    <li>In inference: ${TRY.map(t=>t+' ('+CC[((MK[t]||{}).cc||'US').toLowerCase()]+')').join(', ')}</li></ol>`;
  requestAnimationFrame(fitAll);wire()}
const RM=matchMedia('(prefers-reduced-motion: reduce)');let io=null;
function wire(){if(RM.matches||!('IntersectionObserver' in W)){sec.classList.add('c6-still');return}
  io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.muted=true;const p=v.play();p&&p.catch(()=>{})}else v.pause()}),{rootMargin:'80px 0px'});
  sec.querySelectorAll('video').forEach(v=>io.observe(v))}
if(st){st.before(sec);st.style.display='none'}else D.querySelector('main').append(sec);
build();D.fonts&&D.fonts.ready.then(fitAll);
const rel=(e,R)=>{const r=e.getBoundingClientRect();return [r.left-R.left,r.top-R.top,r.width,r.height].map(v=>+v.toFixed(2))};
W.__c6={boxes:()=>[...sec.querySelectorAll('.c6-one')].map(o=>{const P=o.querySelector('.c6-pic'),R=P.getBoundingClientRect(),q=s=>rel(o.querySelector(s),R);
  return {m:o.dataset.m,chip:[R.left,R.top+scrollY,R.width,R.height].map(v=>+v.toFixed(2)),plate:q('.c6-platebox'),logo:q('.c6-pad'),flag:q('.c6-flag'),label:q('.c6-label'),die:q('.c6-diebox'),loop:q('.c6-core'),mark:q('.c6-mark'),
   ...Object.fromEntries([...o.querySelectorAll('.c6-fd')].map(f=>['f_'+f.dataset.k,rel(f,R)]))}}),fit:fitAll,rebuild:build,
  data:{rank,lead,dcode,lot:Gd.length,rows:rank.map(m=>[m,pnl(m),wl(m),last5(m).join('')]),l5:L5.map(r=>r.n)}};
D.documentElement.classList.add('c6-ready');
})();
