<?php
session_start(); //creates a user session
$server = 'localhost'; // service name from docker compose file
$user = 'testuser'; // default mysql root user in docker
$password = 'testpassword'; // database password
$dbname = 'mytest'; // name of database

$conn = new mysqli($server, $user, $password, $dbname); //This creates a connection to the database

if ($conn->connect_error) { //This checks to see if we successfully connected
    die("Database connection failed: " . $conn->connect_error);
}

$person = $_POST['username']; //This pulls in what the user put in for username, any variables that are posted can be found in $_POST['name']
$pass = $_POST['password']; //This is the users password

$sql = "SELECT * FROM users WHERE user='$person' AND password='$pass'"; // This is the code to be run in sql it asks for all entries into the table users where the user is the username entered and password is the password entered

//Please note that this code is vunlearable to SQL injection
$results = $conn->query($sql); //This runs the sql code and returns the results to results

if ($results->num_rows == 1) { //checks the amount of rows returned and if it is one than we know their account exists
    $row = $results->fetch_assoc(); //This fetches the next row, but in our case the only row
    $_SESSION['user'] = $row['user']; //This sets the session user to their user
    header("Location: main.php"); //This code sends them to the main page
    exit(); //forces them out of this page so they go to main
} else {
    header("Location: index.php?error=invalid"); // This occurs when their accountdoesn't exist and sends them to the login page and causes an error message to appear
    exit();
}
