const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/orders');
const { authorizeUser } = require('../../auth/auth');


const router = express.Router();

//post request
router.post('/', authorizeUser, (req, res) => {
    const userId = req.body.userId;
     const order = new Order({
        userId: req.body.userId,
        pickup: req.body.pickup,
        destination: req.body.destination,
        recName: req.body.recName,
        recPhoneNo: req.body.recPhoneNo,
        userPhoneNo: req.body.userPhoneNo,
        currentLocation: req.body.currentLocation
    });
     order
     .save()
     .then((result)=> {
         console.log(result);
         res.status(201).json({
             msg: "order created",
             createdOrder: result
         })
     })
    
     .catch((err) => {
         console.log(err);
         res.status(404).json({
             msg: "an error occured",
             error: err
         })
     })
});

//getorder by id
router.get('/:id', (req, res) => {
        const id = req.params.id;
        Order.findById({_id: id})
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                status: '200',
                order: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                status: '404',
                error: err
            })
        })
});

//get all orders
router.get('/', authorizeUser, (req, res) => {
    Order.find()
    .exec()
    .then((results) => {
        const response = {
            NoOfOrders: results.length,
            orders: results.map(result => {
                return{
                    _id: result._id,
                    userId: result.userId,
                    pickup: result.pickup,
                    destination: result.destination,
                    recName: result.recName,
                    recPhoneNo: result.recPhoneNo,
                    userPhoneNo: result.userPhoneNo,
                    currentLocation: result.currentLocation
                }
            })
            
        }
        res.status(200).json(response);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).json({
            error: err
        })
    })
  
});

//delete request
router.delete('/:id', authorizeUser, (req, res) => {
    const id = req.params.id
    Order.remove({_id: id})
    .exec()
    .then((result) => {
        res.status(200).json({
            message: 'order deleted'
        })
    })
    .catch((err) => {
        res.status(404).json({
            error: err
        })
    })
});
//update request
router.put('/:id', authorizeUser, (req, res) =>{
    const id = req.params.id;
    const newData = req.body;
    Order.update({_id: id}, newData)
    .exec()
    .then((result)=> {
        res.status(200).json({
            message: 'data updated',
            updatedData: result
        })
    })
    .catch((err) => {
        res.status(401).json({
            message: 'an error occured',
            error: err
        })
    })
    
});

//patch request
router.patch('/:id', authorizeUser, (req, res) =>{
    const id = req.params.id;
    const newData = req.body;
    Order.update({_id: id}, newData)
    .exec()
    .then((result)=> {
        res.status(200).json({
            message: 'data patched',
            updatedData: result
        })
    })
    .catch((err) => {
        res.status(401).json({
            message: 'an error occured',
            error: err
        })
    })  
});






module.exports = router;
