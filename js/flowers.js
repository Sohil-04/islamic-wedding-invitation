(function(){
var f=document.getElementById('petalField');if(!f)return;
var small=window.innerWidth<700,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce)return;
function make(n,burst){for(var i=0;i<n;i++){
 var p=document.createElement('img');p.src='assets/flowers/rose-petal.png';p.alt='';p.className='petal';p.setAttribute('aria-hidden','true');
 var s=burst?18+Math.random()*26:16+Math.random()*24;
 p.style.cssText='left:'+Math.random()*100+'%;width:'+s+'px;animation-duration:'+(9+Math.random()*9)+'s;animation-delay:'+(burst?Math.random()*2.5:-Math.random()*14)+'s;--dx:'+(Math.random()*160-80)+'px;--rot:'+(Math.random()*720-360)+'deg';
 if(burst)p.dataset.burst=1;f.appendChild(p)}}
make(small?8:14,false);
// extra petals during curtain reveal, removed afterwards to keep the page light
window.addEventListener('curtain-open',function(){make(small?6:10,true);
 setTimeout(function(){f.querySelectorAll('[data-burst]').forEach(function(e){e.remove()})},16000)});
})();