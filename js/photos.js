/* ═══════════════════════════════════════════════════════════════
   PHOTOS — loaded from photos/manifest.json
   ───────────────────────────────────────────────────────────────
   To add a new photo:
     1. Drop the image file in images/photos/
     2. Add its filename to photos/manifest.json
     3. Commit & push — no JS/HTML changes needed.
   ════════════════════════════════════════════════════════════════ */

async function loadPhotos() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;

  try {
    const res = await fetch('photos/manifest.json');
    if (!res.ok) throw new Error(`manifest.json: ${res.status}`);
    const filenames = await res.json();

    grid.innerHTML = filenames.map(name => `
      <img src="images/photos/${name}" alt="Photo" loading="lazy" />
    `).join('');
  } catch (err) {
    console.error('Failed to load photos:', err);
    grid.innerHTML = '<p>Could not load photos.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadPhotos);
