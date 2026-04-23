import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Download, Share2, FileText, X, ZoomIn, ZoomOut, Moon, Sun, AlertCircle, ChevronUp } from 'lucide-react';
import { songs } from './songs';
import type { Song, Voice } from './songs';
import logo from './assets/logo.png';
import { useLang, type AppLang } from './i18n';
import { useDarkMode } from './useDarkMode';

// ─── UTILS ──────────────────────────────────────────────────────────────────
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function formatTime(secs: number) {
  if (!isFinite(secs) || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function normalizeText(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function isFuzzyMatch(query: string, text: string) {
  const normQuery = normalizeText(query).replace(/\s+/g, '');
  const normText = normalizeText(text);

  if (!normQuery) return true;

  let i = 0, j = 0;
  while (i < normQuery.length && j < normText.length) {
    if (normQuery[i] === normText[j]) { i++; }
    j++;
  }
  return i === normQuery.length;
}

export const sendDiscordTelemetry = (title: string, songName: string, typeStr: string) => {
  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const now = new Date();
  const dateStr = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  const payload = {
    username: "Cornel Security",
    embeds: [{
      title: title,
      color: 3447003,
      fields: [
        { name: "Piesa", value: songName, inline: false },
        { name: "Tip", value: typeStr, inline: false },
        { name: "Data", value: dateStr, inline: false }
      ]
    }]
  };

  fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    .catch((e) => console.log("Telemetry failed:", e));
};

// ─── AUDIO PLAYER COMPONENT ─────────────────────────────────────────────────
interface PlayerProps {
  songId: string;
  voice: Voice;
  path: string;
  playingId: string | null;
  onPlay: (id: string) => void;
  onDownload: (path: string, filename: string) => void;
  onShare: (songId: string, voice: Voice) => void;
  onTelemetry: (action: string, type: string) => void;
  t: (key: any) => string;
}

function AudioPlayer({ songId, voice, path, playingId, onPlay, onDownload, onShare, onTelemetry, t }: PlayerProps) {
  const audioId = `${songId}-${voice}`;
  const isPlaying = playingId === audioId;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTime, setCT] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) Object.assign(audio.play(), { catch: () => { } });
    else audio.pause();
  }, [isPlaying, path]);

  const togglePlay = () => {
    if (isPlaying) {
      onPlay('');
    } else {
      onPlay(audioId);
      onTelemetry("▶️ Redare Audio", `MP3 - ${voice}`);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (audioRef.current && duration) {
      audioRef.current.currentTime = pct * duration;
      setCT(pct * duration);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const fullUrl = assetUrl(path);
  const ext = path.split('.').pop() ?? 'mp3';

  return (
    <div className="flex flex-row items-center gap-3 w-full h-[36px] bg-[var(--bg)] border border-[var(--track)] rounded-full px-2 mt-4 shadow-sm">
      <audio
        ref={audioRef}
        src={fullUrl}
        preload="metadata"
        onTimeUpdate={(e) => setCT(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => { setCT(0); onPlay(''); }}
      />

      <button
        onClick={togglePlay}
        className="flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--accent)] text-[#0a0f0c] dark:text-[#0a0f0c] w-[26px] h-[26px] shadow-sm hover:opacity-90 transition-opacity"
      >
        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} className="ml-[1px]" fill="currentColor" />}
      </button>

      <div className="flex-1 relative flex items-center h-5 cursor-pointer group" onClick={handleSeek}>
        <div className="absolute inset-x-0 h-[4px] bg-[var(--track)] rounded-full overflow-hidden transition-all">
          <div className="h-full bg-[var(--accent)] transition-all ease-linear" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="tabular-nums text-[var(--muted)] text-right flex-shrink-0 tracking-tight whitespace-nowrap text-[12px] font-medium w-[72px]">
        <span>{formatTime(currentTime)}</span>
        <span> / {formatTime(duration)}</span>
      </div>

      <div className="flex flex-row items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-1 mr-1">
        <button
          onClick={() => {
            onDownload(fullUrl, `${songId}-${voice}.${ext}`);
            onTelemetry("💾 Descărcare Audio", `${ext.toUpperCase()} - ${voice}`);
          }}
          className="flex items-center justify-center sm:px-2.5 sm:py-1 rounded max-sm:p-1 max-sm:text-[var(--muted)] max-sm:hover:text-[var(--text)] sm:bg-[var(--track)] sm:text-[var(--text)] sm:hover:bg-[var(--text)] sm:hover:text-[var(--bg)] transition-all font-medium"
          title={t('download')}
        >
          <Download size={14} className="sm:mr-1.5" />
          <span className="hidden sm:inline text-[11px] uppercase tracking-wide">{t('download')}</span>
        </button>
        <button onClick={() => { onShare(songId, voice); onTelemetry("🔗 Distribuire", `Link Audio (${voice})`); }} className="p-1.5 sm:p-2 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--track)] rounded-full transition-all">
          <Share2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── SONG ITEM COMPONENT ────────────────────────────────────────────────────
interface SongProps {
  song: Song;
  playingId: string | null;
  onPlay: (id: string) => void;
  lang: { t: any };
  onOpenPdf: (id: string) => void;
  isHighlighted?: boolean;
  onShare: (songId: string, voice?: string) => void;
  onTelemetry: (action: string, songName: string, type: string) => void;
}

function SongItem({ song, playingId, onPlay, lang, onOpenPdf, onShare, isHighlighted, onTelemetry }: SongProps) {
  const { t } = lang;
  // State for active voice tab
  const [activeVoice, setActiveVoice] = useState<Voice>(song.voices[0]);

  const handleDownloadMp3 = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className={`py-5 border-b border-[var(--track)] last:border-0 transition-colors duration-1000 p-2 -mx-2 rounded-xl ${isHighlighted ? 'bg-[var(--highlight)]' : 'bg-transparent'
        }`}
      id={`song-${song.id}`}
    >
      {/* Title & Composer exactly like the image */}
      <div className="mb-4 px-2">
        <h2 className="text-[17px] sm:text-lg font-semibold text-[var(--text)] leading-tight">
          {song.title} <span className="font-normal text-[var(--muted)]">— {song.composer}</span>
        </h2>
      </div>

      {/* Voice Pills (Tabs) */}
      <div className="flex flex-wrap gap-2.5 mb-2 px-2">
        {song.voices.map((v) => {
          const isActive = activeVoice === v;
          return (
            <button
              key={v}
              onClick={() => setActiveVoice(v)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all border ${isActive
                ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)] shadow-sm'
                : 'bg-[var(--card)] text-[var(--text)] border-[var(--track)] hover:border-[var(--muted)]'
                }`}
            >
              {t(v)}
            </button>
          );
        })}
        {song.youtubeUrl && (
          <a
            href={song.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all border bg-[#FF0000] text-white border-[#FF0000] hover:bg-red-700 shadow-sm"
            onClick={() => onTelemetry("▶️ Redare YouTube", song.title, "Video")}
            title={t('youtube')}
          >
            <Play size={16} fill="currentColor" />
            {t('youtube')}
          </a>
        )}
      </div>

      <div className="px-2 w-full">
        <AudioPlayer
          songId={song.id}
          voice={activeVoice}
          path={`audio/${song.id}/${activeVoice}.${song.audioExt ?? 'mp3'}`}
          playingId={playingId}
          onPlay={onPlay}
          onDownload={(url) => handleDownloadMp3(url, `${song.title} - ${t(activeVoice)}.${song.audioExt ?? 'mp3'}`)}
          onShare={onShare}
          onTelemetry={(action, type) => onTelemetry(action, song.title, type)}
          t={t}
        />
      </div>

      {/* Partitură Button (Full width like image) */}
      <div className="px-2 mt-4">
        {song.hasScore && (
          <button
            onClick={() => {
              onOpenPdf(song.id);
              onTelemetry("📂 Fișier Deschis", song.title, "PDF");
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--text)] text-[var(--bg)] hover:opacity-90 font-semibold rounded-full text-[14px] transition-opacity shadow-md"
          >
            <FileText size={16} />
            {t('viewScore')}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP COMPONENT ─────────────────────────────────────────────────────
export default function App() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useDarkMode();

  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [pdfModalId, setPdfModalId] = useState<string | null>(null);
  const [pdfZoom, setPdfZoom] = useState(1);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleTelemetry = (action: string, songName: string, typeStr: string) => {
    sendDiscordTelemetry(action, songName, typeStr);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const songParam = params.get('song');
    if (songParam) {
      setTimeout(() => {
        const el = document.getElementById(`song-${songParam}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(songParam);
          setTimeout(() => setHighlightedId(null), 4000); // 4 seconds highlight
        }
      }, 500);
    }

    if (!navigator.onLine) setShowNetworkModal(true);
    const onOffline = () => setShowNetworkModal(true);
    window.addEventListener('offline', onOffline);
    return () => window.removeEventListener('offline', onOffline);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (songId: string, voice?: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('song', songId);
    if (voice) url.searchParams.set('voice', voice);
    navigator.clipboard.writeText(url.toString());
  };

  const filteredSongs = useMemo(() => {
    let list = songs;
    if (search.trim()) {
      list = list.filter(s => isFuzzyMatch(search, `${s.title} ${s.composer}`));
    }
    return list;
  }, [search]);

  const handleDownloadPdf = (songId: string) => {
    const songObj = songs.find(s => s.id === songId);
    if (songObj) handleTelemetry("📂 Descărcare Partitură", songObj.title, "PDF");

    const a = document.createElement('a');
    a.href = assetUrl(`pdfs/${songId}/partitura.pdf`);
    a.download = songObj ? `${songObj.title}.pdf` : `${songId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    if (pdfModalId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPdfModalId(null);
    };
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [pdfModalId]);

  return (
    <div className="min-h-screen bg-[var(--bg)] font-sans pb-20 transition-colors">
      <header className="sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--track)] transition-colors shadow-sm">
        <div className="max-w-[640px] mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-row items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              <div>
                <h1 className="font-serif text-xl font-bold text-[var(--text)] leading-none mb-0.5">
                  Întâlnirea Corurilor
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-semibold">
                  {t('portalSubtitle')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={toggleTheme}
                className="p-1 text-[var(--muted)] hover:text-[var(--text)] transition-colors bg-[var(--track)] rounded-full"
              >
                {theme === 'dark' ? <Sun size={16} className="m-1" /> : <Moon size={16} className="m-1" />}
              </button>

              <div className="flex items-center gap-2 sm:gap-3 text-sm">
                {(['ro', 'en', 'it'] as AppLang[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`uppercase transition-colors ${lang === l ? 'font-bold text-[var(--text)] border-b-2 border-[var(--text)] pb-0.5' : 'text-[var(--muted)] hover:text-[var(--text)] pb-[2px]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center mt-3">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full h-10 bg-[var(--card)] border border-[var(--track)] rounded-xl px-4 text-[15px] outline-none focus:border-[var(--accent)] text-[var(--text)] transition-all placeholder-[var(--muted)] shadow-sm"
            />
          </div>
        </div>
      </header>

      <main className="max-w-[640px] mx-auto px-4 mt-2 sm:mt-4">
        {filteredSongs.length === 0 ? (
          <div className="text-center py-20 text-[var(--muted)]">
            {t('noResults')}
          </div>
        ) : (
          filteredSongs.map(song => (
            <SongItem
              key={song.id}
              song={song}
              playingId={playingId}
              onPlay={setPlayingId}
              lang={{ t }}
              onOpenPdf={setPdfModalId}
              onShare={handleShare}
              isHighlighted={highlightedId === song.id}
              onTelemetry={handleTelemetry}
            />
          ))
        )}
      </main>

      {/* FOOTER SIGNATURE */}
      <footer className="mt-8 sm:mt-12 pb-6 text-center">
        <a
          href="https://corneluu.github.io/corneluu/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[10px] text-[var(--muted)] hover:text-[var(--text)] uppercase tracking-[0.1em] transition-all opacity-60 hover:opacity-100 font-medium"
        >
          Built by Cornel
        </a>
      </footer>

      {pdfModalId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-0 sm:p-4">
          <div className="bg-[var(--bg)] sm:rounded-xl w-full sm:max-w-4xl h-full sm:h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-3 border-b border-[var(--track)] text-[var(--text)]">
              <h3 className="font-semibold text-[15px] sm:text-base truncate px-1">
                {songs.find(s => s.id === pdfModalId)?.title}
              </h3>
              <div className="flex items-center gap-1">
                <button onClick={() => setPdfZoom(z => Math.max(0.5, z - 0.2))} className="p-2 text-[var(--muted)] hover:bg-[var(--track)] rounded-full" title={t('zoomOut')}><ZoomOut size={18} /></button>
                <button onClick={() => setPdfZoom(z => Math.min(3, z + 0.2))} className="p-2 text-[var(--muted)] hover:bg-[var(--track)] rounded-full" title={t('zoomIn')}><ZoomIn size={18} /></button>
                <div className="sm:hidden flex items-center">
                  <button
                    onClick={() => {
                      handleShare(pdfModalId);
                      const s = songs.find(x => x.id === pdfModalId);
                      if (s) handleTelemetry("🔗 Distribuire", s.title, "Link Partitură");
                    }}
                    className="p-2 text-[var(--muted)] hover:bg-[var(--track)] rounded-full"
                    title={t('share')}
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDownloadPdf(pdfModalId)}
                    className="p-2 text-[var(--muted)] hover:bg-[var(--track)] rounded-full"
                    title={t('download')}
                  >
                    <Download size={18} />
                  </button>
                </div>
                <div className="w-px h-5 bg-[var(--track)] mx-0.5 sm:mx-1" />
                <button onClick={() => { setPdfModalId(null); setPdfZoom(1); }} className="p-2 text-[var(--muted)] hover:text-red-500 hover:bg-[var(--track)] rounded-full"><X size={20} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-[var(--track)] relative">
              <div style={{ transform: `scale(${pdfZoom})`, transformOrigin: 'top center', transition: 'transform 0.2s', width: '100%', minHeight: '100%' }}>
                <iframe src={`${assetUrl(`pdfs/${pdfModalId}/partitura.pdf`)}#toolbar=0`} className="w-full h-full min-h-[90vh] border-none block bg-white pointer-events-auto" />
              </div>
            </div>
            <div className="hidden sm:flex p-4 bg-[var(--bg)] border-t border-[var(--track)] justify-center gap-3">
              <button
                onClick={() => {
                  handleShare(pdfModalId);
                  const s = songs.find(x => x.id === pdfModalId);
                  if (s) handleTelemetry("🔗 Distribuire", s.title, "Link Partitură");
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--card)] text-[var(--text)] border border-[var(--track)] hover:border-[var(--muted)] font-semibold rounded-full text-[14px] transition-all shadow-sm"
              >
                <Share2 size={16} />
                {t('share')}
              </button>
              <button
                onClick={() => handleDownloadPdf(pdfModalId)}
                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--text)] text-[var(--bg)] hover:opacity-90 font-semibold rounded-full text-[14px] transition-all shadow-md"
              >
                <Download size={16} />
                {t('download')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 bg-[var(--text)] text-[var(--bg)] p-3.5 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        title={t('backToTop')}
        aria-label={t('backToTop')}
      >
        <ChevronUp size={24} />
      </button>

      {/* NETWORK WARNING MODAL */}
      {showNetworkModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowNetworkModal(false)}>
          <div className="bg-[var(--bg)] border border-[var(--track)] rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowNetworkModal(false)} className="absolute top-4 right-4 p-2 text-[var(--muted)] hover:text-[var(--text)] rounded-full hover:bg-[var(--track)] transition-colors">
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-5 ring-8 ring-red-50 dark:ring-red-900/10">
                <AlertCircle size={32} className="text-red-600 dark:text-red-500" />
              </div>
              <h3 className="text-[19px] font-bold text-[var(--text)] mb-3 leading-tight">{t('offlineTitle')}</h3>
              <p className="text-[14px] text-[var(--muted)] mb-6 leading-relaxed">
                {t('offlineDesc')}
              </p>
              <button
                onClick={() => setShowNetworkModal(false)}
                className="w-full py-3 rounded-xl bg-[var(--text)] hover:opacity-90 text-[var(--bg)] font-bold text-[15px] transition-all shadow-md active:scale-[0.98]"
              >
                {t('offlineConfirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
