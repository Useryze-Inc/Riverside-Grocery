# Riverside Grocery

Static site. Open `index.html` in a browser; there's no build step. To deploy, upload the whole folder to any static host.

```
index.html          page markup, one commented block per section
css/styles.css      design tokens at the top (colours, spacing, easing), then one numbered block per section
js/main.js          header shadow, floating Call button, mobile drawer, active nav link, GSAP scroll reveals + parallax
assets/images/      one folder per section: brand, hero, categories, store, cta
```

## Editing

- **Colours / spacing:** change the variables in `:root` at the top of `css/styles.css`.
- **Images:** replace a file in `assets/images/<section>/` and keep its name.
- **Scroll reveal:** add `data-r` to any element to fade it up on scroll.
- **Phone / address:** search `index.html` for `+15124442297` and `1727 E Riverside Dr`.

## Notes

- GSAP and ScrollTrigger load from cdnjs. If they fail to load, or the visitor prefers reduced motion, everything stays visible with no animation.
- The closing CTA is 560px tall on desktop. Under 760px it becomes a minimum height, so the text never overflows.
- The two large banners (`hero/storefront-banner.png`, `cta/basket-banner.png`) are low-resolution crops. Swap in originals at 2400px wide.
