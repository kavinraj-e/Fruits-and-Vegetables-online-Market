const jwt = require("jsonwebtoken");
const User = require('../models/UserModel')


module.exports = async (req, res, next) => {
  try {

    const  token    = req.cookies.token;
    console.log(token);
   if( !token ){
        console.log("Login first to handle this resource");
        return res.status(400).send({
          message: "Login first to handle this resource",
          success: false,
        });
   }
   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id);
   req.UserId = decoded.id;
   next();


  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
