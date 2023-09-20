    // Get references to the password and confirmation password fields
    const newPasswordField = document.querySelector(".newPassword");
    const confirmPasswordField = document.querySelector(".confirmPassword");

    // Add an event listener to the form for validation
    document.querySelector("form").addEventListener("submit", function(event) {
        if (newPasswordField.value !== confirmPasswordField.value) {
            // Passwords do not match, prevent form submission and display an error message
            event.preventDefault();
            alert("Passwords do not match. Please re-enter them.");
        }
    });

    