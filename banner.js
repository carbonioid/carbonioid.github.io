/*
Manage banner on main page
*/
export {changeImageIndex, setBannerImage, startBannerTimer}

const root = document.documentElement;

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
]

// Preload images
const _ = []
images.forEach(image => {
    _.push(new Image().src = `images/${image}`);
});

function setBannerImage() {
    if (imageIndex >= images.length) {
        imageIndex = 0;
    } else if (imageIndex < 0) {
        imageIndex = images.length - 1;
    }

    root.style.setProperty('--image', `url(images/${images[imageIndex]})`);
}

let imageIndex = 0;

function changeImageIndex(d) {
    imageIndex += d
}

setBannerImage();

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

startBannerTimer();
