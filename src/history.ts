export interface HistoryItem {
  name: string;
  url: string;
  date: string;
  change: string;
}

export interface UpdateHistory {
  lastUpdate: string;
  pdfs: HistoryItem[];
  audio: HistoryItem[];
}

export const updateHistory: UpdateHistory = {
  lastUpdate: '3 iunie 2026',
  pdfs: [
    { 
      name: 'Ne-aduni pe toți cu iubire', 
      url: 'pdfs/cantec-16/partitura.pdf', 
      date: '29 mai 2026', 
      change: 'Partitură actualizată (s-a adăugat o măsură la finalul strofei)' 
    }
  ],
  audio: [
    { 
      name: 'Pacem in terris (Sopran)', 
      url: 'audio/cantec-11/sopran.mp3', 
      date: '3 iunie 2026', 
      change: 'Audio actualizat' 
    },
    { 
      name: 'Pacem in terris (Alto)', 
      url: 'audio/cantec-11/alto.mp3', 
      date: '3 iunie 2026', 
      change: 'Audio actualizat' 
    },
    { 
      name: 'Pacem in terris (Tenor)', 
      url: 'audio/cantec-11/tenor.mp3', 
      date: '3 iunie 2026', 
      change: 'Audio actualizat' 
    },
    { 
      name: 'Pacem in terris (Bas)', 
      url: 'audio/cantec-11/bas.mp3', 
      date: '3 iunie 2026', 
      change: 'Audio actualizat' 
    }
  ]
};
