const Case = require('./reqSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');



// Register a new issue
const addReq= async (req, res) => {
  try {
    const { issueId,lpId,date } = req.body;
   let cases= await Case.findOne({issueId:issueId,userId:req.params.id,lpId:lpId})
if(cases){
  return res.json({
    status: 409,
    msg: 'You Have already send Request to this Advocate successfully'
})
}
console.log("ok",req.params.id,lpId,issueId);
    const newCase= new Case({

      issueId,
      userId:req.params.id,
      lpId,
      date:new Date()
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
    res.status(500).json({ message: error.message });
  }
};

// View all 
const viewCasePendingReqsByLpId= (req, res) => {
  Case.find({lpId:req.params.id,lpStatus:'pending'}).populate('userId issueId')
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

// View all 
const getLpReqStatusForSugge=async(req, res) => {
  let approved=0,pending=0,rejected=0
  try{
 const apprData=await Case.find({issueId:req.params.id,lpStatus:'approved'}).populate('lpId').sort({createdAt:-1}).limit(1)
 const pendData=await Case.find({issueId:req.params.id,lpStatus:'pending'}).populate('lpId').sort({createdAt:-1}).limit(1)
 const rejData=await Case.find({issueId:req.params.id,lpStatus:'rejected'}).populate('lpId').sort({createdAt:-1}).limit(1)
if(apprData.length>0)
  approved=apprData.length
if(pendData.length>0)
  pending=pendData.length
if(rejData.length>0)
  rejected=rejData.length
   
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: {rejected,
          approved,
          pending}
        });
      }
     catch (error) {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: error,
      });
    }
};
const viewCaseApprovedReqsByLpId= (req, res) => {
  Case.find({lpId:req.params.id,lpStatus:'approved'}).populate('userId issueId caseId')
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
const viewCaseReqsByUserId = (req, res) => {
  Case.find({userId:req.params.id}).populate('lpId issueId  caseId')
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
      console.log(err);
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};

// View all issues
const viewCaseReqsByIssueId = (req, res) => {
  Case.find({issueId:req.params.id}).populate('lpId issueId')
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
      console.log("err",err);
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};

// View issue by ID
const viewCaseReqById = (req, res) => {
  Case.findById({ _id: req.params.id }).populate('userId issueId caseId lpId')
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
const approveCaseByUserId = (req, res) => {
  Case.findByIdAndUpdate({ _id: req.params.id },{lpStatus:"approved"})
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

const rejectCaseByUserId = (req, res) => {
  Case.findByIdAndUpdate({ _id: req.params.id },{lpStatus:"rejected"})
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
  viewCaseApprovedReqsByLpId,
  viewCaseReqById,
  viewCasePendingReqsByLpId,
  approveCaseByUserId,
  rejectCaseByUserId,
  viewCaseReqsByUserId,
  viewCaseReqsByIssueId,
  getLpReqStatusForSugge
};
