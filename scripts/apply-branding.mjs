import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const platform = process.argv[2];
function cp(src,dst){ if(!fs.existsSync(src)) return; fs.mkdirSync(path.dirname(dst),{recursive:true}); fs.copyFileSync(src,dst); }
if(platform === 'android'){
  const densities=['mdpi','hdpi','xhdpi','xxhdpi','xxxhdpi'];
  for(const d of densities){
    const src=path.join(root,'branding','android',`mipmap-${d}`,'ic_launcher.png');
    cp(src,path.join(root,'android','app','src','main','res',`mipmap-${d}`,'ic_launcher.png'));
    cp(src,path.join(root,'android','app','src','main','res',`mipmap-${d}`,'ic_launcher_round.png'));
  }
  console.log('✓ Android-Branding angewendet');
}else if(platform === 'ios'){
  const srcDir=path.join(root,'branding','ios','AppIcon.appiconset');
  const dstDir=path.join(root,'ios','App','App','Assets.xcassets','AppIcon.appiconset');
  if(fs.existsSync(srcDir)){
    fs.mkdirSync(dstDir,{recursive:true});
    for(const f of fs.readdirSync(srcDir)) cp(path.join(srcDir,f),path.join(dstDir,f));
  }
  console.log('✓ iOS-Branding angewendet');
}else{
  console.error('Nutzung: node scripts/apply-branding.mjs android|ios'); process.exit(1);
}
