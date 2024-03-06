let currentPage = 1;
const itemsPerPage = 12;
let products = [];
let categories = [];

const loadingContainer = document.getElementById("loading");
const noRecords = document.getElementById("no-records");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalBody = document.getElementById("modal-body");
const paginationContainer = document.getElementById("pagination-container");
const filterCategoryDropdown = document.getElementById("filterCategory");
const sortDropdown = document.getElementById("sort");
const sortPriceDropdown = document.getElementById("sortPrice");

span.onclick = function () {
  modal.style.display = "none";
  modalBody.innerHTML = "";
};

document.getElementById("search").addEventListener("input", function (e) {
  handleSearch();
});

filterCategoryDropdown.addEventListener("change", function (e) {
  handleFilterByCategory();
});

sortDropdown.addEventListener("change", function (e) {
  handleSort();
});

sortPriceDropdown.addEventListener("change", function (e) {
  handleSortPrice();
});

document.getElementById("reset").addEventListener("click", handleReset);

function handleReset() {
  document.getElementById("search").value = "";
  filterCategoryDropdown.value = "";
  sortDropdown.value = "";
  sortPriceDropdown.value = "";
  fetchProductsAndCategories();
}

// Fetch products and categories
function fetchProductsAndCategories() {
  fetchProducts();
  fetchCategories();
}

// Fetch products from the API
function fetchProducts() {
  loadingContainer.style.display = "block";
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  let fetchUrl = `https://api.escuelajs.co/api/v1/products`;
  fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      return response.json();
    })
    .then((res) => {
      loadingContainer.style.display = "none";

      products = res;
      if (products.length === 0) {
        noRecords.style.display = "block";
      } else {
        noRecords.style.display = "none";
        renderPagination(products);
        displayProductsForPage(currentPage, products);
        updateCategoriesDropdown();
      }
    })
    .catch((err) => {
      loadingContainer.style.display = "none";
      console.error(err);
    });
}

// Fetch categories from the API
function fetchCategories() {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }
      return response.json();
    })
    .then((res) => {
      categories = res;
      updateCategoriesDropdown();
    })
    .catch((err) => {
      console.error(err);
    });
}

// Display products for the current page
function displayProductsForPage(page, productList) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageProducts = productList.slice(startIndex, endIndex);

  if (productList.length === 0) {
    noRecords.style.display = "block";
  } else {
    noRecords.style.display = "none";
  }

  pageProducts.forEach((res, index) => {
    const createDiv = document.createElement("div");
    createDiv.classList.add("card");
    createDiv.addEventListener("click", () => {
      handleModal(res);
    });
    const image = res.images[0];
    createDiv.innerHTML = `
      <div class="image-container">
        <img src="${image}" alt="image" width="50" />
      </div>
      <div class="title">${res.title}</div>`;
    container.appendChild(createDiv);
  });
}

// Handle modal display
function handleModal(res) {
  modal.style.display = "block";
  const image = res.images[0][0];
  modalBody.innerHTML = `
        <div class='modal-image-container'>
            <img src="${image}" alt="image" width="50" />
        </div>
        <div class='modal-content-container'>
            <div>${res.title}</div>
            <div>${res.description}</div>
            <div>Price: ${res.price}</div>
            <div>Category: ${res.category.name}</div>
            <button onclick=deleteProduct(${res.id})>Delete</button>
            <button onclick=updateProduct(${res.id})>Update</button>
        </div>`;
}

// Update product
function updateProduct(id) {
  window.location.href = `./update/index.html?id=${id}`;
}

// Delete product
function deleteProduct(id) {
  const response = confirm("Are you sure you want to delete this product?");
  if (response) {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        modal.style.display = "none";
        fetchProducts();
        document.getElementById("search").value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Render pagination
function renderPagination(productList) {
  const pageCount = Math.ceil(productList.length / itemsPerPage);
  paginationContainer.innerHTML = "";

  if (pageCount > 1) {
    const prevButton = createPaginationButton("Previous");
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayProductsForPage(currentPage, productList);
        updatePaginationButtons();
      }
    });
    prevButton.disabled = currentPage === 1;

    const nextButton = createPaginationButton("Next");
    nextButton.addEventListener("click", () => {
      if (currentPage < pageCount) {
        currentPage++;
        displayProductsForPage(currentPage, productList);
        updatePaginationButtons();
      }
    });
    nextButton.disabled = currentPage === pageCount;

    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= pageCount; i++) {
      const pageButton = createPaginationButton(i.toString());
      pageButton.addEventListener("click", () => {
        currentPage = i;
        displayProductsForPage(currentPage, productList);
        updatePaginationButtons();
      });
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      paginationContainer.appendChild(pageButton);
    }

    paginationContainer.appendChild(nextButton);
  }
}

// Update pagination buttons
function updatePaginationButtons() {
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const paginationButtons = document.querySelectorAll(".pagination-button");
  paginationButtons.forEach((button, index) => {
    if (index === 0) {
      button.disabled = currentPage === 1;
    } else if (index === paginationButtons.length - 1) {
      button.disabled = currentPage === pageCount;
    }
    button.classList.remove("active");
  });
  paginationButtons[currentPage].classList.add("active");
}

// Create pagination button
function createPaginationButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("pagination-button");
  return button;
}

// Handle category filtering
function handleFilterByCategory() {
  const selectedCategory = filterCategoryDropdown.value;
  let filteredProducts = products;
  if (selectedCategory !== "") {
    filteredProducts = products.filter(
      (product) => product.category.name === selectedCategory
    );
  }
  currentPage = 1;
  renderPagination(filteredProducts);
  displayProductsForPage(currentPage, filteredProducts);
}

// Handle sorting by title
function handleSort() {
  const sortOption = sortDropdown.value;
  let sortedProducts = [...products];
  const selectedCategory = filterCategoryDropdown.value;

  if (selectedCategory !== "") {
    sortedProducts = sortedProducts.filter(
      (product) => product.category.name === selectedCategory
    );
  }

  if (sortOption === "a-z") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "z-a") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  currentPage = 1;
  renderPagination(sortedProducts);
  displayProductsForPage(currentPage, sortedProducts);
}

// Handle sorting by price
function handleSortPrice() {
  const sortPriceOption = sortPriceDropdown.value;
  let sortedProducts = [...products];
  const selectedCategory = filterCategoryDropdown.value;

  if (selectedCategory !== "") {
    sortedProducts = sortedProducts.filter(
      (product) => product.category.name === selectedCategory
    );
  }

  if (sortPriceOption === "low-to-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortPriceOption === "high-to-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  currentPage = 1;
  renderPagination(sortedProducts);
  displayProductsForPage(currentPage, sortedProducts);
}

// Handle search
function handleSearch() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput)
  );
  currentPage = 1;
  renderPagination(filteredProducts);
  displayProductsForPage(currentPage, filteredProducts);

  if (filteredProducts.length === 0) {
    noRecords.style.display = "block";
  } else {
    noRecords.style.display = "none";
  }
}

// Update categories dropdown
function updateCategoriesDropdown() {
  const uniqueCategories = Array.from(
    categories.map((category) => category.name)
  );

  filterCategoryDropdown.innerHTML =
    '<option value="" selected>Select Category</option>';

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterCategoryDropdown.appendChild(option);
  });
}

fetchProductsAndCategories();
