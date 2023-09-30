function updateContact(contact_id) {
    // Get the modal element and the form
    const modal = document.getElementById('editContactModal');
    const editContactForm = document.getElementById('editContactForm');
  
    // Use the contactId to fetch contact details and populate the form fields
    // Here, you can use AJAX to fetch contact details based on the contactId and populate the form fields.


  
    // Display the modal
    // modal.style.display = 'block';
  
    // Add an event listener to close the modal when the user clicks the close button
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    // Handle form submission (saving changes) using AJAX
    editContactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      // Use AJAX to submit the form data (updated contact information) to your PHP script
      // Include the contactId as well to identify the contact being edited.
      
      // After successfully updating the contact, you can close the modal and refresh the contact list if needed.
      // You may also want to add error handling.
    });
  }

  // Function to show the edit contact modal
function showEditModal() {
    const modal = document.getElementById('editContactModal');
    console.log('help');
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
  
  