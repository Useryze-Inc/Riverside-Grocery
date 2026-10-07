# Riverside Grocery: demo webpage

This is a **demo webpage**, built from a design handoff so the layout, motion and responsive behaviour can be reviewed. It is not a live production site.

## Contact details used in the page

These are sample details taken from the design reference. Check and replace them before anything goes live.

| Item | Value in the page | Where to change it |
| --- | --- | --- |
| Phone | (512) 444-2297 (`tel:+15124442297`) | Header, hero, visit section, footer, floating button in `index.html` |
| Address | 1727 E Riverside Dr, Austin, TX 78741 | Hero, visit section, closing section, footer, and the map and directions links in `index.html` |
| Hours | Open 24 Hours | Hero, highlight strip, store story, visit section, footer |
| Copyright | © 2024 Riverside Grocery | Footer |

## Other things to know

- The "Get Directions" buttons and the map embed point at Google Maps for the address above.
- The hero and closing banners are low-resolution crops from a screenshot. Replace them with originals at about 2400px wide.
- Product, store and logo images are placeholders cropped from the same reference.

## Folder structure

```
riverside/
├── index.html
├── DEMO.md
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── brand/       logo.png
        ├── hero/        storefront-banner.png
        ├── categories/  groceries.png, snacks.png, cold-drinks.png, convenience.png, beer.png
        ├── store/       interior.png
        └── cta/         basket-banner.png
```
