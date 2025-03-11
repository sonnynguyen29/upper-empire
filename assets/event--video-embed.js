document.addEventListener('DOMContentLoaded', function () {
    new Splide('.video-embed__splide', {
        perPage: 2,
        perMove: 1,
        pagination: false,
        arrows: false,
        gap: '1rem',
        mediaQuery: 'min',
        padding: { left: 0, right: '20%' },
        trimSpace: false,
        gap: '8px',
        arrowPath:
            'M 39.511719 19.195312 L 24.511719 34.382812 C 24.199219 34.699219 23.773438 34.875 23.332031 34.875 C 22.890625 34.875 22.464844 34.699219 22.152344 34.382812 C 21.839844 34.066406 21.664062 33.636719 21.664062 33.1875 C 21.664062 32.738281 21.839844 32.308594 22.152344 31.992188 L 34.308594 19.6875 L 1.667969 19.6875 C 1.222656 19.6875 0.800781 19.511719 0.488281 19.191406 C 0.175781 18.875 0 18.449219 0 18 C 0 17.550781 0.175781 17.125 0.488281 16.808594 C 0.800781 16.492188 1.222656 16.3125 1.667969 16.3125 L 34.308594 16.3125 L 22.152344 4.007812 C 21.839844 3.691406 21.664062 3.261719 21.664062 2.8125 C 21.664062 2.363281 21.839844 1.933594 22.152344 1.617188 C 22.464844 1.300781 22.890625 1.125 23.332031 1.125 C 23.773438 1.125 24.199219 1.300781 24.511719 1.617188 L 39.511719 16.804688 C 39.667969 16.964844 39.789062 17.148438 39.875 17.355469 C 39.957031 17.558594 40 17.777344 40 18 C 40 18.222656 39.957031 18.441406 39.875 18.644531 C 39.789062 18.851562 39.667969 19.039062 39.511719 19.195312 Z M 39.511719 19.195312',
        breakpoints: {
            768: {
                perPage: 4,
            },
            1280: {
                gap: '16px',
                perPage: 10,
                padding: { left: 0, right: 0 },
            },
        },
    }).mount();

    const addEventListenerThumbnails = () => {
        const thumbnails = document.querySelectorAll('.video-embed-grid__thumbnail_grid__thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', (event) => {
                // const videoPosition = event.currentTarget.getAttribute('data-video-position');
                const videos = document.querySelectorAll('.video-embed-grid__video');
                videos.forEach((video, position) => {
                    video.style.display = 'none';

                    if (index === position) {
                        video.style.display = 'block';
                    }
                });
            });
        });
    };

    addEventListenerThumbnails();
});