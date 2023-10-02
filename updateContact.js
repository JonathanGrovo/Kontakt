// get modal element and form element
const modal = document.getElementById('editContactModal');
const editContactForm = document.getElementById('editContactForm');

// initial field values
let initFirstname;
let initLastname;
let initEmail;
let initPhonenumber;

// gets all existing contact credentials and puts them in the input fields
function getCredentials(firstname, lastname, email, phonenumber, contact_id) {
  [document.getElementById('newFirstname').value, initFirstname] = [firstname, firstname];
  [document.getElementById('newLastname').value, initLastname] = [lastname, lastname];
  [document.getElementById('newEmail').value, initEmail] = [email, email];
  [document.getElementById('newPhonenumber').value, initPhonenumber] = [phonenumber, phonenumber];
  document.getElementById('contact_id').value = contact_id;
}

// flags tracking changes made in input fields
const changesMade = {
  newFirstname: false,
  newLastname: false,
  newEmail: false,
  newPhonenumber: false,
};

// function to set the changesMade flag for a specific field
function trackChange(fieldName) {
  // gets the values to compare
  const inputField = document.getElementById(fieldName).value;
  const initialValue = eval(`init${fieldName.slice(3)}`);

  // if the input field matches its corresponding initial value
  if (inputField !== initialValue) {
    changesMade[fieldName] = true;
  } else {
    changesMade[fieldName] = false;
  }
}

// save button element
const submitButton = document.querySelector('.save-btn');

// event listeners for input fields to track changes
const inputFields = document.querySelectorAll('.modal-input input');
inputFields.forEach((input) => {
  const fieldName = input.getAttribute('name'); // gets the field name
  input.addEventListener('input', () => {
    trackChange(fieldName) // call trackChange with the fieldname
    // if there are changes to a field
    if (hasChanges()) {
      // allow form submission
      submitButton.removeAttribute('disabled');
    } else {
      // prevent form submission
      submitButton.setAttribute('disabled', true);
    }
  })
})

// function checking if any field has changes
function hasChanges() {
  return Object.values(changesMade).some((value) => value === true);
}

// flag to ensure we don't perform a fetch on nonvalid input
let validInput = true;

// when the submit button is pressed for updating a contact
editContactForm.addEventListener('submit', function (event) {
  // prevent default form submission behaviour
  event.preventDefault();

  // get values from the form
  const newFirstname = document.getElementById('newFirstname').value;
  const newLastname = document.getElementById('newLastname').value;
  const newEmail = document.getElementById('newEmail').value;
  const newPhonenumber = document.getElementById('newPhonenumber').value;
  const contact_id = document.getElementById('contact_id').value;

  // regular expressions used to ensure user is entering valid credentials
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\d{10}|\d{3}-\d{3}-\d{4})$/;

  // want to assume the input is initially valid
  validInput = true;

  // if the user enters a nonvalid firstname
  if (!nameRegex.test(newFirstname)) {
    // display related error message
    const errorContainer = document.querySelector(".error-message");
    errorContainer.textContent = "Not a valid first name";

    // ensure we aren't displaying it too fast
    if (!errorContainer.classList.contains('error-message-display')) {
      errorContainer.classList.add('error-message-display');

      setTimeout(function () {
        errorContainer.classList.remove('error-message-display');
      }, 3000);
    }
    validInput = false;

  } else if (!nameRegex.test(newLastname)) { // if nonvalid last name
    // display related error message
    const errorContainer = document.querySelector(".error-message");
    errorContainer.textContent = "Not a valid last name";

    // ensure we aren't displaying it too fast
    if (!errorContainer.classList.contains('error-message-display')) {
      errorContainer.classList.add('error-message-display');

      setTimeout(function () {
        errorContainer.classList.remove('error-message-display');
      }, 3000);
    }
    validInput = false;

  } else if (!emailRegex.test(newEmail)) { // if nonvalid email
      // display related error message
      const errorContainer = document.querySelector(".error-message");
      errorContainer.textContent = "Not a valid email address";
  
      // ensure we aren't displaying it too fast
      if (!errorContainer.classList.contains('error-message-display')) {
        errorContainer.classList.add('error-message-display');
  
        setTimeout(function () {
          errorContainer.classList.remove('error-message-display');
        }, 3000);
      }
      validInput = false;

  } else if (!phoneRegex.test(newPhonenumber)) { // if nonvalid phone number
      // display related error message
      const errorContainer = document.querySelector(".error-message");
      errorContainer.textContent = "Not a valid phone number";

      // ensure we aren't displaying it too fast
      if (!errorContainer.classList.contains('error-message-display')) {
        errorContainer.classList.add('error-message-display');

        setTimeout(function () {
          errorContainer.classList.remove('error-message-display');
        }, 3000);
      }
      validInput = false;
  }

  // send data to server if we have valid input
  if (validInput) {
    fetch('updateContact.php', {
      method: 'POST',
      body: JSON.stringify({
        contact_id: contact_id,
        newFirstname: newFirstname,
        newLastname: newLastname,
        newEmail: newEmail,
        newPhonenumber: newPhonenumber,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the contact list or take other necessary actions
          // Close the modal
          hideEditModal();
        } else {
          console.error(data.message);
          // Handle the error appropriately
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error appropriately
      });
    }
})

  // Function to show the edit contact modal
function showEditModal() {
    const modal = document.getElementById('editContactModal');
    modal.style.display = 'block';
    // reset flags on modal open
    for (const field in changesMade) {
      changesMade[field] = false; // reset each flag to false
    }
    // initially set the button to not be clickable
    submitButton.setAttribute('disabled', true);

    // fancy transition in
    const modalContent = document.querySelector('.modal-content');

    setTimeout(function () {
      modalContent.classList.add('show');}, 10);
}
  
// Function to hide the edit contact modal
function hideEditModal() {
  const modal = document.getElementById('editContactModal');
  // modal.style.display = 'none';

  // remove the show class from the modal-content div
  const modalContent = document.querySelector('.modal-content');
  // modalContent.classList.remove('show');

  // // transitioned event listener to remove modal content
  // modalContent.addEventListener('transitioned', function() {
  //   modal.style.display = 'none'; }, {once: true });
  // modalContent.classList.remove('show');
  modalContent.classList.add('hide');
  setTimeout(function () {
    modal.style.display = 'none'; modalContent.classList.remove('show'); modalContent.classList.remove('hide');}, 500);

  // modalContent.classList.remove('show');
  // modalContent.classList.remove('show');
  // modalContent.classList.remove('hide');
}
  
// event delegation handles clicks on dynamically generated elements
document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('edit-button')) {
      showEditModal();
  } else if (event.target.classList.contains('close')) {
      hideEditModal();
  }
})
