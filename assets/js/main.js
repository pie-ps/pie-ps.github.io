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
