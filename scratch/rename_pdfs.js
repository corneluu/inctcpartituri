import fs from 'fs';
import path from 'path';

const songs = [
  { id: 'cantec-1', title: "All'agnello gloria" },
  { id: 'cantec-2', title: 'Anima Christi' },
  { id: 'cantec-3', title: 'Cine ne va desparti' },
  { id: 'cantec-4', title: 'Christ is my hope' },
  { id: 'cantec-5', title: 'Cristo sorgente' },
  { id: 'cantec-6', title: "Forte come la morte è l'amore" },
  { id: 'cantec-7', title: 'Il canto del mare' },
  { id: 'cantec-8', title: 'Jesus Christ, you are my life' },
  { id: 'cantec-9', title: 'La pace verrà' },
  { id: 'cantec-10', title: 'La vera gioia' },
  { id: 'cantec-11', title: 'Pacem in terris' },
  { id: 'cantec-12', title: 'Saldo è il mio cuore' },
  { id: 'cantec-13', title: 'Ti amo, Signore' },
  { id: 'cantec-14', title: "Verso l'alto" },
  { id: 'cantec-15', title: 'Cântec 15' },
  { id: 'cantec-16', title: 'Cântec 16' },
  { id: 'cantec-17', title: 'Cântec 17' },
  { id: 'cantec-18', title: 'Cântec 18' },
  { id: 'cantec-19', title: 'Cântec 19' },
  { id: 'cantec-20', title: 'Cântec 20' }
];

const pdfsDir = 'd:/site-apps/inctcpartituri/public/pdfs';

songs.forEach(song => {
  const folderPath = path.join(pdfsDir, song.id);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
      if (file.endsWith('.pdf') && file !== `${song.title}.pdf`) {
        const oldPath = path.join(folderPath, file);
        const newPath = path.join(folderPath, `${song.title}.pdf`);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldPath} -> ${newPath}`);
      }
    });
  }
});
