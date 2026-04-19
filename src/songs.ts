export type Lang = 'RO' | 'EN' | 'IT' | 'LA';
export type Voice = 'soprano' | 'alto' | 'tenor' | 'bass';

export interface Song {
  id: string;
  title: string;
  composer: string;
  lang: Lang;
  voices: Voice[];
  hasScore: boolean;
  audioExt?: string; // optional, defaults to 'mp3'. Use 'wav', 'ogg', 'aac', etc.
}

export const songs: Song[] = [
  {
    id: 'jesus-christ',
    title: 'Jesus Christ, You Are My Life',
    composer: 'Marco Frisina',
    lang: 'IT',
    hasScore: true,
    voices: ['soprano', 'alto', 'tenor', 'bass']
  },
  {
    id: 'laudate-dominum',
    title: 'Laudate Dominum',
    composer: 'W.A. Mozart',
    lang: 'LA',
    hasScore: true,
    voices: ['soprano', 'alto', 'tenor', 'bass']
  },
  {
    id: 'bless-the-lord',
    title: 'Bless the Lord',
    composer: 'Taizé',
    lang: 'EN',
    hasScore: true,
    voices: ['soprano', 'alto', 'tenor', 'bass']
  },
  {
    id: 'cerul-e-in-inima-mea',
    title: 'Cerul e în inima mea',
    composer: 'Anonim',
    lang: 'RO',
    hasScore: true,
    voices: ['soprano', 'alto', 'tenor', 'bass']
  },
  {
    id: 'gloria-in-excelsis',
    title: 'Gloria in excelsis',
    composer: 'A. Vivaldi',
    lang: 'LA',
    hasScore: true,
    voices: ['soprano', 'alto', 'tenor', 'bass']
  },
  {
    id: 'spera-in-domnul',
    title: 'Speră în Domnul',
    composer: 'Anonim',
    lang: 'RO',
    hasScore: true,
    voices: ['soprano', 'alto', 'tenor', 'bass']
  }
];
