const TEAM=window.REAVERS_DATA||{
  season:"2026",
  practice:{venue:"Springbrook Archery Centre",sessions:[{day:3,label:"Wednesday",time:"5:30 PM",end:"8:00 PM"},{day:0,label:"Sunday",time:"5:00 PM",end:"8:00 PM"}]},
  upcomingEvents:[],results:[],roster:[],updates:[]
};

document.querySelectorAll("[data-year]").forEach(el=>{el.textContent=String(new Date().getFullYear())});
document.querySelectorAll("[data-season]").forEach(el=>{el.textContent=TEAM.season||"2026"});

function edmontonNow(){
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Edmonton",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
  const map=Object.fromEntries(parts.map(p=>[p.type,p.value]));
  return new Date(Number(map.year),Number(map.month)-1,Number(map.day),Number(map.hour),Number(map.minute),Number(map.second));
}
function parseClock(label){
  const m=String(label).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if(!m)return{hour:17,minute:0};
  let hour=Number(m[1])%12;
  if(m[3].toUpperCase()==="PM")hour+=12;
  return{hour,minute:Number(m[2])};
}
function getNextPractice(){
  const now=edmontonNow();
  const sessions=(TEAM.practice&&TEAM.practice.sessions)||[];
  let best=null;
  for(const session of sessions){
    const clock=parseClock(session.time);
    const d=new Date(now);
    const delta=(session.day-now.getDay()+7)%7;
    d.setDate(now.getDate()+delta);
    d.setHours(clock.hour,clock.minute,0,0);
    if(d<=now)d.setDate(d.getDate()+7);
    if(!best||d<best.date)best={...session,date:d};
  }
  return best;
}
const practice=getNextPractice();
if(practice){
  const dateText=new Intl.DateTimeFormat("en-CA",{weekday:"short",month:"short",day:"numeric"}).format(practice.date).toUpperCase();
  document.querySelectorAll("[data-next-practice-date]").forEach(el=>el.textContent=dateText);
  document.querySelectorAll("[data-next-practice-title]").forEach(el=>el.textContent=`${practice.label} practice`);
  document.querySelectorAll("[data-next-practice-meta]").forEach(el=>el.textContent=`${practice.time} to ${practice.end} · ${TEAM.practice.venue}`);
}

function eventCard(event){
  if(!event)return `<div class="hub-empty"><span class="status-dot"></span><div><strong>No public event confirmed</strong><small>The next tournament or demo will appear here once it is locked in.</small></div></div>`;
  const date=event.date||event.startDate||"Date TBA";
  return `<a class="hub-live" href="${event.href||"events.html"}"><span class="hub-kicker">${date}</span><strong>${event.title||"Upcoming event"}</strong><small>${event.location||""}</small></a>`;
}
function resultCard(result){
  if(!result)return `<div class="hub-empty"><span class="status-dot muted-dot"></span><div><strong>No result posted yet</strong><small>Competition results will stay here once entered.</small></div></div>`;
  return `<a class="hub-live" href="${result.href||"events.html"}"><span class="hub-kicker">${result.date||"Latest"}</span><strong>${result.title||result.event||"Latest result"}</strong><small>${result.result||""}</small></a>`;
}
document.querySelectorAll("[data-upcoming-event]").forEach(el=>{el.innerHTML=eventCard((TEAM.upcomingEvents||[])[0])});
document.querySelectorAll("[data-latest-result]").forEach(el=>{el.innerHTML=resultCard((TEAM.results||[])[0])});

const updatesEl=document.querySelector("[data-team-updates]");
if(updatesEl){
  const updates=TEAM.updates||[];
  updatesEl.innerHTML=updates.map(item=>`<a class="news-card" href="${item.href||"#"}"><span>${item.tag||"Update"}</span><h3>${item.title||""}</h3><p>${item.copy||""}</p><b>${item.cta||"Read more"} →</b></a>`).join("");
}

const rosterGrid=document.querySelector("[data-roster-grid]");
if(rosterGrid){
  const roster=TEAM.roster||[];
  if(roster.length){
    rosterGrid.innerHTML=roster.map(member=>`<article class="roster-card">${member.photo?`<img src="${member.photo}" alt="${member.name}" loading="lazy" decoding="async">`:""}<div><span>${member.role||"Team member"}</span><h3>${member.name}</h3>${member.discipline?`<p>${member.discipline}</p>`:""}</div></article>`).join("");
  }else{
    rosterGrid.innerHTML=`<div class="roster-empty"><strong>Roster profiles are next.</strong><p>The team structure is ready for fighter, support, and leadership profiles without another redesign.</p><a href="mailto:${TEAM.contactEmail||"reddeerreavers@gmail.com"}?subject=Reavers%20Roster%20Update">Add roster details →</a></div>`;
  }
}
document.querySelectorAll("[data-roster-count]").forEach(el=>{
  const count=(TEAM.roster||[]).length;
  el.textContent=count?String(count):"Team";
});

const galleryImages=Array.from({length:22},(_,i)=>`assets/gallery/image (${i+1}).jpg`);
const galleryGrid=document.querySelector("[data-gallery-grid]");
const galleryDialog=document.querySelector("[data-gallery-dialog]");
const galleryImage=document.querySelector("[data-gallery-image]");
const galleryCaption=document.querySelector("[data-gallery-caption]");
let galleryIndex=0;
function renderGallery(index){
  if(!galleryDialog||!galleryImage||!galleryCaption)return;
  galleryIndex=(index+galleryImages.length)%galleryImages.length;
  galleryImage.src=galleryImages[galleryIndex];
  galleryImage.alt=`Red Deer Reavers photo ${galleryIndex+1}`;
  galleryCaption.textContent=`${galleryIndex+1} / ${galleryImages.length}`;
}
function openGallery(index){
  renderGallery(index);
  if(galleryDialog&&!galleryDialog.open)galleryDialog.showModal();
}
if(galleryGrid){
  galleryGrid.innerHTML=galleryImages.map((src,index)=>`<button class="gallery-button" type="button" data-gallery-index="${index}" aria-label="Open Reavers photo ${index+1}"><img src="${src}" alt="Red Deer Reavers photo ${index+1}" loading="${index<2?"eager":"lazy"}" decoding="async"></button>`).join("");
  galleryGrid.addEventListener("click",event=>{
    const button=event.target.closest("[data-gallery-index]");
    if(button)openGallery(Number(button.dataset.galleryIndex));
  });
}
document.querySelector("[data-gallery-close]")?.addEventListener("click",()=>galleryDialog?.close());
document.querySelector("[data-gallery-prev]")?.addEventListener("click",()=>renderGallery(galleryIndex-1));
document.querySelector("[data-gallery-next]")?.addEventListener("click",()=>renderGallery(galleryIndex+1));
galleryDialog?.addEventListener("click",event=>{if(event.target===galleryDialog)galleryDialog.close()});
galleryDialog?.addEventListener("keydown",event=>{if(event.key==="ArrowLeft")renderGallery(galleryIndex-1);if(event.key==="ArrowRight")renderGallery(galleryIndex+1)});
let touchX=null;
galleryDialog?.addEventListener("touchstart",event=>{touchX=event.changedTouches[0]?.clientX??null},{passive:true});
galleryDialog?.addEventListener("touchend",event=>{
  if(touchX===null)return;
  const endX=event.changedTouches[0]?.clientX??touchX;
  const delta=endX-touchX;
  if(Math.abs(delta)>55)renderGallery(galleryIndex+(delta<0?1:-1));
  touchX=null;
},{passive:true});

const joinForm=document.querySelector("[data-join-form]");
joinForm?.addEventListener("submit",event=>{
  event.preventDefault();
  const data=new FormData(joinForm);
  const name=String(data.get("name")||"").trim();
  const contact=String(data.get("contact")||"").trim();
  const interest=String(data.get("interest")||"Trying a practice").trim();
  const message=String(data.get("message")||"").trim();
  const subject=encodeURIComponent(`Reavers inquiry from ${name}`);
  const body=encodeURIComponent(`Name: ${name}\nBest contact: ${contact}\nInterested in: ${interest}\n\n${message}`);
  window.location.href=`mailto:${TEAM.contactEmail||"reddeerreavers@gmail.com"}?subject=${subject}&body=${body}`;
});

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}