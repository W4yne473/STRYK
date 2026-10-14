
/* ================================
   STRYK MOBILE MENU
================================ */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    document.addEventListener("click", (event) => {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}



/* ================================
   STRYK PRODUCT FILTERS
================================ */

const filterButtons = document.querySelectorAll(".filter-button");
const productGrid = document.getElementById("product-grid");

if (filterButtons.length && productGrid) {
    let isFiltering = false;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (isFiltering || button.classList.contains("active")) return;

            isFiltering = true;

            const selectedFilter = button.dataset.filter;
            const cards = [...productGrid.querySelectorAll(".product-card")];

            // Update active button
            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            // Fade out cards that won't be shown
            const cardsToHide = cards.filter((card) => {
                return selectedFilter !== "all" &&
                    card.dataset.category !== selectedFilter;
            });

            cardsToHide.forEach((card) => {
                card.classList.add("filter-exit");
            });

            window.setTimeout(() => {
                cardsToHide.forEach((card) => {
                    card.classList.add("filter-hidden");
                    card.classList.remove("filter-exit");
                });

                // Reveal matching cards with a subtle upward motion
                const cardsToShow = cards.filter((card) => {
                    return selectedFilter === "all" ||
                        card.dataset.category === selectedFilter;
                });

                cardsToShow.forEach((card) => {
                    card.classList.add("filter-hidden");
                    card.classList.remove("filter-exit");
                });

                // Force the browser to apply the hidden state first
                void productGrid.offsetHeight;

                cardsToShow.forEach((card) => {
                    card.classList.remove("filter-hidden");
                });

                window.requestAnimationFrame(() => {
                    cardsToShow.forEach((card) => {
                        card.classList.add("filter-exit");
                    });

                    window.requestAnimationFrame(() => {
                        cardsToShow.forEach((card) => {
                            card.classList.remove("filter-exit");
                        });
                    });
                });

                window.setTimeout(() => {
                    isFiltering = false;
                }, 320);
            }, 200);
        });
    });
}
