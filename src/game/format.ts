const SUFFIX = ['', 'K', 'M', 'B', 'T'];
function letters(i: number): string {
  // après T : aa, ab, … az, ba, …
  const n = i - SUFFIX.length;
  return String.fromCharCode(97 + Math.floor(n / 26) % 26) + String.fromCharCode(97 + (n % 26));
}

export function fmt(n: number, notation: 'lettres' | 'scientifique' = 'lettres'): string {
  if (!isFinite(n)) return '∞';
  if (n < 0) return '-' + fmt(-n, notation);
  if (n < 1000) return n < 10 && n % 1 ? n.toFixed(1) : Math.floor(n).toString();
  const e = Math.floor(Math.log10(n));
  if (notation === 'scientifique') return (n / 10 ** e).toFixed(2) + 'e' + e;
  const tier = Math.floor(e / 3);
  const v = n / 10 ** (tier * 3);
  const s = tier < SUFFIX.length ? SUFFIX[tier] : letters(tier);
  return (v < 10 ? v.toFixed(2) : v < 100 ? v.toFixed(1) : Math.floor(v).toString()) + s;
}

export function fmtTime(s: number): string {
  s = Math.max(0, Math.floor(s));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h) return `${h} h ${m.toString().padStart(2, '0')}`;
  if (m) return `${m} min ${sec.toString().padStart(2, '0')}`;
  return `${sec} s`;
}
