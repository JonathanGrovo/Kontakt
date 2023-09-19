<html lang="en">

<head>
    <!-- meta elements -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Contact Manager Group 20" />
    <title>Contact Manager</title>
    <!-- <link rel="icon" type="image/x-icon" href="media/favicon.ico" /> -->
    <!-- <link rel="stylesheet" href="style.css" /> -->
    <link rel="stylesheet" href="login.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i&display=swap" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" crossorigin="anonymous">


</head>

<body>
    <canvas id="backgroundCanvas"></canvas>
    <!-- <div id="imageContainer">
        <img id="myImage" src="media/desert-background.jpg" alt="desert image">
    </div> -->
    <!-- <noscript>
        moving particles (?)
    </noscript> -->
    <!-- <canvas id="canvas1"></canvas> -->
    <!-- <form action="login.php" method="post">
        username: <input type="text" name="username"><br>
        password: <input type="text" name="password"><br>
        <input type="submit">
    </form> -->

    <!-- The Form below is for new users it works the exact same way existing users work it just sends them to newUser.php instead -->
    <!-- <form action="newUser.php" method="post">
        New username: <input type="text" name="NewUser"><br>
        New password: <input type="text" name="password"><br>
        <input type="submit">
    </form> -->

    <!-- wraps the entire login box -->
    <div class="wrapper fadeable">
        <!-- The Form below is for returning users, it uses the post method which means the data does not appear on the url the action sends the user to login.php -->
        <form action="login.php" method="post">
            <h1 class="fadeable">Login</h1>
            <div class="input-box fadeable">
                <input type="text" placeholder="Username" name="username" required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box fadeable">
                <input type="password" id="passwordField" placeholder="Password" name="password" required>
                <i class='toggle-password fa-regular fa-eye'></i>
            </div>
            <div class="remember-forgot fadeable">
                <label><input type="checkbox"> Remember me</label>
                <!-- <a href="#">Forgot password?</a> -->
            </div>

            <button type="submit" class="btn fadeable">Login</button>

            <div class="register-link fadeable">
                <p>Don't have an account? <a href="register.php">Register</a></p>
            </div>
        </form>
    </div>

    <?php
    if (isset($_GET["error"])) { // this line checks to see if the user enter an invalid user via the get method, which means that in the url you will see ?error=<something>
        echo 'invalid user';
    }
    if (isset($_GET["newuser"])) { // same as before just uses a different variable these 2 if statements can be combined into one
        echo 'username taken';
    }
    ?>
    <!-- script for background animation -->
    <script src="particles.js"></script>
    <!-- scripts related to other landing page interactions -->
    <script src="landingScripts.js"></script>
</body>

</html>