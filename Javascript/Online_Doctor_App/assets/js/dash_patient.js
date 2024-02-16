// Patient Dashboard
$(document).ready(function () {
  var app_users = JSON.parse(localStorage.getItem("app_users")) || {};
  var loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  var appointments = JSON.parse(localStorage.getItem("appointments")) || {};
  var doctorAvailability = JSON.parse(localStorage.getItem("doctorAvailability")) || {};

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
      slot: {
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
      slot: {
        required: "Please select slot"
      }
    },
    submitHandler: function (form) {
      var selectedDoctorID = parseInt($("#doctor").val());
      var selectedDate = $("#date").val();
      var selectedSlot = $("#slot").val();

      var doctor = app_users.find(function (user) {
        return user.userID === selectedDoctorID && user.userType === "Doctor";
      });

      if (doctor) {
        var appointment = {
          appointmentId: new Date(),
          patientID: loggedInUser.name,
          doctorID: selectedDoctorID,
          doctorName: doctor.name,
          date: selectedDate,
          slot: selectedSlot,
          is_accepted: false,
          is_declined: false
        };

        var availabilityDataKey = `doctorAvailability_${selectedDoctorID}`;
        var doctorAvailability = JSON.parse(localStorage.getItem(availabilityDataKey)) || {};
        var availableSlots = doctorAvailability[selectedDate];

        if (availableSlots) {
          var slotIndex = availableSlots.findIndex(slot => slot.start === selectedSlot);
          if (slotIndex !== -1 && !availableSlots[slotIndex].is_reserved) {
            availableSlots[slotIndex].is_reserved = true;
            availableSlots[slotIndex].reserved_by = loggedInUser.name;
          } else {
            alert("Selected slot is not available.");
            return;
          }
        } else {
          alert("No available slots for the selected date.");
          return;
        }

        localStorage.setItem(availabilityDataKey, JSON.stringify(doctorAvailability));

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

  // Render available slots
  function renderTimeSlots() {
    var selectedDoctorID = parseInt($("#doctor").val());
    var selectedDate = $("#date").val();
    console.log("Selected Doctor ID:", selectedDoctorID);
    console.log("Selected Date:", selectedDate);

    var availabilityDataKey = `doctorAvailability_${selectedDoctorID}`;
    var doctorAvailability = JSON.parse(localStorage.getItem(availabilityDataKey)) || {};
    var availableSlots = [];

    if (doctorAvailability[selectedDate]) {
      availableSlots = doctorAvailability[selectedDate].filter(slot => !slot.is_reserved);
    } else {
      console.log("No available slots.");
    }

    $("#slot").empty();
    $("#slot").append('<option disabled selected>Select Slot</option>');
    availableSlots.forEach(function (slot) {
      $("#slot").append('<option value="' + slot.start + '">' + slot.start + ' - ' + slot.end + '</option>');
    });

    console.log("Rendered time slots:", availableSlots);
  }

  $("#doctor, #date").change(function () {
    renderTimeSlots();
  });




  // Render appointments
  function renderAppointments() {
    var appointmentsList = $("#appointmentsList");
    appointmentsList.empty();

    var appointmentsData = appointments[loggedInUser.userID] || [];

    if (appointmentsData.length === 0) {
      appointmentsList.append('<li>No Upcoming Appointments</li>');
    } else {
      appointmentsList.sort(function (a, b) {
        if (a.is_accepted && !a.is_declined) {
          return -1;
        } else if (!a.is_accepted && a.is_declined) {
          return 1;
        } else {
          if (a.date !== b.date) {
            return new Date(a.date + " " + a.slot) - new Date(b.date + " " + b.slot);
          } else {
            return a.slot.localeCompare(b.slot);
          }
        }
      });

      var tableHTML = '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Sr. No</th><th>Appointment Date</th><th>Slot</th><th>Appointment with</th><th>Status</th></tr></thead><tbody>';

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
        tableHTML += '<td>' + appointment.slot + '</td>';
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