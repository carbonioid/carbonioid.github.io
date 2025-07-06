export {selectItem}

const nav = document.querySelector('.pages');

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

    return found
}

Array.from(nav.querySelector('.links').children).forEach((item) => {
    item.addEventListener('click', () => {
        selectItem(item.dataset.value);
    })
})