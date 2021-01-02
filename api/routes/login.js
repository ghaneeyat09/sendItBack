const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userReg');
const { generateToken, authorizeUser } = require('../../auth/auth');
require("dotenv").config();

const router = express.Router();


router.post('/login', (req, res) => {
    User.find({email: req.body.email})
    .then((user) => {
        if(user.lenght < 1){
            res.status(401).json({
                message: 'user not found'
            });
        }
           bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err) {
            return res.status(401).json({
                message: "Auth failed"
                   }) 
                }
        if(result) {
            console.log(result);
            generateToken(user[0], (err, token) => {
                if(err){
                 console.log("error", err);
                }
                else{
                  console.log(token);
                  res.status(201).json({
                  userData: user[0],
                  message: "Auth successful",
                  user: user[0],
                  token: token
                    })
                }
    });
}

        else{
            res.status(401).json({
                    message: "incorrect password"
                }) 
            }   
        }
            )
        })
        .catch((err) => {
            res.status(404).json({
                message: 'user not found'
            })
        })
});

router.get("/login/:id", authorizeUser, (req, res) => {
        User.findById({_id: req.params.id})
        .exec()
        .then((data) => {
            res.status(200).json({
                success: true,
                data
            })
        })
        .catch((err) => {
            res.json({
                message: "user not found",
                error: err
            })
        })
})

module.exports = router;