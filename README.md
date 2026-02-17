# Babak Lotfalizadeh - Portfolio

Personal portfolio website for **Babak Lotfalizadeh**, a Senior Flutter Developer with 10+ years of experience in mobile development.

**Live:** [babak-lotfalizadeh.github.io](https://babak-lotfalizadeh.github.io/)

## Overview

A responsive, single-page portfolio built with vanilla HTML, CSS, and JavaScript. All content (projects and work experience) is driven by JSON data files, making it easy to update without touching any code.

## Project Structure

```
├── index.html                  # Main page
├── about.html                  # About/contact page
├── privacy.html                # Privacy policy
├── style.css                   # All styles
├── script.js                   # Core logic (rendering, sliders, lazy loading)
├── portfolio/
│   ├── projects-data.json      # Project entries (data-driven)
│   └── experience-data.json    # Work experience entries (data-driven)
├── icons/
│   ├── sprite.svg              # SVG icon sprite
│   └── SVG/                    # Individual icon assets
├── img/                        # Project screenshots & assets
├── files/                      # Downloadable files (CV, etc.)
└── fonts/                      # Montserrat font files
```

## Adding Content

### Projects

Add a new entry to `portfolio/projects-data.json`:

```json
{
  "id": "my-project",
  "title": "My Project",
  "description": "Project description here.",
  "video": null,
  "embed": null,
  "images": {
    "left": "img/my-project/screenshot.png",
    "right": null
  },
  "links": {
    "appStore": null,
    "googlePlay": null,
    "github": "https://github.com/...",
    "web": { "url": "https://...", "label": "View Project" }
  },
  "styles": {
    "bgColor": "#FAF8F4",
    "bgOpacity": "0.8",
    "textColor": "black",
    "imagePadding": "0"
  }
}
```

**Layout options based on fields:**

| Field | Effect |
|-------|--------|
| `images.left` + `images.right` | Two background images with centered text |
| `images.left` only (`right: null`) | Image left, text right (side-by-side) |
| `video` | YouTube embed left, text right (supports Shorts) |
| `embed` | Google Slides/iframe embed left, text right |

**Style options:**

- `bgColor` / `bgOpacity` — section background color and overlay opacity
- `textColor` — text, icon, and button color (`"black"` or `"white"`)
- `imagePadding` — vertical inset for background images (e.g. `"5%"`)

**Link types:**

- `appStore` — App Store badge
- `googlePlay` — Google Play badge
- `github` — GitHub logo (auto-inverts on dark backgrounds)
- `web` — Custom text button with `url` and `label`

### Work Experience

Add a new entry to `portfolio/experience-data.json`:

```json
{
  "id": "company-id",
  "company": "Company Name",
  "role": "Job Title",
  "period": "Start – End",
  "location": "Remote",
  "description": "What you did there.",
  "tags": ["Flutter", "Dart"]
}
```

## Features

- **Data-driven content** — projects and experience load from JSON files
- **Responsive design** — adapts to desktop, tablet, and mobile
- **Multiple media types** — supports images, YouTube videos (including Shorts), and Google Slides embeds
- **Lazy loading** — images and galleries load on scroll for performance
- **Touch gestures** — swipe support for image sliders
- **Accessible** — semantic HTML, ARIA labels, and proper alt attributes

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, media queries)
- Vanilla JavaScript (no frameworks or dependencies)
