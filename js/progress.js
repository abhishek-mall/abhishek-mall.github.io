window.addEventListener("load", function () { if (!window.location.hash) window.scrollTo(0, 0); });
const progress = document.querySelector(".progress");
let ticking = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = value + "%";
  ticking = false;
}
window.addEventListener("scroll", function () {
  if (!ticking) { ticking = true; window.requestAnimationFrame(updateProgress); }
}, { passive: true });
updateProgress();
