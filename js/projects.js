/**
 * projects.js
 *
 * ADD A PROJECT:
 *   1. Add an entry to the PROJECTS array below.
 *   2. Drop the project image into images/projects/
 *   3. Set the "image" field to the filename (e.g. "my-project.jpg").
 *      If you leave image as "" a placeholder is shown.
 *   4. Save and push — GitHub Actions will deploy automatically.
 */

const PROJECTS = [
  {
    id: "proj-1",
    title: "Deep Learning for Protein Structure",
    tags: ["Machine Learning", "Biology"],
    image: "",                        // → images/projects/filename.jpg
    summary: "Predicting 3D protein folds from sequence data using graph neural networks.",
    description: `
      A full description of the project. You can use longer text here —
      it appears in the expanded modal. Explain the problem, your approach,
      and the results. Multiple sentences are fine.
    `,
    links: [
      { label: "Paper", url: "https://arxiv.org" },
      { label: "Code", url: "https://github.com" }
    ]
  },
  {
    id: "proj-2",
    title: "Climate Downscaling with Diffusion Models",
    tags: ["Diffusion Models", "Climate"],
    image: "",
    summary: "High-resolution climate projections via score-based generative models.",
    description: `
      Description of the climate downscaling project. Detail what makes it unique,
      what datasets you used, and what improvements you achieved over baselines.
    `,
    links: [
      { label: "Paper", url: "#" },
      { label: "Demo", url: "#" }
    ]
  },
  {
    id: "proj-3",
    title: "Open-Source NLP Toolkit",
    tags: ["NLP", "Open Source"],
    image: "",
    summary: "A lightweight library for fast tokenisation and embedding on CPU.",
    description: `
      Describe the toolkit — its design goals, what makes it faster, and who uses it.
      Mention stars, downloads, or any adoption metrics if you have them.
    `,
    links: [
      { label: "GitHub", url: "https://github.com" },
      { label: "Docs", url: "#" }
    ]
  }
];

/* ── Rendering ───────────────────────────────────────────────────── */

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(p => `
    <div class="project-card" onclick="openModal('${p.id}')" role="button" tabindex="0" aria-label="${p.title}">
      <div class="project-card-img ${p.image ? '' : 'placeholder'}" data-label="${p.title}">
        ${p.image ? `<img src="images/projects/${p.image}" alt="${p.title}" loading="lazy" />` : ''}
      </div>
      <div class="project-card-body">
        <div class="project-card-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
      </div>
    </div>
  `).join('');
}

/* ── Modal ───────────────────────────────────────────────────────── */

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  const backdrop = document.getElementById("modal-backdrop");
  const modal    = document.getElementById("modal-content");

  modal.innerHTML = `
    ${p.image
      ? `<img class="modal-img" src="images/projects/${p.image}" alt="${p.title}" />`
      : `<div class="modal-img placeholder">${p.title}</div>`
    }
    <div class="modal-body">
      <button class="modal-close" onclick="closeModal()" aria-label="Close">✕</button>
      <div class="project-card-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <h2 class="modal-title">${p.title}</h2>
      <p class="modal-desc">${p.description.trim()}</p>
      <div class="modal-links">
        ${p.links.map(l =>
          `<a href="${l.url}" target="_blank" rel="noopener" class="btn btn-primary">${l.label} ↗</a>`
        ).join('')}
        <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;

  backdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.add("hidden");
  document.body.style.overflow = "";
}

/* ── Modal backdrop in DOM (injected once) ───────────────────────── */
const backdrop = document.createElement("div");
backdrop.id = "modal-backdrop";
backdrop.className = "modal-backdrop hidden";
backdrop.innerHTML = `<div class="modal" id="modal-content" role="dialog" aria-modal="true"></div>`;
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
document.body.appendChild(backdrop);

/* ── Init ────────────────────────────────────────────────────────── */
renderProjects();
