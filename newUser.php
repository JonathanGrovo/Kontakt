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

$newUser = $_POST["NewUser"]; // pulls in the new user
$pass = $_POST["password"]; // pulls in the new password

$sql = "SELECT * FROM users WHERE user='$newUser'"; // query that checks if there are users existing with same name
$results = $conn->query($sql); // runs the query and stores it in variable

if ($results->num_rows == 0) { // if we find no users by that name
    $sql = "INSERT INTO users VALUES ('$newUser','$pass')"; // query that inserts new user info into users table
    $conn->query($sql); // runs the query
    $_SESSION["user"] = $newUser; // session is set to this new user
    header("Location: main.php"); // user sent to main page where CRUD operations can be performed
    exit();
} else { // if there is at least 1 row, a user exists with the same username
    header("Location: index.php?newuser=failed"); // sent back to login page with error sign
    exit();
}
