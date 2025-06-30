import {changeImageIndex, setBannerImage, startBannerTimer} from './banner.js';

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

document.addEventListener('DOMContentLoaded', () => {
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

    // Add listener for links
    const discord = document.querySelector('.discord');
    discord.addEventListener('click', () => {   
        showTooltip('my username is ', 'carbonioid');
    })

    const email = document.querySelector('.email');
    email.addEventListener('click', () => {
        showTooltip('you can reach me at ', 'maincarbonioid@gmail.com')
    })

    // Dark mode listener
    const darkModeToggle = document.querySelector('.dark-mode');
    console.log(darkModeToggle)
    darkModeToggle.addEventListener('click', () => {
        if (document.body.parentElement.style.filter) {
            darkModeToggle.textContent = 'Switch to "dark mode"';
            document.body.parentElement.style.filter = '';
        } else {
            document.body.parentElement.style.filter = 'invert()';

            darkModeToggle.textContent = 'go back go back go back'
        }
    })
})
