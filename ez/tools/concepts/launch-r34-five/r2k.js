/* r2 arena C: all four marks in the row, but only the one entering next is printed (in its colour, its flag under it); the other three
   are pressed into the card without ink (blind), so the line-up shows and it is plain that only one is in; "One at a time" under them */
var R=window.R34,m=R.next[0];
R.ticket("r34n-b r34n-k",'<span class="r34n-b-ai"><span class="r34n-hd">Entering the arena</span><span class="r34n-sm">Paid by 31% of creator fees</span></span>'+
  '<span class="r34n-bl"><span class="r34n-row">'+R.next.map(function(x,i){return i?'<i class="r34n-bm">'+R.mark(x,"r34n-svg")+'</i>':'<span class="r34n-k1">'+R.logo(x)+R.flag(x)+'</span>'}).join("")+'</span><em>One at a time</em></span>',
  "Ticket number 5: entering the arena, "+m.name+"; "+R.next.slice(1).map(function(x){return x.name}).join(", ")+" follow one at a time, paid for by 31% of our creator fees.");
