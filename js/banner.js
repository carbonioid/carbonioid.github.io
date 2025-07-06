/*
Manage banner on main page
*/
import {interlaceArray} from './utils.js';
export {changeImageIndex, setBannerImage, startBannerTimer, preloadBannerImages, initBannerListeners};


/********
Banner images/functionality
*********/

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
let bannerTaskId = null;

async function preloadBannerImages() {
    // Preload images sequentially
    const orderedImages = interlaceArray(images); // Order so that closest images (in carousel, in both directions) are loaded first
    for (const image of orderedImages) {
        const im = document.createElement("img")
        im.src = `banner-images/${image}`
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

    document.documentElement.style.setProperty('--image', `url(../banner-images/${images[imageIndex]})`);
}

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

// Tooltip functions
const tooltip = document.querySelector('.tooltip');
function showTooltip(text, copy) {
    // Create tooltip HTML
    tooltip.innerHTML = ''

    tooltip.style.display = 'block';
    const p = document.createElement('p');
    p.textContent = `${text}`;

    const span = document.createElement('span')
    span.textContent = copy;
    span.classList.add('copy')
    p.appendChild(span);

    tooltip.appendChild(p)

    // Hide tooltip after 10 seconds
    window.setTimeout(() => {
        tooltip.style.display = 'none';
    }, 10000)
}

/********
Listeners
*********/

function initArrowListeners() {
    // Add listeners for buttons
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');

    left.addEventListener('click', () => {
        changeImageIndex(-1);
        setBannerImage();
        startBannerTimer();
    });

    right.addEventListener('click', () => {
        changeImageIndex(1);
        setBannerImage();
        startBannerTimer();
    })
}

function initLinkListeners() {
    // Add listener for links
    const discord = document.querySelector('.discord');
    discord.addEventListener('click', () => {   
        console.log(1)
        showTooltip('my username is ', 'carbonioid');
    })

    const email = document.querySelector('.email');
    email.addEventListener('click', () => {
        showTooltip('you can reach me at ', 'maincarbonioid@gmail.com')
    })

    // Dark mode listener
    const darkModeToggle = document.querySelector('.dark-mode');
    darkModeToggle.addEventListener('click', () => {
        if (document.body.parentElement.style.filter) {
            darkModeToggle.textContent = 'Switch to "dark mode"';
            document.body.parentElement.style.filter = '';
        } else {
            document.body.parentElement.style.filter = 'invert()';

            darkModeToggle.textContent = 'go back go back go back'
        }
    })
}

function initBannerListeners() {
    initArrowListeners();
    initLinkListeners();
}

