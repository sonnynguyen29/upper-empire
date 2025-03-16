// const imageEls = document.querySelectorAll('.ue-collection-grid .ue-collection-item');
// const imageUrls = [];

// imageEls.forEach((imageEl) => {
//     imageUrls.push({
//         src: imageEl.dataset.imageUrl,
//         srct: imageEl.dataset.imageUrl
//     });
// });

// console.log('imageUrls', imageUrls);

if (!window.ueCollectionFinishSetup) {

    const setUpUeCollectionGallery = () => {
        const ueCollectionGrids = document.querySelectorAll('.ue-collection-grid');

        ueCollectionGrids.forEach((parent, index) => {
            if (index === 0) {
                ueCollectionGrids[0].classList.add('ue-collection-grid--main');
            }

            const childDivs = Array.from(parent.children); // Get all direct child divs

            const firstCollection = ueCollectionGrids[0]; // The first child div

            // Move all other children into the first child
            childDivs.forEach((child) => {
                firstCollection.appendChild(child);
            });
        })
    };
    setUpUeCollectionGallery();

    AOS.init();

    const triggerClickIfImageIdExists = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const imageId = urlParams.get('image-id');

        if (imageId) {
            const targetElement = document.querySelector(`a.ue-collection-item[data-image-id="${imageId}"]`);
            if (targetElement) {
                targetElement.click();

                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);s
            }
        }
    }

    window.addEventListener('load', () => {
        if (typeof setUpUeCollectionPhotoSwipe === 'undefined') {
            const setUpUeCollectionPhotoSwipe = () => {
                const zoomInSVG = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="pswp__icn" id="pswp__icn--zoom-in"><path d="M6.66667 9.16667H9.16667M9.16667 9.16667H11.6667M9.16667 9.16667V6.66667M9.16667 9.16667V11.6667M14.1667 14.1667L17.5 17.5M2.5 9.16667C2.5 10.9348 3.20238 12.6305 4.45262 13.8807C5.70286 15.131 7.39856 15.8333 9.16667 15.8333C10.9348 15.8333 12.6305 15.131 13.8807 13.8807C15.131 12.6305 15.8333 10.9348 15.8333 9.16667C15.8333 7.39856 15.131 5.70286 13.8807 4.45262C12.6305 3.20238 10.9348 2.5 9.16667 2.5C7.39856 2.5 5.70286 3.20238 4.45262 4.45262C3.20238 5.70286 2.5 7.39856 2.5 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                const zoomOutSVG = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="pswp__icn" id="pswp__icn--zoom-out"><path d="M14.1667 14.1667L17.5 17.5M6.66667 9.16667H11.6667M2.5 9.16667C2.5 10.9348 3.20238 12.6305 4.45262 13.8807C5.70286 15.131 7.39856 15.8333 9.16667 15.8333C10.9348 15.8333 12.6305 15.131 13.8807 13.8807C15.131 12.6305 15.8333 10.9348 15.8333 9.16667C15.8333 7.39856 15.131 5.70286 13.8807 4.45262C12.6305 3.20238 10.9348 2.5 9.16667 2.5C7.39856 2.5 5.70286 3.20238 4.45262 4.45262C3.20238 5.70286 2.5 7.39856 2.5 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                const zoomSVGs = zoomInSVG + zoomOutSVG;

                const lightbox = new window.PhotoSwipeLightbox({
                    gallery: '.ue-collection-grid.ue-collection-grid--main',
                    children: 'a',
                    bgOpacity: 1,
                    pswpModule: window.PhotoSwipe
                });


                lightbox.init();
            };

            setUpUeCollectionPhotoSwipe();

            triggerClickIfImageIdExists();
        }

    });

    window.ueCollectionFinishSetup = true;

    console.log('window.PhotoSwipeLightbox = PhotoSwipeLightbox', PhotoSwipeLightbox)
}
