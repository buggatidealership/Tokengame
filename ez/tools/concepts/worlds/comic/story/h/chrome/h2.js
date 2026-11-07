/* H2 the cover's corner box: the header is the top band of the comic's cover, printed on newsprint; the logo sits in the classic corner box with the issue (rounds graded) and the price (free); the cover strip below drops its own "No." so it is said once */
(()=>{const h=CH.$('header.top');const br=CH.$('.brand',h);
 br.insertAdjacentHTML('afterbegin',`<span class="h2-cb" aria-hidden="true"><small class="h2-no">No. ${CH.n()}</small><small class="h2-pr">Free</small></span>`);
 const cb=CH.$('.h2-cb',br);cb.prepend(CH.$('.mark',br));CH.inkBox(cb,{fill:'#f8f0d9',shade:'rgba(150,110,40,.18)',seed:13,amp:1.2,inner:1});
 h.insertAdjacentHTML('afterbegin','<i class="h2-np" aria-hidden="true"></i>');CH.name({rot:4,y:2,sc:.14,seed:9});
 CH.$$('.nav a',h).forEach((a,i)=>a.insertAdjacentHTML('beforeend',''));
 const l=CH.$('#liveChip');l.insertAdjacentHTML('afterbegin',`<svg class="h2-bu" viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true"><path d="M8 10 L22 4 L40 9 L58 2 L76 8 L96 3 L112 11 L118 26 L113 44 L117 56 L96 52 L76 58 L56 53 L36 59 L18 52 L3 56 L6 40 L2 24 Z" fill="#15121a" transform="translate(3 3)"/><path d="M8 10 L22 4 L40 9 L58 2 L76 8 L96 3 L112 11 L118 26 L113 44 L117 56 L96 52 L76 58 L56 53 L36 59 L18 52 L3 56 L6 40 L2 24 Z" fill="#ff3a31" stroke="#15121a" stroke-width="2.4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`);
 const iss=CH.$('.sh-iss .sh-is2');if(iss)iss.style.visibility='hidden'})();
