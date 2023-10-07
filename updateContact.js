// get modal element and form element, as well as the modal content element
const editModal = document.getElementById('editModal');
const editModalContent = document.getElementById('editModalContent');
const editForm = document.getElementById('editForm');

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

// want to specifically get the save button related to the edit form
const editSubmitButton = document.getElementById('editBtn');

// event listeners for input fields to track changes
const inputFields = document.querySelectorAll('.editInput input'); // gets only edit input fields
inputFields.forEach((input) => {
  const fieldName = input.getAttribute('name'); // gets the field name
  input.addEventListener('input', () => {
    trackChange(fieldName); // call trackChange with the fieldname
    // if there are changes to a field
    if (hasChanges()) {
      // allow form submission
      editSubmitButton.removeAttribute('disabled');
    } else {
      // prevent form submission
      editSubmitButton.setAttribute('disabled', true);
    }
  })
})

// function checking if any field has changes
function hasChanges() {
  return Object.values(changesMade).some((value) => value === true);
}

// when the submit button is pressed for updating a contact
editForm.addEventListener('submit', function (event) {
  // prevent default form submission behaviour
  event.preventDefault();

  // get values from the form
  const newFirstname = document.getElementById('newFirstname').value;
  const newLastname = document.getElementById('newLastname').value;
  const newEmail = document.getElementById('newEmail').value;
  const newPhonenumber = document.getElementById('newPhonenumber').value;
  const contact_id = document.getElementById('contact_id').value;

  // send data to server if we have valid input
  if (validEntries(newFirstname, newLastname, newEmail, newPhonenumber, 'editForm')) {
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
          // Close the modal
          hideEditModal();
          // update the list of contacts on the main page
          updateContacts();
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
})

  // Function to show the edit contact modal
function showEditModal() {
    editModal.style.display = 'block';

    // reset flags on modal open
    for (const field in changesMade) {
      changesMade[field] = false; // reset each flag to false
    }
    // initially set the button to not be clickable
    editSubmitButton.setAttribute('disabled', true);

    // fancy transition in
    setTimeout(function () {
      editModalContent.classList.add('show'); editModal.classList.add('show');}, 10);
}
  
// Function to hide the edit contact modal
function hideEditModal() {
  // transitioned event listener to remove modal content
  editModalContent.classList.add('hide');
  editModal.classList.add('hide');

  // wait to remove the styles
  setTimeout(function () {
    editModal.style.display = 'none'; editModalContent.classList.remove('show'); 
    editModalContent.classList.remove('hide'); editModal.classList.remove('show'); 
    editModal.classList.remove('hide')}, 200);
}
  
// event delegation handles clicks on dynamically generated elements
document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('edit-button')) {
      showEditModal();
  } else if (event.target.classList.contains('editClose')) { // may need to edit this line
      hideEditModal();
  }
})
