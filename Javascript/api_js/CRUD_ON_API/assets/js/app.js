let itemsPerPage = 14;
let currentPage = 1;
let totalPages = 0;

const loaderContainer = document.getElementById("loader");
const noRecords = document.getElementById("no-records");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalBody = document.getElementById("modal-body");

const priceFilter = document.getElementById("price-filter");
const ratingFilter = document.getElementById("rating-filter");
const pagination = document.getElementById("pagination");
const product = document.getElementById("product-container");

span.onclick = function () {
    modal.style.display = "none";
    modalBody.innerHTML = "";
};

fetchProduct("");
document.getElementById("search").addEventListener("input", function () {
    fetchProduct(this.value);
});

priceFilter.addEventListener("change", function () {
    fetchProduct(document.getElementById("search").value, this.value);
});

ratingFilter.addEventListener("change", function () {
    fetchProduct(
        document.getElementById("search").value,
        document.getElementById("price").value,
        this.value
    );
});

async function fetchProduct(searchQuery, priceSortType, ratingSortType) {
    loaderContainer.style.display = "block";
    let url = `https://dummyjson.com/products/search?q=${searchQuery}`;

    const container = document.getElementById("product-container");
    container.innerHTML = "";

    await fetch(url)
        .then((response) => response.json())
        .then((res) => {
            loaderContainer.style.display = "none";

            let products = res.products;

            const fetchIds = JSON.parse(localStorage.getItem("deleteRecord")) || [];
            if (fetchIds.length !== 0) {
                products = products.filter((product) => !fetchIds.includes(product.id));
            }

            const fetchProduct = JSON.parse(localStorage.getItem("addProduct")) || [];
            if (fetchProduct.length !== 0) {
                products = [...products, ...fetchProduct];
            }

            const updateRecord =
                JSON.parse(localStorage.getItem("updateRecord")) || [];
            updateRecord.forEach((updatedProduct) => {
                const index = products.findIndex(
                    (product) => product.id === updatedProduct.id
                );
                if (index !== -1) {
                    products[index] = updatedProduct;
                }
            });

            if (priceSortType === "low-high") {
                products.sort((a, b) => a.price - b.price);
            } else if (priceSortType === "high-low") {
                products.sort((a, b) => b.price - a.price);
            }

            if (ratingSortType === "low-high") {
                products.sort((a, b) => a.rating - b.rating);
            } else if (ratingSortType === "high-low") {
                products.sort((a, b) => b.rating - a.rating);
            }

            initializePagination(products);
        })
        .catch((err) => {
            loaderContainer.style.display = "none";
            console.error(err);
        });
}

function displayProductsForPage(pageNumber, products) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = products.slice(startIndex, endIndex);

    if (products.length === 0) {
        noRecords.style.display = "block";
        product.innerHTML = "";
        return;
    } else {
        noRecords.style.display = "none";
    }

    pageProducts.forEach((res, index) => {
        const createDiv = document.createElement("div");
        createDiv.classList.add("card");
        createDiv.addEventListener("click", () => {
            handleModal(res);
        });
        createDiv.innerHTML = `
    <div class="title">${res.title}</div>
    <div class="image-container">
        <img src="${res.thumbnail && res.thumbnail.length > 0 ? res.thumbnail : ""
            }" alt="image" width="50" />
    </div>
    `;
        container.appendChild(createDiv);
    });
}

function renderPagination(products) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayProductsForPage(currentPage, products);
            renderPagination(products);
        }
    });
    if (currentPage === 1) {
        prevButton.disabled = true;
    }
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayProductsForPage(currentPage, products);
            renderPagination(products);
        });
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProductsForPage(currentPage, products);
            renderPagination(products);
        }
    });
    if (currentPage === totalPages || totalPages === 0) {
        nextButton.disabled = true;
    }
    paginationContainer.appendChild(nextButton);
}

function initializePagination(products) {
    totalPages = Math.ceil(products.length / itemsPerPage);
    renderPagination(products);
    displayProductsForPage(currentPage, products);
}

function handleModal(res) {
    modal.style.display = "block";
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
    <div class='modal-image-container'>
      <img src="${res.thumbnail}" alt="image" />
    </div>
    <div class='modal-content-container'>
      <div>${res.title}</div>
      <div>${res.description}</div>
      <div>Price: ${res.price}</div>
      <div>${res.rating}</div>
      <div>Available Stock: ${res.stock}</div>
      <div>${res.brand}</div>
      <div>${res.category}</div>
      <button onclick=deleteRecord(${res.id})>Delete</button>
      <button id='update-btn'>Update</button>
    </div>
  `;

    document.getElementById("update-btn").addEventListener("click", (e) => {
        updateRecordModal(res);
    });
}

// Delete Product
async function deleteRecord(id) {
    const response = confirm("Are you sure you want to delete this product?");
    if (response) {
        const fetchAddRecord = JSON.parse(localStorage.getItem("addProduct")) || [];
        if (fetchAddRecord.length !== 0) {
            const findRecord = fetchAddRecord.findIndex((record) => {
                return record.id === id;
            });

            if (findRecord !== -1) {
                fetchAddRecord.splice(fetchAddRecord[findRecord], 1);
                localStorage.setItem("addProduct", JSON.stringify(fetchAddRecord));
                fetchProduct("");
                modal.style.display = "none";
            } else {
                await deleteAPIRecord(id);
                fetchProduct("");
                modal.style.display = "none";
            }
        }
    }
}

async function deleteAPIRecord(id) {
    await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((res) => {
            const fetchIds = JSON.parse(localStorage.getItem("deleteRecord")) || [];
            const ids = fetchIds.concat(res.id);
            localStorage.setItem("deleteRecord", JSON.stringify(ids));
        })
        .catch((err) => {
            console.log(err);
        });
}

// Update Product Content
function updateRecordModal(res) {
    const myAddProductModal = document.getElementById("myAddProductModal");
    myAddProductModal.style.display = "block";
    document.getElementById("product-modal-title").innerHTML = "Update Product";
    document.getElementById("add-product").value = "Update Product";
    document.getElementById("title").value = res.title;
    document.getElementById("description").value = res.description;
    document.getElementById("price").value = res.price;
    document.getElementById("rating").value = res.rating;
    document.getElementById("stock").value = res.stock;
    document.getElementById("brand").value = res.brand;
    document.getElementById("category").value = res.category;
    document.getElementById("thumbnail").value = res.thumbnail;
    sessionStorage.setItem("updateProductId", res.id);
}

// Product Modal Management
const myAddProductModal = document.getElementById("myAddProductModal");
const span1 = document.getElementsByClassName("close")[1];
span1.onclick = function () {
    myAddProductModal.style.display = "none";
    document.getElementById("product-modal-title").innerHTML = "Add Product";
    document.getElementById("add-product").value = "Add Product";
    document.getElementById("product-form").reset();
    sessionStorage.removeItem("updateProductId");
};
document.getElementById("addProduct").addEventListener("click", (e) => {
    myAddProductModal.style.display = "block";
});

document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addRecord();
});

// Add and Update Record
async function addRecord() {
    const modal = document.getElementById("myModal");
    const form = document.getElementById("product-form");
    const formData = new FormData(form);

    if (sessionStorage.getItem("updateProductId")) {
        const idToUpdate = sessionStorage.getItem("updateProductId");

        const status = handleUpdateLocalStorageRecord(idToUpdate, formData, form);
        if (!status) {
            await fetch(`https://dummyjson.com/products/${idToUpdate}`, {
                method: "PUT",
                body: formData,
            })
                .then((response) => response.json())
                .then((res) => {
                    const fetchUpdate =
                        JSON.parse(localStorage.getItem("updateRecord")) || [];

                    const existingIndex = fetchUpdate.findIndex(
                        (item) => item.id === res.id
                    );
                    if (existingIndex !== -1) {
                        fetchUpdate[existingIndex] = res;
                    } else {
                        fetchUpdate.push(res);
                    }
                    localStorage.setItem("updateRecord", JSON.stringify(fetchUpdate));
                    sessionStorage.removeItem("updateProductId");
                    myAddProductModal.style.display = "none";
                    modal.style.display = "none";
                    form.reset();
                    fetchProduct("");
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    } else {
        await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((res) => {
                let product = res;
                product.id = new Date().getTime();

                const fetchProducts =
                    JSON.parse(localStorage.getItem("addProduct")) || [];
                console.log(fetchProducts);
                const mergeProducts = [...fetchProducts, product];
                localStorage.setItem("addProduct", JSON.stringify(mergeProducts));

                myAddProductModal.style.display = "none";
                form.reset();
                fetchProduct("");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

function handleUpdateLocalStorageRecord(idToUpdate, formData, form) {
    const modal = document.getElementById("myModal");
    const fetchAddRecord = JSON.parse(localStorage.getItem("addProduct")) || [];
    if (fetchAddRecord.length !== 0) {
        const findIndex = fetchAddRecord.findIndex((item) => item.id == idToUpdate);
        console.log(findIndex);
        if (findIndex !== -1) {
            fetchAddRecord[findIndex] = {
                ...fetchAddRecord[findIndex],
                ...Object.fromEntries(formData.entries()),
            };
            localStorage.setItem("addProduct", JSON.stringify(fetchAddRecord));
            myAddProductModal.style.display = "none";
            modal.style.display = "none";
            form.reset();
            fetchProduct("");
            return true;
        }
    }
    return false;
}
