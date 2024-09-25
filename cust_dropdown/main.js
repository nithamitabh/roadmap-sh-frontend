const dropdown = document.querySelector(".dropdown");
const dropdownButton = document.querySelector(".dropdown-button");
const dropdownText = document.querySelector(".dropdown-text");
const dropdownContent = document.querySelector(".dropdown-content");
const options = document.querySelectorAll(".option");

// Toggle dropdown open/close
dropdownButton.addEventListener("click", () => {
    dropdown.classList.toggle("open");
    dropdown.classList.remove("attention"); // Stop animation after first click
});

// Handle option selection
options.forEach((option) => {
    option.addEventListener("click", () => {
        // Update the selected text
        dropdownText.textContent = option.textContent;

        // Close the dropdown
        dropdown.classList.remove("open");

        // Remove selected class from all options
        options.forEach((opt) => opt.classList.remove("selected"));

        // Add selected class to clicked option
        option.classList.add("selected");
    });
});

// Close dropdown if clicked outside
window.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
    }
});