/* r1045 frame mockups: shared helper, run in the page. F45(id,{bg,hd,ft,after}) marks the film's frame .x2p-vt with f45 f45-<id>,
   hides today's bill (its h2 stays for screen readers, visually hidden), and adds aria-hidden decoration: .f45-bg behind everything,
   .f45-hd above the picture, .f45-ft below it; the page's live countdown (.vt-s) moves into .f45-tm in the foot. */
(function(){
var LOGO_P='<path fill="#f8f0d9" d="M116.8,88.0 L86.2,152.0 L102.1,152.0 L55.0,274.5 L154.2,274.5 L188.5,225.8 L128.7,225.8 L137.5,204.0 L170.2,203.5 L193.2,162.0 L149.1,162.0 L154.8,145.0 L143.4,138.5 L217.9,138.2 L192.2,182.0 L234.9,182.0 L181.5,250.8 L136.0,315.8 L272.5,315.8 L292.5,265.0 L230.4,265.0 L328.2,130.8 L225.1,130.8 L253.0,87.8 Z"/><path fill="#03c870" d="M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z"/><path fill="#ff3a31" d="M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z"/><path fill="#fdbc2a" d="M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z"/>';
window.F45={
  disc:function(c){return '<svg class="'+(c||'')+'" viewBox="0 0 400 400" aria-hidden="true"><circle cx="198.7" cy="199.4" r="198.2" fill="#04070e"/>'+LOGO_P+'</svg>'},
  letters:function(c,ink){var p=LOGO_P;if(ink)p=p.replace(/#f8f0d9/g,ink);return '<svg class="'+(c||'')+'" viewBox="26 84 338 246" aria-hidden="true">'+p+'</svg>'},
  /* a pair of the logo's slashes (its lean: about 33 degrees off upright), in one colour */
  sl:function(col,c){return '<svg class="f45-sl '+(c||'')+'" viewBox="0 0 22 30" aria-hidden="true"><path fill="'+col+'" d="M12.5 0H18L7.5 30H2z M19.5 6H22L14.6 27H12.1z"/></svg>'},
  /* "Earnings Zeason", E green and Z red, as the header sets it */
  name:function(){return '<span class="f45-nm"><i class="f45-e">E</i>arnings <i class="f45-z">Z</i>eason</span>'},
  mount:function(id,o){var d=document,vt=d.querySelector('.x2p-vt'),p=vt.querySelector('.vt-p');vt.classList.add('f45','f45-'+id);
    var mk=function(c,h){var e=d.createElement('div');e.className=c;e.setAttribute('aria-hidden','true');e.innerHTML=h;return e};
    if(o.bg)vt.insertBefore(mk('f45-bg',o.bg),vt.firstChild);
    if(o.hd)vt.insertBefore(mk('f45-hd',o.hd),p);
    if(o.ft){var f=mk('f45-ft',o.ft);vt.appendChild(f);var vs=vt.querySelector('.vt-s'),slot=f.querySelector('.f45-tm');if(vs&&slot)slot.appendChild(vs)}
    /* the label follows the page's countdown: "Running time 1:20" before and after, "Time left 0:58" while it plays */
    var vs2=vt.querySelector('.vt-s'),v=vt.querySelector('video'),tl=vt.querySelector('.f45-tl');
    if(vs2&&tl){var full=function(){var d=v&&isFinite(v.duration)&&v.duration?Math.round(v.duration):80;return Math.floor(d/60)+':'+('0'+d%60).slice(-2)};
      var lab=function(){var w=vs2.textContent&&vs2.textContent!==full()?'Time left':'Running time';if(tl.textContent!==w)tl.textContent=w};
      new MutationObserver(lab).observe(vs2,{childList:true,characterData:true,subtree:true});lab()}
    if(o.after)o.after(vt);return vt}
};
})();
