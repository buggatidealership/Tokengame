/* + and − in place of ▲ and ▼ on the certificate (owner, 2026-10-26: "plus and minus is something most people always will understand"); the
   screen-reader words ("Up", "Down") stay */
document.querySelectorAll('.xc [aria-hidden="true"]').forEach(function(s){if(s.textContent==="▲")s.textContent="+";else if(s.textContent==="▼")s.textContent="−"});
