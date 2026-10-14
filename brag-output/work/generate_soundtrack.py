import wave
import math
import struct
import os

SAMPLE_RATE = 44100
DURATION = 22.0
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION)

# Sound generation buffers (left and right channels)
left_channel = [0.0] * TOTAL_SAMPLES
right_channel = [0.0] * TOTAL_SAMPLES

def add_sample(t_idx, l_val, r_val):
    if 0 <= t_idx < TOTAL_SAMPLES:
        left_channel[t_idx] += l_val
        right_channel[t_idx] += r_val

def noise():
    import random
    return random.uniform(-1.0, 1.0)

# 1. SYNTH CHORDS / PADS
# Chord progression (D minor scale):
# 0s - 4.4s: Dm9 (D3=146.83, F3=174.61, A3=220.0, C4=261.63, E4=329.63)
# 4.4s - 8.8s: Bbmaj7 (Bb2=116.54, D3=146.83, F3=174.61, A3=220.0)
# 8.8s - 13.2s: Fmaj9 (F2=87.31, C3=130.81, G3=196.0, A3=220.0, E4=329.63)
# 13.2s - 17.6s: C9 (C3=130.81, G3=196.0, D4=293.66, E4=329.63)
# 17.6s - 22.0s: Dm (D2=73.42, A2=110.0, D3=146.83, F3=174.61)

chords = [
    (0.0, 4.4, [146.83, 174.61, 220.0, 261.63, 329.63]),
    (4.4, 8.8, [116.54, 146.83, 174.61, 220.0]),
    (8.8, 13.2, [87.31, 130.81, 196.0, 220.0, 329.63]),
    (13.2, 17.6, [130.81, 196.0, 293.66, 329.63]),
    (17.6, 22.0, [73.42, 110.0, 146.83, 174.61])
]

for start_t, end_t, freqs in chords:
    start_s = int(start_t * SAMPLE_RATE)
    end_s = int(end_t * SAMPLE_RATE)
    chord_len = end_s - start_s
    for i in range(chord_len):
        t = i / SAMPLE_RATE
        cur_s = start_s + i
        # Envelope: soft attack, sustained, soft release
        fade_in = min(1.0, t / 0.3)
        time_left = (end_s - cur_s) / SAMPLE_RATE
        fade_out = min(1.0, time_left / 0.4)
        if cur_s / SAMPLE_RATE > 20.0:
            fade_out *= max(0.0, (22.0 - cur_s / SAMPLE_RATE) / 2.0)
        env = fade_in * fade_out * 0.12

        sample_val = 0.0
        for f_idx, f in enumerate(freqs):
            # Rich detuned saw/sine mixture with stereo widening
            detune = 1.0 + 0.003 * math.sin(t * 3.0 + f_idx)
            val = (math.sin(2 * math.pi * f * t) * 0.6 + 
                   (math.sin(2 * math.pi * f * detune * t) ** 3) * 0.4)
            sample_val += val / len(freqs)

        pan_l = 0.5 + 0.2 * math.sin(t * 1.5)
        pan_r = 1.0 - pan_l
        add_sample(cur_s, sample_val * env * pan_l, sample_val * env * pan_r)

# 2. BASSLINE / 808 SUB
bass_notes = [
    (0.0, 4.4, 73.42),    # D2
    (4.4, 8.8, 58.27),    # Bb1
    (8.8, 13.2, 43.65),   # F1
    (13.2, 17.6, 65.41),  # C2
    (17.6, 21.5, 73.42)   # D2
]

for start_t, end_t, base_f in bass_notes:
    s_start = int(start_t * SAMPLE_RATE)
    s_end = int(end_t * SAMPLE_RATE)
    for i in range(s_end - s_start):
        t = i / SAMPLE_RATE
        cur_s = s_start + i
        if cur_s >= TOTAL_SAMPLES:
            break
        # Soft sub-bass with gentle saturation
        fade = min(1.0, t / 0.1) * min(1.0, (s_end - cur_s) / (SAMPLE_RATE * 0.2))
        if cur_s / SAMPLE_RATE > 20.0:
            fade *= max(0.0, (22.0 - cur_s / SAMPLE_RATE) / 2.0)
        sub = math.sin(2 * math.pi * base_f * t)
        # 2nd harmonic for audibility on laptop speakers
        harm2 = math.sin(2 * math.pi * (base_f * 2) * t) * 0.35
        bass_val = (sub + harm2) * 0.22 * fade
        add_sample(cur_s, bass_val, bass_val)

# 3. DRUMS: KICK, CLAP/SNARE, HI-HATS
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
        # Pitch envelope 140Hz -> 45Hz
        f = 45.0 + 95.0 * math.exp(-t * 28.0)
        env = math.exp(-t * 12.0)
        # click transient
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

# Beat rhythm schedule
current_beat = 0
while current_beat * BEAT_DUR < 20.5:
    t = current_beat * BEAT_DUR
    bar_pos = current_beat % 4

    # Kick on 0 and 2.5
    if bar_pos == 0:
        add_kick(t, 1.0)
    elif bar_pos == 2.5:
        add_kick(t, 0.8)
    elif bar_pos == 2 and current_beat > 8:
        add_kick(t, 0.9)

    # Snare on 2
    if bar_pos == 2:
        add_snare(t, 0.95)

    # Hihats on eighth notes
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

# Impact at t=2.0s (ETHIXWEB logo drop)
add_kick(2.0, 1.3)
add_whoosh(1.7, 0.3)

# Riser into Scene 2 (t=3.8s)
add_riser(3.0, 1.0, 120.0, 500.0, 0.15)
add_ui_click(4.0, 1500.0, 0.2)
add_ui_click(4.15, 1800.0, 0.2)

# Terminal tick clicks in Scene 2
for tick_i in range(8):
    add_ui_click(5.0 + tick_i * 0.22, 900.0 + tick_i * 80.0, 0.08)

# Riser into Scene 3 (t=8.2s)
add_riser(7.8, 0.7, 200.0, 700.0, 0.18)
add_whoosh(8.4, 0.25)
# Security verification chimes
add_ui_click(9.2, 1046.5, 0.18) # C6
add_ui_click(9.5, 1318.5, 0.18) # E6
add_ui_click(9.8, 1567.9, 0.22) # G6

# Counter ticks in Scene 4 (t=13.0s - 15.0s)
for cnt_i in range(12):
    add_ui_click(13.4 + cnt_i * 0.12, 1200.0 + (cnt_i % 3) * 200.0, 0.09)

# Shutter snap and resolution into Scene 5 (t=17.5s)
add_whoosh(17.2, 0.3)
add_snare(17.5, 1.2)
add_kick(17.5, 1.2)
add_ui_click(18.2, 880.0, 0.15)
add_ui_click(18.5, 1174.6, 0.18)

# Master limiting & 16-bit PCM conversion
wav_file = wave.open("brag-output/work/soundtrack.wav", "w")
wav_file.setnchannels(2)
wav_file.setsampwidth(2)
wav_file.setframerate(SAMPLE_RATE)

max_peak = 0.001
for i in range(TOTAL_SAMPLES):
    max_peak = max(max_peak, abs(left_channel[i]), abs(right_channel[i]))

# Target -1.5 dB headroom peak
gain = 0.85 / max_peak

frames_data = bytearray()
for i in range(TOTAL_SAMPLES):
    l = max(-1.0, min(1.0, left_channel[i] * gain))
    r = max(-1.0, min(1.0, right_channel[i] * gain))
    l_int = int(l * 32767.0)
    r_int = int(r * 32767.0)
    frames_data.extend(struct.pack('<hh', l_int, r_int))

wav_file.writeframes(frames_data)
wav_file.close()

print(f"Soundtrack generated: brag-output/work/soundtrack.wav (dur={DURATION}s, peak={max_peak:.3f}, gain={gain:.3f})")
