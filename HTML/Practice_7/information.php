<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission Result</title>
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>
    <?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $firstName = htmlspecialchars($_POST['firstName']);
        $lastName = htmlspecialchars($_POST['lastName']);
        $gender = htmlspecialchars($_POST['gender']);
        $email = htmlspecialchars($_POST['email']);
        $address = htmlspecialchars($_POST['address']);
        $city = htmlspecialchars($_POST['city']);
        $state = htmlspecialchars($_POST['state']);
        $zipCode = htmlspecialchars($_POST['zipCode']);
        $phone = htmlspecialchars($_POST['phone']);

        $month = isset($_POST['month']) ? $_POST['month'] : '';
        $day = isset($_POST['day']) ? $_POST['day'] : '';
        $year = isset($_POST['year']) ? $_POST['year'] : '';

        $dob = $day . '/' . $month . '/' . $year;

        echo '<table border="1">';
        echo '<tr><th colspan="2">Personal Information</th></tr>';
        echo '<tr><td>Full Name</td><td>' . $firstName . ' ' . $lastName . '</td></tr>';
        echo '<tr><td>Date of Birth</td><td>' . $dob . '</td></tr>';
        echo '<tr><td>Gender</td><td>' . $gender . '</td></tr>';
        echo '<tr><td>Email</td><td>' . $email . '</td></tr>';

        echo '<tr><th colspan="2">Contact Information</th></tr>';
        echo '<tr><td>Address</td><td>' . $address . '</td></tr>';
        echo '<tr><td>City</td><td>' . $city . '</td></tr>';
        echo '<tr><td>State</td><td>' . $state . '</td></tr>';
        echo '<tr><td>Zip Code</td><td>' . $zipCode . '</td></tr>';
        echo '<tr><td>Phone</td><td>' . $phone . '</td></tr>';

        echo '</table>';

    } else {
        echo 'Please submit the form.';
    }
    ?>
</body>

</html>
