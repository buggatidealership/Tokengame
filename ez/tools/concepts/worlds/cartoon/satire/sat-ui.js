/* satire / sat-ui.js — shared drawing for both pages: model marks, flags, the reader's pencil ring, face medallions,
   text fitting, and the one chart (P&L or hit rate) with the waterline: $0 is the surface of the water, so a model
   that is losing money is drawn under water. It reads as a plain line chart; the water only says "below zero". */
(function(W){
'use strict';
const S=W.SAT;
const FACE={GROK:[.51,.39],CLAUDE:[.52,.44],GPT:[.60,.41],KIMI:[.52,.39]};
const PORT={GROK:'art/p-grok.jpg',CLAUDE:'art/p-claude.jpg',GPT:'art/p-gpt.jpg',KIMI:'art/p-kimi.jpg'};
function mark(m,fill){const M=MODELS[m];if(!M)return '';const f=fill||'currentColor';
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="'+f+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/>'+(M.dot?'<path fill="'+f+'" d="'+M.dot+'"/>':'')+'</svg>'}
function flag(c){
  if(c==='CN')return '<svg class="flag" viewBox="0 0 30 20" aria-label="China"><rect width="30" height="20" fill="#d8261c"/><path fill="#f7c948" d="M5 3l1 3h3l-2.5 1.8 1 3L5 9 2.5 10.8l1-3L1 6h3zM11 2l.4 1.1h1.2l-1 .7.4 1.1-1-.7-1 .7.4-1.1-1-.7h1.2zM13 5l.4 1.1h1.2l-1 .7.4 1.1-1-.7-1 .7.4-1.1-1-.7h1.2zM13 9l.4 1.1h1.2l-1 .7.4 1.1-1-.7-1 .7.4-1.1-1-.7h1.2zM11 12l.4 1.1h1.2l-1 .7.4 1.1-1-.7-1 .7.4-1.1-1-.7h1.2z"/></svg>';
  let s='<svg class="flag" viewBox="0 0 30 20" aria-label="United States"><rect width="30" height="20" fill="#f1e8d4"/>';
  for(let i=0;i<7;i++)s+='<rect y="'+(i*20/6.5)+'" width="30" height="1.55" fill="#c3271f"/>';
  s+='<rect width="13" height="10.8" fill="#23366e"/>';for(let r=0;r<4;r++)for(let c=0;c<5;c++)s+='<circle cx="'+(1.6+c*2.5)+'" cy="'+(1.6+r*2.5)+'" r=".55" fill="#f1e8d4"/>';
  return s+'</svg>'}
/* the reader's pencil: a hand-drawn ellipse, overshooting where the pen started */
function ring(col){return '<svg class="rg" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M8 24 C6 10 30 3 55 4 C80 5 97 11 96 21 C95 32 70 37 46 36 C22 35 5 30 6 19 C7 12 18 7 30 6" fill="none" stroke="'+(col||'#e9b43c')+'" stroke-width="2.6" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
function faceBg(m){const f=FACE[m]||[.5,.4];const bw=2.1,bh=bw*4/3;return 'background-image:url('+PORT[m]+');background-size:'+(bw*100)+'% auto;background-position:'+(((bw*f[0]-.5)/(bw-1))*100).toFixed(1)+'% '+(((bh*f[1]-.5)/(bh-1))*100).toFixed(1)+'%'}
/* fit an element's font-size so it stays inside its box */
function fit(el,max,min){let s=max;el.style.fontSize=s+'px';let g=40;while(g-->0&&s>min&&(el.scrollWidth>el.clientWidth+.5||el.scrollHeight>el.clientHeight+.5)){s-=.5;el.style.fontSize=s+'px'}return s}
function fitW(el,max,min){let s=max;el.style.fontSize=s+'px';let g=60;const P=el.parentElement;while(g-->0&&s>min&&el.scrollWidth>(el.clientWidth||P.clientWidth)+.5){s-=.5;el.style.fontSize=s+'px'}return s}

/* ---------- the chart ---------- */
function niceStep(range,n){const raw=range/n,p=Math.pow(10,Math.floor(Math.log10(raw))),f=raw/p;return (f<1.5?1:f<3?2:f<7?5:10)*p}
function chart(host,o){
  const D=o.D,mode=o.mode||'pnl',rs=o.rs||D.RS,Wd=o.w,Hd=o.h,ms=o.models||D.MK,ns='http://www.w3.org/2000/svg';
  const pad={l:o.padL||46,r:o.padR||86,t:14,b:26};
  const ser={};ms.forEach(m=>{let p=0,r=0,n=0;const pts=[{i:0,v:mode==='pnl'?0:.5}];rs.forEach((R,i)=>{const t=R.__t[m];if(t){p+=t.v;n++;if(t.ok)r++}pts.push({i:i+1,v:mode==='pnl'?p:(r+1)/(n+2),traded:!!t})});ser[m]={pts,last:pts[pts.length-1].v,n}});
  if(!rs.length){host.innerHTML='<div class="ch-empty lab">'+S.esc(o.empty||'No rounds in this window')+'</div>';return}
  let lo=Math.min(...ms.map(m=>Math.min(...ser[m].pts.map(p=>p.v)))),hi=Math.max(...ms.map(m=>Math.max(...ser[m].pts.map(p=>p.v))));
  if(mode==='pnl'){lo=Math.min(lo,0);hi=Math.max(hi,0);const st=niceStep(hi-lo||1,4);lo=Math.floor(lo/st)*st;hi=Math.ceil(hi/st)*st;o.step=st}
  else{lo=Math.min(.3,Math.floor(lo*20)/20);hi=Math.max(.8,Math.ceil(hi*20)/20);o.step=.1}
  const X=i=>pad.l+(Wd-pad.l-pad.r)*i/rs.length,Y=v=>pad.t+(Hd-pad.t-pad.b)*(hi-v)/(hi-lo||1);
  const y0=mode==='pnl'?Y(0):Y(.5);
  const uid='c'+Math.random().toString(36).slice(2,7);
  let s='<svg viewBox="0 0 '+Wd+' '+Hd+'" width="100%" role="img" aria-label="'+S.esc(o.aria||'')+'"><defs>'+
    '<filter id="'+uid+'pen" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="7"/><feDisplacementMap in="SourceGraphic" scale="1.3"/></filter>'+
    '';
  ms.forEach(m=>{const f=FACE[m];const bw=2.1,bh=bw*4/3;s+='<pattern id="'+uid+'f'+m+'" patternContentUnits="objectBoundingBox" width="1" height="1"><image href="'+PORT[m]+'" x="'+(.5-f[0]*bw).toFixed(3)+'" y="'+(.5-f[1]*bh).toFixed(3)+'" width="'+bw+'" height="'+bh.toFixed(3)+'" preserveAspectRatio="none"/></pattern>'});
  s+='</defs>';
  /* gridlines: pencil */
  for(let v=lo;v<=hi+1e-9;v+=o.step){const y=Y(v);const lab=mode==='pnl'?(v===0?'$0':(v>0?'+':'−')+'$'+Math.abs(v/1000)+'K'):Math.round(v*100)+'%';
    s+='<line x1="'+pad.l+'" x2="'+(Wd-pad.r+6)+'" y1="'+y+'" y2="'+y+'" stroke="rgba(243,230,196,.16)" stroke-width="1" stroke-dasharray="2 5"/>'+
      '<text x="'+(pad.l-6)+'" y="'+(y+4)+'" text-anchor="end" class="ch-ax">'+lab+'</text>'}
  if(mode==='pnl'){
    const wh=Math.max(40,Hd-pad.b-y0+8);
    s=s.replace('</defs>','<pattern id="'+uid+'wt" patternUnits="userSpaceOnUse" x="0" y="'+(y0-6)+'" width="'+Wd+'" height="'+wh+'"><image href="art/water.jpg" x="0" y="0" width="'+Wd+'" height="'+wh+'" preserveAspectRatio="xMidYMin slice"/></pattern></defs>');
    /* the waterline: $0, everything under it is under water */
    let wv='M'+pad.l+' '+y0;const step=14;for(let x=pad.l;x<=Wd-pad.r+6;x+=step)wv+=' Q'+(x+step/4)+' '+(y0-2.2)+' '+(x+step/2)+' '+y0+' T'+(x+step)+' '+y0;
    s+='<path d="'+wv+' L'+(Wd-pad.r+6)+' '+(Hd-pad.b)+' L'+pad.l+' '+(Hd-pad.b)+'Z" fill="url(#'+uid+'wt)" opacity=".86"/>'+
      '<path d="'+wv+'" fill="none" stroke="rgba(220,245,250,.85)" stroke-width="1.6"/>';
  }else{
    s+='<line x1="'+pad.l+'" x2="'+(Wd-pad.r+6)+'" y1="'+y0+'" y2="'+y0+'" stroke="rgba(243,230,196,.75)" stroke-width="1.4" stroke-dasharray="7 5"/>';
  }
  /* x axis */
  s+='<text x="'+X(0)+'" y="'+(Hd-8)+'" class="ch-ax" text-anchor="start">'+(o.x0||'Start')+'</text><text x="'+X(rs.length)+'" y="'+(Hd-8)+'" class="ch-ax" text-anchor="end">'+(o.x1||('R'+rs[rs.length-1].n))+'</text>';
  /* lines, last drawn = leader on top */
  const ord=ms.slice().sort((a,b)=>ser[a].last-ser[b].last);
  ord.forEach(m=>{const P=ser[m].pts;let d='';P.forEach((p,k)=>{d+=(k?'L':'M')+X(p.i).toFixed(1)+' '+Y(p.v).toFixed(1)});
    s+='<path class="ch-ln" d="'+d+'" fill="none" stroke="rgba(10,8,6,.55)" stroke-width="4.4" stroke-linejoin="round" stroke-linecap="round"/>'+
      '<path class="ch-ln ch-dr" pathLength="1" d="'+d+'" fill="none" stroke="'+S.COL[m]+'" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" filter="url(#'+uid+'pen)"/>'});
  /* ends: face medallion + lettered label, pushed apart where they would touch */
  const ends=ms.map(m=>({m,y:Y(ser[m].last),v:ser[m].last})).sort((a,b)=>a.y-b.y);const gap=o.labGap||19;
  for(let k=1;k<ends.length;k++)if(ends[k].y-ends[k-1].y<gap)ends[k].y=ends[k-1].y+gap;
  const over=ends[ends.length-1].y-(Hd-pad.b+4);if(over>0)ends.forEach(e=>e.y-=over);
  const xe=X(rs.length),fr=o.face||8;
  ends.forEach(e=>{const ty=Y(e.v);const val=mode==='pnl'?S.$k(e.v):Math.round(e.v*100)+'%';
    s+='<circle cx="'+xe+'" cy="'+ty+'" r="'+fr+'" fill="url(#'+uid+'f'+e.m+')" stroke="'+S.COL[e.m]+'" stroke-width="1.8"/>'+
      '<path d="M'+(xe+fr+1)+' '+ty+' L'+(xe+fr+7)+' '+e.y+'" stroke="rgba(243,230,196,.5)" stroke-width="1"/>'+
      '<text x="'+(xe+fr+9)+'" y="'+(e.y+4.5)+'" class="ch-lb" fill="'+S.COL[e.m]+'">'+S.NM[e.m]+' <tspan class="ch-v">'+val+'</tspan></text>'});
  s+='</svg>';host.innerHTML=s;
  if(o.draw&&!matchMedia('(prefers-reduced-motion: reduce)').matches){host.querySelectorAll('.ch-dr').forEach(p=>{p.style.strokeDasharray='1';p.style.strokeDashoffset='1';p.getBoundingClientRect();p.style.transition='stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';p.style.strokeDashoffset='0'})}
}
W.SUI={mark,flag,ring,faceBg,fit,fitW,chart,PORT,FACE};
})(window);
