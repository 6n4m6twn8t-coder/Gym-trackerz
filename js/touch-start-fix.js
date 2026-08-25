// iPhone/PWA fallback: ensure workout cards respond even if a normal click is swallowed.
let lastHandled=0;
function activateWorkoutCard(target){
  const card=target?.closest?.("[data-start-day]");
  if(!card)return false;
  const now=Date.now();
  if(now-lastHandled<500)return true;
  lastHandled=now;
  if(typeof card.onclick==="function"){
    card.onclick();
    return true;
  }
  // If the card was just rendered and app.js has not attached onclick yet,
  // retry once on the next task.
  setTimeout(()=>{if(typeof card.onclick==="function")card.onclick()},0);
  return true;
}

document.addEventListener("pointerup",event=>{
  activateWorkoutCard(event.target);
},true);

document.addEventListener("touchend",event=>{
  activateWorkoutCard(event.target);
},{capture:true,passive:true});
