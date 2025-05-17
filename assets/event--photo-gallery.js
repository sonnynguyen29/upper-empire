
class EventPhotoGallery extends HTMLElement {
    constructor() {
        super();
        this.viewMoreBtn = this.querySelector('#view-more-btn');
        this.showLessBtn = this.querySelector('#show-less-btn');
        this.photoGallery = this.querySelector('.photo-gallery');
        this.photoItems = this.photoGallery.querySelectorAll('.photo-gallery__photo-item');
        this.initialPhotos = parseInt(this.dataset.initialPhotos);
        this.additionalPhotos = parseInt(this.dataset.additionalPhotos);
        this.totalPhotoInGallery = parseInt(this.dataset.totalPhotoInGallery);
        this.totalVisiblePhotos = parseInt(this.initialPhotos);
    }

    showPhotos() {
        this.photoItems.forEach((photo, index) => {
            if (this.totalVisiblePhotos === this.totalPhotoInGallery) {
                this.showLessBtn.style.display = 'block';
                this.viewMoreBtn.style.display = 'none';
            }

            if (index < this.totalVisiblePhotos) {
                photo.classList.add('visible');
                photo.classList.remove('hidden');
            } else {
                photo.classList.add('hidden');
                photo.classList.remove('visible');
            }
        });
    }

    showLessPhotos() {
        this.photoItems.forEach((photo, index) => {
            if (this.totalVisiblePhotos === this.initialPhotos) {
                this.showLessBtn.style.display = 'none';
                this.viewMoreBtn.style.display = 'block';
            }

            if (index < this.totalVisiblePhotos) {
                photo.classList.add('visible');
                photo.classList.remove('hidden');
            } else {
                photo.classList.add('hidden');
                photo.classList.remove('visible');
            }
        });
    }

    viewMore() {
        this.totalVisiblePhotos += this.additionalPhotos;

        if (this.totalVisiblePhotos > this.totalPhotoInGallery) {
            this.totalVisiblePhotos = this.totalPhotoInGallery;
        }

        this.showPhotos();
    }

    showLess() {
        this.totalVisiblePhotos = this.initialPhotos;
        this.showLessPhotos();
    }

    addEventListener() {
        this.viewMoreBtn.addEventListener('click', this.viewMore.bind(this));
        this.showLessBtn.addEventListener('click', this.showLess.bind(this));
    }

    setupLightBox() {
        if (typeof setUpUeCollectionPhotoSwipe === 'undefined') {
            const zoomInSVG = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="pswp__icn" id="pswp__icn--zoom-in"><path d="M6.66667 9.16667H9.16667M9.16667 9.16667H11.6667M9.16667 9.16667V6.66667M9.16667 9.16667V11.6667M14.1667 14.1667L17.5 17.5M2.5 9.16667C2.5 10.9348 3.20238 12.6305 4.45262 13.8807C5.70286 15.131 7.39856 15.8333 9.16667 15.8333C10.9348 15.8333 12.6305 15.131 13.8807 13.8807C15.131 12.6305 15.8333 10.9348 15.8333 9.16667C15.8333 7.39856 15.131 5.70286 13.8807 4.45262C12.6305 3.20238 10.9348 2.5 9.16667 2.5C7.39856 2.5 5.70286 3.20238 4.45262 4.45262C3.20238 5.70286 2.5 7.39856 2.5 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            const zoomOutSVG = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="pswp__icn" id="pswp__icn--zoom-out"><path d="M14.1667 14.1667L17.5 17.5M6.66667 9.16667H11.6667M2.5 9.16667C2.5 10.9348 3.20238 12.6305 4.45262 13.8807C5.70286 15.131 7.39856 15.8333 9.16667 15.8333C10.9348 15.8333 12.6305 15.131 13.8807 13.8807C15.131 12.6305 15.8333 10.9348 15.8333 9.16667C15.8333 7.39856 15.131 5.70286 13.8807 4.45262C12.6305 3.20238 10.9348 2.5 9.16667 2.5C7.39856 2.5 5.70286 3.20238 4.45262 4.45262C3.20238 5.70286 2.5 7.39856 2.5 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            const zoomSVGs = zoomInSVG + zoomOutSVG;

            const lightbox = new window.PhotoSwipeLightbox({
                gallery: '.event-photo-gallery .photo-gallery',
                children: 'a',
                pswpModule: window.PhotoSwipe
            });


            lightbox.init();
        }
    }

    connectedCallback() {
        this.addEventListener();

        this.setupLightBox();
    }
}

customElements.define('event-photo-gallery', EventPhotoGallery);