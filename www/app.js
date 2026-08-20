(function(){
  const cfg = window.PURE_WORK_APP || {};
  const url = String(cfg.backendUrl || '').replace(/\/$/, '');
  const status = document.getElementById('status');
  const button = document.getElementById('openApp');
  function valid(){ return /^https:\/\//i.test(url) && !/YOUR-PURE-WORK-DOMAIN/i.test(url); }
  function open(){ if(!valid()){ status.textContent='Bitte zuerst die Pure-Work-URL im Setup hinterlegen.'; return; } window.location.replace(url); }
  button.addEventListener('click', open);
  if(valid()){
    status.textContent='Bereit · sichere HTTPS-Verbindung';
    setTimeout(open, 550);
  } else {
    status.textContent='Noch nicht konfiguriert';
  }
})();
