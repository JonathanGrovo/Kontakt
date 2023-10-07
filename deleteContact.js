// the contact who we want to delete
let deleteContact;

// function for getting the contact we want to delete's id
function getId (contact_id) {
    deleteContact = contact_id;
    console.log(deleteContact);
}

// get modal element and form element, as well as the modal content element
const deleteModal = document.getElementById('deleteModal');
const deleteModalContent = document.getElementById('deleteModalContent');
const deleteForm = document.getElementById('deleteForm');

// want to specifically get the save button related to the add form
const deleteSubmitButton = document.getElementById('deleteBtn');

// when the submit button is pressed for delete a contact
deleteForm.addEventListener('submit', function (event) {
  // prevent default form submission behaviour
  event.preventDefault();

  console.log(deleteContact);

  fetch('deleteContact.php', {
    method: 'POST',
    // we want to send our id as JSON
    body: JSON.stringify({ deleteContact }),
    // specifies request content type as JSON
    headers: {
        'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json()) // server response converted into js object
  .then((data) => {
    if (data.success) {
      // Close the modal
      hideDeleteModal();
      // update the list of contacts on the main page
      updateContacts('delete');
    } else {
      alert('contact not deleted successfully'); // WANT TO HAVE SOME KIND OF CONFIRMATION MESSAGER
      console.error(data.message);
      // Handle the error appropriately
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle the error appropriately
  });
})

// Function to show the delete contact modal
function showDeleteModal() {
    deleteModal.style.display = 'block';

    // fancy transition in
    setTimeout(function () {
      deleteModalContent.classList.add('show'); deleteModal.classList.add('show');}, 10);
}
  
// Function to hide the edit contact modal
function hideDeleteModal() {
  // transitioned event listener to remove modal content
  deleteModalContent.classList.add('hide');
  deleteModal.classList.add('hide');

  // wait to remove the styles
  setTimeout(function () {
    deleteModal.style.display = 'none'; deleteModalContent.classList.remove('show'); 
    deleteModalContent.classList.remove('hide'); deleteModal.classList.remove('show'); 
    deleteModal.classList.remove('hide')}, 200);
}
  
// event delegation handles clicks on dynamically generated elements
document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-contact')) {
      showDeleteModal();
  } else if (event.target.classList.contains('deleteClose')) { // may need to add this line
      hideDeleteModal();
  }
})