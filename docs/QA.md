# Local QA — current rebuild 30/10/2026

This supersedes the first layout’s QA. Current machine-readable evidence: rebuild/final-check.json. Reference measurements/screenshots: reference/.

- JavaScript check and production build pass.
- Chromium 1440, 1280, 1024, 768, 767, 390, 320px: no horizontal overflow; no missing internal anchors; no broken loaded images.
- At 1440×1000 all nine section/footer top coordinates and heights match the inspected reference. No internal vertical overflow.
- Event panels hold at 50px and scale while scrolling; observed scale at scrollY4000 = 0.955437.
- Gallery has 17 unique photographs plus aria-hidden looping duplicates. Desktop autoscroll, explicit pause, navigation arrows, image enlargement, next-image key and Escape passed.
- Mobile menu, seat-map enlargement, FAQ, story chapters, venue/map dialog, reduced motion and tear-ticket return-to-top passed.
- All purchase links point to https://orchestars.vn/events/ttc2026. No transaction performed.
- No JavaScript page errors in the checks.
- Reviewed desktop hero, movement, event, four photographic price columns, event panel, archive, about, belief, footer, mobile hero/full page.

Limits: not a pixel-identity claim; reference imagery, language and audio differ. No Safari or physical-device check. No deploy.

Mobile layout was corrected after direct comparison of the reference’s 390px Nightmakers, Nights, Archive and About screenshots. Desktop captions now overlay the full 500px images. Final revised mobile screenshots are in rebuild/final-*-mobile.png.
