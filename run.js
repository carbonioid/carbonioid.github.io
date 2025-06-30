import {addListeners} from './listener.js';
import { preloadBannerImages } from './banner.js';

document.addEventListener('DOMContentLoaded', async () => {
    addListeners();
    await preloadBannerImages();
});

if (document.readyState === "complete" || document.readyState === "loaded") {
    // If the page is already loaded (the script fired in the wrong order) add listeners also
    addListeners();
    await preloadBannerImages();
}
