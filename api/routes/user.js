const express = require('express');
const { authorizeUser } = require('../../auth/auth');
const User = require('../models/userReg');
const Order = require('../models/orders');
const router = express.Router();

router.delete('/:userId/delete', authorizeUser, (req, res) => {
    const userId = req.params.userId;
    User.remove({_id: userId})
    .exec()
    .then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'user deleted'
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err

        })
    })
});

router.get('/:userId/order', authorizeUser, (req, res) => {
      Order.find({userId: req.params.userId})
      .exec()
      .then((orders) => {
          res.status(200).json({
              orders: orders
          });
        })
        .catch((err) =>{
            res.json({
                message: 'an error occured',
                error: err
            })
        })
     });


module.exports = router;