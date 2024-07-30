const Case = require('./caseSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const reqSchema = require('../LP-UserRequests/reqSchema');
const { login } = require('../Supporter/supporterController');



// Register a new issue
const registerCase= async (req, res) => {
  try {
    const { description,status,date } = req.body;
console.log(req.params.id);
const appData=await reqSchema.findById(req.params.id)
    const newCase= new Case({
      status,
      description,
      status,
      userId:appData.userId,
      issueId:appData.issueId,

      lpId:appData.lpId,
      date:date
    });

    await newCase.save()
      .then(data => {
        return res.json({
          status: 200,
          msg: 'Inserted successfully',
          data: data,
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
    console.log("err",error);

    res.status(500).json({ message: error.message });
  }
};

// View all 
const viewCases = (req, res) => {
  Case.find()
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

// View all issues
const viewPendingCases = (req, res) => {
  Case.find({lpStatus:false}).populate('userId')
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
// Update issue by ID
const editCaseById = async (req, res) => {
  const {description,location, title,date} = req.body;

  await Case.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title,
      description,
      location,
      date
    }
  )
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Updated successfully',
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not updated',
        Error: err,
      });
    });
};

// View issue by ID
const viewCaseById = (req, res) => {
  Case.findById({ _id: req.params.id }).populate('userId')
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
const viewCaseByUserId = (req, res) => {
  Case.find({ userId: req.params.id }).populate('lpId')
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
const viewCaseByLPId = (req, res) => {
  Case.find({ lpId: req.params.id }).populate('userId')
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
// Delete issue by ID
const deleteCaseById = (req, res) => {
  Case.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Deleted successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not deleted',
        Error: err,
      });
    });
};


module.exports = {
  registerCase,
  viewCases,
  editCaseById,
  viewCaseById,
  deleteCaseById,
  viewCaseByLPId,
  viewCaseByUserId,
  viewPendingCases
};
