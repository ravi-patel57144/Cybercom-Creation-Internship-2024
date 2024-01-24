$(document).ready(function() {
    // Practice 1.1
    var originalText = $("#paragraph").text();

    $("#changeTextBtn").on("click", function() {
        var currentText = $("#paragraph").text();

        if (currentText === originalText) {
            $("#paragraph").text("I am constantly exploring the latest advancements in the tech world, ensuring that my skill set remains cutting-edge.");
        } else {
            $("#paragraph").text(originalText);
        }
    });

    // Practice1.2
    var newItemCounter = 1;

    $("#addItemBtn").on("click", function() {
        $("#itemList").append("<li>New Item" + newItemCounter + "</li>");
        newItemCounter++;
    });

    $("#removeItemBtn").on("click", function() {
        $("#itemList li:last-child").remove();
    });

    // Practice 1.3
    $(".changeTextBtn").on("click", function() {
        var targetId = $(this).data("target");
        $("#" + targetId).text("New Text Applied");
    });
});

// Practice 1.4
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var errorMessage = "";

    if (name === "") {
        errorMessage += "Name is required.<br>";
    }

    if (email === "") {
        errorMessage += "Email is required.<br>";
    }

    var errorMessagesContainer = document.getElementById("errorMessages");

    if (errorMessage !== "") {
        errorMessagesContainer.innerHTML = errorMessage;
        errorMessagesContainer.style.color = "#e74c3c";
    } else {
        errorMessagesContainer.innerHTML = "Form submitted successfully!";
        errorMessagesContainer.style.color = "#2ecc71";
    }
});

// Practice 1.5
document.getElementById("changeImageBtn").addEventListener("click", function() {
    var currentImage = document.getElementById("myImage").src;

    if (currentImage.endsWith("cat_1.jpg")) {
        document.getElementById("myImage").src = "assets/img/cat_2.jpg";
    } else {
        document.getElementById("myImage").src = "assets/img/cat_1.jpg";
    }
});
