// Patient Dashboard
$(document).ready(function () {
    var app_users = JSON.parse(localStorage.getItem("app_users")) || {};
    var loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    var appointments = JSON.parse(localStorage.getItem("appointments")) || {};
  
    function doctorsDropdown() {
        var doctors = app_users.filter(function (user) {
            return user.userType === "Doctor";
        });
        $("#doctor").empty();
        $("#doctor").append('<option disabled selected>Select Doctor</option>');
        doctors.forEach(function (doctor) {
            $("#doctor").append('<option value="' + doctor.userID + '">' + doctor.name + '</option>');
        });
    }
    doctorsDropdown();
  
    // Book appointment
    $("#appointmentForm").validate({
      rules: {
        doctor: {
          required: true
        },
        date: {
          required: true
        },
        time: {
          required: true
        }
      },
      messages: {
        doctor: {
          required: "Please select a doctor"
        },
        date: {
          required: "Please select a date"
        },
        time: {
          required: "Please select a time"
        }
      },
      submitHandler: function(form) {
        var doctorID = parseInt($("#doctor").val());
        var date = $("#date").val();
        var time = $("#time").val();
    
        var doctor = app_users.find(function(user) {
          return user.userID === doctorID;
        });
    
        if (doctor) {
          var appointment = {
            doctorID: doctorID,
            doctorName: doctor.name,
            date: date,
            time: time,
            is_accepted: false,
            is_declined: false
          };
    
          if (!appointments[loggedInUser.userID]) {
            appointments[loggedInUser.userID] = [];
          }
          appointments[loggedInUser.userID].push(appointment);
          localStorage.setItem("appointments", JSON.stringify(appointments));
    
          $(form)[0].reset();
          renderAppointments();
        } else {
          alert("Selected doctor not found.");
        }
      }
    });
    
  
  function renderAppointments() {
    var appointmentsList = $("#appointmentsList");
    appointmentsList.empty();
  
    var appointmentsData = appointments[loggedInUser.userID] || [];
  
    if (appointmentsData.length === 0) {
        appointmentsList.append('<li>No Upcoming Appointments</li>');
    } else {
        var tableHTML = '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Sr. No</th><th>Appointment Date</th><th>Time</th><th>Appointment with</th><th>Status</th></tr></thead><tbody>';
  
        appointmentsData.forEach(function (appointment, index) {
            var statusColor = "";
            var statusText = "Awaiting";
            if (appointment.is_accepted && !appointment.is_declined) {
                statusColor = "#27ae60";
                statusText = "Accepted";
            } else if (!appointment.is_accepted && appointment.is_declined) {
                statusColor = "#e74c3c";
                statusText = "Rejected";
            } else {
                statusColor = "#f39c12";
            }
  
            tableHTML += '<tr style="color: ' + statusColor + '">';
            tableHTML += '<td>' + (index + 1) + '</td>';
            tableHTML += '<td>' + appointment.date + '</td>';
            tableHTML += '<td>' + appointment.time + '</td>';
            tableHTML += '<td>' + appointment.doctorName + '</td>';
            tableHTML += '<td>' + statusText + '</td>';
            tableHTML += '</tr>';
        });
  
        tableHTML += '</tbody></table></div>';
        appointmentsList.append(tableHTML);
    }
  }
  renderAppointments();
  });