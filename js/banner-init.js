import { preloadBannerImages, initBannerListeners, setBannerImage, startBannerTimer } from './banner.js';

document.addEventListener('DOMContentLoaded', async () => {
    initBannerListeners();
    setBannerImage();
    startBannerTimer();
    await preloadBannerImages();
});

if (document.readyState === "complete" || document.readyState === "loaded") {
    // If the page is already loaded (the script fired in the wrong order) add listeners also
    initBannerListeners();
    setBannerImage();
    startBannerTimer();
    await preloadBannerImages();
}
