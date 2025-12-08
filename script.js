// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    // Only run if both elements exist
    if (toggleButton && menu) {
        toggleButton.addEventListener("click", function () {
            menu.classList.toggle("show");
        });
    }
});
