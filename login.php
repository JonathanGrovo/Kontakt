<?php
// this page is specifically for handling backend login logic
// create user session
session_start();
$server = 'localhost'; // since testing locally
$user = 'testuser'; // username for user w privelages in my db
$password = 'testpassword'; // password for above user
$dbname = 'mytest'; // name of database

$conn = new mysqli($server, $user, $password, $dbname); // creates a connection to the database

if ($conn->connect_error) { // checks for successful connection
    die("Database connection failed: " . $conn->connect_error);
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
} else {
    // error message included in json response
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
}
