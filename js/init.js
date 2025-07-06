/*
Load navbar from url (e.g. carbonioid.github.io/photo loads photography page)
*/

import { selectItem } from "./nav.js";
import { initBannerListeners, setBannerImage, startBannerTimer, preloadBannerImages } from "./banner.js";

// Select page from url params
const urlParams = new URLSearchParams(window.location.search);
let page = urlParams.get('page') || 'home';
if (!selectItem(page)) { selectItem('home') }

// Add listeners & load images
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