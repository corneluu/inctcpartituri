import { useState, useCallback, useEffect } from 'react';

export const i18n = {
  ro: {
    portalSubtitle: "PARTITURI OFICIALE",
    searchPlaceholder: "Caută cântec...",
    soprano: "Sopran",
    alto: "Alto",
    tenor: "Tenor",
    bass: "Bas",
    viewScore: "Vezi Partitură",
    showMore: "Arată toate vocile...",
    showLess: "Ascunde vocile",
    copied: "Link copiat!",
    useZoomButtons: "Folosește butoanele zoom",
    zoomIn: "Mărire",
    zoomOut: "Micșorare",
    download: "Descarcă partitura PDF",
    share: "Distribuie",
    close: "Închide",
    noResults: "Niciun cântec găsit.",
  },
  en: {
    portalSubtitle: "OFFICIAL SCORES",
    searchPlaceholder: "Search song...",
    soprano: "Soprano",
    alto: "Alto",
    tenor: "Tenor",
    bass: "Bass",
    viewScore: "View Score",
    showMore: "Show all voices...",
    showLess: "Hide voices",
    copied: "Link copied!",
    useZoomButtons: "Use zoom buttons",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    download: "Download PDF score",
    share: "Share",
    close: "Close",
    noResults: "No songs found.",
  },
  it: {
    portalSubtitle: "SPARTITI UFFICIALI",
    searchPlaceholder: "Cerca brano...",
    soprano: "Soprano",
    alto: "Contralto",
    tenor: "Tenore",
    bass: "Basso",
    viewScore: "Vedi Spartito",
    showMore: "Mostra tutte le voci...",
    showLess: "Nascondi",
    copied: "Link copiato!",
    useZoomButtons: "Usa i pulsanti zoom",
    zoomIn: "Ingrandisci",
    zoomOut: "Riduci",
    download: "Scarica spartito PDF",
    share: "Condividi",
    close: "Chiudi",
    noResults: "Nessun brano trovato.",
  }
} as const;

export type AppLang = keyof typeof i18n;
export type TKey = keyof typeof i18n['ro'];

export function useLang() {
  const [lang, setLangState] = useState<AppLang>(() => {
    const saved = localStorage.getItem('hc-lang') as AppLang;
    return (saved && i18n[saved]) ? saved : 'ro';
  });

  const setLang = useCallback((l: AppLang) => {
    localStorage.setItem('hc-lang', l);
    setLangState(l);
  }, []);

  const t = useCallback((key: TKey) => {
    return i18n[lang][key];
  }, [lang]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'hc-lang' && e.newValue && i18n[e.newValue as AppLang]) {
        setLangState(e.newValue as AppLang);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return { lang, setLang, t };
}
