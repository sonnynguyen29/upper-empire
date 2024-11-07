document.addEventListener('DOMContentLoaded', () => {
    const imageMask = document.querySelector('.image-mask');
    const container = document.querySelector('.image-with-mask');
    const image = document.querySelector('.parallax-image');

    // container.style.height = `${imageMask.height}px`;

    container.addEventListener('mousemove', (e) => {
        if (image.classList.contains("active")) {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = ((e.clientX - left - width / 2) / width) * 10;
            const y = ((e.clientY - top - height / 2) / height) * 10;

            image.style.transform = `translate(${x}%, ${y}%) scale(1.1)`;
        }
    });

    container.addEventListener('mouseleave', () => {
        if (image.classList.contains("active")) {
            image.style.transform = 'translate(0%, 0%) scale(1)';
        }
    });


    const footer = document.querySelector(".footer-section");

    // Intersection Observer options
    const options = {
        root: null, // Use the viewport as the root
        threshold: 1, // Trigger when 50% of the footer is in view
    };

    // Callback function for the observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    image.classList.add("active"); // Add active class when footer is in view
                }, 1000)
            } else {
                image.classList.remove("active"); // Remove active class when footer is out of view
            }
        });
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(observerCallback, options);

    // Observe the footer
    observer.observe(footer);
});