
// get modal element and form element
const modal = document.getElementById('editContactModal');
const editContactForm = document.getElementById('editContactForm');

// gets all existing contact credentials and puts them in the input fields
function getCredentials(firstname, lastname, email, phonenumber, contact_id) {
  document.getElementById('newFirstname').value = firstname;
  document.getElementById('newLastname').value = lastname;
  document.getElementById('newEmail').value = email;
  document.getElementById('newPhonenumber').value = phonenumber;
  document.getElementById('contact_id').value = contact_id;
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
  
  