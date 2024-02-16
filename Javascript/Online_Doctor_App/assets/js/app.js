$(document).ready(function () {
  $(".registration-container").hide();

  var app_users = JSON.parse(localStorage.getItem("app_users")) || [];
  var loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  $("#registerBtn").click(function () {
    document.title = "Register | Appointment Booking";
    $(".login-container").hide();
    $(".registration-container").show();
  });

  $("#loginBtn").click(function () {
    document.title = "Login | Appointment Booking";
    $(".registration-container").hide();
    $(".login-container").show();
  });

  // Login Page
  $("#id_loginForm").validate({
    rules: {
      txtLoginEmail: {
        required: true,
        email: true,
      },
      txtLoginPassword: {
        required: true,
      },
    },
    messages: {
      txtLoginEmail: {
        required: "Please enter your email",
        email: "Please enter a valid email",
      },
      txtLoginPassword: {
        required: "Password cannot be blank",
      },
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      var email = $("#id_login_email").val();
      var password = $("#id_login_password").val();
      var userData = app_users.find(function (user) {
        return user.email === email && user.password === password;
      });
      if (userData) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
        if (userData.userType === "Doctor") {
          window.location.href = "../dashboardDoctor.html";
        } else {
          window.location.href = "../dashboardPatient.html";
        }
      } else {
        alert("User not found or invalid email/password");
      }
      $("#id_loginForm")[0].reset();
    }
  });

  // Registration Page
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
      sltUserType: {
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
      },
      txtPassword: {
        required: "Password cannot be blank",
        minlength: "Password must be at least 4 characters long",
      },
      txtConfirmPass: {
        equalTo: "Entered Password not matched",
      },
      sltUserType: {
        required: "Please select a user type",
      },
      chkTerms: {
        required: "Please check the Terms and Conditions",
      }
    },
    submitHandler: function (form) {
      var email = $("#id_email").val();
      var existingUser = app_users.find(function (user) {
        return user.email === email;
      });
      if (existingUser) {
        alert("User with this email already exists");
      } else {
        var userData = {
          userID: Date.now(),
          name: $("#id_name").val(),
          email: email,
          password: $("#id_password").val(),
          userType: $("#id_usertype").val(),
        };
        app_users.push(userData);
        localStorage.setItem("app_users", JSON.stringify(app_users));
        alert("Registration successful");
        $(".registration-container").hide();
        $(".login-container").show();
      }
      $("#id_registrationForm")[0].reset();
    }
  });

  if (loggedInUser && loggedInUser.name) {
    $("#welcomeMessage").text(loggedInUser.name);
  } else {
    $("#welcomeMessage").text("Welcome");
  }

  $("#logoutBtn").click(function () {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});


