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
boot();
