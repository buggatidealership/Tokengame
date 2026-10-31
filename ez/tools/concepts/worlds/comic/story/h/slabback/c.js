/* Take C, where they landed: the measuring board. Every call is a pin stuck in a painted maple board at the move it called; the close
   is the gold line across it. Distance to the line is the miss, so the ranking is something you see before you read it. */
window.SB_c=function(g){const rows=g.pend?g.filed:g.rows,vals=rows.map(r=>(r.up?1:-1)*r.v).concat(g.pend?[]:[g.a],[0]);
  let hi=Math.max(...vals),lo=Math.min(...vals);const pad=(hi-lo)*.12||1;hi+=pad;lo-=pad;
  const T=17,B=79,y=v=>T+(hi-v)/(hi-lo)*(B-T);/* board top/bottom in % of the window's height */
  const nice=v=>(v>0?'+':v<0?'−':'')+Math.abs(Math.round(v))+'%';
  const ticks=[hi-pad,0,lo+pad].filter((v,i,a)=>a.findIndex(w=>Math.abs(w-v)<(hi-lo)*.12)===i).map(v=>`<span class="sc-tk${v===0?' sc-0':''}" style="top:${y(v)}%">${v===0?'flat':nice(v)}</span>`).join('');
  /* pins: same value side by side */
  const seen={};const pins=rows.map((r,i)=>{const v=(r.up?1:-1)*r.v,k=v.toFixed(2);const j=seen[k]=(seen[k]||0)+1;
    return `<span class="sc-pin" data-i="${i}" style="top:${y(v)}%;left:${33+(j-1)*7}cqw;--mc:${RH.MC[r.m]}"><img src="${SB.I}c-pin.png" alt=""><span class="sc-hd2"></span></span>`}).join('');
  const lab=(r,i)=>`<li class="sc-l ${!g.pend&&r.win?'sc-w':''} ${!g.pend&&!r.ok?'sc-x':''}" data-i="${i}">${RH.face(r.m)}<span class="sc-nm">${RH.NM[r.m]}${!g.pend&&r.win?`<i class="sc-cr">${RH.crown()}</i>`:''}</span>
     <b class="${r.up?'up':'dn'}">${SB.sgn(r)}</b><span class="sc-v">${g.pend?'<i class="sc-q">?</i>':SB.stamp(r.ok?'Pass':'Fail',r.ok?SB.off(r.off):'wrong way',r.ok?'#2fd27a':'#ff5248',g.n*11+i)}</span></li>`;
  const close=g.pend?`<div class="sc-cl sc-cq" style="top:${y(0)}%"><small>The close</small><b>?</b><small>${g.res}</small></div>`
    :`<div class="sc-line" style="top:${y(g.a)}%"></div><div class="sc-cl ${g.up?'up':'dn'}" style="top:${y(g.a)}%"><small>The close</small><b>${SB.mv(g.a)}</b></div>`;
  const sb=SB.mount(`<div class="sc-hd"><b>Where they landed</b><span>No. ${RH.pad(g.n)}</span></div>
    <div class="sc-board"></div>${ticks}${close}${pins}<svg class="sc-ld" aria-hidden="true"></svg><ol class="sc-ls">${rows.map(lab).join('')}</ol>
    <div class="sc-ft"><span><small>Filed</small>${g.called}</span><span><small>${g.pend?'Grades':'Graded'}</small>${g.res}</span>${g.pend?'':`<span class="sc-why">${SB.why(g)}</span>`}<button type="button" class="sb-flip">See the film</button></div>`,'sb-c'+(g.pend?' sb-pd':''),g);
  /* labels sit at their pin's height, pushed apart where they would touch; an ink leader joins each to its pin */
  requestAnimationFrame(()=>{const R=sb.getBoundingClientRect(),H=R.height,ls=[...sb.querySelectorAll('.sc-l')],min=H*.118;
    const it=ls.map(l=>{const p=sb.querySelector(`.sc-pin[data-i="${l.dataset.i}"]`);const pr=p.getBoundingClientRect();return {l,p,py:pr.top-R.top+pr.height*.18,px:pr.left-R.left+pr.width*.5}}).sort((a,b)=>a.py-b.py);
    let ys=it.map(o=>o.py);for(let k=0;k<40;k++){for(let i=1;i<ys.length;i++)if(ys[i]-ys[i-1]<min){const d=(min-(ys[i]-ys[i-1]))/2;ys[i]+=d;ys[i-1]-=d}
      const top=H*.2,bot=H*.8;const sh=Math.max(0,top-ys[0])-Math.max(0,ys[ys.length-1]-bot);ys=ys.map(v=>v+sh)}
    let d='';it.forEach((o,i)=>{o.l.style.top=(ys[i]/H*100)+'%';const lx=R.width*.5;d+=`<path d="M${o.px+6} ${o.py} C${o.px+30} ${o.py}, ${lx-24} ${ys[i]}, ${lx-2} ${ys[i]}" />`});
    const svg=sb.querySelector('.sc-ld');svg.setAttribute('viewBox',`0 0 ${R.width} ${H}`);svg.innerHTML=d});
  return sb};
