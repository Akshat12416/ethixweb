import wave
import math
import struct

SAMPLE_RATE = 44100
DURATION = 24.0
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION)

left_channel = [0.0] * TOTAL_SAMPLES
right_channel = [0.0] * TOTAL_SAMPLES

def add_sample(t_idx, l_val, r_val):
    if 0 <= t_idx < TOTAL_SAMPLES:
        left_channel[t_idx] += l_val
        right_channel[t_idx] += r_val

def noise():
    import random
    return random.uniform(-1.0, 1.0)

# 1. SYNTH CHORDS / PADS (D minor progression across 24s)
# 0s - 4.8s: Dm9 (D3=146.83, F3=174.61, A3=220.0, C4=261.63, E4=329.63)
# 4.8s - 9.6s: Bbmaj7 (Bb2=116.54, D3=146.83, F3=174.61, A3=220.0)
# 9.6s - 14.4s: Fadd9 (F2=87.31, C3=130.81, G3=196.0, A3=220.0, E4=329.63)
# 14.4s - 19.2s: C9 (C3=130.81, G3=196.0, D4=293.66, E4=329.63)
# 19.2s - 24.0s: Dm (D2=73.42, A2=110.0, D3=146.83, F3=174.61)

chords = [
    (0.0, 4.8, [146.83, 174.61, 220.0, 261.63, 329.63]),
    (4.8, 9.6, [116.54, 146.83, 174.61, 220.0]),
    (9.6, 14.4, [87.31, 130.81, 196.0, 220.0, 329.63]),
    (14.4, 19.2, [130.81, 196.0, 293.66, 329.63]),
    (19.2, 24.0, [73.42, 110.0, 146.83, 174.61])
]

for start_t, end_t, freqs in chords:
    start_s = int(start_t * SAMPLE_RATE)
    end_s = int(end_t * SAMPLE_RATE)
    chord_len = end_s - start_s
    for i in range(chord_len):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        fade_in = min(1.0, t / 0.3)
        time_left = (end_s - cur_s) / SAMPLE_RATE
        fade_out = min(1.0, time_left / 0.4)
        if cur_s / SAMPLE_RATE > 22.0:
            fade_out *= max(0.0, (24.0 - cur_s / SAMPLE_RATE) / 2.0)
        env = fade_in * fade_out * 0.12

        sample_val = 0.0
        for f_idx, f in enumerate(freqs):
            detune = 1.0 + 0.003 * math.sin(t * 3.0 + f_idx)
            val = (math.sin(2 * math.pi * f * t) * 0.6 + 
                   (math.sin(2 * math.pi * f * detune * t) ** 3) * 0.4)
            sample_val += val / len(freqs)

        pan_l = 0.5 + 0.2 * math.sin(t * 1.5)
        pan_r = 1.0 - pan_l
        add_sample(cur_s, sample_val * env * pan_l, sample_val * env * pan_r)

# 2. BASSLINE / 808 SUB
bass_notes = [
    (0.0, 4.8, 73.42),    # D2
    (4.8, 9.6, 58.27),    # Bb1
    (9.6, 14.4, 43.65),   # F1
    (14.4, 19.2, 65.41),  # C2
    (19.2, 23.5, 73.42)   # D2
]

for start_t, end_t, base_f in bass_notes:
    s_start = int(start_t * SAMPLE_RATE)
    s_end = int(end_t * SAMPLE_RATE)
    for i in range(s_end - s_start):
        t = i / SAMPLE_RATE
        cur_s = s_start + i
        if cur_s >= TOTAL_SAMPLES:
            break
        fade = min(1.0, t / 0.1) * min(1.0, (s_end - cur_s) / (SAMPLE_RATE * 0.2))
        if cur_s / SAMPLE_RATE > 22.0:
            fade *= max(0.0, (24.0 - cur_s / SAMPLE_RATE) / 2.0)
        sub = math.sin(2 * math.pi * base_f * t)
        harm2 = math.sin(2 * math.pi * (base_f * 2) * t) * 0.35
        bass_val = (sub + harm2) * 0.22 * fade
        add_sample(cur_s, bass_val, bass_val)

# 3. DRUMS: KICK, CLAP/SNARE, HI-HATS (110 BPM)
BPM = 110.0
BEAT_DUR = 60.0 / BPM  # ~0.5454s

def add_kick(hit_time, punch=1.0):
    start_s = int(hit_time * SAMPLE_RATE)
    kick_len = int(0.35 * SAMPLE_RATE)
    for i in range(kick_len):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        if cur_s >= TOTAL_SAMPLES:
            break
        f = 45.0 + 95.0 * math.exp(-t * 28.0)
        env = math.exp(-t * 12.0)
        click = noise() * math.exp(-t * 80.0) * 0.2
        val = (math.sin(2 * math.pi * f * t) + click) * env * 0.45 * punch
        add_sample(cur_s, val, val)

def add_snare(hit_time, punch=1.0):
    start_s = int(hit_time * SAMPLE_RATE)
    snare_len = int(0.28 * SAMPLE_RATE)
    for i in range(snare_len):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        if cur_s >= TOTAL_SAMPLES:
            break
        body = math.sin(2 * math.pi * 185.0 * t) * math.exp(-t * 22.0) * 0.25
        snap = noise() * math.exp(-t * 16.0) * 0.35
        val = (body + snap) * punch
        add_sample(cur_s, val * 0.95, val * 1.05)

def add_hihat(hit_time, vol=0.15):
    start_s = int(hit_time * SAMPLE_RATE)
    hat_len = int(0.06 * SAMPLE_RATE)
    for i in range(hat_len):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        if cur_s >= TOTAL_SAMPLES:
            break
        val = noise() * math.exp(-t * 60.0) * vol
        pan = 0.4 + 0.2 * ((cur_s % 3) / 3.0)
        add_sample(cur_s, val * pan, val * (1.0 - pan))

current_beat = 0
while current_beat * BEAT_DUR < 22.5:
    t = current_beat * BEAT_DUR
    bar_pos = current_beat % 4

    if bar_pos == 0:
        add_kick(t, 1.0)
    elif bar_pos == 2.5:
        add_kick(t, 0.8)
    elif bar_pos == 2 and current_beat > 8:
        add_kick(t, 0.9)

    if bar_pos == 2:
        add_snare(t, 0.95)

    add_hihat(t, 0.12)
    add_hihat(t + BEAT_DUR * 0.5, 0.08)
    
    current_beat += 1

# 4. SOUND EFFECTS & UI FOLEY
def add_riser(start_t, dur_t, f_start=150.0, f_end=800.0, vol=0.18):
    start_s = int(start_t * SAMPLE_RATE)
    total_s = int(dur_t * SAMPLE_RATE)
    for i in range(total_s):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        if cur_s >= TOTAL_SAMPLES:
            break
        prog = i / total_s
        f = f_start + (f_end - f_start) * (prog ** 2)
        env = (prog ** 1.8) * vol
        sample = (math.sin(2 * math.pi * f * t) + noise() * 0.3) * env
        add_sample(cur_s, sample * (1.0 - prog * 0.3), sample * (0.7 + prog * 0.3))

def add_ui_click(hit_t, f=1200.0, vol=0.15):
    start_s = int(hit_t * SAMPLE_RATE)
    dur_s = int(0.04 * SAMPLE_RATE)
    for i in range(dur_s):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        if cur_s >= TOTAL_SAMPLES:
            break
        sample = math.sin(2 * math.pi * f * t) * math.exp(-t * 90.0) * vol
        add_sample(cur_s, sample, sample)

def add_whoosh(start_t, vol=0.25):
    start_s = int(start_t * SAMPLE_RATE)
    dur_s = int(0.4 * SAMPLE_RATE)
    for i in range(dur_s):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        if cur_s >= TOTAL_SAMPLES:
            break
        env = math.sin(math.pi * (i / dur_s)) ** 2 * vol
        val = noise() * env
        add_sample(cur_s, val, val)

# Cue points for the 5 scenes:
# Scene 1: t=0.0s (Intro drop)
add_kick(0.0, 1.2)
add_whoosh(0.1, 0.25)
add_ui_click(1.2, 1400.0, 0.2)

# Scene 2: t=4.5s (Multi-Page Architecture)
add_riser(3.8, 0.7, 120.0, 600.0, 0.16)
add_whoosh(4.5, 0.3)
add_kick(4.5, 1.1)
add_ui_click(5.5, 1046.5, 0.15)
add_ui_click(6.5, 1318.5, 0.15)
add_ui_click(7.5, 1567.9, 0.15)

# Scene 3: t=9.0s (Backend & Postgres CRM)
add_riser(8.3, 0.7, 180.0, 750.0, 0.18)
add_whoosh(9.0, 0.3)
add_snare(9.0, 1.1)
add_ui_click(9.8, 1200.0, 0.18)
add_ui_click(10.4, 1500.0, 0.2)
add_ui_click(11.2, 1800.0, 0.22)

# Scene 4: t=14.0s (Core Web Vitals 90+ Everywhere)
add_riser(13.2, 0.8, 160.0, 850.0, 0.2)
add_whoosh(14.0, 0.35)
add_kick(14.0, 1.3)
for cnt_i in range(12):
    add_ui_click(14.4 + cnt_i * 0.12, 1100.0 + (cnt_i % 4) * 220.0, 0.08)

# Scene 5: t=19.0s (Shutter Outro & Deliverables)
add_whoosh(18.6, 0.35)
add_snare(19.0, 1.2)
add_kick(19.0, 1.3)
add_ui_click(20.0, 1046.5, 0.18)
add_ui_click(20.5, 1318.5, 0.2)

# Master Limiting
wav_file = wave.open("brag-output/work/soundtrack.wav", "w")
wav_file.setnchannels(2)
wav_file.setsampwidth(2)
wav_file.setframerate(SAMPLE_RATE)

max_peak = 0.001
for i in range(TOTAL_SAMPLES):
    max_peak = max(max_peak, abs(left_channel[i]), abs(right_channel[i]))

gain = 0.85 / max_peak

frames_data = bytearray()
for i in range(TOTAL_SAMPLES):
    l = max(-1.0, min(1.0, left_channel[i] * gain))
    r = max(-1.0, min(1.0, right_channel[i] * gain))
    frames_data.extend(struct.pack('<hh', int(l * 32767.0), int(r * 32767.0)))

wav_file.writeframes(frames_data)
wav_file.close()

print(f"Soundtrack generated: brag-output/work/soundtrack.wav (dur={DURATION}s, peak={max_peak:.3f}, gain={gain:.3f})")
