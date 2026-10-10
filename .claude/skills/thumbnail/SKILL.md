---
name: thumbnail
description: Design a YouTube thumbnail. Presents 3 concepts in with-face and no-face versions for approval, then builds the chosen ones as layered Photoshop files. Use when the creator asks for a thumbnail or thumbnail ideas.
---

# Thumbnail

1. **Identify the video.** Use the project folder in `projects/` the creator names, or the most recent one. If there's no brief, ask for the title (or title options) and the main hook in one message.
2. **Concepts (phase 1):** run the `thumbnail-designer` agent in phase 1 with the brief. It must study outlier thumbnails for similar ideas and return 3 concepts × with face / without face.
3. **Present** the concepts compactly: for each, the three elements, a layout line for each version, the palette with hex codes, the text, and the inspiration. Include the designer's recommendation.
4. **Stop and wait.** Ask which concept(s) and version(s) to build, and whether anything should change. Don't build anything yet.
5. **Build (phase 2):** once the creator chooses, run the `thumbnail-designer` agent in phase 2 for exactly those. Report the `.jsx` and `finishing-steps.md` paths, and how to run the script: in Photoshop, **File → Scripts → Browse…**, then select the `.jsx`.
6. If the creator later shares an exported thumbnail, ask the designer to review it and return 3 ranked fixes.
