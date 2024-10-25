window.onload = function () {
    // Select all details elements
    const details = document.querySelectorAll("details");

    details.forEach((detail) => {
        detail.addEventListener("toggle", function () {
            const content = this.querySelector(".content");
            if (this.open) {
                // Expanding: Set max-height large to allow full expansion
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Collapsing: Set max-height to 0
                content.style.maxHeight = "0";
            }
        });
    });
};