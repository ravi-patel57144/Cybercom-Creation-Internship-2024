let user = {
    name: "Ravi",
    age: 26,
    address: "Ahmedabad, India"
  };
  

  console.log("User Info : ")
  console.log(user);

  function getUserInfo(user) {
    return { name: user.name, age: user.age };
  }
  
  let userInfo = getUserInfo(user); 
  console.log("Extracted User Info: " )
  console.log(userInfo);
  