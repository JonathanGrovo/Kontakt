<?php
include 'connection.php'; // ensures we are connected to database

// starts user session if it has not already been started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// check if the user is logged in
if (!isset($_SESSION['user'])) {
    // redirect user to homepage
    header('Location: index.html');
    exit();
}

$currUser = $_SESSION['user']; // user variable set to current user session

// gets the raw POST data
$data = file_get_contents('php://input');

// decode JSON data
$jsonData = json_decode($data, true); // true as second parameter returns an associative array

// we want to get the id associated with the contact
$contact_id = $jsonData['contact_id'];

// access the information of the contact the user wants to modify
$newFirstname = $jsonData['newFirstname'];
$newLastname = $jsonData['newLastname'];
$newEmail = $jsonData['newEmail'];
$newPhonenumber = $jsonData['newPhonenumber'];

// query that updates the contact information as long as it matches the current user and the contact's ID
$sql = "UPDATE contacts SET firstname='$newFirstname', lastname='$newLastname', email='$newEmail', phonenumber='$newPhonenumber' WHERE user='$currUser' AND contact_id='$contact_id'";

$conn->query($sql); // runs query

if ($conn->affected_rows > 0) { // if the query affected at least one row
    // Success flag just determines whether or not the query was successful
    echo json_encode(["success" => true]);
    exit();
} else { // in the case that the contact does not exist or the update query had no effect
    if ($conn->error) {
        // If there's a database error, include that error message in the response
        echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    } else {
        // Otherwise, the contact likely doesn't exist
        echo json_encode(["success" => false, "message" => "Contact not found or no changes were made"]);
    }
    exit();
}
