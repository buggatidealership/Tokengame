/* the four variations of the whole sequence (est = beat 1, inst = beat 2, the lines' homes) */
window.S5T=(()=>{const n=window.S5?S5.calls:0,C1='Only the record shows which call was the guess.',C2='So the pool goes on the call of the AI on top.';return {
 v1:{id:'v1',est:'e3',inst:'ic',plates:['Graded calls →','4 AIs on test'],cap1:C1,cap2:C2},
 vh:{id:'vh',est:'e3',inst:'ich',hd:1,plates:['Graded calls \u2192','4 AIs on test'],cap1:C1,cap2:C2},
 v2:{id:'v2',est:'e3',inst:'ib',react:[`Four AIs! ${n} graded calls!`,'And a coin flip gets 50%?'],cap1:C1,cap2:C2},
 v3:{id:'v3',est:'e3',inst:'ia',cap1:C1,cap2:C2},
 v4:{id:'v4',est:'e3b',inst:'ic',mask:'Trust me. I’m sure.',plates:['Graded calls →','4 AIs on test'],cap1:C1,cap2:C2}}})();
