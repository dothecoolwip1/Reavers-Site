document.querySelectorAll("[data-year]").forEach(el=>{el.textContent=String(new Date().getFullYear())});

function edmontonNow(){
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Edmonton",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).formatToParts(new Date());
  const map=Object.fromEntries(parts.map(p=>[p.type,p.value]));
  return new Date(Number(map.year),Number(map.month)-1,Number(map.day),Number(map.hour),Number(map.minute),Number(map.second));
}
function nextPractice(){
  const now=edmontonNow();
  const sessions=[
    {day:3,hour:17,minute:30,name:"Wednesday practice",time:"5:30 PM"},
    {day:0,hour:17,minute:0,name:"Sunday practice",time:"5:00 PM"}
  ];
  let best=null;
  for(const session of sessions){
    const d=new Date(now);
    let delta=(session.day-now.getDay()+7)%7;
    d.setDate(now.getDate()+delta);
    d.setHours(session.hour,session.minute,0,0);
    if(d<=now){d.setDate(d.getDate()+7)}
    if(!best||d<best.date)best={...session,date:d};
  }
  return best;
}
const practice=nextPractice();
if(practice){
  const dateText=new Intl.DateTimeFormat("en-CA",{month:"short",day:"numeric"}).format(practice.date).toUpperCase();
  document.querySelectorAll("[data-next-practice-date]").forEach(el=>el.textContent=dateText);
  document.querySelectorAll("[data-next-practice-title]").forEach(el=>el.textContent=practice.name);
  document.querySelectorAll("[data-next-practice-meta]").forEach(el=>el.textContent=`${practice.time} · Springbrook Archery Centre`);
}

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
  galleryGrid.innerHTML=galleryImages.map((src,index)=>`<button class="gallery-button" type="button" data-gallery-index="${index}" aria-label="Open Reavers photo ${index+1}"><img src="${src}" alt="Red Deer Reavers photo ${index+1}" loading="${index<4?"eager":"lazy"}" decoding="async"></button>`).join("");
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
  window.location.href=`mailto:reddeerreavers@gmail.com?subject=${subject}&body=${body}`;
});

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}