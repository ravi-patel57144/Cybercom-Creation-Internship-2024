<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSS -->
<link rel="stylesheet" href="style.css">
<title>HTML Practice 7</title>
<script>
function validateForm() {
    var firstName = document.forms["registrationForm"]["firstName"].value;
    var lastName = document.forms["registrationForm"]["lastName"].value;
    var email = document.forms["registrationForm"]["email"].value;
    var emailConfirm = document.forms["registrationForm"]["emailConfirm"].value;
    var password = document.forms["registrationForm"]["password"].value;
    var passwordConfirm = document.forms["registrationForm"]["passwordConfirm"].value;
    var phone = document.forms["registrationForm"]["phone"].value;

    if (firstName === "" || lastName === "" || email === "" || password === "" || phone === "") {
        alert("Please fill out all required fields.");
        return false;
    }
    
    if (email !== emailConfirm) {
        alert("Emails do not match.");
        return false;
    }
    
    if (password !== passwordConfirm) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}
</script>
</head>
<body>
    <div class="container">
    <form name="registrationForm" action="information.php" onsubmit="return validateForm()" method="post">
        <h2>Personal Information</h2>

        <div class="form-row">
            <label for="firstName">First name:</label>
            <input type="text" id="fname" name="firstName" required>
        </div>

        <div class="form-row">
            <label for="lastName">Last name:</label>
            <input type="text" id="lname" name="lastName" required>
        </div>

        <div class="for-row">
            <label for="dob">Date of Birth:</label>
            <select name="month" id="month">
                <option value="">Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            
            <select name="day" id="day">
                <option value="">Day</option>
                <?php
                for ($day = 1; $day <= 31; $day++) {
                    echo "<option value=\"$day\">$day</option>";
                }
                ?>
            </select>
            
            <select name="year" id="year">
                <option value="">Year</option>
                <?php
                for ($year = 1990; $year <= 2024; $year++) {
                    echo "<option value=\"$year\">$year</option>";
                }
                ?>
            </select>
        </div>

        <div class="for-row">
            <label for="gender">Gender:</label>
            <select name="gender" required>
                <option value="">Choose a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>


        <h2>Account Information</h2>

        <div class="for-row">
            <label for="email">Email:</label>
            <input type="email" name="email" required>
        </div>

        <div class="for-row">
            <label for="emailConfirm">Re-type Email:</label>
            <input type="email" name="emailConfirm" required>
        </div>

        <div class="form-row">
            <label for="password">Password:</label>
            <input type="password" name="password" required minlength="8" pattern=".*\d.*" title="Minimum 8 characters, at least 1 number">
        </div>

        <div class="for-row">
            <label for="passwordConfirm">Re-type Password:</label>
            <input type="password" name="passwordConfirm" required>
        </div>

        <div class="for-row">
            <label for="securityQuestion">Security Question:</label>
            <select name="securityQuestion" required>
                <option value="">Choose a security question</option>
                <option value="First pet name">What is your First pet name?</option>
                <option value="FIrst Vehicle">WHat was your First vehicle?</option>
            </select>
        </div>

        <div class="for-row">
            <label for="securityAnswer">Security Answer:</label>
            <input type="text" name="securityAnswer" required>
        </div>


        <h2>Contact Information</h2>

        <div class="for-row">
            <label for="address">Address:</label>
            <input type="text" name="address">
        </div>

        <div class="for-row">
            <label for="city">City:</label>
            <input type="text" name="city">
        </div>

        <div class="for-row">
            <label for="state">State:</label>
            <select name="state">
                <option value="">Choose a state</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
            </select>
        </div>

        <div class="form-row">
            <label for="zipCode">Zip Code:</label>
            <input type="text" name="zipCode" placeholder="Optional">
        </div>

        <div class="form-row">
            <label for="phone">Phone:</label>
            <input type="tel" name="phone" pattern="[\d]{10}" title="No spaces or dashes" required>
            <select name="ptype" id="ptype">
                <option value="mobile">Mobile</option>
                <option value="telephone">Telephone</option>
            </select>
        </div>

        <div class="button-container">
            <button type="submit" value="Submit" onclick="validateForm()">Submit</button>
            <button type="reset" value="Reset">Reset</button>
    </div>
    </form>
</div>
</body>
</html>
