/* I3 · Tug of war: every right call pulls the flag toward the AI, every wrong call pulls it back. A pure guesser's flag
   wobbles round the middle; by call 120 it rarely gets past the gold line (the smallest lead a guesser reaches no more than
   1 time in 20, worked out from the 50/50 odds). Each rope has its own match clock: calls made of 120. */
(function(){const S=SI,D=document,sp=D.querySelector('.wc-splash');if(!sp)return;
const F=S.FULL,L=S.leadLine(F),MX=Math.ceil((L+6)/5)*5,X=v=>(50+Math.max(-MX,Math.min(MX,v))/MX*50).toFixed(2);
const ord=S.ORDER.slice().sort((a,b)=>(2*S.W(b)-S.C(b))-(2*S.W(a)-S.C(a)));
const rows=ord.map((m,i)=>{const w=S.W(m),l=S.C(m)-w,d=w-l,c=S.C(m),pc=Math.min(1,c/F);
  return `<div class="si3-row${d<0?' si3-neg':''}" style="--mc:${S.col(m)};--x:${X(d)}%;--pc:${pc};--i:${i}">
   <div class="si3-top">${S.face(m,'',m===S.rank[0])}<b>${S.NM[m]}</b><span class="si3-sc"><em class="wc-tu">${w}</em>✓ <em class="wc-td">${l}</em>✗<span class="wc-sr"> ${w} right, ${l} wrong</span></span>
    <span class="si3-clk" title="${c} of about ${F} calls"><i aria-hidden="true"></i>${c}<small>/${F}</small></span></div>
   <div class="si3-field" aria-label="${S.NM[m]} is ${d>=0?d+' ahead':-d+' behind'}">
    <i class="si3-gl" aria-hidden="true"></i><i class="si3-mid" aria-hidden="true"></i>
    <div class="si3-rope" aria-hidden="true"><i class="si3-flag"><b>${d>0?'+':d<0?'−':''}${Math.abs(d)}</b></i></div>
    <span class="si3-team si3-tw" aria-hidden="true">${S.face(m,'si3-pull',m===S.rank[0])}</span><span class="si3-team si3-tl" aria-hidden="true"><i>✗</i></span></div></div>`}).join('');
const el=D.createElement('section');el.className='si-sol si-i3';el.setAttribute('aria-label','Smart or lucky?');
el.innerHTML=`<h2 class="wc-h2"><span>Smart or lucky?</span><small>A tug of war with the market. Every right call pulls the flag in. Every wrong call pulls it out.</small></h2>
<div class="si-pn si3-pn si-hal" style="--h:#fdbc2a"><div class="si3-key"><span class="si3-k1"><i></i>Pure guessing rarely pulls past this line by call ${F}</span><span class="si3-k2"><i></i>Calls made</span></div>${rows}</div>
<p class="wc-cap si-tbc"><b>To be continued…</b>${(()=>{const c=Math.max(...S.ORDER.map(S.C)),past=ord.filter(m=>2*S.W(m)-S.C(m)>=L);return (c<F*.4?'Early days.':c<F*.65?'Half time, roughly.':'Late in the game.')+' '+(past.length?past.map(m=>S.NM[m]).join(' and ')+' '+(past.length>1?'are':'is')+' past the line, but the game is not over.':'Nobody is past the line yet.')+' The final whistle is around call '+F+'.'})()}</p>`;
sp.before(el);sp.classList.add('si-off');
el.style.setProperty('--gl',X(L)+'%');
const go=()=>el.classList.add('si3-in');if(S.RM())go();else S.io(el.querySelector('.si3-pn'),go,.3);
window.__siShot=async()=>{go();await new Promise(r=>setTimeout(r,2200))};
S.ready('i3')})();
