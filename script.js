document.addEventListener("DOMContentLoaded", () => {
    // 1. Toggle meniu pe mobil (animatie burger -> X + slide dropdown)
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // 2. Marcheaza automat linkul activ din navbar in functie de pagina curenta
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
        const href = link.getAttribute("href").replace("./", "");
        if (href === currentPage) {
            link.classList.add("active");
        }
    });
});