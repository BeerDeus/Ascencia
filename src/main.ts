import '@fontsource/cinzel/700.css';
import '@fontsource/pixelify-sans/500.css';
import '@fontsource/pixelify-sans/700.css';
import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { boot } from './lib/game.svelte';

mount(App, { target: document.getElementById('app')! });
boot();
