/* Round 30, concept "slab": the explainer sealed in the record's PSA-style holder as the season's card number zero.
   The label is the record's label (x2plus.js __x2pSlab): the year line, the name slot, the barcode, the $EZ hologram in the
   middle, "#0" top right where the record prints the round's number. The grade slot stays empty: nothing was graded. The page's
   own heading (h2.vt-tag) goes into the name slot and its running time (small.vt-s, still counted down by x2plus.js) to the
   foot of the right column as a small printed duration: the same elements, so the player keeps updating them.
   Then the ink is set straight: the heading midway between the year line and the barcode, "#0" on the year line's baseline, the
   time's baseline on the barcode's foot (canvas cap heights plus a baseline probe, as the page's nmFit and centre() do).
   Idempotent: a second run only re-measures. */
var vt=document.querySelector('.x2p-vt');if(!vt)return;
var lab=vt.querySelector('.r30-lab');
if(!lab){
  var h2=vt.querySelector('h2.vt-tag'),st=vt.querySelector('.vt-s');if(!h2||!st)return;
  var mk=function(tag,cls,html,hid){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(hid)e.setAttribute('aria-hidden','true');return e};
  /* an irregular barcode at whole pixels (bar, gap, bar, ...), not a repeating comb */
  var W=[1,1,2,1,1,2,3,1,1,1,2,2,1,1,1,1,2,1,1,2,1],x=0,r='';
  for(var i=0;i<W.length;i++){if(i%2===0)r+='<rect x="'+x+'" y="0" width="'+W[i]+'" height="1"/>';x+=W[i]}
  var bar='<svg viewBox="0 0 '+x+' 1" width="'+x+'" preserveAspectRatio="none" fill="#141217" aria-hidden="true">'+r+'</svg>';
  vt.classList.add('r30s');
  lab=mk('div','r30-lab');var zl=mk('div','zl'),zr=mk('div','zr');
  zl.appendChild(mk('span','y','2026 <span class="s">$</span><span class="e">E</span><span class="z">Z</span> Season 1',true));
  zl.appendChild(h2);
  zl.appendChild(mk('span','zb',bar+'<span class="holo"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span>',true));
  lab.appendChild(zl);
  zr.appendChild(mk('span','no','#0',true));
  zr.appendChild(st);
  lab.appendChild(zr);
  vt.insertBefore(lab,vt.firstChild);
}
var cv=document.createElement('canvas').getContext('2d');
function cap(el){var cs=getComputedStyle(el);cv.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;return cv.measureText('H').actualBoundingBoxAscent}
function base(el){var p=document.createElement('i');p.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline;margin:0;padding:0';el.appendChild(p);var y=p.getBoundingClientRect().top;p.remove();return y}
function fit(){var l=vt.querySelector('.r30-lab');if(!l)return;
  var y=l.querySelector('.y'),h=l.querySelector('h2.vt-tag'),b=l.querySelector('.zb svg'),no=l.querySelector('.no'),t=l.querySelector('.vt-s');if(!y||!h||!b||!no||!t)return;
  l.style.setProperty('--r30-hy','0px');l.style.setProperty('--r30-ny','0px');l.style.setProperty('--r30-ty','0px');
  var yb=base(y),hb=base(h),hc=hb-cap(h),br=b.getBoundingClientRect(),d=((br.top-hb)-(hc-yb))/2;
  l.style.setProperty('--r30-hy',(Math.round(d*4)/4)+'px');
  l.style.setProperty('--r30-ny',(Math.round((yb-base(no))*4)/4)+'px');
  /* the time's text changes every second while it plays; the probe is in and out within this call */
  var tb=base(t);l.style.setProperty('--r30-ty',(Math.round((br.bottom-tb)*4)/4)+'px')}
fit();
if(!vt.__r30fit){vt.__r30fit=1;if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  var rw=innerWidth;addEventListener('resize',function(){if(innerWidth!==rw){rw=innerWidth;requestAnimationFrame(fit)}})}
