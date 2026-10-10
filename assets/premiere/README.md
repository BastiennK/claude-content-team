# Premiere Pro editing kit

The editor and motion designer refer to files in this folder by category, so keep the names descriptive (e.g. `whoosh-fast-01.wav`, `zoom-punch-in-110.prfpset`).

## What these things are called in Premiere

| What you want | Premiere name | File type | Where it goes in Premiere |
|---|---|---|---|
| Saved zooms, shakes, transitions, colour looks built from effects | **Effect Presets** | `.prfpset` | **Effects** panel → **Presets** (right-click → **Import Presets…**) |
| Animated titles, lower thirds, callouts, caption styles | **Motion Graphics Templates** ("MOGRTs") | `.mogrt` | **Essential Graphics** panel → **Browse** → install (or drag the file into the panel) |
| Colour grades | **LUTs** | `.cube` | **Lumetri Color** → Creative → Look (or Basic → Input LUT) |
| Light leaks, film grain, glitch overlays | Overlay clips | `.mov` / `.mp4` | Timeline, above the footage, with a blend mode (Screen or Add) |

A "transition pack" you buy online is usually a set of Effect Presets or Motion Graphics Templates, sometimes with a plugin installer.

## Folders
- `presets/`: Effect Presets: `transitions/`, `zooms-and-shakes/` (punch-ins and camera shakes are the workhorses of fast-paced edits), `text-animations/`, `color/`.
- `mogrt/`: Motion Graphics Templates: `titles/`, `lower-thirds/`, `callouts/` (arrows, highlight boxes, tool labels), `captions/` (caption styles for Reels), `social/` (subscribe and follow prompts).
- `sfx/`: sound effects by job: `whoosh/` (transitions), `pop/` (text and graphics appearing), `riser/` (build-up before a reveal), `impact/` (key claims), `click-and-ui/` and `typing/` (screen recordings), `glitch/`, `ding-and-success/` (results), `swoosh-text/`, `ambient/` (room tone).
- `music/`: background tracks, with the licence noted in the file name or a text file next to them.
- `luts/`: `.cube` colour looks.
- `overlays/`: light leaks, grain, glitch and paper textures.

## Making your own presets (the fastest win)
1. Build the effect once on a clip, e.g. Scale 100 → 110 over 4 frames with ease for a punch-in.
2. In **Effect Controls**, select the effects, right-click → **Save Preset…**, and name it clearly.
3. To share or back it up: in the **Effects** panel, right-click the preset → **Export Preset…** into `presets/`.
Good first presets: punch-in 110% and 120%, slow push-in over 3 s, camera shake (light and heavy), whip-pan blur, flash-cut white, and a 6-frame zoom transition.

## Where to get assets (check each licence)
- **Built in:** Premiere's Essential Graphics panel includes templates; Adobe Stock has a free section of Motion Graphics Templates, browsable from that panel.
- **Free:** Mixkit (sound effects, music and Premiere templates), Pixabay (sound effects and music), YouTube Audio Library (music and SFX for YouTube; check before using in Instagram Reels).
- **Paid, broad licences:** Envato Elements (templates, presets, SFX and music in one subscription), Epidemic Sound or Artlist (music and SFX licensed for YouTube and Instagram).

Licences differ by platform. Music cleared for YouTube is not automatically cleared for Instagram. Keep a note of where each music track came from.
