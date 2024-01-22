$(document).ready(function(){
    $("#flightBookingValidation").on("submit", function(event){
        var isValid = true;

        $(this).find("input, select").each(function(){
            var fieldName = $(this).attr("name");
            var fieldValue = $(this).val();

            if ($(this).prop("required") && fieldValue === "") {
                alert("Please fill in all required fields.");
                isValid = false;
                return false;
            }

            if (fieldName === "txtEmail" && fieldValue !== "") {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    alert("Please enter a valid email address.");
                    isValid = false;
                    return false;
                }
            }

            if (fieldName === "txtMobile" && fieldValue !== "") {
                var mobileRegex = /^[0-9]{10}$/;
                if (!mobileRegex.test(fieldValue)) {
                    alert("Mobile number must be 10 digits and contain only numbers.");
                    isValid = false;
                    return false;
                }
            }
        });

        if (isValid) {
            alert("Form submitted successfully!");
            $(this)[0].reset();
        }

        event.preventDefault();
    });
});