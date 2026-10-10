---
name: weekly-plan
description: Build this week's content plan, with 3 long-form video options and 7 Instagram Reels ideas, from trend research and Outlier data. Use when the creator says "weekly plan", "what should I post this week" or "plan my week".
---

# Weekly content plan

1. **Check Outlier is running:** `node tools/outlier.mjs --status`. If it isn't, tell the creator to start it (Start-Outlier.cmd) and continue with research only, saying so in the plan.
2. **Run in parallel:**
   - the `trend-researcher` agent: this week's briefing, saved to `research/<today>-briefing.md`, including a `last30days` community-pulse run on the top 1–3 stories;
   - the `ideas-strategist` agent: top long-form outliers from the last 30 days, plus rising videos from the last 7 days, with why each worked.
3. **Combine:** give the strategist the briefing and ask for **3 long-form options**, ranked. Prefer ideas backed by both a news trend and outlier evidence. Each option gets title options, hook, evidence, outline and urgency (see the strategist's format).
4. **Reels for the week:** take the strongest competitor long-form outlier behind the top pick and get its **5 short-form ideas**, plus 2 more from news-driven stories in the briefing: 7 Reels in total, one per day. Spread the angles so no two days feel the same.
5. **Present one plan** on a single screen:
   - long-form options 1–3 (title, one-line hook, evidence, urgency), with a recommendation;
   - the Reels calendar, Monday to Sunday (hook line + angle + source);
   - anything time-sensitive, flagged at the top.
6. **Stop.** Ask the creator to pick the long-form video. Once they pick, create `projects/<date>-<slug>/brief.md` with the full brief and save the Reels plan to `projects/<date>-<slug>/shorts/plan.md`. Don't start thumbnails or editing until asked.
