<?php
session_start(); //Theses lines are just for destroying the user seesion and sending them back to the login page
session_unset();
session_destroy();
header("Location: index.php");
exit();
