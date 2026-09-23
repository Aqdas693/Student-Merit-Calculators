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
├── README.md               # Project documentation, specifications, and run instructions
├── calculators/            # Directory reserved for dedicated calculator tools (one subfolder per tool)
│   └── .gitkeep
├── assets/
│   ├── css/
│   │   └── style.css       # Unified mobile-first design tokens and responsive layout styles
│   ├── js/
│   │   └── main.js         # Shared vanilla JS helper scripts (navigation, dynamic dates, utilities)
│   └── images/             # Static graphics, brand icons, and calculator preview assets
│       └── .gitkeep
```

- **/index.html:** The main landing page providing user navigation, status overview, calculator category cards, and responsive ad placeholders.
- **/calculators/:** Reserved folder to house upcoming individual calculator modules (e.g., `/calculators/mdcat-merit/index.html`), keeping each tool modular and independently accessible.
- **/assets/css/:** Contains shared global styling (`style.css`), handling responsive breakpoints, color palette, typography, and card UI components.
- **/assets/js/:** Houses shared utility functions and UI interactivity (`main.js`).
- **/assets/images/:** Stores static imagery, site icons, and visual assets.

## Homepage & Navigation Structure
The homepage (`index.html`) serves as the central hub connecting all calculators:
- **Header & Primary Navigation:** Sticky navigation bar containing the site brand and direct routing links to:
  - **Home:** `/`
  - **Matric/FSc Aggregate:** `/calculators/matric-fsc-aggregate/`
  - **MDCAT Merit:** `/calculators/mdcat-merit/`
  - **ECAT Merit:** `/calculators/ecat-merit/`
  - **UAF Merit:** `/calculators/uaf-merit/`
- **Hero Banner:** Introduces the portal and its focus on Pakistani educational boards and admission tests.
- **Calculator Cards Grid:** A mobile-first responsive grid showcasing 4 dedicated calculator cards:
  1. **Matric/FSc Aggregate Calculator:** Calculates combined marks and percentage for Matric (SSC) and Intermediate (HSSC/FSc) board exams (`/calculators/matric-fsc-aggregate/`).
  2. **MDCAT Merit Calculator:** Computes medical college entrance aggregate based on official PMDC weightages (`/calculators/mdcat-merit/`).
  3. **ECAT Merit Calculator:** Determines admission aggregate for UET and public engineering universities in Pakistan (`/calculators/ecat-merit/`).
  4. **UAF Merit Calculator:** Computes official admission aggregate for University of Agriculture Faisalabad degree programs (`/calculators/uaf-merit/`).
- **Monetization Banner:** Responsive ad placeholder unit positioned beneath the calculator grid.
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
- **Default Weightages & Denominator:**
  - Matriculation (SSC): **17%**
  - FSc Pre-Engineering (HSSC): **50%**
  - ECAT Entrance Test: **33%** (calculated out of a fixed denominator of **400 marks**)
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

#### Needs Verification
> [!WARNING]
> **ECAT Formula Verification:** The current default **17% Matric / 50% FSc / 33% ECAT** weightage split must be confirmed against the official UET admission policy on [ecat.uet.edu.pk](https://ecat.uet.edu.pk) prior to public launch.

*(Note: UAF formula was verified and confirmed as 30/30/40 on September 23, 2026 and moved out of Needs Verification).*

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
  - Explicitly flagged 17/50/33 split under "Needs Verification" for confirmation against `ecat.uet.edu.pk`.
- **Step 6 (General University Merit Calculator):** **DONE**
  - Built standalone calculator page at `/calculators/uaf-merit/index.html` as initial template.
- **Step 7 (UAF Merit Calculator Update):** **DONE**
  - Updated `/calculators/uaf-merit/index.html` and `calculator.js` to official UAF criteria: 30% Matric, 30% Intermediate Part-I, and 40% UAF Entry Test.
  - Kept entry test total marks user-customizable.
  - Updated on-page framing to UAF-specific guidelines (covering main campus and sub-campuses in Toba Tek Singh, Burewala, Depalpur).
  - Added ~174-word SEO explainer section and search meta tags targeting "uaf merit calculator".
  - Updated homepage card and navigation labels back to "UAF Merit".
  - Moved UAF calculator out of "Needs Verification" in `README.md`.
- **Not Built Yet:**
  - Live ad network publisher script integration (e.g., Google AdSense).
  - Dedicated pages for About Us, Contact form handler, Privacy Policy, and Terms of Service.
