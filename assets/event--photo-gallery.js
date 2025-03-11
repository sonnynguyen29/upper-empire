
class EventPhotoGallery extends HTMLElement {
    constructor() {
        super();
        this.viewMoreBtn = this.querySelector('#view-more-btn');
        this.showLessBtn = this.querySelector('#show-less-btn');
        this.photoGallery = this.querySelector('.photo-gallery');
        this.photoItems = this.photoGallery.querySelectorAll('.photo-gallery__photo-item');
        this.initialPhotos = this.dataset.initialPhotos;
        this.additionalPhotos = this.dataset.additionalPhotos;
        this.totalPhotos = this.initialPhotos;
    }

    showPhotos() {
        this.photoItems.forEach((photo, index) => {
            if (this.totalPhotos === this.photoItems.length) {
                this.showLessBtn.style.display = 'block';
                this.viewMoreBtn.style.display = 'none';
            }

            if (index < this.totalPhotos) {
                photo.classList.add('visible');
                photo.classList.remove('hidden');
            } else {
            }
        });
    }

    showLessPhotos() {
        this.photoItems.forEach((photo, index) => {
            if (this.totalPhotos === this.initialPhotos) {
                this.showLessBtn.style.display = 'none';
                this.viewMoreBtn.style.display = 'block';
            }

            if (index < this.totalPhotos) {
                photo.classList.add('visible');
                photo.classList.remove('hidden');
            } else {
                photo.classList.add('hidden');
                photo.classList.remove('visible');
            }
        });
    }

    viewMore() {
        this.totalPhotos += this.additionalPhotos;
        this.showPhotos();
    }

    showLess() {
        this.totalPhotos = this.initialPhotos;
        this.showLessPhotos();
    }

    addEventListener() {
        this.viewMoreBtn.addEventListener('click', this.viewMore.bind(this));
        this.showLessBtn.addEventListener('click', this.showLess.bind(this));
    }

    connectedCallback() {
        this.addEventListener();
    }
}

customElements.define('event-photo-gallery', EventPhotoGallery);