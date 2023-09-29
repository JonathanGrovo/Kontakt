// // gets the form for submitting contact information by id and listens for its submit event
// document.getElementById("contactForm").addEventListener("submit", function(event) {
//     // gets the value in each field and assigns it to a variable
//     var firstName = document.forms["contactForm"]["FirstName"].value;
//     var lastName = document.forms["contactForm"]["LastName"].value;
//     var email = document.forms["contactForm"]["email"].value;
//     var phoneNumber = document.forms["contactForm"]["phonenumber"].value;

//     // if any of the fields are empty
//     if (firstName === "" || lastName === "" || email === "" || phoneNumber === "") {
//         alert("Please fill in all fields.");
//         event.preventDefault(); // Prevent form submission
//     }
// });