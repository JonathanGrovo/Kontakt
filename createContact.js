// get form element
const contactForm = document.querySelector('form');

// add submit event listener
contactForm.addEventListener('submit', function (eevent) {
    e.preventDefault(); // prevent default form submission

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

    console.log(data);

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
            if(data.success) {
                alert('contact added successfully');
            } else {
                alert('contact not added successfully');
                console.log(data);
            }
        })
        .catch((error) => {
            console.error('some error', error);
        });
});








// get modal element and form element, as well as the modal content element
const addModal = document.getElementById('addModal');
const addForm = document.getElementById('addForm');
const addModalContent = document.getElementById('addModalContent');

// save button element
const submitButton = document.querySelector('.save-btn');

// when the submit button is pressed for updating a contact
addForm.addEventListener('submit', function (event) {
  // prevent default form submission behaviour
  event.preventDefault();

  // get values from the form
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

    console.log(data);

  // send data to server if we have valid input
  if (validEntries(firstname, lastname, email, phonenumber)) {
    fetch('createContact.php', {
      method: 'POST',
        // we want to senf our contact information as a JSON object
      body: JSON.stringify(data),
      // specifies request content type as JSON
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the contact list or take other necessary actions
          // WANT TO DISPLAY SOME SUCCESS MESSAGER added contact success
          // Close the modal
          hideAddModal();
          // update the list of contacts on the main page
          updateContacts();
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
function showAddModal() {
    editModal.style.display = 'block';

    // initially set the button to not be clickable
    // submitButton.setAttribute('disabled', true);

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
  if (event.target.classList.contains('edit-button')) {
      showAddModal();
  } else if (event.target.classList.contains('close')) {
      hideAddModal();
  }
})

// need to edit conditions to ensure that the correct modal displays and is separate from other modals
