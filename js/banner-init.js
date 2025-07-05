import { preloadBannerImages, initBannerListeners } from './banner.js';

document.addEventListener('DOMContentLoaded', async () => {
    initBannerListeners();
    await preloadBannerImages();
});

if (document.readyState === "complete" || document.readyState === "loaded") {
    // If the page is already loaded (the script fired in the wrong order) add listeners also
    initBannerListeners();
    await preloadBannerImages();
}
