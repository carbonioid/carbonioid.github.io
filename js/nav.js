const nav = document.querySelector('.pages');

Array.from(nav.querySelector('.links').children).forEach((item) => {
    item.addEventListener('click', () => {
        const templateId = item.dataset.value;
        const template = document.querySelector(`#${templateId}`);

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
        Array.from(nav.querySelector('.links').children).forEach((el) => {
            el.classList.remove('selected');
        });
        item.classList.add('selected');
    })
})