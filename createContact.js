// get form element
const contactForm = document.querySelector('form');

// add submit event listener
contactForm.addEventListener('submit', function (e) {
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