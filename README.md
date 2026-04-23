# 🎶 Întâlnirea Corurilor – Portal de Partituri

> **Un hub digital minimalist, rapid și elegant pentru gestionarea și distribuirea resurselor muzicale (partituri și negative) destinate corurilor.**

[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple?style=flat&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Acest proiect reprezintă o platformă web *Single Page Application* construită pentru a oferi coriștilor un acces instantaneu la partiturile oficiale (.pdf) și pistele de repetiție (.mp3) defalcate pe voci (Sopran, Alto, Tenor, Bas). Designul pune pe primul loc utilizarea pe mobil, fiind curat, compact și intuitiv.

---

## ✨ Funcționalități Principale

- **🎧 Player Audio Integrat pe Voci:** Fiecare piesă afișează vocile ca "pastile" (tabs). Selectând o voce, aplicația va reda precis negativul corespunzător utilizând un audio player unificat.
- **📄 Vizualizator PDF Nativ:** Platforma deschide partiturile PDF într-un modal generos direct în browser (iframe config), dotat cu unelte dedicate de zoom (+/-) și opțiune de descărcare offline, atât pe desktop cât și pe navigatoarele mobile!
- **🔍 Căutare Inteligentă Fuzzy:** Implementarea unui algoritm *fuzzy match* care normalizează diacriticele, permițând găsirea pieselor chiar și atunci când interogările au erori minore.
- **🌓 Dark Mode Nativ:** Suport perfect pentru Modul Întunecat bazat pe variabile CSS, comutabil din antet și memorat persistent în browserul utilizatorului.
- **🌐 Internaționalizare I18n:** Interfață tradusă integral în RO, EN și IT, cu persistența opțiunii salvată local. Toate butoanele aplicației sunt contextual adaptate.
- **📱 Mobile-First Real:** Aplicația folosește strategii avansate de micșorare (hide-on-tiny, touch height = 36px/44px minimum) pentru a rămâne eficientă curat la deget pe orice dispozitiv mobil.
- **🔗 Partajare Instantă:** Distribuie piesa selectată la prieteni / cor printr-un singur click folosind generatorul de link-uri (QueryParams: `?song=...`).

## 🛠️ Stack Tehnologic

- **Framework:** [React 19](https://react.dev/)
- **Limbaj:** [TypeScript](https://www.typescriptlang.org/)
- **Stilizare:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS Vars setup)
- **Tooling:** [Vite](https://vite.dev/) pentru build ultra-simplu și rapid.
- **Iconițe:** [Lucide React](https://lucide.dev/)

---

**👨‍💻 Designed & Developed by [Cornel](https://corneluu.github.io/corneluu/)**
*Vizitează [portofoliul meu digital](https://corneluu.github.io/corneluu/) pentru a descoperi noi proiecte!*
