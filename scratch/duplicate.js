import fs from 'fs';
import path from 'path';

const baseDirs = ['public/audio', 'public/pdfs'];

for (const baseDir of baseDirs) {
  if (!fs.existsSync(baseDir)) continue;
  
  for (let i = 1; i <= 16; i++) {
    const src = path.join(baseDir, `cantec-${i}`);
    const dest = path.join(baseDir, `cantec-${i}a`);
    
    if (fs.existsSync(src)) {
      if (!fs.existsSync(dest)) {
        fs.cpSync(src, dest, { recursive: true });
        console.log(`Copied ${src} to ${dest}`);
      } else {
        console.log(`${dest} already exists, skipping.`);
      }
    } else {
      console.log(`${src} does not exist, skipping.`);
    }
  }
}
