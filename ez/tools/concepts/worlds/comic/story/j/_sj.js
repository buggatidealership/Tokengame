/* helper j: shared bits for every take (a clock the recorder can set, reduced motion, the page's data) */
(function(){if(window.__sjBase)return;window.__sjBase=1;
window.sjT=()=>window.__sjT!=null?window.__sjT:performance.now();
window.sjRM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
window.sjNM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
window.sjMC=m=>{const c=(MODELS[m]||{}).c||'#15121a';return c==='#111'?'#15121a':c};
window.sjFace=(m,cls)=>{const M=MODELS[m];return `<i class="wc-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`};
})();
