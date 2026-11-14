/* E2 · On air, title up top as a tab (owner, 2026-10-28: E, with "How it works" at the top as the live bill has it; no "Earnings Zeason",
   just the EZ. logo, then "presents", then "How it works"; the logo small). A channel tab on the bezel's top left: a black box with the small
   disc and a gold "presents", then a gold slab at the logo's lean with "How it works." in its black; the rest of the top edge stays open.
   Under the picture, hanging from the bezel's bottom right (where a video's length is looked for): the green and red slashes as the wipe
   into the duration box. Top left and bottom right, the way the logo puts green at its start and red and gold at its end. */
F45.mount('E2',{
  hd:'<span class="f45-tab">'+F45.disc('f45-mi')+'<b>presents</b></span><span class="f45-l3"><span class="f45-ti">How it works<i class="f45-dt"></i></span></span>',
  ft:F45.sl('#03c870','f45-w1')+F45.sl('#ff3a31','f45-w2')+'<span class="f45-du"><small class="f45-tl">Running time</small><span class="f45-tm"></span></span>'});
