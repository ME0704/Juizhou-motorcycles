# Jiuzhou Motorcycles — Website

Static site, no build step. Two pages (`index.html`, `products.html`), shared `css/style.css` and `js/main.js`, plus `js/products.js` for the bikes page interactions.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `jiuzhou-motorcycles`).
2. Push these files to the `main` branch, keeping the folder structure exactly as-is:
   ```
   index.html
   products.html
   css/style.css
   js/main.js
   js/products.js
   README.md
   ```
3. In the repo: **Settings → Pages → Source** → select `main` branch, `/ (root)` folder → **Save**.
4. GitHub will give you a URL like `https://yourusername.github.io/jiuzhou-motorcycles/`.
5. Once you buy the domain on Namecheap, add a `CNAME` file (just the domain name, one line, no `https://`) to the repo root, and point the domain's DNS to GitHub Pages (GitHub's docs walk through the A records / CNAME record needed).

## Before this goes live — placeholder checklist

Everything below is a placeholder and needs the real content swapped in:

- [ ] **Phone / WhatsApp number** — currently `+256 700 000 000` everywhere (search both HTML files for it)
- [ ] **Email** — currently `info@jiuzhoumotorcycles.com`
- [ ] **Address** — currently `Plot 12, Industrial Area, Kampala, Uganda`
- [ ] **Logo** — currently a text wordmark, not a real logo image
- [ ] **Bike photos** — every bike now uses a placehold.co dummy image (colored box with the model name as text). Replace each `<img src="https://placehold.co/...">` with a real photo — there's a main photo plus 3 gallery thumbnails per model in `products.html`
- [ ] **Showroom / office photos** — the "Who We Are" section on the homepage has 3 placeholder photos (yard, bikes in stock, service bay) — replace with real photos
- [ ] **Bike models, specs, prices** — all fictional (JZ Hauler 200, JZ Rider 125, etc.) — replace with the real lineup and confirm the full "Main Technical Parameters" spec sheet per model
- [ ] **Financing partner names** — Centenary Bank, Equity Bank, Stanbic Bank, DFCU Bank, Post Bank and Pride Microfinance are listed as placeholder text cards. **Important: these are real financial institutions — do not publish this page implying a partnership until you've actually confirmed it with each one.** Once confirmed, swap the text cards for their real approved logo files.
- [ ] **Testimonials** — written as examples, not real customers — replace or remove
- [ ] **Stats strip numbers** (12+ models, 500+ riders, etc.) — placeholder, replace with real figures or remove
- [ ] **Social links** — Facebook / Instagram / X icons currently link to `#`
- [ ] **Map** — contact section has a placeholder box, swap for a real Google Maps embed once you have the exact address

## File overview

- `index.html` — homepage: hero, stats, why-choose-us, services, financing, featured bikes, testimonials, CTA, contact
- `products.html` — full bike catalog with filter (All / Tricycles / Two-Wheelers) and tap-to-expand detail panel per bike (overview + specs tabs, mini image gallery)
- `css/style.css` — all styling for both pages
- `js/main.js` — nav, scroll reveal, animated stat counters, testimonial slider (shared across pages)
- `js/products.js` — bike filter + expand/collapse detail logic (products page only)
