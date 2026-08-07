# Personal Website




Static personal portfolio site — no build step, no framework. Just HTML, CSS, and vanilla JS, served as-is (locally via `live-server`, deployed via GitHub Actions / Pages).

## File structure

```
personal_website/
├── index.html              Main page: sidebar, tabs (About / Projects), project detail view
├── css/
│   └── style.css           All styling for the site
├── js/
│   ├── tabs.js              Handles switching between top-level tabs (About / Projects)
│   └── projects.js          Loads project data and renders the project list + detail view
├── projects/
│   ├── manifest.json        Ordered list of project JSON filenames — THIS is what you edit
│   │                        to add/remove/reorder projects
│   └── data/
│       ├── protein-folding.json
│       ├── climate-diffusion.json
│       └── nlp-chemistry.json
│       (one JSON file per project — add new ones here)
├── images/                  Profile photo, project images, etc.
├── files/                   Any downloadable assets (CV, papers, etc.)
├── package.json             Only dependency is live-server (local dev preview)
└── README.md                This file
```

## Role of each file

| File | Role |
|---|---|
| `index.html` | Page skeleton: sidebar (name, photo, links), tab nav, About section content, Projects list/detail containers |
| `css/style.css` | All visual styling — layout, fonts, colors, responsive rules |
| `js/tabs.js` | Generic tab-switcher: toggles `.active` class on `.tab-btn` / `.tab-panel` pairs based on `data-tab` attribute. Doesn't know about specific tab names. |
| `js/projects.js` | Fetches `projects/manifest.json`, then fetches each listed project JSON file, and renders both the project list (in the Projects tab) and the individual project detail view when a project is clicked |
| `projects/manifest.json` | Ordered array of project filenames, e.g. `["protein-folding.json", "climate-diffusion.json"]`. Controls which projects show up and in what order. |
| `projects/data/*.json` | One file per project — the actual content (title, tags, description, body, links) |

## How to add a new project

1. **Create a new JSON file** in `projects/data/`, e.g. `projects/data/my-new-project.json`:

   ```json
   {
     "title": "My New Project",
     "year": "2025",
     "tags": ["Tag One", "Tag Two"],
     "img": null,
     "short": "One-sentence teaser shown in the project list.",
     "body": "<p>Full write-up goes here as an HTML string.</p><h3>Section heading</h3><p>More detail...</p>",
     "links": [
       { "label": "Paper", "url": "https://...", "primary": true },
       { "label": "Code", "url": "https://..." }
     ]
   }
   ```

   Field notes:
   - `img`: path to an image (e.g. `"images/projects/my-project.jpg"`), or `null` if you don't have one yet.
   - `body`: written as a single HTML string. Use `<p>`, `<h3>`, `<ul><li>`, `<em>`, etc. Double quotes inside the string must be escaped as `\"`.
   - `links`: optional. Mark one entry `"primary": true` to style it as the highlighted button; omit `primary` (or set it to `false`) for secondary/ghost-style buttons.

2. **Add the filename to `projects/manifest.json`**, in the position you want it to appear:

   ```json
   ["protein-folding.json", "climate-diffusion.json", "nlp-chemistry.json", "my-new-project.json"]
   ```

3. **(Optional) Add an image** to `images/projects/` if you referenced one in `img`.

4. **Commit and push:**

   ```bash
   git add projects/
   git commit -m "Add new project: My New Project"
   git push
   ```

No changes to `index.html`, `projects.js`, or CSS are needed — the page picks up new projects automatically from the manifest.

## Local development

```bash
npm install
npx live-server
```

`fetch()` requires the page to be served over HTTP — opening `index.html` directly via `file://` will not load the project data.

## Deployment

Pushing to the main branch triggers the GitHub Actions workflow, which deploys the site (check the **Actions** tab on GitHub to monitor progress).
