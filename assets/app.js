(function(){
var root=document.documentElement;
try{var t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
var tb=document.getElementById('theme');
if(tb)tb.onclick=function(){var n=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}};
var m=document.getElementById('menu'),mb=document.getElementById('mb');
function tog(o){m.classList.toggle('open',o);document.body.style.overflow=o?'hidden':''}
if(mb){mb.onclick=function(){tog(true)};document.getElementById('mx').onclick=function(){tog(false)};m.querySelectorAll('a').forEach(function(a){a.onclick=function(){tog(false)}});document.addEventListener('keydown',function(e){if(e.key==='Escape')tog(false)})}
var o=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.r').forEach(function(el){o.observe(el)});
document.querySelectorAll('.card').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
})();
