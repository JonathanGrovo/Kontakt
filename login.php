<?php
// this page is specifically for handling backend login logic
include 'connection.php'; // ensures we are able to connect to the database before continuing

// starts user session if it has not already been started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// gets the raw POST data
$data = file_get_contents('php://input');

// decode JSON data
$jsonData = json_decode($data, true); // true as second parameter returns an associative array

// access the username and password
$person = $jsonData['username'];
$pass = $jsonData['password'];

$sql = "SELECT * FROM users WHERE user='$person' AND password='$pass'"; // this is the code to be run in sql it asks for all entries into the table users where the user is the username entered and password is the password entered

$results = $conn->query($sql); // runs the query and stores results in variable

if ($results->num_rows == 1) { // checks the amount of rows returned and if it is one than we know their account exists
    $row = $results->fetch_assoc(); // this fetches the next row, but in our case the only row
    $_SESSION['user'] = $row['user']; // this sets the session user to their user
    // success flag just determines whether or not the query was successful
    echo json_encode(["success" => true]);
    exit();
} else {
    // error message included in json response
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    exit();
}
