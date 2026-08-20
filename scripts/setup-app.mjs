import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const capPath = path.join(root, 'capacitor.config.json');
const runtimePath = path.join(root, 'www', 'runtime-config.js');
const nonInteractive = process.argv.includes('--noninteractive');
const args = process.argv.slice(2).filter(x => x !== '--noninteractive');

let [url, appId, appName] = args;
if (!url && process.env.PURE_WORK_URL) url = process.env.PURE_WORK_URL;
if (!appId && process.env.APP_ID) appId = process.env.APP_ID;
if (!appName && process.env.APP_NAME) appName = process.env.APP_NAME;

if (!nonInteractive && (!url || !appId || !appName)) {
  const rl = readline.createInterface({ input, output });
  url = url || await rl.question('Pure-Work-URL (z. B. https://app.meinedomain.de): ');
  appId = appId || await rl.question('App-ID [de.purework.app]: ') || 'de.purework.app';
  appName = appName || await rl.question('App-Name [Pure Work]: ') || 'Pure Work';
  rl.close();
}

url = String(url || '').trim().replace(/\/$/, '');
appId = String(appId || 'de.purework.app').trim();
appName = String(appName || 'Pure Work').trim();

if (!/^https:\/\//i.test(url)) {
  console.error('FEHLER: Die Live-URL muss mit https:// beginnen.');
  process.exit(1);
}
if (!/^[A-Za-z][A-Za-z0-9]*(\.[A-Za-z0-9_-]+)+$/.test(appId)) {
  console.error('FEHLER: Ungültige App-ID. Beispiel: de.purework.app');
  process.exit(1);
}

const cap = JSON.parse(fs.readFileSync(capPath, 'utf8'));
cap.appId = appId;
cap.appName = appName;
cap.server = { ...(cap.server || {}), url, cleartext: false };
fs.writeFileSync(capPath, JSON.stringify(cap, null, 2) + '\n');
fs.writeFileSync(runtimePath, `window.PURE_WORK_APP = ${JSON.stringify({backendUrl:url, version:'1.0.0'}, null, 2)};\n`);
fs.writeFileSync(path.join(root, '.env.mobile'), `PURE_WORK_URL=${url}\nAPP_ID=${appId}\nAPP_NAME=${appName}\n`);
console.log(`\n✓ Pure Work App konfiguriert`);
console.log(`  URL: ${url}`);
console.log(`  App-ID: ${appId}`);
console.log(`  Name: ${appName}`);
console.log('\nNächste Schritte: npm install → npm run native:add:android / native:add:ios');
