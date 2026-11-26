/* D4 · Hot & cold: every AI's season as a strip of calls, one box per call (✓ right, ✗ wrong), cut in half with scissors:
   first half vs second half; the longest hot and cold runs get their own sound effects. */
(function(){const {ms,N,face,pct}=__sl;
const runs=s=>{const out=[];let i=0;while(i<s.length){let j=i;while(j<s.length&&s[j]===s[i])j++;out.push({w:s[i]==='W',a:i,b:j});i=j}return out};
__slTake('d4',`<h2 class="sl-h sl4-h">Hot <span>or</span> not?</h2><p class="sl-lede">Every call of the season, in order. Cut in half: are they getting better?</p>
<div class="sl4-list">${ms.map((x,i)=>{const s=x.seq,half=Math.floor(s.length/2),rs=runs(s),hot=rs.filter(r=>r.w).sort((a,b)=>(b.b-b.a)-(a.b-a.a))[0],cold=rs.filter(r=>!r.w).sort((a,b)=>(b.b-b.a)-(a.b-a.a))[0];
 const d=Math.round(x.h2*100)-Math.round(x.h1*100);
 const box=(c,k)=>`<i class="${c==='W'?'sl4-w':'sl4-l'}${hot&&k>=hot.a&&k<hot.b?' sl4-hot':''}${cold&&k>=cold.a&&k<cold.b?' sl4-cold':''}">${c==='W'?'✓':'✗'}</i>`;
 return `<article class="sl4-a sl-pop" style="--mc:${x.c};transition-delay:${i*.08}s"><header>${face(x.m)}<b>${x.name}</b>
  <span class="sl4-tr ${d>0?'sl4-u':d<0?'sl4-d':''}">${pct(x.h1)} <em>→</em> ${pct(x.h2)}</span></header>
  <div class="sl4-tape"><div class="sl4-half">${[...s.slice(0,half)].map((c,k)=>box(c,k)).join('')}</div><span class="sl4-cut" aria-hidden="true">✂</span><div class="sl4-half">${[...s.slice(half)].map((c,k)=>box(c,k+half)).join('')}</div></div>
  <p class="sl4-fx"><span class="sl4-on">On fire ×${hot?hot.b-hot.a:0}</span><span class="sl4-ice">Ice cold ×${cold?cold.b-cold.a:0}</span></p></article>`}).join('')}</div>
<p class="sl-cap">✓ = called the direction right. A coin gets about half. ${N} rounds so far, one more box after every close.</p>`)})();
