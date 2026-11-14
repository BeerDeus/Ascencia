"""Supprime les liserés clairs laissés autour des sprites (détourage imparfait).

Principe : on part de la transparence extérieure et on « ronge » au plus 3 pixels
clairs et peu saturés (blanc / gris anticrénelé), en s'arrêtant au contour sombre
du pixel-art. Le blanc à l'intérieur du dessin n'est jamais atteint.

Usage : python3 tools/clean-fringe.py [--apply] [--noise] [fichiers…]
Sans fichier : analyse tout assets/ (hors fonds) et ne traite que les images touchées.
Deuxième règle : un voile semi-transparent grisâtre relié à l'extérieur est effacé entièrement.
"""
import sys, glob
import numpy as np
from PIL import Image

DEPTH = 3

def masks(a):
    A = a[..., 3]; rgb = a[..., :3].astype(int)
    tr = A < 16
    lo, hi = rgb.min(axis=2), rgb.max(axis=2)
    light = (lo > 120) & (hi - lo < 60)          # blanc / gris peu saturé
    faint = (A < 200) & (lo > 90)                 # bord semi-transparent clair
    return tr, light | faint

def edge_of(region):
    pad = np.pad(region, 1, constant_values=True)
    return pad[:-2, 1:-1] | pad[2:, 1:-1] | pad[1:-1, :-2] | pad[1:-1, 2:]

def score(a):
    tr, cand = masks(a)
    edge = (~tr) & edge_of(tr)
    n_edge = edge.sum()
    return (edge & cand).sum(), n_edge

def clean(a):
    tr, cand = masks(a)
    outside = tr.copy()
    removed = np.zeros_like(tr)
    for _ in range(DEPTH):
        grow = (~outside) & cand & edge_of(outside)
        if not grow.any(): break
        removed |= grow; outside |= grow
    # 2e règle : voile semi-transparent grisâtre relié à l'extérieur (fond mal détouré), sans limite de profondeur.
    A = a[..., 3]; rgb = a[..., :3].astype(int)
    veil = (A < 128) & (rgb.max(axis=2) - rgb.min(axis=2) < 60)
    while True:
        grow = (~outside) & veil & edge_of(outside)
        if not grow.any(): break
        removed |= grow; outside |= grow
    a = a.copy(); a[removed, 3] = 0
    return a, int(removed.sum())

def main():
    args = [x for x in sys.argv[1:] if not x.startswith('--')]
    apply = '--apply' in sys.argv
    files = args or [f for f in sorted(glob.glob('assets/**/*.png', recursive=True)) if '/background/' not in f and '/old/' not in f]
    if '--noise' in sys.argv:
        # pixels quasi invisibles (opacité < 6 %) : souvent un voile résiduel du détourage
        for f in files:
            a = np.array(Image.open(f).convert('RGBA'))
            m = (a[..., 3] > 0) & (a[..., 3] < 16)
            if m.sum() > 50:
                print(f'{int(m.sum()):6d} px invisibles  {f}')
                if apply: a[m, 3] = 0; Image.fromarray(a).save(f, optimize=True)
        return
    for f in files:
        a = np.array(Image.open(f).convert('RGBA'))
        n, n_edge = score(a)
        if not args and (n_edge == 0 or n / n_edge < 0.04 or n <= 15): continue
        out, k = clean(a)
        print(f'{k:6d} px retirés  {f}')
        if apply and k: Image.fromarray(out).save(f, optimize=True)

if __name__ == '__main__':
    main()
