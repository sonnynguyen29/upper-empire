const imageEls = document.querySelectorAll('.ue-collection-grid .ue-collection-item');
const imageUrls = [];

imageEls.forEach((imageEl) => {
    imageUrls.push({
        src: imageEl.dataset.imageUrl,
        srct: imageEl.dataset.imageUrl
    });
});

console.log('imageUrls', imageUrls);
AOS.init();
