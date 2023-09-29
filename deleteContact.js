// function for deleting contact
function deleteContact(contact_id) {
    // AJAX request to php script to delete contact with specified ID
    fetch('deleteContact.php', {
        method: 'POST',
        body: JSON.stringify({ contact_id }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            window.alert('successful delete');
        } else {
            console.log('data pack received:' + data);
            console.log('contactid sent: ' + contact_id);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}