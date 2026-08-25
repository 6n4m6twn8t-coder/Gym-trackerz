async function boot(){
  // Boot the core app first so navigation and workout controls are never blocked
  // by a service-worker update or an optional enhancer.
  try{
    await import("./app.js?v=9");
  }catch(error){
    console.error("Gym Tracker core failed to load",error);
    return;
  }

  // Optional enhancements should never be able to stop the core tracker.
  Promise.allSettled([
    import("./session-timer.js?v=2"),
    import("./anatomy-enhancer.js?v=2")
  ]).then(results=>{
    results.forEach(result=>{
      if(result.status==="rejected") console.warn("Optional enhancement skipped",result.reason);
    });
  });

  // Refresh the offline cache in the background only. Never wait for a new
  // worker to activate, because iOS can keep it in a waiting state while the
  // current page is still open.
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./service-worker.js",{updateViaCache:"none"})
      .then(registration=>registration.update().catch(()=>{}))
      .catch(error=>console.warn("Service worker refresh skipped",error));
  }
}

boot();