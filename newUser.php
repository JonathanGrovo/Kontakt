<?php
// create user session
session_start();
$server = 'localhost';
$user = 'testuser';
$password = 'testpassword';
$dbname = 'mytest';

$conn = new mysqli($server, $user, $password, $dbname);

// if database connection fails
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// gets the raw POST data
$data = file_get_contents('php://input');

// decode JSON data
$jsonData = json_decode($data, true); // true as second parameter returns an associative array

// access the new username and password
$newUser = $jsonData['NewUser'];
$pass = $jsonData['password'];

$sql = "SELECT * FROM users WHERE user='$newUser'"; // query that checks if there are users existing with same name

$results = $conn->query($sql); // runs the query and stores it in variable

if ($results->num_rows == 0) { // if we find no users by that name
    $sql = "INSERT INTO users VALUES ('$newUser','$pass')"; // query that inserts new user info into users table
    $conn->query($sql); // runs the query
    $_SESSION["user"] = $newUser; // session is set to this new user
    // success flag just determines whether or not the query was successful
    echo json_encode(["success" => true]);
    // exit();
} else { // if there is at least 1 row, a user exists with the same username
    // error message included in json response
    echo json_encode(["success" => false, "message" => "Please choose a different username"]);
    // exit();
}
