// global variable that keeps track of the current page
let currentPage = 1;

// function that fetches contacts for a specific page
function fetchContactsForPage(searchVal, currentPage) {
    fetch('readContacts.php', {
        method: 'POST',
        // current page included in the request
        body: JSON.stringify({ searchVal, currentPage }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // call function to display contacts in html
            displayContacts(data.contacts);
            // update pagination controls
            updatePagination(data.totalPages);
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

// function for updating pagination controls
function updatePagination(totalPages) {
    // get element that contains the controls
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '' // clear existing controls

    for (let page = 1; page <= totalPages; page++) {
        const pageLink = document.createElement('span');
        pageLink.textContent = page;
        pageLink.classList.add('page-link');

        // highlight the current page
        if (page === currentPage) {
            pageLink.classList.add('current-page');
        }

        // add click event listeneder to fetch contacts for the clicked page
        pageLink.addEventListener('click', () => {
            currentPage = page;
            const searchVal = searchInput.value.trim();
            fetchContactsForPage(searchVal, currentPage);
        });

        paginationControls.appendChild(pageLink);
    }
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
        `<span class="tableName">${contact.firstname} ${contact.lastname}</span>
        <span class="tableEmail">${contact.email}</span>
        <span class="tablePhone">${contact.phonenumber}</span>
        <button onclick="getCredentials('${contact.firstname}', 
        '${contact.lastname}', '${contact.email}', 
        '${contact.phonenumber}', '${contact.contact_id}');" 
        class="edit-button";><i class="fa-solid fa-pen-to-square"></i>Edit</button>
        <button onclick="getId('${contact.contact_id}');" 
        class='delete-contact';><i class="fa-solid fa-trash"></i>Delete</button>`

        // append contactElement to contactList
        contactList.appendChild(contactElement);
    });
}

// get search input element
const searchInput = document.getElementById('searchInput');

// input event listener, triggers on input change in field
searchInput.addEventListener('input', function () {
    // call the function that helps update the contacts
    updateContacts();
});

// // listen for when dom is loaded
// document.addEventListener('DOMContentLoaded', function () {
//     // initial fetch to display all contacts when page loads
//     fetchContacts('');
// })

// update list of contacts on contact creation, update and delete operations
function updateContacts() {
    const searchVal = searchInput.value.trim();
    fetchContactsForPage(searchVal, currentPage);
}

// listen for when dom is loaded
document.addEventListener('DOMContentLoaded', function () {
    // inital fetch to display all contacts on the first page
    fetchContactsForPage('', currentPage);
})