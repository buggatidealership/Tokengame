/* Sign study: method (a), the page places the site's logo file on the painted blank panel (bulbs traced round the mark, the name in
   lights beside it unless the mark is itself a wordmark), against method (b), a model painting the whole sign from the logo as a
   reference. Verdicts come from the letter-by-letter check in REPORT.md. */
(async function(){const {U,S,e,I}=H2;const root=U.mount('h2 tS');
const A=[['AAPL','a-roof-2k'],['AMD','a-roof-2k'],['ARM','a-roof-2k'],['AAPL','a-tower'],['AMD','a-arena'],['ARM','a-roof-seed']];
const B=[['b-gpt-aapl','Apple · gpt-image-2','Rejected: the left side bulges past the real outline'],['b-nb-aapl','Apple · nano-banana-pro','Rejected: seen at an angle, cropped; cannot be checked against the file'],
 ['b-gpt-amd','AMD · gpt-image-2','Rejected: the empty square is lit as part of the mark (figure and ground swapped)'],['b-nb-amd','AMD · nano-banana-pro','Rejected: the inner block becomes a window frame'],
 ['b2-gpt-amd','AMD · gpt-image-2, retry','Shape matches the file (IoU 0.81) but painted orange, not the site\'s green: not shippable as is'],['b2-nb-aapl','Apple · nano-banana-pro, retry','Rejected: at an angle again despite "straight on"; the outline cannot be checked flat'],
 ['b-gpt-arm','Arm · gpt-image-2','Letters match the file (a, r, m); colour is gold, not Arm blue'],['b-nb-arm','Arm · nano-banana-pro','Letters match; the panel is pale and the colour is not Arm blue']];
root.innerHTML=`<header class="s-h"><h2 class="s-t">Method (a): the real logo file placed on the painted panel</h2><p>One painting per scene, reused for every main event. The glass takes the company's colour; the mark is the site's own file; the bulbs follow its outline.</p></header>
 <div class="s-g">${A.map(([t,sc])=>`<figure class="s-c" style="${S.bvars(S.brand(t))}">${H2.signHtml({ticker:t},sc)}<figcaption>${e(U.nm(t))} (${e(t)}) · scene ${sc}</figcaption></figure>`).join('')}</div>
 <header class="s-h"><h2 class="s-t">Method (b): the model paints the sign from the logo</h2><p>Checked shape by shape against the site's file.</p></header>
 <div class="s-g">${B.map(([f,l,v])=>`<figure class="s-c s-b${/^Rejected|not shippable/.test(v)?' no':' ok'}"><img src="${I}${f}.jpg" alt=""><figcaption><b>${e(l)}</b>${e(v)}</figcaption></figure>`).join('')}</div>`;
await H2.done(root)})();
