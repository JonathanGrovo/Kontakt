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