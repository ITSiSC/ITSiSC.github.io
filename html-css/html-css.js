document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }
});