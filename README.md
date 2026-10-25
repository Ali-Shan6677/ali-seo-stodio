# SEO Freelancer Website

A static website for an SEO freelancer, built with HTML, Tailwind CSS (production build) and vanilla JavaScript. It runs on GitHub Pages with no backend and no paid hosting.

## What is tested and what is not

I could not run `npm install` or the Tailwind build while creating this project (the build environment had no internet access). That means:

- **Not run yet: the CSS build.** `assets/css/styles.css` does not exist until you run `npm run build`. Without it the pages show as unstyled text. **Do this first.**
- **Not browser-tested:** layouts, the mobile menu and the form were written carefully but not viewed in a browser. Check them yourself (see the launch checklist).
- **Checked by script:** all internal links and `#anchors` resolve (apart from the CSS file you will build), every page has a unique title and description and exactly one H1, JSON-LD parses as valid JSON, the JavaScript passes a syntax check, and `npm run set-domain` rewrites URLs correctly on a test copy.
- **No Lighthouse scores are claimed.** Run Lighthouse in Chrome after deploying.

## File tree

```
seo-portfolio/
├── index.html  about.html  portfolio.html  contact.html  privacy.html  404.html
├── services/   technical-seo, on-page-seo, local-seo, keyword-research,
│               competitor-analysis, content-strategy (.html)
├── blog/       index.html + 3 articles
├── js/         config.js (your settings)  main.js (menu, form, analytics)
├── src/input.css          Tailwind source and small reusable classes
├── tailwind.config.js     colours, fonts, which files Tailwind scans
├── scripts/set-domain.mjs swaps the placeholder domain in all pages
├── robots.txt  sitemap.xml  favicon.svg
└── package.json  .gitignore  README.md
```

## 1. Install and build

1. Install Node.js (the LTS version) from nodejs.org.
2. Open a terminal in this folder and run:

```
npm install
npm run build
```

3. Confirm `assets/css/styles.css` now exists. Open `index.html` in your browser to preview.
4. While editing, run `npm run dev` to rebuild the CSS automatically. Stop it with Ctrl+C.

Rebuild (`npm run build`) after adding or changing any Tailwind classes, then commit the new CSS.

## 2. Replace the placeholders

Search the project for `[YOUR` and `YOUR-DOMAIN` and for the yellow highlighted text on pages (those are placeholders that must be replaced or removed).

| What | Where |
|---|---|
| Your name | Search `[YOUR NAME]` across all files and replace it. |
| Email, form, Calendly, social links, analytics IDs | `js/config.js` (one file) |
| Visible email text on pages without JavaScript | Search `[YOUR PROFESSIONAL EMAIL]` |
| Domain in canonical URLs, sitemap, robots, schema | Run `npm run set-domain -- https://www.yourdomain.com` |
| Email inside the homepage schema | Search `hello@YOUR-DOMAIN.com` in `index.html` |
| Prices | Search `[PRICE]` in `index.html` |
| About-page background, tools, hours | Yellow text in `about.html` |
| Privacy policy details | Yellow text in `privacy.html` (it is a template, not legal advice) |
| Demo projects | `portfolio.html`. Replace with real work and verified results only. |

For a GitHub project page (no custom domain) use `https://USERNAME.github.io/REPO-NAME` as the domain. Run `set-domain` only once with your final address. If you change it later, search and replace the old address.

The article dates are 2026-10-25. Update them if you publish later.

## 3. Turn on the contact form

GitHub Pages cannot process forms, so the form sends to **Formspree** (free tier available).

1. Create an account at formspree.io and create a new form, using your email as the destination.
2. Copy the form URL, which looks like `https://formspree.io/f/abcdwxyz`.
3. Paste it into `formEndpoint` in `js/config.js`.
4. Submit a test request from the live site and confirm the email arrives. Confirm Formspree's email verification if asked.

Until you do this the form validates input but shows a clear "not connected, your request was NOT sent" message with a link to email the request instead. It never shows a fake success message. Formspree's free plan has submission limits and its own privacy terms, so check them and mention the service in `privacy.html`.

**Booking:** put your Calendly (or similar) link in `calendlyUrl`. Leave it empty and every "Book a call" button hides itself.

## 4. Analytics and Search Console (optional, after launch)

- **GA4:** create a property at analytics.google.com, copy the Measurement ID (`G-...`) into `ga4Id`.
- **Microsoft Clarity:** create a project at clarity.microsoft.com and copy the project ID into `clarityId`.
- If you enable either, update `privacy.html` and add a cookie notice where required (for example for UK and EU visitors).
- **Search Console:** add your site at search.google.com/search-console. For a domain you own, verify with the DNS record. For a `github.io` address use the HTML file method: download the file Google gives you and place it in the project root. Then submit `sitemap.xml`. Verification, sitemap submission and indexing are separate steps and indexing can take days or weeks.

## 5. Deploy to GitHub Pages

1. Create a free account at github.com and click **New repository**. Name it (for example `seo-portfolio`), choose **Public**, and create it.
2. Make sure you have run `npm run set-domain -- <your address>` and `npm run build`.
3. In the project folder, run:

```
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

(Or use GitHub's **Add file > Upload files**. Upload everything except `node_modules`, and make sure `assets/css/styles.css` is included.)

4. In the repository go to **Settings > Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
5. Wait a minute or two. Your site appears at `https://USERNAME.github.io/REPO-NAME/`.

Pushing source files alone is not enough. The built `assets/css/styles.css` must be committed, because GitHub Pages serves files as they are and does not run Tailwind.

**Custom domain:** in **Settings > Pages > Custom domain** enter your domain, and add the DNS records GitHub lists. Enable HTTPS when available. Then run `set-domain` with the final `https://` address, rebuild if needed, and push.

### Common problems

- **Page looks unstyled:** `assets/css/styles.css` was not built or not committed.
- **404 on the live site:** wait a few minutes after the first deployment, and check Pages is set to `main` and `/ (root)`.
- **Links break on a project page:** the site uses relative paths, so it works under `/REPO-NAME/`. Do not change links to start with `/`. The 404 page sets its own base automatically.
- **Changes do not appear:** hard refresh (Ctrl+Shift+R) and check the commit was pushed.

### GitHub Pages limits

No server-side code, no private credentials or API keys in the code, forms need a third-party service, and the repository is public (anyone can read the source).

## 6. Publishing more blog articles

1. Copy `blog/local-seo-leads.html` to a new file, for example `blog/my-new-post.html`.
2. Change the title, meta description, canonical URL, Open Graph URL, headline in the JSON-LD (`Article` and `BreadcrumbList`), the heading, date and content.
3. Add a card for it in `blog/index.html` and a `<url>` entry in `sitemap.xml`.
4. Use internal links to your service pages. Do not invent statistics or sources.

The same copy-and-edit approach works for service pages. The navigation and footer are repeated in each file, so a menu change means editing every page (search for a link text to find them).

## 7. Testimonials

Add genuine ones to `testimonials` in `js/config.js` (format shown in the file). While the list is empty the homepage shows a "what working together looks like" panel. Never add fake reviews or review markup.

## 8. Launch checklist

- [ ] `npm run build` ran and `assets/css/styles.css` exists
- [ ] All `[YOUR ...]` and `[PRICE]` placeholders replaced or removed; yellow highlights gone
- [ ] `set-domain` run with the final address; sitemap and robots show it
- [ ] Formspree endpoint added and a real test submission received
- [ ] Privacy page completed
- [ ] Every page checked on a phone and a desktop browser (menu, form errors, FAQ, buttons)
- [ ] Keyboard check: Tab through a page, skip link and focus rings visible
- [ ] Lighthouse run on home, one service page and one article; fix real issues
- [ ] Search Console verified and `sitemap.xml` submitted
- [ ] Optional: add a social sharing image (1200x630 PNG) and an `og:image` tag
- [ ] No demo project shown as real work; no unverified results anywhere
