$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get("id");

  fetch("https://api.escuelajs.co/api/v1/products/" + productId)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch product details.");
      }
      return response.json();
    })
    .then((product) => {
      console.log(product);
      $("#title").val(product.title);
      $("#price").val(product.price);
      $("#description").val(product.description);
      $("#images").val(product.images.join(","));
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
        images: $("#images")
          .val()
          .split(",")
          .map((url) => url.trim()),
      };

      fetch("https://api.escuelajs.co/api/v1/products/" + productId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error updating product.");
          }
          return response.json();
        })
        .then((data) => {
          window.location.href = "../index.html";
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          submitButton.prop("disabled", false).val("Submit");
        });
    },
  });
});
