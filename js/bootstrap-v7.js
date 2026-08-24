async function waitForActivation(worker){
  if(!worker || worker.state === "activated") return;
  await new Promise(resolve=>{
    const done=()=>{if(worker.state === "activated" || worker.state === "redundant"){worker.removeEventListener("statechange",done);resolve();}};
    worker.addEventListener("statechange",done);
    done();
  });
}

async function boot(){
  if("serviceWorker" in navigator){
    try{
      const registration=await navigator.serviceWorker.register("./service-worker.js",{updateViaCache:"none"});
      await registration.update();
      if(registration.installing) await waitForActivation(registration.installing);
      if(registration.waiting) await waitForActivation(registration.waiting);
      await navigator.serviceWorker.ready;
    }catch(error){
      console.warn("Service worker refresh skipped",error);
    }
  }
  await import("./app.js?v=7");
}

boot();
