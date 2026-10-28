/* r1038 proof: the proof ticket re-made on the bet ticket's own die, stock, strips and ink (its classes, as std.js does); the
   question printed in the bet's ink at the top of the ivory, the strips carrying the bet's small words. window.__pV = 'P'. */
(function(){
 /* P4 (owner, 2026-10-28: the proof as P3, with knobs down its left side like today's proof, "super high quality... handcrafted... part of
    the environment"; the red band the green band's height and saying something; no fibres): the knobs are cut by the ticket's own die (a
    layer added to its mask, on the paper and both shadows), each cut toned like the bet's corner bites (a shaded wall inside the cut);
    window.__kV = 'K1' scallops (today's knobs, the bet's bite drawn small), 'K2' stamp teeth (the Season 1 bar's perforation), 'K3' torn
    at the perforation (the bet's own punched holes, half of each left on the edge, as if torn off the season ticket) */
 function lst(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==='(')dp++;else if(c===')')dp--;else if(c===','&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o}
 window.p4=function(cd){var K={K1:{r:5,p:14,t:'rgba(110,78,34,.26)',w:5},K2:{r:3,p:9,t:'rgba(110,78,34,.22)',w:3.5},K3:{r:2,p:6.5,t:'rgba(96,70,32,.3)',w:3,torn:1}}[window.__kV||'K1'];
  var pp=cd.querySelector('.bt-pp');var L=lst(getComputedStyle(pp).backgroundImage);if(L.length>22)L[22]='none';pp.style.backgroundImage=L.join(', ');
  var cut='radial-gradient(circle at 0 50%, #0000 '+(K.r-.35)+'px, #000 '+(K.r+.45)+'px)';
  /* every list expanded to the full layer count first: CSS cycles a shorter list, which gave the added layer the wrong size */
  var full=function(v,n){var a=lst(v),o=[];for(var i=0;i<n;i++)o.push(a[i%a.length]);return o};
  [pp,cd.querySelector('.bt-sh>i'),cd.querySelector('.bt-hs')].forEach(function(el){if(!el)return;var cs=getComputedStyle(el),im=lst(cs.maskImage),n=im.length;
   el.style.setProperty('mask-image',im.concat([cut]).join(', '));el.style.setProperty('mask-size',full(cs.maskSize,n).concat(['100% '+K.p+'px']).join(', '));
   el.style.setProperty('mask-position',full(cs.maskPosition,n).concat(['0 50%']).join(', '));el.style.setProperty('mask-repeat',full(cs.maskRepeat,n).concat(['repeat-y']).join(', '));
   el.style.setProperty('mask-composite',full(cs.maskComposite,n).concat(['intersect']).join(', '));el.style.setProperty('mask-origin',full(cs.maskOrigin,n).concat(['border-box']).join(', '));el.style.setProperty('mask-clip',full(cs.maskClip,n).concat(['border-box']).join(', '))});
  /* the toning in each cut, drawn on the paper under its other layers: the cut wall a shade darker, the card's thickness */
  var cs=getComputedStyle(pp),tone='radial-gradient(circle at 0 50%, #0000 '+(K.r-.2)+'px, '+K.t+' '+(K.r+.3)+'px, #0000 '+(K.r+K.w)+'px)';
  var add=K.torn?[tone,'linear-gradient(90deg,rgba(96,70,32,.18),rgba(96,70,32,0) 5px)']:[tone],sz=K.torn?['100% '+K.p+'px','100% 100%']:['100% '+K.p+'px'],ps=K.torn?['0 50%','0 0']:['0 50%'],rp=K.torn?['repeat-y','no-repeat']:['repeat-y'];
  var nb=lst(pp.style.backgroundImage).length;pp.style.backgroundImage=add.join(', ')+', '+pp.style.backgroundImage;pp.style.backgroundSize=sz.concat(full(cs.backgroundSize,nb)).join(', ');pp.style.backgroundPosition=ps.concat(full(cs.backgroundPosition,nb)).join(', ');pp.style.backgroundRepeat=rp.concat(full(cs.backgroundRepeat,nb)).join(', ');
  /* the red band at the green band's height, its words set like the question */
  /* the rule under the tabs drawn with a gap under the open one (a flat patch over it showed against the bet's mottled stock) */
  var tb=cd.querySelector('.pt-tb');function gap(){if(!tb)return;var on=tb.querySelector('[aria-pressed="true"]');if(!on)return;var R=tb.getBoundingClientRect(),o=on.getBoundingClientRect(),a=(o.left-R.left).toFixed(1),b=(o.right-R.left).toFixed(1),ink='rgba(20,18,23,.75)';
   tb.style.setProperty('border-bottom-color','transparent','important');tb.style.setProperty('background','linear-gradient(90deg,'+ink+' 0 '+a+'px,transparent '+a+'px '+b+'px,'+ink+' '+b+'px 100%) 0 100%/100% 1.5px no-repeat','important')}
  gap();if(tb&&window.MutationObserver)new MutationObserver(gap).observe(tb,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});addEventListener('resize',gap);
  var ft=cd.querySelector('.bt-ft');if(ft)ft.innerHTML='<span class="r38-q2"><i></i><b>Simulated. Before fees.</b><i></i></span><span class="r38-q2 n"><b>Nº 000046</b></span>'};
 var d=document,pt=d.querySelector('#learn .x2p-pt'),cd=pt&&pt.querySelector('.pt-cd');if(!cd)return;
 var ser=((cd.querySelector('.pt-bd.r .pt-ko:last-child')||{}).textContent||'').match(/\d{6}/);ser=ser?ser[0]:'000046';
 var num='N<u>o</u> '+ser.split('').map(function(c,i){var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('');
 cd.classList.add('bs-nx','r38p');pt.classList.add('r38pt');
 cd.insertAdjacentHTML('afterbegin','<div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-pp"><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
  '<div class="bt-st bt-hd"><span class="r38-sb sp"><span>Season 1</span><span><i></i>The proof<i></i></span><span>Graded at the close</span></span></div>'+
  '<div class="bt-st bt-ft"><span class="r38-sb sp"><span>Admit one</span><span>Simulated · before fees</span><span class="bt-no">'+num+'</span></span></div>');
 var PV=window.__pV;if(PV==='P2'||PV==='P3'||PV==='P4'){if(PV!=='P2')cd.classList.add('r38p3');if(PV==='P4')cd.classList.add('r38p4'); /* P2 (owner, same night): the question stays where it is on the live site, in the green band at the top, the band as tall as it needs */
  cd.classList.add('r38p2');var hd=cd.querySelector('.bt-hd');hd.innerHTML='<span class="r38-q2"><i></i><b></b><i></i></span>';
  var b=hd.querySelector('b'),srcq=cd.querySelector('.pt-top');var sy=function(){b.textContent=srcq?srcq.textContent.trim():''};sy();
  if(srcq&&window.MutationObserver)new MutationObserver(sy).observe(cd.querySelector('.pt-q')||srcq,{subtree:true,childList:true,characterData:true});if(PV==='P4')p4(cd);return}
 var inn=cd.querySelector('.pt-in'),H0=inn.getBoundingClientRect().height,q=d.createElement('h3');q.className='r38q';inn.insertBefore(q,inn.firstChild);
 var src=cd.querySelector('.pt-top');function sync(){q.textContent=src?src.textContent.trim():''}sync();
 /* the views keep the height the page gave them: the ivory grows by the question's own height instead of squeezing the chart */
 var qs=getComputedStyle(q);inn.style.setProperty('height',(H0+q.getBoundingClientRect().height+parseFloat(qs.marginTop)+parseFloat(qs.marginBottom))+'px','important');
 if(src&&window.MutationObserver)new MutationObserver(sync).observe(cd.querySelector('.pt-q')||src,{subtree:true,childList:true,characterData:true})})();
