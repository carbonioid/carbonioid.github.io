/*
Manage banner on main page
*/
export {changeImageIndex, setBannerImage, startBannerTimer, preloadBannerImages};

const images = [
    "man.png",
    "man2.png",
    "man3.png",
    "man4.png",
    "man5.png",
    "man6.png",
    "bench.png",
    "tree.png",
    "leafs.png"
];

let imageIndex = 0;

async function preloadBannerImages() {
    // Preload images sequentially
    for (const image of images) {
        const im = document.createElement("img")
        im.src = `images/${image}`
        await im.decode();
    }
}

function changeImageIndex(d) {
    imageIndex += d
}

function setBannerImage() {
    if (imageIndex >= images.length) {
        imageIndex = 0;
    } else if (imageIndex < 0) {
        imageIndex = images.length - 1;
    }

    document.documentElement.style.setProperty('--image', `url(images/${images[imageIndex]})`);
}

let bannerTaskId = null;
function startBannerTimer() {
    // Clear any existing interval
    if (bannerTaskId) {
        clearInterval(bannerTaskId);
    }
    
    // Start a new interval
    bannerTaskId = setInterval(() => {
        imageIndex++;
        setBannerImage();
    }, 15000);
}

// Run functions to initialise the banner & its functionality
setBannerImage();
startBannerTimer();
