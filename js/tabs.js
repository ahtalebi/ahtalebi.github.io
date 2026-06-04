/* tabs.js — simple tab switcher */
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(target).classList.add("active");

    // Update URL hash without scrolling
    history.replaceState(null, "", "#" + target);
  });
});

// Restore tab from URL hash on load
const hash = location.hash.slice(1);
if (hash) {
  const btn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
  if (btn) btn.click();
}
