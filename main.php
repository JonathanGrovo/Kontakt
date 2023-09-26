<?php
// function for adding an entry into the table
function addentry($firstname, $lastname, $email, $phonenumber)
{
    $server = 'localhost';
    $user = 'testuser';
    $password = 'testpassword';
    $dbname = 'mytest';
    $person = $_SESSION['user']; // this pulls in the user session (the person signed in)

    $conn = new mysqli($server, $user, $password, $dbname);
    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    } // see login.php for information about the above lines

    // prob want to have some kind of response for when this user has already entered a contact with the same exact credentials

    $sql = "INSERT INTO contacts VALUES ('$person', '$firstname', '$lastname', '$email', '$phonenumber') "; // mysql code which will add the entry
    $conn->query($sql); // run the mysql code
    $conn->close();
}

session_start();
// this should only execute when all fields have been entered

// if the request method being used is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // check to ensure all fields are not empoty before adding entry
    if (empty($_POST["FirstName"]) || empty($_POST["LastName"]) || empty($_POST["email"]) || empty($_POST["phonenumber"])) {
        echo "Please fill in all fields";
    } else { // in the case that all the fields have values
        addentry(($_POST["FirstName"]), ($_POST["LastName"]), ($_POST["email"]), ($_POST["phonenumber"]));
    }
}
?>
<html>

<body>
    <!-- The hyperlink just runs logout.php -->
    <a href="logout.php">logout</a>
    <!-- This following form is for adding a new entry, because the action is empty it calls this page -->
    <form id="contactForm" action="" method="post">
        FirstName: <input type="text" name="FirstName"><br>
        LastName: <input type="text" name="LastName"><br>
        email: <input type="text" name="email"><br>
        phone number: <input type="text" name="phonenumber"><br>
        <input type="submit" value="Submit">
    </form>

    <!-- The form below is the search bar form it uses the get method which means its variables are in $_GET -->
    <form method="get">
        <input type="text" name="search"><button type="submit">Search</button>
    </form>
    <br>
    <?php
    $severname = "localhost";
    $username = "testuser";
    $password = "testpassword";
    $dbname = "mytest";
    $person = $_SESSION['user'];

    $conn = new mysqli($severname, $username, $password, $dbname);

    if (mysqli_connect_error()) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    //See login.php for the above code
    if (isset($_GET["search"]) and $_GET["search"] != "") { //checks to see if the search bar was used
        $search = $_GET["search"]; //pulls what the user searched
        $sql = "SELECT * FROM contacts WHERE user='$person' AND firstname LIKE '%$search%' OR lastname LIKE '%$search%' OR email LIKE '%$search%' OR phonenumber LIKE '%$search%'"; //This is the sql code for searching the table the '%' before and after the variables means there can be characters before and after the term
    } else {
        $sql = "SELECT * FROM contacts WHERE user='$person'"; //This pulls all of the values from table that have the same user as out user
    }

    $result = $conn->query($sql); //runs the search

    if ($result->num_rows > 0) { //checks if we got an empty search
        while ($row = $result->fetch_assoc()) { //goes through all of the rows and echos out the following, This can be changed to be php inbetween html instead of html inbetween php
            echo "First Name: " . $row["firstname"] . "<br>Last Name: " . $row["lastname"] . "<br>email: " . $row["email"] . "<br>phone number: " . $row["phonenumber"] . "<br>";
        }
    } else {
        echo "0 results"; //says 0 results if nothing appears
    }
    $conn->close();
    ?>

    <script src="script.js"></script>
</body>

</html>