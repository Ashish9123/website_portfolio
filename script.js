/* =========================================================
   ASHISH KUMAR — Portfolio interactions
   Vanilla JS + GSAP + ScrollTrigger + Lenis. See BUILD-PLAN.md §28.5
   ========================================================= */
(() => {
  'use strict';

  /* ---------- 1. Feature detection ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  // Full motion is the default experience. Add ?motion=0 to the URL for a calm, reduced-motion version.
  const reduced = /[?&]motion=0/.test(location.search);
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
  const isMobile = () => innerWidth <= 768;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const anim = hasGSAP && !reduced;

  const session = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  if (reduced) root.classList.add('reduced');
  if (!hasGSAP) root.classList.add('no-anim');
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------- 2. Preloader ---------- */
  function runPreloader() {
    return new Promise(resolve => {
      const pre = $('.preloader');
      if (!pre) return resolve();
      if (!anim || session.get('ak-visited')) { pre.remove(); session.set('ak-visited', '1'); return resolve(); }
      session.set('ak-visited', '1');

      const pct = $('.pre-pct', pre);
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => pre.remove() });
      tl.to($$('.pre-line', pre), { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.2, ease: 'power2.out' })
        .to($('.pre-bar i', pre), { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.1)
        .to(counter, { v: 100, duration: 0.9, ease: 'power2.inOut', onUpdate: () => { pct.textContent = Math.round(counter.v); } }, 0.1)
        .to($('.pre-center', pre), { autoAlpha: 0, duration: 0.25 }, '+=0.1')
        .add(resolve)
        .to($('.pre-top', pre), { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '<')
        .to($('.pre-bottom', pre), { yPercent: 100, duration: 0.8, ease: 'power4.inOut' }, '<');
    });
  }

  /* ---------- 3. Lenis + GSAP sync ---------- */
  let lenis = null;
  function initLenis() {
    if (!anim || typeof window.Lenis === 'undefined') return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToTarget = target => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else (typeof target === 'number' ? scrollTo({ top: target }) : target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));
  };

  /* ---------- 4. Split text utility ---------- */
  function splitWords(el) {
    if (el.dataset.splitDone) return $$('.wi', el);
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.className = 'wi'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    $$('.grad', el).forEach(g => g.classList.add('is-split'));
    el.dataset.splitDone = '1';
    return $$('.wi', el);
  }
  function splitChars(el) {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    [...text].forEach(c => {
      const s = document.createElement('span');
      s.className = 'ch'; s.setAttribute('aria-hidden', 'true');
      s.textContent = c === ' ' ? ' ' : c;
      el.appendChild(s);
    });
    return $$('.ch', el);
  }

  /* ---------- 5. Reveal system ---------- */
  function initReveals() {
    $$('[data-split]').forEach(el => {
      if (el.closest('.hero')) return;
      const words = splitWords(el);
      gsap.set(words, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.06 })
      });
    });

    gsap.set('[data-reveal]', { autoAlpha: 0, y: 40 });
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%', once: true,
      onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08, overwrite: true })
    });

    const chars = $('[data-chars]');
    if (chars) {
      const cs = splitChars(chars);
      gsap.set(cs, { yPercent: -120, opacity: 0 });
      ScrollTrigger.create({
        trigger: chars, start: 'top 85%', once: true,
        onEnter: () => gsap.to(cs, { yPercent: 0, opacity: 1, duration: 1, ease: 'back.out(1.6)', stagger: 0.05 })
      });
    }
  }

  /* ---------- 6. Scramble labels ---------- */
  const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEF';
  function scramble(el) {
    const final = el.dataset.text || el.textContent;
    el.dataset.text = final;
    const total = 26; let frame = 0;
    const tick = () => {
      frame++;
      const p = frame / total;
      let out = '';
      for (let i = 0; i < final.length; i++) {
        const c = final[i];
        out += (i < p * final.length || c === ' ') ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame < total) requestAnimationFrame(tick); else el.textContent = final;
    };
    tick();
  }
  function initScramble() {
    $$('[data-scramble]').forEach(el => {
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => scramble(el) });
    });
  }

  /* ---------- 7. Video scenes (scrub or autoplay) + fallbacks ---------- */
  const scrubbers = new Map();
  const setSceneProgress = (scene, p) => { const s = scrubbers.get(scene); if (s) s.set(p); };

  function initScenes() {
    const useScrub = anim && !isTouch;
    $$('[data-scene]').forEach(scene => {
      const video = $('video', scene);
      if (!video) return;
      const desktopSrc = video.dataset.src;
      const firstSrc = (isMobile() && video.dataset.srcMobile) ? video.dataset.srcMobile : desktopSrc;

      video.addEventListener('loadeddata', () => {
        scene.classList.add('video-ready');
        if (!useScrub) {
          video.loop = true;
          if (!reduced) video.play().catch(() => {});
        }
      }, { once: true });
      video.addEventListener('error', () => {
        // Mobile variant missing → try the desktop file once; otherwise keep the fallback.
        if (video.dataset.triedDesktop || firstSrc === desktopSrc) return;
        video.dataset.triedDesktop = '1';
        video.src = desktopSrc; video.load();
      });

      const load = () => { if (video.dataset.loaded) return; video.dataset.loaded = '1'; video.src = firstSrc; video.load(); };
      if (scene.classList.contains('hero')) load();
      else if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '100% 0px' });
        io.observe(scene);
      } else load();

      if (useScrub) {
        let target = 0, current = 0;
        scrubbers.set(scene, { set(p) { if (video.duration) target = p * (video.duration - 0.05); } });
        gsap.ticker.add(() => {
          if (!scene.classList.contains('video-ready') || video.seeking) return;
          const d = target - current;
          if (Math.abs(d) < 0.002) return;
          current += d * 0.2;
          video.currentTime = current;
        });
      }
    });
  }

  function runCanvas(canvas, draw, resize) {
    let raf = null;
    resize();
    addEventListener('resize', debounce(resize, 200));
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (canvas.closest('.video-ready')) return;
      draw();
    };
    if (reduced) { for (let i = 0; i < 60; i++) draw(); return; }
    if (!('IntersectionObserver' in window)) { frame(); return; }
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !raf) frame();
      else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
    }).observe(canvas);
  }

  function sizeCanvas(canvas, ctx) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w, h };
  }

  function codeRain(canvas) {
    const ctx = canvas.getContext('2d');
    const glyphs = '01{}[]()<>=+-*/;:.$#&|!?constletawaitasyncgitpushdeploy'.split('');
    const fs = 14, colW = fs * 1.5;
    let w, h, drops = [];
    const resize = () => {
      ({ w, h } = sizeCanvas(canvas, ctx));
      drops = Array.from({ length: Math.ceil(w / colW) }, () => Math.random() * -h / fs);
      ctx.font = `${fs}px "JetBrains Mono", monospace`;
      ctx.fillStyle = '#05060A'; ctx.fillRect(0, 0, w, h);
    };
    const draw = () => {
      ctx.fillStyle = 'rgba(5,6,10,0.14)';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < drops.length; i++) {
        const x = i * colW, y = drops[i] * fs;
        const bright = Math.random() > 0.975;
        ctx.fillStyle = bright ? 'rgba(34,211,238,0.85)' : `rgba(46,107,255,${0.12 + (x / w) * 0.28})`;
        ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.32;
      }
    };
    runCanvas(canvas, draw, resize);
  }

  function particleNet(canvas) {
    const ctx = canvas.getContext('2d');
    const rgb = canvas.dataset.rgb || '46,107,255';
    const accent = canvas.dataset.accent || '34,211,238';
    const density = parseFloat(canvas.dataset.density || '0.00008');
    const hubs = canvas.dataset.hubs === '1';
    const link = 150;
    const mouse = { x: -9999, y: -9999 };
    let w, h, pts = [], t = 0;
    const resize = () => {
      ({ w, h } = sizeCanvas(canvas, ctx));
      const n = Math.min(isMobile() ? 60 : 130, Math.round(w * h * density));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.6, hub: hubs && Math.random() < 0.09, ph: Math.random() * 6.28
      }));
    };
    const host = canvas.parentElement;
    host.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    host.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < 200) { p.x += dx * 0.006; p.y += dy * 0.006; }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < link * link) {
            const al = (1 - Math.sqrt(d2) / link) * ((a.hub || b.hub) ? 0.5 : 0.25);
            ctx.strokeStyle = `rgba(${(a.hub || b.hub) ? accent : rgb},${al})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        if (p.hub) {
          const r = 3 + Math.sin(t * 2 + p.ph) * 1;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 7);
          g.addColorStop(0, `rgba(${accent},0.55)`); g.addColorStop(1, `rgba(${accent},0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r * 7, 0, 6.283); ctx.fill();
          ctx.fillStyle = '#E8FBFF'; ctx.beginPath(); ctx.arc(p.x, p.y, r * 0.7, 0, 6.283); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${rgb},0.75)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        }
      }
    };
    runCanvas(canvas, draw, resize);
  }

  function initCanvases() {
    $$('.fx-coderain').forEach(codeRain);
    $$('.fx-net').forEach(particleNet);
  }

  /* ---------- 8. Hero ---------- */
  // "full" = desktop with motion: pinned intro scene → match cut into the browser window.
  // "lite" = tablet / phone: no pin, the window is there from the start and the name rolls in.
  let heroMode = 'lite';
  let heroPlayed = false;
  const heroChars = () => $$('.hero-name .ch');
  const heroRest = () => [$('.hero-window .win-bar'), ...$$('.hero [data-hero-rest]')];
  const heroWords = () => splitWords($('[data-hero-words]'));
  const heroSweep = () => $$('.hero-sub .grad .wi');

  function splitHeroName() {
    $$('[data-hero-chars]').forEach(el => {
      const text = el.textContent.trim();
      el.textContent = '';
      [...text].forEach(c => {
        const s = document.createElement('span');
        s.className = 'ch'; s.setAttribute('aria-hidden', 'true'); s.textContent = c;
        el.appendChild(s);
      });
    });
  }

  function playHero() {
    heroPlayed = true;
    if (heroMode === 'full') {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.editor', { y: 90, autoAlpha: 0, duration: 1.4 })
        .from('.hero-intro > *', { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.1 }, '-=0.9');
      return;
    }
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .to(heroChars(), { yPercent: 0, duration: 1.1, stagger: 0.035 })
      .to(heroWords(), { yPercent: 0, duration: 1.1, stagger: 0.06 }, '-=0.8')
      .to(heroSweep(), { backgroundPosition: '0% 0', duration: 1.4, ease: 'power2.inOut' }, '-=0.6')
      .to(heroRest(), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, '-=1.4');
  }

  /* ---------- 9–12. Pinned / scrubbed sections ---------- */
  function initPins() {
    const mm = gsap.matchMedia();
    const hero = $('.hero');
    const build = $('.build');
    const ai = $('.ai');
    const nodes = $$('.pipe-node');
    const pipe = $('.pipeline');

    const lightPipeline = p => {
      pipe.style.setProperty('--pipe', Math.max(0, Math.min(1, p)).toFixed(3));
      nodes.forEach((n, i) => n.classList.toggle('is-on', p >= i / (nodes.length - 1) - 0.001 && p > 0));
    };

    // Desktop: pins + horizontal track
    mm.add('(min-width: 1025px)', () => {
      heroMode = 'full';
      root.classList.add('is-full');

      /* Act 1 · Hero — the scene builds and deploys, then match-cuts into the live site */
      const win = $('.hero-window');
      const caps = $$('.hero-captions span');
      const lines = $$('.editor-line');
      const status = $('.editor-status');
      const pct = $('.es-pct');
      const dep = { v: 0 };
      gsap.set('.editor', { xPercent: -50, yPercent: -50, rotateX: 10, transformPerspective: 1400 });
      gsap.set(win, { autoAlpha: 0, scale: 0.78 });
      gsap.set(heroChars(), { yPercent: 115 });
      gsap.set(heroRest(), { autoAlpha: 0, y: 24 });
      gsap.set(heroWords(), { yPercent: 110 });
      gsap.set(lines.slice(2), { autoAlpha: 0, x: -8 });
      gsap.set(caps, { autoAlpha: 0 });
      const cap = (el, at, out) => tl.fromTo(el, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.05 }, at).to(el, { autoAlpha: 0, y: -10, duration: 0.05 }, out);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero, start: 'top top', end: '+=320%', pin: true, scrub: true, anticipatePin: 1,
          onUpdate: s => setSceneProgress(hero, Math.min(1, s.progress / 0.8))
        }
      });
      tl.to('.hero-intro', { autoAlpha: 0, y: 20, duration: 0.06 }, 0.02)
        .to(lines.slice(2), { autoAlpha: 1, x: 0, duration: 0.04, stagger: 0.026 }, 0.04)
        .to('.editor', { rotateX: 0, scale: 1.08, duration: 0.5 }, 0.04)
        .to(dep, {
          v: 1, duration: 0.16,
          onUpdate: () => {
            status.style.setProperty('--deploy', dep.v.toFixed(3));
            pct.textContent = Math.round(dep.v * 100) + '%';
            status.classList.toggle('is-done', dep.v > 0.995);
          }
        }, 0.38);
      cap(caps[0], 0.06, 0.2);
      cap(caps[1], 0.25, 0.4);
      cap(caps[2], 0.46, 0.58);
      tl.to(win, { autoAlpha: 1, duration: 0.1, ease: 'power1.out' }, 0.62)
        .to(win, { scale: 1, duration: 0.24, ease: 'power2.inOut' }, 0.62)
        .to('.hero-stage', { scale: 1.6, opacity: 0.25, duration: 0.26, ease: 'power2.in' }, 0.62)
        .to(heroChars(), { yPercent: 0, duration: 0.14, stagger: 0.008, ease: 'power3.out' }, 0.78)
        .to(heroWords(), { yPercent: 0, duration: 0.1, stagger: 0.012, ease: 'power3.out' }, 0.82)
        .to(heroSweep(), { backgroundPosition: '0% 0', duration: 0.12, ease: 'power2.inOut' }, 0.9)
        .to(heroRest(), { autoAlpha: 1, y: 0, duration: 0.1, stagger: 0.02, ease: 'power2.out' }, 0.86)
        .to({}, { duration: 0.1 })
        // exit: the window drifts up and the scene dims to black (from the first version)
        .to(win, { yPercent: -6, scale: 0.95, duration: 0.18, ease: 'power1.in' })
        .to('.hero-veil', { opacity: 0.85, duration: 0.14 }, '<0.04');

      /* Act 3 · Mission — film title card */
      const mission = $('.mission');
      const words = splitWords($('[data-light]'));
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: mission, start: 'top top', end: '+=170%', pin: true, scrub: true }
      })
        .to('.letterbox', { scaleY: 1, duration: 0.08 }, 0)
        .fromTo(words, { opacity: 0.12, textShadow: '0 0 0px rgba(46,107,255,0)' }, { opacity: 1, textShadow: '0 0 40px rgba(46,107,255,0.55)', stagger: 0.05, duration: 0.08 }, 0.06)
        .to('.mission-flip .wi', { color: '#F87171', duration: 0.03 })
        .to('.mission-flip .wi', { color: '#34D399', duration: 0.05 }, '+=0.04')
        .fromTo('.mission-cap', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.08 })
        .to({}, { duration: 0.1 });

      return () => { root.classList.remove('is-full'); heroMode = 'lite'; };
    });

    mm.add('(min-width: 1025px)', () => {
      const track = $('.build-track');
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: build, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: s => { setSceneProgress(build, s.progress); lightPipeline((s.progress - 0.78) / 0.2); }
        }
      });

      ScrollTrigger.create({
        trigger: ai, start: 'top top', end: '+=120%', pin: true,
        onUpdate: s => setSceneProgress(ai, s.progress)
      });
      gsap.fromTo('.ai-content', { scale: 1 }, { scale: 0.9, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: ai, start: 'top top', end: '+=120%', scrub: 0.6 } });
    });

    // Tablet / mobile: no pins, light effects only
    mm.add('(max-width: 1024px)', () => {
      root.classList.add('is-lite');
      if (!heroPlayed) {
        gsap.set(heroChars(), { yPercent: 115 });
        gsap.set(heroRest(), { autoAlpha: 0, y: 24 });
        gsap.set(heroWords(), { yPercent: 110 });
      } else {
        gsap.set(heroSweep(), { backgroundPosition: '0% 0' });
      }
      const words = splitWords($('[data-light]'));
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.mission-text', start: 'top 80%', end: 'bottom 45%', scrub: 0.6 }
      });
      gsap.timeline({ scrollTrigger: { trigger: '.mission-flip', start: 'top 60%', once: true } })
        .to('.mission-flip .wi', { color: '#F87171', duration: 0.25 })
        .to('.mission-flip .wi', { color: '#34D399', duration: 0.4 }, '+=0.35');
      ScrollTrigger.create({ trigger: pipe, start: 'top 85%', end: 'bottom 50%', scrub: true, onUpdate: s => lightPipeline(s.progress) });
      return () => root.classList.remove('is-lite');
    });
  }

  /* ---------- 9. Stats count-up ---------- */
  function initCounters() {
    $$('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count);
      const from = parseFloat(el.dataset.from || 0);
      const o = { v: from };
      el.textContent = from;
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); } })
      });
    });
  }

  /* ---------- 13. Projects ---------- */
  function initProjects() {
    $$('.project').forEach(p => {
      gsap.to($('.fill-title', p), {
        backgroundPosition: '0% 0', ease: 'none',
        scrollTrigger: { trigger: p, start: 'top 80%', end: 'top 25%', scrub: 0.6 }
      });
      const device = $('.device', p);
      gsap.fromTo(device, { y: 80, rotateX: 10, autoAlpha: 0, transformPerspective: 1200 }, {
        y: 0, rotateX: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: p, start: 'top 70%', once: true },
        clearProps: 'transform'
      });
    });
  }

  function initTerminal() {
    const term = $('[data-terminal]');
    if (!term) return;
    const script = [
      ['t-cmd', 'mvn clean test -Dsuite=e2e'],
      ['t-dim', '[INFO] Building saucedemo-automation 1.0'],
      ['t-info', '[TestNG] Running: SauceDemo E2E Suite'],
      ['t-pass', '  ✓ LoginTest.validCredentials          0.84s'],
      ['t-pass', '  ✓ LoginTest.lockedOutUserRejected     0.61s'],
      ['t-pass', '  ✓ InventoryTest.addProductToCart      1.12s'],
      ['t-pass', '  ✓ CartTest.verifyCartContents         0.73s'],
      ['t-pass', '  ✓ CheckoutTest.completePurchase       1.95s'],
      ['t-pass', '  ✓ LogoutTest.sessionEnds              0.48s'],
      ['t-sum', 'Tests run: 6, Failures: 0, Skipped: 0'],
      ['t-pass', '[INFO] BUILD SUCCESS · Jenkins #48 ✓']
    ];
    let running = false, timer = null;
    const play = () => {
      if (running) return; running = true;
      term.textContent = '';
      let i = 0;
      const next = () => {
        if (i >= script.length) { timer = setTimeout(() => { running = false; play(); }, 3600); return; }
        const [cls, txt] = script[i++];
        const line = document.createElement('div');
        line.className = 't-line ' + cls; line.textContent = txt;
        term.appendChild(line);
        timer = setTimeout(next, cls === 't-cmd' ? 700 : 320);
      };
      next();
    };
    if (reduced || !('IntersectionObserver' in window)) {
      script.forEach(([cls, txt]) => { const l = document.createElement('div'); l.className = 't-line ' + cls; l.textContent = txt; term.appendChild(l); });
      return;
    }
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) play();
      else { clearTimeout(timer); running = false; }
    }, { threshold: 0.3 }).observe(term);
  }

  /* ---------- 14. Hover list preview (live front pages) ---------- */
  function initMorePreview() {
    const preview = $('.more-preview');
    if (!preview || isTouch) return;
    const img = $('.mp-img', preview), url = $('.mp-url', preview);
    let x = 0, y = 0, tx = 0, ty = 0, on = false;
    $$('.more-list a').forEach(a => {
      a.addEventListener('pointerenter', () => {
        if (innerWidth <= 1024) return; // thumbnails are shown inline on smaller screens
        img.src = a.dataset.preview;
        url.textContent = a.dataset.host;
        preview.classList.add('is-on'); on = true;
      });
      a.addEventListener('pointerleave', () => { preview.classList.remove('is-on'); on = false; });
    });
    addEventListener('pointermove', e => { tx = e.clientX + 28; ty = e.clientY - 130; }, { passive: true });
    const loop = () => {
      x += (tx - x) * 0.14; y += (ty - y) * 0.14;
      if (on || preview.classList.contains('is-on')) preview.style.translate = `${x}px ${y}px`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- 15. Marquees ---------- */
  function initMarquees() {
    const tweens = [];
    $$('[data-marquee]').forEach(m => {
      const track = $('.marquee-track', m);
      [...track.children].forEach(c => { const k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); track.appendChild(k); });
      const reverse = m.dataset.marquee === 'reverse';
      const speed = parseFloat(m.dataset.speed || 40);
      tweens.push(gsap.fromTo(track, { xPercent: reverse ? -50 : 0 }, { xPercent: reverse ? 0 : -50, duration: speed, ease: 'none', repeat: -1 }));
    });
    let ts = 1;
    gsap.ticker.add(() => {
      const v = lenis ? Math.abs(lenis.velocity || 0) : 0;
      ts += ((1 + Math.min(v / 6, 4)) - ts) * 0.08;
      tweens.forEach(t => t.timeScale(ts));
    });
  }

  /* ---------- 16. 85% counter + fill ---------- */
  function initAchievement() {
    const vals = $$('.ach-val');
    const o = { v: 0 };
    vals.forEach(v => { v.textContent = '0'; });
    gsap.timeline({ scrollTrigger: { trigger: '.ach-hero', start: 'top 80%', end: 'bottom 60%', scrub: 0.8 } })
      .to(o, { v: 85, ease: 'none', onUpdate: () => { const r = Math.round(o.v); vals.forEach(v => { v.textContent = r; }); } }, 0)
      .fromTo('.ach-fill', { clipPath: 'inset(100% -20% -10% -20%)' }, { clipPath: 'inset(0% -20% -10% -20%)', ease: 'none' }, 0);
  }

  /* ---------- Footer wordmark: fit to width ---------- */
  function fitFooterMark() {
    const wrap = $('.footer-mark'), mark = $('.footer-mark span');
    if (!wrap || !mark) return;
    const fit = () => {
      const cs = getComputedStyle(wrap);
      const avail = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      mark.style.display = 'inline-block';
      mark.style.fontSize = '100px';
      const w = mark.getBoundingClientRect().width;
      mark.style.display = '';
      if (w) mark.style.fontSize = (100 * avail / w).toFixed(2) + 'px';
      if (hasGSAP) ScrollTrigger.refresh();
    };
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    addEventListener('resize', debounce(fit, 150));
  }

  /* ---------- Footer wordmark rise ---------- */
  function initFooterMark() {
    gsap.fromTo('.footer-mark span', { yPercent: 60 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 }
    });
  }

  /* ---------- 17. GitHub feed ---------- */
  const LANG_COLORS = { JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5', Java: '#B07219', HTML: '#E34C26', CSS: '#563D7C', 'Jupyter Notebook': '#DA5B0B', Shell: '#89E051' };
  const FALLBACK_REPOS = [
    ['bug-tracker-main', 'Bug Tracker Web Application built with Python and Flask: auth, bug lifecycle, severity, search and dashboard.', 'Python'],
    ['finance-predictor', 'Financial prediction web app with an interactive 3D interface and backend API.', 'HTML'],
    ['chatbot-AI', '', null],
    ['agriprecision-ai', '', null],
    ['url-shortener', '', null],
    ['portfolio', '', 'HTML']
  ].map(([name, description, language]) => ({ name, description, language, html_url: 'https://github.com/Ashish9123/' + name, stargazers_count: null, updated_at: null }));

  // Used when a repository has no description on GitHub yet
  const REPO_BLURBS = {
    'url-shortener': 'Short links, fast redirects and a clean API.',
    'chatbot-ai': 'A conversational AI assistant built on NLP.',
    'agriprecision-ai': 'AI for smarter, data-driven agriculture.',
    'portfolio': 'Earlier portfolio builds. This site is the latest.',
    'finance-predictor': 'Predictive models applied to financial data.',
    'bug-tracker-main': 'Flask bug tracker with auth, bug lifecycle and CRUD.'
  };

  function repoCard(r) {
    const a = document.createElement('a');
    a.className = 'repo glass spot';
    a.href = r.html_url; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('data-tilt', ''); a.setAttribute('data-cursor', 'OPEN ↗');

    const top = document.createElement('div'); top.className = 'repo-top';
    const name = document.createElement('span'); name.className = 'repo-name'; name.textContent = r.name;
    top.appendChild(name);
    top.insertAdjacentHTML('beforeend', '<svg aria-hidden="true"><use href="#i-arrow"/></svg>');

    const desc = document.createElement('p'); desc.className = 'repo-desc';
    desc.textContent = r.description || 'No description yet. Open the repository to explore the code.';

    const meta = document.createElement('div'); meta.className = 'repo-meta mono';
    if (r.language) {
      const l = document.createElement('span'); l.className = 'lang'; l.textContent = r.language;
      l.style.setProperty('--lang', LANG_COLORS[r.language] || '#2E6BFF'); meta.appendChild(l);
    }
    if (r.stargazers_count !== null && r.stargazers_count !== undefined) {
      const s = document.createElement('span'); s.textContent = '★ ' + r.stargazers_count; meta.appendChild(s);
    }
    if (r.updated_at) {
      const u = document.createElement('span');
      u.textContent = 'Updated ' + new Date(r.updated_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
      meta.appendChild(u);
    }
    a.append(top, desc, meta);
    return a;
  }

  async function initGitHub() {
    const grid = $('#repo-grid');
    if (!grid) return;
    grid.innerHTML = '<div class="repo-skel"></div>'.repeat(6);
    const KEY = 'ak-gh-v1';
    let data = null;
    try {
      const c = JSON.parse(localStorage.getItem(KEY));
      if (c && Date.now() - c.t < 3600e3) data = c;
    } catch (e) { /* storage unavailable */ }

    if (!data) {
      try {
        const [u, r] = await Promise.all([
          fetch('https://api.github.com/users/Ashish9123'),
          fetch('https://api.github.com/users/Ashish9123/repos?sort=updated&per_page=100')
        ]);
        if (!u.ok || !r.ok) throw new Error('GitHub API ' + u.status + '/' + r.status);
        const user = await u.json(), repos = await r.json();
        data = {
          t: Date.now(),
          count: user.public_repos,
          repos: repos.filter(x => !x.fork && x.name.toLowerCase() !== 'ashish9123').map(x => ({
            name: x.name, description: x.description, language: x.language,
            stargazers_count: x.stargazers_count, updated_at: x.pushed_at || x.updated_at, html_url: x.html_url
          }))
        };
        try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
      } catch (e) { data = null; }
    }

    const list = (data && data.repos.length) ? data.repos.slice(0, 6) : FALLBACK_REPOS;
    list.forEach(r => { if (!r.description) r.description = REPO_BLURBS[r.name.toLowerCase()] || ''; });
    if (data && data.count) $('#gh-count').textContent = data.count + ' public repositories';
    grid.textContent = '';
    list.forEach((r, i) => {
      const card = repoCard(r);
      grid.appendChild(card);
      if (anim) gsap.fromTo(card, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.07, scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
    });
    if (hasGSAP) ScrollTrigger.refresh();
  }

  /* ---------- 19. Cursor, magnetic, tilt, spotlight ---------- */
  function initPointer() {
    // Spotlight (works everywhere a mouse exists)
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    if (isTouch || reduced) return;

    // Tilt
    let tiltEl = null;
    const resetTilt = el => { if (el) el.style.transform = ''; };
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest('[data-tilt]');
      if (el !== tiltEl) { resetTilt(tiltEl); tiltEl = el; }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
    });
    document.addEventListener('pointerleave', () => { resetTilt(tiltEl); tiltEl = null; });

    if (!hasGSAP) return;

    // Inspector cursor: a ring that follows, and a dashed box that snaps around whatever you point at
    root.classList.add('has-cursor');
    const cursor = $('.cursor'), dot = $('.cursor-dot'), ring = $('.cursor-ring'), box = $('.cursor-box'), tag = $('.cursor-tag');
    const SEL = 'a, button, [data-cursor], [data-inspect]';
    const label = $('.cursor-label');
    const describe = el => {
      if (el.dataset.inspect) return el.dataset.inspect;
      const t = el.tagName.toLowerCase();
      if (el.id) return t + '#' + el.id;
      return el.classList[0] ? t + '.' + el.classList[0] : t;
    };
    let mx = -100, my = -100, rx = -100, ry = -100, target = null, hovered = null;
    const b = { x: 0, y: 0, w: 0, h: 0 };
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; cursor.classList.remove('is-hidden'); }, { passive: true });
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('pointerover', e => {
      const t = e.target.closest && e.target.closest(SEL);
      if (t === hovered) return;
      hovered = t;
      const had = !!target;
      target = t;
      if (!t) { cursor.classList.remove('is-inspecting', 'has-label'); return; }
      // Elements with a label get the big filled ring; everything else gets the inspector box
      if (t.dataset.cursor) {
        label.textContent = t.dataset.cursor;
        cursor.classList.add('has-label'); cursor.classList.remove('is-inspecting');
        target = null;
        return;
      }
      cursor.classList.remove('has-label');
      tag.textContent = describe(t);
      if (!had) { const r = t.getBoundingClientRect(); Object.assign(b, { x: r.left - 6, y: r.top - 6, w: r.width + 12, h: r.height + 12 }); }
      cursor.classList.add('is-inspecting');
    });
    gsap.ticker.add(() => {
      rx += (mx - rx) * 0.25; ry += (my - ry) * 0.25;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      if (!target) return;
      if (!target.isConnected) { target = null; cursor.classList.remove('is-inspecting'); return; }
      const r = target.getBoundingClientRect();
      b.x += (r.left - 6 - b.x) * 0.3; b.y += (r.top - 6 - b.y) * 0.3;
      b.w += (r.width + 12 - b.w) * 0.3; b.h += (r.height + 12 - b.h) * 0.3;
      box.style.transform = `translate3d(${b.x}px,${b.y}px,0)`;
      box.style.width = b.w + 'px'; box.style.height = b.h + 'px';
    });

    // Magnetic
    const clamp = gsap.utils.clamp(-12, 12);
    $$('[data-magnetic]').forEach(b => {
      const inner = b.querySelector('span') || b;
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        gsap.to(b, { x: clamp(x * 0.3), y: clamp(y * 0.4), duration: 0.4, ease: 'power3.out' });
        gsap.to(inner, { x: clamp(x * 0.12) * 1.5, y: clamp(y * 0.12) * 1.5, duration: 0.4, ease: 'power3.out' });
      });
      b.addEventListener('pointerleave', () => {
        gsap.to([b, inner], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ---------- 20. Nav, rail, menu, copy, time ---------- */
  function initChrome() {
    const nav = $('.nav');
    const body = document.body;
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      nav.classList.toggle('is-scrolled', y > 100);
      if (!body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > lastY && y > 300);
      lastY = y;
      if (!hasGSAP) {
        const max = document.documentElement.scrollHeight - innerHeight;
        root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Anchor links
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = id === '#top' ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(target);
    });

    // Menu
    const toggle = $('.menu-toggle'), menu = $('#menu');
    function closeMenu() {
      if (!body.classList.contains('menu-open')) return;
      body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu');
      menu.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
    }
    toggle.addEventListener('click', () => {
      if (body.classList.contains('menu-open')) return closeMenu();
      body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', 'Close menu');
      menu.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
    });
    addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    // Copy email
    const toast = $('.toast');
    let toastT;
    const showToast = msg => { toast.textContent = msg; toast.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('is-on'), 2200); };
    $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
      const v = btn.dataset.copy;
      try { await navigator.clipboard.writeText(v); showToast('Email copied ✓'); }
      catch (e) { location.href = 'mailto:' + v; }
    }));

    // Local time (IST)
    const timeEl = $('#local-time');
    const fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => { timeEl.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 30000);
  }

  function initRail() {
    const items = $$('.rail-item');
    const navLinks = $$('.nav-links a');
    const setStage = n => {
      items.forEach((it, i) => { it.classList.toggle('is-active', i === n); it.classList.toggle('is-done', i < n); });
      const href = items[n] && $('a', items[n]).getAttribute('href');
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === href));
    };
    $$('[data-stage]').forEach(sec => {
      const n = +sec.dataset.stage;
      ScrollTrigger.create({
        trigger: sec, start: 'top 55%', end: 'bottom 55%',
        onToggle: st => { if (st.isActive) setStage(n); }
      });
    });
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => root.style.setProperty('--progress', s.progress.toFixed(4)) });
  }

  /* ---------- 3D background: a particle field that re-forms per section ---------- */
  // ~9k particles burst apart and reassemble into a new engineering shape as you scroll
  // between sections. Real-time Three.js, so it needs no video assets.
  function initBackground3D() {
    const canvas = $('.bg3d');
    if (!canvas || typeof window.THREE === 'undefined') { if (canvas) canvas.remove(); return; }
    const T = window.THREE;
    let renderer;
    try { renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' }); }
    catch (e) { canvas.remove(); return; }

    const N = isMobile() ? 4500 : 9000;
    const rand = (a = 1) => (Math.random() * 2 - 1) * a;
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

    /* -- Shape generators: each returns Float32Array(N * 3), roughly 4.5 units wide -- */
    const make = fn => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const p = fn(i); a[i * 3] = p[0]; a[i * 3 + 1] = p[1]; a[i * 3 + 2] = p[2]; } return a; };

    const sphere = () => make(i => {
      const k = i + 0.5, phi = Math.acos(1 - 2 * k / N), th = Math.PI * (1 + Math.sqrt(5)) * k;
      const r = 2.1 + gauss() * 0.06;
      return [r * Math.cos(th) * Math.sin(phi), r * Math.cos(phi), r * Math.sin(th) * Math.sin(phi)];
    });

    // Sample filled pixels of text drawn on a 2D canvas
    function fromText(str, width = 6, weight = 700, family = '"Space Grotesk", sans-serif') {
      const c = document.createElement('canvas'); c.width = 640; c.height = 320;
      const x = c.getContext('2d');
      x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = `${weight} 230px ${family}`;
      x.fillText(str, 320, 170);
      return fromCanvas(x, 640, 320, width, (r, g, b, a) => (a > 140 ? 1 : 0), 0.35);
    }
    // Generic: pick pixels with probability = weight(r,g,b,a,x,y); z = depth jitter (or relief)
    function fromCanvas(ctx, w, h, width, weightFn, depth, reliefFn) {
      const d = ctx.getImageData(0, 0, w, h).data;
      const pts = [];
      for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
        const o = (y * w + x) * 4;
        const wt = weightFn(d[o], d[o + 1], d[o + 2], d[o + 3], x / w, y / h);
        if (wt > 0.02) pts.push([x, y, wt]);
      }
      if (!pts.length) return sphere();
      const scale = width / w;
      return make(() => {
        let p;
        for (let tries = 0; tries < 12; tries++) { p = pts[(Math.random() * pts.length) | 0]; if (Math.random() < p[2]) break; }
        const z = reliefFn ? reliefFn(p) : rand(depth);
        return [(p[0] - w / 2) * scale + rand(scale), -(p[1] - h / 2) * scale + rand(scale), z];
      });
    }

    const layers = () => make(() => {
      const L = (Math.random() * 5) | 0;
      const y = -1.7 + L * 0.85;
      const edge = Math.random() < 0.35;
      let x = rand(1.9), z = rand(1.9);
      if (edge) { if (Math.random() < 0.5) x = Math.sign(x) * 1.9; else z = Math.sign(z) * 1.9; }
      return [x, y + gauss() * 0.02, z];
    });

    const racks = () => make(() => {
      const cx = ((Math.random() * 3) | 0) - 1, cy = ((Math.random() * 3) | 0) - 1, cz = ((Math.random() * 3) | 0) - 1;
      const s = 0.42, g = 1.15;
      const axis = (Math.random() * 3) | 0, t = rand(s);
      const a = Math.random() < 0.5 ? -s : s, b = Math.random() < 0.5 ? -s : s;
      const e = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
      return [cx * g + e[0], cy * g + e[1], cz * g + e[2]];
    });

    const knot = () => make(() => {
      const t = Math.random() * Math.PI * 2, p = 2, q = 3;
      const r = 1.25 + 0.55 * Math.cos(q * t);
      const c = [r * Math.cos(p * t), 0.55 * Math.sin(q * t) * 1.4, r * Math.sin(p * t)];
      return [c[0] + gauss() * 0.12, c[1] + gauss() * 0.12, c[2] + gauss() * 0.12];
    });

    const neural = () => {
      const hubs = Array.from({ length: 42 }, () => { const u = Math.random(), r = 2.3 * Math.cbrt(u), th = Math.random() * 6.283, ph = Math.acos(rand()); return [r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.8, r * Math.sin(ph) * Math.sin(th)]; });
      const near = hubs.map((h, i) => { let best = -1, bd = 1e9; hubs.forEach((k, j) => { if (j === i) return; const d = (h[0] - k[0]) ** 2 + (h[1] - k[1]) ** 2 + (h[2] - k[2]) ** 2; if (d < bd) { bd = d; best = j; } }); return best; });
      return make(() => {
        const i = (Math.random() * hubs.length) | 0, h = hubs[i];
        if (Math.random() < 0.45) return [h[0] + gauss() * 0.13, h[1] + gauss() * 0.13, h[2] + gauss() * 0.13];
        const k = hubs[Math.random() < 0.6 ? near[i] : (Math.random() * hubs.length) | 0], t = Math.random();
        return [h[0] + (k[0] - h[0]) * t + gauss() * 0.02, h[1] + (k[1] - h[1]) * t + gauss() * 0.02, h[2] + (k[2] - h[2]) * t + gauss() * 0.02];
      });
    };

    const galaxy = () => make(() => {
      const r = Math.pow(Math.random(), 0.75) * 3.2, arm = (Math.random() * 3) | 0;
      const a = r * 1.35 + arm * (Math.PI * 2 / 3) + gauss() * 0.35 / (0.4 + r);
      return [Math.cos(a) * r, gauss() * 0.12 * (1.4 - r / 3.2), Math.sin(a) * r];
    });

    /* -- Sections → shape, horizontal offset, scale and opacity -- */
    const fit = () => Math.min(1, (innerWidth / innerHeight) / 1.25);
    const anchors = [
      { sel: '#top', shape: sphere(), x: 0, s: 1.0, a: 0, spin: 1 },
      { sel: '#about', shape: fromText('</>'), x: 0.0, s: 1.0, a: 0.55, spin: 0 },
      { sel: '.mission', shape: sphere(), x: 2.35, s: 0.95, a: 0.95, spin: 0, portrait: true },
      { sel: '#build', shape: layers(), x: 0, s: 1.0, a: 0.75, spin: 1 },
      { sel: '#work', shape: racks(), x: 2.2, s: 0.95, a: 0.32, spin: 1 },
      { sel: '#stack', shape: fromText('{ }'), x: 0, s: 1.1, a: 0.6, spin: 0 },
      { sel: '.achievements', shape: knot(), x: 2.3, s: 1.0, a: 0.6, spin: 1 },
      { sel: '.ai', shape: neural(), x: 0, s: 1.15, a: 1, spin: 1 },
      { sel: '#contact', shape: galaxy(), x: 0, s: 1.1, a: 0.85, spin: 1 }
    ].filter(a => $(a.sel));

    // Your portrait in particles (the "dissolving hero" moment). Falls back to "AK" if the image can't be read.
    const portraitIdx = anchors.findIndex(a => a.portrait);
    if (portraitIdx > -1) {
      anchors[portraitIdx].shape = fromText('AK');
      const img = new Image();
      img.onload = () => {
        try {
          const w = 180, h = 225, c = document.createElement('canvas'); c.width = w; c.height = h;
          const x = c.getContext('2d'); x.drawImage(img, 0, 0, w, h);
          const d = x.getImageData(0, 0, w, h).data;
          const L = new Float32Array(w * h);
          for (let i = 0; i < w * h; i++) L[i] = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255;
          const inBody = (u, v) => (((u - 0.5) / 0.25) ** 2 + ((v - 0.32) / 0.29) ** 2 < 1) || (v > 0.52 && Math.abs(u - 0.5) < 0.1 + (v - 0.52) * 1.15);
          // Weight = edges (features) + darkness (hair, eyes, beard), less on the suit
          const pts = [];
          for (let yy = 1; yy < h - 1; yy++) for (let xx = 1; xx < w - 1; xx++) {
            const u = xx / w, v = yy / h;
            if (!inBody(u, v)) continue;
            const i = yy * w + xx, gx = L[i + 1] - L[i - 1], gy = L[i + w] - L[i - w];
            let wt = Math.min(1, 0.07 + Math.hypot(gx, gy) * 4 + Math.max(0, 0.42 - L[i]) * 1.8);
            if (v > 0.62) wt *= 0.45;
            if (wt > 0.02) pts.push(xx, yy, wt, L[i]);
          }
          const cnt = pts.length / 4, scale = 3.5 / w, sh = new Float32Array(N * 3);
          for (let n = 0; n < N; n++) {
            let k = 0;
            for (let t = 0; t < 14; t++) { k = ((Math.random() * cnt) | 0) * 4; if (Math.random() < pts[k + 2]) break; }
            sh[n * 3] = (pts[k] - w / 2) * scale + rand(scale * 0.5);
            sh[n * 3 + 1] = -(pts[k + 1] - h / 2) * scale + rand(scale * 0.5);
            // relief: the face pushes toward the camera, dark areas sit slightly back
            const u = pts[k] / w - 0.5, v = pts[k + 1] / h - 0.32;
            sh[n * 3 + 2] = Math.max(0, 0.55 - (u * u + v * v) * 2.2) + (pts[k + 3] - 0.5) * 0.25 + rand(0.05);
          }
          anchors[portraitIdx].shape = sh;
          if (seg === portraitIdx || seg + 1 === portraitIdx) setSegment(seg, true);
        } catch (e) { /* tainted canvas (file://) — keep the AK fallback */ }
      };
      img.src = 'assets/img/ashish-portrait.jpg?v=2';
    }

    /* -- Scene -- */
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    const geo = new T.BufferGeometry();
    const from = new Float32Array(N * 3), to = new Float32Array(N * 3), rnd = new Float32Array(N);
    for (let i = 0; i < N; i++) rnd[i] = Math.random();
    geo.setAttribute('position', new T.BufferAttribute(from, 3));
    geo.setAttribute('aTo', new T.BufferAttribute(to, 3));
    geo.setAttribute('aRand', new T.BufferAttribute(rnd, 1));

    const uniforms = {
      uMix: { value: 0 }, uTime: { value: 0 }, uTurb: { value: 0 },
      uSize: { value: isMobile() ? 30 : 38 }, uPR: { value: Math.min(devicePixelRatio || 1, 1.75) },
      uAlpha: { value: 0 }
    };
    const mat = new T.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: T.AdditiveBlending,
      vertexShader: `
        attribute vec3 aTo; attribute float aRand;
        uniform float uMix, uTime, uTurb, uSize, uPR;
        varying float vRand; varying float vFlash;
        void main() {
          float d = clamp((uMix - aRand * 0.35) / 0.65, 0.0, 1.0);
          d = d * d * (3.0 - 2.0 * d);
          vec3 p = mix(position, aTo, d);
          float burst = sin(d * 3.14159) * (0.85 + uTurb);
          p += normalize(p + vec3(0.001)) * burst * (0.4 + aRand * 1.4);
          p += vec3(sin(uTime * 0.7 + aRand * 40.0), cos(uTime * 0.6 + aRand * 31.0), sin(uTime * 0.5 + aRand * 23.0)) * (0.025 + burst * 0.35 + uTurb * 0.05);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * uPR * (0.35 + aRand * 0.9) / -mv.z;
          vRand = aRand; vFlash = burst;
        }`,
      fragmentShader: `
        uniform float uAlpha;
        varying float vRand; varying float vFlash;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float r = length(c);
          if (r > 0.5) discard;
          float a = smoothstep(0.5, 0.0, r);
          vec3 cyan = vec3(0.13, 0.83, 0.93), blue = vec3(0.18, 0.42, 1.0), violet = vec3(0.55, 0.36, 0.96);
          vec3 col = vRand < 0.5 ? mix(cyan, blue, vRand * 2.0) : mix(blue, violet, (vRand - 0.5) * 2.0);
          col = mix(col, vec3(1.0), 0.06 + vFlash * 0.22);
          gl_FragColor = vec4(col, a * a * uAlpha * (0.75 + vRand * 0.5));
        }`
    });
    const points = new T.Points(geo, mat);
    const group = new T.Group();
    group.add(points);
    scene.add(group);

    /* -- Scroll mapping -- */
    let tops = [];
    const measure = () => {
      tops = anchors.map(a => {
        const el = $(a.sel);
        const box = el.parentElement && el.parentElement.classList.contains('pin-spacer') ? el.parentElement : el;
        const r = box.getBoundingClientRect();
        return r.top + scrollY + Math.min(r.height, innerHeight * 1.5) / 2;
      });
    };
    let seg = -1;
    function setSegment(k, force) {
      if (k === seg && !force) return;
      seg = k;
      from.set(anchors[k].shape);
      to.set(anchors[Math.min(k + 1, anchors.length - 1)].shape);
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aTo.needsUpdate = true;
    }
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

    const resize = () => {
      const w = innerWidth, h = innerHeight;
      renderer.setPixelRatio(uniforms.uPR.value);
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      measure();
    };
    resize();
    addEventListener('resize', debounce(resize, 200));
    addEventListener('load', measure);
    if (hasGSAP) ScrollTrigger.addEventListener('refresh', measure);

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    if (!isTouch) addEventListener('pointermove', e => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; }, { passive: true });

    let mixS = 0, xS = 0, sS = 1, aS = 0, ang = 0, last = performance.now();
    const frame = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const c = scrollY + innerHeight / 2;
      let k = 0;
      while (k < tops.length - 2 && c > tops[k + 1]) k++;
      const f = Math.min(1, Math.max(0, (c - tops[k]) / Math.max(1, tops[k + 1] - tops[k])));
      setSegment(k);
      const m = smooth(0.18, 0.82, f);
      const A = anchors[k], B = anchors[Math.min(k + 1, anchors.length - 1)];
      const ease = reduced ? 1 : 1 - Math.pow(0.0015, dt);
      mixS = reduced ? m : lerp(mixS, m, ease);
      if (Math.abs(mixS - m) > 0.5) mixS = m; // segment jump
      xS = lerp(xS, lerp(A.x, B.x, m) * fit(), ease);
      sS = lerp(sS, lerp(A.s, B.s, m) * 1.3 * (0.7 + 0.3 * fit()), ease);
      aS = lerp(aS, lerp(A.a, B.a, m), ease);
      const vel = lenis ? Math.min(Math.abs(lenis.velocity || 0) / 30, 1) : 0;
      uniforms.uMix.value = mixS;
      uniforms.uTurb.value = lerp(uniforms.uTurb.value, vel, 0.1);
      uniforms.uAlpha.value = aS;
      if (!reduced) uniforms.uTime.value += dt;
      mx = lerp(mx, tmx, 0.05); my = lerp(my, tmy, 0.05);
      // 3D shapes keep turning; flat ones (text, portrait) settle to face the camera
      const spinW = lerp(A.spin, B.spin, m);
      if (spinW > 0.5) ang += dt * (reduced ? 0 : 0.35) + vel * dt * 2;
      else ang = lerp(ang, Math.round(ang / (Math.PI * 2)) * Math.PI * 2, ease);
      group.position.x = xS;
      group.scale.setScalar(sS);
      group.rotation.y = ang + (mx * 0.5) * (spinW > 0.5 ? 1 : 0.6);
      group.rotation.x = lerp(0.04, 0.32, spinW) + my * 0.3;
      if (aS > 0.005) renderer.render(scene, camera);
      else renderer.clear();
    };
    measure();
    if (hasGSAP) gsap.ticker.add(() => frame(performance.now()));
    else { const loop = now => { frame(now); requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
    root.classList.add('has-bg3d');
  }

  /* ---------- Letter-roll links ---------- */
  function initRoll() {
    $$('[data-roll]').forEach(el => {
      const text = el.textContent.trim();
      const wrap = document.createElement('span'); wrap.className = 'roll';
      const a = document.createElement('span'); a.textContent = text;
      const b = document.createElement('span'); b.textContent = text; b.setAttribute('aria-hidden', 'true');
      wrap.append(a, b);
      el.textContent = '';
      el.appendChild(wrap);
    });
  }

  /* ---------- Headshot inspection ---------- */
  function initPortraitInspect() {
    gsap.timeline({ scrollTrigger: { trigger: '.portrait', start: 'top 80%', end: 'top 20%', scrub: 0.6 } })
      .fromTo('.portrait-sweep', { top: '2%', opacity: 1 }, { top: '97%', duration: 0.7, ease: 'none' }, 0)
      .to('.portrait-sweep', { opacity: 0, duration: 0.1 }, 0.7)
      .fromTo('.portrait .corner', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05 }, 0.1)
      .fromTo('.portrait figcaption', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.6);
  }

  /* ---------- Easter egg: type "ship" ---------- */
  function initEgg() {
    let buf = '';
    addEventListener('keydown', e => {
      if (e.key.length !== 1 || (e.target.closest && e.target.closest('input, textarea'))) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf !== 'ship') return;
      buf = '';
      const egg = document.createElement('div');
      egg.className = 'egg'; egg.setAttribute('role', 'status');
      const msg = document.createElement('span');
      msg.append('Shipped to production ');
      const tick = document.createElement('b'); tick.textContent = '✓'; msg.appendChild(tick);
      egg.appendChild(msg);
      document.body.appendChild(egg);
      if (!anim) { setTimeout(() => egg.remove(), 1600); return; }
      gsap.timeline({ onComplete: () => egg.remove() })
        .from(egg, { opacity: 0, duration: 0.3 })
        .from(msg, { scale: 1.1, duration: 0.7, ease: 'expo.out' }, 0)
        .to(egg, { opacity: 0, duration: 0.4 }, 1.4);
    });
  }

  /* ---------- 21. Boot ---------- */
  async function boot() {
    initRoll();
    splitHeroName();
    initChrome();
    fitFooterMark();
    initEgg();
    initPointer();
    initCanvases();
    initBackground3D();
    initTerminal();
    initGitHub();

    if (!hasGSAP) { const pre = $('.preloader'); if (pre) pre.remove(); return; }

    initScenes();

    if (reduced) {
      const pre = $('.preloader'); if (pre) pre.remove();
      initRail();
      return;
    }

    initLenis();
    if (lenis) lenis.stop();
    initPins();
    initReveals();
    initScramble();
    initCounters();
    initProjects();
    initMarquees();
    initAchievement();
    initRail();
    initPortraitInspect();
    initMorePreview();
    initFooterMark();

    await runPreloader();
    if (lenis) lenis.start();
    playHero();

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    addEventListener('load', () => ScrollTrigger.refresh());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
