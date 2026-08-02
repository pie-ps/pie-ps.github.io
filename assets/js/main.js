const figureDialog = document.querySelector("[data-figure-dialog]");
const openFigureButton = document.querySelector("[data-open-figure]");
const closeFigureButton = document.querySelector("[data-close-figure]");

function closeFigure() {
  if (!figureDialog?.open) return;
  figureDialog.close();
  document.body.classList.remove("dialog-open");
  openFigureButton?.focus();
}

openFigureButton?.addEventListener("click", () => {
  figureDialog?.showModal();
  document.body.classList.add("dialog-open");
});

closeFigureButton?.addEventListener("click", closeFigure);

figureDialog?.addEventListener("click", (event) => {
  if (event.target === figureDialog) closeFigure();
});

figureDialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const viewportVideos = document.querySelectorAll("[data-viewport-video]");

if (reduceMotion.matches) {
  document.querySelectorAll("video").forEach((video) => video.pause());
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.35 },
  );

  viewportVideos.forEach((video) => observer.observe(video));
}
