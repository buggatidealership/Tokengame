/* F2 the console set: the film plays on a 1960s walnut TV; masking-tape label on top, a knob-panel tag for the running time */
(()=>{CH.frame({img:'fm-tv-cut.webp',hole:[22.89,19.44,67.5,74.58,1280,720],eb:22,keepM:.96,keepD:.86,mM:24,mD:40,mt:1.2,mb:1.5,mx:1.25,dx:0,after:(f,g)=>{
 const a=CH.lab(f,'f2-tp',`<span class="f2-lg">${CH.logo()}</span><b>How it works</b>`);
 const b=CH.lab(f,'f2-du',`<span>${CH.dur()}</span>`);
 if(!a.__ib){CH.inkBox(a,{fill:'#efe3c2',shade:'rgba(120,90,40,.18)',seed:9,amp:2.6,drop:0,sw:1.6});CH.inkBox(b,{fill:'#15121a',shade:'rgba(255,255,255,.06)',seed:4,amp:1.2})}
 a.style.left=(g.vl+g.vw*.5)+'px';a.style.top=(g.ct+3)+'px';b.style.left=(g.vl+g.vw-6)+'px';b.style.top=(g.ct+g.chh-6)+'px'}})})();
