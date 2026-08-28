# 🧊 POLARVERSE
### Integrated Polar Science Outreach, Knowledge Repository & Media Dissemination Portal

**PolarVerse** is an interoperability, experience, and educational layer that connects existing authoritative polar-science sources (**NCPOR, NPDC, NASA, NSIDC, BAS, SCAR, COMNAP, GEBCO, Copernicus CDS, Crossref, OpenAlex, GBIF, OBIS**) and makes their information easier to discover, understand, visualize, and explore.

Every scientific dataset, research paper, station coordinate, and observation retains its complete provenance and attribution.

---

# Project Setup

## Requirements
To run and develop this application on your computer, ensure you have the following installed:
- **Node.js**: Version `18.x` or `20.x+` (LTS recommended)
- **npm** (comes with Node.js) or **yarn** / **pnpm** / **bun**
- A modern web browser (Chrome, Edge, Firefox, Safari, Opera)

---

## Installation

1. Open your terminal or command prompt inside the project folder:
```bash
cd polarverse
```

2. Install all required dependencies:
```bash
npm install
```

---

## Environment Variables

Copy the provided `.env.example` file to create your `.env` file (optional):

```bash
cp .env.example .env
```

Variables configured in `.env.example`:
```env
# Application Port (Default: 3000)
VITE_PORT=3000

# Optional External API Keys (PolarVerse includes full verified offline fallback datasets)
# VITE_NASA_API_KEY=your_nasa_api_key_here
# VITE_NCPOR_API_KEY=your_ncpor_api_key_here
```

*Note: PolarVerse is designed to work 100% out of the box with zero required external API keys thanks to its built-in verified polar datasets.*

---

## Run Locally

Start the local development server with hot-module reloading:

```bash
npm run dev
```

The application will be available at:
👉 **`http://localhost:3000`** (or the port displayed in your terminal).

---

## Production Build

To compile and bundle the application for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The compiled static files will be located in the `dist/` directory, ready to be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, AWS S3, or Nginx).

---

## Project Structure

```
polarverse/
├── public/                 # Static assets (favicons, icons)
├── src/
│   ├── components/         # Modular React UI components
│   │   ├── admin/          # Protected Admin & Curation Dashboard
│   │   ├── ai/             # Source-grounded "Ask PolarVerse" AI assistant
│   │   ├── biodiversity/   # Polar Life & Species catalog (GBIF/OBIS)
│   │   ├── data/           # Data discovery, dataset details, visualizer & stories
│   │   ├── home/           # Homepage hero, topic exploration & Indian banner
│   │   ├── india/          # Dedicated Indian Polar Journey & Station dossiers
│   │   ├── layout/         # Navigation, Footer & Provenance badges
│   │   ├── learn/          # Student Learning Hub (ELI-15 vs Go Deeper)
│   │   ├── map/            # Interactive Polar Stereographic Explorer & Drawers
│   │   ├── media/          # Curated Media Gallery with verified licenses
│   │   ├── quiz/           # 4 Interactive Quiz modes & Badge progression
│   │   └── search/         # Real-time universal multi-entity search modal
│   ├── context/            # React Contexts (AudienceMode, QuizProgress, AdminAuth)
│   ├── data/               # Verified scientific datasets, stations, papers, time series
│   │   ├── biodiversity.ts # Polar species taxonomy and conservation status
│   │   ├── datasets.ts     # Researcher-grade datasets with NetCDF variables & DOIs
│   │   ├── dataStories.ts  # 8-step signature interactive data stories
│   │   ├── expeditions.ts  # Indian (1st–43rd) and historical polar expeditions
│   │   ├── learningModules.ts # 12 dual-level educational lessons
│   │   ├── mediaGallery.ts # High-res photography with open licenses
│   │   ├── quizzes.ts      # Quick MCQ, Myth/Fact, Guess the Chart & Scenarios
│   │   ├── researchPapers.ts # Peer-reviewed publications with Crossref DOIs
│   │   ├── sources.ts      # Authoritative organizations catalog
│   │   ├── stations.ts     # Verified Antarctic and Arctic stations
│   │   └── timeSeriesData.ts # Real time-series for sea ice, temperature & ozone
│   ├── types/              # TypeScript type definitions for polar entities
│   ├── App.tsx             # Root application component with tab routing
│   ├── index.css           # Global Tailwind CSS and polar styling
│   └── main.tsx            # Application DOM entry point
├── index.html              # HTML shell
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.js      # Custom Polar color tokens and glow effects
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

---

## Important Notes

1. **Strict Provenance & Scientific Integrity:**
   - PolarVerse does not replace NCPOR, NPDC, NASA, NSIDC, BAS, SCAR, or COMNAP.
   - All dataset DOIs, station coordinates, temperature records, and sea-ice measurements are real and cited. Zero fabricated numbers are used.
2. **Admin Curation Portal:**
   - Accessible via the "Admin" button in the top bar.
   - Default passcode: `polarverse2026` (or `admin`).
3. **No Database Configuration Required:**
   - The application runs client-side with complete verified polar science data arrays, local storage progress persistence, and resilient offline capabilities.
