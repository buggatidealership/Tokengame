/* r1038 proof: the proof ticket re-made on the bet ticket's own die, stock, strips and ink (its classes, as std.js does); the
   question printed in the bet's ink at the top of the ivory, the strips carrying the bet's small words. window.__pV = 'P'. */
(function(){var d=document,pt=d.querySelector('#learn .x2p-pt'),cd=pt&&pt.querySelector('.pt-cd');if(!cd)return;
 var ser=((cd.querySelector('.pt-bd.r .pt-ko:last-child')||{}).textContent||'').match(/\d{6}/);ser=ser?ser[0]:'000046';
 var num='N<u>o</u> '+ser.split('').map(function(c,i){var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('');
 cd.classList.add('bs-nx','r38p');pt.classList.add('r38pt');
 cd.insertAdjacentHTML('afterbegin','<div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-pp"><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
  '<div class="bt-st bt-hd"><span class="r38-sb sp"><span>Season 1</span><span><i></i>The proof<i></i></span><span>Graded at the close</span></span></div>'+
  '<div class="bt-st bt-ft"><span class="r38-sb sp"><span>Admit one</span><span>Simulated · before fees</span><span class="bt-no">'+num+'</span></span></div>');
 if(window.__pV==='P2'||window.__pV==='P3'){if(window.__pV==='P3')cd.classList.add('r38p3'); /* P2 (owner, same night): the question stays where it is on the live site, in the green band at the top, the band as tall as it needs */
  cd.classList.add('r38p2');var hd=cd.querySelector('.bt-hd');hd.innerHTML='<span class="r38-q2"><i></i><b></b><i></i></span>';
  var b=hd.querySelector('b'),srcq=cd.querySelector('.pt-top');var sy=function(){b.textContent=srcq?srcq.textContent.trim():''};sy();
  if(srcq&&window.MutationObserver)new MutationObserver(sy).observe(cd.querySelector('.pt-q')||srcq,{subtree:true,childList:true,characterData:true});return}
 var inn=cd.querySelector('.pt-in'),H0=inn.getBoundingClientRect().height,q=d.createElement('h3');q.className='r38q';inn.insertBefore(q,inn.firstChild);
 var src=cd.querySelector('.pt-top');function sync(){q.textContent=src?src.textContent.trim():''}sync();
 /* the views keep the height the page gave them: the ivory grows by the question's own height instead of squeezing the chart */
 var qs=getComputedStyle(q);inn.style.setProperty('height',(H0+q.getBoundingClientRect().height+parseFloat(qs.marginTop)+parseFloat(qs.marginBottom))+'px','important');
 if(src&&window.MutationObserver)new MutationObserver(sync).observe(cd.querySelector('.pt-q')||src,{subtree:true,childList:true,characterData:true})})();
