// get modal element and form element, as well as the modal content element
const addModal = document.getElementById('addModal');
const addModalContent = document.getElementById('addModalContent');
const addForm = document.getElementById('addForm');

// want to specifically get the save button related to the add form
const addSubmitButton = document.getElementById('addBtn');

// flahs for tracking whether or not the user has entered into any field
const isEmpty = {
  firstname: true,
  lastname: true,
  email: true,
  phonenumber: true,
};

// function to set the isEmpty flag for a specific field
function trackAddChange(fieldName) {
  // gets the value to compare
  const inputField = document.getElementById(fieldName).value;

  // if the input field is not blank
  if (inputField !== '') {
    isEmpty[fieldName] = false;
  } else {
    isEmpty[fieldName] = true;
  }
}

// event listeners for input fields to track changes
const addInputFields = document.querySelectorAll('.addInput input'); // gets only add input fields
addInputFields.forEach((input) => {
  const fieldName = input.getAttribute('name'); // gets the field name
  input.addEventListener('input', () => {
    trackAddChange(fieldName); // call trackChange with the fieldname
    // if at least one field is not empty
    if (notAllEmpty()) {
      // allow form submission
      console.log('true');
      addSubmitButton.removeAttribute('disabled');
    } else {
      // disallow form submission
      addSubmitButton.setAttribute('disabled', true);
    }
  })
})

// function checking 
function notAllEmpty() {
  return Object.values(isEmpty).some((value) => value === false);
}

// when the submit button is pressed for updating a contact
addForm.addEventListener('submit', function (event) {
  // prevent default form submission behaviour
  event.preventDefault();

  // get input values from form
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const phonenumber = document.getElementById('phonenumber').value;

    // create a JSON object with the data
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phonenumber: phonenumber,
  };

  // send data to server if we have valid input
  if (validEntries(firstname, lastname, email, phonenumber, 'addForm')) {
    // POST request to php script using fetch
    fetch('createContact.php', {
      method: 'POST',
      // we want to send our contact information as a JSON object
      body: JSON.stringify(data),
      // specifies request content type as JSON
      headers: {
          'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // server response converted into js object
      .then((data) => {
        if (data.success) {
          // Close the modal
          hideAddModal();
          // update the list of contacts on the main page
          updateContacts('create');
        } else {
          alert('contact not added successfully');
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
})

// Function to show the add contact modal
function showAddModal() {
    addModal.style.display = 'block';

    // reset flags on modal open
    for (const field in isEmpty) {
      isEmpty[field] = true; // all fields are initially empty
    }

    // initially set the button to not be clickable
    addSubmitButton.setAttribute('disabled', true);

    // fancy transition in
    setTimeout(function () {
      addModalContent.classList.add('show'); addModal.classList.add('show');}, 10);
}
  
// Function to hide the edit contact modal
function hideAddModal() {
  // transitioned event listener to remove modal content
  addModalContent.classList.add('hide');
  addModal.classList.add('hide');

  // wait to remove the styles
  setTimeout(function () {
    addModal.style.display = 'none'; addModalContent.classList.remove('show'); 
    addModalContent.classList.remove('hide'); addModal.classList.remove('show'); 
    addModal.classList.remove('hide')}, 200);
}
  
// event delegation handles clicks on dynamically generated elements
document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-contact')) {

    // set input values of form to be blank
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phonenumber').value = '';

      showAddModal();
  } else if (event.target.classList.contains('addClose')) { // may need to add this line
      hideAddModal();
  }
})