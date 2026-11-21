/* Take D, the paper: the financial page's earnings calendar. The lead box is tomorrow's close (headline, the clock, the deck), the box
   score under it prints each company's four trades in one table, then the big names as boxed listings and the rest as the agate calendar. */
(function(){const H=H37;
H.mount('D',S=>{const b=S.bell,ms=S.ORDER.map(m=>`<span>${H.mk(m,13)}<i>${H.esc(H.nm(m))}</i></span>`).join('');
 return H.generic(S,{mk:12,capInHead:1,head:{img:'d-head.jpg',ar:'1337/852',plate:[7.7,13.6,84.3,9.4],inner:[7.6,27,85.4,70.8]},
  innerHTML:()=>b?`<span class="dl-kick">${H.esc(b.day)} · ${H.esc(H.WD[H.dow(b.p)])} ${H.esc(b.date)}</span>
   <span class="dl-hed">${b.rounds.length} rounds graded at the ${b.mixed?'close':'4pm New York close'}</span>
   <span class="dl-clock" data-h37cd="${b.close}" role="timer" aria-label="Time to the close"><i>Closes in</i><b data-u="H">00</b><small>h</small><b data-u="m">00</b><small>m</small><b data-u="s">00</b><small>s</small></span>
   <span class="dl-deck">The close grades every trade. <b>${b.nIn}</b> of <b>${b.nAll}</b> are in.</span>`:'',
  tomLab:()=>`<span>Box score · the trades so far</span><span class="dl-hd">${ms}</span>`,bigLab:'Big names to watch',restLab:'The calendar, day by day'})});
/* the masthead line: the paper's own name and today's date, not the bell's */
const prev=H.after;H.after=(root,S)=>{prev&&prev(root,S);const p=root.querySelector('.h37-D .hb-plate span');if(p){const t=S.M.today;p.innerHTML=`Earnings Zeason <em>·</em> The calendar <em>·</em> ${H.esc(H.SD[H.dow(t)]+' '+H.md(t))}`}};
})();
