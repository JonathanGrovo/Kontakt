// regular expressions used to ensure user is entering valid credentials
const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\d{10}|\d{3}-\d{3}-\d{4})$/;

function validEntries (firstname, lastname, email, phonenumber, form) {

    // element for the error message to reside
    let errorContainer;

    // determining whether the error will be displayed in the edit or add modal
    if (form === 'editForm') {
        errorContainer = document.getElementById('editError');
    } else {
        errorContainer = document.getElementById('addError');
    }

    // if the user enters a nonvalid firstname
    if (!nameRegex.test(firstname)) {
    // display related error message
    errorContainer.textContent = "Not a valid first name";

    // ensure we aren't displaying it too fast
    if (!errorContainer.classList.contains('error-message-display')) {
        errorContainer.classList.add('error-message-display');

        setTimeout(function () {
        errorContainer.classList.remove('error-message-display');
        }, 3000);
    }
    return false;

    } else if (!nameRegex.test(lastname)) { // if nonvalid last name
    // display related error message
    errorContainer.textContent = "Not a valid last name";

    // ensure we aren't displaying it too fast
    if (!errorContainer.classList.contains('error-message-display')) {
        errorContainer.classList.add('error-message-display');

        setTimeout(function () {
        errorContainer.classList.remove('error-message-display');
        }, 3000);
    }
    return false;

    } else if (!emailRegex.test(email)) { // if nonvalid email
        // display related error message
        errorContainer.textContent = "Not a valid email address";

        // ensure we aren't displaying it too fast
        if (!errorContainer.classList.contains('error-message-display')) {
        errorContainer.classList.add('error-message-display');

        setTimeout(function () {
            errorContainer.classList.remove('error-message-display');
        }, 3000);
        }
        return false;

    } else if (!phoneRegex.test(phonenumber)) { // if nonvalid phone number
        // display related error message
        errorContainer.textContent = "Not a valid phone number";

        // ensure we aren't displaying it too fast
        if (!errorContainer.classList.contains('error-message-display')) {
        errorContainer.classList.add('error-message-display');

        setTimeout(function () {
            errorContainer.classList.remove('error-message-display');
        }, 3000);
        }
        return false;
    } else { // in the case that all of the entries are valid
        return true;
    }
}