// Login Page
$(document).ready(function () {
    $("#id_loginForm").validate({
        rules: {
            txtEmail: {
                required: true,
            },
            txtPassword: {
                required: true,
            },
        },

        messages: {
            txtEmail: {
                required: "Please enter your email",
                eamil: "Please enter a valid email",
            },
            txtPassword: {
                required: "Password cannot be blank",
            },
        },

        submitHandler: function (form) {
            var email = $("#id_email").val();
            var password = $("#id_password").val();

            var adminData = admins.find(function (admin) {
                return admin.email === email && admin.password === password;
            });

            if (adminData) {
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password");
            }
            $("#id_loginForm")[0].reset();
        }
    });
});

var admins = JSON.parse(localStorage.getItem("admins")) || [];

if (admins.length > 0) {
    document.getElementById("id_registration").style.display = "none";
}





// Registration Page

$(document).ready(function () {
    $("#id_registrationForm").validate({
        rules: {
            txtName: {
                required: true,
            },
            txtEmail: {
                required: true,
                email: true,
            },
            txtPassword: {
                required: true,
                minlength: 4,
            },
            txtConfirmPass: {
                equalTo: '#id_password',
            },
            sltCity: {
                required: true,
            },
            sltState: {
                required: true,
            },
            chkTerms: {
                required: true,
            }
        },

        messages: {
            txtName: {
                required: "Please enter your name",
            },
            txtEmail: {
                required: "Please enter your email",
                email: "Please enter a valid email",
                remote: "Email is already in use",
            },
            txtPassword: {
                required: "Password cannot be blank",
                minlength: "Password must be at least 4 characters long",
            },
            txtConfirmPass: {
                equalTo: "Entered Password not matched",
            },
            sltCity: {
                required: "Please select city",
            },
            sltState: {
                required: "Please select state",
            },
            chkTerms: {
                required: "Please check the Terms and Conditions",
            }
        },

        submitHandler: function (form) {
            var adminData = {
                name: $("#id_name").val(),
                email: $("#id_email").val(),
                password: $("#id_password").val(),
                city: $("#id_city").val(),
                state: $("#id_state").val(),
            };

            var admins = JSON.parse(localStorage.getItem("admins")) || [];

            if (admins.length > 0) {
                alert("Admin already registered!");
                return;
            }

            admins.push(adminData);
            localStorage.setItem("admins", JSON.stringify(admins));

            $("#id_registrationForm")[0].reset();

            window.location.href = "login.html";
        }
    });
});
