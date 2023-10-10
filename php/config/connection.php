<?php 
$server = 'localhost'; // since testing locally
$account = 'testuser'; // some user that should have privilages 
$password = 'testpassword'; //password for above user
$database = 'mytest'; // name of the database

$conn = new mysqli($server,$account,$password,$database); // create a connection to the database

if($conn->connect_error){ // checks for successful connection to database
    die("Connection to database failed: ".$conn->connect_error);
}
