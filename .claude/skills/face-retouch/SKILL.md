---
name: face-retouch
description: Make the creator's face look sharp, bright and "thumbnail quality" in Photoshop - from shooting the photo to the final retouch. Includes a script for the repeatable steps and a short manual pass. Use whenever a thumbnail uses the creator's face, or when the creator says the face looks low quality, blurry, dull, washed out or "webcam".
---

# Face retouch for thumbnails

The goal: a face that looks crisp and bright at phone size (about 250 px wide) and still looks like the creator. **Never reshape the face, change the expression with AI, or make skin look plastic.** The creator's real face is the brand.

## 1. Fix the source first (the biggest win by far)
A webcam frame (1080p, small sensor, flat light) caps how good any retouch can look. Before retouching, check whether a reshoot is possible:
- **Camera:** the phone's *rear* camera (not the selfie camera, not the webcam), in photo mode at full resolution. Use the 1x lens and stand about 1 m away; don't use the ultra-wide.
- **Light:** face a window (daylight, no direct sun), or put one soft lamp in front of you and slightly to one side. Avoid overhead room light only.
- **Background:** plain wall, about 1 m behind you, so Select Subject gives a clean edge (hair especially).
- **Framing:** chest up, camera at eye level, extra space around the hands if the pose uses them.
- **Expression:** take 10+ shots and pick the one where the eyes are open and the expression reads from across the room. Big, clear emotion beats subtle.
- **Focus:** tap to focus on the eyes; check the eyes are sharp at 100% zoom before using the shot.

If reshooting isn't possible, continue with what there is and say honestly how far it can go.

## 2. Run the script (repeatable part, about 10 seconds)
Script: `.claude/skills/face-retouch/face-retouch.jsx`. In Photoshop, select the **photo layer** (the cut-out), then **File → Scripts → Browse…** and pick it. It is non-destructive:
1. Converts the photo to a **Smart Object** (the cut-out mask goes inside it).
2. Adds a **Camera Raw Filter** as an editable Smart Filter: Exposure +0.10, Contrast +12, Highlights −50, Shadows +30, Blacks −12, Clarity +12, Vibrance +12, Sharpening 50, Noise Reduction 20. Double-click it in the Layers panel to tweak.
3. Adds two **clipped adjustment layers**: a soft Curves S-curve (contrast) and Vibrance +25 (healthier skin). Lower either layer's opacity if it's too strong.
Any step that fails in a given Photoshop version is skipped and listed in the closing message. Do those by hand.

**Settings at the top of the script** (edit them in a text editor before running, or have Claude set them):

| Photo | FR_TEMPERATURE | FR_YELLOWS | FR_CLARITY | FR_SHARPEN | FR_VIBRANCE |
|---|---|---|---|---|---|
| Webcam, daylight (default) | 0 | 0 | 10 | 40 | 25 |
| **Phone, warm lamp light** | **−15** | **−30** | **6** | **30** | **10** |

**Over-processing is the most common failure.** Pushing Clarity, Texture or Sharpening high makes skin look painted, puts red and purple blotches on hands and leaves bright fringes around fingers. If the result looks "HDR", lower those first. Phone photos are already sharp, so they need very little.

**Tested in Photoshop 2026 (27.1) on real thumbnails.** Lessons:
- An extra Unsharp Mask on a cut-out draws a dark halo around the hair, so the script uses Camera Raw sharpening only.
- Exposure above +0.15 plus a brightness layer blew out the forehead on a webcam shot. Keep highlights pulled down.

## 3. Manual pass (2–5 minutes, needs an eye)
Do these in order on the Smart Object, checking at 100% and at phone size:
1. **Fine-tune the Camera Raw Filter** the script added (double-click "Camera Raw Filter" under the photo layer). Typical ranges for a webcam or phone shot:
   - Exposure +0.20 to +0.40, Contrast +10, Highlights −30, Shadows +25, Whites +15, Blacks −10.
   - Texture +15, Clarity +8 (not more; it ages skin), Dehaze +5.
   - Vibrance +10, Saturation 0. White balance: warm slightly (Temp +3 to +6) if the skin looks grey or blue.
   - Detail tab: Sharpening 40, Noise Reduction 15–25 for webcam noise.
2. **Neural Filters** (Filter → Neural Filters), only if needed:
   - **JPEG Artifacts Removal** (Low or Medium) for blocky webcam compression.
   - **Skin Smoothing**, blur 10–20 and smoothness 0–10. Keep it subtle; pores should still show at 100%.
   - **Super Zoom** only if the face is being enlarged a lot. Compare before and after, and don't use it if it changes the face.
   - Neural Filters may need downloading the first time; they are optional.
3. **Blemishes:** remove temporary spots (pimples, red marks, scratches) but **keep permanent features** (moles, freckles, scars) unless the creator asks. Removing them makes the face look "off" to people who know them.
   - By hand: double-click the photo Smart Object's thumbnail to open its contents, add an empty layer, then use the **Spot Healing Brush** (J) with "Sample All Layers" on and a brush slightly bigger than the spot. Click each spot once, then save and close the contents.
   - Automated: open the Smart Object contents (`placedLayerEditContents`), select a small feathered circle on each spot and run Content-Aware Fill (`Fl  ` with `contentAware`). Map coordinates from the original photo with the layout's scale and offset, then subtract the photo layer's bounds, because the Smart Object holds the thumbnail-size pixels, not the original photo. Back up the PSD first.
   - Check at 300% and at phone size. If a spot is invisible at phone size, it doesn't matter.
4. **Eyes** (the face is judged by the eyes):
   - New Curves layer, clipped, raised a little. Invert its mask (Ctrl+I) and paint white over the irises and the whites of the eyes at 30–50% brush opacity.
   - Don't make the whites pure white.
5. **Separation from the background:**
   - On white backgrounds: a soft drop shadow on the photo layer (black, 15–25% opacity, distance 8–12 px, size 25–40 px).
   - On dark backgrounds: a thin white or light **outer stroke** (6–10 px) or an outer glow.
6. **Rim light (optional, for "pro" look):** Layer Style → Inner Glow, a warm or white colour, Screen, 20–35% opacity, size 10–20 px, edge only. It fakes a back light and makes the cut-out look intentional.
7. **Local colour hotspots** (e.g. a yellow forehead from an overhead lamp): global white balance can't fix light that only hits one area. Add a clipped Hue/Saturation layer (Yellows −55 to −60, Reds −20), fill its mask black, and paint white only over the hotspot with a soft brush, or start from a feathered ellipse selection.
8. **Colour match:** the face should feel lit by the scene. If cards or background are cool, keep skin neutral; if warm, warm skin slightly. Don't push skin orange.

## 4. Quality check before export
- **Phone size:** zoom the canvas to about 20% (or view at about 250 px wide). Can you read the expression instantly? Are the eyes visible?
- **100% check:** no halos around the hair, no plastic skin, no crunchy over-sharpening on the edges.
- **Greyscale check** (View → Proof Setup → Monitor Greyscale, or a temporary Black & White layer): the face should stand out by brightness, not only by colour.
- **Likeness:** it still looks exactly like the creator on a good day.
- Export: File → Export → Export As, JPG, 1280×720, quality 80–90, under 2 MB.

## Honest limits
- Retouching can't add detail the camera never captured. Heavy upscaling or AI "enhance" on a soft webcam face tends to look waxy or slightly wrong. When the face is the main element, a 2-minute reshoot with a phone and a window beats 30 minutes of retouching.
- Generative or AI tools that alter the face (expression changes, face reshaping, "beautify") are off-limits unless the creator asks for them explicitly.
