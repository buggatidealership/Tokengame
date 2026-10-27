/* r1028: the band's question printed above the chart, kept in step with the tabs (the page re-renders .pt-body on every switch); the
   ticket's shared height (--tin, measured by the page without the question) grows by the question's height so the chart keeps its size */
(function(){var tk=document.querySelector('#learn .x2p-pt');if(!tk)return;var body=tk.querySelector('.pt-body'),top=tk.querySelector('.pt-top');
 function put(){if(body.querySelector('.cq-q'))return;var p=document.createElement('p');p.className='cq-q';p.textContent=top.dataset.t||top.textContent;body.insertBefore(p,body.firstChild);
  var base=parseFloat(tk.dataset.cqBase||tk.style.getPropertyValue('--tin'));if(!base)return;tk.dataset.cqBase=base;
  var cs=getComputedStyle(p);tk.style.setProperty('--tin',Math.ceil(base+p.offsetHeight+parseFloat(cs.marginTop)+parseFloat(cs.marginBottom))+'px');
  var t=body.querySelector('.pt-sg');if(t){var fl=t.parentNode;for(var i=1;i<t.rows.length;i++)t.rows[i].style.height='';var hd=t.rows[0].getBoundingClientRect().height,n=t.rows.length-1,hh=(fl.clientHeight-hd-8)/n;if(hh>0)for(i=1;i<=n;i++)t.rows[i].style.height=hh.toFixed(1)+'px'}}
 new MutationObserver(put).observe(body,{childList:true});put()})();
