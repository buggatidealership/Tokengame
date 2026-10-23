/* Round 30, concept "slab": the explainer sealed in the record's PSA-style holder as the season's card number zero.
   The label is the record's label (x2plus.js __x2pSlab): year line, the name slot, barcode with cert digits, the $EZ hologram
   in the middle; on the right "#0", a descriptor and, where the grade sits, the running time. The page's own heading
   (h2.vt-tag) is moved into the name slot and its running time (small.vt-s, still counted down by x2plus.js) into the grade
   slot: the same elements, so the player keeps updating them. Idempotent. */
var vt=document.querySelector('.x2p-vt');if(!vt||vt.querySelector('.r30-lab'))return;
var h2=vt.querySelector('h2.vt-tag'),st=vt.querySelector('.vt-s');if(!h2||!st)return;
var mk=function(tag,cls,html,hid){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(hid)e.setAttribute('aria-hidden','true');return e};
vt.classList.add('r30s');
var lab=mk('div','r30-lab'),zl=mk('div','zl'),zr=mk('div','zr');
zl.appendChild(mk('span','y','2026 <span class="s">$</span><span class="e">E</span><span class="z">Z</span> Season 1',true));
zl.appendChild(h2);
zl.appendChild(mk('span','zb','<i></i>00000000<span class="holo"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span>',true));
lab.appendChild(zl);
zr.appendChild(mk('span','no','#0',true));
zr.appendChild(mk('span','ds','Start here',true));
zr.appendChild(st);
lab.appendChild(zr);
vt.insertBefore(lab,vt.firstChild);
