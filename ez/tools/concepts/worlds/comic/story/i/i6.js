/* I6 · The chase: the cover answers "Who's winning?" with a race seen from above. One lane per AI, each runner at its P&L,
   a trail back to where it stood 7 days ago (who is gaining, who is falling back), the $100,000 start line, the losing side
   shaded, the golden ticket in the leader's hand and the gap to the runner behind. */
(function(){const S=SI,D=document,B=S.lbBase();if(!B)return;const {lb,cv}=B;
const now=m=>S.P[m].pnl,ago=m=>S.bal[m][S.i7]-1e5,ws=S.ORDER.map(m=>[now(m),ago(m)]).flat();
const step=10000,lo=Math.floor((Math.min(0,...ws)-6000)/step)*step,hi=Math.ceil((Math.max(...ws)+6000)/step)*step,X=v=>((v-lo)/(hi-lo)*100);
const ticks=[];for(let v=Math.ceil(lo/40000)*40000;v<=hi;v+=40000)ticks.push(v);
const gain=S.ORDER.slice().sort((a,b)=>(now(b)-ago(b))-(now(a)-ago(a))),up=gain[0],dn=gain[gain.length-1];
const [h,c]=S.rank;
const lanes=S.rank.map((m,i)=>{const a=X(ago(m)),b=X(now(m)),d=now(m)-ago(m),l=Math.min(a,b),w=Math.abs(b-a),fwd=b>=a;
  return `<div class="si6-ln${i===0?' si6-ld':''}" style="--mc:${S.col(m)};--i:${i}"><span class="si6-pos">${i+1}</span>
   <div class="si6-rd"><i class="si6-tr ${fwd?'si6-fw':'si6-bk'}" style="left:${l}%;width:${w}%"></i><i class="si6-gh" style="left:${a}%" title="7 days ago"></i>
    <span class="si6-rn" style="left:${b}%">${S.face(m,'',i===0)}${i===0?S.gt('si6-gt'):''}</span>
    <span class="si6-lb ${b>45?'si6-lf':''}" style="left:${b}%"><b>${S.NM[m]}</b> <em class="${now(m)>=0?'wc-tu':'wc-td'}">${S.k$(now(m))}</em></span>
    ${m===up&&d>0?`<span class="si6-fx si6-zoom" style="left:${a}%">Zoom!</span>`:''}${m===dn&&d<0?`<span class="si6-fx si6-skid" style="left:${a}%">Skid!</span>`:''}</div></div>`}).join('');
cv.classList.add('si6-cv');
cv.innerHTML=`<div class="wc-cv-top"><span class="wc-cv-s">The standings<small>${S.N} earnings reports graded</small></span></div>
<h1 class="wc-tab-h">Who's winning?</h1>
<div class="si6-tk"><div class="si6-in"><div class="si6-lose" style="width:${X(0)}%"><span>Losing money</span></div><i class="si6-st" style="left:${X(0)}%"></i>${lanes}
 <p class="si6-ax">${ticks.map(v=>`<span style="left:${X(v)}%"${X(v)>93?' class="si6-axr"':''}>${v===0?'Start':S.k$(v).replace('.0K','K')}</span>`).join('')}</p></div>
 <p class="si6-key"><i class="si6-kg"></i>Where it stood 7 days ago</p></div>
<p class="si6-say">${S.NM[h]} holds the golden ticket, ${S.$f(now(h)-now(c)).replace('+','')} ahead of ${S.NM[c]}. ${S.NM[up]} gained the most this week. ${S.NM[dn]} fell from #${S.rank7.indexOf(dn)+1} to #${S.rank.indexOf(dn)+1}.</p>`;
S.ready('i6')})();
