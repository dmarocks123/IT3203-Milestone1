/* Mobile Menu Toggle */
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("show");
    });

    // Close menu when a link is clicked (prevents stuck-open issue)
    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("show");
        });
    });

    // Ensures correct menu state on orientation change
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            menu.classList.remove("show"); // reset for desktop
        }
    });
});
