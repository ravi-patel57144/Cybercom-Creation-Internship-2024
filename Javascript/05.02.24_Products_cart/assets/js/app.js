document.addEventListener("DOMContentLoaded", function () {
    showProducts();
    calculateGrandTotal();
});

function allProdcuts() {
    const products = [
        { name: 'HDD', image: 'assets/img/hdd.jpeg', price: 3500 },
        { name: 'SSD', image: 'assets/img/ssd.jpeg', price: 4000 },
        { name: 'Ram', image: 'assets/img/ram.jpeg', price: 2500 },
        { name: 'Monitor', image: 'assets/img/monitor.jpeg', price: 5000 },
        { name: 'Motherboard', image: 'assets/img/motherboard.jpeg', price: 6500 }
    ];
    localStorage.setItem("products", JSON.stringify(products));
    return products;
}

function getProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : allProdcuts();
    return products;
}

function showProducts() {
    const products = getProductsFromLocalStorage();
    const productContainer = document.getElementById("product-container");

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <div class="product" id="product-${product.name}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">₹${product.price}</p>
                    </div>
                    <div class="qty-section">
                        <button class="qty-btn minus" onclick="updateQty('${product.name}', -1)">-</button>
                        <span class="qty" id="${product.name}-qty">0</span>
                        <button class="qty-btn plus" onclick="updateQty('${product.name}', 1)">+</button>
                    </div>
                </div>
            </div>
        `;

        productContainer.appendChild(productDiv);
    });
}

function updateQty(productName, quantity) {
    const qtyElement = document.getElementById(`${productName}-qty`);
    let currentQty = parseInt(qtyElement.innerText);
    currentQty = Math.max(0, currentQty + quantity);
    qtyElement.innerText = currentQty;
    calculateGrandTotal();
}

function goToCart() {
    const products = getProductsFromLocalStorage();
    const cartContainer = document.getElementById("cart-container");

    cartContainer.innerHTML = "";

    products.forEach((product) => {
        const qty = parseInt(document.getElementById(`${product.name}-qty`).innerText);

        if (qty > 0) {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                <p>${product.name}</p>
                <p>Qty: ${qty}</p>
                <p>Price: ₹${product.price * qty}</p>
            `;
            cartContainer.appendChild(cartItem);
        }
    });

    document.getElementById("products-list").style.display = "none";
    document.getElementById("cart-details").style.display = "block";
}

function goToProducts() {
    document.getElementById("cart-details").style.display = "none";
    document.getElementById("products-list").style.display = "block";
}

function calculateGrandTotal() {
    const totalQtyElement = document.getElementById("total-qty");
    const totalPriceElement = document.getElementById("total-price");
    const grandTotalElement = document.getElementById("grand-total");
    const taxElement = document.getElementById("tax");

    let totalQty = 0;
    let totalPrice = 0;

    const products = getProductsFromLocalStorage();

    products.forEach((product) => {
        const qty = parseInt(document.getElementById(`${product.name}-qty`).innerText);
        totalQty += qty;
        totalPrice += product.price * qty;
    });

    totalQtyElement.innerText = totalQty;
    totalPriceElement.innerText = totalPrice;

    const storedTax = localStorage.getItem("tax");
    const taxPercentage = parseFloat(storedTax) || 18;

    taxElement.innerText = taxPercentage + "%";

    const taxAmount = (taxPercentage / 100) * totalPrice;
    const grandTotal = totalPrice + taxAmount;

    grandTotalElement.innerText = grandTotal.toFixed(2);
}
