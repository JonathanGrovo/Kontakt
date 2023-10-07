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

// go back and look at this eventually

function updatePagination(totalPages) {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = ''; // Clear existing controls

    const numDisplayedPages = 5; // Number of pages to display

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(numDisplayedPages / 2));
    let endPage = Math.min(totalPages, startPage + numDisplayedPages - 1);

    // Adjust startPage if endPage is at the end of the range
    if (endPage === totalPages) {
        startPage = Math.max(1, endPage - numDisplayedPages + 1);
    }

    // Create "Previous" button
    const prevButton = document.createElement('span');
    prevButton.innerHTML = '<i class="fa-solid fa-angles-left"></i>'
    prevButton.classList.add('page-link');
    if (currentPage === 1) {
        prevButton.classList.add('disabled'); // Gray out the button
        prevButton.style.pointerEvents = 'none'; // Disable click event
    } else {
        prevButton.addEventListener('click', () => {
            currentPage--;
            updatePagination();
            updateContacts(); // Update the contacts for the new page
        });
    }
    paginationControls.appendChild(prevButton);

    // Create page links within the range
    for (let page = startPage; page <= endPage; page++) {
        const pageLink = document.createElement('span');
        pageLink.textContent = page;
        pageLink.classList.add('page-link');
        if (page === currentPage) {
            pageLink.classList.add('current-page');
        }
        pageLink.addEventListener('click', () => {
            currentPage = page;
            updatePagination();
            updateContacts(); // Update the contacts for the new page
        });
        paginationControls.appendChild(pageLink);
    }

    // Create "Next" button
    const nextButton = document.createElement('span');
    nextButton.innerHTML = '<i class="fa-solid fa-angles-right"></i>'
    nextButton.classList.add('page-link');
    if (currentPage === totalPages) {
        nextButton.classList.add('disabled'); // Gray out the button
        nextButton.style.pointerEvents = 'none'; // Disable click event
    } else {
        nextButton.addEventListener('click', () => {
            currentPage++;
            updatePagination();
            updateContacts(); // Update the contacts for the new page
        });
    }
    paginationControls.appendChild(nextButton);

    return totalPages;
}


// function to display contacts in the html
function displayContacts(contacts) {

    // get reference to table body
    const tableBody = document.querySelector('#contactTable tbody');

    tableBody.innerHTML = '';

    // iterate through contacts and create table rows
    contacts.forEach((contact) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td>${contact.firstname} ${contact.lastname}</td>
        <td>${contact.email}</td>
        <td>${contact.phonenumber}</td>
        <td>${contact.datecreated}</td>
        <td>
          <button class="edit-button edit-button-styling"; 
          onclick="getCredentials('${contact.firstname}', '${contact.lastname}', 
          '${contact.email}', '${contact.phonenumber}', '${contact.contact_id}');">
            <i class="fa-solid fa-pen-to-square edit-button"></i>
          </button>
        </td>
        <td>
          <button class="delete-contact delete-contact-styling"; 
          onclick="getId('${contact.contact_id}');"><i class="fa-solid fa-trash delete-contact"></i></button>
        </td>
      `;

        // append the table row to the table body
        tableBody.appendChild(tableRow);
    })
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