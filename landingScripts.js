// script for toggling the eye icon for the password

const passwordField = document.getElementById('passwordField');
// const passwordField = document.getElementsByClassName('passwordField');
const togglePassword = document.querySelector('.toggle-password');

togglePassword.addEventListener('click', function () {
    if (passwordField.type === 'password') {
        passwordField.type = 'text' // show the password
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash'); // change icon to slash
    } else {
        passwordField.type = 'password'; // hide the password
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye'); // change icon to eye
    }
})

// script for fading in elements on page load

// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", function() {
    requestAnimationFrame(function() {

        const fadeElements = document.querySelectorAll(".fadeable");

        fadeElements.forEach(function(element, index) {

            const delay = index * 80; // rate at which elements are faded in

            setTimeout(function() {
                element.classList.add("fade-in");

            }, delay);
        })
    })
});



