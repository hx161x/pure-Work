import fs from 'node:fs';
const cap = JSON.parse(fs.readFileSync(new URL('../capacitor.config.json', import.meta.url), 'utf8'));
const problems = [];
if (!cap.server?.url || /YOUR-PURE-WORK-DOMAIN/i.test(cap.server.url)) problems.push('Pure-Work-URL ist noch nicht gesetzt.');
if (cap.server?.url && !/^https:\/\//i.test(cap.server.url)) problems.push('Pure-Work-URL verwendet kein HTTPS.');
if (!cap.appId || !cap.appId.includes('.')) problems.push('App-ID ist ungültig.');
if (!fs.existsSync(new URL('../resources/icon.png', import.meta.url))) problems.push('App-Icon fehlt.');
if (problems.length) {
  console.error('Pure Work App Doctor:');
  for (const p of problems) console.error('✗ ' + p);
  process.exit(1);
}
console.log('✓ Konfiguration plausibel');
console.log('✓ HTTPS-URL gesetzt');
console.log('✓ App-ID gesetzt');
console.log('✓ Branding vorhanden');
console.log('\nHinweis: Store-Signierung, Push-Zertifikate und echte Geräteprüfung benötigen deine Apple/Google-Zugangsdaten.');
