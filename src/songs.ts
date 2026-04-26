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
  { id: 'cantec-1', title: "All'agnello Gloria", composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=eGpJRpnZn_w&list=RDeGpJRpnZn_w&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-2', title: 'Anima Christi', composer: 'Marco Frisina', lang: 'LA', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=mQ1myt4-gX4&list=RDmQ1myt4-gX4&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-3', title: 'Chi ci separerà', composer: 'Marco Frisina', lang: 'RO', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=YgogcC_RYNM&list=RDYgogcC_RYNM&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-4', title: 'Christ is my hope', composer: 'Marco Frisina', lang: 'EN', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=FkYz6S03y64&list=RDFkYz6S03y64&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-5', title: 'Cristo sorgente', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=c3YnXKe3tZ0&list=RDc3YnXKe3tZ0&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-6', title: "Forte come la morte è l'amore", composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=E16cJ71v-B0&list=RDE16cJ71v-B0&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-7', title: 'Il canto del mare', composer: 'Marco Frisina', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=becdqvWtqqc&list=RDbecdqvWtqqc&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-8', title: 'Jesus Christ, you are my life - Versione', composer: 'Marco Frisina', lang: 'RO', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=VGpnbfYayHI&list=RDVGpnbfYayHI&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-9', title: 'La pace verrà', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=usp_BvxPslk&list=RDusp_BvxPslk&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-10', title: 'La vera gioia', composer: 'Marco Frisina', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=ZR7JPMB3O7c&list=RDZR7JPMB3O7c&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-11', title: 'Pacem in terris', composer: 'Marco Frisina', lang: 'LA', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=wVNA8RFqqZc&list=RDwVNA8RFqqZc&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-12', title: 'Saldo è il mio cuore', composer: 'Marco Frisina', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=YakakPS_dPs&list=RDYakakPS_dPs&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-13', title: 'Ti amo, Signore', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=OkA0jqfPGsI&list=RDOkA0jqfPGsI&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-14', title: "Verso l'alto", composer: 'Marco Frisina', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=DNhIoRv7lhE&list=RDDNhIoRv7lhE&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-15', title: 'Cristos e lumina', composer: 'Iustin Calin', lang: 'RO', hasScore: true, voices: ['sopran', 'alto', 'tenor', 'bas'] },
  { id: 'cantec-16', title: 'Ne-aduni pe toti cu iubire', composer: 'Iustin Calin', lang: 'RO', hasScore: true, voices: ['sopran', 'alto', 'tenor', 'bas'] },

  // { id: 'cantec-1a', title: "All'agnello Gloria (Variant)", composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=eGpJRpnZn_w&list=RDeGpJRpnZn_w&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-2a', title: 'Anima Christi (Variant)', composer: 'Marco Frisina', lang: 'LA', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=mQ1myt4-gX4&list=RDmQ1myt4-gX4&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-3a', title: 'Chi ci separerà (Variant)', composer: 'Marco Frisina', lang: 'RO', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=YgogcC_RYNM&list=RDYgogcC_RYNM&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-4a', title: 'Christ is my hope (Variant)', composer: 'Marco Frisina', lang: 'EN', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=FkYz6S03y64&list=RDFkYz6S03y64&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-5a', title: 'Cristo sorgente (Variant)', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=c3YnXKe3tZ0&list=RDc3YnXKe3tZ0&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-6a', title: "Forte come la morte è l'amore (Variant)", composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=E16cJ71v-B0&list=RDE16cJ71v-B0&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-7a', title: 'Il canto del mare (Variant)', composer: 'Marco Frisina', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=becdqvWtqqc&list=RDbecdqvWtqqc&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-8a', title: 'Jesus Christ, you are my life - Versione (Variant)', composer: 'Marco Frisina', lang: 'RO', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=VGpnbfYayHI&list=RDVGpnbfYayHI&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-9a', title: 'La pace verrà (Variant)', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=usp_BvxPslk&list=RDusp_BvxPslk&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-10a', title: 'La vera gioia (Variant)', composer: 'Marco Frisina', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=ZR7JPMB3O7c&list=RDZR7JPMB3O7c&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-11a', title: 'Pacem in terris (Variant)', composer: 'Marco Frisina', lang: 'LA', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=wVNA8RFqqZc&list=RDwVNA8RFqqZc&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-12a', title: 'Saldo è il mio cuore (Variant)', composer: 'Marco Frisina', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=YakakPS_dPs&list=RDYakakPS_dPs&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-13a', title: 'Ti amo, Signore (Variant)', composer: 'Maurizio Lieggi', lang: 'IT', hasScore: false, youtubeUrl: 'https://www.youtube.com/watch?v=OkA0jqfPGsI&list=RDOkA0jqfPGsI&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-14a', title: "Verso l'alto (Variant)", composer: 'Marco Frisina', lang: 'IT', hasScore: true, youtubeUrl: 'https://www.youtube.com/watch?v=DNhIoRv7lhE&list=RDDNhIoRv7lhE&start_radio=1', voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-15a', title: 'Cristos e lumina (Variant)', composer: 'Iustin Calin', lang: 'RO', hasScore: true, voices: ['sopran', 'alto', 'tenor', 'bas'] },
  // { id: 'cantec-16a', title: 'Ne-aduni pe toti cu iubire (Variant)', composer: 'Iustin Calin', lang: 'RO', hasScore: true, voices: ['sopran', 'alto', 'tenor', 'bas'] }
];
