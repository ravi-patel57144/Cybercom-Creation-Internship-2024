// Doctor Dashboard
$(document).ready(function () {
    var app_users = JSON.parse(localStorage.getItem("app_users")) || {};
    var loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    var appointments = JSON.parse(localStorage.getItem("appointments")) || {};

    function renderAppointments() {
        var upcomingAppointmentsList = $("#upcomingAppointmentsList");
        upcomingAppointmentsList.empty();

        var doctorAppointments = [];
        
        if (loggedInUser && loggedInUser.userType === "doctor") {
            for (var patientID in appointments) {
                appointments[patientID].forEach(function (appointment) {
                    if (appointment.doctorID === loggedInUser.userID) {
                        var patient = app_users[patientID];
                        if (patient) {
                            appointment.patientName = patient.name;
                            doctorAppointments.push(appointment);
                        }
                    }
                });
            }
        }

        if (doctorAppointments.length === 0) {
            upcomingAppointmentsList.append('<li>No Upcoming Appointments</li>');
        } else {
            doctorAppointments.forEach(function (appointment) {
                var listItem = "<li>Appointment with " + appointment.patientName + " - " + appointment.time + ", " + appointment.date + "</li>";
                upcomingAppointmentsList.append(listItem);
            });
        }
    }

    renderAppointments();
});
