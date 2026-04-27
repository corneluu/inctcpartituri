import fs from 'fs';
import path from 'path';

const songsFile = fs.readFileSync('src/songs.ts', 'utf8');

const regex = /{ id: '([^']+)', title: '([^']+)', [^}]+youtubeUrl: '([^']*)'|{ id: '([^']+)', title: '([^']+)'/g;

// Since it's a bit hard to regex perfectly, let's just use eval on the array string
const arrayMatch = songsFile.match(/export const songs: Song\[\] = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.log("Could not parse songs array.");
  process.exit(1);
}

// remove type annotations or replace them to make it valid JS
let arrayStr = arrayMatch[1];
// Eval can handle simple object literals
const songs = eval(`(${arrayStr})`);

const missingList = [];

for (const song of songs) {
  const id = song.id;
  const title = song.title;
  const missing = [];
  
  // check audios
  const voices = ['sopran', 'alto', 'tenor', 'bas'];
  for (const v of voices) {
    if (!fs.existsSync(`public/audio/${id}/${v}.mp3`)) {
      missing.push(`lipsa audio ${v}.mp3`);
    }
  }
  
  // check pdf
  if (!fs.existsSync(`public/pdfs/${id}/partitura.pdf`)) {
    missing.push("lipsa pdf (partitura.pdf)");
  }
  
  // check youtube
  if (!song.youtubeUrl || song.youtubeUrl.trim() === '') {
    missing.push("lipsa link youtube");
  }
  
  if (missing.length > 0) {
    missingList.push(`- **${title}** (${id}):\n  - ${missing.join('\n  - ')}`);
  }
}

console.log(missingList.join('\n\n'));
