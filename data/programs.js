export const PROGRAMS = {
  "back-in-ppl": {
    id: "back-in-ppl",
    name: "Back In — PPL 45",
    description: "3 core sessions, an optional 4th chest + abs day, and easy cardio that stays out of the way of muscle gain.",
    trainingNote: "Aim for 1–3 reps in reserve on most work sets. Add weight only after you own the top of the rep range with clean form.",
    cardio: "2 easy cardio sessions per week. 20–30 minutes at conversational pace. If you feel fresh, one can simply be an easy 5 km.",
    days: [
      { id:"push", name:"Push", subtitle:"Chest focus", estimatedMinutes:45, warmup:["3–5 min easy cardio","10 arm circles each way","2 light ramp-up sets for first press"], exercises:[
        {exerciseId:"incline-db-press",sets:3,reps:"8–12",rest:90},{exerciseId:"flat-db-press",sets:3,reps:"8–12",rest:90},{exerciseId:"cable-fly",sets:2,reps:"12–15",rest:60},{exerciseId:"db-lateral-raise",sets:3,reps:"12–20",rest:60},{exerciseId:"rope-pushdown",sets:2,reps:"10–15",rest:60},{exerciseId:"cable-crunch",sets:2,reps:"10–15",rest:45}
      ], cooldown:["Doorway chest stretch — 30 sec/side","Lat stretch — 30 sec/side"] },
      { id:"pull", name:"Pull", subtitle:"Back + arms", estimatedMinutes:43, warmup:["3–5 min easy cardio","Band pull-aparts x15","2 light ramp-up sets for first row"], exercises:[
        {exerciseId:"chest-supported-row",sets:3,reps:"8–12",rest:90},{exerciseId:"single-arm-cable-row",sets:3,reps:"10–12",rest:75},{exerciseId:"reverse-fly",sets:3,reps:"12–20",rest:60},{exerciseId:"incline-db-curl",sets:2,reps:"10–15",rest:60},{exerciseId:"hammer-curl",sets:2,reps:"10–15",rest:60}
      ], cooldown:["Upper-back reach — 30 sec","Biceps wall stretch — 30 sec/side"] },
      { id:"legs", name:"Legs", subtitle:"Quads + posterior chain", estimatedMinutes:45, warmup:["4 min easy bike or walk","Bodyweight squat x10","Hip hinge x10","Ankle rocks x10/side"], exercises:[
        {exerciseId:"leg-press",sets:3,reps:"8–12",rest:90},{exerciseId:"romanian-deadlift",sets:3,reps:"8–12",rest:90},{exerciseId:"bulgarian-split-squat",sets:2,reps:"8–12",rest:75},{exerciseId:"seated-leg-curl",sets:2,reps:"10–15",rest:60},{exerciseId:"standing-calf-raise",sets:3,reps:"10–15",rest:60},{exerciseId:"hanging-knee-raise",sets:2,reps:"10–15",rest:45}
      ], cooldown:["Hip-flexor stretch — 30 sec/side","Hamstring stretch — 30 sec/side","Calf stretch — 30 sec/side"] },
      { id:"chest-core", name:"Chest + Core", subtitle:"Optional 4th day", estimatedMinutes:38, optional:true, warmup:["3 min easy cardio","Shoulder circles x10 each way","1–2 light press sets"], exercises:[
        {exerciseId:"incline-db-press",sets:3,reps:"8–12",rest:90},{exerciseId:"flat-db-press",sets:2,reps:"10–12",rest:75},{exerciseId:"cable-fly",sets:3,reps:"12–15",rest:60},{exerciseId:"db-lateral-raise",sets:2,reps:"15–20",rest:60},{exerciseId:"cable-crunch",sets:3,reps:"10–15",rest:45}
      ], cooldown:["Doorway chest stretch — 30 sec/side","Child's pose — 45 sec"] }
    ]
  }
};
export const DEFAULT_PROGRAM_ID = "back-in-ppl";
