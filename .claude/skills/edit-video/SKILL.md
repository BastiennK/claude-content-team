---
name: edit-video
description: Plan and prepare a Premiere Pro edit, with motion graphics, for a recorded long-form video, plus Reels cut-downs. Presents the edit plan for approval before producing cut lists, SFX cues, captions and Remotion graphics. Use when the creator has recorded footage and wants it edited.
---

# Edit a video

1. **Find the project** in `projects/` and check for `edit/transcript.txt` or an `.srt`. If neither exists, tell the creator how to export one from Premiere (**Window → Text → Transcript → Transcribe**, then export with timecodes into `projects/<video>/edit/`), and wait.
2. **Plan (phase 1):** run the `video-editor` agent in phase 1. If its plan includes motion graphics, run the `motion-designer` agent in phase 1 on that list too.
3. **Present one combined plan:** structure with timings, what gets cut and the final length, the retention plan, motion graphics (what, when, style), and the 5 Reels moments.
4. **Stop and wait** for approval or changes. Nothing else gets produced until the creator says go.
5. **Build (phase 2):** run the `video-editor` agent to produce the edit kit, and the `motion-designer` agent for approved graphics. They can run in parallel. If Remotion isn't set up yet, ask before installing it.
6. **Report** a checklist the creator can follow in Premiere, in order: apply the cut list, place B-roll and screen recordings, drop in the motion renders, lay the SFX from the cue sheet, add music, import the captions, export. Then build the Reels from `edit/reels/`.
