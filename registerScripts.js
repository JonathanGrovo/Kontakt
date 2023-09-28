// Get references to the password and confirmation password fields
const newPasswordField = document.querySelector(".newPassword");
const confirmPasswordField = document.querySelector(".confirmPassword");

let errorContainer = document.querySelector(".error-message");

// Add an event listener to the form for validation
document.querySelector("form").addEventListener("submit", function(event) {

    // so the error text isn't reset when submit button clicked too fast
    if (newPasswordField.value !== confirmPasswordField.value && errorContainer.textContent == "") {
        errorContainer.textContent = "";
    }
    
    if (newPasswordField.value !== confirmPasswordField.value) {
        // Passwords do not match, prevent form submission and display an error message
        event.preventDefault();

        // if there is already an error message being displayed
        if (errorContainer.classList.contains('error-message-display')) {
            return;
        } else {
            
            errorContainer.textContent = "Passwords do not match";
            errorContainer.classList.add('error-message-display');
            
            // so the class isn't removed too quickly
            setTimeout(function () {
                errorContainer.classList.remove('error-message-display');
            }, 3000);

        }
} else {
        // passwords match, continue with registration process
        registerUser();
    }
});

// function for handling registration
function registerUser() {
    // gets the value in the username and password fields
    const username = document.querySelector("#usernameField").value;
    const password = document.querySelector("#passwordField").value;


    // fetch is an API that is used to make an asynchronous HTTP POST request
    // from the register.php page
    fetch("newUser.php", {
        method: "POST",
        // username and password are sent as a JSON object in request body
        body: JSON.stringify({username, password}),
        // specifies request content type as JSON
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response => response.json())) // converts server response into js object
    // where the JSON data returned by the server is handled logically
    .then((data) => {
        console.log(data);

        if (data.success) {
            // redirect to main page on successful login
            window.location.href = "mainPage.html";
        } else {

            // to ensure the error message doesn't reset when button is clicked too fast
            if (errorContainer.classList.contains('error-message-display')) {
                return;
            } else {
                errorContainer.textContent = "";
                // display error message returned by server
                errorContainer.textContent = data.message;
                errorContainer.classList.add('error-message-display');

                setTimeout(function () {
                    errorContainer.classList.remove('error-message-display');
                }, 3000);
            }
        }
    })
    // catches errors made during fetch operation and console logs them
    .catch((error) => {
        console.error("Error:", error);
    });
}
    