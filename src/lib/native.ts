import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';

export const isNative = Capacitor.isNativePlatform();
let hapticsOn = true;
export function setHaptics(on: boolean) { hapticsOn = on; }

export function buzz(kind: 'light' | 'medium' | 'heavy' = 'light') {
  if (!hapticsOn) return;
  if (isNative) {
    Haptics.impact({ style: kind === 'heavy' ? ImpactStyle.Heavy : kind === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light }).catch(() => {});
  } else if ('vibrate' in navigator) {
    try { navigator.vibrate(kind === 'heavy' ? 40 : kind === 'medium' ? 20 : 8); } catch { /* ignoré */ }
  }
}

const KEY = 'ascencia.save';
export async function storeSave(json: string) {
  try { localStorage.setItem(KEY, json); } catch { /* quota */ }
  if (isNative) await Preferences.set({ key: KEY, value: json }).catch(() => {});
}
export async function readSaves(): Promise<string[]> {
  const out: string[] = [];
  try { const l = localStorage.getItem(KEY); if (l) out.push(l); } catch { /* ignoré */ }
  if (isNative) { const p = await Preferences.get({ key: KEY }).catch(() => null); if (p?.value) out.push(p.value); }
  return out;
}
export async function clearSaves() {
  try { localStorage.removeItem(KEY); } catch { /* ignoré */ }
  if (isNative) await Preferences.remove({ key: KEY }).catch(() => {});
}

export function onAppState(cb: (active: boolean) => void) {
  document.addEventListener('visibilitychange', () => cb(document.visibilityState === 'visible'));
  if (isNative) App.addListener('appStateChange', s => cb(s.isActive));
}
export function onBackButton(cb: () => void) {
  if (isNative) App.addListener('backButton', cb);
}
