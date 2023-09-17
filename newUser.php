<?php
session_start();
$server = 'localhost';
$user = 'testuser';
$password = 'testpassword';
$dbname = 'mytest';

$conn = new mysqli($server, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
//see login.php for the above code
$newUser = $_POST["NewUser"]; //pulls in the new user
$pass = $_POST["password"]; //pulls in the new password
$sql = "SELECT * FROM users WHERE user='$newUser'"; //This is the code to check if the user exists
$results = $conn->query($sql); //runs the query
if ($results->num_rows == 0) { //if we find no users by that name
    $sql = "INSERT INTO users VALUES ('$newUser','$pass')"; //This inserts into the user table our new user
    $conn->query($sql); //runs it in mysql
    $_SESSION["user"] = $newUser; //sets our session to the user
    header("Location: main.php"); //sends the user to our main page
    exit();
} else {
    header("Location: index.php?newuser=failed"); //if the username is taken then we send them back to the login page(index.php) with an error sign
    exit();
}
