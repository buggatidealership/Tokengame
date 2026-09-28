/* =====================================================================
   EZ — "Are they learning?" Two charts, read in order:
     1. Direction: did they call up/down right? (running hit rate vs a coin flip)
     2. Distance: when the direction was right, how many points off?
   One small panel per model, same scales, so nothing overlaps.
   Reads ROUNDS / PENDING / UPCOMING / MODEL_KEYS from ez-data.js; adds rounds as the sheet grows.
   Style from the page through CSS variables on the container:
     --lx-ink (marks) --lx-text --lx-mute --lx-grid --lx-surface --lx-tipbg --lx-tipfg --lx-font
   ===================================================================== */
var EZLearn=(function(){
  var SH=['<style>',
  ':where(.lx){--lx-ink:#101a3a;--lx-text:#12131a;--lx-mute:#6b6d78;--lx-grid:#e3dccf;--lx-surface:#fff;--lx-tipbg:#12131a;--lx-tipfg:#fff;--lx-font:system-ui,sans-serif}',
  '.lx-panels{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}',
  '.lx-p{position:relative;min-width:0}',
  '.lx-h{display:flex;align-items:center;gap:8px;font:700 15px/1.2 var(--lx-font);color:var(--lx-text)}',
  '.lx-h .lg{font-size:24px}',
  '.lx-h b{font-weight:800}',
  '.lx-h span{margin-left:auto;font-weight:600;font-size:13px;color:var(--lx-mute);text-align:right;font-variant-numeric:tabular-nums}',
  '.lx-h span strong{color:var(--lx-text);font-size:17px}',
  '.lx svg{display:block;width:100%;height:auto;margin-top:6px;overflow:visible}',
  '.lx svg text{font-family:var(--lx-font);font-variant-numeric:tabular-nums}',
  '.lx-gl{stroke:var(--lx-grid);stroke-width:1}',
  '.lx-ref{stroke:var(--lx-mute);stroke-width:1.25;stroke-dasharray:4 4}',
  '.lx-ax{fill:var(--lx-mute);font-size:9px}',
  '.lx-ax.f{opacity:.45}',
  '.lx-line{fill:none;stroke:var(--lx-ink);stroke-width:2;stroke-linejoin:round;stroke-linecap:round}',
  '.lx-ok{fill:var(--lx-ink);stroke:var(--lx-surface);stroke-width:2}',
  '.lx-no{fill:var(--lx-surface);stroke:var(--lx-ink);stroke-width:2}',
  '.lx-bar{fill:var(--lx-ink)}',
  '.lx-x{fill:var(--lx-mute);font-size:11px;font-weight:700}',
  '.lx-q{fill:var(--lx-mute);font-size:11px;font-weight:700}',
  '.lx-val,.lx-q,.lx-x{paint-order:stroke;stroke:var(--lx-surface);stroke-width:4px;stroke-linejoin:round}',
  '.lx-val{fill:var(--lx-text);font-size:10.5px;font-weight:700}',
  '.lx-hit{fill:transparent;cursor:pointer;outline:none}',
  '.lx-col{fill:var(--lx-grid);opacity:0}',
  '.lx-g:hover .lx-col,.lx-g:focus .lx-col,.lx-g.on .lx-col{opacity:.55}',
  '.lx-g{outline:none}',
  '.lx-tip{position:absolute;z-index:5;pointer-events:none;max-width:230px;background:var(--lx-tipbg);color:var(--lx-tipfg);font:600 12.5px/1.4 var(--lx-font);padding:8px 10px;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.25);transform:translate(-50%,-100%);white-space:normal}',
  '.lx-tip b{display:block;font-weight:800}',
  '.lx-leg{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:12px;font:600 12.5px/1.2 var(--lx-font);color:var(--lx-mute)}',
  '.lx-leg i{display:inline-block;vertical-align:-2px;margin-right:6px}',
  '.lx-leg .d1{width:11px;height:11px;border-radius:50%;background:var(--lx-ink)}',
  '.lx-leg .d0{width:11px;height:11px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--lx-ink)}',
  '.lx-leg .dr{width:18px;height:0;border-top:1.5px dashed var(--lx-mute);vertical-align:3px}',
  '.lx-leg .db{width:9px;height:12px;border-radius:3px 3px 0 0;background:var(--lx-ink)}',
  '.lx-tbl{width:100%;border-collapse:collapse;font:600 13px/1.3 var(--lx-font);color:var(--lx-text);font-variant-numeric:tabular-nums}',
  '.lx-tbl th,.lx-tbl td{padding:7px 8px;text-align:left;border-bottom:1px solid var(--lx-grid);white-space:nowrap}',
  '.lx-tbl th{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--lx-mute)}',
  '.lx-tw{overflow-x:auto}',
  '</style>'].join('');
  var injected=false;function css(){if(!injected){document.head.insertAdjacentHTML('beforeend',SH);injected=true}}

  function models(){return MODEL_KEYS.filter(function(m){return MODELS[m]&&ROUNDS.some(function(r){return callOf(r,m)})})}
  /* per model, per graded round: what it said, right way?, points off, running tally */
  function series(m){
    var right=0,tot=0,sumR=0,nR=0;
    return ROUNDS.map(function(r){
      var c=callOf(r,m);if(!c)return null;
      var said=c[1],dn=/^DOWN/.test(said),mag=parseFloat(said.replace(/[^\d.]/g,'')),v=(dn?-1:1)*mag,ok=(v>0)===(r.a>0),off=Math.abs(v-r.a);
      tot++;if(ok){right++;sumR+=off;nR++}
      return {n:r.n,co:r.co,said:said,out:r.out,ok:ok,off:off,right:right,tot:tot,pct:right/tot,avgR:nR?sumR/nR:null};
    }).filter(Boolean);
  }
  function summary(){return models().map(function(m){var s=series(m),l=s[s.length-1]||{right:0,tot:0,pct:0,avgR:null};
    return {m:m,right:l.right,tot:l.tot,pct:l.pct,avgR:l.avgR,s:s}})}
  /* x slots: every graded round, then what's coming (so the chart visibly has room to fill) */
  function slots(){var g=ROUNDS.map(function(r){return {n:r.n,co:r.co,st:'g'}});
    var p=PENDING.map(function(r){return {n:r.n,co:r.co,st:'p',res:r.resolves}});
    var u=UPCOMING.map(function(r){return {n:r.n,co:r.co,st:'u',called:r.called}});
    return g.concat(p,u).slice(0,Math.max(g.length+5,12))}

  var W=320,H=158,L=34,R=34,T=12,B=26;
  function frame(sl){var cw=(W-L-R)/sl.length;return {cw:cw,x:function(i){return L+(i+.5)*cw}}}
  function xlabels(sl,f){return sl.map(function(s,i){return '<text class="lx-ax'+(s.st==='g'?'':' f')+'" x="'+f.x(i).toFixed(1)+'" y="'+(H-8)+'" text-anchor="middle">R'+s.n+'</text>'}).join('')}
  function col(f,i,tip){return '<g class="lx-g" tabindex="0" data-tip="'+tip.replace(/"/g,'&quot;')+'" data-x="'+f.x(i).toFixed(1)+'"><rect class="lx-col" x="'+(f.x(i)-f.cw/2).toFixed(1)+'" y="'+T+'" width="'+f.cw.toFixed(1)+'" height="'+(H-T-B)+'" rx="4"/>'}
  function pendTip(s){return s.st==='p'?'<b>R'+s.n+' · '+s.co+'</b>Calls are in. The market answers '+fmtDate(s.res)+'.':'<b>R'+s.n+' · '+s.co+'</b>Calls '+fmtDate(s.called)+'.'}

  function dirSVG(m){
    var s=series(m),sl=slots(),f=frame(sl),ph=H-T-B,y=function(p){return T+(1-p)*ph};
    var o='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+MODELS[m].app+': share of calls in the right direction, round by round">';
    [[1,'100%'],[.5,'50%'],[0,'0%']].forEach(function(g){o+='<line class="'+(g[0]===.5?'lx-ref':'lx-gl')+'" x1="'+L+'" x2="'+(W-R)+'" y1="'+y(g[0])+'" y2="'+y(g[0])+'"/><text class="lx-ax" x="'+(L-6)+'" y="'+(y(g[0])+3)+'" text-anchor="end">'+g[1]+'</text>'});
    o+=xlabels(sl,f);
    var idx=function(n){for(var i=0;i<sl.length;i++)if(sl[i].n===n)return i;return -1};
    var pts=s.map(function(d){return [f.x(idx(d.n)),y(d.pct),d]});
    sl.forEach(function(q,i){if(q.st!=='g')o+=col(f,i,pendTip(q))+'<text class="lx-q" x="'+f.x(i)+'" y="'+(y(0)-6)+'" text-anchor="middle">'+(q.st==='p'?'?':'')+'</text></g>'});
    o+='<path class="lx-line" d="M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join(' L')+'"/>';
    pts.forEach(function(p){var d=p[2],i=idx(d.n);
      o+=col(f,i,'<b>R'+d.n+' · '+d.co+'</b>'+MODELS[m].app+' said '+d.said+'. Market '+d.out+'. '+(d.ok?'Right way.':'Wrong way.')+'<br>'+d.right+' of '+d.tot+' right so far ('+Math.round(d.pct*100)+'%).')+
        '<circle class="'+(d.ok?'lx-ok':'lx-no')+'" cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+(d.ok?5:4.5)+'"/></g>'});
    var lp=pts[pts.length-1];if(lp)o+='<text class="lx-val" x="'+(lp[0]+9).toFixed(1)+'" y="'+(Math.abs(lp[2].pct-.5)<.04?lp[1]-7:lp[1]+4).toFixed(1)+'">'+Math.round(lp[2].pct*100)+'%</text>';
    return o+'</svg>';
  }
  function distSVG(m,ymax){
    var s=series(m),sl=slots(),f=frame(sl),ph=H-T-B,base=T+ph,y=function(v){return T+(1-v/ymax)*ph};
    var o='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+MODELS[m].app+': points off per round when the direction was right">';
    [0,ymax/2,ymax].forEach(function(g){o+='<line class="lx-gl" x1="'+L+'" x2="'+(W-R)+'" y1="'+y(g)+'" y2="'+y(g)+'"/><text class="lx-ax" x="'+(L-6)+'" y="'+(y(g)+3)+'" text-anchor="end">'+g+(g===ymax?' pts':'')+'</text>'});
    o+=xlabels(sl,f);
    var idx=function(n){for(var i=0;i<sl.length;i++)if(sl[i].n===n)return i;return -1};
    var bw=Math.min(14,f.cw*.55),rights=s.filter(function(d){return d.ok}),best=rights.length?Math.min.apply(null,rights.map(function(d){return d.off})):null;
    sl.forEach(function(q,i){if(q.st!=='g')o+=col(f,i,pendTip(q))+'<text class="lx-q" x="'+f.x(i)+'" y="'+(base-5)+'" text-anchor="middle">'+(q.st==='p'?'?':'')+'</text></g>'});
    s.forEach(function(d){var i=idx(d.n),cx=f.x(i);
      var tip='<b>R'+d.n+' · '+d.co+'</b>'+MODELS[m].app+' said '+d.said+'. Market '+d.out+'.<br>'+(d.ok?d.off.toFixed(2)+' pts off.':'Wrong way, so the distance doesn’t count.');
      o+=col(f,i,tip);
      if(d.ok){var top=y(d.off),h=base-top,r=Math.min(4,h,bw/2),x0=cx-bw/2,x1=cx+bw/2;
        o+='<path class="lx-bar" d="M'+x0.toFixed(1)+' '+base+' V'+(top+r).toFixed(1)+' Q'+x0.toFixed(1)+' '+top.toFixed(1)+' '+(x0+r).toFixed(1)+' '+top.toFixed(1)+' H'+(x1-r).toFixed(1)+' Q'+x1.toFixed(1)+' '+top.toFixed(1)+' '+x1.toFixed(1)+' '+(top+r).toFixed(1)+' V'+base+' Z"/>';
        if(best!==null&&Math.abs(d.off-best)<1e-9)o+='<text class="lx-val" x="'+cx.toFixed(1)+'" y="'+(top-5).toFixed(1)+'" text-anchor="middle">'+d.off.toFixed(2)+'</text>';
      }else o+='<text class="lx-x" x="'+cx.toFixed(1)+'" y="'+(base-5)+'" text-anchor="middle">✗</text>';
      o+='</g>'});
    return o+'</svg>';
  }
  function wire(el){
    var tip=null;
    function hide(){if(tip){tip.remove();tip=null}el.querySelectorAll('.lx-g.on').forEach(function(g){g.classList.remove('on')})}
    function show(g){hide();var p=g.closest('.lx-p'),svg=g.ownerSVGElement,sr=svg.getBoundingClientRect(),pr=p.getBoundingClientRect();
      g.classList.add('on');tip=document.createElement('div');tip.className='lx-tip';tip.innerHTML=g.getAttribute('data-tip');p.appendChild(tip);
      var x=sr.left-pr.left+(+g.getAttribute('data-x'))*sr.width/W,tw=tip.offsetWidth;x=Math.max(tw/2,Math.min(pr.width-tw/2,x));
      tip.style.left=x+'px';tip.style.top=(sr.top-pr.top+4)+'px'}
    el.querySelectorAll('.lx-g').forEach(function(g){
      g.addEventListener('mouseenter',function(){show(g)});g.addEventListener('mouseleave',hide);
      g.addEventListener('focus',function(){show(g)});g.addEventListener('blur',hide);
      g.addEventListener('click',function(e){e.stopPropagation();g.classList.contains('on')?hide():show(g)})});
    document.addEventListener('click',hide);
  }
  function head(m,right){return '<div class="lx-h">'+logo(m)+'<b>'+MODELS[m].app+'</b><span>'+right+'</span></div>'}
  /* public */
  function direction(el){css();el.classList.add('lx');
    el.innerHTML='<div class="lx-panels">'+summary().map(function(S){return '<div class="lx-p">'+head(S.m,'<strong>'+S.right+' of '+S.tot+'</strong> right way')+dirSVG(S.m)+'</div>'}).join('')+'</div>'+
      '<div class="lx-leg"><span><i class="d1"></i>right way</span><span><i class="d0"></i>wrong way</span><span><i class="dr"></i>coin flip (50%)</span><span>? = market hasn’t answered yet</span></div>';
    wire(el)}
  function distance(el){css();el.classList.add('lx');
    var mx=0;summary().forEach(function(S){S.s.forEach(function(d){if(d.ok&&d.off>mx)mx=d.off})});var ymax=Math.max(5,Math.ceil(mx/5)*5);
    el.innerHTML='<div class="lx-panels">'+summary().map(function(S){return '<div class="lx-p">'+head(S.m,S.avgR===null?'no right calls yet':'<strong>'+S.avgR.toFixed(2)+'</strong> pts off, on average')+distSVG(S.m,ymax)+'</div>'}).join('')+'</div>'+
      '<div class="lx-leg"><span><i class="db"></i>points off when the direction was right (shorter is better)</span><span>✗ = wrong way, not counted</span></div>';
    wire(el)}
  function table(el){css();el.classList.add('lx');var ms=models();
    el.innerHTML='<div class="lx-tw"><table class="lx-tbl"><thead><tr><th>Round</th><th>Market</th>'+ms.map(function(m){return '<th>'+MODELS[m].app+'</th>'}).join('')+'</tr></thead><tbody>'+
      ROUNDS.map(function(r){return '<tr><td>R'+r.n+' · '+r.co+'</td><td>'+r.out+'</td>'+ms.map(function(m){var d=series(m).filter(function(x){return x.n===r.n})[0];
        return '<td>'+(d?d.said+' · '+(d.ok?'✓ '+d.off.toFixed(2)+' off':'✗ wrong way'):'—')+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'}
  /* the plain benchmarks a skeptic would ask for */
  function baselines(){var up=ROUNDS.filter(function(r){return r.a>0}).length;return {rounds:ROUNDS.length,alwaysUp:up}}
  return {series:series,summary:summary,direction:direction,distance:distance,table:table,baselines:baselines};
})();
