/* ==========================================================================
   Riverside Grocery | main.js

     1. Header shadow + floating Call button
     2. Mobile menu drawer
     3. Active nav link
     4. GSAP scroll reveals + store photo parallax

   Requires GSAP + ScrollTrigger (loaded in index.html). Add data-r to any
   element to fade it up on scroll. Reveals only run when <html> has .js,
   which index.html sets when GSAP loaded and reduced motion is off.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var header = doc.getElementById('nav');
  var floatBtn = doc.getElementById('float');
  var floatIcon = doc.getElementById('floatIc');

  /* 1. HEADER SHADOW + FLOATING CALL BUTTON ---------------------------------
     The button appears after the hero, collapses to its icon further down,
     and the phone icon rotates with scroll progress (eased toward target). */
  var SHOW_AFTER = 420;      // px scrolled before the button appears
  var COLLAPSE_AFTER = 900;  // px scrolled before it collapses to the icon
  var MAX_ROTATION = 540;    // degrees at the bottom of the page

  var targetDeg = 0;
  var currentDeg = 0;
  var rafId = 0;

  function rotateIcon() {
    currentDeg += (targetDeg - currentDeg) * 0.12;
    floatIcon.style.transform = 'rotate(' + currentDeg.toFixed(1) + 'deg)';
    rafId = Math.abs(targetDeg - currentDeg) > 0.05 ? requestAnimationFrame(rotateIcon) : 0;
  }

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    floatBtn.classList.toggle('show', y > SHOW_AFTER);
    floatBtn.classList.toggle('collapsed', y > COLLAPSE_AFTER);

    var maxScroll = root.scrollHeight - window.innerHeight || 1;
    targetDeg = Math.min(1, y / maxScroll) * MAX_ROTATION;
    if (!rafId) rafId = requestAnimationFrame(rotateIcon);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. MOBILE MENU DRAWER (under 960px) ------------------------------------ */
  var burger = doc.getElementById('burger');
  var drawer = doc.getElementById('drawer');

  function setDrawer(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.hidden = !open;
  }

  burger.addEventListener('click', function () { setDrawer(drawer.hidden); });
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) setDrawer(false);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !drawer.hidden) {
      setDrawer(false);
      burger.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) setDrawer(false);
  });

  /* 3. ACTIVE NAV LINK ------------------------------------------------------
     Highlights the last section whose top has passed just under the header. */
  var links = [].slice.call(doc.querySelectorAll('.menu a'));
  var sections = links.map(function (a) { return doc.querySelector(a.getAttribute('href')); });

  function updateActiveLink() {
    var probe = window.scrollY + 120;
    var active = 0;
    sections.forEach(function (s, i) {
      if (s && s.offsetTop <= probe) active = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle('on', i === active);
      if (i === active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* 4. GSAP SCROLL REVEALS + PARALLAX -------------------------------------- */
  if (!root.classList.contains('js')) return;

  gsap.registerPlugin(ScrollTrigger);

  // Batched fade-up with stagger, same easing family as the Useryze site
  ScrollTrigger.batch('[data-r]', {
    start: 'top 88%',
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, overwrite: true });
    }
  });

  // Subtle parallax on the store interior photo (desktop/tablet only)
  if (window.innerWidth > 760) {
    gsap.fromTo('#storeImg', { yPercent: -4 }, {
      yPercent: 4,
      ease: 'none',
      scrollTrigger: { trigger: '#store', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  }

  // Images and the map change layout once loaded; recalculate trigger positions
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
