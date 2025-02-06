class StoryVideo extends HTMLElement {
    constructor() {
        super();

        this.storyVideos = [];
        this.currentVideoIndex = 0;
    }

    getVideoElement() {
        const templateEl = this.querySelector('template');

        const templateContent = templateEl.content;
        const videoItemEls = templateContent.querySelectorAll('.video-item');
        const videoItems = [];

        videoItemEls.forEach(videoItemEl => {
            const sourceElement = videoItemEl.querySelector('source');
            videoItems.push(sourceElement?.getAttribute('src') || null);
        })

        this.storyVideos = videoItems;
    }

    initializeStoryVideo() {
        const videoPlayer = this.querySelector('#videoPlayer');
        const progressContainer = this.querySelector('#progressContainer');

        this.storyVideos.forEach((_, index) => {
            let bar = document.createElement('div');
            bar.classList.add('progress-bar');
            bar.innerHTML = '<div></div>';
            bar.addEventListener('click', () => switchVideo(index));
            progressContainer.appendChild(bar);
        });

        const progressBarWrappers = this.querySelectorAll('.progress-bar');
        const progressBars = this.querySelectorAll('.progress-bar div');

        const switchVideo = (index) => {
            this.currentVideoIndex = index;
            videoPlayer.src = this.storyVideos[index];
            videoPlayer.muted = true;
            videoPlayer.play();

            progressBars.forEach((bar, i) => {
                bar.style.visibility = 'hidden';
                progressBarWrappers[i].style.background = '#6e6e6e';

                if ( i < index) { 
                    progressBarWrappers[i].style.background = '#6e6e6e';
                    bar.style.width = '100%';
                } else { 
                    progressBarWrappers[i].style.background = '#d3d3d3';
                    bar.style.width = '0%';
                }
                
                
                setTimeout(() => {
                    bar.style.visibility = 'visible';
                    progressBarWrappers[i].style.background = '#d3d3d3';
                }, 500)
            });
        }

        const updateProgress = () => {
            const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
            progressBars[this.currentVideoIndex].style.width = progress + '%';
        }

        videoPlayer.addEventListener('timeupdate', updateProgress);
        videoPlayer.addEventListener('ended', () => {
            if (this.currentVideoIndex < this.storyVideos.length - 1) {
                switchVideo(this.currentVideoIndex + 1);
            } else {
                switchVideo(0); // Loop back to the first video
            }
        });
            
        const prevVideo = () => {
            if (this.currentVideoIndex > 0) {
                switchVideo(this.currentVideoIndex - 1);
            }
        }
        
        const nextVideo = () => {
            if (this.currentVideoIndex < this.storyVideos.length - 1) {
                switchVideo(this.currentVideoIndex + 1);
            } else {
                switchVideo(0); // Loop back to the first video
            }
        }

        this.querySelector('#prevBtn').addEventListener('click', () => prevVideo());
        this.querySelector('#nextBtn').addEventListener('click', () => nextVideo());

        switchVideo(0);
    }

    connectedCallback() {
        this.getVideoElement();
        this.initializeStoryVideo();
    }
}

customElements.define('story-video', StoryVideo);