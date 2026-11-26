/* hide images that fail to load (replaces inline onerror handlers, keeps CSP strict) */
(function(){
  function gone(img){ if(img && img.hasAttribute && img.hasAttribute("data-hide-broken")) img.remove(); }
  document.addEventListener("error", function(e){ if(e.target && e.target.tagName==="IMG") gone(e.target); }, true);
  function sweep(){ document.querySelectorAll("img[data-hide-broken]").forEach(function(i){ if(i.complete && i.naturalWidth===0 && i.getAttribute("src")) i.remove(); }); }
  if(document.readyState!=="loading") sweep(); else document.addEventListener("DOMContentLoaded", sweep);
  window.addEventListener("load", sweep);
})();
/* start at top */
(() => {
  try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) {}
  const top = () => { if (!location.hash) { const h = document.documentElement, b = h.style.scrollBehavior; h.style.scrollBehavior = "auto"; window.scrollTo(0, 0); h.style.scrollBehavior = b; } };
  let moved = false; ["wheel","touchstart","keydown","pointerdown"].forEach(ev => addEventListener(ev, () => { moved = true; }, { once: true, passive: true }));
  const topIfIdle = () => { if (!moved) top(); };
  top(); addEventListener("DOMContentLoaded", topIfIdle); addEventListener("load", topIfIdle);
  addEventListener("pageshow", top);
})();

(() => {
  const $ = s => document.querySelector(s);
  const btn = $("#menuBtn"), nav = $("#mainNav");
  if (btn && nav) btn.addEventListener("click", () => { const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
  const y = $("#yr"); if (y) y.textContent = new Date().getFullYear();
  if (document.body.dataset.page === "index") return;
  const form = $("#brief");
  if (form) {
    const link = () => { const v = id => $(id).value.trim(); const n=v("#fName"),p=v("#fPhone"),b=v("#fBiz"),s=v("#fSvc"),m=v("#fMsg");
      const txt = `Hi Priority Ads Agency${n?`, I'm ${n}`:""}${b?` from ${b}`:""}.\nInterested in: ${s}${m?`\n${m}`:""}${p?`\nMy number: ${p}`:""}`;
      $("#waForm").href = "https://wa.me/917760665912?text=" + encodeURIComponent(txt); };
    ["#fName","#fPhone","#fBiz","#fSvc","#fMsg"].forEach(id => $(id).addEventListener("input", link)); link();
    form.addEventListener("submit", e => e.preventDefault());
  }
})();

if (document.body.dataset.page === "index") (() => {
"use strict";
const $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = matchMedia("(pointer: coarse)").matches;
const T0 = performance.now();
const S = {visible:0, scroll:0, lastY:scrollY, leaves:0, hiddenAt:0, curDist:0, curTime:0, lastM:null, speeds:[], sec:{}, auction:null};
const fmt = ms => { const s=Math.floor(ms/1000); return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); };
const inr = n => "₹" + n.toFixed(2);
$("#yr").textContent = new Date().getFullYear();

/* marquee: duplicate for seamless loop */
const mq = $("#marq"); if (mq) mq.innerHTML += mq.innerHTML;

/* visitor signals (local only) */
const now = new Date(), H = now.getHours();
const timeOfDay = H<5?"late-night":H<12?"morning":H<17?"afternoon":H<21?"evening":"night";
const device = coarse ? (Math.min(innerWidth,innerHeight) < 600 ? "phone" : "tablet") : "laptop / desktop";
const pointer = {x:-999,y:-999,on:false};
addEventListener("pointermove", e => {
  const t = performance.now();
  if (S.lastM){ const d=Math.hypot(e.clientX-S.lastM.x,e.clientY-S.lastM.y), dt=t-S.lastM.t; if (dt>0&&dt<200){S.curDist+=d;S.curTime+=dt;} }
  S.lastM={x:e.clientX,y:e.clientY,t}; pointer.x=e.clientX; pointer.y=e.clientY; pointer.on=true;
},{passive:true});
let lastST = performance.now();
addEventListener("scroll", () => { const t=performance.now(), d=Math.abs(scrollY-S.lastY), dt=t-lastST;
  S.scroll+=d; if (dt>0&&dt<300) S.speeds.push(d/dt*1000); if (S.speeds.length>200) S.speeds.shift(); S.lastY=scrollY; lastST=t; },{passive:true});
function speedPx(){ if (!coarse && S.curTime>400) return S.curDist/S.curTime*1000;
  if (S.speeds.length>5){ const a=[...S.speeds].sort((x,y)=>x-y); return a[Math.floor(a.length*.7)]; } return 0; }
function reader(){ const v=speedPx(); if (!v) return "new visitor";
  if (coarse) return v>1600?"fast scroller":v>700?"steady scroller":"careful reader";
  return v>900?"quick skimmer":v>380?"browser":"careful reader"; }

/* leaving the tab */
const realTitle = document.title;
document.addEventListener("visibilitychange", () => {
  if (document.hidden){ S.hiddenAt=performance.now(); S.leaves++; document.title="Come back to Priority Ads Agency"; }
  else { document.title=realTitle; if (S.hiddenAt) toast("Welcome back!", `You were away ${Math.round((performance.now()-S.hiddenAt)/1000)} seconds. Customers leave mid-scroll too. Good ads bring them back.`); }
});
let tt; function toast(h,b){ const el=$("#toast"); el.innerHTML=`<b>${h}</b>${b}`; el.classList.add("show"); clearTimeout(tt); tt=setTimeout(()=>el.classList.remove("show"),5000); }

/* hero: soft dot ring from the logo's halftone, drawn toward the cursor */
const vis=$("#visual"), cv=$("#field"), cx=cv.getContext("2d"), emb=$("#emb");
let dots=[], cw=0, ch=0; const dpr=Math.min(devicePixelRatio||1,2);
function size(){ const r=vis.getBoundingClientRect(); cw=r.width; ch=r.height; cv.width=cw*dpr; cv.height=ch*dpr; cx.setTransform(dpr,0,0,dpr,0,0);
  dots=[]; const g=Math.max(16,cw/30); for(let y=g/2;y<ch;y+=g) for(let x=g/2;x<cw;x+=g){ const rr=Math.hypot(x-cw/2,y-ch/2);
    if (rr>cw*.41 && rr<cw*.5) dots.push({x,y,ox:x,oy:y,c:Math.random()<.5?"245,180,26":"14,79,211",s:Math.random()*1.4+1.1}); } }
size(); addEventListener("resize", size);
function draw(){
  if (document.hidden || !cv.offsetParent) return;
  const r=vis.getBoundingClientRect(); if (r.bottom<0||r.top>innerHeight) return;
  const px=pointer.x-r.left, py=pointer.y-r.top; cx.clearRect(0,0,cw,ch);
  for (const d of dots){ const dx=px-d.ox, dy=py-d.oy, dist=Math.hypot(dx,dy), pull=pointer.on&&dist<150?(1-dist/150)*18:0;
    const tx=d.ox+(dist?dx/dist*pull:0), ty=d.oy+(dist?dy/dist*pull:0); d.x+=(tx-d.x)*.12; d.y+=(ty-d.y)*.12;
    cx.fillStyle=`rgba(${d.c},${.35+pull/18*.6})`; cx.beginPath(); cx.arc(d.x,d.y,d.s,0,Math.PI*2); cx.fill(); }
  if (pointer.on && !reduce){ const rx=Math.max(-1,Math.min(1,(px-cw/2)/cw)), ry=Math.max(-1,Math.min(1,(py-ch/2)/ch));
    emb.style.transform=`perspective(900px) rotateY(${rx*8}deg) rotateX(${-ry*6}deg)`; }
}

/* auction */
const RIV=[{n:"Sneaker store",b:14,r:5},{n:"Cloud kitchen",b:9,r:7},{n:"Coaching centre",b:20,r:3},{n:"Real-estate firm",b:25,r:2}];
let rivals=RIV.map(x=>({...x}));
const bid=$("#bid"), rel=$("#rel");
function runAuction(){
  const b=+bid.value, r=+rel.value; $("#bidO").textContent="₹"+b; $("#relO").textContent=r+" / 10";
  const all=[{n:"Your business",b,r,you:true},...rivals].map(x=>({...x,rank:x.b*x.r})).sort((a,c)=>c.rank-a.rank);
  const max=Math.max(...all.map(x=>x.rank),1);
  $("#bars").innerHTML=all.map((x,i)=>`<div class="bar${x.you?" you":""}${i===0?" win":""}"><span class="nm">${x.n}</span><span class="tr"><span class="fl" style="width:${(x.rank/max*100).toFixed(1)}%"></span></span><span class="rk">${x.rank}</span></div>`).join("");
  const richest=[...all].sort((a,c)=>c.b-a.b)[0];
  if (all[0].you){ const pay=Math.min(b,all[1].rank/r+0.01); S.auction={won:true,pay};
    $("#verdict").innerHTML=`<b>You win the ad slot</b> and pay ${inr(pay)} per click instead of your full ₹${b}.`+(richest.you?"":` The ${richest.n.toLowerCase()} bid ₹${richest.b} and still lost, because its ad was less relevant.`);
  } else { const need=Math.ceil(all[0].rank/b+1e-4); S.auction={won:false,lostTo:all[0].n};
    $("#verdict").innerHTML=`<b>The ${all[0].n.toLowerCase()} wins this slot.</b> `+(need<=10?`Raise your relevance to ${need}/10 and you'd win without spending a rupee more. That's what good targeting and creatives do.`:`At ₹${b} relevance alone can't win here. A slightly higher bid with a sharper ad would.`); }
}
if (bid && rel) { bid.addEventListener("input",runAuction); rel.addEventListener("input",runAuction);
$("#rerun").addEventListener("click",()=>{ rivals=RIV.map(x=>({...x,b:Math.max(3,Math.round(x.b*(.75+Math.random()*.5))),r:Math.max(1,Math.min(10,x.r+Math.round(Math.random()*2-1)))})); runAuction(); });
runAuction(); }

/* section dwell */
const names={services:"Services",why:"Why us",process:"Process","how-ads-work":"Ad auction",visit:"This receipt",contact:"Contact"};
const secs=Object.keys(names).map(id=>document.getElementById(id)).filter(Boolean);
function secTick(dt){ const mid=innerHeight*.45; for (const s of secs){ const r=s.getBoundingClientRect(); if (r.top<mid&&r.bottom>mid) S.sec[s.id]=(S.sec[s.id]||0)+dt; } }

/* receipt */
const rcNo="PA-"+Math.random().toString(36).slice(2,8).toUpperCase();
const when={"late-night":"After 11 pm","morning":"7 to 10 am","afternoon":"1 to 4 pm","evening":"6 to 9 pm","night":"9 to 11 pm"}[timeOfDay];
const where=device==="phone"?"Instagram Reels & Stories":device==="tablet"?"Facebook & Instagram feed":"Google Search, then Instagram";
function adForYou(){
  if (device==="phone") return "A short vertical reel with captions, the offer shown in the first second, and a WhatsApp button.";
  if (device==="tablet") return "A swipeable carousel of your best products, ending with a WhatsApp chat button.";
  return "A Google search ad when you look for the service, followed by an Instagram reminder ad later"+(S.leaves?", since you tend to switch tabs and come back.":".");
}
function rcRows(){
  const longest=Object.entries(S.sec).filter(([k])=>k!=="visit").sort((a,b)=>b[1]-a[1])[0];
  const m=S.scroll/96*0.0254;
  return [
    ["Visitor type", reader().replace(/^./,c=>c.toUpperCase())],
    ["Device", device],
    ["Time on page", fmt(performance.now()-T0)],
    ["Scrolled", m<1?(m*100).toFixed(0)+" cm":m.toFixed(1)+" m"],
    ["Most interested in", longest&&longest[1]>1500?names[longest[0]]:"Still exploring"],
    ["Times you switched tabs", String(S.leaves)]
  ];
}
function renderReceipt(){ if (!$("#rc")) return;
  const rows=rcRows(), stamp=new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
  $("#rc").innerHTML=`
    <div class="top"><img src="${$(".nav .logo img").src}" alt=""><span>Receipt ${rcNo}<br>${stamp}</span></div>
    <span class="live"><i></i>Updating live</span>
    <hr>${rows.map(([a,b])=>`<div class="r"><span>${a}</span><span>${b}</span></div>`).join("")}
    <hr><div class="ad"><b>The ad we'd show you</b>${adForYou()}</div>
    <hr><div class="r tot"><span>Your attention</span><span>${fmt(S.visible)}</span></div>
    <div class="r tot"><span>You paid</span><span>₹0.00</span></div>
    <hr><div style="text-align:center;color:var(--mute);font-size:13.5px">Thank you for your time. Your success is our priority.</div>`;
  $("#facts4").innerHTML=[["Best time to reach you",when],["Best place to reach you",where],["How you browse",reader().replace(/^./,c=>c.toUpperCase())],["Time you've spent here",fmt(performance.now()-T0)]].map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join("");
  $("#waRc").href="https://wa.me/917760665912?text="+encodeURIComponent(receiptText(rows)+"\n\nI'd like to talk about ads for my business.");
}
function receiptText(rows){ rows=rows||rcRows(); return `Priority Ads Agency · receipt ${rcNo}\n`+rows.map(([a,b])=>`${a}: ${b}`).join("\n")+`\nAd you'd show me: ${adForYou()}`; }
$("#copyRc") && $("#copyRc").addEventListener("click", async()=>{ try{ await navigator.clipboard.writeText(receiptText()); $("#copyMsg").textContent="Copied. You can paste it anywhere."; }catch(e){ $("#copyMsg").textContent="Your browser blocked copying. Use the WhatsApp button instead."; } });

/* contact form -> WhatsApp */
function formLink(){ const v=id=>$(id).value.trim(); const n=v("#fName"),p=v("#fPhone"),b=v("#fBiz"),s=v("#fSvc"),m=v("#fMsg");
  const txt=`Hi Priority Ads Agency${n?`, I'm ${n}`:""}${b?` from ${b}`:""}.\nInterested in: ${s}${m?`\n${m}`:""}${p?`\nMy number: ${p}`:""}`;
  $("#waForm").href="https://wa.me/917760665912?text="+encodeURIComponent(txt); }
["#fName","#fPhone","#fBiz","#fSvc","#fMsg"].forEach(id=>$(id).addEventListener("input",formLink)); formLink();
$("#brief").addEventListener("submit",e=>e.preventDefault());

/* ticks */
let lt=performance.now();
setInterval(()=>{ const t=performance.now(), dt=t-lt; lt=t; if (!document.hidden&&document.hasFocus()) S.visible+=dt; renderReceipt(); },1000);
let lr=performance.now();
let secAcc=0;
(function loop(t){ const dt=Math.min(100,(t||lr)-lr); lr=t||lr; draw(); secAcc+=dt; if (secAcc>=250){ if (!document.hidden) secTick(secAcc); secAcc=0; } requestAnimationFrame(loop); })();
renderReceipt();
})();

/* testimonial carousel */
(() => {
  document.querySelectorAll(".tcar").forEach(car => {
    const track = car.querySelector(".ttrack"), btns = car.querySelectorAll(".tnav");
    const step = () => { const card = track.querySelector(".tcard"); return card ? card.getBoundingClientRect().width + 20 : track.clientWidth; };
    const sync = () => { const max = track.scrollWidth - track.clientWidth - 4;
      btns[0].disabled = track.scrollLeft <= 4; btns[1].disabled = track.scrollLeft >= max; };
    btns.forEach(bt => bt.addEventListener("click", () => track.scrollBy({ left: step() * +bt.dataset.dir, behavior: "smooth" })));
    track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    addEventListener("resize", sync); sync();
  });
})();

/* review form */
(() => {
  const f = document.getElementById("rvForm"); if (!f) return;
  const send = document.getElementById("rvSend");
  const upd = () => { const r = (f.querySelector('input[name="rate"]:checked') || {}).value || 5;
    const n = document.getElementById("rvName").value.trim(), t = document.getElementById("rvText").value.trim();
    send.href = "https://wa.me/917760665912?text=" + encodeURIComponent(`Review for Priority Ads Agency\nRating: ${"★".repeat(r)}${"☆".repeat(5-r)} (${r}/5)` + (n ? `\nFrom: ${n}` : "") + (t ? `\n\n${t}` : "")); };
  f.addEventListener("input", upd); f.addEventListener("change", upd); f.addEventListener("submit", e => e.preventDefault()); upd();
})();

/* live template previews + full viewer */
(() => {
  const cards = [...document.querySelectorAll(".wlive")];
  if (!cards.length) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const active = [];               // cards with a live iframe (max 2)
  const state = new WeakMap();

  const fit = (c) => { const s = state.get(c); if (!s || !s.f) return; const ph = c.classList.contains("wphone"); s.f.style.transform = `scale(${ph ? s.lp.clientHeight / 844 : s.lp.clientWidth / 1280})`; };
  function start(card) {
    let s = state.get(card);
    if (!s) { s = { lp: card.querySelector(".lp"), f: null, run: false, y: 0 }; state.set(card, s); }
    if (!s.f) {
      const f = document.createElement("iframe");
      f.src = card.dataset.tpl; f.title = card.dataset.name + " preview"; f.tabIndex = -1; f.setAttribute("aria-hidden", "true");
      f.addEventListener("load", () => { s.lp.classList.add("ready"); s.y = 0; try { const d = f.contentDocument, st = d.createElement("style"); st.textContent = "html,body{scrollbar-width:none!important;-ms-overflow-style:none!important}::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}"; (d.head || d.documentElement).appendChild(st); } catch (e) {} });
      s.lp.appendChild(f); s.f = f; fit(card);
      active.push(card);
      while (active.length > 2) stop(active.shift(), true);
    }
    s.run = true;
  }
  function stop(card, unload) {
    const s = state.get(card); if (!s) return; s.run = false;
    if (unload && s.f) { s.f.remove(); s.f = null; s.lp.classList.remove("ready"); const i = active.indexOf(card); if (i > -1) active.splice(i, 1); }
  }
  // gentle auto-scroll of the previewed site
  (function tick() {
    if (!reduce) for (const c of active) {
      const s = state.get(c); if (!s || !s.run || !s.f || !s.lp.classList.contains("ready")) continue;
      try {
        const w = s.f.contentWindow, d = w.document.scrollingElement || w.document.documentElement;
        const max = d.scrollHeight - w.innerHeight;
        s.y = s.y >= max ? 0 : s.y + 1.6;
        w.scrollTo(0, s.y);
      } catch (e) {}
    }
    requestAnimationFrame(tick);
  })();

  cards.forEach(card => {
    const img = card.querySelector(".lp-poster");
    if (!card.dataset.tpl) return;
    // fall back to the illustration when a template is not present
    fetch(card.dataset.tpl, { method: "HEAD" }).then(r => { if (!r.ok) card.classList.add("no-tpl"); }).catch(() => {});
    if (fine) {
      card.addEventListener("mouseenter", () => start(card));
      card.addEventListener("mouseleave", () => stop(card, false));
    }
    card.addEventListener("click", () => openViewer(card));
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openViewer(card); } });
  });
  addEventListener('load',()=>cards.forEach(fit));
  if (!fine && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.intersectionRatio > .35) start(e.target); else stop(e.target, e.intersectionRatio === 0);
    }), { threshold: [0, .35] });
    cards.forEach(c => io.observe(c));
  }
  addEventListener("resize", () => cards.forEach(fit));

  // viewer
  const tv = document.createElement("div");
  tv.className = "tv"; tv.setAttribute("role", "dialog"); tv.setAttribute("aria-modal", "true");
  tv.innerHTML = `<div class="tv-win"><div class="tv-bar"><span class="tv-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="tv-tab"></span><span class="tv-url"></span>
    <span class="tv-act"><a class="tv-new" target="_blank" rel="noopener">↗ <span>Open in new tab</span></a><button type="button" class="tv-x" aria-label="Close preview">✕</button></span></div>
    <iframe class="tv-frame" title="Template preview"></iframe></div>`;
  document.body.appendChild(tv);
  const fr = tv.querySelector(".tv-frame"); let last = null;
  function openViewer(card) {
    last = card;
    tv.querySelector(".tv-tab").textContent = card.dataset.name;
    tv.querySelector(".tv-url").textContent = "priorityadsagency.com/templates/" + card.dataset.tpl.split("/").slice(-2, -1)[0];
    tv.querySelector(".tv-new").href = card.dataset.tpl;
    fr.src = card.dataset.tpl;
    tv.classList.toggle("phone", card.classList.contains("wphone")); tv.classList.add("open"); document.documentElement.style.overflow = "hidden";
    tv.querySelector(".tv-x").focus();
  }
  function closeViewer() { tv.classList.remove("open"); fr.src = "about:blank"; document.documentElement.style.overflow = ""; if (last) last.focus(); }
  tv.querySelector(".tv-x").addEventListener("click", closeViewer);
  tv.addEventListener("click", e => { if (e.target === tv) closeViewer(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && tv.classList.contains("open")) closeViewer(); });
})();

/* reels: only one plays at a time (the one nearest the middle of the screen, or the one under the mouse); tap to hear */
(function(){var rs=[].slice.call(document.querySelectorAll('.reel'));if(!rs.length)return;
var cur=null,hov=null,pin=null,vis=new Set();
function icon(r,on){r.querySelector('.reel-snd').innerHTML=on?'&#128266;':'&#128263;'}
function stop(r){var v=r.querySelector('video');v.pause();if(r.classList.contains('on')){r.classList.remove('on');v.muted=true;icon(r,false)}}
function pick(){var best=hov||(pin&&vis.has(pin)?pin:null),bd=1e9,mid=innerHeight/2;
 if(!best)vis.forEach(function(r){var b=r.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;var d=Math.abs((b.top+b.bottom)/2-mid)+(b.left/1e4);if(d<bd){bd=d;best=r}});
 if(best===cur)return;if(cur)stop(cur);cur=best;if(cur){var p=cur.querySelector('video').play();p&&p.catch(function(){})}}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>=.5)vis.add(e.target);else{vis.delete(e.target);if(hov===e.target)hov=null;if(pin===e.target)pin=null}});pick()},{threshold:[0,.5,1]});
var t;addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(pick,120)},{passive:true});
rs.forEach(function(r){var v=r.querySelector('video');v.removeAttribute('autoplay');v.pause();io.observe(r);
 if(matchMedia('(hover:hover)').matches){r.addEventListener('mouseenter',function(){hov=r;pick()});r.addEventListener('mouseleave',function(){if(hov===r){hov=null;pick()}})}
 r.addEventListener('click',function(){var on=!r.classList.contains('on');pin=r;vis.add(r);if(cur!==r){if(cur)stop(cur);cur=r}
  r.classList.toggle('on',on);v.muted=!on;icon(r,on);var p=v.play();p&&p.catch(function(){})})})})();

/* related services: arrow buttons */
(function(){var g=document.querySelector('#more .pgrid2');if(!g)return;var w=g.closest('.wrap'),n=document.createElement('div');n.className='more-nav';
n.innerHTML='<button type="button" aria-label="Previous services">&#8592;</button><button type="button" aria-label="More services">&#8594;</button>';w.appendChild(n);
var b=n.querySelectorAll('button');function st(){b[0].disabled=g.scrollLeft<5;b[1].disabled=g.scrollLeft+g.clientWidth>=g.scrollWidth-5}
b[0].onclick=function(){g.scrollBy({left:-g.clientWidth*.9})};b[1].onclick=function(){g.scrollBy({left:g.clientWidth*.9})};g.addEventListener('scroll',st,{passive:true});addEventListener('resize',st);st()})();

/* courses: free preview video — shows the full-course button when the video ends */
(function(){document.querySelectorAll('.cv-frame').forEach(function(f){var v=f.querySelector('video');if(!v)return;
if(v.getAttribute('src'))f.classList.add('has-video');
v.addEventListener('play',function(){f.classList.remove('ended')});
v.addEventListener('ended',function(){f.classList.add('ended')})})})();

/* results cards: open the report in a zoom viewer */
(function(){var cards=[].slice.call(document.querySelectorAll('a.wres'));if(!cards.length)return;
var lb=document.createElement('div');lb.className='zv';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
lb.innerHTML='<div class="zv-top"><span class="zv-t"></span><div class="zv-ctl"><button type="button" class="zv-zoom" aria-label="Zoom">&#128269;+</button><button type="button" class="zv-x" aria-label="Close">&#10005;</button></div></div><div class="zv-stage"><img alt=""></div><button type="button" class="zv-nav zv-prev" aria-label="Previous">&#8249;</button><button type="button" class="zv-nav zv-next" aria-label="Next">&#8250;</button><div class="zv-hint">Tap the image to zoom</div>';
document.body.appendChild(lb);var img=lb.querySelector('img'),st=lb.querySelector('.zv-stage'),t=lb.querySelector('.zv-t'),zb=lb.querySelector('.zv-zoom'),i=0,z=false;
function setZ(v,x,y){z=v;lb.classList.toggle('zoomed',z);zb.innerHTML=z?'&#128269;&minus;':'&#128269;+';if(z&&x!=null){requestAnimationFrame(function(){st.scrollLeft=x*st.scrollWidth-st.clientWidth/2;st.scrollTop=y*st.scrollHeight-st.clientHeight/2})}}
function show(k){i=(k+cards.length)%cards.length;var c=cards[i];img.src=c.getAttribute('href');img.alt=c.querySelector('img').alt;t.textContent=(c.querySelector('h3')||{}).textContent||'';setZ(false)}
var opener=null;
function open(k){opener=document.activeElement;show(k);lb.classList.add('on');document.documentElement.style.overflow='hidden';lb.querySelector('.zv-x').focus()}
function close(){lb.classList.remove('on');document.documentElement.style.overflow='';setZ(false);if(opener&&opener.focus)opener.focus()}
cards.forEach(function(c,k){c.addEventListener('click',function(e){e.preventDefault();open(k)})});
img.addEventListener('click',function(e){var r=img.getBoundingClientRect();setZ(!z,(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height)});
zb.onclick=function(){setZ(!z,.5,.4)};lb.querySelector('.zv-x').onclick=close;
lb.querySelector('.zv-prev').onclick=function(){show(i-1)};lb.querySelector('.zv-next').onclick=function(){show(i+1)};
st.addEventListener('click',function(e){if(e.target===st)close()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)})})();

/* contact form validation */
(function(){
  const form=document.getElementById("brief"); if(!form) return;
  const g=id=>document.getElementById(id);
  const clean={
    fName:v=>v.replace(/[^\p{L}\p{M}\s.'-]/gu,"").replace(/\s{2,}/g," ").slice(0,50),
    fPhone:v=>{let d=v.replace(/\D/g,""); if(d.length>10&&d.startsWith("91"))d=d.slice(2); if(d.length>10&&d.startsWith("0"))d=d.slice(1); return d.slice(0,10);},
    fBiz:v=>v.replace(/[<>{}]/g,"").replace(/\s{2,}/g," ").slice(0,80),
    fMsg:v=>v.replace(/[<>{}]/g,"").slice(0,500)
  };
  const rules={
    fName:[v=>v.length>0||"Please enter your name.", v=>(v.match(/\p{L}/gu)||[]).length>=2||"Name must have at least 2 letters."],
    fPhone:[v=>v.length>0||"Please enter your phone number.", v=>v.length===10||"Enter a 10-digit mobile number.", v=>/^[6-9]/.test(v)||"Mobile number must start with 6, 7, 8 or 9."],
    fBiz:[v=>v.length>0||"Please enter your business name and type.", v=>v.length>=2||"Business name is too short."]
  };
  const err={fName:"eName",fPhone:"ePhone",fBiz:"eBiz"};
  const check=(id,show)=>{const v=g(id).value.trim();let m="";for(const r of rules[id]){const x=r(v);if(x!==true){m=x;break;}}
    if(show){g(err[id]).textContent=m;g(id).classList.toggle("bad",!!m);g(id).setAttribute("aria-invalid",m?"true":"false");} return !m;};
  const touched={};
  form.addEventListener("input",e=>{const el=e.target,id=el.id;
    if(clean[id]){const c=clean[id](el.value); if(c!==el.value){const p=el.selectionStart-(el.value.length-c.length); el.value=c; try{el.setSelectionRange(p,p);}catch(_){}}}
    if(id==="fMsg"&&g("cMsg"))g("cMsg").textContent=el.value.length+"/500";
    if(rules[id]&&touched[id])check(id,true);},true);
  Object.keys(rules).forEach(id=>g(id).addEventListener("blur",()=>{if(g(id).value.trim()){touched[id]=1;check(id,true);}}));
  const btn=g("waForm");
  btn.addEventListener("click",e=>{let first=null;Object.keys(rules).forEach(id=>{touched[id]=1;if(!check(id,true)&&!first)first=id;});
    if(first){e.preventDefault();e.stopImmediatePropagation();g(first).focus();}},true);
  form.addEventListener("submit",e=>{e.preventDefault();btn.click();});
})();
