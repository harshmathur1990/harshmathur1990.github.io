document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const contentContainer = document.getElementById("content-container");

    // Function to load and display content dynamically
    function loadContent(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load content");
                }
                return response.text();
            })
            .then((html) => {
                contentContainer.innerHTML = html; // Insert loaded content
            })
            .catch((error) => {
                contentContainer.innerHTML = "<p>Error loading content. Please try again later.</p>";
                console.error("Error:", error);
            });
    }

    // Add event listeners for navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = link.getAttribute("data-target");
            loadContent(url);
        });
    });

    // Load the first section by default
    loadContent("about.html");
});
