/* C2 · Above or below the line: each AI keeps its own lane on every ticket; its face sits above the line when it called up and
   below when it called down, further out the bigger the call (one scale for every ticket in the section). Replaces the bar and rows. */
(function(){const {D,ORDER,NM,face,calls,seen}=SB;
  let S=0;
  const scale=()=>{S=0;D.querySelectorAll('.wc-cliff .wc-tnp').forEach(t=>calls(t).forEach(c=>S=Math.max(S,+c.mag)))};
  function build(t){t.querySelector('.sb-ln')?.remove();const cs=calls(t),u=cs.filter(c=>c.up),d=cs.filter(c=>!c.up);
    if(!S)scale();
    const pin=c=>{const i=ORDER.indexOf(c.m),k=Math.min(1,+c.mag/S);
      return `<span class="sb-ln-p ${c.up?'sb-ln-u':'sb-ln-d'}" style="--i:${i};--k:${k.toFixed(3)}"><i class="sb-ln-st"></i>${face(c.m,'wc-f-s').replace('<i ','<i data-sb-l ')}<b data-sb-l>${c.mag}%</b></span>`};
    const sr=`${u.length} up: ${u.map(c=>NM[c.m]+' up '+c.mag+'%').join(', ')||'nobody'}. ${d.length} down: ${d.map(c=>NM[c.m]+' down '+c.mag+'%').join(', ')||'nobody'}.`;
    t.querySelector('.wc-lvc').insertAdjacentHTML('beforebegin',`<div class="sb-ln" data-sb-box role="img" aria-label="${sr}">
      <span class="sb-ln-z sb-ln-zu" aria-hidden="true"><em>▲</em>${u.length?'':'<small>Nobody says up</small>'}</span>
      <span class="sb-ln-z sb-ln-zd" aria-hidden="true"><em>▼</em>${d.length?'':'<small>Nobody says down</small>'}</span>
      <i class="sb-ln-0" aria-hidden="true"></i>${cs.map(pin).join('')}</div>`);
    t.classList.add('sb-c2');seen(t.querySelector('.sb-ln'))}
  scale();D.querySelectorAll('.wc-cliff .wc-tnp').forEach(build);window.__sbFake4=()=>SB.fake4(build);
  D.documentElement.classList.add('sb-ok-c2')})();
