/* U2 · Pop stubs still to print: the Upcoming tab as the same stubs as "Every round so far" (P1 pop stub), on its electric blue,
   so a round to come and a graded round are visibly one object: the art on top (the company's mark, extruded, on its brand rays),
   then the stub in the brand's colours with the four AIs saying their calls where the graded stub prints the move, and the name
   on the gold chip. Each night opens on a ribbon; its main event is the big stub, its art drifting. The grid packs without holes:
   the last stub of a row widens to close it. */
(function(){const U=UU,{P,S,esc,X}=U,TAKE='u2';
/* place a day's stubs on C columns: the main event 2x2 (or a full row when alone, or 2 wide on a phone), the rest 1 wide;
   the last stub of a night takes whatever its row has left, so no cell stays empty */
function spans(k,C){const sp=[];if(k===1)return [[C,1]];const mainW=Math.min(2,C),mainH=C>2?2:1;sp.push([mainW,mainH]);
  const rows=[];for(let r=0;r<mainH;r++)rows.push(C-mainW);let r=0,fill=0;const out=[];
  for(let i=1;i<k;i++){while(r<rows.length&&rows[r]===0)r++;if(r>=rows.length){rows.push(C);}rows[r]--;out.push([1,1,r])}
  /* widen the last stub in each row that is not full */
  const last={};out.forEach((o,i)=>last[o[2]]=i);for(const rr in last){const left=rows[rr];if(left>0)out[last[rr]][0]+=left;rows[rr]=0}
  return sp.concat(out.map(o=>[o[0],o[1]]))}
async function build(){const L=U.list(),DS=U.days(L),C=U.counts(L);await Promise.all(L.map(x=>U.brand(x.ticker)));const B={};for(const x of L)B[x.ticker]=(await U.brand(x.ticker)).hx||'#2b2733';
  const root=U.mount('uu2');const W0=root.clientWidth,desk=matchMedia('(min-width:1000px)').matches,mid=matchMedia('(min-width:600px)').matches,sm=W0<360;const COLS=desk?6:mid?4:2;
  const bg=h=>{const [a,b]=U.tones(h);return `--b1:${a};--b2:${b};--bs:${U.shOf(h)}`};
  const tile=(x,sp,isMain)=>{const wide=!isMain&&sp[0]>1;
    return `<a class="uu2-t${isMain?' uu2-m':''}${wide?' uu2-w':''}" href="#/round/${x.n}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${bg(B[x.ticker])};grid-column:span ${sp[0]};grid-row:span ${sp[1]}">
      <span class="pp-sr">${isMain?'Main event: ':''}${esc(x.co)} (${esc(x.ticker)}), round ${x.n}. ${x.locked?'Calls locked. '+esc(U.bell(x))+'.':'Calls due '+esc(U.due(x))+'.'}</span>
      <span class="uu-art uu2-art${isMain?'':' uu2-sa'}" data-t="${esc(x.ticker)}"></span>
      <span class="uu2-stb"><span class="uu2-sh">${X('#'+x.n,{size:isMain?(desk?30:26):(sm?16:18),fill:'gold',shade:'#7a2a06',depth:isMain?4:3})}${isMain?`<span class="uu2-me">${X(x.nv?'BET #1 · MAIN EVENT':'MAIN EVENT',{font:'Bangers',size:isMain&&desk?16:14,fill:'cream',shade:'#3d0a07',depth:2,sw:2.3,hl:false})}</span>`:''}${U.badge(x,isMain?62:50,isMain?36:28)}</span>
      <span class="uu2-cl">${U.calls(x,isMain?(desk?32:28):(sm?19:21),{vs:isMain})}</span>
      ${isMain?`<span class="uu2-ft">${U.foot(x)}</span>`:''}
      <span class="uu2-co">${isMain?X(x.co.toUpperCase(),{size:desk?36:28,fill:['#ffffff','#fff3d0','#f2d9a0'],shade:'#7a2a06',depth:4,fit:1,min:14,hl:true}):esc(x.co)}${isMain?`<small>(${esc(x.ticker)})</small>`:` <small>(${esc(x.ticker)})</small>`}</span></span></a>`};
  const day=({k,items})=>{const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,sp=k==='wait'?items.map(()=>[1,1]):spans(items.length,COLS);
    const first=items.find(x=>x.locked),ft=lk?U.bell(first):k==='wait'?'Waiting on calls':'Calls due '+U.due(items[0]);
    return `<section class="uu2-day" data-day="${esc(k)}" aria-label="${esc(l.a+' '+l.b)}"><header class="uu2-rb"><span class="uu2-rd" aria-hidden="true">${X(l.a.toUpperCase(),{size:desk?40:sm?27:31,fill:'gold',shade:'#7a0c06',depth:5,rot:-2})}${k==='wait'?'':X(S.md(k).toUpperCase(),{size:desk?24:18,fill:'cream',shade:'#3d0a07',depth:3,rot:-2})}</span>
      <h2 class="pp-sr">${esc(l.a)}, ${esc(l.b)}. ${items.length} rounds.</h2><span class="uu-cnt uu2-cnt">${esc(ft)}</span></header>
      <div class="uu2-g" style="--c:${COLS}">${items.map((x,i)=>tile(x,sp[i],i===0&&k!=='wait')).join('')}</div></section>`};
  root.innerHTML=`<section class="pp-mod uu2-mod" aria-label="Next on the card"><div class="uu2-cv"><div class="uu2-ttl" aria-hidden="true">${X('NEXT ON',{size:desk?52:42,fill:'gold',shade:'#0b2366',rot:-3,depth:6})}${X('THE CARD',{size:desk?84:58,fill:'pink',shade:'#4a0420',rot:-3,depth:8})}</div>
      <span class="uu2-ct" aria-hidden="true">${X(String(C.all),{size:desk?64:50,fill:'white',shade:'#0b2366',depth:6})}<b>rounds<br>to come</b></span></div>
      <h1 class="pp-sr">Next on the card. ${C.all} rounds to come: ${C.lk} with calls in, ${C.tc} still to call.</h1>
      <p class="pp-tag uu2-tag">Every AI calls before the report. The close prints the move.</p>${U.FLT}
      ${DS.map(day).join('')}</section>`;
  U.fillX(root);U.filter(root,()=>{});
  await Promise.all([...root.querySelectorAll('.uu2-art')].map(a=>{const main=!a.classList.contains('uu2-sa');return U.paintArt(a,a.dataset.t,main?{kw:.72,kh:.72,cx:.55,cy:.5,rx:.55,ry:.5}:{still:1,kw:.66,kh:.62,cx:.5,cy:.5,rx:.5,ry:.5,ol:5,n:24})}));
  root.querySelector('.uu2-mod').style.boxShadow=P.xbox(7,'#0b2366',{bw:3,cast:4,hl:3});
  root.querySelectorAll('.uu2-t').forEach(n=>n.style.boxShadow=P.xbox(n.classList.contains('uu2-m')?6:5,getComputedStyle(n).getPropertyValue('--bs').trim(),{bw:2.5,cast:3,hl:0,ha:0,la:0}));
  U.run(root);U.tickBells(root)}
window.Ucheck=()=>U.check('.uu2-t');
U.boot(TAKE,build)})();
