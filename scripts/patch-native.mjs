import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const platform=process.argv[2];
const cap=JSON.parse(fs.readFileSync(path.join(root,'capacitor.config.json'),'utf8'));
let host=''; try{host=new URL(cap.server.url).hostname}catch{}
if(platform==='android'){
  const p=path.join(root,'android','app','src','main','AndroidManifest.xml');
  if(fs.existsSync(p)){
    let s=fs.readFileSync(p,'utf8');
    if(!s.includes('android:scheme="purework"')){
      const filter=`\n            <intent-filter>\n                <action android:name="android.intent.action.VIEW" />\n                <category android:name="android.intent.category.DEFAULT" />\n                <category android:name="android.intent.category.BROWSABLE" />\n                <data android:scheme="purework" />\n            </intent-filter>`;
      s=s.replace(/(<\/activity>)/, filter+'\n        $1');
      fs.writeFileSync(p,s);
    }
  }
  console.log('✓ Android URL-Scheme purework:// vorbereitet');
}else if(platform==='ios'){
  const p=path.join(root,'ios','App','App','Info.plist');
  if(fs.existsSync(p)){
    let s=fs.readFileSync(p,'utf8');
    if(!s.includes('<string>purework</string>')){
      const block=`\n\t<key>CFBundleURLTypes</key>\n\t<array>\n\t\t<dict>\n\t\t\t<key>CFBundleURLSchemes</key>\n\t\t\t<array><string>purework</string></array>\n\t\t</dict>\n\t</array>\n`;
      s=s.replace('</dict>\n</plist>', block+'</dict>\n</plist>');
      fs.writeFileSync(p,s);
    }
  }
  console.log('✓ iOS URL-Scheme purework:// vorbereitet');
}else{ console.error('Nutzung: node scripts/patch-native.mjs android|ios'); process.exit(1); }
if(host) console.log(`  Backend: ${host}`);
