(function(){const G=window.__G2;const D=G.desk();['models','rounds','bet'].forEach(id=>G.opener(id));
const coin=G.opener('lucky','',G.base+'img/web/c-coin-'+(D?'desk':'phone')+'.jpg',D?'72% 50%':'50% 30%','Heads or tails?',null);
const E={models:['e2-theatre','Outside the arena, before the show.'],rounds:['e2-newsstand','Across the street, the newsstand.'],lucky:['e2-cardroom',null],bet:['e2-bank',null]};
const beats=G.beats();
G.secs().forEach((s,i)=>{const e=E[s.id];if(!e)return;const f=document.createElement('figure');f.className='gE-est';
 // hand-cut frame: its own wobbling polygon per panel
 const cp=G.rough(5,.9,700+i);
 let cap=e[1];const b=beats.find(x=>x.nextElementSibling===s.el);if(b)cap=b.textContent.trim().replace(/^(.)(.*)$/,(m,a,r)=>a+r.toLowerCase());
 if(s.id==='bet')cap=cap||'Next time…';
 f.innerHTML=`<div class="gE-ink" style="clip-path:${cp}"><div class="gE-img" style="clip-path:${G.rough(4,.7,800+i)};background-image:url(${G.base}img/web/${e[0]}-${D?'desk':'wide'}.jpg)"></div></div>`+(cap?`<figcaption class="g2-cap">${cap}</figcaption>`:'');
 s.el.before(f)});
})();
