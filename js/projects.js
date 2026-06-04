/* ─────────────────────────────────────────────
   PROJECT DATA
   Add / edit your projects here.
   Fields:
     title      – project name
     tags       – array of tag strings
     img        – path to image (optional; omit or set null for placeholder)
     short      – one-line teaser shown on the card
     desc       – full description shown in the modal (supports \n for paragraphs)
     links      – array of { label, url, primary? }
───────────────────────────────────────────── */
const PROJECTS = [
  {
    title: "Protein Folding with GNNs",
    tags: ["Graph NN", "Biology"],
    img: null,
    short: "Predicting protein structure from sequence using message-passing networks.",
    desc: "This project explores the use of graph neural networks to predict 3D protein structure from amino acid sequences. We designed a hierarchical message-passing architecture that captures both local residue interactions and global tertiary structure.\n\nThe model was trained on the PDB dataset and evaluated against AlphaFold2 predictions, achieving competitive accuracy at a fraction of the inference cost.\n\nKey contributions include a novel edge-feature encoding scheme for torsion angles and a multi-scale readout head for per-residue confidence estimation.",
    links: [
      { label: "Paper", url: "#", primary: true },
      { label: "Code", url: "#" }
    ]
  },
  {
    title: "Climate Downscaling",
    tags: ["Diffusion", "Climate"],
    img: null,
    short: "Super-resolution of coarse climate model outputs using diffusion models.",
    desc: "High-resolution regional climate projections are essential for adaptation planning, but running global climate models at fine resolution is computationally prohibitive.\n\nWe frame statistical downscaling as a conditional image super-resolution problem and train a latent diffusion model on ERA5 reanalysis data paired with CMIP6 outputs.\n\nOur method produces physically consistent precipitation and temperature fields at 4 km resolution, outperforming prior CNN-based downscaling baselines on extreme event metrics.",
    links: [
      { label: "Preprint", url: "#", primary: true },
      { label: "Dataset", url: "#" },
      { label: "Demo", url: "#" }
    ]
  },
  {
    title: "NLP for Scientific Literature",
    tags: ["NLP", "LLM"],
    img: null,
    short: "Automated extraction of experimental conditions from chemistry papers.",
    desc: "Reproducing chemical experiments often requires hours of manual reading. We built a pipeline that uses a fine-tuned language model to extract structured experimental metadata — reagents, solvents, temperatures, yields — from the methods sections of chemistry papers.\n\nThe system was trained on a manually curated corpus of 5 000 reactions and achieves >90% F1 on held-out papers from three top chemistry journals.\n\nAn interactive web interface lets researchers query the resulting database by reaction type, substrate, or condition.",
    links: [
      { label: "Paper", url: "#", primary: true },
      { label: "Try it", url: "#" }
    ]
  }
];

/* ─────────────────────────────────────────────
   RENDER CARDS
───────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <div class="project-card" data-index="${i}" role="button" tabindex="0"
         aria-label="Open project: ${p.title}">
      <div class="project-card-img${p.img ? '' : ' placeholder'}" data-label="No image">
        ${p.img ? `<img src="${p.img}" alt="${p.title}" loading="lazy" />` : ''}
      </div>
      <div class="project-card-body">
        <div class="project-card-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <h3>${p.title}</h3>
        <p>${p.short}</p>
      </div>
    </div>
  `).join('');

  // Open modal on click or Enter/Space
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.index));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(+card.dataset.index);
      }
    });
  });
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function openModal(index) {
  const p = PROJECTS[index];
  const backdrop = document.getElementById('modal-backdrop');

  // Image / placeholder
  const imgWrap = document.getElementById('modal-img-wrap');
  if (p.img) {
    imgWrap.className = 'modal-img-wrap';
    imgWrap.innerHTML = `<img src="${p.img}" alt="${p.title}" />`;
  } else {
    imgWrap.className = 'modal-img-wrap placeholder';
    imgWrap.innerHTML = 'No image';
  }

  // Tags
  document.getElementById('modal-tags').innerHTML =
    p.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Title & description (full text)
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent = p.desc;

  // Links
  document.getElementById('modal-links').innerHTML =
    (p.links || []).map(l =>
      `<a href="${l.url}" class="btn ${l.primary ? 'btn-primary' : 'btn-ghost'}"
          ${l.url !== '#' ? 'target="_blank" rel="noopener"' : ''}>${l.label}</a>`
    ).join('');

  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Focus close button for accessibility
  setTimeout(() => document.getElementById('modal-close')?.focus(), 50);
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.add('hidden');
  document.body.style.overflow = '';
}

// Wire up close button & backdrop click
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  document.getElementById('modal-close')?.addEventListener('click', closeModal);

  document.getElementById('modal-backdrop')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Esc key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
