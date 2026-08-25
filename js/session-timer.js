const ACTIVE_SESSION_KEY="gymTracker:activeSession:v1";
const APP_STATE_KEY="gymTracker:v1";
const MAX_RESUME_MS=6*60*60*1000;
let tickInterval=null;

function readActive(){
  try{return JSON.parse(localStorage.getItem(ACTIVE_SESSION_KEY))||null}catch{return null}
}
function writeActive(dayId){
  const current=readActive();
  const now=Date.now();
  if(current?.dayId===dayId && current.startedAt && now-current.startedAt<MAX_RESUME_MS)return current;
  const next={dayId,startedAt:now};
  localStorage.setItem(ACTIVE_SESSION_KEY,JSON.stringify(next));
  return next;
}
function clearActive(){localStorage.removeItem(ACTIVE_SESSION_KEY)}
function formatElapsed(ms){
  const total=Math.max(0,Math.floor(ms/1000));
  const h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60;
  return h?`${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
function ensureTimer(){
  const title=document.querySelector(".workout-title");
  if(!title)return;
  let active=readActive();
  if(!active?.startedAt){
    active={dayId:"workout",startedAt:Date.now()};
    localStorage.setItem(ACTIVE_SESSION_KEY,JSON.stringify(active));
  }
  if(!document.querySelector("#sessionElapsed")){
    const el=document.createElement("div");
    el.id="sessionElapsed";
    el.style.cssText="display:inline-flex;align-items:center;gap:8px;margin-top:10px;padding:7px 11px;border:1px solid #343840;border-radius:999px;background:#17191d;font-size:13px";
    el.innerHTML='<span class="eyebrow" style="margin:0">SESSION</span><strong data-session-elapsed style="font-variant-numeric:tabular-nums">00:00</strong>';
    const meta=title.querySelector(".meta");
    (meta||title).insertAdjacentElement("afterend",el);
  }
  updateTimer();
  if(!tickInterval)tickInterval=setInterval(updateTimer,1000);
}
function updateTimer(){
  const out=document.querySelector("[data-session-elapsed]");
  if(!out)return;
  const active=readActive();
  if(active?.startedAt)out.textContent=formatElapsed(Date.now()-active.startedAt);
}
function patchFinishedDuration(startedAt){
  try{
    const state=JSON.parse(localStorage.getItem(APP_STATE_KEY));
    if(!state?.history?.length)return false;
    const last=state.history[state.history.length-1];
    last.durationSeconds=Math.max(0,Math.round((Date.now()-startedAt)/1000));
    localStorage.setItem(APP_STATE_KEY,JSON.stringify(state));
    return true;
  }catch{return false}
}

document.addEventListener("click",event=>{
  const start=event.target.closest?.("[data-start-day]");
  if(start){writeActive(start.dataset.startDay);setTimeout(ensureTimer,0);return}
  const finish=event.target.closest?.("[data-finish]");
  if(finish){
    const active=readActive();
    setTimeout(()=>{
      if(document.querySelector(".workout-title"))return;
      if(active?.startedAt)patchFinishedDuration(active.startedAt);
      clearActive();
      location.reload();
    },80);
  }
},true);

const observer=new MutationObserver(()=>{
  if(document.querySelector(".workout-title"))ensureTimer();
  else if(tickInterval){clearInterval(tickInterval);tickInterval=null}
});
const app=document.querySelector("#app");
if(app)observer.observe(app,{childList:true,subtree:true});
