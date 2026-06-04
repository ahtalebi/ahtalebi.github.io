# Personal Portfolio Site

A clean, milky-white personal portfolio. Left sidebar with photo + bio, centre panel with About / Projects / Outreach tabs. Zero build step — pure HTML, CSS, and vanilla JS.

---

## ① Create the GitHub repo

```bash
# On GitHub: New repository → name it  yourusername.github.io
# (this special name makes it your root GitHub Pages URL)

git init
git add .
git commit -m "init: portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

If you want a regular repo name (e.g. `portfolio`), your site will live at  
`https://yourusername.github.io/portfolio` instead.

---

## ② Enable GitHub Pages

1. Go to your repo → **Settings → Pages**
2. Under **Source** select **GitHub Actions**
3. That's it. The workflow in `.github/workflows/deploy.yml` fires on every push.

Your site will be live at `https://yourusername.github.io` within ~30 seconds of your first push.

---

## ③ Develop locally

No install needed. Just open the file directly:

```bash
# Option A — open in browser directly (simplest)
open index.html

# Option B — local server (avoids any path quirks)
python3 -m http.server 8080
# → http://localhost:8080
```

Edit files, refresh browser, done.

---

## ④ Add or update your profile photo

```bash
cp /path/to/your/photo.jpg images/profile.jpg
```

The image is displayed at full sidebar width with a 3:4 aspect ratio and slight desaturation. Any JPEG or PNG works.

---

## ⑤ Add a project

Open `js/projects.js` and add an object to the `PROJECTS` array:

```js
{
  id: "proj-4",                             // unique string
  title: "My New Project",
  tags: ["Tag One", "Tag Two"],
  image: "new-project.jpg",                 // filename inside images/projects/
  summary: "One-line description for the card.",
  description: `
    Longer description shown in the modal popup.
    Explain the problem, your approach, and results.
  `,
  links: [
    { label: "Paper", url: "https://..." },
    { label: "Code",  url: "https://github.com/..." }
  ]
}
```

Then drop the image file:

```bash
cp /path/to/screenshot.jpg images/projects/new-project.jpg
```

Leave `image: ""` to show a placeholder — the card still looks good.

---

## ⑥ Customise your info

| What                          | Where                        |
|-------------------------------|------------------------------|
| Name, title, expertise        | `index.html` — `.sidebar`    |
| Contact links / CV            | `index.html` — `.sidebar-links` |
| About text                    | `index.html` — `#about`      |
| Outreach entries              | `index.html` — `#outreach`   |
| Colours / fonts               | `css/style.css` — `:root`    |

---

## ⑦ Push changes

```bash
git add .
git commit -m "feat: add new project"
git push
```

GitHub Actions picks it up automatically. Check the **Actions** tab in your repo to watch the deploy.

---

## Folder structure

```
portfolio/
├── index.html                  ← main page
├── css/
│   └── style.css               ← all styles
├── js/
│   ├── projects.js             ← project data + rendering + modal
│   └── tabs.js                 ← tab switching
├── images/
│   ├── profile.jpg             ← your photo (replace this)
│   └── projects/
│       └── *.jpg               ← one image per project
├── files/
│   └── cv.pdf                  ← optional CV download
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD
├── .gitignore
└── README.md
```

---

## Common tweaks

**Change accent colour** — edit `--accent` in `css/style.css`:
```css
:root {
  --accent: #c07a48;   /* ← change this hex */
}
```

**Change fonts** — swap the Google Fonts URL in `index.html` and update `--font-display` / `--font-body` in `:root`.

**Add a CV** — put your PDF at `files/cv.pdf`. The sidebar link already points there.

**Custom domain** — add a `CNAME` file to the repo root containing your domain (e.g. `www.yourname.com`), then set the DNS as described in the GitHub Pages docs.
