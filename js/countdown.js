(function(){
document.querySelectorAll('.countdown').forEach(function(el){
 var T=new Date(el.dataset.target).getTime(),q=function(u){return el.querySelector('[data-u='+u+']')};
 function p(n){return n<10?'0'+n:''+n}
 function tick(){var d=Math.max(0,T-Date.now()),s=Math.floor(d/1000);
  q('days').textContent=p(Math.floor(s/86400));q('hours').textContent=p(Math.floor(s%86400/3600));
  q('minutes').textContent=p(Math.floor(s%3600/60));q('seconds').textContent=p(s%60)}
 tick();setInterval(tick,1000)})})();