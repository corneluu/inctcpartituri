
import fs from 'fs';
import path from 'path';

const baseDir = 'd:/site-apps/inctcpartituri/public';
const pdfsDir = path.join(baseDir, 'pdfs');
const audioDir = path.join(baseDir, 'audio');

function renameFolders(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const match = item.match(/^(\d+)\s+(.+)$/);
        if (match) {
            const num = match[1];
            const oldPath = path.join(dir, item);
            const newPath = path.join(dir, `cantec-${num}`);
            if (fs.existsSync(newPath) && oldPath !== newPath) {
                // If it already exists, maybe merge?
                console.log(`Warning: ${newPath} already exists. Merging contents from ${oldPath}`);
                const subItems = fs.readdirSync(oldPath);
                subItems.forEach(si => {
                    const src = path.join(oldPath, si);
                    const dest = path.join(newPath, si);
                    if (!fs.existsSync(dest)) {
                        fs.renameSync(src, dest);
                    }
                });
                // Remove old empty dir
                // fs.rmdirSync(oldPath);
            } else {
                fs.renameSync(oldPath, newPath);
            }
        }
    });
}

function renameAudioFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const folders = fs.readdirSync(dir);
    folders.forEach(folder => {
        const folderPath = path.join(dir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath);
            files.forEach(file => {
                let newName = null;
                const lower = file.toLowerCase();
                if (lower === 'soprani.mp3') newName = 'sopran.mp3';
                else if (lower === 'contralti.mp3') newName = 'alto.mp3';
                else if (lower === 'tenori.mp3') newName = 'tenor.mp3';
                else if (lower === 'bassi.mp3') newName = 'bas.mp3';
                else if (lower === 'bass.mp3') newName = 'bas.mp3';

                if (newName) {
                    const oldPath = path.join(folderPath, file);
                    const newPath = path.join(folderPath, newName);
                    if (!fs.existsSync(newPath)) {
                        fs.renameSync(oldPath, newPath);
                        console.log(`Renamed ${oldPath} to ${newPath}`);
                    } else if (oldPath !== newPath) {
                        console.log(`Skipping rename: ${newPath} already exists`);
                    }
                }
            });
        }
    });
}

console.log('Renaming PDF folders...');
renameFolders(pdfsDir);
console.log('Renaming Audio folders...');
renameFolders(audioDir);
console.log('Renaming Audio files...');
renameAudioFiles(audioDir);
