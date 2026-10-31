// Section openers mockup: today's section top vs the same section opening on a Hedra painted panel (hand-tuned ink frame)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const OUT=process.argv[2];const W=+(process.argv[3]||390);
const CASES=[
 {id:'models',hash:'',sec:'.wc-chars',img:'hedra/openers/o1-models-seedream-50-pro.jpg',lift:'.pp-ttl',pos:'50% 60%',cap:'Backstage. Four doors. One golden ticket.'},
 {id:'rounds',hash:'',sec:'.wc-season',img:'hedra/openers/o2-rounds-gpt-image-2.jpg',lift:'.pp-ttl',pos:'62% 45%',cap:'Every issue, back to round 1.'},
 {id:'tonight',hash:'#/upcoming',sec:'UP',img:'hedra/openers/o3-tonight-gpt-image-2.jpg',lift:null,pos:'30% 55%',cap:'The bell rings at the close.'},
 {id:'bet',hash:'',sec:'.wc-bet',img:'hedra/openers/o4-bet-seedream-50-pro.jpg',lift:'h2.wc-h2',pos:'58% 50%',cap:'The pool. Bet #1 opens the vault.'},
];
const CSS=`
.ho-pan{position:relative;margin:0 0 0;padding:0;filter:drop-shadow(4px 5px 0 #0d0b10)}
.ho-pan .ho-ink{position:relative;background:#0d0b10;padding:5px 5px 6px 4px;
 clip-path:polygon(0.4% 1.6%,38% 0.6%,71% 1.4%,99.6% 0,100% 47%,99.2% 100%,58% 98.6%,21% 99.6%,0 98.4%,0.8% 52%)}
.ho-pan .ho-img{display:block;width:100%;aspect-ratio:16/10;background-size:cover;background-repeat:no-repeat;
 clip-path:polygon(0 1.2%,46% 0.3%,100% 0,99.5% 98.8%,52% 100%,0.3% 99.2%)}
.ho-pan .ho-cap{position:absolute;left:10px;top:10px;max-width:62%;background:#ffe14d;color:#0d0b10;border:2.5px solid #0d0b10;
 font:700 13px/1.15 'Shantell Sans','Comic Neue',system-ui,sans-serif;padding:5px 8px 6px;transform:rotate(-1.2deg);box-shadow:2px 3px 0 #0d0b10;
 clip-path:polygon(0 3%,100% 0,99% 96%,2% 100%)}
.ho-lift{position:relative;z-index:3;margin-top:-58px!important}
@media (min-width:1000px){.ho-pan .ho-img{aspect-ratio:21/9}.ho-pan .ho-cap{font-size:16px}.ho-lift{margin-top:-84px!important}}
`;
(async()=>{const b=await chromium.launch();
for(const c of CASES){for(const mode of ['now','new']){
 const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:W>1000?1:2});await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8897/v47-live-x3plus.html?'+Date.now()+c.hash,{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')||document.querySelector('.pp1-c.fb-on'),null,{timeout:60000}).catch(()=>{});
 await p.waitForTimeout(c.hash?9000:5000);
 const sel=await p.evaluate(({c,mode,CSS})=>{let s;
  if(c.sec==='UP'){s=[...document.querySelectorAll('section')].find(x=>x.offsetParent&&x.getBoundingClientRect().height>200&&!x.closest('header'))}else s=document.querySelector(c.sec);
  if(!s)return null;s.setAttribute('data-hm','1');
  if(mode==='new'){const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
   const f=document.createElement('figure');f.className='ho-pan';f.innerHTML='<div class="ho-ink"><div class="ho-img" style="background-image:url('+c.img+');background-position:'+c.pos+'"></div></div><figcaption class="ho-cap">'+c.cap+'</figcaption>';
   const first=[...s.children].find(x=>x.offsetHeight>2&&!x.classList.contains('pp-sr'));s.insertBefore(f,first);
   if(c.lift){const l=s.querySelector(c.lift);if(l)l.classList.add('ho-lift')}}
  return '[data-hm]'},{c,mode,CSS});
 if(!sel){console.log(c.id,'no section');await p.close();continue}
 await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-150)},sel);await p.waitForTimeout(2500);
 const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left,y:r.top,w:r.width}},sel);
 await p.screenshot({path:`${OUT}/${c.id}-${mode}-${W}.png`,clip:{x:0,y:Math.max(0,bb.y-6),width:W,height:Math.min(W>1000?820:780,900-Math.max(0,bb.y-6))}});
 const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log(c.id,mode,W,'sw',sw,er.slice(0,2));await p.close()}}
await b.close()})();
