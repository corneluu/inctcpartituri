export type Lang = 'RO' | 'EN' | 'IT' | 'LA';
export type Voice = 'sopran' | 'alto' | 'tenor' | 'bas';

export interface Song {
  id: string;
  title: string;
  composer: string;
  lang: Lang;
  voices: Voice[];
  hasScore: boolean;
  audioExt?: string; // optional, defaults to 'mp3'. Use 'wav', 'ogg', 'aac', etc.
  youtubeUrl?: string;
}

export const songs: Song[] = [
  { id: 'cantec-1', title: "Cristos e lumina (INCTC 2026)", composer: 'Iustin Calin', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-2', title: "All'agnello gloria", composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: 'https://www.youtube.com/watch?v=eGpJRpnZn_w&list=RDeGpJRpnZn_w&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-3', title: 'Anima Christi', composer: 'Marco Frisina', lang: 'LA', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-4', title: 'Cine ne va desparti', composer: 'Marco Frisina', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-5', title: 'Christ is my hope', composer: 'Marco Frisina', lang: 'EN', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-6', title: 'Cristo sorgente', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-7', title: "Forte come la morte è l'amore", composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-8', title: 'Il canto del mare', composer: 'Marco Frisina', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-9', title: 'Jesus Christ, you are my life', composer: 'Marco Frisina', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-10', title: 'La pace verrà', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-11', title: 'La vera gioia', composer: 'Marco Frisina', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-12', title: 'Pacem in terris', composer: 'Marco Frisina', lang: 'LA', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-13', title: 'Saldo è il mio cuore', composer: 'Marco Frisina', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-14', title: 'Ti amo, Signore', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-15', title: "Verso l'alto", composer: 'Marco Frisina', lang: 'IT', hasScore: true, audioExt: 'mp3', youtubeUrl: '', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  //{ id: 'cantec-16', title: 'Cântec 15', composer: '', lang: 'RO', hasScore: false, audioExt: 'mp3', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  //{ id: 'cantec-17', title: 'Cântec 16', composer: '', lang: 'RO', hasScore: false, audioExt: 'mp3', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  //{ id: 'cantec-18', title: 'Cântec 17', composer: '', lang: 'RO', hasScore: false, audioExt: 'mp3', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  //{ id: 'cantec-19', title: 'Cântec 18', composer: '', lang: 'RO', hasScore: false, audioExt: 'mp3', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  //{ id: 'cantec-20', title: 'Cântec 19', composer: '', lang: 'RO', hasScore: false, audioExt: 'mp3', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  //{ id: 'cantec-21', title: 'Cântec 20', composer: '', lang: 'RO', hasScore: false, audioExt: 'mp3', voices: ['sopran', 'alto', 'tenor', 'bas'] },
];
