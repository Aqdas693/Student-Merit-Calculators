# Pakistani Student Calculator Tools

## Project Overview
Pakistani Student Calculator Tools is a free, mobile-optimized online utility portal designed specifically for students across Pakistan navigating secondary, higher secondary, entrance tests, and tertiary education (such as Matric, FSc, MDCAT, ECAT, and university GPA). The platform provides fast, accurate, client-side calculation tools tailored to official Pakistani board (BISE), PMDC, and HEC formulas, and is designed to be hosted for free on static web hosting providers with monetization supported via lightweight advertising placements.

## Tech Stack
- **HTML5:** Semantic, accessible markup structure without external layout dependencies.
- **CSS3:** Custom responsive, mobile-first design using standard CSS custom properties (variables), Flexbox, and CSS Grid.
- **Vanilla JavaScript (ES6+):** Pure client-side logic for interactions and upcoming calculations; no runtime or external libraries required.

### Why No Framework Was Needed
1. **Zero Build Step & Friction:** No npm installations, bundlers (Webpack, Vite), or configuration files. Code runs immediately in any browser out of the box.
2. **Maximum Performance & Fast Load Times:** Loads instantly on any internet connection (critical for mobile users across 3G/4G networks in Pakistan) with zero JavaScript bundle overhead.
3. **100% Free Static Hosting:** Can be deployed directly to GitHub Pages, Cloudflare Pages, Netlify, or Vercel at zero hosting cost.
4. **Ad & SEO Friendly:** Standard semantic HTML structure ensures straightforward indexing by search engine crawlers and seamless integration of advertising scripts (such as Google AdSense).

## Folder Structure
```text
/
├── index.html              # Central homepage featuring portal layout, branding, and tool directory
├── about.html              # About page detailing student-built origin and platform mission
├── contact.html            # Contact & formula discrepancy submission page
├── privacy-policy.html     # Plain-language privacy policy covering client-side calculations & cookies
├── terms.html              # Terms of Use, estimation disclaimers, and liability boundaries
├── robots.txt              # Search engine crawler permissions and sitemap reference
├── sitemap.xml             # XML sitemap indexing all 9 static pages
├── README.md               # Project documentation, specifications, and run instructions
├── calculators/            # Directory reserved for dedicated calculator tools (one subfolder per tool)
│   ├── matric-fsc-aggregate/
│   ├── mdcat-merit/
│   ├── ecat-merit/
│   ├── uaf-merit/
│   └── nums-merit/
├── assets/
│   ├── css/
│   │   └── style.css       # Unified mobile-first design tokens and responsive layout styles
│   ├── js/
│   │   └── main.js         # Shared vanilla JS helper scripts (navigation, dynamic dates, utilities)
│   └── images/
│       └── og-cover.png    # 1200x630 branded social preview banner for WhatsApp/Facebook
```

- **/index.html:** The main landing page providing user navigation, status overview, calculator category cards, and responsive ad placeholders.
- **/about.html, /contact.html, /privacy-policy.html, /terms.html:** Dedicated informational and compliance pages required for AdSense approval and user transparency.
- **/calculators/:** Modular directory housing each individual calculator tool in its own isolated subfolder.
- **/assets/css/:** Contains shared global styling (`style.css`), handling responsive breakpoints, color palette, typography, and card UI components.
- **/assets/js/:** Houses shared utility functions and UI interactivity (`main.js`).
- **/assets/images/:** Stores static imagery, site icons, and social sharing banners (`og-cover.png`).

## Homepage & Navigation Structure
The homepage (`index.html`) serves as the central hub connecting all calculators:
- **Header & Primary Navigation:** Sticky navigation bar containing the site brand and direct routing links to:
  - **Home:** `/`
  - **Matric/FSc Aggregate:** `/calculators/matric-fsc-aggregate/`
  - **MDCAT Merit:** `/calculators/mdcat-merit/`
  - **ECAT Merit:** `/calculators/ecat-merit/`
  - **UAF Merit:** `/calculators/uaf-merit/`
  - **NUMS Merit:** `/calculators/nums-merit/`
- **Hero Banner:** Introduces the portal and its focus on Pakistani educational boards and admission tests.
- **Calculator Cards Grid:** A mobile-first responsive grid showcasing 5 dedicated calculator cards:
  1. **Matric/FSc Aggregate Calculator:** Calculates combined marks and percentage for Matric (SSC) and Intermediate (HSSC/FSc) board exams (`/calculators/matric-fsc-aggregate/`).
  2. **MDCAT Merit Calculator:** Computes medical college entrance aggregate based on official PMDC weightages (`/calculators/mdcat-merit/`).
  3. **ECAT Merit Calculator:** Determines admission aggregate for UET and public engineering universities in Pakistan (`/calculators/ecat-merit/`).
  4. **UAF Merit Calculator:** Computes official admission aggregate for University of Agriculture Faisalabad degree programs (`/calculators/uaf-merit/`).
  5. **NUMS Merit Calculator:** Computes admission aggregate for Army Medical College (AMC) and NUMS-affiliated private medical & dental colleges (`/calculators/nums-merit/`).
- **Monetization Slot:** Clean, responsive ad unit containers (`<aside class="ad-slot-placeholder">`) positioned beneath the calculator grid and on individual calculator pages. Containers are present in the HTML/CSS with pre-reserved layout space, but intentionally rendered invisible (borderless/transparent with no visible placeholder text) until real Google AdSense ad units are activated.
- **Footer:** Informational links (About, Contact, Privacy, Terms), auto-updating copyright year, and official academic disclaimer.

## Calculators

### 1. Matric / FSc Aggregate Calculator (`/calculators/matric-fsc-aggregate/`)
- **Purpose:** Computes a student's composite merit percentage combining Matric (SSC) and Intermediate (HSSC Part 1 & Part 2) scores for admission to Pakistani universities and colleges.
- **Formula Used:**
  $$\text{Aggregate } (\%) = \left(\frac{\text{Matric Obtained}}{\text{Matric Total}} \times 10\right) + \left(\frac{\text{FSc Part 1 Obtained}}{\text{FSc Part 1 Total}} \times 40\right) + \left(\frac{\text{FSc Part 2 Obtained}}{\text{FSc Part 2 Total}} \times 50\right)$$
- **Default Weightages:**
  - Matriculation (SSC): **10%**
  - FSc Part 1 (HSSC-I): **40%**
  - FSc Part 2 (HSSC-II): **50%**
- **Where to Adjust Weighting:**
  To change the percentages for a specific university or college criteria, simply modify the `AGGREGATE_WEIGHTS` constant at the very top of [`calculators/matric-fsc-aggregate/calculator.js`](calculators/matric-fsc-aggregate/calculator.js#L18-L22):
  ```javascript
  const AGGREGATE_WEIGHTS = {
    matric: 10,       // Edit Matric weight here
    fscPart1: 40,     // Edit FSc Part 1 weight here
    fscPart2: 50      // Edit FSc Part 2 weight here
  };
  ```

### 2. MDCAT Merit Calculator (`/calculators/mdcat-merit/`)
- **Purpose:** Computes a student's official PM&DC medical and dental admission aggregate (MBBS & BDS) across public and private colleges in Pakistan (UHS, DUHS, KMU, BUMHS, SZABMU).
- **Formula Used:**
  $$\text{Aggregate } (\%) = \left(\frac{\text{Matric Obtained}}{\text{Matric Total}} \times 10\right) + \left(\frac{\text{FSc Obtained}}{\text{FSc Total}} \times 40\right) + \left(\frac{\text{MDCAT Obtained}}{180} \times 50\right)$$
- **Default Weightages & Denominator:**
  - Matriculation (SSC): **10%**
  - FSc Pre-Medical (HSSC): **40%**
  - MDCAT Entrance Test: **50%** (calculated out of a fixed denominator of **180 marks**)
- **Where to Adjust Weighting or Test Total:**
  To change weights or adjust the total test marks, edit the `MDCAT_CONFIG` object at the top of [`calculators/mdcat-merit/calculator.js`](calculators/mdcat-merit/calculator.js#L18-L23):
  ```javascript
  const MDCAT_CONFIG = {
    matricWeight: 10,     // Edit Matric weight here
    fscWeight: 40,        // Edit FSc Pre-Medical weight here
    mdcatWeight: 50,      // Edit MDCAT test weight here
    mdcatTotal: 180       // Edit MDCAT total test denominator here
  };
  ```
- **NUMS Context:** Note that while NUMS also applies a 10/40/50 formula, its entrance test denominator is out of 200 rather than 180, so results are computed separately.

### 3. ECAT Merit Calculator (`/calculators/ecat-merit/`)
- **Purpose:** Computes a student's engineering entrance merit aggregate for University of Engineering and Technology (UET) Lahore and affiliated public engineering programs in Punjab.
- **Formula Used:**
  $$\text{Aggregate } (\%) = \left(\frac{\text{Matric Obtained}}{\text{Matric Total}} \times 17\right) + \left(\frac{\text{FSc Obtained}}{\text{FSc Total}} \times 50\right) + \left(\frac{\text{ECAT Obtained}}{400} \times 33\right)$$
- **Confirmed Weightages & Denominator:**
  - Matriculation (SSC): **17%**
  - FSc Pre-Engineering (HSSC): **50%**
  - ECAT Entrance Test: **33%** (calculated out of a fixed denominator of **400 marks**)
  - *Status:* Confirmed from official UET admission policy on [ecat.uet.edu.pk](https://ecat.uet.edu.pk) on September 23, 2026.
- **Where to Adjust Weighting or Test Total:**
  To change weights or adjust the total test marks, edit the `ECAT_CONFIG` object at the top of [`calculators/ecat-merit/calculator.js`](calculators/ecat-merit/calculator.js#L18-L23):
  ```javascript
  const ECAT_CONFIG = {
    matricWeight: 17,    // Edit Matric weight here
    fscWeight: 50,       // Edit FSc Pre-Engineering weight here
    ecatWeight: 33,      // Edit ECAT test weight here
    ecatTotal: 400       // Edit ECAT total test denominator here
  };
  ```

### 4. UAF Merit Calculator (`/calculators/uaf-merit/`)
- **Purpose:** Computes a student's official admission aggregate for undergraduate programs at the University of Agriculture Faisalabad (UAF) across its main campus and sub-campuses (Toba Tek Singh, Burewala/Vehari, Depalpur/Okara).
- **Formula Used:**
  $$\text{Aggregate } (\%) = \left(\frac{\text{Matric Obtained}}{\text{Matric Total}} \times 30\right) + \left(\frac{\text{Inter Part-I Obtained}}{\text{Inter Part-I Total}} \times 30\right) + \left(\frac{\text{UAF Test Obtained}}{\text{UAF Test Total}} \times 40\right)$$
- **Confirmed Weightages & Denominators:**
  - Matriculation (SSC): **30%**
  - Intermediate Part-I (11th Grade / FSc-I): **30%**
  - UAF Entry Test: **40%** (test total marks are customizable by the user, typically out of 100)
  - *Status:* Confirmed from official UAF admission criteria on September 23, 2026.
- **Where to Adjust Weighting:**
  To modify ratios if needed, edit `UAF_CONFIG` in [`calculators/uaf-merit/calculator.js`](calculators/uaf-merit/calculator.js#L17-L21):
  ```javascript
  const UAF_CONFIG = {
    matricWeight: 30,     // Edit Matric weight here
    fscWeight: 30,        // Edit Intermediate Part-I weight here
    testWeight: 40        // Edit UAF Entry Test weight here
  };
  ```

### 5. NUMS Merit Calculator (`/calculators/nums-merit/`)
- **Purpose:** Computes admission aggregate for the National University of Medical Sciences (NUMS), specifically Army Medical College (AMC) and NUMS-affiliated private medical & dental colleges in Pakistan.
- **Formula Used:**
  $$\text{Aggregate } (\%) = \left(\frac{\text{Matric Obtained}}{\text{Matric Total}} \times 10\right) + \left(\frac{\text{FSc Obtained}}{\text{FSc Total}} \times 40\right) + \left(\frac{\text{NUMS Obtained}}{200} \times 50\right)$$
- **Confirmed Weightages & Denominator:**
  - Matriculation (SSC): **10%**
  - FSc Pre-Medical (HSSC): **40%**
  - NUMS Entry Test: **50%** (calculated out of a fixed denominator of **200 marks**)
  - *Status:* Confirmed on September 2026 as applying uniformly across NUMS's constituent (Army Medical College) and all affiliated colleges (CMH, Bahria, Fazaia, HITEC), with no college-specific tiering.
- **Where to Adjust Weighting or Test Total:**
  To adjust weights or change the denominator if policy updates, edit `NUMS_CONFIG` at the top of [`calculators/nums-merit/calculator.js`](calculators/nums-merit/calculator.js#L18-L23):
  ```javascript
  const NUMS_CONFIG = {
    matricWeight: 10,     // Edit Matric weight here
    fscWeight: 40,        // Edit FSc Pre-Medical weight here
    numsWeight: 50,       // Edit NUMS test weight here
    numsTotal: 200        // Edit NUMS total test denominator here
  };
  ```

#### Needs Verification
None. All calculator formulas currently on the site have been verified and confirmed against their respective official regulatory bodies:
- **Matric / FSc Aggregate:** 10/40/50 standard formula confirmed across Pakistani academic boards.
- **MDCAT Merit:** 10/40/50 formula (MDCAT out of 180) confirmed from PM&DC official criteria.
- **UAF Merit:** 30/30/40 formula confirmed from official UAF admission criteria on September 23, 2026.
- **ECAT Merit:** 17/50/33 formula (ECAT out of 400) confirmed directly from official UET admission policy on [ecat.uet.edu.pk](https://ecat.uet.edu.pk) on September 23, 2026.
- **NUMS Merit:** 10/40/50 formula (NUMS out of 200) confirmed on September 2026 as applying uniformly across NUMS's constituent (Army Medical College) and all affiliated colleges (CMH, Bahria, Fazaia, HITEC), with no college-specific tiering.

*No calculators remain in "Needs Verification." All 5 calculators are fully verified and production-ready.*

## SEO
The website is fully optimized for organic search discovery and social sharing:
- **XML Sitemap (`/sitemap.xml`):** Comprehensive standard sitemap indexing the homepage (`1.0` priority) and all five calculator tools (`0.8` priority) with update frequency metadata.
- **Robots Exclusion Standard (`/robots.txt`):** Permits crawling across all user-agents (`Allow: /`) and declares the sitemap location.
- **Unique Meta Tags:** Every page includes distinct, keyword-focused `<title>` and `<meta name="description">` elements tailored to student search intent (e.g., "MDCAT Merit Calculator 2026", "PMDC MBBS BDS Aggregate").
- **Open Graph & Twitter Cards:** Configured on every page (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `twitter:card`) ensuring high-fidelity link preview cards when links are shared in WhatsApp student groups, Facebook communities, and forums.
- **Structured Data (JSON-LD):**
  - **Homepage:** Schema.org `WebSite` entity.
  - **Calculator Pages:** Schema.org `WebApplication` entity typed as `EducationalApplication` with free pricing declarations (`PKR 0`) to qualify for rich search result snippets and application carousels in Google Search.
- **Domain Configuration:** All sitemap URLs, Open Graph targets, canonical tags, and JSON-LD application IDs reference the live production domain `https://student-merit-calculators.vercel.app/`.

## Mobile UX

The site includes tailored mobile user experience enhancements across all pages and calculators:

### 1. Full-Screen Hamburger Menu Overlay & Scroll Lock
- **Full Viewport Coverage:** On mobile screens (< 820px), toggling the hamburger menu expands the navigation into a full-screen overlay (`100vw` by `100dvh` / `100vh - 58px`), eliminating partial dropdowns and visual clutter.
- **Body Scroll Lock:** Opening the navigation automatically applies the `.nav-locked` class to `<html>` and `<body>` (`overflow: hidden !important; touch-action: none;`), ensuring the page behind the menu is completely non-scrollable.
- **Seamless Dismissal:** Closing the menu (via the close toggle, pressing `Escape`, tapping outside, or selecting any navigation link) instantly removes the lock and restores full document scrolling.
- **Icon State & Touch Targets:** The hamburger icon animates into a close "X" when open (`aria-expanded="true"`), and navigation links are rendered as touch-friendly cards (minimum 52px height) with active emerald state indicators.

### 2. Automatic Virtual Keyboard Dismissal on Scroll
- **Auto-Blur on Scroll:** On all calculator pages, when a student is typing in any numeric or text input and scrolls or drags the screen to view results, the focused input automatically loses focus (`blur()`), dismissing the mobile virtual keyboard and freeing up screen real estate.
- **Intentional Drag Detection:** The listener measures touch drag distance (`delta > 10px`), ensuring that subtle finger taps or steady touches do not trigger accidental dismissals.
- **Grace Period for Native Auto-Scroll:** Includes a 400ms buffer following initial focus, ensuring the browser's native programmatic centering scroll does not prematurely dismiss the active keyboard when an input is first tapped.
- **Shared Implementation:** Implemented centrally in `assets/js/main.js` to ensure consistent, zero-dependency behavior across all 4 calculators without code duplication.

## Mobile & Accessibility

The entire portal has been audited and polished for mobile responsiveness, touch ergonomics, and WCAG 2.1 AA accessibility standards:

### Mobile Responsiveness (360px – 414px)
- **Viewport Testing:** Fully verified across common mobile viewport widths including **360px** (entry-level Android), **390px** (standard iPhone 12/13/14/15), and **414px** (large iPhone Plus/Max and Android flagships).
- **Sticky Navigation:** Replaced unconstrained horizontal navigation with a collapsible mobile menu toggle (`.nav-toggle`) that appears at viewports `< 820px`. The sticky header maintains a clean, compact ~58px height and will never overflow or overlap main page content.
- **Fluid Typography & Containers:** Container padding scales down to `1rem` on compact devices. Major titles use CSS `clamp()` to scale gracefully without overflowing or producing unwanted line-wrapping.
- **Card & Form Stacking:** Forms seamlessly stack into a single column at widths `< 540px`, and action buttons (`Calculate` and `Reset`) expand to full-width stacked touch buttons at `< 480px`.
- **Formula Containers:** Long mathematical formula boxes use touch-friendly horizontal scrolling (`overflow-x: auto; -webkit-overflow-scrolling: touch;`) preventing any document-level horizontal scrollbar blowout.

### Touch Targets & Ergonomics
- **44px Minimum Tap Targets:** In accordance with WCAG 2.1 Success Criterion 2.5.5, all interactive elements—including the mobile nav toggle, mobile navigation links, form inputs, action buttons, card action triggers, and footer links—have an explicit minimum target dimension of at least **44px &times; 44px**.
- **Decimal Keypads on Mobile:** All numeric input fields have `inputmode="decimal"`, triggering the native numeric/decimal keypad on mobile devices instead of the full QWERTY keyboard.
- **iOS Safari Zoom Prevention:** Inputs maintain a minimum font size of `1rem` (16px) to prevent iOS Safari from zooming in automatically on focus.

### Accessibility (WCAG 2.1 AA)
- **Explicit Form Labels:** Every `<input>` across all 4 calculator pages and homepage is explicitly associated with a `<label for="...">` matching its `id`. Readonly and fixed denominator fields (MDCAT 180 and ECAT 400) also feature explicit label connections and `aria-readonly="true"`.
- **Live Error Announcements:** Inline error messages use `role="alert"` and are connected to their corresponding inputs using `aria-describedby`, ensuring screen readers announce validation errors.
- **Keyboard Navigation & Focus Rings:** The site is 100% navigable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`). A global `:focus-visible` ring (`2px solid var(--color-primary); outline-offset: 2px;`) provides clear focus indication.
- **Skip to Content Link:** An accessible skip-to-content link (`.skip-link`) allows keyboard and screen reader users to bypass top header navigation.
- **Color Contrast (WCAG AA & AAA):**
  - Text body and headings: Slate 900 (`#0f172a`) on White (`#ffffff`) gives a **15:1** contrast ratio (AAA).
  - Secondary/muted text: Slate 700 (`#334155`) gives a **7.5:1** ratio (AAA).
  - Subtle text: Slate 600 (`#475569`) gives a **5.4:1** ratio (AA).
  - Error messages: Red 700 (`#b91c1c`) gives a **5.89:1** ratio on white and **5.5:1** on error backgrounds (AA).
  - Breakdown tiles: Tile titles and scores pass WCAG AAA standards.

### Real Device Testing Notes
- *What was tested:* Desktop browsers emulating responsive viewport sizes down to 320px/360px, full keyboard tab order, and DOM structure verification.
- *Limitations without a physical device:* Physical swipe gestures, hardware-specific virtual keypad layout variations (custom OEM Android keyboards), and native screen reader voice output (e.g. Apple VoiceOver on iOS Safari and Google TalkBack on Android) should be field-tested on real physical smartphones prior to high-volume campaigns.

## Static Pages & AdSense Readiness

To establish trust with students and satisfy Google AdSense site quality and compliance guidelines, four dedicated static informational pages are provided:

1. **About Us (`/about.html`):**
   - Details the platform's origin as an authentic, student-built project created to replace confusing prospectus PDFs with free, mobile-optimized calculation utilities.
   - Transparently highlights our student origins, client-side privacy commitments, and formula verification standards.

2. **Contact & Corrections (`/contact.html`):**
   - Provides a clear email feedback channel for students and teachers to submit formula corrections or suggest new university calculators.
   - **Configuration:** Live feedback email set to `aqdas3957@gmail.com` for direct student and educator inquiries.

3. **Privacy Policy (`/privacy-policy.html`):**
   - **Zero Server Data Collection:** Explicitly informs students that marks and test scores entered into any calculator remain entirely on their device and are never transmitted to or logged on a server.
   - **Google Analytics (GA4):** Details the use of anonymous cookies for performance and mobile layout optimization.
   - **Google AdSense Disclosure:** Explains third-party advertising cookies, personalized ad serving, opt-out mechanisms (Google Ads Settings and aboutads.info), and links directly to Google's official advertising privacy policy.

4. **Terms of Use (`/terms.html`):**
   - Sets clear expectations that calculators are provided for informational and estimation purposes only.
   - Clarifies that official admission decisions, tie-breakers, and quotas rest solely with respective university/board authorities, with a standard disclaimer of liability.

### Production Configuration & Live Endpoints
- **Live Production URL:** `https://student-merit-calculators.vercel.app/`
- **Google Analytics ID:** Configured and active across all 9 pages with live Measurement ID `G-99GKCS44FT`.
- **Contact Email:** Configured as `aqdas3957@gmail.com` in `contact.html`.
- **Social Sharing Banner:** Branded 1200&times;630px social preview image is available at `assets/images/og-cover.png` and configured via `og:image` and `twitter:image` across all 9 pages.
- **Canonical Domain & Sitemap:** Indexed at `https://student-merit-calculators.vercel.app/sitemap.xml` and referenced in `robots.txt` and all page meta tags.

## How to Run Locally
Because this project is built entirely with static files, no build process or package installation is required.

### Option 1: Direct File Open (Quickest)
Double-click `index.html` or open it directly in any modern web browser (Chrome, Edge, Firefox, Safari):
```text
file:///e:/Project/index.html
```

### Option 2: Using Python Simple HTTP Server
If Python is installed on your machine, run the following in PowerShell from the project root:
```powershell
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option 3: Using Node.js `npx serve`
If Node.js is installed:
```powershell
npx serve .
```

### Option 4: VS Code / IDE Live Server
If using VS Code or another IDE, right-click `index.html` and select **"Open with Live Server"**.

## Status
- **Step 1 (Project Scaffolding & Base Layout):** **DONE**
  - Project directory structure established.
  - Shared mobile-first stylesheet (`style.css`) created with a clean, professional academic color scheme.
  - Shared vanilla script (`main.js`) initialized.
  - Base responsive homepage (`index.html`) set up.
- **Step 2 (Homepage & Navigation Integration):** **DONE**
  - Header nav updated with links to `/` and the 4 calculator paths.
  - Replaced generic placeholder cards with 4 dedicated cards.
  - Added card hover/focus interaction states and action triggers in `style.css`.
  - Documented homepage/nav structure in `README.md`.
- **Step 3 (Matric/FSc Aggregate Calculator):** **DONE**
  - Built standalone calculator page at `/calculators/matric-fsc-aggregate/index.html`.
  - Implemented 10% Matric + 40% FSc Part 1 + 50% FSc Part 2 formula with easily adjustable weight constants in `calculator.js`.
  - Built validation, live error clearing, and formatted result with visual component breakdown.
  - Added ~185-word SEO explainer section and search meta tags.
  - Replaced root-relative links with portable relative links for direct `file:///` and HTTP server support.
- **Step 4 (MDCAT Merit Calculator):** **DONE**
  - Built standalone calculator page at `/calculators/mdcat-merit/index.html`.
  - Implemented official PM&DC formula: 10% Matric + 40% FSc Pre-Medical + 50% MDCAT (out of 180).
  - Configurable weightings and test denominator in `calculator.js`.
  - Built validation preventing scores > 180, negative values, non-numbers, or obtained > total.
  - Live result rendering with 2 decimal places and component breakdown display.
  - Added ~184-word SEO explainer section covering PM&DC criteria, provincial authorities, and NUMS test distinction.
- **Step 5 (ECAT Merit Calculator):** **DONE**
  - Built standalone calculator page at `/calculators/ecat-merit/index.html`.
  - Implemented 17% Matric + 50% FSc Pre-Engineering + 33% ECAT (out of 400) formula.
  - Fully configurable weighting constants in `calculator.js`.
  - Added input validation preventing scores > 400, negative values, non-numbers, or obtained > total.
  - Live result rendering formatted to 2 decimal places with visual component breakdown.
  - Added ~203-word SEO explainer section detailing UET admission aggregate and clarifying variations across other institutions (ETEA for UET Peshawar, NET for NUST).
  - Confirmed 17/50/33 split directly against official UET admission policy on `ecat.uet.edu.pk` on September 23, 2026 (moved out of Needs Verification).
- **Step 6 (General University Merit Calculator):** **DONE**
  - Built standalone calculator page at `/calculators/uaf-merit/index.html` as initial template.
- **Step 7 (UAF Merit Calculator Update):** **DONE**
  - Updated `/calculators/uaf-merit/index.html` and `calculator.js` to official UAF criteria: 30% Matric, 30% Intermediate Part-I, and 40% UAF Entry Test.
  - Kept entry test total marks user-customizable.
  - Updated on-page framing to UAF-specific guidelines (covering main campus and sub-campuses in Toba Tek Singh, Burewala, Depalpur).
  - Added ~174-word SEO explainer section and search meta tags targeting "uaf merit calculator".
  - Updated homepage card and navigation labels back to "UAF Merit".
  - Moved UAF calculator out of "Needs Verification" in `README.md`.
- **Step 8 (Site-Wide SEO Essentials):** **DONE**
  - Created standard XML sitemap at `/sitemap.xml` covering homepage and all 4 calculator pages.
  - Created `/robots.txt` declaring crawler permissions and sitemap link.
  - Configured unique, descriptive `<title>` and `<meta name="description">` tags on every page.
  - Added Open Graph (`og:*`) and Twitter Card (`twitter:*`) meta tags for WhatsApp, Facebook, and Twitter link sharing previews.
  - Added Schema.org JSON-LD structured data (`WebSite` on homepage, `WebApplication` on all 4 calculator tools).
  - Confirmed internal links (nav, cards, breadcrumbs, footers) use fully portable relative paths.
- **Step 9 (Mobile Responsiveness & Accessibility Polish):** **DONE**
  - Verified responsive layouts across mobile widths (360px, 390px, 414px) with zero overflow.
  - Implemented accessible mobile navigation toggle menu with keyboard (Escape) and outside-click support.
  - Ensured all form inputs across all calculators have explicit `<label for="...">` associations.
  - Configured `aria-describedby` connecting inputs to live `role="alert"` error messages.
  - Upgraded color palette to meet WCAG 2.1 AA and AAA contrast standards.
  - Ensured minimum 44px tap targets on all buttons, inputs, toggles, and navigation links.
  - Added screen-reader skip-to-content links and high-contrast `:focus-visible` rings for keyboard users.
  - Added `inputmode="decimal"` on all numeric inputs for native mobile number pads.
- **Step 10 (Static Pages, GA4 & AdSense Readiness):** **DONE**
  - Created standalone `/about.html`, `/contact.html`, `/privacy-policy.html`, and `/terms.html` pages.
  - Linked all four pages in the footers of all 9 pages across the site with portable relative links.
  - Generated branded 1200&times;630px social share cover image (`assets/images/og-cover.png`) and wired `og:image` and `twitter:image` tags across every page.
  - Configured Google Analytics (GA4) with live Measurement ID `G-99GKCS44FT` across all 9 pages.
  - Updated `sitemap.xml` to include all 9 site URLs with appropriate change frequencies and priorities.
  - Documented setup instructions and credentials placeholders in `README.md`.
- **Step 11 (Mobile UX Enhancements):** **DONE**
  - Upgraded mobile hamburger navigation (< 820px) to a true full-screen overlay (`100dvh`) with body scroll locking (`.nav-locked`).
  - Added multi-path menu dismissal (close toggle, Escape key, backdrop touch, and nav link routing).
  - Implemented shared mobile virtual keyboard dismissal on scroll/touch drag with a 400ms focus grace period across all calculator pages.
- **Step 12 (NUMS Merit Calculator):** **DONE**
  - Built standalone NUMS Merit Calculator at `/calculators/nums-merit/index.html` with configurable weights in `calculator.js`.
  - Implemented 10% Matric + 40% FSc Pre-Medical + 50% NUMS Entry Test (out of 200) formula with validation, live error clearing, and component breakdown tiles.
  - Added 170-word educational explainer covering Army Medical College (AMC), affiliated private medical colleges, and distinguishing the NUMS 200-mark test from the PM&DC 180-mark MDCAT.
  - Linked NUMS calculator on homepage (card grid and top nav), all page navigation bars, and within the MDCAT explainer section.
  - Indexed new tool in `sitemap.xml` and confirmed 10/40/50 formula across constituent and affiliated colleges on September 2026 (moved out of Needs Verification).
- **Monetization & Ad Units:**
  - Ad slot containers (`.ad-slot-placeholder`) are structured in the HTML and CSS across the homepage and all 5 calculator pages with reserved layout spacing.
  - They are intentionally invisible (no background, borders, or placeholder text) to ensure a clean student experience until an approved Google AdSense publisher ID and live ad unit tags are integrated.


