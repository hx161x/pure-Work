(function(){
  const C = window.Capacitor;
  if(!C || !(C.isNativePlatform && C.isNativePlatform())) return;
  document.documentElement.classList.add('pw-native-app');
  const P = C.Plugins || {};
  const cfg = window.PW_MOBILE_BRIDGE || {};

  async function api(method, data){
    if(!cfg.restUrl) return;
    try{
      await fetch(cfg.restUrl, {
        method,
        credentials:'same-origin',
        headers:{'Content-Type':'application/json','X-WP-Nonce':cfg.nonce || ''},
        body: data ? JSON.stringify(data) : undefined
      });
    }catch(e){}
  }

  try{
    if(P.StatusBar?.setStyle) P.StatusBar.setStyle({style:'LIGHT'});
  }catch(e){}

  try{
    if(P.App?.addListener){
      P.App.addListener('appUrlOpen', function(event){
        const u = String(event?.url || '');
        if(!u.startsWith('purework://')) return;
        const path = u.replace(/^purework:\/\//,'').replace(/^\/+/, '');
        if(cfg.homeUrl) location.href = cfg.homeUrl.replace(/\/$/,'/') + path;
      });
    }
  }catch(e){}

  try{
    if(P.PushNotifications){
      P.PushNotifications.requestPermissions().then(function(r){
        if(r.receive === 'granted') return P.PushNotifications.register();
      });
      P.PushNotifications.addListener('registration', function(token){
        api('POST', { token: token.value, platform: C.getPlatform ? C.getPlatform() : 'unknown' });
      });
      P.PushNotifications.addListener('pushNotificationActionPerformed', function(action){
        const path = action?.notification?.data?.path;
        if(path && cfg.homeUrl) location.href = cfg.homeUrl.replace(/\/$/,'/') + String(path).replace(/^\//,'');
      });
    }
  }catch(e){}

  document.addEventListener('click', function(e){
    const target=e.target && e.target.closest && e.target.closest('button,.pw-btn,.button,a.pw-btn');
    if(!target) return;
    try{ P.Haptics?.impact?.({style:'LIGHT'}); }catch(err){}
  }, {passive:true});
})();
