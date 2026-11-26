/* Take F, the wall calendar: the trading floor's calendar on the wall. Sheet one: the green band is the next bell (date, clock, how many
   trades are in), tomorrow's companies written under it with their trades. Sheet two: three weeks of day boxes, every round's company
   mark in the box of the close that grades it; the big names printed big, the rest small; tomorrow circled in red pen. */
(function(){const H=H37,esc=H.esc,I=()=>H.IMG;
const addD=(p,n)=>{const t=new Date(Date.UTC(p.y,p.mo-1,p.d+n));return {y:t.getUTCFullYear(),mo:t.getUTCMonth()+1,d:t.getUTCDate()}};
H.mount('F',S=>{const b=S.bell,M=S.M,cf={mk:12};
 /* the three weeks shown: from the Monday of the week holding today (New York) */
 const t=M.today,mon=addD(t,-((H.dow(t)+6)%7));const cells=[];for(let w=0;w<3;w++)for(let d=0;d<5;d++)cells.push(addD(mon,w*7+d));
 const bigs=new Set(S.big.map(u=>u.n)),bk=b?H.key(b.p):'';
 const all=[].concat(b?b.rounds:[],...S.days.map(d=>d.rounds),S.big);
 const at={};all.forEach(u=>{const p=u.rp||u.cp,k=H.key(p);(at[k]=at[k]||[]).push(u)});
 const last=H.key(cells[cells.length-1]),beyond=all.filter(u=>H.key(u.rp||u.cp)>last).length;
 const cell=(p,i)=>{const k=H.key(p),rs=(at[k]||[]).sort((x,y)=>(bigs.has(y.n)-bigs.has(x.n))||(y.mag7-x.mag7)||(y.cap-x.cap)),past=k<M.tk,today=k===M.tk,tom=k===bk;
   const bg=rs.filter(u=>bigs.has(u.n)||u.mag7),sm=rs.filter(u=>!(bigs.has(u.n)||u.mag7)),show=sm.slice(0,tom?6:bg.length>1?0:bg.length?3:6),more=sm.length-show.length;
   const lab=`${H.WD[H.dow(p)]} ${H.md(p)}: ${rs.length?rs.map(u=>u.co+' ('+u.ticker+')').join(', '):'nothing on the card'}${tom?'. The next bell':''}`;
   return `<li class="fc-c${past?' fc-past':''}${today?' fc-today':''}${tom?' fc-tom':''}" style="left:${[4.2,22.2,40.3,58.6,76.6][i%5]}%;top:${[8.7,36.5,64.3][Math.floor(i/5)]}%;width:${[18,18.1,18.3,18,19.3][i%5]}%;height:${[27.8,27.8,28.6][Math.floor(i/5)]}%" aria-label="${esc(lab)}">
    <b class="fc-n">${p.d}</b>${tom?'<i class="fc-ring" aria-hidden="true"></i>':''}${today?'<i class="fc-td">today</i>':''}
    <span class="fc-l">${bg.map(u=>`<a class="fc-b" href="#/round/${u.n}" aria-hidden="true" tabindex="-1">${H.logo(u,'fc-bl')}<small>${esc(H.sym(u))}</small></a>`).join('')}${show.map(u=>`<a class="fc-s" href="#/round/${u.n}" aria-hidden="true" tabindex="-1">${H.logo(u,'fc-sl')}</a>`).join('')}${more>0?`<em>+${more}</em>`:''}</span></li>`};
 const head=`<div class="fc-sheet"><div class="fc-head" style="aspect-ratio:1276/438"><img class="hb-hi" src="${I()}f-head.jpg" alt="">
   ${b?`<div class="fc-band"><span class="fc-k">${esc(b.day)} · ${esc(H.WD[H.dow(b.p)])} ${esc(b.date)} · ${esc(b.mixed?'each exchange’s close':'4pm '+b.ex)}</span>
   <span class="fc-clock" data-h37cd="${b.close}" role="timer" aria-label="Time to the close"><b data-u="H">00</b><i>:</i><b data-u="m">00</b><i>:</i><b data-u="s">00</b></span>
   <span class="fc-cap">The close grades every trade. <b>${b.nIn}</b> of <b>${b.nAll}</b> are in.</span></div>`:''}</div>
   <div class="fc-body hb-body"><ol class="hb-rows">${b?b.rounds.map(u=>H.row(u,S,cf)).join(''):''}</ol></div><div class="fc-foot"></div></div>`;
 const grid=`<div class="fc-sheet fc-s2"><div class="fc-top"></div><div class="fc-grid" style="aspect-ratio:1276/1072"><img class="hb-hi" src="${I()}f-grid.jpg" alt="">
   <ol class="fc-wd" aria-hidden="true">${['Mon','Tue','Wed','Thu','Fri'].map((d,i)=>`<li style="left:${[4.2,22.2,40.3,58.6,76.6][i]}%;width:${[18,18.1,18.3,18,19.3][i]}%">${d}</li>`).join('')}</ol>
   <ol class="fc-cells">${cells.map(cell).join('')}</ol></div>
   <p class="fc-key"><span><i class="fc-kb"></i>Big names</span><span><i class="fc-ks"></i>Every other round</span><span><i class="fc-kr"></i>The next bell</span>${beyond?`<span>+${beyond} later</span>`:''}</p></div>`;
 return `<h2 class="t4-h2 hb-t"><span class="t4-hw">The next bell</span></h2>${head}<h2 class="t4-h2 hb-t hb-t2"><span class="t4-hw">Upcoming predictions</span></h2>${grid}`});
})();
