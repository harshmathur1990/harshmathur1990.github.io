document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 70;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    sidebarLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const dynamicContent = document.getElementById("dynamic-content");

    function loadContent(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((html) => {
                dynamicContent.innerHTML = html;
                updateActiveLink(url);
            })
            .catch((error) => {
                dynamicContent.innerHTML = "<p>Error loading content. Please try again later.</p>";
                console.error("Error:", error);
            });
    }

    function updateActiveLink(target) {
        navLinks.forEach((link) => {
            if (link.getAttribute("href") === target) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default navigation
            const url = e.target.getAttribute("href");
            loadContent(url);
        });
    });

    // Load the first section by default
    loadContent("research.html");
});