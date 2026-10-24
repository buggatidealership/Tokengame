/* r2 arena B: the one that enters next, big, in its colour with its flag; then the rest of the line in small plain ink, in order, so it
   reads as a queue: one at a time */
var R=window.R34,m=R.next[0];
R.ticket("r34n-b r34n-j",'<span class="r34n-b-ai"><span class="r34n-hd">Entering the arena</span><span class="r34n-sm">Paid by 31% of creator fees</span></span>'+
  '<span class="r34n-q"><span class="r34n-q1">'+R.logo(m)+R.flag(m)+'</span><span class="r34n-qt"><i>Then</i><span>'+R.next.slice(1).map(function(x){return '<span class="r34n-qs">'+R.mark(x,"r34n-svg")+'</span>'}).join("")+'</span></span></span>',
  "Ticket number 5: entering the arena, "+m.name+", then "+R.next.slice(1).map(function(x){return x.name}).join(", ")+", one at a time, paid for by 31% of our creator fees.");
