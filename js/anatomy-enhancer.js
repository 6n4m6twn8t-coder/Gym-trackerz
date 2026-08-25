import { EXERCISES } from "../data/exercises.js";

const META={
"incline-db-press":{primary:"Upper chest",secondary:["Front delts","Triceps"],supporting:["Serratus","Core"],view:"front",zones:["upperChest"],feel:"Mostly front delts? Lower the bench angle, keep shoulder blades back/down, and let the elbows travel slightly below the torso."},
"flat-db-press":{primary:"Chest (pecs)",secondary:["Front delts","Triceps"],supporting:["Serratus","Core"],view:"front",zones:["chest"],feel:"Mostly shoulders? Keep the shoulder blades pinned back, elbows slightly tucked, and lower the dumbbells toward mid-chest."},
"cable-fly":{primary:"Chest (pecs)",secondary:["Front delts"],supporting:["Biceps","Core"],view:"front",zones:["chest"],feel:"Mostly shoulders or arms? Use less weight, keep a soft elbow bend, and think about bringing the upper arms together rather than the hands."},
"db-lateral-raise":{primary:"Lateral deltoid",secondary:["Supraspinatus"],supporting:["Upper traps","Core"],view:"front",zones:["sideDelts"],feel:"Mostly traps? Use less weight, keep shoulders down, lead with the elbows, and stop around shoulder height."},
"rope-pushdown":{primary:"Triceps",secondary:["Anconeus"],supporting:["Forearms","Core"],view:"back",zones:["triceps"],feel:"Mostly shoulders? Pin your elbows to your sides and move only at the elbow joint."},
"cable-crunch":{primary:"Rectus abdominis",secondary:["Obliques"],supporting:["Hip flexors"],view:"front",zones:["abs"],feel:"Mostly hips? Keep the hips nearly fixed and curl the ribcage toward the pelvis instead of sitting back."},
"chest-supported-row":{primary:"Mid back",secondary:["Lats","Rear delts","Biceps"],supporting:["Forearms"],view:"back",zones:["midBack"],feel:"Mostly arms? Keep the chest planted, initiate by drawing the shoulder blades back, then drive elbows toward the hips."},
"single-arm-cable-row":{primary:"Lats",secondary:["Rhomboids","Rear delts","Biceps"],supporting:["Forearms","Core"],view:"back",zones:["lats"],feel:"Mostly biceps? Reach into a controlled stretch, keep the shoulder down, then pull the elbow toward your back pocket."},
"reverse-fly":{primary:"Rear deltoids",secondary:["Rhomboids","Mid traps"],supporting:["Rotator cuff"],view:"back",zones:["rearDelts"],feel:"Mostly traps? Drop the shoulders, lighten the load and move the upper arms outward without shrugging."},
"incline-db-curl":{primary:"Biceps",secondary:["Brachialis"],supporting:["Forearms"],view:"front",zones:["biceps"],feel:"Mostly front shoulder? Keep the upper arm hanging behind the torso and do not let the elbow drift forward."},
"hammer-curl":{primary:"Brachialis + brachioradialis",secondary:["Biceps"],supporting:["Forearms"],view:"front",zones:["biceps","forearms"],feel:"Mostly shoulders? Keep elbows fixed beside the ribs and avoid swinging the dumbbells."},
"leg-press":{primary:"Quadriceps",secondary:["Glutes"],supporting:["Adductors","Hamstrings"],view:"front",zones:["quads"],feel:"Mostly hips or lower back? Keep the pelvis against the pad, use a comfortable depth and drive through the whole foot."},
"romanian-deadlift":{primary:"Hamstrings",secondary:["Glutes"],supporting:["Spinal erectors","Lats","Core"],view:"back",zones:["hamstrings","glutes"],feel:"Mostly lower back? Reduce the load, brace hard, push the hips back and stop once the hamstrings are fully loaded."},
"bulgarian-split-squat":{primary:"Quadriceps + glutes",secondary:["Adductors"],supporting:["Hamstrings","Calves","Core"],view:"front",zones:["quads","glutes"],feel:"Mostly back leg? Shorten or adjust your stance and keep most of your pressure through the front foot."},
"seated-leg-curl":{primary:"Hamstrings",secondary:["Calves"],supporting:["Glutes"],view:"back",zones:["hamstrings"],feel:"Mostly calves? Point the toes naturally, keep the hips pinned down and focus on pulling with the back of the thighs."},
"standing-calf-raise":{primary:"Calves",secondary:["Soleus"],supporting:["Foot/ankle stabilisers"],view:"back",zones:["calves"],feel:"Mostly feet? Use a controlled full range and rise through the ball of the foot without rolling the ankles."},
"hanging-knee-raise":{primary:"Abs",secondary:["Hip flexors"],supporting:["Obliques","Grip"],view:"front",zones:["abs"],feel:"Mostly hip flexors? Curl the pelvis upward at the top instead of only lifting the knees."}
};

const COLORS={primary:"#ef5a4c",secondary:"#e6b94f",supporting:"#438ee8"};

function anatomySvg(meta,compact=false){
 const back=meta.view==="back";
 const z=new Set(meta.zones||[]);
 const fill=(name)=>z.has(name)?COLORS.primary:"#4b5058";
 return `<svg viewBox="0 0 120 170" aria-label="${meta.primary} anatomical target" style="width:${compact?72:112}px;height:${compact?102:158}px;display:block">
 <defs><linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d7d9dc"/><stop offset="1" stop-color="#777d86"/></linearGradient></defs>
 <circle cx="60" cy="18" r="12" fill="url(#body)" stroke="#30343a"/>
 <path d="M43 31 Q60 25 77 31 L84 76 Q78 94 70 100 L69 119 H51 L50 100 Q42 94 36 76Z" fill="url(#body)" stroke="#30343a"/>
 <path d="M42 35 Q27 42 21 63 L14 97 Q13 103 19 105 Q24 106 27 99 L34 70 Q38 58 46 52Z" fill="url(#body)" stroke="#30343a"/>
 <path d="M78 35 Q93 42 99 63 L106 97 Q107 103 101 105 Q96 106 93 99 L86 70 Q82 58 74 52Z" fill="url(#body)" stroke="#30343a"/>
 <path d="M51 117 L43 156 Q42 166 50 166 Q56 166 58 158 L62 126Z" fill="url(#body)" stroke="#30343a"/>
 <path d="M69 117 L77 156 Q78 166 70 166 Q64 166 62 158 L58 126Z" fill="url(#body)" stroke="#30343a"/>
 ${!back?`<path d="M44 40 Q51 34 59 38 L58 61 Q49 62 42 55Z" fill="${z.has("upperChest")||z.has("chest")?COLORS.primary:"#8b9097"}"/><path d="M76 40 Q69 34 61 38 L62 61 Q71 62 78 55Z" fill="${z.has("upperChest")||z.has("chest")?COLORS.primary:"#8b9097"}"/>
 <ellipse cx="38" cy="48" rx="7" ry="12" fill="${fill("sideDelts")}"/><ellipse cx="82" cy="48" rx="7" ry="12" fill="${fill("sideDelts")}"/>
 <path d="M52 63 H68 L67 92 Q60 97 53 92Z" fill="${fill("abs")}" opacity=".95"/><path d="M26 56 L33 60 L27 86 L20 83Z" fill="${fill("biceps")}"/><path d="M94 56 L87 60 L93 86 L100 83Z" fill="${fill("biceps")}"/><path d="M18 84 L27 87 L23 101 L16 98Z" fill="${fill("forearms")}"/><path d="M102 84 L93 87 L97 101 L104 98Z" fill="${fill("forearms")}"/><path d="M49 119 L59 120 L55 154 L45 153Z" fill="${fill("quads")}"/><path d="M71 119 L61 120 L65 154 L75 153Z" fill="${fill("quads")}"/>`:`<path d="M44 40 Q60 31 76 40 L73 72 Q60 80 47 72Z" fill="${fill("midBack")}"/><path d="M45 45 Q36 53 35 76 L43 83 Q49 67 53 49Z" fill="${fill("lats")}"/><path d="M75 45 Q84 53 85 76 L77 83 Q71 67 67 49Z" fill="${fill("lats")}"/><ellipse cx="39" cy="48" rx="8" ry="10" fill="${fill("rearDelts")}"/><ellipse cx="81" cy="48" rx="8" ry="10" fill="${fill("rearDelts")}"/><path d="M26 57 L34 60 L29 87 L21 84Z" fill="${fill("triceps")}"/><path d="M94 57 L86 60 L91 87 L99 84Z" fill="${fill("triceps")}"/><ellipse cx="53" cy="110" rx="10" ry="10" fill="${fill("glutes")}"/><ellipse cx="67" cy="110" rx="10" ry="10" fill="${fill("glutes")}"/><path d="M48 121 L58 122 L55 155 L45 154Z" fill="${fill("hamstrings")}"/><path d="M72 121 L62 122 L65 155 L75 154Z" fill="${fill("hamstrings")}"/><path d="M45 150 L55 151 L53 165 L46 165Z" fill="${fill("calves")}"/><path d="M75 150 L65 151 L67 165 L74 165Z" fill="${fill("calves")}"/>`}
 </svg>`;
}

function targetLine(meta){return `<div class="an-target"><strong>${meta.primary}</strong><span>${meta.secondary.join(" · ")}</span></div>`}

function injectStyles(){if(document.querySelector("#anatomyStyles"))return;const s=document.createElement("style");s.id="anatomyStyles";s.textContent=`
.an-thumb{width:82px;min-width:82px;height:106px;border-radius:14px;background:linear-gradient(145deg,#1a1e24,#101216);display:grid;place-items:center;border:1px solid #30343a;overflow:hidden}.exercise-head{align-items:center}.exercise-head>.exercise-thumb{display:none}.an-target{margin-top:3px;display:flex;flex-direction:column;gap:2px}.an-target strong{font-size:13px;color:${COLORS.primary}}.an-target span{font-size:12px;color:#aeb4bd}.an-detail{display:grid;gap:12px}.an-panel{border:1px solid #30343a;background:#15181d;border-radius:16px;padding:14px}.an-panel h3{margin:0 0 8px}.an-muscle-row{display:flex;gap:14px;align-items:center}.an-chip{display:flex;align-items:center;gap:7px;margin:5px 0;color:#d8dbe0}.an-dot{width:10px;height:10px;border-radius:50%;display:inline-block}.an-demo{border-radius:16px;overflow:hidden;border:1px solid #30343a;background:#101216}.an-demo img{width:100%;display:block}.an-feel{border-left:3px solid ${COLORS.secondary};padding-left:11px;color:#c9ced6}.exercise-dialog{max-width:min(680px,94vw)}
`;document.head.appendChild(s)}

function enhanceCards(root=document){root.querySelectorAll(".exercise-card").forEach(card=>{if(card.dataset.anatomyDone)return;const btn=card.querySelector("[data-demo]");if(!btn)return;const meta=META[btn.dataset.demo];if(!meta)return;const head=card.querySelector(".exercise-head");const info=card.querySelector(".exercise-info");if(!head||!info)return;const thumb=document.createElement("div");thumb.className="an-thumb";thumb.innerHTML=anatomySvg(meta,true);head.insertBefore(thumb,info);info.insertAdjacentHTML("beforeend",targetLine(meta));card.dataset.anatomyDone="1"})}

function richExercise(id){const ex=EXERCISES[id],meta=META[id];if(!ex||!meta)return;const demo=ex.demoAnimation||ex.animation;const sec=meta.secondary.map(x=>`<div class="an-chip"><span class="an-dot" style="background:${COLORS.secondary}"></span>${x}</div>`).join("");const sup=meta.supporting.map(x=>`<div class="an-chip"><span class="an-dot" style="background:${COLORS.supporting}"></span>${x}</div>`).join("");dialogBody.innerHTML=`<div class="an-detail"><p class="eyebrow">EXERCISE DEMO</p><h2>${ex.name}</h2><div class="an-demo"><img src="${demo}" alt="Movement guide for ${ex.name}"/></div><div class="an-panel an-muscle-row">${anatomySvg(meta,false)}<div><p class="eyebrow">TARGET</p><h3 style="color:${COLORS.primary}">${meta.primary}</h3><div style="margin-top:8px"><strong>Also working</strong>${sec}${sup}</div></div></div><div class="an-panel"><p class="eyebrow">EQUIPMENT</p><h3>${ex.equipment}</h3></div><div class="an-panel"><p class="eyebrow">FORM CUES</p><ul class="cue-list">${ex.cues.map(c=>`<li>${c}</li>`).join("")}</ul></div><div class="an-panel"><p class="eyebrow">FEELING IT SOMEWHERE ELSE?</p><div class="an-feel">${meta.feel}</div></div></div>`}
}

injectStyles();
enhanceCards();
const dialog=document.querySelector("#exerciseDialog"),dialogBody=document.querySelector("#exerciseDialogBody");
document.addEventListener("click",e=>{const b=e.target.closest?.("[data-demo]");if(!b)return;const id=b.dataset.demo;if(!META[id])return;setTimeout(()=>richExercise(id),0)},true);
const obs=new MutationObserver(()=>enhanceCards());const app=document.querySelector("#app");if(app)obs.observe(app,{childList:true,subtree:true});
