/* ═══════════════════════════════════════════════════════════════
   PROJECTS DATA
   ───────────────────────────────────────────────────────────────
   Each project has:
     title   – shown in list & detail header
     year    – shown as meta info
     tags    – array of short labels
     img     – path to image, e.g. "images/projects/foo.jpg" (or null)
     short   – one-sentence teaser shown in the list row
     body    – full HTML written out as a template string.
               Use <p>, <h3>, <ul><li> freely.
               This is rendered verbatim in the detail view.
     links   – array of { label, url, primary? }
   ════════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    title: "Protein Folding with GNNs",
    year:  "2024",
    tags:  ["Graph NN", "Biology", "PyTorch"],
    img:   null,
    short: "Predicting 3D protein structure from sequence using message-passing networks.",
    body: `
      <p>
        This project explores the use of graph neural networks to predict three-dimensional
        protein structure from amino acid sequences. We designed a hierarchical
        message-passing architecture that captures both local residue interactions and
        global tertiary structure cues.
      </p>
      <h3>Motivation</h3>
      <p>
        Despite AlphaFold2's success, understanding <em>why</em> a model makes a given
        prediction remains an open problem. Our architecture is designed with
        interpretability in mind, exposing per-edge attention weights that correspond to
        known biochemical contacts.
      </p>
      <h3>Method</h3>
      <p>
        We represent each protein as a k-NN graph in sequence space and apply six rounds
        of equivariant message passing. A multi-scale readout head produces both a
        per-residue confidence score and a global fold classification.
      </p>
      <h3>Results</h3>
      <p>
        Evaluated on CASP15 targets, our model achieves TM-score 0.82 on single-domain
        proteins — competitive with ESMFold at one-tenth the parameter count.
      </p>
    `,
    links: [
      { label: "Paper",  url: "#", primary: true },
      { label: "Code",   url: "#" },
      { label: "Poster", url: "#" }
    ]
  },
  {
    title: "Climate Downscaling via Diffusion",
    year:  "2023",
    tags:  ["Diffusion", "Climate", "PyTorch"],
    img:   null,
    short: "Super-resolving coarse climate model output to 4 km resolution using latent diffusion.",
    body: `
      <p>
        High-resolution regional climate projections are essential for infrastructure
        planning, yet running global models at fine spatial resolution is prohibitively
        expensive. We frame statistical downscaling as a conditional image
        super-resolution problem.
      </p>
      <h3>Approach</h3>
      <p>
        A latent diffusion model is conditioned on coarse CMIP6 outputs (50 km) and
        trained to recover ERA5 reanalysis fields (4 km). We introduce a physics-informed
        guidance term that penalises violations of mass conservation during sampling.
      </p>
      <h3>Evaluation</h3>
      <p>
        Across 30 years of held-out data, our method reduces the RMSE of daily
        precipitation by 34% and significantly improves skill on the 99th-percentile
        extreme precipitation metric compared to bicubic and CNN baselines.
      </p>
    `,
    links: [
      { label: "Preprint", url: "#", primary: true },
      { label: "Dataset",  url: "#" },
      { label: "Demo",     url: "#" }
    ]
  },
  {
    title: "NLP for Chemistry Papers",
    year:  "2023",
    tags:  ["NLP", "LLM", "Information Extraction"],
    img:   null,
    short: "Automated extraction of structured experimental data from the chemistry literature.",
    body: `
      <p>
        Reproducing a chemical synthesis from a paper can take hours of manual reading.
        We built an end-to-end pipeline that extracts structured records — reagents,
        solvents, temperatures, reaction times, and yields — from methods sections.
      </p>
      <h3>Dataset</h3>
      <p>
        We curated 5 000 annotated reactions from three top chemistry journals
        (JACS, Angewandte Chemie, Nature Chemistry) and release them under CC BY 4.0.
      </p>
      <h3>Model</h3>
      <p>
        A domain-adapted LLM is fine-tuned with a structured prediction head that outputs
        JSON-formatted reaction records. The model achieves &gt;90% F1 on
        held-out papers without task-specific prompting.
      </p>
      <h3>Interface</h3>
      <p>
        An interactive web interface lets researchers query the resulting database by
        reaction type, substrate, or experimental condition — cutting literature review
        time from hours to seconds.
      </p>
    `,
    links: [
      { label: "Paper",  url: "#", primary: true },
      { label: "Try it", url: "#" },
      { label: "Data",   url: "#" }
    ]
  }
];

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
  renderProjectList();
  document.getElementById('back-btn')?.addEventListener('click', goBackToList);
});
