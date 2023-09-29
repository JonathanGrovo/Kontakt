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

// the serach value is the only thing passed in
$searchVal = $jsonData['searchVal'];

// users can search depending on firstname, lastname, email or phone number
// we conditionally include search criteria depending on if searchVal is a provided value
$sql = "SELECT * FROM contacts WHERE user='$currUser'";

// check to see if searchVal is not empty
if (!empty($searchVal)) {
    // add search criteria
    $sql .= " AND (firstname LIKE '%$searchVal%' OR lastname LIKE '%$searchVal%' OR email LIKE '%$searchVal%' OR phonenumber LIKE '%$searchVal%')";
}

$results = $conn->query($sql); // runs the query and stores it in variable

// if there are contacts related to the search
if ($results->num_rows > 0) {
    $contacts = []; // array that will contain our contacts

    // fetch each contact related to search and add it to contacts array
    while ($row = $results->fetch_assoc()) {
        $contacts[] = $row;
    }

    // send the list of contacts as a JSON response
    echo json_encode(["success" => true, "contacts" => $contacts]);
    exit();
} else { // in the case that the user has no contacts
    echo json_encode(["success" => false, "message" => "No contacts found"]);
    exit();
}

// this code SHOULD return a list of contacts related to the user currently in session depending on their search criteria.
