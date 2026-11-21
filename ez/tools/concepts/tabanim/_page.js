// shared: open the built X2+ page with one take injected; hide the sticky header; scroll the proof card into place
const fs=require('fs'),path=require('path');const FONTS=require('../live-r1/_fonts.js');
const css=fs.readFileSync(path.join(__dirname,'tabanim.css'),'utf8'),js=fs.readFileSync(path.join(__dirname,'tabanim.js'),'utf8');
module.exports=async function open(ctx,take,errs){const p=await ctx.newPage();await FONTS(p);
 p.on('pageerror',e=>errs.push('pageerror: '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/favicon|Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
 await p.addInitScript(([c,j,t])=>{if(t==='now')return;window.__taTake=t;document.addEventListener('DOMContentLoaded',()=>{try{(new Function(j))()}catch(e){console.error(e)}
  const s=document.createElement('style');s.id='ta-mock';s.textContent=c+'\nheader.top,.x2p-vmini{visibility:hidden!important}';document.head.appendChild(s)})},[css,js,take]);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 if(take==='now')await p.addStyleTag({content:'header.top,.x2p-vmini{visibility:hidden!important}'});
 await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(2500);
 await p.evaluate(()=>{const r=document.querySelector('#learn .x2p-pt .pt-cd').getBoundingClientRect();window.scrollBy(0,r.top-24)});await p.waitForTimeout(900);
 return p};
// the card's state after a switch: which tab is open, what the headline and rows say, leftovers
module.exports.state=p=>p.evaluate(()=>{const cd=document.querySelector('#learn .x2p-pt .pt-cd');const on=cd.querySelector('.pt-tb [aria-pressed="true"]');
 const pin=cd.querySelector(':scope>.pt-in:not(.ta-sheet)');const vis=getComputedStyle(pin.querySelector('.pt-body')).visibility;
 return {tab:on&&on.dataset.pt,q:(cd.querySelector('.pr2-q')||{}).textContent,left:cd.querySelectorAll('.ta-sheet,.ta-shade,.ta-roll,.ta-block,.ta-chad,.ta-under').length,
  hide:cd.classList.contains('ta-hide'),vis,tf:getComputedStyle(cd).transform,anims:document.getAnimations().filter(a=>a.playState==='running').length,
  row:(cd.querySelector('.pt-body .pt-r')||{}).textContent}});
