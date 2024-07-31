const Case = require('./caseSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const reqSchema = require('../LP-UserRequests/reqSchema');
const { login } = require('../Supporter/supporterController');
const Issue=require('../UserIssues/IssuesSchema')


// Register a new issue
const registerCase= async (req, res) => {
  try {
    const { description,status,date,title } = req.body;
console.log(req.params.id);
const appData=await reqSchema.findById(req.params.id)
    const newCase= new Case({
      title,
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

// View issue by ID
const viewCaseByissueId =async (req, res) => {
  const appData=await reqSchema.findById(req.params.id)

  await  Case.find({ issueId: appData.issueId }).populate('userId issueId')
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
const viewOneCaseByissueId =async (req, res) => {

  await  Case.findOne({ issueId: req.params.id })
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
const viewCaseByissueIdNew =async (req, res) => {

  await  Case.find({ issueId:req.params.id }).populate('userId issueId lpId')
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

const viewUniqueIssuesByUserId = (req, res) => {
  Case.find({ userId: req.params.id }).select('issueId') // Find cases for the user
    .exec()
    .then(cases => {
      // Extract issueIds and remove duplicates
      const issueIds = cases.map(caseDoc => caseDoc.issueId.toString());
      const uniqueIssueIds = [...new Set(issueIds)];

      // Fetch issue details for unique issueIds
      return Issue.find({ _id: { $in: uniqueIssueIds } }).exec();
    })
    .then(issues => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: issues,
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
  registerCase,
  viewCases,
  editCaseById,
  viewCaseById,
  deleteCaseById,
  viewCaseByLPId,
  viewCaseByissueId,
  viewCaseByUserId,
  viewPendingCases,
  viewUniqueIssuesByUserId,
  viewCaseByissueIdNew,viewOneCaseByissueId
};
