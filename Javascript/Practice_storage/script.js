$(document).ready(function() {
    $("#productForm").submit(function(e) {
        e.preventDefault();

        if (!$(this)[0].checkValidity()) {
            return;
        }

        var productData = {
            title: $("#productTitle").val(),
            category: $("#category").val(),
            price: $("#price").val(),
            description: $("#description").val()
        };

        var products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(productData);
        localStorage.setItem("products", JSON.stringify(products));

        $("#productForm")[0].reset();

        displayProducts();
    });


    function displayProducts() {
        var products = JSON.parse(localStorage.getItem("products")) || [];
        var tableBody = $("#productTable tbody");
        tableBody.empty();

        $.each(products, function(index, product) {
            var row = "<tr>";
            row += "<td>" + product.title + "</td>";
            row += "<td>" + product.category + "</td>";
            row += "<td>" + product.price + "</td>";
            row += "<td><a href='#' class='edit' data-index='" + index + "'>Edit</a> | <a href='#' class='delete' data-index='" + index + "'>Delete</a></td>";
            row += "</tr>";

            tableBody.append(row);
        });


        $(".edit").click(function(e) {
            e.preventDefault();
            var index = $(this).data("index");
            var product = products[index];


            $("#productTitle").val(product.title);
            $("#category").val(product.category);
            $("#price").val(product.price);
            $("#description").val(product.description);

            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));

            displayProducts();
        });


        $(".delete").click(function(e) {
            e.preventDefault();
            var index = $(this).data("index");

            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));

            displayProducts();
        });
    }

    displayProducts();
});