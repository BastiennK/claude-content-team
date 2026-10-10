---
name: shorts-from-outlier
description: Turn one long-form outlier video (a competitor's or the creator's own) into 5 Instagram Reels ideas with hooks and scripts. Use when the creator shares a YouTube link or says "5 shorts from this" or "Reels ideas from that outlier".
---

# 5 Reels from one long-form outlier

1. **Get the video.** Use the YouTube link the creator gave. If none, run `node tools/outlier.mjs --days 30 --limit 10` and suggest the top 3 relevant candidates to choose from (stop and ask).
2. **Understand it.** Fetch the transcript with the `youtube-transcript` tool (`get_transcript`, the video URL) and read it, so the Reels are based on what the video actually says. Add the Outlier stats (score, views, channel size). If the transcript isn't available (no captions), use the title, description and web research, and say so.
3. **Run the `ideas-strategist` agent** to produce exactly 5 Reels with different angles (reveal, tutorial, myth-bust, reaction/test, list/comparison). Each has the hook (spoken and on-screen), a beat-by-beat script under 60 seconds, the on-screen text and the CTA, all in the creator's voice.
4. **Present** them as a numbered list, ending with which one to film first and why.
5. If the creator wants to keep them, save to `projects/<date>-<slug>/shorts/plan.md`, or `research/reels-<date>.md` if they aren't tied to a long-form video.
