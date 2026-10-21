# 🎙️ myVoice Engine

A real-time, low-latency modular digital signal processing (DSP) pipeline and AI voice conversion engine built in Python, PyTorch, and NumPy.

---

## ⚡ System Architecture

`myVoice` operates on a deterministic, low-latency block-streaming pipeline designed to ingest microphone audio, process it through an arbitrary sequence of DSP effects, pass it through deep-learning voice conversion models, and output artifact-free audio with minimal roundtrip delay.

```
[ Microphone Input ] 
       │ (sounddevice / PyAudio)
       ▼
 [ RingBuffer (In) ]
       │
       ▼
 [ Scheduler Thread ] ──► [ AudioPipeline Stages (Ordered) ]
                               ├── Gain & DC Offset Removal
                               ├── Noise Gate & Dynamics
                               ├── Multi-band Filter Bank (HPF/LPF/BPF)
                               ├── Formant Shifter
                               ├── RVC Inference Stage (PyTorch ROCm / CUDA)
                               ├── Soft / Hard Clipper
                               └── Limiter & Normalizer
                                       │
                                       ▼
                              [ RingBuffer (Out) ]
                                       │
                                       ▼
                              [ Speaker / Virtual Cable ]
```

---

## 🎛️ DSP & Effects Suite

The engine provides an extensible, modular stage abstraction (`core.stage.Stage`):

### 1. Dynamics & Levels
* **Noise Gate:** Configurable threshold, attack, hold, and release envelopes to eliminate ambient noise during silence.
* **Peak Limiter & Soft Clipper:** Brickwall limiting with tanh-based soft-saturation curves to guarantee 0 dBFS ceiling without harsh digital clipping.
* **Auto-Normalizer:** Continuous peak and RMS dynamic leveling.

### 2. Spectral Filters
* **Biquad Filter Bank:** High-pass, Low-pass, Band-pass, and Band-stop filters implemented with optimized NumPy vectorization.
* **Telephone / Radio FX:** Band-limited resonant frequency curve simulating vintage transceiver acoustics.

### 3. Voice Modification
* **Formant Shifter:** Independent vocal tract length manipulation without modifying fundamental pitch ($F_0$).
* **Resampler:** High-fidelity sinc/linear sample rate conversion between device sample rates (44.1 kHz / 48 kHz) and inference model rates (16 kHz / 40 kHz).

---

## 🤖 Neural Voice Conversion (RVC Backend)

`myVoice` integrates an optimized local inference pipeline for **Retrieval-based Voice Conversion (RVC)**:

* **Hardware Acceleration:** Native PyTorch tensor pipelines supporting AMD ROCm (HIP), NVIDIA CUDA, and multi-threaded CPU fallbacks.
* **RMVPE Pitch Extraction:** Robust Model for Vocal Pitch Estimation delivering artifact-free $F_0$ contour tracking under noisy acoustic conditions.
* **Streaming Hop Architecture:** Chunk-based inference utilizing sliding context windows (`hop_size = 3840`, `context_size = 2560`) to eliminate phase discontinuities and seam clicks.
* **Thread-Safe Locks:** Reentrant execution locks ensuring inference threads never block real-time audio callback deadlines.

---

## 🖥️ User Interfaces & Controls

`myVoice` provides dual operational modes:

### 1. Interactive GUI (`run_gui.py`)
* Full parameter controls for active audio interfaces (input/output channels, buffer size, sample rate).
* Live stage toggles, slider controls for gain, pitch offset, gate thresholds, and filter cutoff frequencies.
* Real-time audio metering.

### 2. Headless CLI (`main.py`)
* Lightweight daemon execution configured via structured TOML configuration files.
* Ultra-low resource consumption ideal for background service execution.

---

## 🚀 Getting Started

### Prerequisites
* Python 3.10+
* PortAudio development libraries:
  ```bash
  sudo apt install portaudio19-dev libasound2-dev
  ```

### Installation
```bash
git clone https://github.com/craterworldstudio/myVoice.git
cd myVoice
pip install -r requirements.txt
```

### Execution
```bash
# Launch interactive GUI
python main.py --gui

# Or run headless engine with active TOML config
python main.py
```
