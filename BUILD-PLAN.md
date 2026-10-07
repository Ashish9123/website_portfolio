# MASTER BUILD PLAN — ASHISH KUMAR
### Personal Brand + Software Engineering Portfolio
**Version 1.0 · 2026-10-07 · Creative Brief + Claude Code Implementation Spec**

---

## PART A — CREATIVE BRIEF

---

## 1. Website Overview

| | |
|---|---|
| **Client** | Ashish Kumar |
| **Title** | Full-Stack Software Engineer |
| **Site type** | Personal brand + software engineering portfolio |
| **Primary audience** | Recruiters, HR, hiring managers, engineering teams |
| **Secondary audience** | Collaborators, other developers |
| **Primary goal** | Get the visitor to **email Ashish** or **open his GitHub** |
| **Secondary goals** | Download the resume, view projects, connect on LinkedIn |
| **Format** | Static site: `index.html`, `style.css`, `script.js`, `/assets` |
| **Benchmark** | Awwwards Site of the Day: cinematic scroll storytelling, huge kinetic type, buttery scroll |

**The 5-second test:** within five seconds a recruiter should know three things:
1. **Who:** Ashish Kumar, Full-Stack Software Engineer.
2. **What:** he builds and ships full-stack, AI and cloud applications.
3. **Proof:** his GitHub, three featured projects and an 85% accuracy result are one scroll away.

**The 60-second test:** after one minute of scrolling a hiring manager should have seen the stack, three real projects with tech details, the deployment and CI/CD experience, his education, and a clear way to contact him.

---

## 2. Core Positioning

**Positioning statement**
> For engineering teams that need someone who can carry a feature from blank file to live URL, Ashish Kumar is a full-stack software engineer who builds, deploys and tests real applications across the frontend, backend, database, cloud and AI layers. Most new graduates only list technologies. Ashish shows shipped, deployed, version-controlled work.

**Brand line (primary):**
# I build software that moves from idea to production.

**Short tagline:** *Idea → Code → Cloud.*

**One-liner (refined):**
> I design, build and deploy full-stack applications, AI-powered tools and cloud systems that turn ideas into working products.

**Mission (refined):**
> To become the kind of engineer a team trusts with the whole path: idea, architecture, code, tests, deployment and the production system that comes after. I combine software engineering, cloud, AI and automation to build things that are useful and reliable.

**Key messages (in priority order)**
1. **End-to-end builder.** Frontend → API → Backend → Database → Cloud.
2. **Ships, doesn't just study.** Projects are deployed on Vercel and AWS EC2 and automated through Jenkins.
3. **AI-native.** Builds AI agent workflows and AI screening tools (85% matching accuracy).
4. **Quality-minded.** Writes test automation frameworks (Selenium, TestNG, Page Object Model, CI).
5. **Ready to grow.** A 2026 B.Tech CSE graduate looking for a fast-moving team and real ownership.

**Target roles (stated in the site's copy):** Software Engineer · Full-Stack Engineer · Frontend/Backend Engineer · Cloud/DevOps-leaning SWE · SDET.

---

## 3. Brand Personality

| Trait | Means | Does NOT mean |
|---|---|---|
| **Precise** | Clean grids, exact numbers, mono labels | Cold or robotic |
| **Futuristic** | Light, glow, systems, networks | Sci-fi kitsch, neon overload |
| **Cinematic** | Slow camera, pacing, reveals | Long intros that block content |
| **Confident** | Big statements, short sentences | Arrogance, buzzword inflation |
| **Honest** | Real stats, real repos, real links | Inflated "10x" claims |
| **Curious** | AI, automation, systems thinking | Unfocused "I do everything" |

**Voice:** a senior engineer's commit messages. Short, active, specific. Verbs first: *Build. Deploy. Automate. Ship.*
**Copy rules:** no "passionate", no "guru", no "Welcome to my portfolio". Every claim gets a number, a technology or a link.

---

## 4. Visual Direction

**Concept: "THE BUILD SYSTEM"**
The site is a cinematic walk through Ashish's engineering world, structured like a deploy pipeline. Every section is a stage of that pipeline:

```
01 INIT     → Hero            (the engineer)
02 COMMIT   → About / Story
03 BUILD    → What I Build
04 DEPLOY   → Featured Projects (from code to cloud)
05 SCALE    → More Projects, Stack, Achievements
06 INFER    → AI future / GitHub
07 CONNECT  → Contact
```

A thin **pipeline progress rail** fixed on the left edge (desktop) lights up stage by stage as the visitor scrolls, like a CI pipeline turning green. This is the signature interaction.

**Mood words:** midnight server room · glass and light · terminal precision · quiet power.

**Visual ingredients**
- Deep black void backgrounds with **volumetric blue/cyan light**
- **Glass panels**: `backdrop-filter: blur`, 1px hairline borders, faint inner glow
- **Fine grid + code textures** at 3–6% opacity
- **Particle/data-stream canvas** used sparingly: hero fallback and the AI section only
- **Film grain** overlay across the whole site (animated SVG noise, ~5% opacity)
- **Cinematic video** for the three hero moments, scrubbed by scroll
- **Mono micro-labels** (`// 01 — INIT`, `status: deployed`, `build #2026`) for developer texture

**Rule of restraint:** at most one glowing element per viewport. Glow marks focus; it is not decoration.

---

## 5. Higgsfield Seedance 2.0 — Asset Generation

### 5.1 Global settings (all three clips)
| Setting | Value |
|---|---|
| Model | **Seedance 2.0** (via Higgsfield) |
| Resolution | **1080p** (1920×1080, 16:9). Also render a **9:16 1080×1920** variant for mobile |
| Duration | **8–12 s** per clip (target 10 s) |
| Frame rate | 24 fps |
| Camera | Slow, steady, motivated: dolly / push-in / glide. No shake, no fast cuts |
| Color | Black base, electric blue `#2E6BFF`, cyan `#22D3EE`, violet accent `#8B5CF6`; skin tones stay natural |
| Grade | High contrast, crushed blacks, soft bloom on highlights, subtle anamorphic flare |
| Negative prompt | *cartoon, anime, low-poly, text artifacts, garbled letters, watermark, logo, oversaturated neon, rainbow colors, shaky cam, fast cuts, cheesy hologram, stock-footage look, extra fingers, distorted face* |

### 5.2 Identity reference (character consistency)
- **Reference image:** `media/ashish-reference.png` (1122×1402 studio headshot in the project's `media/` folder)
- **Subject description for prompts:** *young South Asian man in his early 20s, short voluminous dark curly hair with faded sides, defined eyebrows, trimmed beard and moustache, slim build, calm confident expression.*
- **Wardrobe (consistent across clips):** black crew-neck tee under a dark charcoal overshirt, a relaxed engineer-at-work look (the reference shows a navy blazer and light-blue shirt; either works if you prefer the formal look).
- Upload the reference as a Higgsfield **Character / Reference Element** and attach it to every clip that shows Ashish. Scenes 02 and 03 are environment-led; Ashish appears as a **silhouette/cameo** there, which keeps identity consistent without risking face drift.
- The reference is a sharp, evenly lit studio headshot, which suits identity locking well.

### 5.3 Output files → `/assets/video/`
| File | Use |
|---|---|
| `scene-01-engineer.mp4` / `scene-01-engineer-mobile.mp4` | Hero scroll scrub |
| `scene-02-code-to-cloud.mp4` / `-mobile.mp4` | "What I Build" → Projects transition scrub |
| `scene-03-ai-future.mp4` / `-mobile.mp4` | AI / GitHub section scrub |
| `scene-0X-poster.jpg` | First frame, used as poster, LCP image and reduced-motion fallback |

Post-processing is described in §28.3 (Technical Implementation → Video encoding).

---

## 6. Three Cinematic Scenes

Three **separate clips** that share one visual identity: the same palette, lighting logic, slow camera language and atmosphere. Each tells a different chapter: **Engineer → Systems → Intelligence.** Each clip **opens and closes on near-black**, so the site can cross-fade between them and the experience still feels like one continuous film.

### SCENE 01 — THE ENGINEER *(Hero · 10 s)*
**Story beat:** *Developer → Builder → Engineer.*

**Prompt:**
> Cinematic 1080p shot, dark futuristic software engineering workspace at night. Near-total black room lit only by monitors and soft electric-blue and cyan practical light. A young South Asian man in his early 20s (use the character reference), short dark wavy hair, trimmed beard, black tee and charcoal overshirt, sits at a minimal desk, seen from behind over his right shoulder. A large ultrawide monitor shows elegant dark-theme source code, a terminal with git commands, a branching git graph and a clean system architecture diagram. Slow continuous dolly push-in past his shoulder toward the screen; the code glows and the reflections of the screen light his face in profile. Volumetric haze, subtle dust in the light beams, shallow depth of field, anamorphic bokeh, crushed blacks, premium and realistic, calm focus. Ends close on the glowing code, which fades toward black.

**Camera:** over-the-shoulder → slow push-in → rack focus from his profile to the screen.
**First / last frame:** dark workspace silhouette / glowing code fading to black.
**Web use:** pinned hero; scroll scrubs the push-in while the headline types in on top.

### SCENE 02 — FROM CODE TO CLOUD *(Build/Deploy · 10 s)*
**Story beat:** *"I don't just write code. I build and deploy systems."*

**Prompt:**
> Cinematic 1080p. Extreme close-up of glowing source code on a dark screen. The characters lift off the screen as particles of blue light and assemble into a three-dimensional software architecture floating in a black void: a translucent glass frontend panel, connected by glowing cyan API lines to backend server blocks, then to cylindrical database stacks, then up to a vast softly lit cloud infrastructure of server racks and containers. Light pulses travel along the network paths like data packets. The camera glides forward and upward through the architecture layer by layer, as if flying into a digital city. Electric blue, cyan and a subtle violet rim light; deep black background; volumetric glow; realistic glass and metal materials; elegant and minimal, no text labels. Ends on a wide reveal of the complete system glowing in the dark.

**Camera:** macro on code → continuous forward/upward fly-through → wide reveal.
**First / last frame:** code macro on black / full architecture wide shot.
**Web use:** scrubbed while five labels (`FRONTEND → API → BACKEND → DATABASE → CLOUD`) light up in sync. Bridges "What I Build" into Featured Projects.

### SCENE 03 — THE AI FUTURE *(Infer · 10 s)*
**Story beat:** *AI + automation + cloud = the future he's building toward.*

**Prompt:**
> Cinematic 1080p. A vast futuristic AI ecosystem floating in black space: many luminous intelligent nodes, each a small glowing crystalline core, interconnected by fine threads of light. Smaller agent nodes exchange glowing data streams with surrounding structures representing APIs, databases, applications, cloud infrastructure and data pipelines. Streams of cyan and violet particles flow between them. The camera drifts slowly through the network, passing close to individual nodes, then pulls back to gradually reveal that all the nodes form one enormous coherent intelligent structure, like a neural constellation. In the final seconds, a small silhouette of a young man stands on a dark glass platform in the foreground looking up at it. Mysterious, intelligent, premium, calm, deep blacks, volumetric light, subtle lens bloom, no text.

**Camera:** slow drift → close node pass → long pull-back reveal.
**First / last frame:** single glowing node / full constellation with silhouette.
**Web use:** pinned scrub behind the "AI × Automation × Cloud" statement, which flows into the GitHub section.

---

## 7. Website Structure

Sections follow the client's 12-part structure, mapped onto the pipeline stages:

| # | Section | Stage | Hero media | Key interaction |
|---|---|---|---|---|
| 00 | Preloader | — | — | Terminal boot sequence (≤1.8 s) |
| 01 | **Hero** | INIT | Scene 01 scrub | Kinetic headline, magnetic CTAs |
| — | **Stats strip** | — | — | Count-up numbers, infinite marquee |
| 02 | **About / Story + Mission** | COMMIT | Portrait (duotone) | Line-by-line text reveal, timeline |
| 03 | **What I Build** (3 pillars + automation) | BUILD | Scene 02 scrub | Pinned horizontal pillar cards |
| 04 | **Featured Projects** | DEPLOY | Project visuals | Full-screen project chapters, tilt cards |
| 05 | **More Projects** | DEPLOY | — | Hover-reveal list with preview |
| 06 | **Tech Stack** | SCALE | — | Dual-direction marquees + grouped grid |
| 07 | **Achievements** | SCALE | — | Huge "85%" kinetic number |
| 08 | **Education & Certifications** | SCALE | — | Glass credential cards |
| 09 | **AI Future + GitHub** | INFER | Scene 03 scrub | Live GitHub repo feed |
| 10 | **Beyond the Code** (personal) | INFER | — | Small, warm, human grid |
| 11 | **Final CTA / Contact** | CONNECT | Ambient particles | Giant "LET'S BUILD" type, copy-email |
| 12 | **Footer** | — | — | Back to top, local time, status |

**Persistent UI:** minimal nav (logo `AK.` · Work · About · Stack · GitHub · **Let's Connect** button), pipeline progress rail, custom cursor (desktop), grain overlay.

---

## 8. Hero Section

**Structure: "scroll to deploy" → match cut into the live site.** On desktop the hero is pinned for about +260vh of scroll and plays as one scrubbed scene:

| Scroll | What happens |
|---|---|
| 0% | Full-screen Scene 01 (or its stand-in: a glass code editor over code rain). Bottom bar: `Ashish Kumar — Full-Stack Software Engineer` · `Scroll to deploy ▍` |
| 4–35% | The editor types out `deploy.ts` line by line and tilts flat toward the camera |
| 6–58% | Pipeline captions tick through: `// git push origin main` → `// running tests… 6 passed` → `// deployed to production ✓` |
| 38–54% | The editor's deploy bar fills 0 → 100% and turns green |
| 62–86% | Match cut: the scene scales up and fades back while a glass **browser window** (`https://ashish.kumar` · `pipeline: green`) zooms from 0.78 to 1 |
| 62–80% | **ASHISH** (solid) / **KUMAR** (outline, indented) roll up letter by letter |
| 80–86% | The sub-line reveals word by word, and a gradient sweeps across *idea* and *production.*; the eyebrow, chips, CTAs and links fade in |
| 86–100% | Exit: the window drifts up and shrinks slightly, and the scene dims to black |

**Window content:** `// Full-Stack Software Engineer · AI · Cloud` · `● Open to SWE roles — 2026` · name · *"I build software that moves from idea to production."* (accent words in Instrument Serif italic with the blue gradient) · chips `next.js ✓ aws ✓ jenkins ✓` · **Explore My Work** / **Let's Connect** · GitHub, LinkedIn, Resume.

**Tablet / phone ("lite"):** no pin. The window is there from the start and the name rolls in after the preloader.
**Reduced motion:** everything is shown statically.

**Navigation:** a floating, centered glass pill (`AK` badge · Work · About · Stack · GitHub · `● Let's Connect`) that hides on scroll down and returns on scroll up.

**Signature micro-interactions across the site:**
- Labelled cursor ring: a large filled ring with a label (VIEW WORK, EMAIL, OPEN LIVE ↗…) on key links. Other links get the inspector box.
- More Projects hover list: names slide right, and a floating browser card follows the cursor showing the live front page (on touch and small screens the screenshot is shown inline instead).
- Letter-roll hover on links: the text slides up and is replaced by a copy of itself.
- Inspector cursor: a dashed cyan box with corner squares and a tag snaps around the hovered element.
- Mission as a film title card: letterbox bars close in, words glow on, and "tests," flashes red → green.
- Headshot inspection: a scan line sweeps the portrait, corner brackets lock on, and the caption fades in.
- Easter egg: typing `ship` anywhere shows "Shipped to production ✓".

## 9. Animated Stats Strip

A full-width glass band directly below the hero. On desktop it shows four large stats in a row. Below it runs a slow infinite marquee of the remaining stats and keywords.

| Stat | Label | Detail (small mono) |
|---|---|---|
| **85%** | AI matching accuracy | Resume ↔ JD screening · Hack2Skill 2025 |
| **7+** | Public repositories | github.com/Ashish9123 |
| **5** | Layers shipped | Frontend → API → Backend → DB → Cloud |
| **2026** | B.Tech CSE | Lovely Professional University |

**Marquee:** `FULL STACK ✦ AWS EC2 ✦ VERCEL ✦ JENKINS CI/CD ✦ NEXT.JS ✦ GRAPHQL ✦ POSTGRESQL ✦ SELENIUM ✦ PYTHON ✦ JAVA ✦`

**Motion:** numbers count up from 0 using GSAP when the strip enters the viewport (1.6 s, `power3.out`). Hairline dividers draw in from the top. The marquee speeds up slightly with scroll velocity, read from Lenis.

---

## 10. Mission Section

A single huge typographic statement, pinned briefly. The words light up from 15% to 100% opacity as you scroll (scroll-linked, word by word).

> **// MISSION**
> **To become the engineer a team trusts with the whole path —**
> **idea, architecture, code, tests, deployment,**
> **and the production system that comes after.**

Small caption beneath: *Software engineering × Cloud × AI × Automation. Built to be useful. Built to be reliable.*

---

## 11. Three Pillars Section — "What I Build"

**Header:** `// 03 — BUILD` · **WHAT I BUILD**

The section pins; the pillars scroll **horizontally** on desktop and stack vertically on mobile. Scene 02 plays as a scrubbed background behind the track, dimmed to 35%.

| # | Pillar | Copy | Tags |
|---|---|---|---|
| 01 | **Full-Stack Applications** | Complete products, from interface to database. Auth, APIs, data models and clean UI, built as one system. | React · Next.js · TypeScript · Node.js · Flask · PostgreSQL · GraphQL |
| 02 | **AI-Powered Tools** | Applications that reason over data: configurable AI agents, workflow builders and screening systems that measure their own accuracy. | Agents · Workflows · NLP matching · Python |
| 03 | **Cloud & Deployment** | Code that's actually live. Apps hosted on AWS EC2 and Vercel, with CI pipelines that keep them working. | AWS EC2 · Vercel · Nhost · Hasura |
| 04 | **Automation & Quality** *(bonus card)* | Test frameworks that catch bugs before users do: Selenium, TestNG and Page Object Model, wired into Jenkins. | Selenium · TestNG · Maven · Jenkins · Git |

After the cards, a **pipeline band** finishes the scene-02 scrub: `FRONTEND → API → BACKEND → DATABASE → CLOUD`. Each node lights up cyan in sync with the video, and a light pulse travels along the connecting line.

---

## 12. Story Section — About

**Header:** `// 02 — COMMIT` · **THE ENGINEERING JOURNEY**

**Layout:** two columns. The left column holds a sticky portrait: the reference photo with a **blue colour grade** that fades to natural colour on hover, plus grain and a scan-line effect. The right column holds the story copy with a vertical "git log" timeline.

**Story copy (refined):**
> I'm **Ashish Kumar**, a Computer Science Engineering graduate from **Lovely Professional University**.
>
> I started with programming and CS fundamentals, then got pulled toward a bigger question: *how does a complete application actually work?* Not just the screen, but the API behind it, the database under it, the server it runs on, and the pipeline that ships it.
>
> So I stopped only studying and started **building**: full-stack cloud apps, AI tools, a bug tracker on AWS, a CI-driven test framework, a finance predictor, an agriculture AI. Each project taught me another layer of the stack.
>
> Now I want to do this on **real production systems**, with a team that moves fast, where I can contribute from day one, learn from experienced engineers and take on more ownership over time.

**Timeline rendered as a git log** (mono, each commit reveals on scroll):
```
* a1f3c9e  init: started programming & CS fundamentals
* 4b7d2e1  feat: first full-stack apps (Flask, SQLite, auth)
* 9c2e8a4  deploy: shipped Bug Tracker to AWS EC2
* e5a7b31  test: built Selenium + TestNG framework, wired into Jenkins CI
* 7d19f02  feat(ai): AI resume screener — 85% match accuracy @ Hack2Skill 2025
* 2f8c6d3  feat: AI Agent Workflow Builder (Next.js · GraphQL · Vercel)
* HEAD →   release: B.Tech CSE, LPU — 2026 · open to SWE roles
```

---

## 13. Product / Service Section — Featured Projects

**Header:** `// 04 — DEPLOY` · **SELECTED WORK** · counter `01 / 03`

Each project is a **full-screen chapter**. Its title is set huge in outline type, which fills solid on scroll. Beside it sits a glass "device" card showing a UI mock or code visual with 3D tilt on hover, plus a spec sheet.

### 01 — AI Agent Workflow Builder
- **One-liner:** Create, configure and run AI agents and multi-step workflows from one dashboard.
- **What it proves:** Modern full-stack: auth, GraphQL APIs, relational data, cloud deploy, AI orchestration.
- **Stack:** Next.js · React · TypeScript · Node.js · Nhost · Hasura · GraphQL · PostgreSQL · Vercel
- **Spec sheet:** `auth: nhost` · `api: graphql/hasura` · `db: postgres` · `deploy: vercel`
- **Links:** Live ↗ · Code ↗

### 02 — Bug Tracker Web Application
- **One-liner:** A full bug lifecycle in one place, from report to triage to resolution.
- **What it proves:** Backend architecture, authentication, CRUD, data modeling, cloud hosting.
- **Stack:** Python · Flask · SQLite · AWS EC2
- **Features:** user auth · bug lifecycle states · CRUD · modular blueprints · EC2 deployment
- **Links:** Code ↗

### 03 — SauceDemo CI/CD Test Automation Framework
- **One-liner:** End-to-end tests that run themselves on every build.
- **What it proves:** Quality engineering, CI/CD, maintainable test architecture.
- **Stack:** Java · Selenium WebDriver · TestNG · Maven · Jenkins · Page Object Model · Git
- **Flows covered:** login → product selection → cart → checkout → logout
- **Visual:** an animated terminal panel "running" a test suite with green ticks (pure CSS/JS)
- **Links:** Code ↗

> Project visuals: build them as **code-generated UI mockups** in HTML/CSS (glass dashboard, kanban, terminal) so no screenshots are needed. Swap in real screenshots at `/assets/img/projects/` later. Link URLs default to the GitHub profile until specific repo URLs are confirmed.

---

## 14. Featured Work / Content Section — More Projects

**Header:** `// 05 — MORE BUILDS` · **MORE FROM THE REPO**

An Awwwards-style **hover list**: large rows separated by hairlines. Hovering a row slides the name right, shows its tags and makes a floating preview card (gradient + icon + mono title) follow the cursor.

| Project | Line | Tags |
|---|---|---|
| **URL Shortener** | Short links, fast redirects, clean API. | Web · Backend |
| **Finance Predictor** | Predictive models applied to financial data. | Python · ML · FinTech |
| **Chatbot AI** | A conversational assistant built on NLP. | AI · NLP |
| **AgriPrecision AI** | AI for smarter, data-driven agriculture. | AI · AgriTech |
| **Portfolio Website** | Earlier portfolio builds; this site is the latest. | Frontend |

Each row links to GitHub. Below the list: **[ See all repositories on GitHub ↗ ]**

---

## 15. Tech Stack Section

**Header:** `// 06 — SCALE` · **THE STACK**

Two giant marquee rows scroll in opposite directions (outline type, hovering a word fills it). Below them is a grouped glass grid:

| Group | Tools |
|---|---|
| **Languages** | JavaScript · TypeScript · Python · Java · SQL |
| **Frontend** | React · Next.js · HTML · CSS |
| **Backend & APIs** | Node.js · Flask · GraphQL · Hasura · REST |
| **Data** | PostgreSQL · SQLite |
| **Cloud & DevOps** | AWS EC2 · Vercel · Nhost · Jenkins · Maven · Git · CI/CD |
| **Testing** | Selenium WebDriver · TestNG · Page Object Model |

## 16. Achievements Section

**Header:** `// 07 — RESULTS`

The centerpiece is a huge kinetic **"85%"** (around 30vw). It counts up on scroll, and its fill rises like a progress bar from outline to solid cyan gradient.
Caption: *Resume ↔ job-description matching accuracy: an AI-powered screening tool built at Hack2Skill Competitive Event 2025.*

Supporting cards: **7+ public repos** · **Full-stack across 5 layers** · **Cloud: AWS EC2 + Vercel** · **CI/CD: Jenkins + Maven + Git**.

## 17. Education & Certifications

**Header:** `// 08 — CREDENTIALS`
- **B.Tech, Computer Science & Engineering**, Lovely Professional University, graduated 2026.
- **Certifications:** three glass cards for **AWS / Cloud**, **Agile** and one more.
  > ⚠️ **Exact certificate names, issuers and years are not provided.** The build uses clearly marked placeholders (`data-todo`) for Ashish to fill in. Fabricated credentials must not be shown.

## 18. AI Future + GitHub Section

**Part A, AI statement (Scene 03 scrub, pinned):**
> **AI × AUTOMATION × CLOUD.**
> *The next generation of software won't just respond. It will reason, act and scale. That's what I'm building toward.*

**Part B, GitHub (prominent, as requested):**
- Large header: **CODE, NOT CLAIMS.** with the profile handle `@Ashish9123` and a **Follow on GitHub ↗** button.
- **Live repo feed:** fetch `https://api.github.com/users/Ashish9123/repos?sort=updated&per_page=6` client-side and render glass cards (name, description, language dot, stars, updated date).
- **Fallback:** if the request fails or is rate-limited, render a static list of the known projects. Cache the response in `localStorage` for 1 hour, inside try/catch.
- A decorative **contribution-style grid** (CSS) that ripples on scroll. It is clearly decorative, never presented as real data.

## 19. Beyond the Code (Personal)

Small, warm, human. A four-tile grid in the same glass style:
**Building side projects at night** · **Exploring AI agents & automation** · **Learning how systems scale** · **Always shipping something**.
*(Default copy written from his stated interests; Ashish can personalize it.)*

---

## 20. Final CTA Section

**Header:** `// 11 — CONNECT`

Full viewport with an ambient particle field (canvas, low density) that subtly follows the cursor.

```
HAVE A ROLE, A PROJECT,
OR A PROBLEM?

LET'S BUILD.                       ← giant kinetic type, letters stagger in

ashishcb035@gmail.com   [ copy ]   ← click copies, toast "Copied ✓"

[ Let's Connect → ]  [ GitHub ↗ ]  [ LinkedIn ↗ ]  [ Download Resume ↓ ]

Open to Software Engineer · Full-Stack · Cloud · SDET roles.
```

---

## 21. Footer

```
AK.                                         ASHISH KUMAR — FULL-STACK SOFTWARE ENGINEER
Idea → Code → Cloud.

Work · About · Stack · GitHub · Contact      GitHub ↗  LinkedIn ↗  Email ↗  Resume ↓

● All systems operational · IST 16:42 (live)        © 2026 Ashish Kumar · Built with HTML, CSS & JS
                                                                   [ ↑ Back to top ]
```
A giant `ASHISH KUMAR` wordmark sits across the bottom edge in outline type, with an ultra-low-contrast fill.

---

## PART B — DESIGN SYSTEM

---

## 22. Complete Visual Style Guide

### Color tokens
```css
--bg-0:      #05060A;  /* deep black — page */
--bg-1:      #0B0D13;  /* charcoal — sections */
--bg-2:      #12151E;  /* raised panels */
--line:      rgba(255,255,255,0.08);  /* hairlines */
--line-2:    rgba(255,255,255,0.16);
--text-0:    #F4F6FB;  /* off-white headings */
--text-1:    #A9B0C2;  /* body */
--text-2:    #646B7E;  /* captions, mono labels */
--blue:      #2E6BFF;  /* electric blue — primary accent */
--cyan:      #22D3EE;  /* cyan — highlights, live states */
--violet:    #8B5CF6;  /* violet — rare tertiary accent */
--glow-blue: 0 0 40px rgba(46,107,255,0.35);
--grad-accent: linear-gradient(100deg, #22D3EE 0%, #2E6BFF 55%, #8B5CF6 100%);
--glass-bg:  rgba(18,21,30,0.55);
--glass-blur: blur(18px) saturate(140%);
```
**Usage ratio:** 85% black/charcoal · 10% off-white text · 4% blue/cyan · 1% violet.
The site is **dark-only** by design (the brand is dark). Contrast: body text `--text-1` on `--bg-0` is at least 7:1.

### Surfaces
- **Glass card:** `--glass-bg`, `--glass-blur`, 1px `--line` border, `border-radius: 20px`, and an inner top highlight `inset 0 1px 0 rgba(255,255,255,0.06)`.
- **Hover:** the border becomes a gradient (via a mask), with a soft radial spotlight that follows the cursor inside the card (CSS vars `--mx/--my`).
- **Grid texture:** a 64px line grid at 4% opacity, masked by a radial fade.
- **Grain:** fixed full-screen SVG `feTurbulence` noise, `opacity: .05`, stepped animation at 8 fps, `pointer-events: none`.

### Iconography
Inline SVG with 1.5px strokes and no icon fonts. Arrows: `↗` for external links, `→` for internal, `↓` for downloads.

### Spacing & grid
- 12-column grid, max-width 1440px, gutters `clamp(16px, 2.5vw, 40px)`.
- Section padding: `clamp(96px, 14vh, 200px)` vertical.
- 8px spacing scale.

## 23. Typography

| Role | Font | Notes |
|---|---|---|
| **Display** | **Space Grotesk** 500/700 (Google Fonts) | Tight tracking `-0.04em`, uppercase for statements |
| **Body** | **Inter** 400/500 | 16–18px, line-height 1.6 |
| **Mono** | **JetBrains Mono** 400/500 | Labels, stats details, git log, terminal |

**Scale (fluid with `clamp`):**
```
--fs-mega:   clamp(64px, 14vw, 240px);   /* LET'S BUILD, 85%, wordmark */
--fs-hero:   clamp(44px, 8.2vw, 148px);  /* hero headline */
--fs-h2:     clamp(40px, 6vw, 104px);    /* section titles */
--fs-h3:     clamp(24px, 2.6vw, 40px);
--fs-body:   clamp(16px, 1.1vw, 19px);
--fs-mono:   12–13px, uppercase, letter-spacing .12em
```
**Kinetic type techniques:** masked line/word reveals, scroll-scrubbed opacity per word, outline→fill transitions (`-webkit-text-stroke` + `background-clip:text`), variable-speed marquees, letter-stagger on the final CTA, and a scramble/decode effect on mono labels (random glyphs resolve into the text).

---

## 24. Animation Direction

**Principles:** slow in, confident out. Motion reveals content and never hides it. Every animation finishes in under 1.2 s unless it is scroll-scrubbed.

| Token | Value |
|---|---|
| Primary ease | `power4.out` / CSS `cubic-bezier(0.16, 1, 0.3, 1)` |
| Reveal duration | 0.9–1.2 s |
| Stagger | 0.06–0.1 s |
| Hover | 0.35 s |
| Scrub smoothing | `scrub: 1` (video), `scrub: 0.6` (type) |

**Signature moments**
1. **Preloader:** terminal lines type out (`> initializing build…`, `> loading assets… 100%`, `> deploy ✓`), then the screen splits horizontally to reveal the hero. Capped at 1.8 s; skipped on repeat visits (sessionStorage).
2. **Hero headline:** word-mask reveal plus a gradient sweep on "PRODUCTION."
3. **Section titles:** `// 0X — LABEL` decodes (scramble) while the title lines rise from masks.
4. **Scene transitions:** each video section fades in from black and out to black, overlapping with a 20vh cross-fade so the three films feel like one.
5. **Pipeline rail:** stage dots fill as sections pass, and the connecting line grows (`scaleY`).
6. **Project chapters:** the outline title fills, the device card rises with slight rotateX that settles flat, and spec rows stagger in.
7. **85%:** count-up with a liquid fill.
8. **LET'S BUILD:** letters drop in with stagger and a slight overshoot.

### 3D scroll background (Three.js)
A fixed WebGL particle field (9k particles on desktop, 4.5k on mobile) sits behind all content. Between sections the particles burst outward and re-form into the next shape. The 3D shapes rotate with scroll; the flat ones turn to face the camera. The field tilts toward the mouse and turbulence rises with scroll speed.

| Section | Shape |
|---|---|
| About | `</>` glyph |
| Mission | Ashish's portrait, sampled from `assets/img/ashish-portrait.jpg` (edges + dark features), with relief depth |
| What I Build | 5 stacked layers (frontend → cloud) |
| Projects | 3×3×3 server-rack lattice |
| Stack | `{ }` |
| Results | torus knot |
| AI / GitHub | neural constellation |
| Contact | 3-arm spiral galaxy |

Three.js r128 loads from cdnjs. Without WebGL the canvas is simply removed. With reduced motion the shapes still change per section but stop drifting.

## 25. Interaction Design

- **Custom cursor (desktop, pointer:fine only):** a 8px dot plus a 36px ring that follows with lerp. The ring grows and shows a label (`VIEW`, `OPEN ↗`, `COPY`) on interactive elements, and uses mix-blend `difference` over large type.
- **Magnetic buttons:** primary CTAs pull toward the cursor (max 12px), with inner text moving at 1.5×.
- **Card tilt + spotlight:** project and repo cards tilt by up to 6° and get a radial spotlight at the cursor position.
- **Hover list previews:** a floating preview follows the cursor with lerp in More Projects.
- **Copy email:** click copies to the clipboard and shows a toast. It falls back to `mailto:` if the clipboard API is unavailable.
- **Nav:** hides on scroll down and shows on scroll up. The active section is underlined. Shows a glass background after 100px.
- **Keyboard:** all interactive elements are reachable, with a visible `:focus-visible` ring (cyan, 2px offset). A skip-to-content link is included.

## 26. Scroll Behavior

- **Lenis** smooth scroll (`lerp: 0.1`, `wheelMultiplier: 1`), driven by GSAP's ticker and synced with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`).
- **Pinned scenes:** Hero (≈+150vh), Mission (≈+80vh), What I Build horizontal track (length = track width), AI statement (≈+120vh).
- **Video scrubbing:** `video.currentTime = progress × duration`, set inside a rAF-throttled ScrollTrigger `onUpdate` with lerp smoothing to avoid seek jank.
- **Anchor links** go through `lenis.scrollTo(target, { offset: -80 })`.
- **Scroll-velocity effects:** marquee speed and a subtle skew on large type (max 4°) are driven by `lenis.velocity`.
- **`prefers-reduced-motion`:** Lenis is disabled, pins are disabled, videos are replaced with poster images, all reveals become simple fades, and the grain is static.

## 27. Mobile Behavior

- **Breakpoints:** `≤ 1024px` tablet, `≤ 768px` mobile, `≤ 380px` small.
- Use the **9:16 mobile video variants** (`<source media>` or JS selection). If a mobile variant is missing, use the 16:9 file with `object-fit: cover` and `object-position` tuned per scene.
- **Video scrubbing on mobile:** iOS seek performance is unreliable, so on touch devices videos **autoplay muted, loop and play inline** instead of scrubbing. Scrubbing applies on desktop only.
- The horizontal pillar track becomes a **vertical stack** with reveal-on-enter.
- No custom cursor, magnetic or tilt effects on touch.
- Nav collapses into a full-screen overlay menu with huge staggered links.
- The pipeline rail becomes a thin top progress bar.
- Hero headline is about 12vw with 16px side gutters and no horizontal overflow (`overflow-x: clip` on body).
- Touch targets are at least 44px. Lenis touch smoothing is off (`syncTouch: false`) so native momentum is preserved.

---

## PART C — TECHNICAL IMPLEMENTATION (for Claude Code)

---

## 28. Technical Implementation

### 28.1 File structure
```
/ (project root)
├── BUILD-PLAN.md
├── index.html
├── style.css
├── script.js
├── media/
│   └── ashish-reference.png       ← identity reference (source, untouched)
└── assets/
    ├── video/
    │   ├── scene-01-engineer.mp4            (+ -mobile.mp4, -poster.jpg)
    │   ├── scene-02-code-to-cloud.mp4       (+ -mobile.mp4, -poster.jpg)
    │   └── scene-03-ai-future.mp4           (+ -mobile.mp4, -poster.jpg)
    ├── img/
    │   ├── ashish-portrait.jpg              ← copy of reference for About section
    │   ├── og-image.jpg                     ← 1200×630 social card
    │   └── projects/                        ← optional real screenshots later
    ├── resume/
    │   └── Ashish-Kumar-Resume.pdf          ← CLIENT TO ADD
    └── favicon.svg
```

### 28.2 CDN dependencies (load at end of `<body>`, `defer`)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" defer></script>
<script src="script.js" defer></script>
```
Google Fonts: Space Grotesk (500, 700), Inter (400, 500), JetBrains Mono (400, 500) with `display=swap` and `preconnect`.

### 28.3 Video encoding (after Higgsfield export)
Scrub-friendly encoding uses frequent keyframes so seeking is instant:
```bash
ffmpeg -i in.mp4 -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 23 -g 6 -keyint_min 6 -pix_fmt yuv420p -movflags +faststart -an scene-01-engineer.mp4
ffmpeg -i in.mp4 -vf "scale=1080:-2" -c:v libx264 -crf 26 -g 6 -pix_fmt yuv420p -movflags +faststart -an scene-01-engineer-mobile.mp4
ffmpeg -i scene-01-engineer.mp4 -vframes 1 -q:v 3 scene-01-poster.jpg
```
Targets: under 6 MB desktop and under 3 MB mobile per clip, with no audio track.
**Alternative (heaviest scenes):** export a 120-frame WebP image sequence and scrub it on `<canvas>`. Use this only if MP4 seeking stutters.

### 28.4 Asset-optional build (important)
The site **must look finished before any video exists.** Each video container renders a **procedural fallback**:
- Scene 01 fallback: a canvas "code rain" of faint monospace glyphs with a blue light sweep.
- Scene 02 fallback: an animated SVG pipeline (nodes plus travelling pulses).
- Scene 03 fallback: a canvas particle network (nodes and connecting lines, cursor-reactive).

JS checks each `<video>`: if its source loads (`loadeddata`), the video is used and the fallback hidden; on `error` the fallback stays. Dropping the MP4s into `/assets/video/` later upgrades the site with no code changes.

### 28.5 `script.js` architecture (vanilla, modular IIFE sections)
```
1.  Feature detection   → reducedMotion, isTouch, isMobile
2.  Preloader           → terminal sequence → resolves Promise → init()
3.  Lenis + GSAP sync
4.  Split text utility  → wraps words/chars in masked spans (no SplitText plugin)
5.  Reveal system       → [data-reveal="words|lines|fade|up"] via ScrollTrigger.batch
6.  Scramble labels     → [data-scramble]
7.  Video scrub module  → createScrub(section, video, {start, end}) + fallback logic
8.  Hero timeline
9.  Stats count-up      → [data-count] (+ suffix)
10. Mission word-light  → scroll-scrubbed opacity per word
11. Horizontal pillars  → pin + x translate (desktop only, matchMedia)
12. Pipeline nodes      → sync to scene-02 progress
13. Projects            → outline fill, tilt, spotlight
14. Hover list preview
15. Marquees            → velocity-reactive
16. 85% counter + fill
17. GitHub feed         → fetch + cache + fallback render
18. Canvas fallbacks    → codeRain, particleNet (paused when off-screen via IntersectionObserver)
19. Cursor + magnetic
20. Nav, progress rail, menu, copy-email, local time
21. gsap.matchMedia()   → desktop / mobile / reduced-motion contexts
```

### 28.6 Performance budget
- **LCP under 2.5 s:** the hero poster is preloaded (`<link rel="preload" as="image">`); videos use `preload="metadata"` and are lazy-attached when within 1 viewport.
- **CLS ≈ 0:** all media has fixed aspect boxes.
- **JS:** no frameworks. Total own JS is under 40 KB minified-equivalent.
- Canvas animations pause when off-screen and are capped at DPR 2.
- Animate only `transform`/`opacity`. Use `will-change` sparingly and remove it after animations finish.
- Images use `loading="lazy"` and `decoding="async"`, and are served as WebP/JPG at their rendered size.
- Fonts are limited to 6 weights total via `preconnect` + `display=swap`.

### 28.7 SEO & metadata
- `<title>Ashish Kumar — Full-Stack Software Engineer</title>`
- Meta description: *"Ashish Kumar is a full-stack software engineer building AI-powered applications, cloud systems and CI/CD-tested software with React, Next.js, Node.js, Python, Java and AWS."*
- Open Graph / Twitter cards (`assets/img/og-image.jpg`), canonical, `theme-color #05060A`.
- JSON-LD `Person` schema: name, jobTitle, alumniOf (Lovely Professional University), sameAs (GitHub, LinkedIn), email.
- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`) and one `h1`.

### 28.8 Accessibility
- All text is real text, never baked into video.
- Videos are `muted playsinline` with `aria-hidden="true"` (decorative).
- Contrast is AA minimum and AAA for body.
- Focus states, skip link, `prefers-reduced-motion` honored.
- Canvas elements are `aria-hidden`. Every link has a descriptive label.

### 28.9 Links (source of truth)
| Item | URL |
|---|---|
| Email | `mailto:ashishcb035@gmail.com` |
| GitHub | `https://github.com/Ashish9123` |
| LinkedIn | `https://www.linkedin.com/in/ashishkkumar91/` |
| Resume | `assets/resume/Ashish-Kumar-Resume.pdf` |
| Repo links | Default to the GitHub profile; replace with exact repo URLs once confirmed |

### 28.10 Client TODO checklist (things the build cannot invent)
- [ ] Add `assets/resume/Ashish-Kumar-Resume.pdf`
- [ ] Provide exact certification names, issuers and years
- [ ] Confirm repo URLs and live demo URLs for each project
- [ ] Generate the three Seedance 2.0 clips (§6), encode them (§28.3) and drop them into `/assets/video/`

### 28.11 Build order for Claude Code
1. Scaffold the files and folders; copy the portrait into `assets/img/`.
2. `index.html`: full semantic markup for all sections with final copy.
3. `style.css`: tokens, base, typography, layout, components, sections, responsive, reduced-motion.
4. `script.js`: modules in the order of §28.5.
5. Procedural fallbacks for all three scenes (the site must be complete without video).
6. Test in the browser at 1440px, 1024px, 768px and 375px; check the console for errors; check reduced-motion.
7. Performance pass: lazy media, pause off-screen canvases, verify no layout shift.
