/* A3: A2, but the combined-P&L box loses its second line ("All 4 AIs · ACN"): the round is already on the card. The single-AI box on the
   Bullseye card keeps "Kimi · Long Novartis" (it still fits the box). */
B45.R.a3=function(D,uid){var h=B45.R.a2(D,uid);return D.star?h:h.replace(/<span class="b45-bc b45-p a-who[^"]*">[^<]*<\/span>/,'')};
