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

(function(){
var tot=document.getElementById('vcn'),onl=document.getElementById('von');if(!tot)return;
var P='projects/bravogames/databases/(default)/documents',B='https://firestore.googleapis.com/v1/'+P;
function fmt(n){var v=parseInt(n,10);return isFinite(v)?v.toLocaleString('en-US'):null}
function cnt(d){return d&&d.fields&&d.fields.count?parseInt(d.fields.count.integerValue,10):0}
function inc(path){return fetch(B+':commit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({writes:[{transform:{document:P+'/'+path,fieldTransforms:[{fieldPath:'count',increment:{integerValue:'1'}}]}}]})}).then(function(r){return r.json()})}
function get(path){return fetch(B+'/'+path).then(function(r){return r.json()}).catch(function(){return null})}
/* total visitors: count each browser once */
function readTotal(){get('stats/visitors').then(function(d){tot.textContent=fmt(cnt(d))||'0'})}
var seen=false;try{seen=localStorage.getItem('bg_visited')==='1'}catch(e){}
if(seen){readTotal()}else{inc('stats/visitors').then(function(d){var n=d.writeResults&&d.writeResults[0].transformResults&&d.writeResults[0].transformResults[0].integerValue;if(n){try{localStorage.setItem('bg_visited','1')}catch(e){}tot.textContent=fmt(n)}else readTotal()}).catch(readTotal)}
/* visitors today: one count per browser per UTC day */
var td=document.getElementById('vtd');
if(td){var day=new Date().toISOString().slice(0,10).replace(/-/g,'');var last=null;try{last=localStorage.getItem('bg_day')}catch(e){}
 var rt=function(){get('daily/'+day).then(function(d){td.textContent=fmt(cnt(d))||'0'})};
 if(last===day){rt()}else{inc('daily/'+day).then(function(d){var n=d.writeResults&&d.writeResults[0].transformResults&&d.writeResults[0].transformResults[0].integerValue;if(n){try{localStorage.setItem('bg_day',day)}catch(e){}td.textContent=fmt(n)}else rt()}).catch(rt)}}
/* online now: every open tab adds 1 to the current minute bucket once a minute; online = busiest of the last two minutes */
function minute(){return Math.floor(Date.now()/60000)}
function beat(){if(document.visibilityState==='hidden')return;inc('online/'+minute()).catch(function(){})}
function readOnline(){if(!onl)return;var m=minute();Promise.all([get('online/'+m),get('online/'+(m-1))]).then(function(r){onl.textContent=fmt(Math.max(1,cnt(r[0]),cnt(r[1])))})}
if(onl){beat();setTimeout(readOnline,1200);setInterval(function(){beat();setTimeout(readOnline,1500)},60000);document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'){beat();setTimeout(readOnline,1200)}})}
})();
