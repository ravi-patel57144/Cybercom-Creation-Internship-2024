<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $dob = $_POST['dob'];
    $gender = htmlspecialchars($_POST['gender']);
    $email = htmlspecialchars($_POST['email']);
    $address = htmlspecialchars($_POST['address']);
    $city = htmlspecialchars($_POST['city']);
    $state = htmlspecialchars($_POST['state']);
    $zipCode = htmlspecialchars($_POST['zipCode']);
    $phone = htmlspecialchars($_POST['phone']);
    

    echo '<table border="1">';
    echo '<tr><th>Field</th><th>Value</th></tr>';
    echo '<tr><td>First Name</td><td>' . $firstName . '</td></tr>';
    echo '<tr><td>Last Name</td><td>' . $lastName . '</td></tr>';
    echo '<tr><td>Date of Birth</td><td>' . $dob . '</td></tr>';
    echo '<tr><td>Gender</td><td>' . $gender . '</td></tr>';
    echo '<tr><td>Email</td><td>' . $email . '</td></tr>';
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
