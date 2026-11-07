/* on Friday the record opens on the newest graded card (R42); the shot steps to R43, the first card with calls in */
module.exports={moments:['mon','fri'],shots:[['#car',-150]],pre:{fri:"(()=>{const b=[...document.querySelectorAll('#record button,#record a')].find(b=>b.textContent.trim()==='R43');if(b)b.click()})()"}};
