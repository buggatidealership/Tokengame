/* P4 · Punch the ticket. The window lives on every ticket's own stub, where a conductor punches: three printed boxes, Season,
   24h and 7d; the window shown is punched out (a hole, its chad falls). A tap on any box punches that box on all four tickets
   (it calls the live bill). Ground: the ticket stock printed with the logos of the rounds the window counts, so the paper
   itself changes with the window (70 small marks for the season, a handful for 24h). */
(function(){const S=SP,D=document;
const pr=k=>{const x=S.X[k];return x.rs};
window.SPT={id:'p4',cls:'sp-p4',
 mount(){D.querySelectorAll('#wc-lb .wc-sb-r').forEach(t=>{const sb=t.querySelector('.wc9-stub');if(!sb||sb.querySelector('.sp-pn'))return;
   sb.querySelector('b').insertAdjacentHTML('afterend',`<span class="sp-pn" role="group" aria-label="Scoreboard time window">${['season','d1','d7'].map(k=>`<button type="button" class="sp-pb" data-spk="${k}" aria-pressed="false" aria-label="${S.X[k].t}"><span>${S.X[k].sh==='Season'?'Szn':S.X[k].sh}</span></button>`).join('')}</span>`);
   sb.removeAttribute('aria-hidden')})},
 card(el,m,x,prev,anim){const cap=el.querySelector('.wc9-cap');let bg=cap.querySelector('.sp-bgl');if(!bg){cap.insertAdjacentHTML('afterbegin','<span class="sp-bgl" aria-hidden="true"></span>');bg=cap.querySelector('.sp-bgl')}
  const rs=x.rs.filter(r=>S.P[m].per[r.n]),big=rs.length<=16;bg.classList.toggle('sp-big',big);
  bg.innerHTML=rs.map((r,i)=>{const l=S.coLogo(r.ticker);return l?`<img src="${l}" alt="" style="--r:${[-14,9,-4,12,-9,5][i%6]}deg">`:''}).join('');
  if(anim&&prev&&!S.RM()){const hb=el.querySelector('.sp-pb.sp-on');if(hb){hb.insertAdjacentHTML('beforeend','<i class="sp-chad"></i>');const c=hb.querySelector('.sp-chad');
    c.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate(14px,46px) rotate(140deg)',opacity:0}],{duration:620,easing:'cubic-bezier(.4,0,.8,.6)',fill:'forwards'}).onfinish=()=>c.remove();
    hb.animate([{transform:'scale(.82)'},{transform:'none'}],{duration:220,easing:'cubic-bezier(.3,1.6,.5,1)'})}
   bg.animate([{opacity:0},{opacity:1}],{duration:500})}}};
S.mount();})();
