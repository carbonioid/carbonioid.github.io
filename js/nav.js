export {selectItem, addNavListeners};
import { initPopupListeners, populatePhotos } from "./photo.js";

const nav = document.querySelector('.pages');

// Specify onload scripts & custom stylesheets for each page (if any)
const config = {
    'photo': {
        'onload': () => {
            initPopupListeners();
            populatePhotos(Infinity);
        },
        'stylesheet': 'css/photo.css'
    },
    'home': {
        'stylesheet': 'css/home.css'
    }
}

function selectItem(name) {
    /*
    Selected the item by data-value attribute that matches with `name`.
    Returns true if the item was found, false otherwise.
    */
    const template = document.querySelector(`#${name}`);

    let newContent;
    if (template) {
        newContent = template.content.cloneNode(true); 
    } else {
        newContent = document.createElement('div');

        const message = document.createElement('h3');
        message.textContent = 'Under construction';
        newContent.appendChild(message);
    }

    // Clear the .main container
    const container = document.querySelector('.main')
    container.innerHTML = '';
    
    // Add all children to .main container
    Array.from(newContent.children).forEach((child) => {
        container.appendChild(child);
    });

    // Add "selected" class to the clicked item
    let found;
    Array.from(nav.querySelector('.links').children).forEach((el) => {
        if (el.dataset.value === name) {
            el.classList.add('selected');
            found = true;
        } else {
            el.classList.remove('selected');
        }
    });

    // Set in url
    const url = new URL(window.location.href);
    url.searchParams.set('page', name);
    window.history.pushState({}, '', url);

    // Run any onload scripts
    if (config[name] && config[name].onload) {
        config[name].onload();
    }

    // Load appropriate stylesheet
    const link = document.querySelector('.page-specific')
    link.href = config[name] != undefined ? config[name].stylesheet : '';

    return found
}

function addNavListeners() {
    Array.from(nav.querySelector('.links').children).forEach((item) => {
        item.addEventListener('click', () => {
            selectItem(item.dataset.value);
        })
    })
}
