function combineObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }
  

  let userGenDetails = { 
        name: "Ravi", 
        age: 24 };

  let userAddress = { 
        address: "Ahmedabad, India" };
  
    console.log("User General Details Object: ")
    console.log(userGenDetails)

    console.log("User Address Object: ")
    console.log(userAddress)

  
    console.log("Combined Objects: ")
    let combinedObject = combineObjects(userGenDetails, userAddress);
    console.log(combinedObject);
    