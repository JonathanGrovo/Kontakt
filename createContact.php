<?php
include 'connection.php'; // ensures we are connected to database

// starts user session if it has not already been started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// check if the user is logged in
if (!isset($_SESSION['user'])) {
    // redirect user to homepage
    header('Location: register.html');
    exit();
}

$currUser = $_SESSION['user']; // user variable set to current user session

// gets the raw POST data
$data = file_get_contents('php://input');

// decode JSON data
$jsonData = json_decode($data, true); // true as second parameter returns an associative array

// access the information of the contact the user wants to add
$firstname = $jsonData['firstname'];
$lastname = $jsonData['lastname'];
$email = $jsonData['email'];
$phonenumber = $jsonData['phonenumber'];

// query that checks if there are any contacts that match 1:1 with contacts being added
$sql = "SELECT * FROM contacts WHERE user='$currUser' AND firstname='$firstname' AND lastname='$lastname' AND email='$email' AND phonenumber='$phonenumber'";

// contacts are allowed to share firstnames, lastnames, emails, and phonenumbers, or a combination of them, but never all four.
// this is to ensure a user isn't accidentally inserting a duplicate contact. HANDLE THIS EDGE CASE LATER, MAY HANDLE RELATED EDGE CASES LATER

$results = $conn->query($sql); // runs the query and stores it in variable

if ($results->num_rows == 0) { // if we find no contacts that share exact credentials
    // query that inserts new contact into contact table
    $sql = "INSERT INTO contacts (user, firstname, lastname, email, phonenumber, datecreated) VALUES ('$currUser','$firstname', '$lastname', '$email', '$phonenumber', NOW())";
    $conn->query($sql); // runs the query
    // success flag just determines whether or not the query was successful
    echo json_encode(["success" => true]);
    exit();
} else { // if there is at least 1 row, a contact exists with the exact same information
    // error message included in json response
    echo json_encode(["success" => false, "message" => "This person is already a contact"]);
    exit();
}

// this code SHOULD create a contact given a user has provided something for the given fields
