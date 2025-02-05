class WhatnotUpcomingEvent extends HTMLElement {
    constructor() {
        super();
    }

    formatDate(date_time) {
        if (!date_time) { return 'Upcoming'; }

        const now = new Date();
        const targetDate = new Date(date_time);

        // Check if the date is tomorrow
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);

        if (targetDate.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // Check if the date is within the same week
        const diffDays = Math.floor((targetDate - now) / (1000 * 60 * 60 * 24));
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        if (diffDays >= 0 && diffDays < 7) {
            return `${daysOfWeek[targetDate.getDay()]}, ${targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        return targetDate.toLocaleString(); // Fallback if it's not tomorrow or within the same week
    }

    setEventText({ date_time, img_src, link, sub_heading, heading, video_poster, video_src }) {
        const subHeadingElement = this.querySelector('.whatnot__sub-heading');
        const dateTimeElement = this.querySelector('.whatnot__date-time');
        const mainHeadingElement = this.querySelector('.whatnot__heading');
        const videoElement = this.querySelector('video');
        const aElement = this.querySelector('.whatnot-video-href');

        // Set inner text of each element
        if (subHeadingElement) subHeadingElement.innerText = sub_heading;
        if (dateTimeElement) dateTimeElement.innerText = this.formatDate(date_time);
        if (mainHeadingElement) mainHeadingElement.innerText = heading;
        if (aElement) aElement.setAttribute('href', link);
        if (videoElement) {
            videoElement.setAttribute('poster', video_poster);

            const videoSourceElement = videoElement.querySelector('source');
            const imgElement = videoElement.querySelector('img');
            videoSourceElement.setAttribute('src', video_src);
            imgElement.setAttribute('src', img_src);
        }
    }

    connectedCallback() {

    }
}

customElements.define('whatnot-upcoming-event', WhatnotUpcomingEvent);

class WhatnotEvents extends HTMLElement {
    constructor() {
        super();

        this.whatnotEvents = [];
        this.upComingEvents = {};
    }

    initWhatnotEvents() {
        const template = this.querySelector('template');

        if (!template) {
            console.error('Error: The template element does not exist inside the wrapper.');
        } else {
            const templateContent = template.content;
            const whatnotEventsNodeList = templateContent.querySelectorAll('.whatnot-event');
            const eventArray = [];

            whatnotEventsNodeList.forEach(eventElement => {
                const scriptTag = eventElement.querySelector('script');
                const videoElement = eventElement.querySelector('.whatnot-video video');
                const sourceElement = eventElement.querySelector('.whatnot-video source');
                const imgElement = eventElement.querySelector('.whatnot-video img');

                if (scriptTag) {
                    try {
                        const eventObject = eval(`(${scriptTag.textContent.trim()})`);
                        eventObject.video_poster = videoElement?.getAttribute('poster') || null;
                        eventObject.video_src = sourceElement?.getAttribute('src') || null;
                        eventObject.img_src = imgElement?.getAttribute('src') || null;
                        eventArray.push(eventObject);
                    } catch (error) {
                        console.error('Error parsing script content:', error);
                    }
                } else {
                    console.warn('Warning: No <script> tag found in a whatnot-event element.');
                }
            });

            if (eventArray.length === 0) {
                console.warn('Warning: No whatnot-event objects were found or processed.');
            } else {
                const upcomingEvents = eventArray.filter(event => {
                    const eventDate = new Date(event.date_time);
                    const currentDate = new Date();
                    return eventDate > currentDate;
                });

                if (upcomingEvents.length > 0) {
                    const sortUpcomingEvents = upcomingEvents.sort((a, b) => {
                        const dateA = new Date(a.date_time);
                        const dateB = new Date(b.date_time);
                        return dateA - dateB;
                    });


                    this.whatnotEvents = [...sortUpcomingEvents];
                    this.upComingEvents = sortUpcomingEvents[0];
                    console.log(this.whatnotEvents);
                    console.log(this.upComingEvents);
                } else {
                    console.log('No upcoming events.');

                    const whatnotEventDefaultSettingEl = templateContent.querySelector('#whatnot-event-default');
                    const scriptDefault = templateContent.querySelector('script');
                    const videoDefaultElement = whatnotEventDefaultSettingEl.querySelector('.whatnot-video video');
                    const sourceDefaultElement = whatnotEventDefaultSettingEl.querySelector('.whatnot-video source');
                    const imageDefaultElement = whatnotEventDefaultSettingEl.querySelector('.whatnot-video img');

                    let whatnotEventDefaultSettings = eval(`(${scriptDefault.textContent.trim()})`);
                    whatnotEventDefaultSettings = { 
                        ...whatnotEventDefaultSettings,
                        video_poster: videoDefaultElement?.getAttribute('poster') || null,
                        video_src: sourceDefaultElement?.getAttribute('src') || null,
                        img_src: imageDefaultElement?.getAttribute('src') || null,
                        isDefaultSettings: true,
                    }

                    this.upComingEvents = whatnotEventDefaultSettings;
                }
            }
        }
    }

    connectedCallback() {
        this.initWhatnotEvents();

        this.whatnotUpcomingEventEl = document.querySelector('whatnot-upcoming-event');
        this.whatnotUpcomingEventEl.setEventText(this.upComingEvents);
    }
}

customElements.define('whatnot-events', WhatnotEvents);