// node gen.js : writes g1..g5.css (mockup CSS laid over the built page by run.js). Hand-tuned SVG shapes are drawn here, seeded, then frozen into the CSS.
const fs=require('fs');let seed=7;const R=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const svg=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
// hand-cut burst: rays of uneven length and width, a second inner layer, wobbling tips (not an even sunburst)
function burst({n=22,cx=200,cy=200,r0=60,r1=190,fill='#2a62d6',fill2,ink,sw=0,w=400,h=400,inner=true}){
 const ray=(rA,rB,col,j)=>{let d='';for(let i=0;i<n;i++){const a=(i/n)*Math.PI*2+(R()-.5)*.08,a2=a+Math.PI/n*(.8+R()*.4),rb=rB*(.72+R()*.34),ra=rA*(.85+R()*.3);
   d+=(i?'L':'M')+(cx+Math.cos(a)*ra).toFixed(1)+','+(cy+Math.sin(a)*ra).toFixed(1)+' L'+(cx+Math.cos(a2-.5*Math.PI/n)*rb).toFixed(1)+','+(cy+Math.sin(a2-.5*Math.PI/n)*rb).toFixed(1)+' ';}
   return `<path d="${d}Z" fill="${col}" ${ink?`stroke="${ink}" stroke-width="${sw}" stroke-linejoin="round"`:''}/>`};
 return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='xMidYMid slice'>${ray(r0,r1,fill)}${inner?ray(r0*.55,r1*.55,fill2||fill):''}</svg>`}
// printer's registration target + colour bar, hand-drawn (slightly uneven ring, offset cross)
function reg(){const c=(x,y)=>`<g transform='translate(${x} ${y}) rotate(${(R()*4-2).toFixed(1)})'><circle r='7.5' fill='none' stroke='#15121a' stroke-width='1.1'/><circle r='3.6' fill='#15121a'/><path d='M-12 .3H12M.2-12V12' stroke='#15121a' stroke-width='.9'/><path d='M-1.6 0H1.6M0-1.6V1.6' stroke='#f3ead3' stroke-width='.9'/></g>`;
 const bar=['#00a0e0','#e5197e','#ffe100','#15121a','#ff5a0a','#2f6fe8'].map((k,i)=>`<rect x='${40+i*13}' y='${8+(R()-.5)}' width='11.5' height='9' fill='${k}' opacity='.92'/>`).join('');
 return svg(`<svg xmlns='http://www.w3.org/2000/svg' width='160' height='26'>${c(14,13)}${bar}${c(146,13)}</svg>`)}
// hand-ruled page edge: a wobbling 2px ink line, ends meet so it repeats down the page without a seam
function rule(h=620){let d='M3 0';for(let y=40;y<h;y+=40)d+=` Q${(3+(R()-.5)*2.2).toFixed(1)} ${y-20} ${(3+(R()-.5)*1.4).toFixed(1)} ${y}`;d+=` L3 ${h}`;
 return svg(`<svg xmlns='http://www.w3.org/2000/svg' width='6' height='${h}'><path d='${d}' fill='none' stroke='#15121a' stroke-width='1.8' stroke-linecap='round'/></svg>`)}
const S='html.gr-on.p1-on',CH=`${S} .wc-chars.pp1-mm`,SE=`${S} .wc-season.pp1-ms`,UP=`html.gr-on #wc-up .wc-tab-cv`;
const DESK='@media (min-width:1000px)';
const T={};
// ---------- G1 one painted city at night behind everything; sections are tinted gel panels over it ----------
T.g1=`html.gr-on{background:#07101f!important}
html.gr-on .gr-city{position:fixed;left:0;right:0;top:-8vh;height:116vh;z-index:-1;pointer-events:none;
 background:linear-gradient(180deg,rgba(7,16,31,0),rgba(7,16,31,.12) 60%,rgba(7,16,31,.3)),url(img/web/g1-city-phone.jpg) 50% 50%/cover}
${DESK}{html.gr-on .gr-city{background:linear-gradient(180deg,rgba(7,16,31,.1),rgba(7,16,31,.55)),url(img/web/g1-city-desk.jpg) 50% 40%/cover}}
@supports (animation-timeline:scroll()){html.gr-on .gr-city{animation:gr1p linear both;animation-timeline:scroll(root)}@keyframes gr1p{to{transform:translateY(-7vh)}}}
@media (prefers-reduced-motion:reduce){html.gr-on .gr-city{animation:none}}
${CH}{background:linear-gradient(165deg,rgba(255,128,24,.62),rgba(222,74,6,.84) 18%,rgba(190,50,4,.9))!important;box-shadow:0 0 0 2px rgba(255,190,90,.35),0 18px 40px rgba(0,0,0,.55)}
${SE}{background:linear-gradient(165deg,rgba(60,150,255,.6),rgba(28,96,220,.84) 30%,rgba(14,50,150,.9))!important;box-shadow:0 0 0 2px rgba(140,200,255,.35),0 18px 40px rgba(0,0,0,.55)}
${CH}::before,${SE}::before{background:radial-gradient(ellipse at 50% 0,rgba(255,240,200,.35),transparent 60%);-webkit-mask:none;mask:none}
${UP}{background-image:linear-gradient(100deg,rgba(10,8,20,.86) 30%,rgba(10,8,20,.35))!important;box-shadow:6px 6px 0 #fdbc2a,0 18px 40px rgba(0,0,0,.5)}
html.gr-on #wc-up .wc-flt{display:inline-flex;padding:8px 10px;background:url(img/web/g2-newsprint.jpg) 0 0/320px;border:3px solid #0d0b10;box-shadow:4px 4px 0 #0d0b10;transform:rotate(-.6deg)}
html.gr-on #wc-up .sg-d{background:url(img/web/g2-newsprint.jpg) 0 0/320px;border:3px solid #0d0b10;box-shadow:5px 6px 0 #0d0b10,0 16px 30px rgba(0,0,0,.45);padding:8px 10px 10px;margin-bottom:22px}
html.gr-on .wc-back,html.gr-on .wc-bet{color:#f8f0d9}
${S} .pp-mod{margin:84px 0 64px}`;
// ---------- G2 the comic page itself: aged newsprint, ink-ruled page edge, printer's marks, flat inks with a misregistered plate ----------
const gold2=burst({n:18,cx:420,cy:60,r0:30,r1:190,fill:'#fdbc2a',fill2:'#ffcf4d',ink:'#0d0b10',sw:1.6,w:400,h:300});
T.g2=`html.gr-on{background:${rule()} 5px 0/6px 620px repeat-y,${rule()} calc(100% - 5px) 37px/6px 620px repeat-y,url(img/web/g2-newsprint.jpg) 0 0/320px!important;background-color:#e9dcb8!important}
${CH},${SE}{background:url(img/web/g2-newsprint.jpg) 0 0/320px!important}
${CH}::before,${SE}::before{inset:9px -2px -4px 7px;-webkit-mask:none;mask:none;background:url(img/web/g2-ink-orange.jpg) 0 0/360px}
${SE}::before{inset:8px -3px -5px 10px;background:url(img/web/g2-ink-blue.jpg) 0 0/360px;filter:saturate(1.15) hue-rotate(8deg)}
${CH}::after,${SE}::after{inset:-30px 0 auto;height:26px;mix-blend-mode:normal;opacity:.95;background:${reg()} 50% 0/160px 26px no-repeat}
${UP}{background:url(img/web/g2-ink-black.jpg) 0 0/360px!important;background-image:${svg(gold2)},url(img/web/g2-ink-black.jpg)!important;background-size:100% 100%,360px!important;background-blend-mode:normal}
${UP}::after{content:"";position:absolute;inset:0;pointer-events:none;background:url(img/web/g2-ink-black.jpg) 0 0/360px;opacity:.0}`;
// ---------- G3 each section on its own painted backdrop (backstage, newsstand street, the arena) on a painted plaster wall ----------
T.g3=`html.gr-on{background:url(img/web/g3-plaster.jpg) 0 0/360px!important}
${CH}{background:linear-gradient(180deg,rgba(255,110,20,.42),rgba(255,110,20,.12) 500px,rgba(255,110,20,.18)),url(img/web/g3-backstage-2k.jpg) 50% 0/cover!important}
${SE}{background:linear-gradient(180deg,rgba(40,120,255,.35),rgba(40,120,255,.08) 420px),url(img/web/g3-street-2k.jpg) 50% 30%/cover!important}
${CH}::before,${SE}::before{display:none}
${CH}::after,${SE}::after{opacity:.3}
${CH}{background-blend-mode:multiply,normal!important}
${UP}{background:linear-gradient(90deg,rgba(8,8,12,.92) 40%,rgba(8,8,12,.55) 62%,rgba(8,8,12,0) 85%),url(img/web/g3-arena.jpg) 100% 50%/cover!important}`;
// ---------- G4 risograph: cream riso paper, two inks (fluorescent orange, medium blue), the other ink overprinted as a hand-cut burst ----------
const b4o=burst({n:20,cx:110,cy:90,r0:30,r1:280,fill:'#2b5fd8',fill2:'#2b5fd8',w:400,h:520,inner:false});
const b4b=burst({n:20,cx:120,cy:80,r0:30,r1:280,fill:'#ff7a1a',fill2:'#ff7a1a',w:400,h:520,inner:false});
T.g4=`html.gr-on{background:url(img/web/g4-riso-paper.jpg) 0 0/340px!important}
${CH}{background:url(img/web/g4-riso-orange.jpg) 0 0/340px!important}
${SE}{background:url(img/web/g4-riso-blue.jpg) 0 0/340px!important}
${CH}::before,${SE}::before{-webkit-mask:none;mask:none;inset:0 0 auto;height:min(560px,70%);mix-blend-mode:multiply;opacity:.78;background:${svg(b4o)} 0 0/100% 100% no-repeat}
${SE}::before{background:${svg(b4b)} 0 0/100% 100% no-repeat;opacity:.72}
${CH}::after,${SE}::after{opacity:.4}
${UP}{background:url(img/web/g4-riso-blue.jpg) 0 0/340px!important;background-image:${svg(burst({n:16,cx:330,cy:90,r0:30,r1:330,fill:'#ff7a1a',inner:false,w:400,h:300}))},url(img/web/g4-riso-blue.jpg)!important;background-size:100% 100%,340px!important;background-blend-mode:multiply!important;box-shadow:6px 6px 0 #ff7a1a}`;
// ---------- G5 cut-paper diorama: kraft card page, each section a stack of hand-cut card ----------
T.g5=`html.gr-on{background:url(img/web/g5-kraft.jpg) 0 0/360px!important}
${CH}{background:url(img/web/g5-cut-orange.jpg) 50% 0/cover!important}
${SE}{background:url(img/web/g5-cut-blue.jpg) 50% 0/cover!important}
${CH}::before,${SE}::before{display:none}
${CH}::after,${SE}::after{opacity:.25}
${CH},${SE}{box-shadow:3px 4px 0 #0d0b10,8px 14px 18px rgba(60,30,0,.35)}
${UP}{background:linear-gradient(90deg,rgba(8,6,10,.9) 42%,rgba(8,6,10,.5) 62%,rgba(8,6,10,0) 85%),url(img/web/g5-cut-dark.jpg) 0% 40%/cover!important}`;
for(const k in T)fs.writeFileSync(k+'.css',T[k]+'\n');console.log(Object.keys(T))
// desktop backdrops (16:9) and the 2K city
const add={g1:`html.gr-on .gr-city{background:linear-gradient(180deg,rgba(7,16,31,0),rgba(7,16,31,.12) 60%,rgba(7,16,31,.3)),url(img/web/g1-city-phone-2k.jpg) 50% 50%/cover}
${DESK}{html.gr-on .gr-city{background:linear-gradient(180deg,rgba(7,16,31,.05),rgba(7,16,31,.35)),url(img/web/g1-city-desk.jpg) 50% 40%/cover}}`,
g3:`${DESK}{${CH}{background:linear-gradient(180deg,rgba(255,110,20,.42),rgba(255,110,20,.12) 500px,rgba(255,110,20,.18)),url(img/web/g3-backstage-desk.jpg) 50% 30%/cover!important}
${SE}{background:linear-gradient(180deg,rgba(40,120,255,.35),rgba(40,120,255,.08) 420px),url(img/web/g3-street-desk.jpg) 50% 40%/cover!important}}`,
g5:`${DESK}{${CH}{background:url(img/web/g5-cut-orange-desk2.jpg) 30% 20%/cover!important}${SE}{background:url(img/web/g5-cut-blue-desk.jpg) 30% 20%/cover!important}}`};
for(const k in add)fs.appendFileSync(k+'.css',add[k]+'\n');
// ---------- G6 painted (carte blanche): gouache brushwork like a painted animated feature, no print devices at all ----------
fs.writeFileSync('g6.css',`html.gr-on{background:url(img/web/g6-canvas.jpg) 0 0/420px!important}
${CH}{background:radial-gradient(ellipse 80% 340px at 30% 60px,rgba(255,214,120,.45),transparent 70%),url(img/web/g6-orange.jpg) 0 0/460px!important}
${SE}{background:radial-gradient(ellipse 80% 300px at 30% 50px,rgba(170,220,255,.38),transparent 70%),url(img/web/g6-blue.jpg) 0 0/460px!important}
${CH}::before,${SE}::before{display:none}
${CH}::after,${SE}::after{opacity:.2}
${UP}{background:linear-gradient(90deg,rgba(12,8,16,.8) 40%,rgba(12,8,16,0) 80%),url(img/web/g6-night.jpg) 80% 30%/cover!important}
`);
