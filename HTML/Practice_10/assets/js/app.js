// Function to create radio or checkbox elements
function createInput(type, name, value) {
    var div = document.createElement("div");
    var label = document.createElement("label");
    label.textContent = value;
    var input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = value;

    div.appendChild(input);
    div.appendChild(label);

    return div;
}

// Lists
const listHaveYouEverHad = ["Anemia", "Asthma", "Arthritis", "Cancer", "Gout", "Diabetes", "Emotional Disorder", "Epilepsy Seizures", "Fainting Spells", "Gallstones", "Heart Disease",
    "Heart Attack", "Rheumatic Fever", "High Blood Pressure", "Digestive Problems", "Ulcerative Colitis", "Ulcer Disease", "Hepatitis", "Kidney Disease", "Liver Disease", "Sleep Apnea",
    "Use a C-PAP machine", "Thyroid Problems", "Tuberculosis", "Venereal Disease", "Neurological Disorders", "Bleeding Disorders", "Lung Disease","Emphysema",
];

const exerciseList = ["Never", "1-2 days", "3-4 days", "5+ days"];
const eatingDietList = ["I have a loose diet", "I have a strict diet", "I don't have a diet plan"];
const alcoholConsumptionList = ["I don't drink", "1-2 glasses/day", "3-4 glasses/day", "5+ galsses/day"];
const caffeineConsumptionList = ["I don't use caffeine", "1-2 cups/day", "3-4 cups/day", "5+ cups/day"];
const smokeList = ["No", "0-1 packs/day", "1-2 packs/day", "2+ packs/day"];

// Get Element IDs
const chkbxHaveYouEverHad = document.getElementById("chkbxHaveYouEverHad");
const rdExercise = document.getElementById("rdExercise");
const rdEatingDiet = document.getElementById("rdEatingDiet");
const rdAlcoholConsumptions = document.getElementById("rdAlcoholConsumptions");
const rdCaffeineConsumption = document.getElementById("rdCaffeineConsumption");
const rdSmoke = document.getElementById("rdSmoke");

// Populate lists
function populateList(container, list, type, name) {
    list.forEach((item) => {
        var element = createInput(type, name, item);
        container.appendChild(element);
    });
}

populateList(chkbxHaveYouEverHad, listHaveYouEverHad, "checkbox", "haveYouEverHad");
populateList(rdExercise, exerciseList, "radio", "RdExerice");
populateList(rdEatingDiet, eatingDietList, "radio", "rdEatingDiet");
populateList(rdAlcoholConsumptions, alcoholConsumptionList, "radio", "rdAlcoholConsumptions");
populateList(rdCaffeineConsumption, caffeineConsumptionList, "radio", "rdCaffeineConsumption");
populateList(rdSmoke, smokeList, "radio", "rdSmoke");

// validations
$(document).ready(function () {
    $("#patientHistoryForm").validate({
        rules: {
            selectPatientGender: {
                required: true,
            },
            txtFirstName: {
                required: true,
                minlength: 2,
            },
            txtLastName: {
                required: true,
                minlength: 2,
            },
            patientBirthdayMonth: {
                required: true,
            },
            patientBirthdayDay: {
                required: true,
            },
            patientBirthdayYear: {
                required: true,
            },
            numPatientHeight: {
                required: true,
            },
            numPatientWeight: {
                required: true,
            },
            emailPatientEmail: {
                required: true,
                email: true,
            },
            txtreasonForSeeing: {
                required: true,
            },
        },
        messages: {
            selectPatientGender: {
                required: "Please select gender",
            },
            txtFirstName: {
                required: "Please enter the first name",
                minLength: "firstname must be atleast 2 characters",
            },
            txtLastName: {
                required: "Please enter the last name",
                minLength: "lastname must be atleast 2 characters",
            },
            patientBirthdayMonth: {
                required: "Please select the month",
            },
            patientBirthdayDay: {
                required: "Please select the day",
            },
            patientBirthdayYear: {
                required: "Please select the year",
            },
            numPatientHeight: {
                required: "Please enter the patient's height",
            },
            numPatientWeight: {
                required: "Please enter the patient's weight",
            },
            emailPatientEmail: {
                required: "Please enter the patient's email",
                email: "Please enter a valid email address",
            },
            txtreasonForSeeing: {
                required: "Please provide the reason for seeing the doctor",
            },
        },

        errorPlacement: function (error, element) {
            error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
            error.insertAfter(element);
        },

        highlight: function (element, errorClass, validClass) {
            $(element).css({ border: "1px solid red" });
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css({ border: "1px solid black" });
        },

        invalidHandler: function (event, validator) {
            var errors = validator.errorList;
            if (errors.length) {
                var errorsCount = validator.numberOfInvalids();
                var errorMessage = "";
                for (var i = 0; i < errors.length; i++) {
                    errorMessage += "- " + errors[i].message + "\n";
                }
                alert(
                    `You have missed ${errorsCount} required field. Kindly fill that first` +
                    "\n" +
                    errorMessage
                );
            }
        },

        submitHandler: function (form) {
            alert("Thank You!" + 
            "\n" + 
            "Your details have been submitted successfully");
            const formDataArray = $(form).serializeArray();
            console.log(formDataArray);
        },
    });
});