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

// the search value
$searchVal = $jsonData['searchVal'];

// get current page from JSON data
$page = isset($jsonData['currentPage']) ? $jsonData['currentPage'] : 1; // if page is not provided, default to page 1

// number of records we want to display per page
$recordsPerPage = 8;

// calculate the offset (determines what records to start at)
$offset = ($page - 1) * $recordsPerPage;

// users can search depending on firstname, lastname, email or phone number
// we conditionally include search criteria depending on if searchVal is a provided value
$sql = "SELECT * FROM contacts WHERE user='$currUser'";

// check to see if searchVal is not empty
if (!empty($searchVal)) {
    // add search criteria
    $sql .= " AND (firstname LIKE '%$searchVal%' 
    OR lastname LIKE '%$searchVal%' 
    OR email LIKE '%$searchVal%' 
    OR phonenumber LIKE '%$searchVal%')";
}

// applying our records limit and offset to the query
$sql .= " LIMIT $recordsPerPage OFFSET $offset";

// calculate the total count of records without pagination
$countSql = "SELECT COUNT(*) as total FROM contacts WHERE user='$currUser'";

// check to see if search is not empty
if (!empty($searchVal)) {
    // add search criteria
    $countSql .= " AND (firstname LIKE '%$searchVal%' 
    OR lastname LIKE '%$searchVal%' 
    OR email LIKE '%$searchVal%' 
    OR phonenumber LIKE '%$searchVal%')";
}

// gets the total number of contacts related to 
$totalCount = $conn->query($countSql)->fetch_assoc()['total'];

// send the total number of pages
$totalPages = ceil($totalCount / $recordsPerPage);

$results = $conn->query($sql); // runs the query and stores it in variable

// if there are contacts related to the page
if ($results->num_rows > 0) {
    $contacts = []; // array that will contain our contacts

    // fetch each contact related to search and add it to contacts array
    while ($row = $results->fetch_assoc()) {
        $contacts[] = $row;
    }

    // send the list of contacts related to the page as a JSON response
    echo json_encode(["success" => true, "contacts" => $contacts, "totalPages" => $totalPages]);
    exit();
} else { // in the case that there are no contacts related to the page
    echo json_encode(["success" => false, "message" => "No contacts found", "totalPages" => 0]);
    exit();
}
