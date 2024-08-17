const reqSchema = require('../LP-UserRequests/reqSchema');
const Payment = require('./payments');

const mongoose = require('mongoose');

// Register a new payment
const registerPayment = async (req, res) => {
  try {

    const { lpId,appId,  payment, category } = req.body;
const datas=await reqSchema.findById(appId)
    const newPayment = new Payment({
      userId:datas.userId,
      date:new Date(),
      lpId,
      payment,
      category,
      appId
    });

    await newPayment.save()
      .then(data => {
        return res.json({
          status: 200,
          msg: 'Payment registered successfully',
          data: data,
        });
      })
      .catch(err => {
        console.log("Error:", err);
        return res.json({
          status: 500,
          msg: 'Payment registration failed',
          data: err,
        });
      });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// View all payments
const viewPayments = (req, res) => {
  Payment.find()
    .populate('userId lpId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Payments obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No payments found',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Failed to obtain payments',
        Error: err,
      });
    });
};

// View payments by user ID
const viewPaymentsByUserId = (req, res) => {
  Payment.find({ userId: req.params.id }).sort({createdAt:-1})
    .populate('lpId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Payments obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No payments found for this user',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Failed to obtain payments for this user',
        Error: err,
      });
    });
};


// View payments by user ID
const addPaymentsId = (req, res) => {
  Payment.findByIdAndUpdate({ _id: req.params.id },{paymentStatus:"paid"})
    .exec()
    .then(data => {
      if (data) {
        res.json({
          status: 200,
          msg: 'Payments obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No payments found for this user',
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: 500,
        msg: 'Failed to obtain payments for this user',
        Error: err,
      });
    });
};

// View payments by LP ID
const viewPaymentsByLPId = (req, res) => {
  Payment.find({ lpId: req.params.id }).sort({createdAt:-1})
    .populate('userId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Payments obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No payments found for this LP',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Failed to obtain payments for this LP',
        Error: err,
      });
    });
};

// View payments by LP ID
const viewPaymentsById = (req, res) => {
  Payment.findById( req.params.id )
    .exec()
    .then(data => {
      if (data) {
        res.json({
          status: 200,
          msg: 'Payments obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No payments found for this LP',
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: 500,
        msg: 'Failed to obtain payments for this LP',
        Error: err,
      });
    });
};

// View payments by LP ID
const viewPaymentsByAppId = (req, res) => {
  Payment.find({ appId: req.params.id }).sort({createdAt:-1})
    .populate('userId lpId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Payments obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No payments found for this LP',
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: 500,
        msg: 'Failed to obtain payments for this LP',
        Error: err,
      });
    });
};

module.exports = {
  registerPayment,
  viewPayments,
  viewPaymentsByUserId,
  viewPaymentsByLPId,
  viewPaymentsByAppId,
  addPaymentsId,
  viewPaymentsById
};

