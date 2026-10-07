# Ashish Kumar — Portfolio

Personal portfolio of **Ashish Kumar**, Full-Stack Software Engineer: AI-powered applications, cloud systems and CI/CD-tested software.

> I build software that moves from idea to production.

## Highlights

- **Scroll-to-deploy hero.** A code editor types, tests and deploys as you scroll, then match-cuts into a browser window where the name rolls in.
- **3D particle background (Three.js).** About 9k particles re-form per section: `</>`, a particle portrait, a 5-layer stack, server racks, `{ }`, a knot, a neural network and a galaxy.
- **Cinematic scroll storytelling.** GSAP + ScrollTrigger pins, a horizontal "What I Build" track, a film-title-card mission, and an 85% fill counter.
- **Live projects.** Real front-page screenshots of each deployed app, plus a live GitHub repo feed.
- **Micro-interactions.** Letter-roll links, an inspector cursor with labelled ring, magnetic buttons, tilt cards, film grain and a `ship` easter egg.
- Responsive, with reduced-motion support.

## Tech

Static site: `index.html`, `style.css`, `script.js` and `/assets`. Vanilla JavaScript, no framework.
Libraries load from CDNs: [GSAP + ScrollTrigger](https://gsap.com), [Lenis](https://lenis.darkroom.engineering), [Three.js](https://threejs.org).

## Run locally

```bash
python -m http.server 5173
```

Then open <http://localhost:5173>. Add `?motion=1` to force full animations on a machine with reduced motion enabled.

## Project structure

```
index.html          page markup
style.css           design system + layout
script.js           animations, 3D background, GitHub feed
assets/img/         portrait + project screenshots
assets/video/       drop-in slots for the Seedance hero clips (see README inside)
assets/resume/      add Ashish-Kumar-Resume.pdf here
BUILD-PLAN.md       full creative brief + implementation spec
```

## Contact

- Email: [ashishcb035@gmail.com](mailto:ashishcb035@gmail.com)
- GitHub: [@Ashish9123](https://github.com/Ashish9123)
- LinkedIn: [ashishkkumar91](https://www.linkedin.com/in/ashishkkumar91/)
