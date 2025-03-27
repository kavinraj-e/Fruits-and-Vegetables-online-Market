const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();


  //   //deploy
  //   const options = {
  //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  //     // httpOnly: true,    
  //     secure: true,      
  //     sameSite: "Lax",  
  //     path: "/"          
  // };
  
  

  //local
  
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    // httpOnly: true,  
    // secure: false,   
    // sameSite: "Lax", 
};
      


    res.status(statusCode)
        .cookie("token", token, options)
        .json({ message: "Login successful", success: true, token, user });
};

module.exports = sendToken;
