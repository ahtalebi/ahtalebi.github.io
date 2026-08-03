/* ═══════════════════════════════════════════════════════════════
   PROJECTS — loaded from projects/manifest.json + projects/data/*.json
   ───────────────────────────────────────────────────────────────
   To add a new project:
     1. Drop a new JSON file in projects/data/  (see format below)
     2. Add its filename to projects/manifest.json
     3. Commit & push — no JS/HTML changes needed.

   Each project JSON file has:
     title   – shown in list & detail header
     year    – shown as meta info
     tags    – array of short labels
     img     – path to image, e.g. "images/projects/foo.jpg" (or null)
     short   – one-sentence teaser shown in the list row
     body    – full HTML string (rendered verbatim in detail view)
     links   – array of { label, url, primary? }
   ════════════════════════════════════════════════════════════════ */

let PROJECTS = [];

/* ── Load manifest + all project files ──────────────────────── */
async function loadProjects() {
  const ul = document.getElementById('project-list');

  try {
    const manifestRes = await fetch('projects/manifest.json');
    if (!manifestRes.ok) throw new Error(`manifest.json: ${manifestRes.status}`);
    const filenames = await manifestRes.json();

    const projectPromises = filenames.map(async name => {
      const res = await fetch(`projects/data/${name}`);
      if (!res.ok) throw new Error(`${name}: ${res.status}`);
      return res.json();
    });

    PROJECTS = await Promise.all(projectPromises);
    renderProjectList();
  } catch (err) {
    console.error('Failed to load projects:', err);
    if (ul) ul.innerHTML = '<li class="project-list-error">Could not load projects.</li>';
  }
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — Project list
   ════════════════════════════════════════════════════════════════ */
function renderProjectList() {
  const ul = document.getElementById("project-list");
  if (!ul) return;

  ul.innerHTML = PROJECTS.map((p, i) => `
    <li class="project-list-item" data-index="${i}"
        role="button" tabindex="0" aria-label="Open ${p.title}">

      <div class="project-list-thumb">
        ${p.img
          ? `<img src="${p.img}" alt="${p.title}" loading="lazy" />`
          : 'No&nbsp;img'}
      </div>

      <div class="project-list-body">
        <div class="project-list-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-list-title">${p.title}</div>
        <div class="project-list-short">${p.short}</div>
      </div>

      <span class="project-list-arrow">→</span>
    </li>
  `).join('');

  ul.querySelectorAll('.project-list-item').forEach(el => {
    el.addEventListener('click', () => openDetail(+el.dataset.index));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetail(+el.dataset.index);
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — Detail view
   ════════════════════════════════════════════════════════════════ */
function openDetail(index) {
  const p = PROJECTS[index];
  const content = document.getElementById('project-detail-content');

  const imgHTML = p.img
    ? `<img class="detail-img" src="${p.img}" alt="${p.title}" />`
    : `<div class="detail-img-placeholder">No image provided</div>`;

  const linksHTML = (p.links || []).map(l => `
    <a href="${l.url}" class="btn ${l.primary ? 'btn-primary' : 'btn-ghost'}"
       ${l.url !== '#' ? 'target="_blank" rel="noopener"' : ''}>${l.label}</a>
  `).join('');

  content.innerHTML = `
    <div class="detail-tags">
      ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <h2 class="detail-title">${p.title}</h2>
    <p class="detail-meta">${p.year}</p>
    ${imgHTML}
    <div class="detail-body">${p.body}</div>
    ${linksHTML ? `<div class="detail-links">${linksHTML}</div>` : ''}
  `;

  // Switch panels: hide #projects, show #project-detail
  document.querySelectorAll('.tab-panel').forEach(s => s.classList.remove('active'));
  document.getElementById('project-detail').classList.add('active');

  // Scroll to top of main
  document.querySelector('.main').scrollTop = 0;
  window.scrollTo(0, 0);
}

/* ── Back button ─────────────────────────────── */
function goBackToList() {
  document.querySelectorAll('.tab-panel').forEach(s => s.classList.remove('active'));
  document.getElementById('projects').classList.add('active');

  // Keep the Projects tab button highlighted
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === 'projects');
  });
}

/* ── Init ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  document.getElementById('back-btn')?.addEventListener('click', goBackToList);
});
