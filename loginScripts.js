// function for handling login
function loginUser() {
    // gets the value in the username and password fields
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetch("login.php", {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
            "Content-Type": "application/json",
        },
    })
}