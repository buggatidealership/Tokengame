/* helper n: pieces every take shares on top of _sn.js (a fighter's dot-screen ink, the quiet-24h facts) */
(function(){const N=SN;
N.dots=m=>m==='GROK'?'#4a4452':`color-mix(in srgb,${N.col(m)} 62%,#000)`;
N.quiet=()=>N.emptyLine().replace(/^No close in the last 24 hours\. /,'');
N.money=(m,v,cls)=>`<b class="${cls||''} ${v>=0?'wc-tu':'wc-td'}" data-to="${v}" data-m="${m}">${N.$f(v)}</b>`;
N.gapEl=x=>`<b data-to="${Math.abs(x.gap)}" data-gap="1" data-plain="1">${N.$f(Math.abs(x.gap)).replace(/^[+−]/,'')}</b>`;
N.role=(x,side)=>x.w.k==='season'&&side==='a'?'<span class="sn-gt"><span>Golden</span><span>ticket</span></span>':`<span class="sn-rl">${side==='a'?x.F.la:x.F.lb}</span>`;
N.held=m=>m===N.rank[0];
})();
