// Project data - each project has detailed content for the modal
const projectsData = [
  {
    id: 1,
    title: "Machine Learning for Protein Folding",
    shortDesc: "Deep learning models to predict protein structures",
    fullDescription: `This project develops novel deep learning architectures for predicting protein folding patterns from amino acid sequences.

Key achievements:
• Achieved 92% accuracy on the CASP benchmark dataset
• Reduced inference time by 40% compared to AlphaFold
• Open-sourced the model and training pipeline

The model uses a combination of transformer architectures and graph neural networks to capture both local and global dependencies in protein sequences. This work has implications for drug discovery and understanding genetic diseases.

Future work includes extending the model to protein-protein interactions and integrating with molecular dynamics simulations.`,
    tags: ["Deep Learning", "Bioinformatics", "PyTorch"],
    image: null, // Will use placeholder
    links: {
      paper: "https://arxiv.org/abs/xxx",
      github: "https://github.com/yourusername/protein-folding",
      demo: "https://huggingface.co/spaces/yourusername/protein-demo"
    }
  },
  {
    id: 2,
    title: "Generative Models for Molecular Design",
    shortDesc: "Creating novel molecules with desired properties",
    fullDescription: `A generative framework for designing drug-like molecules with specific chemical properties.

Technical highlights:
• Variational autoencoder with property prediction heads
• Generated >10,000 novel molecules with drug-likeness >0.8
• Validated 3 candidates in wet lab experiments

The model learns a continuous latent space of molecular structures, allowing smooth interpolation between known drugs and optimization for properties like solubility, toxicity, and binding affinity.

This work was published at NeurIPS 2024 and the code is available for academic use.`,
    tags: ["Generative AI", "Chemistry", "VAE"],
    image: null,
    links: {
      paper: "https://arxiv.org/abs/yyy",
      github: "https://github.com/yourusername/mol-gen",
      colab: "https://colab.research.google.com/..."
    }
  },
  {
    id: 3,
    title: "Climate Dynamics Prediction",
    shortDesc: "Weather forecasting using Graph Neural Networks",
    fullDescription: `A GNN-based approach for medium-range weather forecasting that outperforms traditional numerical methods.

Key results:
• 15% improvement in 7-day temperature forecasts
• 30x faster inference than physics-based models
• Trained on 40 years of ERA5 reanalysis data

The model represents the Earth as a mesh graph, with nodes representing spatial locations and edges capturing atmospheric interactions. This allows the model to learn complex patterns like storm formation and jet stream dynamics.

We're currently deploying this system for operational forecasting in collaboration with meteorological agencies.`,
    tags: ["GNNs", "Climate Science", "Forecasting"],
    image: null,
    links: {
      paper: "https://arxiv.org/abs/zzz",
      github: "https://github.com/yourusername/climate-gnn",
      website: "https://climate-prediction.example.com"
    }
  },
  {
    id: 4,
    title: "Multimodal Learning for Scientific Discovery",
    shortDesc: "Integrating text, images, and numerical data",
    fullDescription: `A unified framework that combines research papers, experimental images, and simulation data to accelerate scientific discovery.

This system can:
• Extract structured knowledge from millions of papers
• Generate hypotheses for new experiments  
• Recommend synthesis conditions for novel materials

The model uses contrastive learning to align different modalities in a shared embedding space. We demonstrated its effectiveness by rediscovering 20 known materials and suggesting 5 novel ones that were later synthesized.

The project was recognized with a Best Paper Award at ICML 2024.`,
    tags: ["Multimodal", "NLP", "Computer Vision"],
    image: null,
    links: {
      paper: "https://arxiv.org/abs/www",
      github: "https://github.com/yourusername/scientific-ai"
    }
  }
];

// Function to create project cards
function createProjectCards() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  grid.innerHTML = projectsData.map(project => `
    <div class="project-card" data-project-id="${project.id}">
      <div class="project-card-img ${!project.image ? 'placeholder' : ''}" data-label="${!project.image ? 'Image coming soon' : ''}">
        ${project.image ? `<img src="${project.image}" alt="${project.title}">` : '<span style="padding: 2rem;">📷</span>'}
      </div>
      <div class="project-card-body">
        <div class="project-card-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <h3>${project.title}</h3>
        <p>${project.shortDesc}</p>
      </div>
    </div>
  `).join('');
  
  // Add click event listeners
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = parseInt(card.dataset.projectId);
      openProjectModal(projectId);
    });
  });
}

// Function to open modal with full project details
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;
  
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalLinks = document.getElementById('modal-links');
  const modalImgWrap = document.getElementById('modal-img-wrap');
  
  // Set content
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.fullDescription || project.shortDesc;
  
  // Set tags
  modalTags.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  
  // Set image
  if (project.image) {
    modalImgWrap.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
    modalImgWrap.classList.remove('placeholder');
  } else {
    modalImgWrap.innerHTML = '<div class="placeholder" style="padding: 4rem; text-align: center; color: #8a8480;">📷 Project visualization</div>';
    modalImgWrap.classList.add('placeholder');
  }
  
  // Set links
  const linksHtml = [];
  if (project.links.paper) {
    linksHtml.push(`<a href="${project.links.paper}" target="_blank" class="btn btn-primary">📄 Read Paper</a>`);
  }
  if (project.links.github) {
    linksHtml.push(`<a href="${project.links.github}" target="_blank" class="btn btn-ghost">🐙 GitHub</a>`);
  }
  if (project.links.demo) {
    linksHtml.push(`<a href="${project.links.demo}" target="_blank" class="btn btn-ghost">🚀 Live Demo</a>`);
  }
  if (project.links.website) {
    linksHtml.push(`<a href="${project.links.website}" target="_blank" class="btn btn-ghost">🌐 Website</a>`);
  }
  if (project.links.colab) {
    linksHtml.push(`<a href="${project.links.colab}" target="_blank" class="btn btn-ghost">📓 Colab</a>`);
  }
  
  modalLinks.innerHTML = linksHtml.join('');
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  createProjectCards();
  
  // Close modal when clicking backdrop or close button
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
