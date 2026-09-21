import PhotoSwipeLightbox from "./vendor/photoswipe/photoswipe-lightbox.esm.js";

const grid = document.querySelector("[data-gallery-grid]");

if (grid) {
  try {
    const response = await fetch("assets/generated/gallery/manifest.json", { cache: "force-cache" });
    if (!response.ok) throw new Error(`Gallery manifest request failed: ${response.status}`);
    const items = await response.json();

    grid.innerHTML = items.map(item => {
      const d = item.derivatives || {};
      const thumb = d["720"] || d[720] || d["360"] || d[360];
      const large = d["1600"] || d[1600] || d["1200"] || d[1200] || thumb;
      const srcset = [360, 720, 1200, 1600]
        .map(width => d[String(width)] || d[width])
        .filter(Boolean)
        .map(entry => `${entry.src} ${entry.width}w`)
        .join(", ");
      return `<a class="gallery-button" href="${large.src}" data-pswp-width="${large.width}" data-pswp-height="${large.height}" data-pswp-srcset="${srcset}" target="_blank" aria-label="Open ${item.alt}">
        <img src="${thumb.src}" srcset="${srcset}" sizes="(max-width: 759px) 50vw, 25vw" alt="${item.alt}" loading="${item.index <= 2 ? "eager" : "lazy"}" decoding="async">
      </a>`;
    }).join("");

    const lightbox = new PhotoSwipeLightbox({
      gallery: grid,
      children: "a",
      pswpModule: () => import("./vendor/photoswipe/photoswipe.esm.js"),
      wheelToZoom: true,
      bgOpacity: 0.96,
      showHideAnimationType: "zoom"
    });
    lightbox.init();
  } catch (error) {
    console.error("Enhanced gallery failed to load.", error);
    grid.innerHTML = '<div class="roster-empty"><strong>Gallery unavailable.</strong><p>Please refresh the page or try again shortly.</p></div>';
  }
}
