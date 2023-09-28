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
