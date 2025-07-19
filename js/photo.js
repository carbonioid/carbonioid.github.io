/*
Listeners etc for the photography page / photo gallery
*/

export {initPopupListeners, populatePhotos}

function initPopupListeners() {
    const popup = document.querySelector('.image-popup');
    const img = document.querySelector('.popup-img');
    const text = document.querySelector('.popup-text');

    popup.addEventListener('click', (e) => {
        if (e.target !== img && e.target !== text) {
            popup.style.display = 'none';
        }
    })

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            popup.style.display = 'none';
        }
    })
}

function addPhotoListeners(photoContainer) {
    photoContainer.addEventListener('click', () => {
        const imageSrc = photoContainer.querySelector('img').getAttribute('src');

        // Set the image source in the popup
        const popupImage = document.querySelector('.popup-img');
        popupImage.setAttribute('src', imageSrc);

        // Show popup
        const popup = document.querySelector('.image-popup');
        popup.style.display = '';

        // Set the link
        const link = document.querySelector('.popup-link');
        link.href = imageSrc;
    });
}

function populatePhotos(count) {
    fetch('photo/photo-metadata.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const gallery = document.querySelector('.photo-container');

            for (var i = 0; i < Math.min(count, data.photos.length); i++) {
                const photo = data.photos[i];

                const photoEntry = document.createElement('div');
                photoEntry.classList.add('entry');
                photoEntry.innerHTML = `
                    <div class="img-container">
                        <img src="photo/${photo.filename}">
                    </div>
                    <div class="text">
                    
                    </div>
                `;

                const text = photoEntry.querySelector(".text")
                
                if (photo.heading) {
                    const head = document.createElement('p')
                    head.classList.add("heading")
                    head.textContent = photo.heading

                    text.appendChild(head)
                }

                if (photo.subheading) {
                    const shead = document.createElement('p')
                    shead.classList.add("subheading")
                    shead.textContent = photo.subheading

                    text.appendChild(shead)
                }

                addPhotoListeners(photoEntry);

                gallery.appendChild(photoEntry);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
