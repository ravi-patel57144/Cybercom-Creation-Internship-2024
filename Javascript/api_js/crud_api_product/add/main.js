$(document).ready(function () {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }
      return response.json();
    })
    .then((categories) => {
      const categorySelect = $("#categorySelect");
      categories.forEach((category) => {
        categorySelect.append(
          `<option value="${category.id}">${category.name}</option>`
        );
      });
    })
    .catch((error) => {
      console.error(error);
    });

  $("form").validate({
    rules: {
      title: {
        required: true,
      },
      price: {
        required: true,
        number: true,
        min: 0,
      },
      description: {
        required: true,
      },
      categorySelect: {
        required: true,
      },
      images: {
        required: true,
      },
    },
    messages: {
      title: "Please enter a title.",
      price: {
        required: "Please enter a price.",
        number: "Please enter a valid number.",
        min: "Please enter a positive number.",
      },
      description: "Please enter a description.",
      categorySelect: {
        required: "Please select a category.",
      },
      images: "Please enter at least one image URL.",
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: function (form) {
      var submitButton = $(form).find('input[type="submit"]');
      submitButton.prop("disabled", true).val("Loading...");

      var formData = {
        title: $("#title").val(),
        price: parseFloat($("#price").val()),
        description: $("#description").val(),
        categoryId: parseInt($("#categoryId").val()),
        images: $("#images")
          .val()
          .split(",")
          .map((url) => url.trim()),
      };

      fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error adding product.");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          form.reset();
          alert("record added successfully!");
          // window.location.href = "../index.html";
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          submitButton.prop("disabled", false).val("Submit");
        });
    },
  });

  $("#categorySelect").change(function () {
    $("#categoryId").val($(this).val());
  });
});
