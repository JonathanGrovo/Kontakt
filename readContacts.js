// global variable that keeps track of the current page
let currentPage = 1;

// global variable keeping track of the total number of pages

// // function that fetches contacts for a specific page
// function fetchContactsForPage(searchVal, currentPage) {
//     // the php we want to communicate with
//     fetch('readContacts.php', {
//         // the http method we want to use
//         method: 'POST',
//         // current page included in the request
//         body: JSON.stringify({ searchVal, currentPage }),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     .then((response) => response.json()) // parse server response back into js object notation
//     .then((data) => {
//         if (data.success) { // if we successfully fetched contacts
//             // call function to display contacts in html
//             displayContacts(data.contacts);
//             // update pagination controls
//             console.log('KIST');
//             // console.log(updatePagination(data.totalPages));
//             return updatePagination(data.totalPages);

//             // helps us move pages in creation and deletion processes
//             // return data.totalPages;
//         } else {
//             console.error(data);

//             // we don't want to display contacts if our query failed
//             const contactList = document.getElementById('contactList');
//             contactList.innerHTML = '';
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

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

    // console.log('# of pages total:' + totalPages);
    // if (totalPages > currentPage) {
    //     currentPage = totalPages;
    // }
    console.log('totalpages: '+ totalPages);
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
    // currentPage = 1;
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
        // if (fetchContactsForPage(searchVal, currentPage) < currentPage) { // we have less total pages than our current page number
        //     currentPage -= 1;
        //     return;
        // }
        // if (currentPage != 1) {
        //     currentPage -= 1;
        // }
        // fetchContactsForPage(searchVal, currentPage)
        // .then((totalPages) => {
        //     // check if the current page is empty
        //     if (currentPage > 1 && data.contacts.length === 0) {
        //         currentPage -= 1;
        //     }
        // });
        // currentPage = 1; // set us back to the first page


        const wasCurrentPage = currentPage;
        currentPage = 1;
        const totalPages = await fetchContactsForPage(searchVal, currentPage);
        console.log('we now have this many pages: ' + totalPages);
        if (totalPages < wasCurrentPage) {
            currentPage = totalPages;
            console.log(currentPage, totalPages);
        } else {
            currentPage = wasCurrentPage;
            console.log(currentPage, totalPages);
        }

        fetchContactsForPage(searchVal, currentPage);
        return;
    } else if (operation === 'create') { // we want to update contacts due to a creation
        // fetch contacts and get the total number of pages
        // fetchContactsForPage(searchVal, currentPage)
        // .then((totalPages) => {
        //     // set currentPage to the last page if it exceeds totalPage
        //     if (currentPage > totalPages) {
        //         currentPage = totalPages;
        //     }
        // });
        // currentPage = 1; // set us back to the first page
        // totalP = fetchContactsForPage(searchVal, currentPage);
        // console.log(totalP);

        const totalPages = await fetchContactsForPage(searchVal, currentPage);
        setTimeout(function() {
            console.log('total pages' + totalPages);
        }, 1000);
        currentPage = totalPages;
        fetchContactsForPage(searchVal, currentPage);
        setTimeout(function() {
            console.log(currentPage + 'is the curr page after create');
        }, 1000);

        return;
        // if (fetchContactsForPage(searchVal, currentPage) > currentPage) { // we have more total pages than our current page number
        //     currentPage += 1;
        //     return;
        // } else {
        //     currentPage = 
        // }
        // return;
    } else { // in all other cases, the currentPage should not need our manual modification
        fetchContactsForPage(searchVal, currentPage);
        return;
    }
    // when its a search
    // when its a create
    // when its a delete

    // // get whatever is in the searchbar
    // const searchVal = searchInput.value.trim();
    // fetch contacts related to search criteria and current page
    // fetchContactsForPage(searchVal, currentPage);
}

// listen for when dom is loaded
document.addEventListener('DOMContentLoaded', function () {
    // inital fetch to display all contacts on the first page
    fetchContactsForPage('', currentPage);
})