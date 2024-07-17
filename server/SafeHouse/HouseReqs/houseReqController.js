const houseSchema = require('../houseSchema');
const houseReqSchema = require('./houseReqSchema');
const jwt = require('jsonwebtoken');



// Register a new issue
const addReq= async (req, res) => {
  try {
    const {userId,houseId } = req.body;
let suppdata=await houseSchema.findById({_id:houseId})
    const newCase= new houseReqSchema({
        houseId,
      userId,
      suppId:suppdata.supporterId,
      date:new Date()
    });

    await newCase.save()
      .then(data => {
        return res.json({
          status: 200,
          msg: 'Inserted successfully',
          data: data
        });
      })
      .catch(err => {
        console.log("err",err);
        return res.json({
          status: 500,
          msg: 'Data not inserted',
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all 
const viewpendingReqsBySuppId= (req, res) => {
    houseReqSchema.find({suppId:req.params.id,status:'pending'}).populate('userId houseId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No data obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};
const viewhouseReqsByUserId= (req, res) => {
    houseReqSchema.find({userId:req.params.id}).populate('suppId houseId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No data obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};



// View issue by ID
const viewHouseReqById = (req, res) => {
    houseReqSchema.findById({ _id: req.params.id }).populate('userId houseId suppId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};

// View issue by ID
const approveReqByUserId = (req, res) => {
    houseReqSchema.findByIdAndUpdate({ _id: req.params.id },{status:"approved"})
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};

const rejectHouseByUserId = (req, res) => {
    houseReqSchema.findByIdAndUpdate({ _id: req.params.id },{status:"rejected"})
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};



module.exports = {
  addReq,
  viewhouseReqsByUserId,
  viewHouseReqById,
  viewpendingReqsBySuppId,
  approveReqByUserId,
  rejectHouseByUserId,
};
