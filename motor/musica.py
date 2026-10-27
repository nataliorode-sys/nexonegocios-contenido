"""Música de fondo original para los reels: un colchón instrumental tranquilo, sin derechos de terceros.

Uso: python3 motor/musica.py <segundos> <variante 0-2> <salida.wav>
Cada variante es una progresión de acordes distinta; el resultado es determinístico.
"""
import sys
import wave

import numpy as np
from scipy.signal import butter, fftconvolve, sosfilt

SR = 44100
PROGRESIONES = [
    # Notas MIDI por acorde (4 acordes que se repiten)
    [[48, 55, 64, 71], [45, 52, 60, 67], [41, 48, 57, 64], [43, 50, 59, 62]],  # Cmaj7 · Am7 · Fmaj7 · G
    [[50, 57, 65, 72], [46, 53, 62, 69], [41, 48, 57, 65], [48, 55, 64, 67]],  # Dm7 · Bbmaj7 · F · C
    [[45, 52, 60, 67], [41, 48, 57, 64], [48, 55, 64, 71], [43, 50, 59, 66]],  # Am7 · Fmaj7 · Cmaj7 · G
]
TEMPO = 84  # pulsos por minuto
COMPAS = 4 * 60 / TEMPO  # duración de cada acorde, en segundos


def hz(nota):
    return 440.0 * 2 ** ((nota - 69) / 12)


def envolvente(n, ataque, caida):
    e = np.ones(n)
    a, c = int(ataque * SR), int(caida * SR)
    e[:a] = np.linspace(0, 1, a)
    e[-c:] *= np.linspace(1, 0, c)
    return e


def pad(nota, dur, desafino):
    t = np.arange(int(dur * SR)) / SR
    f = hz(nota) * (1 + desafino)
    onda = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)
    vibrato = 1 + 0.08 * np.sin(2 * np.pi * 0.2 * t)
    return onda * vibrato * envolvente(len(t), 1.2, 1.4)


def pulso(nota, dur=1.2):
    t = np.arange(int(dur * SR)) / SR
    f = hz(nota)
    return (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 3.2) * envolvente(len(t), 0.005, 0.05)


def generar(segundos, variante):
    prog = PROGRESIONES[variante % len(PROGRESIONES)]
    total = int((segundos + 2) * SR)
    izq, der = np.zeros(total), np.zeros(total)
    paso = 60 / TEMPO / 2  # corcheas del arpegio
    k = 0
    inicio = 0.0
    while inicio < segundos + 1:
        acorde = prog[k % len(prog)]
        i0 = int(inicio * SR)
        dur = COMPAS + 1.4  # se superpone con el siguiente para un cambio suave
        for nota in acorde:
            for canal, d in ((izq, -0.003), (der, 0.003)):
                s = pad(nota, dur, d) * 0.10
                canal[i0:i0 + len(s)] += s[: max(0, total - i0)]
        bajo = pad(acorde[0] - 12, dur, 0) * 0.16
        izq[i0:i0 + len(bajo)] += bajo[: max(0, total - i0)]
        der[i0:i0 + len(bajo)] += bajo[: max(0, total - i0)]
        arpegio = [acorde[1] + 12, acorde[2] + 12, acorde[3] + 12, acorde[2] + 12]
        for j in range(int(COMPAS / paso)):
            nota = arpegio[j % len(arpegio)]
            s = pulso(nota) * (0.07 if j % 2 == 0 else 0.05)
            p = i0 + int(j * paso * SR)
            canal, otro = (izq, der) if j % 2 == 0 else (der, izq)
            canal[p:p + len(s)] += s[: max(0, total - p)]
            otro[p:p + len(s)] += 0.6 * s[: max(0, total - p)]
        inicio += COMPAS
        k += 1

    # Suavizar agudos y dar espacio con una reverberación simple
    sos = butter(4, 3200, btype="low", fs=SR, output="sos")
    ir_t = np.arange(int(2.2 * SR)) / SR
    rng = np.random.default_rng(7 + variante)
    salida = []
    for canal in (izq, der):
        ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 2.6)
        seco = sosfilt(sos, canal)
        humedo = fftconvolve(seco, ir)[: len(seco)]
        humedo *= np.max(np.abs(seco)) / (np.max(np.abs(humedo)) + 1e-9)
        salida.append(0.75 * seco + 0.35 * humedo)
    estereo = np.stack(salida, axis=1)[: int(segundos * SR)]
    n = len(estereo)
    fade = np.ones(n)
    fi, fo = int(1.0 * SR), int(2.0 * SR)
    fade[:fi] = np.linspace(0, 1, fi)
    fade[-fo:] = np.linspace(1, 0, fo)
    estereo *= fade[:, None]
    estereo *= 0.5 / (np.max(np.abs(estereo)) + 1e-9)  # pico a -6 dB
    return estereo


if __name__ == "__main__":
    segundos, variante, destino = float(sys.argv[1]), int(sys.argv[2]), sys.argv[3]
    datos = (generar(segundos, variante) * 32767).astype(np.int16)
    with wave.open(destino, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(datos.tobytes())
