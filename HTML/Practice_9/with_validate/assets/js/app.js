$(document).ready(function(){
    $("#flightBookingValidation").validate({
        rules: {
            txtFrom: {
                required: true,
            },
            txtTo: {
                required: true,
            },
            dtDeparture:{
                required: true,
            },
            txtFirstName:{
                required: true,
            },
            sltGender:{
                required: true,
            },
            txtMobile:{
                required: true,
                minlength:10,
                maxlength:10,
            },
            txtEmail:{
                required: true,
                email: true,
            },
        },

        messages: {
            txtFrom: {
                required: "Please enter source",
            },
            txtTo: {
                required: "Please enter destination",
            },
            dtDeparture:{
                required: "Please select Departure Date",
            },
            txtFirstName:{
                required: "Please enter your name",
            },
            sltGender:{
                required: "Please select Gender",
            },
            txtMobile:{
                required: "Please enter your Mobile number",
                minlength: "Mobile number must be 10 digit",
                maxlength: "Mobile number must be 10 digit",
            },
            txtEmail:{
                required: "Please enter your email",
                eamil: "Please enter a valid email",
            },
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});