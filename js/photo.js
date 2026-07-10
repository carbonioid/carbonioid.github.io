/*
Listeners etc for the photography page / photo gallery
*/

export {initPopupListeners, populatePhotos}

let metadataCache = null;

function initPopupListeners() {
    const popup = document.querySelector('.image-popup');
    const body = popup.querySelector(".popup-container")
    const img = document.querySelector('.popup-img');
    const text = document.querySelector('.popup-text');

    popup.addEventListener('click', (e) => {
        if (!body.contains(e.target)) {
            popup.style.display = 'none';
        }
    })

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            popup.style.display = 'none';
        }
    })
}

let aborter = null;
function loadPopup(data) {
    // Get the next/previous entries in metadata, carousel-style
    const photos = metadataCache["photos"]
    const currentIndex = photos.indexOf(data)
    const next = photos[(currentIndex + 1) % photos.length]
    const prev = photos.at(currentIndex - 1) // Use at to account for negative indexes

    // Remove all event listeners from these buttons
    if (aborter) {aborter.abort()} // remove previous event 
    aborter = new AbortController();

    // Add listeners for prev/next buttons
    document.querySelector("#next").addEventListener("click", () => loadPopup(next), {signal: aborter.signal})
    document.querySelector("#prev").addEventListener("click", () => loadPopup(prev), {signal: aborter.signal})

    const imageSrc = `photo/${data["filename"]}`

    // Set the image source in the popup
    const indicator = document.querySelector(".load-indicator");
    const popupImage = document.querySelector('.popup-img');

    popupImage.setAttribute('src', '');
    popupImage.setAttribute('src', imageSrc);

    // Image loading
    if (!popupImage.complete) {
        indicator.style.display = 'block';
        popupImage.style.display = 'none';
        popupImage.onload = () => {
            indicator.style.display = 'none';
            popupImage.style.display = 'block';
        }
    } else {
        indicator.style.display = 'none';
        popupImage.style.display = 'block';
    }

    // Show popup
    const popup = document.querySelector('.image-popup');
    popup.style.display = '';

    // Set the link & general content
    document.querySelector('.plink').href = imageSrc;
    document.querySelector(".pheading").textContent = data.heading || "No title";
    document.querySelector(".psubheading").textContent = data.subheading || ""
    document.querySelector(".pdesc").textContent = data.desc || "";

    // Set metadata
    const date = new Date(data.date * 1000) // multiply unix timestamp by 1000 to get milliseconds
    const formattedDate = date.toLocaleDateString("en-ca") // format as YYYY-MM-DD
    document.querySelector(".date-value").textContent = formattedDate

    document.querySelector(".camera-value").textContent = data.camera
}

function addPhotoListeners(photoContainer, data) {
    photoContainer.addEventListener('click', () => loadPopup(data));
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
            metadataCache = data;
            const gallery = document.querySelector('.photo-container');

            for (var i = 0; i < Math.min(count, data.photos.length); i++) {
                const photo = data.photos[i];

                const photoEntry = document.createElement('div');
                photoEntry.classList.add('entry');
                photoEntry.innerHTML = `
                    <div class="img-container">
                        <img src="photo/${photo.thumbnail}">
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

                addPhotoListeners(photoEntry, photo);

                gallery.appendChild(photoEntry);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
