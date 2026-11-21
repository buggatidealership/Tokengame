// The explainer ticket, round 2 (owner, 2026-10-21): A's tilted gold tag for "How it works", the film filling more of the ticket,
// never a flip card. Works on the real page's .x2p-vt. Mockup only.
window.__vt2=function(mode){
 const SLIM='linear-gradient(90deg,#1f7a45 0 12px,transparent 12px 15px,#1f7a45 15px 19px,transparent 19px),linear-gradient(270deg,#c8372a 0 12px,transparent 12px 15px,#c8372a 15px 19px,transparent 19px),radial-gradient(rgba(60,40,10,.06) 1px,transparent 1.4px) 0 0/4px 4px,radial-gradient(130% 110% at 50% 45%,transparent 58%,rgba(120,85,30,.17)),#efe5cf';
 const css=`
 html.x2p .x2p-vt .vt-tag{position:absolute;z-index:6;padding:5px 11px 6px;background:#f2b632;color:#141217;border:2px solid #000;box-shadow:3px 3px 0 #000;transform:rotate(-2deg);font:400 15px/1 Anton,Impact,sans-serif;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}
 html.x2p .x2p-vt .vt-tag small{font:800 11px/1 'Barlow Condensed',Barlow,sans-serif;letter-spacing:.08em;margin-left:6px;opacity:.8;font-variant-numeric:tabular-nums}
 html.x2p .x2p-vt.mk .vt-h{display:none}
 html.x2p .x2p-vt.mk .vt-f{box-shadow:0 0 0 2px #000}
 html.x2p section.x2o-bet:has(>.x2p-vt.m1,>.x2p-vt.m3,>.x2p-vt.m4){padding-top:12px}
 /* 1: tag across the ticket's top edge, slim bands, a thin paper rim round the film */
 html.x2p .x2p-vt.m1 .vt-p,html.x2p .x2p-vt.m2 .vt-p{background:${SLIM};padding:20px 25px 13px}
 html.x2p .x2p-vt.m1 .vt-tag{top:-15px;left:24px}
 /* 2: A as it was, the tag on the film's top-left corner */
 html.x2p .x2p-vt.m2 .vt-p{padding-top:24px}
 html.x2p .x2p-vt.m2 .vt-tag{top:11px;left:33px}
 /* 3: the film runs from band to band, paper only above and below */
 html.x2p .x2p-vt.m3 .vt-p{background:${SLIM};padding:18px 19px 10px}
 html.x2p .x2p-vt.m3 .vt-f{border-radius:0;box-shadow:0 0 0 2px #000}
 html.x2p .x2p-vt.m3 .vt-tag{top:-15px;left:22px}
 /* 4: the film is the ticket: scallops cut the film itself, the bands print over its edges */
 html.x2p .x2p-vt.m4 .vt-p{padding:0;background:#000}
 html.x2p .x2p-vt.m4 .vt-f{border-radius:0;box-shadow:none}
 html.x2p .x2p-vt.m4 .vt-p::after{content:"";position:absolute;inset:0;z-index:5;pointer-events:none;background:linear-gradient(90deg,#1f7a45 0 12px,transparent 12px 15px,#1f7a45 15px 19px,transparent 19px),linear-gradient(270deg,#c8372a 0 12px,transparent 12px 15px,#c8372a 15px 19px,transparent 19px)}
 html.x2p .x2p-vt.m4 .vt-tag{top:-15px;left:26px}
 html.x2p .x2p-vt.m4 .vt-snd{right:26px;top:34px}
 `;
 if(!document.getElementById('vt2css')){const st=document.createElement('style');st.id='vt2css';st.textContent=css;document.head.appendChild(st)}
 const vt=document.querySelector('.x2p-vt'),p=vt.querySelector('.vt-p'),v=vt.querySelector('video');
 vt.className='x2p-vt'+(mode==='m0'?'':' mk '+mode);
 let tag=vt.querySelector('.vt-tag');if(tag)tag.remove();
 if(mode!=='m0'){tag=document.createElement('span');tag.className='vt-tag';tag.innerHTML='How it works<small>1:07</small>';vt.appendChild(tag)}
 // the arrival state, frozen for the picture: rolling muted, "Tap for sound", the bar a fifth in
 try{v.pause();v.currentTime=2}catch(e){}
 window.__vt2freeze=function(){vt.classList.add('playing');vt.querySelector('.vt-tap').hidden=false;vt.querySelector('.vt-play').hidden=true;vt.querySelector('.vt-bar>i').style.width='18%';const t=vt.querySelector('.vt-tag small');if(t)t.textContent='0:55'};
 const f=vt.querySelector('.vt-f').getBoundingClientRect(),r=vt.getBoundingClientRect();
 return {ticket:[Math.round(r.width),Math.round(r.height)],film:[Math.round(f.width),Math.round(f.height)],share:Math.round(100*f.width*f.height/(r.width*r.height))}};
