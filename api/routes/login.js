const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userReg');
const Admin = require('../models/admin');
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
                error: err
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
router.post('/login/admin', (req, res) => {
    Admin.find({email: req.body.email})
    .then((admin) => {
        if(admin.lenght < 1){
            res.status(401).json({
                message: 'admin not found'
            });
        }
           bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if(err) {
            return res.status(401).json({
                error: err
                   }) 
                }
        if(result) {
            console.log(result);
            generateToken(admin[0], (err, token) => {
                if(err){
                 console.log("error", err);
                }
                else{
                  console.log(token);
                  res.status(201).json({
                  message: "Auth successful",
                  admin: admin[0],
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
                message: 'admin not found'
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
router.get("/login/:id/admin", authorizeUser, (req, res) => {
    Admin.findById({_id: req.params.id})
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