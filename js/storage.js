const STORAGE_KEY = "gymTracker:v1";
const emptyState = () => ({ activeProgramId:"back-in-ppl", drafts:{}, history:[] });
export function loadState(){try{const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));return parsed?{...emptyState(),...parsed}:emptyState()}catch{return emptyState()}}
export function saveState(state){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
export function getDraft(state,dayId){return state.drafts[dayId]||{}}
export function updateDraft(state,dayId,exerciseId,setIndex,patch){const next=structuredClone(state);next.drafts[dayId]||={};next.drafts[dayId][exerciseId]||=[];next.drafts[dayId][exerciseId][setIndex]={weight:"",reps:"",done:false,...(next.drafts[dayId][exerciseId][setIndex]||{}),...patch};saveState(next);return next}
export function getLastPerformance(state,exerciseId,setIndex){for(let i=state.history.length-1;i>=0;i--){const entry=state.history[i]?.sets?.[exerciseId]?.[setIndex];if(entry&&(entry.weight||entry.reps))return entry}return null}
export function completeSession(state,day,programId){const next=structuredClone(state);const draft=next.drafts[day.id]||{};const completedSets=Object.values(draft).flat().filter(Boolean).filter(s=>s.done);const volume=completedSets.reduce((sum,s)=>sum+(Number(s.weight)||0)*(Number(s.reps)||0),0);next.history.push({id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${day.id}`,date:new Date().toISOString(),programId,dayId:day.id,dayName:day.name,sets:draft,completedSets:completedSets.length,volume:Math.round(volume)});delete next.drafts[day.id];saveState(next);return next}
