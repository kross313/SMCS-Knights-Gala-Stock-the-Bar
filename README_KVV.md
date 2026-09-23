# SMCS 3rd Grade — Stock the Bar

GitHub Pages upload package for the 2026 Knights Gala.

## Upload
Upload every file and the `assets_KVV` folder to the root of the GitHub repository. Keep `index.html` at the repository root. GitHub Pages can serve the site directly from the branch root.

## Weekly update
Edit `data_KVV.js` only:
- `gala.gifted`
- `gala.received`
- `basketItems` when contributions are confirmed

The progress percentage is calculated automatically from `gifted / goalItems`.

## Site structure
- index.html — Home + scroll previews for Our Basket and Featured Item Detail
- bottles.html
- experiences.html
- barware.html
- giftcards.html
- curated.html
- contribute.html
- donate.html
- basket.html
- detail.html?id=coopers-hawk (and other experience IDs)

The site intentionally has no hamburger/menu. Navigation is through the visible category/action cards, Back/Home links, the Basket heart, and the simple quick-link footer.

The exact Giftster URL used by the build is:
https://www.giftster.com/gift/public/ZXddN/


## September 23 correction pass
- Removed visual artifacts from the logo presentation with a CSS mask.
- Replaced the translucent hero overlay with an opaque live CTA so no duplicate button text shows through.
- Added visible Room Mom contact information to every page.
- Added an Open Gmail action addressed to Kelly Van Vleet with Amanda Bond and Kelly Huston CC’d.
