# Content team: channel brief and operating rules

This folder is a content team for a YouTube long-form channel and an Instagram Reels account. Every agent and skill in `.claude/` works from this brief. **Fill in the brief below with your own channel.** It is the single biggest driver of output quality, so keep it up to date.

> Lines in `<angle brackets>` are placeholders. Replace them, then delete this note.

## Channel brief

**Positioning:** `<one sentence: who you are and what the channel promises, e.g. "A 20-year-old using AI to make real money, and showing you exactly how.">` Every idea should answer: how does this deliver on that promise, and what does your real experience add?

**Who the creator is:** `<age, background, what you do, what makes you credible. Keep private details out of this file if the repo is public.>`

**Niche:** `<e.g. AI and business: how AI helps businesses, new AI tools, AI news, business more broadly.>`

**Content pillars** (with the weekly Reels mix in brackets):
1. `<Pillar 1 (~50%, 3–4 Reels)>`
2. `<Pillar 2 (~30%, 2 Reels)>`
3. `<Pillar 3 (~20%, 1–2 Reels)>`

Tag every planned idea with its pillar, and track follows per 1k views, saves and "how do I do this?" comments per pillar so you can shift the mix towards what works.

**Audience:** `<who they are, e.g. "from a 17-year-old trying to make money online to a 30-year-old business owner who wants to get on top of AI">`. Write so all of them get value: concrete, practical, no jargon without a one-line explanation. Primary markets: `<countries>`.

**Creator and tone:** `<e.g. "Informative but not too serious. The feeling is 'I just discovered something crazy and I have to show you', backed by real knowledge.">` Credibility comes from showing the thing working, real numbers and specific steps.

**Income and results claims:** only use numbers you can back with proof. Never round up or inflate. This matters even more once you sell anything.

**How you film long-form:** `<e.g. "I talk in my own words and don't read scripts. Give me a beat outline: a real story, the first 3 seconds and first 30 seconds do the hooking, something goes wrong → a fix → it gets better, and re-hook check-ins every 60–90 seconds.">`

**Formats and schedule**
- YouTube long-form: `<1 per week, 8–10 minutes>`.
- Instagram Reels: `<1 per day, 20–60 seconds>`.
- One competitor long-form outlier should yield 5 short-form ideas.

**Creators to learn from** (study, never copy): `<names and links>`.

**Tools you have:** `<e.g. Photoshop (thumbnails), Premiere Pro (editing), Media Encoder, an iPhone for filming, a clip-on mic, ffmpeg>`.

**Branding:** `<fixed colours/fonts, or "no house style; thumbnails follow design and colour theory per video">`. `<Your thumbnail preferences, e.g. "white, clean, minimalist backgrounds; always include headline text; one focal point, about 3 elements, readable at phone size">`.

## Operating rules for every agent

1. **Plan before you spend.** Before any edit, thumbnail build, motion graphic or other heavy work, present the rough structure and the ideas behind it, then stop and wait for the creator's go-ahead. Only research, outlier lookups and planning happen without approval. A plan should fit on one screen.
2. **Adapt, never copy.** Outliers and other creators are evidence of demand. Take the angle, the curiosity gap or the format, then make it ours. Never reuse someone's title verbatim, thumbnail layout one-to-one, script or footage.
3. **Show your evidence.** When an idea is based on an outlier, cite the video (link, score, views, channel size). When it's based on news, cite the source and date. Say when something is a guess.
4. **Be specific.** Exact titles, hooks, hex colours, timestamps, file names. "Make it engaging" is not an instruction.
5. **Verify facts in AI news.** Tools, prices and features change weekly. Check the official source before a claim goes into a script, and flag anything unconfirmed.
6. **Write in the creator's voice.** Anything the creator will say or post (hooks, scripts, Reels lines, captions) follows `voice/VOICE.md`.
7. **Save work to the project folder** (see the layout below) so nothing lives only in chat.

## Skill packs (optional, installed separately)

These open-source packs plug into the team. See the README for install steps. **This file's rules override them** (plan before spending, long-form outliers only, the creator's voice). The team's own `/thumbnail`, `/edit-video`, `/weekly-plan`, `/shorts-from-outlier` and `/face-retouch` stay the main workflows; the packs are tools inside them.

- **`/youtube`** ([claude-youtube](https://github.com/AgriciDaniel/claude-youtube)): `script`, `hook`, `seo`, `metadata`, `competitor`, `ideate`, `analyze`, `repurpose`, `monetize`, `strategy`.
- **Instagram** ([instagram-agent-skill](https://github.com/Jakeschincariol/instagram-agent-skill)): `/ig-reel`, `/ig-caption`, `/ig-human`, `/ig-repurpose`, `/ig-plan`, `/ig-viral`, `/ig-profile`. Where they say `~/.claude/instagram/voice.md`, use `voice/VOICE.md`, and keep their `swipe.md`, `plan.md` and `log.md` in this folder's `instagram/`.
- **Marketing** ([marketingskills](https://github.com/coreyhaines31/marketingskills)): `copywriting`, `copy-editing`, `content-strategy`, `social`, `marketing-psychology`. Their context file is `.claude/product-marketing.md`.
- **`/last30days <topic>`** ([last30days-skill](https://github.com/mvanhorn/last30days-skill)): what people said about a topic in the last 30 days on Reddit, YouTube, Hacker News and more, ranked by engagement.

## Transcripts

The optional `youtube-transcript` MCP server (see `.mcp.json` and the README) fetches the transcript of any public YouTube video that has captions. Use it to read what an outlier actually says before adapting it. Read one video at a time; never paste a competitor's lines into a script.

## Folder layout

- `projects/YYYY-MM-DD-short-slug/`: one folder per long-form video, containing `brief.md` (idea, title, hook, outline), `research.md`, `thumbnail/` (concepts, Photoshop scripts, exports), `edit/` (edit plan, cut list, SFX cues, captions) and `shorts/` (the 5+ Reels made from it).
- `research/`: weekly trend briefings, named `YYYY-MM-DD-briefing.md`.
- `inspiration/`: thumbnails downloaded from outliers, by date.
- `assets/premiere/`: editing kit (presets, Motion Graphics Templates, sound effects, music, LUTs, overlays). See its README.
- `remotion/`: motion graphics project, once set up.
- `tools/outlier.mjs`: command-line access to an outlier finder (below).

## Outlier data (optional)

`tools/outlier.mjs` queries a local YouTube outlier finder at `http://127.0.0.1:3210` (set `OUTLIER_URL` to change it). It's a separate tool and isn't included in this repo. Without it, the team still works from web research and transcripts; replace the script with your own data source if you have one.

```
node tools/outlier.mjs --days 30 --min-score 3 --limit 25
```

**Long-form only:** the team only uses long-form outliers as evidence, including when generating Reels ideas (5 Reels per long-form outlier). Judge each result's relevance to the channel before using it.
