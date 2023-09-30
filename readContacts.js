// listen for when dom is loaded
document.addEventListener('DOMContentLoaded', function () {
    // function that fetches contacts and displays them
    function fetchContacts(searchVal) {
        fetch('readContacts.php', {
            method: 'POST',
            body: JSON.stringify({ searchVal }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // call function to display contacts in html
                displayContacts(data.contacts);
            } else {
                console.error(data);

                // displays as empty
                const contactList = document.getElementById('contactList');
                contactList.innerHTML = '';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // function to display contacts in the html
    function displayContacts(contacts) {
        const contactList = document.getElementById('contactList');

        // clear existing content in the contactList element
        contactList.innerHTML = '';

        // interate through contacts and create html elements to display them
        contacts.forEach((contact) => {
            const contactElement = document.createElement('div');
            contactElement.innerHTML =
            `<p>name: ${contact.firstname} ${contact.lastname}</p>
            <p>email and phone: ${contact.email} ${contact.phonenumber}</p>
            <p>contact id: ${contact.contact_id}</p>
            <button onclick="updateContact('${contact.contact_id}')">Update</button>
            <button class="edit-button">Edit</button>
            <button onclick="deleteContact('${contact.contact_id}')">Delete</button>`

            // append contactElement to contactList
            contactList.appendChild(contactElement);
        });
    }

    // get search input element
    const searchInput = document.getElementById('searchInput');

    
    // input event listener, triggers on input change in field
    searchInput.addEventListener('input', function () {

        const searchVal = searchInput.value.trim();
        fetchContacts(searchVal);
    });

    // initial fetch to display all contacts when page loads
    fetchContacts('');
})