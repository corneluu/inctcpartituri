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
  lastUpdate: '29 mai 2026',
  pdfs: [
    { 
      name: 'Ne-aduni pe toți cu iubire', 
      url: 'pdfs/cantec-16/partitura.pdf', 
      date: '29 mai 2026', 
      change: 'Partitură actualizată (s-a adăugat o măsură la finalul strofei)' 
    },
    { 
      name: 'Eu te iubesc, Doamne', 
      url: 'pdfs/cantec-13/partitura.pdf', 
      date: '9 mai 2026', 
      change: 'Partitură actualizată' 
    }
  ],
  audio: [
    { 
      name: 'Pacem in terris (Bas)', 
      url: 'audio/cantec-11/bas.mp3', 
      date: '29 mai 2026', 
      change: 'Audio actualizat' 
    },
    { 
      name: 'La pace verrà (Alto)', 
      url: 'audio/cantec-9/alto.mp3', 
      date: '9 mai 2026', 
      change: 'Audio actualizat' 
    },
    { 
      name: 'La pace verrà (Sopran)', 
      url: 'audio/cantec-9/sopran.mp3', 
      date: '9 mai 2026', 
      change: 'Audio actualizat' 
    }
  ]
};
