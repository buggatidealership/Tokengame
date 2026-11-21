// Lc: the lamp drawn as hand-tuned shapes (no image): cord, a dented tin shade with ink, the bulb, a cone whose edge breaks into halftone dots
(function(){const L=document.getElementById('x2pLoad');if(!L)return;const lg=L.querySelector('svg');if(lg)lg.classList.add('ezl');
const W=innerWidth,H=innerHeight,cx=W/2,sy=H*.16,pool=H*.5+H*.08+56;let dots='';
let sd=9;const r=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
for(let y=sy+40;y<pool+60;y+=7){const t=(y-sy-36)/(pool-sy-36),half=30+t*((W>700?260:150)-30);for(let k=-1;k<=1;k+=2)for(let j=0;j<5;j++){const x=cx+k*(half+(j-1.5)*7+(r()-.5)*3);dots+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2.6-j*.5)*(.6+t*.5)}" fill="#ffcf6a" opacity="${(.32-j*.06)*(1-t*.3)}"/>`}}
const hw=W>700?260:150;
L.insertAdjacentHTML('afterbegin',`<svg class="g3lc" viewBox="0 0 ${W} ${H}" aria-hidden="true"><defs><radialGradient id="g3pool" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd98a" stop-opacity=".55"/><stop offset=".6" stop-color="#c8862a" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="g3cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".26"/><stop offset="1" stop-color="#ffcf6a" stop-opacity=".03"/></linearGradient>
<linearGradient id="g3tin" x1="0" x2="1"><stop offset="0" stop-color="#1e5a3a"/><stop offset=".45" stop-color="#2f8a5a"/><stop offset=".55" stop-color="#5fcf94"/><stop offset="1" stop-color="#0e3322"/></linearGradient></defs>
<path d="M${cx-30},${sy+36} L${cx-hw},${pool} L${cx+hw},${pool} L${cx+30},${sy+36}Z" fill="url(#g3cone)"/>${dots}
<ellipse cx="${cx}" cy="${pool}" rx="${hw*1.05}" ry="${hw*.22}" fill="url(#g3pool)"/>
<path d="M${cx},0 V${sy-18}" stroke="#2a2a2e" stroke-width="3"/><path d="M${cx-1},0 V${sy-18}" stroke="#55555c" stroke-width="1"/>
<path d="M${cx-9},${sy-20} h18 l2,10 h-22z" fill="#3a3a40" stroke="#05050a" stroke-width="2.5"/>
<path d="M${cx-11},${sy-10} C${cx-24},${sy+2} ${cx-46},${sy+20} ${cx-58},${sy+38} Q${cx-2},${sy+46} ${cx+57},${sy+37} C${cx+46},${sy+19} ${cx+23},${sy+1} ${cx+11},${sy-10}Z" fill="url(#g3tin)" stroke="#05050a" stroke-width="4.5" stroke-linejoin="round"/>
<path d="M${cx-6},${sy-6} C${cx-14},${sy+4} ${cx-26},${sy+18} ${cx-34},${sy+30}" stroke="#bff3d6" stroke-width="2" fill="none" opacity=".8"/>
<path d="M${cx+20},${sy+8} l3,9 M${cx+30},${sy+18} l2,6" stroke="#05050a" stroke-width="1.4"/>
<ellipse cx="${cx}" cy="${sy+38}" rx="${57}" ry="7" fill="#fff1c2" stroke="#05050a" stroke-width="2.5"/><ellipse cx="${cx}" cy="${sy+40}" rx="16" ry="6" fill="#fffbe8"/></svg>`)})();
