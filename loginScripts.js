// function for handling login
function loginUser() {
    // gets the value in the username and password fields
    const username = document.querySelector("#usernameField").value;
    const password = document.querySelector("#passwordField").value;


    // fetch is an API that is used to make an asynchronous HTTP POST request
    // from the login.php page
    fetch("login.php", {
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
            window.location.href = "main.php";
        } else {
            // display error message returned by server
            const errorContainer = document.querySelector(".error-message");
            errorContainer.textContent = data.message;

            errorContainer.classList.add('error-message-display');

            setTimeout(function () {
                errorContainer.classList.remove('error-message-display');
            }, 3000);
        }
    })
    // catches errors made during fetch operation and console logs them
    .catch((error) => {
        console.error("Error:", error);
    });
}