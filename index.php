<html lang="en">

<head>
    <!-- meta elements -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Contact Manager Group 20" />
    <!-- title that appears in tab -->
    <title>Contact Manager</title>
    <!-- icon that appears in tab -->
    <link rel="icon" type="image/x-icon" href="media/favicon.ico" />
    <!-- sheets used for styling the page -->
    <link rel="stylesheet" href="login.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i&display=swap" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" crossorigin="anonymous">
</head>

<body>
    <!-- canvas for particles -->
    <canvas id="backgroundCanvas"></canvas>
    <noscript>
        moving particles (?)
    </noscript>

    <div class="container">

        <div class="login-title fadeable"> <!-- fadeable class just allows it to be faded in by a script that targets said class -->
            <h2>Contact Manager</h2>
            <h2>Contact Manager</h2>
        </div>

        <!-- wraps the entire login box -->
        <div class="wrapper fadeable">
            <!-- form for returning users. prevent default form submission and run loginUser function instead -->
            <form onsubmit="event.preventDefault(); loginUser();">
                <h1 class="fadeable">Login</h1>
                <!-- where error messages are displayed -->
                <div class="error-message"></div>
                <!-- username field -->
                <div class="input-box fadeable" id="input-box-username">
                    <input type="text" id="usernameField" placeholder="Username" name="username" required>
                    <i class='bx bxs-user'></i>
                </div>
                <!-- password field -->
                <div class="input-box fadeable">
                    <input type="password" id="passwordField" placeholder="Password" name="password" required>
                    <i class='toggle-password fa-regular fa-eye'></i>
                </div>

                <button type="submit" class="btn fadeable">Login</button>

                <div class="register-link fadeable">
                    <p>Don't have an account? <a href="register.php">Register</a></p>
                </div>
            </form>
        </div>

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
    <!-- scripts related to login actions -->
    <script src="loginScripts.js"></script>
</body>

</html>