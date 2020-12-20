const jwt = require("jsonwebtoken");
//const User = require('../models/userReg');
require("dotenv").config();



module.exports.generateToken = (user, callback) => {
    console.log("user", user);
    jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: user.password,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" },
      (err, res) => {
        callback(err, res);
      }
    );
  };

  module.exports.authorizeUser = (req, res, next) => {
    const token = req.headers.authorization ||
                  req.headers["X-access-token"] ||
                  req.body.token

         if(!token){
           res.status(401).json({
              message: 'Unauthorized user'
           })
         }
         try{
           const decoded = jwt.verify(token, process.env.JWT_KEY);
           req.user = decoded;
           next();
         }
          catch{
            res.status(400).json('invalid token')
          }
        
}
          
  
            

  