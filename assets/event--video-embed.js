window.onload = function () {
    new Splide('.video-embed__splide', {
        type: 'slide',
        perPage: 2,
        perMove: 1,
        pagination: false,
        arrows: false,
        mediaQuery: 'min',
        gap: '8px',
        padding: { left: '8px', right: '20%' },
        breakpoints: {
            1280: {
                perPage: 4,
                padding: { left: '16px', right: '16px' },
                gap: '16px',
            },
        },
    }).mount();
}

let videoPlayers = document.querySelectorAll(".video-embed-grid__video");
let thumbnails = document.querySelectorAll(".video-embed-grid__thumbnail_grid__thumbnail");

let players = []; // Store YouTube player instances

function onYouTubeIframeAPIReady() {
    videoPlayers.forEach((video, index) => {
        const videoId = video.getAttribute("data-video-id");

        players[index] = new YT.Player(video, {
            videoId: videoId,
            height: 720,
            width: 1280,
            playerVars: { 'enablejsapi': 1, 'playsinline': 1 },
            events: {
                'onReady': (event) => {
                    thumbnails[index].addEventListener("click", () => playSelectedVideo(index));
                },
            }
        });
    });
}

if (!window.YT || !window.YT.Player) {
    let scriptTag = document.createElement("script");
    scriptTag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
    scriptTag.onload = () => {
        if (window.YT && window.YT.Player) {
            onYouTubeIframeAPIReady();
        }
    };
} else {
    onYouTubeIframeAPIReady();
}

function playSelectedVideo(index, element) {
    videoPlayers = document.querySelectorAll(".video-embed-grid__video");

    videoPlayers.forEach((video, i) => {
        let player = players[i];

        if (i === index) {
            video.style.display = "block"; // Show selected video
            if (player && typeof player.playVideo === "function") {
                player.playVideo();
            }
            thumbnails[i].classList.add("video-embed-grid__thumbnail_grid__thumbnail--active");
        } else {
            video.style.display = "none"; // Hide other videos
            if (player && typeof player.pauseVideo === "function") {
                player.pauseVideo(); // Stops the video instead of pausing
            }
            thumbnails[i].classList.remove("video-embed-grid__thumbnail_grid__thumbnail--active");
        }
    });
}