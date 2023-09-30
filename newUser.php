<?php
// this page is specifically for backend registration logic
include 'connection.php'; // ensure that we can connect to the database before we continue

// starts user session if it has not already been started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// gets the raw POST data
$data = file_get_contents('php://input');

// decode JSON data
$jsonData = json_decode($data, true); // true as second parameter returns an associative array

// access the new username and password
$username = $jsonData['username'];

$pass = $jsonData['password'];

$sql = "SELECT * FROM users WHERE user='$username'"; // query that checks if there are users existing with same name

$results = $conn->query($sql); // runs the query and stores it in variable

if ($results->num_rows == 0) { // if we find no users by that name
    $sql = "INSERT INTO users VALUES ('$username','$pass')"; // query that inserts new user info into users table
    $conn->query($sql); // runs the query
    $_SESSION["user"] = $username; // session is set to this new user
    // success flag just determines whether or not the query was successful
    echo json_encode(["success" => true]);
    exit(); // exit statements are good practice, they just ensure no other code is executed
} else { // if there is at least 1 row, a user exists with the same username
    // error message included in json response
    echo json_encode(["success" => false, "message" => "Please choose a different username"]);
    exit();
}
