/* Round H25 · theme7: "the whole game" as its own small section (mockup). window.__t7film(take): take 'm' monitor, 'c' cartridge, 'p' plug, 'l' silkscreen line.
   The section replaces today's film beat (.t4-b3 and the gutter before it) and sits right after the top, as its own section.
   Paintings: theme7/out/t7f-<take>.jpg, crops of 4K gpt-image-2 masters (boxes below, in the master's px). Live text: the LED's running time, read from the film. */
(function(){
const W=window,D=document,M=W.__T7M||'tools/concepts/worlds/comic/story/h/theme7/out/',MED='media/';
const BOX={m:[560,520,3220,1600],c:[900,150,2900,2120],p:[0,560,3300,1520],k:[1440,600,2400,1560]};
/* glass, LED and key in the master's px (flood-filled from the paintings, glass.py) */
const GL={m:{scr:[1036,756,2056,1376],led:[2296,780,2880,1020],key:[2592,1242,140]},c:{lbl:[1252,332,2576,1348]},p:{led:[1904,616,2792,932],plug:[300,840,1340,1320],sock:[1880,1060,2440,1400]}};
const css=`
section.t7-film{position:relative;margin:0;padding:0;grid-column:1 / -1}
@media (min-width:760px){section.t7-film .t7-f,section.t7-film .t7-silkline{max-width:760px;margin:0 auto}}
.t7-f{position:relative;width:100%}
.t7-f svg{display:block;width:100%;height:auto}
.t7-f .led{font:400 1px Anton,sans-serif;letter-spacing:.04em}
.t7-cap{position:absolute;z-index:3;left:10px;top:-6px;transform:rotate(-1.5deg);background:#f2c531;color:#141012;font:400 15px/1 Bangers,Anton,sans-serif;letter-spacing:.04em;padding:5px 9px 4px;border:2px solid #141012;box-shadow:2px 2px 0 #141012;text-transform:uppercase;white-space:nowrap}
.t7-cap small{font:700 10px/1 'Barlow Condensed',sans-serif;letter-spacing:.12em;margin-left:6px;vertical-align:1px}
.t7-btn{position:absolute;z-index:4;border:0;padding:0;background:transparent;border-radius:50%;cursor:pointer;-webkit-tap-highlight-color:transparent}
.t7-btn:focus-visible{outline:2px solid #ffd76a;outline-offset:3px}
.t7-side{position:absolute;z-index:3;display:flex;flex-direction:column;justify-content:center;gap:6px;color:#f8f0d9}
.t7-side .q{font:400 13px/1.15 'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(248,240,217,.7)}
.t7-side .t{font:400 30px/.9 Bangers,Anton,sans-serif;letter-spacing:.02em;text-transform:uppercase;color:#f2c531;-webkit-text-stroke:1.2px #141012;text-shadow:.04em .04em 0 #0a5c2e,.08em .08em 0 #141012}
.t7-side .r{font:700 12px/1 'Barlow Condensed',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#f8f0d9}
.t7-side .r b{color:#ffd76a}
.t7-silkline{display:flex;align-items:center;gap:10px;padding:10px 16px 12px}
.t7-silkline img{width:44px;height:44px;border-radius:50%;flex:none;filter:drop-shadow(0 2px 0 #000)}
.t7-silkline span{font:700 15px/1 'Barlow Condensed',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(248,240,217,.86);text-shadow:0 1px 0 rgba(0,0,0,.7),0 -1px 0 rgba(255,255,255,.06)}
.t7-silkline span b{color:#ffd76a;font-weight:800;letter-spacing:.12em}
.t7-silkline i{flex:1;height:2px;background:repeating-linear-gradient(90deg,rgba(255,214,120,.6) 0 6px,transparent 6px 10px)}
.t7-play{position:fixed;inset:0;z-index:99;background:rgba(0,0,0,.92);display:none;align-items:center;justify-content:center}
.t7-play video{width:100%;max-width:1100px;aspect-ratio:16/9}
@media (prefers-reduced-motion:no-preference){.t7-f .k-glow{animation:t7k 2.6s ease-in-out infinite}@keyframes t7k{50%{opacity:.25}}}
`;
const sv=(b,inner)=>`<svg viewBox="${b[0]} ${b[1]} ${b[2]-b[0]} ${b[3]-b[1]}" aria-hidden="true">${inner}</svg>`;
const img=(k)=>{const b=BOX[k];return `<image href="${M}t7f-${k}.jpg" x="${b[0]}" y="${b[1]}" width="${b[2]-b[0]}" height="${b[3]-b[1]}" preserveAspectRatio="none"/>`};
/* the running time lit in the LED window: the NVIDIA timer's recipe (Anton, gold gradient, glow, scanlines) */
const DEFS=`<defs><linearGradient id="t7g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3c4"/><stop offset=".5" stop-color="#ffd25e"/><stop offset="1" stop-color="#e59a14"/></linearGradient>
 <filter id="t7glow" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <pattern id="t7scan" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="3" fill="rgba(0,0,0,.35)"/></pattern></defs>`;
const led=(r,txt)=>{const [x0,y0,x1,y1]=r,h=y1-y0,w=x1-x0;return `<g><text x="${(x0+x1)/2}" y="${y0+h*.79}" text-anchor="middle" font-family="Anton" font-size="${h*.74}" fill="url(#t7g)" filter="url(#t7glow)" letter-spacing="${h*.04}" class="t7-time">${txt}</text><rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="url(#t7scan)" opacity=".55"/></g>`};
const poster=(r,fit)=>{const [x0,y0,x1,y1]=r;return `<clipPath id="t7cl"><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" rx="10"/></clipPath><g clip-path="url(#t7cl)"><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" fill="#000"/><image href="${MED}ez-landing-v4-poster-ez.jpg" x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" preserveAspectRatio="${fit}" opacity=".92"/><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" fill="url(#t7scan)" opacity=".25"/><path d="M${x0} ${y0} L${x0+(x1-x0)*.45} ${y0} L${x0} ${y0+(y1-y0)*.6}Z" fill="rgba(255,255,255,.07)"/></g>`};
let DUR='1:20';
function build(take){const o=D.querySelector('.t4-b3');if(!o)return;const gut=o.previousElementSibling;if(gut&&gut.classList.contains('t5-bg'))gut.style.display='none';o.style.display='none';
 const sec=D.createElement('section');sec.className='t7-film t7-f-'+take;sec.setAttribute('aria-label','The whole game, a 1 minute 20 film');
 let h='';
 if(take==='m'){const b=BOX.m,g=GL.m;h=`<div class="t7-f">${sv(b,DEFS+img('m')+poster(g.scr,'xMidYMid slice')+led(g.led,DUR)+`<circle class="k-glow" cx="${g.key[0]}" cy="${g.key[1]}" r="${g.key[2]*1.15}" fill="rgba(255,214,110,.22)"/>`)}
  <div class="t7-cap">The whole game</div>
  <button class="t7-btn" style="left:${(g.key[0]-g.key[2]*1.6-b[0])/(b[2]-b[0])*100}%;top:${(g.key[1]-g.key[2]*1.6-b[1])/(b[3]-b[1])*100}%;width:${g.key[2]*3.2/(b[2]-b[0])*100}%;aspect-ratio:1" aria-label="Play the whole game, 1 minute 20"></button></div>`}
 if(take==='c'){const b=BOX.c,g=GL.c;h=`<div class="t7-f" style="display:grid;grid-template-columns:46% 1fr;align-items:center;padding:8px 14px 6px 0">${sv(b,DEFS+img('c')+poster(g.lbl,'xMidYMid slice'))}
  <div class="t7-side" style="position:relative;padding-left:12px"><span class="q">Rather watch?</span><span class="t">The whole<br>game</span><span class="r">Plug it in · <b class="t7-time">1:20</b></span></div>
  <button class="t7-btn" style="left:0;top:0;width:46%;height:100%;border-radius:12px" aria-label="Play the whole game, 1 minute 20"></button></div>`}
 if(take==='p'){const b=BOX.p,g=GL.p;h=`<div class="t7-f">${sv(b,DEFS+img('p')+led(g.led,DUR))}
  <div class="t7-cap" style="top:-4px">Plug in: the whole game</div>
  <button class="t7-btn" style="left:0;top:20%;width:42%;height:70%;border-radius:12px" aria-label="Play the whole game, 1 minute 20"></button></div>`}
 if(take==='l'){h=`<div class="t7-silkline"><img src="${M}t7f-k.jpg" alt=""><span>The whole game · <b class="t7-time">1:20</b></span><i></i><button class="t7-btn" style="inset:0;border-radius:0;width:100%;height:100%" aria-label="Play the whole game, 1 minute 20"></button></div>`}
 sec.innerHTML=h;
 const top=D.querySelector('section.t4');(take==='l'&&W.__T7FL==='end'?D.getElementById('get'):top).after(sec);
 sec.querySelectorAll('.t7-btn').forEach(bt=>bt.addEventListener('click',play));
 // the running time from the film itself
 const v=D.createElement('video');v.preload='metadata';v.src=MED+'ez-landing-v4.mp4';v.onloadedmetadata=()=>{const s=Math.round(v.duration);if(s>0){DUR=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');sec.querySelectorAll('.t7-time').forEach(t=>t.textContent=DUR)}}}
function play(){let p=D.querySelector('.t7-play');if(!p){p=D.createElement('div');p.className='t7-play';p.innerHTML=`<video controls playsinline poster="${MED}ez-landing-v4-poster-ez.jpg"><source src="${MED}ez-landing-v4.mp4" type="video/mp4"><source src="${MED}ez-landing-v4.webm" type="video/webm"></video>`;p.addEventListener('click',e=>{if(e.target===p){p.style.display='none';p.querySelector('video').pause()}});D.body.appendChild(p)}
 p.style.display='flex';const v=p.querySelector('video');const pr=v.play();pr&&pr.catch(()=>{})}
const st=D.createElement('style');st.textContent=css;D.head.appendChild(st);
W.__t7film=function(take){try{build(take)}catch(e){W.__t7fErr=e;console.error(e)}};
})();
