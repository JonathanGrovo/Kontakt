<?php
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

$person = $_POST['username']; // this pulls in what the user put in for username, any variables that are posted can be found in $_POST['name']
$pass = $_POST['password']; // this is the users password

$sql = "SELECT * FROM users WHERE user='$person' AND password='$pass'"; // this is the code to be run in sql it asks for all entries into the table users where the user is the username entered and password is the password entered
$results = $conn->query($sql); // runs the query and stores results in variable

if ($results->num_rows == 1) { // checks the amount of rows returned and if it is one than we know their account exists
    $row = $results->fetch_assoc(); // this fetches the next row, but in our case the only row
    $_SESSION['user'] = $row['user']; // this sets the session user to their user
    header("Location: main.php"); // this code sends them to the main page
    exit(); // forces them out of this page so they go to main
} else {
    header("Location: index.php?error=invalid"); // this occurs when their account doesn't exist and sends them to the login page and causes an error message to appear
    exit();
}
