const {generateToken, authorizeUser} = require('../../auth/auth');
const express = require('express');
const User = require('../models/userReg');
const bcrypt = require('bcryptjs');
const router = express.Router();



router.post('/register', (req, res) => {
     
    User.find({email: req.body.email})
      .exec()
      .then((user) => {
        if(user.length >= 1) {
          res.status(409).json({ 
            message: "mail exists"
           });
        }
        else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
              return res.status(500).json({ error: err });
            } else {
              const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                mobileNo: req.body.mobileNo,
                password: hash,
                confirmPassword: hash
               });
  
               user
               .save()
               .then((result) => {
                 console.log(result);
                   generateToken(user, (err, token) => {
                   if(err){
                     console.log(err)
                   }
                   else{
                     console.log(user, token)
                     res.status(200).json({
                     message: 'user created',
                     token: token
                    })
                  }
                });
                 })
               .catch((err) =>{
                 console.log(err)
               })
              }
              })
                }

            })
            .catch((err) => {
              res.status(404).json({
                message: 'an error occured'
              })
            })
        
          });


module.exports = router;
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
    