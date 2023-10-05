// global variable that keeps track of the current page
let currentPage = 1;

// function that fetches contacts for a specific page
async function fetchContactsForPage(searchVal, currentPage) {
    try {
        const response = await fetch('readContacts.php', {
            method: 'POST',
            body: JSON.stringify({ searchVal, currentPage }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (data.success) {
            displayContacts(data.contacts);
            const totalPages = updatePagination(data.totalPages);
            return totalPages;
        } else {
            console.error(data);
            const contactList = document.getElementById('contactList');
            contactList.innerHTML = '';
            return 0;
        }
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
}

// function for updating pagination controls
function updatePagination(totalPages) {
    // get element that contains the controls
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '' // clear existing controls

    // for the total number of pages that exist for some set of contacts
    for (let page = 1; page <= totalPages; page++) {
        const pageLink = document.createElement('span'); // create a span for a pageLink
        pageLink.textContent = page; // adds the number of the page to the element
        pageLink.classList.add('page-link'); // adds page-link class to the element

        // highlight the current page we are on
        if (page === currentPage) {
            pageLink.classList.add('current-page');
        }

        // add click event listener to fetch contacts for the clicked page
        pageLink.addEventListener('click', () => {
            currentPage = page; // current page becomes whatever page got clicked on
            updateContacts('pageLink');
        });

        // add this pageLink span as an element in the pagination controls
        paginationControls.appendChild(pageLink);
    }
    return totalPages;
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
    updateContacts('search');
});

// update list of contacts on contact creation, update and delete operations
async function updateContacts(operation) {

    // get whatever is in the searchbar
    const searchVal = searchInput.value.trim();

    console.log(operation);

    // we want to update contacts due to a search
    if (operation === 'search') {
        currentPage = 1; // set us back to the first page
        fetchContactsForPage(searchVal, currentPage);
        return;
    } else if (operation === 'delete') { // we want to update contacts due to a deletion

        // bit of a lazy approach since i didn't want to deal with more backend than i have to.
        // essentially runs the query twice to avoid loading an empty page
        const wasCurrentPage = currentPage;
        currentPage = 1; // avoids loading empty page

        // want to wait for this process since its return is important here
        const totalPages = await fetchContactsForPage(searchVal, currentPage);
        if (totalPages < wasCurrentPage) {
            currentPage = totalPages;
        } else {
            currentPage = wasCurrentPage;
        }

        fetchContactsForPage(searchVal, currentPage);
        return;
    } else if (operation === 'create') { // we want to update contacts due to a creation

        // same approach as above, except we always skip to the last page available
        const totalPages = await fetchContactsForPage(searchVal, currentPage);
        currentPage = totalPages;
        fetchContactsForPage(searchVal, currentPage);
        return;
    } else { // in all other cases, the currentPage should not need our manual modification
        fetchContactsForPage(searchVal, currentPage);
        return;
    }
}

// listen for when dom is loaded
document.addEventListener('DOMContentLoaded', function () {
    // inital fetch to display all contacts on the first page
    fetchContactsForPage('', currentPage);
})