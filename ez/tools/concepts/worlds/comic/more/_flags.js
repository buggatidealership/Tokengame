/* shared for the "more" mockups (owner, 2026-10-29: carry F1's tickets, flags, holo #1 and motion to other sections).
   Country flags drawn as small SVG, flat; the wave comes from a moving fold layer in CSS. Country = where the stock trades
   (ticker suffix), since the sheet has no home country (TSMC's TSM would read US). */
(function(){
  const enc=s=>"url('data:image/svg+xml,"+encodeURIComponent(s)+"')",K='stroke="#15121a" stroke-width="3"';
  const sv=b=>enc(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" viewBox="0 0 150 100">${b}<rect width="150" height="100" fill="none" ${K}/></svg>`);
  const st=(cx,cy,r,f)=>{const q=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.42:r;q.push((cx+rr*Math.cos(a)).toFixed(1)+','+(cy+rr*Math.sin(a)).toFixed(1))}return `<polygon points="${q.join(' ')}" fill="${f}"/>`};
  const R='#d63a3a',W='#f8f0d9',B='#2c4fa8',G='#fdbc2a',Kk='#15121a';
  const us=()=>{let s='';for(let i=0;i<13;i++)s+=`<rect y="${i*100/13}" width="150" height="${100/13}" fill="${i%2?W:R}"/>`;s+=`<rect width="64" height="54" fill="${B}"/>`;for(let r=0;r<4;r++)for(let c=0;c<5;c++)s+=st(8+c*12+(r%2?6:0),8+r*12,3.6,W);return sv(s)};
  const F={
    US:us(),
    CN:sv(`<rect width="150" height="100" fill="${R}"/>${st(28,28,15,G)}${st(55,10,5,G)}${st(64,22,5,G)}${st(64,38,5,G)}${st(55,50,5,G)}`),
    DE:sv(`<rect width="150" height="34" fill="${Kk}"/><rect y="33" width="150" height="34" fill="${R}"/><rect y="66" width="150" height="34" fill="${G}"/>`),
    UK:sv(`<rect width="150" height="100" fill="${B}"/><path d="M0 0L150 100M150 0L0 100" stroke="${W}" stroke-width="20"/><path d="M0 0L150 100M150 0L0 100" stroke="${R}" stroke-width="7"/><path d="M75 0V100M0 50H150" stroke="${W}" stroke-width="32"/><path d="M75 0V100M0 50H150" stroke="${R}" stroke-width="18"/>`),
    CH:sv(`<rect width="150" height="100" fill="${R}"/><path d="M75 22V78M47 50H103" stroke="${W}" stroke-width="16"/>`),
    KR:sv(`<rect width="150" height="100" fill="${W}"/><path d="M50 50a25 25 0 0 1 50 0z" fill="${R}"/><path d="M50 50a25 25 0 0 0 50 0z" fill="${B}"/>`),
    NL:sv(`<rect width="150" height="34" fill="${R}"/><rect y="33" width="150" height="34" fill="${W}"/><rect y="66" width="150" height="34" fill="${B}"/>`),
    TW:sv(`<rect width="150" height="100" fill="${R}"/><rect width="75" height="50" fill="${B}"/><circle cx="37.5" cy="25" r="11" fill="${W}"/>`)};
  const SUF={TW:'TW',KS:'KR',AS:'NL',SW:'CH',L:'UK',DE:'DE'};
  window.__mfl={F,of:t=>{const m=String(t||'').match(/\.([A-Z]+)$/);return m&&SUF[m[1]]||'US'},model:m=>m==='KIMI'?'CN':'US',
    lead:()=>{const a=window.__x2pPnl().A;return Object.keys(a).sort((x,y)=>a[y].pnl-a[x].pnl)[0]}};
})();
