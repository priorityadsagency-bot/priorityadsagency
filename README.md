# Priority Ads Agency website

Static website for **Priority Ads Agency**, a digital marketing agency in Bengaluru. Live: https://priorityadsagency.com

## Structure
| Path | What it is |
|---|---|
| `index.html`, `about.html`, `portfolio.html`, `courses.html`, `contact.html`, `privacy.html`, `404.html` | Main pages |
| `portfolio/*.html` | 16 service pages |
| `assets/style.css`, `assets/main.js` | Site styles and scripts |
| `assets/consent.js` | Cookie banner + Meta Pixel / GA4 (set the IDs at the top of the file) |
| `assets/**/*.avif` | Images (AVIF); `assets/reels/*.mp4` short videos |
| `templates/` | Live demo websites shown in the portfolio previews; `templates/_vendor` holds pinned third-party libraries |
| `vercel.json` | Vercel security headers, caching and www redirect |
| `.htaccess`, `_headers` | The same rules for Apache/LiteSpeed (Hostinger, cPanel) and Netlify/Cloudflare Pages |
| `robots.txt`, `sitemap.xml`, `site.webmanifest`, `.well-known/security.txt` | SEO and security metadata |
| `tools/update-cache-version.py` | Cache busting script |

## Editing rules
- After editing `assets/style.css`, `assets/main.js` or `assets/consent.js`, run `python tools/update-cache-version.py` and commit the updated `.html` files too (CSS/JS are cached for a year by version).
- The Content-Security-Policy lives in three places that must match: each page's `<meta>` tag, `vercel.json`, and `.htaccess`/`_headers`. Never add `'unsafe-inline'` to the main site's `script-src`; put new scripts in separate `.js` files.
- No build step: deploy the folder as it is (Vercel: Framework "Other", no build command, output directory `./`).
