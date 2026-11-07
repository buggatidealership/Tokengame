/* Round 34, set C (owner, 2026-10-24: "subtle tiny flag", "integrated... not slapped down", on the current standings): shared
   helpers for the four options. Flags are drawn for their size, never emoji (Windows draws flag emoji as two letters): the US flag
   with 7 stripes and a plain canton with six paper dots, China's with its big star and four dots. Printed in the ticket's inks
   (red, navy, yellow), paper left unprinted (white multiplies to nothing), multiplied into the card like the logos. Labs: GPT
   (OpenAI), Claude (Anthropic), Grok (xAI) in the United States; Kimi (Moonshot AI) in China. Classes are r34g- prefixed. */
var d=document;
var LAB={GPT:"US",CLAUDE:"US",GROK:"US",KIMI:"CN"};
var NAME={US:"United States",CN:"China"},CODE={US:"USA",CN:"CHN"};
var RED="#b3261c",NAVY="#22356a",YEL="#f0c02c";
function star(cx,cy,r){var p=[];for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p.push((cx+rr*Math.cos(a)).toFixed(2)+","+(cy+rr*Math.sin(a)).toFixed(2))}return p.join(" ")}
function svg(cc,cls){var s='<svg class="r34g-f '+(cls||"")+'" viewBox="0 0 16 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
  if(cc==="US"){for(var i=0;i<7;i+=2)s+='<rect x="0" y="'+(i*10/7).toFixed(3)+'" width="16" height="'+(10/7).toFixed(3)+'" fill="'+RED+'"/>';
    s+='<rect x="0" y="0" width="6.6" height="'+(4*10/7).toFixed(3)+'" fill="'+NAVY+'"/>';
    [[1.3,1.25],[3.3,1.25],[5.3,1.25],[1.3,3.4],[3.3,3.4],[5.3,3.4]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r=".62" fill="#fff"/>'})}
  else if(cc==="CN"){s+='<rect width="16" height="10" fill="'+RED+'"/><polygon points="'+star(3.2,3,2.15)+'" fill="'+YEL+'"/>';
    [[6.2,1.1],[7.2,2.2],[7.2,3.7],[6.2,4.8]].forEach(function(p){s+='<polygon points="'+star(p[0],p[1],.72)+'" fill="'+YEL+'"/>'})}
  return s+'</svg>'}
function rows(){return [].slice.call(d.querySelectorAll("#standings.x2p-tix li.lbr"))}
function cc(li){var n=li.querySelector(".pc-t h3");n=n?n.textContent.trim().toUpperCase():"";return LAB[n]||"US"}
/* the AI field's width, as x2plus.js tixCols works it out (the longest name or model line plus 16px), redone after the flags go in */
function aiw(){var st=d.querySelector("#standings.x2p-tix"),rs=rows(),e=0;if(!st||!rs.length)return;
  rs.forEach(function(li){var m=li.querySelector(".lb-m");if(!m)return;var L=m.getBoundingClientRect().left;
    [].forEach.call(li.querySelectorAll(".pc-t h3,.pc-t small,.pc-t .r34g-cc"),function(t){var x=d.createRange();x.selectNodeContents(t);var q=x.getBoundingClientRect();if(q.width)e=Math.max(e,q.right-L)})});
  if(e)st.style.setProperty("--x2p-aiw",Math.ceil(e+16)+"px")}
/* a rougher press, lighter than the logos' #x2pPrint so seven stripes survive at 13px */
if(!d.getElementById("r34gInkF")){var sv=d.createElementNS("http://www.w3.org/2000/svg","svg");sv.setAttribute("width","0");sv.setAttribute("height","0");sv.style.cssText="position:absolute;width:0;height:0";
  sv.innerHTML='<filter id="r34gInkF" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="7" result="n"/>'+
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="0.45" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="3" numOctaves="1" seed="19" result="g"/>'+
    '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 1.25" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>';
  d.body.appendChild(sv)}
window.r34g={svg:svg,rows:rows,cc:cc,aiw:aiw,NAME:NAME,CODE:CODE};
