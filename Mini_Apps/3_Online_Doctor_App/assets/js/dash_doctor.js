$(document).ready(function () {
    var app_users = JSON.parse(localStorage.getItem("app_users")) || {};
    var loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    var appointments = JSON.parse(localStorage.getItem("appointments")) || {};
    // Render appointments
    function renderAppointments() {
        var upcomingAppointmentsList = $("#upcomingAppointmentsList");
        upcomingAppointmentsList.empty();

        console.log("Logged-In Doctor ID:", loggedInUser.userID);
        console.log("Appointments Data:", appointments);

        const doctorID = loggedInUser.userID;
        const doctorAppointments = [];

        Object.keys(appointments).forEach(patientID => {
            const patientAppointments = appointments[patientID];
            const doctorAppointmentsForPatient = patientAppointments.filter(appointment => {
                return appointment.doctorID === doctorID;
            });
            doctorAppointments.push(...doctorAppointmentsForPatient);
        });

        console.log("Doctor's Appointments:", doctorAppointments);

        if (doctorAppointments.length === 0) {
            upcomingAppointmentsList.append('<li>No Upcoming Appointments</li>');
        } else {
            doctorAppointments.sort(function (a, b) {
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

            var tableHTML = '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Sr. No</th><th>Patient Name</th><th>Date</th><th>Slot</th><th>Current Status</th><th>Actions</th></tr></thead><tbody>';
            doctorAppointments.forEach(function (appointment, index) {
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
                tableHTML += '<td>' + appointment.patientID + '</td>';
                tableHTML += '<td>' + appointment.date + '</td>';
                tableHTML += '<td>' + appointment.slot + '</td>';
                tableHTML += '<td>' + statusText + '</td>';
                tableHTML += '<td>';
                if (!appointment.is_accepted && !appointment.is_declined) {
                    tableHTML += `<button class="btn btn-success btn-sm btn-accept" data-id="${appointment.appointmentId}">Accept</button>`;
                    tableHTML += `<button class="btn btn-danger btn-sm btn-reject" data-id="${appointment.appointmentId}"">Reject</button>`;
                    tableHTML += `<button class="btn btn-warning btn-sm btn-reschedule" data-id="${appointment.appointmentId}"">Reschedule</button>`;
                }
                tableHTML += '</td>';
                tableHTML += '</tr>';
            });
            tableHTML += '</tbody></table></div>';
            upcomingAppointmentsList.append(tableHTML);
        }
        console.log("Doctor's Appointments:", doctorAppointments);
    }

    renderAppointments();


    // Doctor availability
    function saveAvailability() {
        const specificDate = $("#specificDate").val();
        const specificStart = $("#specificStart").val();
        const specificEnd = $("#specificEnd").val();
        const doctorID = loggedInUser.userID;

        if (!specificDate || !specificStart || !specificEnd) {
            alert("Please select a specific Date, start time, and end time.");
            return;
        }

        if (!confirm("Are you sure you want to update availability?")) {
            return;
        }

        const specificDateSlots = calculateTimeSlots(specificStart, specificEnd);

        // Get the existing availability data for the doctor
        let availabilityData = JSON.parse(localStorage.getItem(`doctorAvailability_${doctorID}`)) || {};

        // Set availability for the specific date
        availabilityData[specificDate] = specificDateSlots;

        // Set default availability for other dates
        const defaultTimeSlots = calculateDefaultTimeSlots("09:00", "18:00");
        for (const date in availabilityData) {
            if (date !== specificDate && !availabilityData[date].length) { // Only set default availability if slots are not already defined
                availabilityData[date] = defaultTimeSlots;
            }
        }

        localStorage.setItem(`doctorAvailability_${doctorID}`, JSON.stringify(availabilityData));

        renderAvailability();

        $('#availabilityModal').modal('hide');
        alert('Availability updated successfully!');
    }


    function calculateTimeSlots(startTime, endTime) {
        const slots = [];
        let currentTime = new Date(`2000-01-01T${startTime}`);
        const endTimeObj = new Date(`2000-01-01T${endTime}`);

        while (currentTime < endTimeObj) {
            slots.push({
                start: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                end: new Date(currentTime.getTime() + 60 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                is_reserved: false,
                reserved_by: null
            });
            currentTime = new Date(currentTime.getTime() + 60 * 60000);
        }

        return slots;
    }

    function calculateDefaultTimeSlots(startTime, endTime) {
        const slots = [];
        const defaultEndTime = "18:00";

        let currentTime = new Date(`2000-01-01T${startTime}`);
        const endTimeObj = new Date(`2000-01-01T${endTime}`);
        const defaultEndTimeObj = new Date(`2000-01-01T${defaultEndTime}`);

        while (currentTime < endTimeObj && currentTime < defaultEndTimeObj) {
            slots.push({
                start: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                end: new Date(currentTime.getTime() + 60 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                is_reserved: false,
                reserved_by: null
            });
            currentTime = new Date(currentTime.getTime() + 60 * 60000);
        }

        return slots;
    }

    $("#saveAvailabilityBtn").click(saveAvailability);



    // Render availability
    function renderAvailability() {
        const doctorID = loggedInUser.userID;
        const availabilityData = JSON.parse(localStorage.getItem(`doctorAvailability_${doctorID}`)) || {};

        const availabilityManagement = $("#availabilityManagement");
        availabilityManagement.empty();

        Object.keys(availabilityData).forEach(date => {
            const formattedDate = new Date(date);
            const dayOfWeek = formattedDate.toLocaleDateString('en-US', { weekday: 'long' });
            const dayOfMonth = formattedDate.getDate();
            const month = formattedDate.toLocaleDateString('en-US', { month: 'long' });
            const year = formattedDate.getFullYear();

            const cardHTML = `<div class="card">
                      <div class="card-header" id="heading${date}">
                          <h2 class="mb-0">
                              <button class="btn btn-secondary w-100" type="button" data-toggle="collapse" data-target="#collapse${date}" aria-expanded="true" aria-controls="collapse${date}">
                                  ${dayOfWeek}, ${month} ${dayOfMonth}, ${year}
                              </button>
                          </h2>
                      </div>
                      <div id="collapse${date}" class="collapse" aria-labelledby="heading${date}" data-parent="#availabilityManagement">
                          <div class="card-body">
                              <ul id="slotsList${date}" class="list-group">
                              </ul>
                          </div>
                      </div>
                  </div>`;
            availabilityManagement.append(cardHTML);

            const slotsList = $(`#slotsList${date}`);
            availabilityData[date].forEach(slot => {
                const startTime = slot.start;
                const endTime = slot.end;
                const isReserved = slot.is_reserved ? 'Reserved' : 'Available';
                const reservedBy = slot.reserved_by ? `Reserved by: ${slot.reserved_by}` : "";
                const slotHTML = `<li class="list-group-item">${startTime} - ${endTime} (${isReserved}) ${reservedBy}</li>`;
                slotsList.append(slotHTML);
            });
        });
    }
    renderAvailability();

    // Appointment Update
    $(document).on('click', '.btn-accept', function () {
        var appointmentId = $(this).data('id');
        acceptAppointment(appointmentId);
    });

    function acceptAppointment(appointmentId) {
        let found = false;
        Object.keys(appointments).forEach(appointmentID => {
            const index = appointments[appointmentID].findIndex(appointment => appointment.appointmentId === appointmentId);

            if (index !== -1) {
                appointments[appointmentID][index].is_accepted = true;
                found = true;
            }
        });
        if (found) {
            const doctorID = loggedInUser.userID;
            let availabilityData = JSON.parse(localStorage.getItem(`doctorAvailability_${doctorID}`)) || {};
            console.log("Doctor's Availability Data:", availabilityData);
            for (const date in availabilityData) {
                availabilityData[date].forEach(slot => {
                    console.log("Slot reserved_by:", slot.reserved_by);
                    console.log("Appointment ID:", appointmentId);
                    if (slot.reserved_by === appointmentId) {
                        console.log("Found matching appointment ID:", appointmentId);
                        console.log("Slot reserved by:", slot.reserved_by);
                        slot.is_reserved = false;
                        slot.reserved_by = null;
                        console.log("Slot marked as available:", slot);
                    }
                });

            }
            localStorage.setItem(`doctorAvailability_${doctorID}`, JSON.stringify(availabilityData));

            localStorage.setItem("appointments", JSON.stringify(appointments));
            console.log(`Appointment with ID ${appointmentId} has been accepted.`);
        } else {
            console.error("Appointment not found for ID:", appointmentId);
        }
        renderAppointments();
    }

    $(document).on('click', '.btn-reject', function () {
        var appointmentId = $(this).data('id');
        rejectAppointment(appointmentId);
    });
    
    function rejectAppointment(appointmentId) {
        let found = false;
        Object.keys(appointments).forEach(appointmentID => {
            const index = appointments[appointmentID].findIndex(appointment => appointment.appointmentId === appointmentId);
    
            if (index !== -1) {
                appointments[appointmentID][index].is_declined = true;
                found = true;
            }
        });
        if (found) {
            const doctorID = loggedInUser.userID;
            let availabilityData = JSON.parse(localStorage.getItem(`doctorAvailability_${doctorID}`)) || {};
            console.log("Doctor's Availability Data:", availabilityData);
            for (const date in availabilityData) {
                availabilityData[date].forEach(slot => {
                    console.log("Slot reserved_by:", slot.reserved_by);
                    console.log("Appointment ID:", appointmentId);
                    if (slot.reserved_by === appointmentId) {
                        console.log("Found matching appointment ID:", appointmentId);
                        console.log("Slot reserved by:", slot.reserved_by);
                        slot.is_reserved = false;
                        slot.reserved_by = null;
                        console.log("Slot marked as available:", slot);
                    }
                });
    
            }
            localStorage.setItem(`doctorAvailability_${doctorID}`, JSON.stringify(availabilityData));
    
            localStorage.setItem("appointments", JSON.stringify(appointments));
            console.log(`Appointment with ID ${appointmentId} has been rejected.`);
        } else {
            console.error("Appointment not found for ID:", appointmentId);
        }
        renderAppointments();
    }


    $(document).ready(function() {
        $(document).on('click', '.btn-reschedule', function () {
            var appointmentId = $(this).data('id');
            $('#rescheduleModal').modal('show');
            $('#rescheduleModal').data('appointmentId', appointmentId);
        });
    
        $('#confirmRescheduleBtn').click(function() {
            var appointmentId = $('#rescheduleModal').data('appointmentId');
            var newSlot = $('#newSlotSelect').val();
            rescheduleAppointment(appointmentId, newSlot);
        });
    
        $('#rescheduleDate').change(function() {
            var selectedDate = $(this).val();
            var selectedDoctorID = loggedInUser.userID;
            renderTimeSlots(selectedDoctorID, selectedDate);
        });
    });
    
    // Reschedule appointment
    function rescheduleAppointment(appointmentId, newSlot) {
        var confirmed = confirm("Are you sure you want to reschedule this appointment?");
        if (!confirmed) {
            return;
        }
    
        let found = false;
        Object.keys(appointments).forEach(appointmentID => {
            const index = appointments[appointmentID].findIndex(appointment => appointment.appointmentId === appointmentId);
    
            if (index !== -1) {
                appointments[appointmentID][index].is_accepted = true;
                found = true;
            }
        });
        if (found) {
            const doctorID = loggedInUser.userID;
            let availabilityData = JSON.parse(localStorage.getItem(`doctorAvailability_${doctorID}`)) || {};
            
            for (const date in availabilityData) {
                availabilityData[date].forEach(slot => {
                    if (slot.reserved_by === appointmentId) {
                        slot.is_reserved = false;
                    }
                });
            }
    
            const selectedDate = $('#rescheduleDate').val();
            if (availabilityData[selectedDate]) {
                const newSlotObj = availabilityData[selectedDate].find(slot => slot.start === newSlot);
                if (newSlotObj) {
                    newSlotObj.is_reserved = true;
                    newSlotObj.reserved_by = appointmentId;
                }
            }
    
            localStorage.setItem(`doctorAvailability_${doctorID}`, JSON.stringify(availabilityData));
    
            // Update the appointment slot
            Object.keys(appointments).forEach(appointmentID => {
                const index = appointments[appointmentID].findIndex(appointment => appointment.appointmentId === appointmentId);
                if (index !== -1) {
                    appointments[appointmentID][index].date = selectedDate;
                    appointments[appointmentID][index].slot = newSlot;
                }
            });
    
            localStorage.setItem("appointments", JSON.stringify(appointments));
            console.log(`Appointment with ID ${appointmentId} has been rescheduled.`);
        } else {
            console.error("Appointment not found for ID:", appointmentId);
        }
        $('#rescheduleModal').modal('hide');
        renderAppointments();
    }
     
    
    // Render available slots
    function renderTimeSlots(selectedDoctorID, selectedDate) {
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
    
        $("#newSlotSelect").empty();
        $("#newSlotSelect").append('<option disabled selected>Select Slot</option>');
        availableSlots.forEach(function (slot) {
            $("#newSlotSelect").append('<option value="' + slot.start + '">' + slot.start + ' - ' + slot.end + '</option>');
        });
    
        console.log("Rendered time slots:", availableSlots);
    }    

});
