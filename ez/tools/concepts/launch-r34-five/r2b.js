/* r2 B · Next AI models: a No. 5 row on the board's own columns: the words where a name goes, the four next AIs' logos in colour in
   the number fields, each with its lab's flag printed under it (the board's flags, on the stub above) */
var R=window.R34;
R.ticket("r34n-b",'<span class="r34n-b-ai"><span class="r34n-hd">Next AI models</span><span class="r34n-sm">Paid by 31% of creator fees</span></span>'+
  '<span class="r34n-b-four">'+R.next.map(function(m){return '<span class="r34n-b-it">'+R.logo(m)+R.flag(m)+'</span>'}).join("")+'</span>',
  "Ticket number 5: the next AI models, "+R.next.map(function(m){return m.name+" ("+({CN:"China",FR:"France",US:"United States"})[R.cc[m.k]]+")"}).join(", ")+", paid for by 31% of our creator fees.");
