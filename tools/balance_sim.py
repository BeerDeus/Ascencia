"""Simulateur d'équilibrage Ascencia (prototype).

Modèle volontairement simple : Frappe (tap) + Compagnons, achat glouton
au meilleur ratio dégâts/coût, 10 monstres + 1 boss par étage, timer de boss.
Sert uniquement à valider la FORME de la courbe (murs, rythme des Ascensions).
Usage : python3 tools/balance_sim.py [nb_ascensions]
"""
import sys

# --- Monstres -------------------------------------------------------------
def pv(e):
    """PV d'un monstre à l'étage e."""
    return 10 * 1.34 ** min(e - 1, 139) * 1.22 ** max(e - 140, 0)

BOSS_MULT, BOSS_TIMER = 8, 30          # PV boss = 8x, Volonté = 30 s
GOLD_RATIO = 0.10                      # or par monstre = 10 % de ses PV

# --- Compagnons -----------------------------------------------------------
NB_COMP = 30
def recrutement(k): return 40 * 8.0 ** k
def dps_base(k):    return 3 * 6.2 ** k
COUT_NIV = 1.075
PALIERS = (10, 25, 50, 75, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000)
def palier_mult(lvl):
    m = 1.0
    for p in PALIERS:
        if lvl >= p:
            m *= 2.5 if p < 200 else 3
    return m

# --- Prestige -------------------------------------------------------------
def eclats(e):
    return int(3 * (e / 30) * 1.03 ** (e - 30)) if e >= 30 else 0
def mult_legende(total): return 1 + 0.05 * total


def run(mult, tps=4, max_time=3 * 3600, mur=1800):
    lv = [0] * NB_COMP; gold = 50; e = 1; t = 0; hero = 1; bloque = 0
    jalons = {}
    dps = lambda: sum(dps_base(k) * l * palier_mult(l) for k, l in enumerate(lv) if l) * mult
    frappe = lambda: (1 + hero * 1.05 ** (hero / 10)) * mult + 0.03 * dps()
    while t < max_time:
        while True:  # dépense gloutonne
            best = None
            for k in range(NB_COMP):
                if lv[k] == 0:
                    if k and lv[k - 1] < 10: continue
                    c, g = recrutement(k), dps_base(k) * mult
                else:
                    c = recrutement(k) * COUT_NIV ** lv[k]
                    g = dps_base(k) * mult * ((lv[k] + 1) * palier_mult(lv[k] + 1) - lv[k] * palier_mult(lv[k]))
                if c <= gold and (best is None or g / c > best[0]): best = (g / c, k, c)
            hc = 5 * 1.07 ** hero
            if hc <= gold and (best is None or frappe() * tps * 0.05 / hc > best[0]):
                gold -= hc; hero += 1; continue
            if best is None: break
            gold -= best[2]; lv[best[1]] += 1
        d = dps() + frappe() * tps; h = pv(e)
        t_mobs = 10 * (h / d + 0.4); t += t_mobs; gold += 10 * h * GOLD_RATIO
        t_boss = BOSS_MULT * h / d
        if t_boss <= BOSS_TIMER:
            t += t_boss; gold += BOSS_MULT * h * GOLD_RATIO * 1.5; e += 1; bloque = 0
            if e % 50 == 0: jalons[e] = t
        else:
            bloque += t_mobs
            if bloque > mur: break
    return e, t, jalons


if __name__ == "__main__":
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    total = 0; cumul = 0
    for a in range(n):
        e, t, _ = run(mult_legende(total), max_time=3 * 3600 if a == 0 else 75 * 60)
        cumul += t; gain = eclats(e); total += gain
        print(f"Ascension {a:2d} | étage max {e:3d} | +{gain:>9} éclats | légende {total:>10} | temps actif cumulé {cumul/3600:5.1f} h")
