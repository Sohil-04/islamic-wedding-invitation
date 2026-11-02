(function(){
var $=function(s){return document.querySelector(s)};
var t=$('#menuToggle'),n=$('#navLinks');
if(t)t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});
// music (never autoplays)
var a=$('#weddingAudio'),b=$('#musicButton');
function label(on,txt){b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.querySelector('span').textContent=txt}
if(a&&b){b.addEventListener('click',function(){
 if(a.paused){var p=a.play();if(p&&p.then)p.then(function(){label(true,'Pause Music')}).catch(function(){label(false,'Music unavailable')})}
 else{a.pause();label(false,'Play Music')}});
 a.addEventListener('error',function(){label(false,'Music unavailable')},true)}
// curtain
var c=$('#curtain'),o=$('#openInvitation');
if(c&&o){o.focus({preventScroll:true});
 o.addEventListener('click',function(){
  c.classList.add('open');window.dispatchEvent(new Event('curtain-open'));
  setTimeout(function(){c.classList.add('gone');document.body.classList.remove('locked')},1900)})}
// rsvp
var f=$('#rsvpForm');
if(f)f.addEventListener('submit',function(e){e.preventDefault();
 var nm=$('#gName').value.trim(),ct=parseInt($('#gCount').value,10),at=f.querySelector('input[name=att]:checked'),ok=true;
 $('#eName').textContent=nm?'':'Please enter your name.';if(!nm)ok=false;
 var bad=!(ct>=1&&ct<=20);$('#eCount').textContent=bad?'Enter a number between 1 and 20.':'';if(bad)ok=false;
 $('#eAtt').textContent=at?'':'Please choose whether you will attend.';if(!at)ok=false;
 if(!ok)return;
 var ev=[].map.call(f.querySelectorAll('input[name=ev]:checked'),function(i){return i.value}).join(', ')||'Not specified';
 var m=$('#gMsg').value.trim();
 var txt='Assalamu Alaikum! RSVP for Aisha & Mayur\'s wedding\n\nName: '+nm+'\nGuests: '+ct+'\nAttendance: '+at.value+'\nEvents: '+ev+(m?'\nMessage: '+m:'');
 window.open('https://wa.me/917507992064?text='+encodeURIComponent(txt),'_blank','noopener')});
})();