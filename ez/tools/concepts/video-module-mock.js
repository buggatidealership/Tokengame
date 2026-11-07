// The explainer video as a module replacing the three bullets + right/wrong boxes on X2+ (mockups, 2026-10-21).
window.__vm=function(mode){
 const css=`
 .vm{position:relative;margin:16px 0 6px}
 .vm-frame{position:relative;border:2.5px solid #000;border-radius:10px;background:#000;box-shadow:6px 7px 0 #000;overflow:hidden;isolation:isolate}
 .vm-frame::after{content:"";position:absolute;inset:5px;border-radius:6px;border:1px solid rgba(242,182,50,.55);pointer-events:none;z-index:3}
 .vm-frame video,.vm-frame img.pst{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#000}
 .vm-tag{position:absolute;top:-13px;left:12px;z-index:5;padding:5px 11px 6px;background:#f2b632;color:#141217;border:2px solid #000;box-shadow:3px 3px 0 #000;transform:rotate(-2deg);font:400 15px/1 Anton,Impact,sans-serif;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}
 .vm-tag small{font:800 11px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.08em;margin-left:6px;opacity:.8}
 .vm-play{position:absolute;left:50%;top:50%;width:72px;height:72px;transform:translate(-50%,-50%);z-index:4;border-radius:50%;background:#f2b632;border:2.5px solid #000;box-shadow:4px 5px 0 #000;display:grid;place-items:center}
 .vm-play::before{content:"";width:0;height:0;border-left:26px solid #141217;border-top:16px solid transparent;border-bottom:16px solid transparent;margin-left:6px}
 .vm-len{position:absolute;right:10px;bottom:12px;z-index:4;padding:3px 7px;background:rgba(13,11,18,.78);color:#f3ead6;border:1.5px solid rgba(243,234,214,.35);border-radius:4px;font:800 11px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.08em}
 .vm-snd{position:absolute;top:8px;right:8px;z-index:4;width:24px;height:24px;border-radius:50%;background:rgba(13,11,18,.6);box-shadow:0 0 0 1px rgba(243,234,214,.3);display:grid;place-items:center;color:#f3ead6;font:700 11px/1 Barlow}
 .vm-bar{position:absolute;left:0;right:0;bottom:0;height:6px;background:rgba(0,0,0,.7);z-index:4}.vm-bar i{display:block;height:100%;width:30%;background:#f2b632;box-shadow:1px 0 0 #000}
 .vm-tap{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:4;padding:6px 12px;background:#f2b632;color:#141217;border:2px solid #000;box-shadow:3px 3px 0 #000;font:800 12px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
 .vm-read{display:block;margin:12px 0 0;font:800 13px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#f2b632;text-decoration:none}
 .vm-read b{border-bottom:2px solid #f2b632;padding-bottom:1px}
 /* host beside the screen, with his ticket */
 .vm-host{position:absolute;right:-8px;bottom:-26px;z-index:6;width:96px;filter:drop-shadow(3px 4px 0 #000)}
 .vm-say{position:absolute;right:86px;bottom:-20px;z-index:6;max-width:150px;background:#f3e6c8;color:#141217;padding:8px 10px;border:2px solid #000;box-shadow:3px 3px 0 #000;font:700 13px/1.25 Barlow,sans-serif;transform:rotate(-1.5deg)}
 .vm-say::after{content:"";position:absolute;right:-10px;top:12px;width:0;height:0;border-left:10px solid #000;border-top:7px solid transparent;border-bottom:7px solid transparent}
 .vm.hosted{margin-bottom:34px}
 /* slab variant */
 .vs{position:relative;margin:16px 0 8px;padding:8px;border-radius:12px;background:linear-gradient(160deg,rgba(255,255,255,.13) 0 44%,rgba(255,255,255,.05) 44%),rgba(18,16,26,.55);box-shadow:0 0 0 2.5px #000,inset 1.5px 1.5px 0 rgba(255,255,255,.75),inset -1.5px -1.5px 0 rgba(255,255,255,.25),6px 7px 0 0 #000}
 .vs::before{content:"";position:absolute;inset:5px;border-radius:8px;border:1px solid rgba(242,182,50,.55);pointer-events:none}
 .vs-lab{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:8px;padding:6px 9px 6px 10px;background:#fbfaf6;color:#141217;border-radius:3px;box-shadow:0 0 0 1.5px #000,inset 0 0 0 3.5px #b8262a;font-family:'Barlow Condensed',Barlow,sans-serif}
 .vs-lab .y{font-weight:800;font-size:8.5px;letter-spacing:.08em;text-transform:uppercase}.vs-lab .y .s{color:#c9900e}.vs-lab .y .e{color:#1f8f55}.vs-lab .y .z{color:#c8372d}
 .vs-lab .nm{font-weight:800;font-size:15px;line-height:1;text-transform:uppercase;margin-top:4px}
 .vs-lab .r{text-align:right}.vs-lab .r .w{display:block;font-weight:800;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase}.vs-lab .r .g{display:block;font:400 26px/.95 Anton,Impact,sans-serif}
 .vs-film{position:relative;margin-top:8px;border-radius:4px;overflow:hidden;box-shadow:0 0 0 2px #000,0 0 0 5px rgba(255,255,255,.10),0 0 0 6px rgba(255,255,255,.35);background:#000}
 .vs-film img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
 /* mini player */
 .vm-mini{position:fixed;right:12px;bottom:14px;width:188px;z-index:80;border:2px solid #000;border-radius:8px;overflow:hidden;background:#000;box-shadow:4px 5px 0 #000}
 .vm-mini img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
 .vm-mini .x,.vm-mini .s{position:absolute;top:5px;width:22px;height:22px;border-radius:50%;background:rgba(13,11,18,.78);box-shadow:0 0 0 1px rgba(243,234,214,.35);color:#f3ead6;display:grid;place-items:center;font:700 12px/1 Barlow}
 .vm-mini .x{right:5px}.vm-mini .s{right:31px}
 .vm-mini .b{position:absolute;left:0;right:0;bottom:0;height:4px;background:rgba(0,0,0,.7)}.vm-mini .b i{display:block;height:100%;width:55%;background:#f2b632}
 @media (min-width:1100px){.vm-d{display:grid;grid-template-columns:minmax(0,1fr) 560px;gap:40px;align-items:center}.vm-d .hero{padding:0!important}.vm-d .vm{margin:0}}
 `;
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 const bet=document.querySelector('section.x2o-bet'),t3=bet.querySelector('.x2p-t3');
 const P='media/ez-landing-hd-poster.jpg';
 const frame=(inner,tag)=>`<div class="vm-frame"><span class="vm-tag">${tag}</span>${inner}</div>`;
 const read=`<a class="vm-read" href="#read">Rather read? <b>The 20-second version</b> ↓</a>`;
 let html='';
 if(mode==='A')html=`<div class="vm">${frame(`<img class="pst" src="${P}" alt=""><span class="vm-play"></span><span class="vm-len">1:07</span>`,'How it works <small>67 s</small>')}${read}</div>`;
 if(mode==='B')html=`<div class="vm hosted">${frame(`<img class="pst" src="${P}" alt=""><span class="vm-play"></span><span class="vm-len">1:07</span>`,'The show <small>1:07</small>')}<span class="vm-say">Give me a minute. I'll explain the whole thing.</span><img class="vm-host" src="media/commissioner/web/02-presenter.webp" alt="">${read}</div>`;
 if(mode==='C')html=`<div class="vm">${frame(`<video class="pst" src="media/ez-landing-hd.mp4" muted playsinline preload="auto"></video><span class="vm-snd">🔇</span><span class="vm-tap">Tap for sound</span><span class="vm-bar"><i></i></span>`,'How it works <small>playing</small>')}${read}</div>`;
 if(mode==='S')html=`<div class="vs"><div class="vs-lab"><div><span class="y">2026 <span class="s">$</span><span class="e">E</span><span class="z">Z</span> Season 1</span><div class="nm">How it works</div></div><div class="r"><span class="w">Watch</span><span class="g">1:07</span></div></div><div class="vs-film"><img src="${P}" alt=""><span class="vm-play"></span></div></div>${read}`;
 if(mode==='M'){html=`<div class="vm">${frame(`<img class="pst" src="${P}" alt=""><span class="vm-play"></span><span class="vm-len">1:07</span>`,'How it works <small>67 s</small>')}${read}</div>`;
   const m=document.createElement('div');m.className='vm-mini';m.innerHTML=`<img src="media/ez-landing-hd-end.jpg" alt=""><span class="s">🔊</span><span class="x">✕</span><span class="b"><i></i></span>`;document.body.appendChild(m)}
 const w=document.createElement('div');w.innerHTML=html;t3.replaceWith(...w.childNodes);
 if(mode==='D'){const hero=document.querySelector('section.hero'),vm=bet.querySelector('.vm');const g=document.createElement('div');g.className='vm-d';hero.before(g);g.append(hero,vm)}
 return mode};
