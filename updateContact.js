
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
  console.log(fieldName);
  // const inputField = document.getElementById(`new${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`);
  const inputField = document.getElementById(fieldName).value;
  // const initialValue = eval(`init${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`);
  const initialValue = eval(`init${fieldName.slice(3)}`);

  console.log(inputField, initialValue);

  if (inputField !== initialValue) {
    changesMade[fieldName] = true;
    console.log('change exists in this field');
  } else {
    changesMade[fieldName] = false;
    console.log('change does not exist in this field');
  }
}

// save button element
const submitButton = document.querySelector('.save-btn');
// initially set the button to be nonclickable

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

  // send data to server
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

  });

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
  }
  
  // Function to hide the edit contact modal
  function hideEditModal() {
    const modal = document.getElementById('editContactModal');
    // WE WANT TO PREVENT THIS FROM HAPPENING IN SOME CASES
    modal.style.display = 'none';
  }
  
  // event delegation handles clicks on dynamically generated elements
  document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        showEditModal();
    } else if (event.target.classList.contains('close')) {
        hideEditModal();
    }
  });
  
  