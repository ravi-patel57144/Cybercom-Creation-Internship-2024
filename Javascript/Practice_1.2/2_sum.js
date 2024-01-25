let product = {
    name: "Laptop",
    price: 150000,
    quantity: 2,
  };
  

  function calculateOneCost(product) {
    return product.price / product.quantity;
  }
  
  let oneProductCost = calculateOneCost(product);
  console.log("Price for 1 qty: " + oneProductCost);
  
  function calculateTotalCost(product, quantity) {
    return oneProductCost * quantity;
  }

  let totalProductCost = calculateTotalCost(product, 5);
  console.log("Total Price: " + totalProductCost);

  