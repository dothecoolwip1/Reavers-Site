const navToggle=document.querySelector("[data-nav-toggle]");const nav=document.querySelector("[data-nav]");if(navToggle&&nav){navToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");navToggle.setAttribute("aria-expanded",String(open))});nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");navToggle.setAttribute("aria-expanded","false")}))}document.querySelectorAll("[data-year]").forEach(el=>el.textContent=String(new Date().getFullYear()));

const galleryImages=Array.from({length:22},(_,i)=>`assets/gallery/image (${i+1}).jpg`);
const galleryGrid=document.querySelector("[data-gallery-grid]");
const galleryDialog=document.querySelector("[data-gallery-dialog]");
const galleryImage=document.querySelector("[data-gallery-image]");
const galleryCaption=document.querySelector("[data-gallery-caption]");
let galleryIndex=0;

function showGallery(index){if(!galleryDialog||!galleryImage||!galleryCaption)return;galleryIndex=(index+galleryImages.length)%galleryImages.length;galleryImage.src=galleryImages[galleryIndex];galleryImage.alt=`Red Deer Reavers photo ${galleryIndex+1}`;galleryCaption.textContent=`Photo ${galleryIndex+1} of ${galleryImages.length}`;if(!galleryDialog.open)galleryDialog.showModal()}
if(galleryGrid){galleryGrid.innerHTML=galleryImages.map((src,index)=>`<button class="gallery-button" type="button" data-gallery-index="${index}" aria-label="Open Reavers photo ${index+1}"><img src="${src}" alt="Red Deer Reavers photo ${index+1}" loading="${index<4?"eager":"lazy"}"></button>`).join("");galleryGrid.addEventListener("click",event=>{const button=event.target.closest("[data-gallery-index]");if(button)showGallery(Number(button.dataset.galleryIndex))})}
document.querySelector("[data-gallery-close]")?.addEventListener("click",()=>galleryDialog?.close());
document.querySelector("[data-gallery-prev]")?.addEventListener("click",()=>showGallery(galleryIndex-1));
document.querySelector("[data-gallery-next]")?.addEventListener("click",()=>showGallery(galleryIndex+1));
galleryDialog?.addEventListener("click",event=>{if(event.target===galleryDialog)galleryDialog.close()});
galleryDialog?.addEventListener("keydown",event=>{if(event.key==="ArrowLeft")showGallery(galleryIndex-1);if(event.key==="ArrowRight")showGallery(galleryIndex+1)});

const joinForm=document.querySelector("[data-join-form]");
joinForm?.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(joinForm);const name=String(data.get("name")||"").trim();const contact=String(data.get("contact")||"").trim();const interest=String(data.get("interest")||"Trying a practice").trim();const message=String(data.get("message")||"").trim();const subject=encodeURIComponent(`Reavers inquiry from ${name}`);const body=encodeURIComponent(`Name: ${name}\nBest contact: ${contact}\nInterested in: ${interest}\n\n${message}`);window.location.href=`mailto:reddeerreavers@gmail.com?subject=${subject}&body=${body}`});

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}