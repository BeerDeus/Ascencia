import '@fontsource/jacquard-12/latin-400.css';
import '@fontsource/alegreya/latin-400.css';
import '@fontsource/alegreya/latin-400-italic.css';
import '@fontsource/alegreya/latin-700.css';
import '@fontsource/pixelify-sans/latin-500.css';
import '@fontsource/pixelify-sans/latin-700.css';
import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { boot } from './lib/game.svelte';

mount(App, { target: document.getElementById('app')! });
// pas de menu d'appui long (enregistrer l'image, copier…) hors champs de saisie
addEventListener('contextmenu', e => { if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) e.preventDefault(); });
addEventListener('dragstart', e => { if (e.target instanceof HTMLImageElement) e.preventDefault(); });
boot();

// PWA (navigateur uniquement ; inutile dans l'appli Capacitor)
import { isNative } from './lib/native';
if (!isNative && 'serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
