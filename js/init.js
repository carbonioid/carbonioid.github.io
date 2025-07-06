/*
Load navbar from url (e.g. carbonioid.github.io/photo loads photography page)
*/

import { addNavListeners, selectItem } from "./nav.js";
import { initBannerListeners, setBannerImage, startBannerTimer, preloadBannerImages } from "./banner.js";

// Select page from url params
const urlParams = new URLSearchParams(window.location.search);
let page = urlParams.get('page') || 'home';
if (!selectItem(page)) { selectItem('home') }

async function init() {
    addNavListeners();
    initBannerListeners();
    setBannerImage();
    startBannerTimer();
    await preloadBannerImages();
}

// Add listeners & load images
document.addEventListener('DOMContentLoaded', async () => {
    await init();
});

if (document.readyState === "complete" || document.readyState === "loaded") {
    // If the page is already loaded (the script fired in the wrong order) add listeners also
    await init();
}