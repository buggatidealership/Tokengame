/* 2 · Stub flag: printed on the ticket's stub under the rank, where a ticket says where it was issued */
r34g.rows().forEach(function(li){var rk=li.querySelector(".rk");if(!rk||rk.querySelector(".r34g-f2w"))return;var c=r34g.cc(li);
  rk.insertAdjacentHTML("beforeend",'<i class="r34g-f2w">'+r34g.svg(c,"r34g-f2")+'</i><span class="sr">'+r34g.NAME[c]+'</span>')});
