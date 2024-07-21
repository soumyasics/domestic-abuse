const Issue = require('./IssuesSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'issue-';
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single('file');

// Register a new issue
const registerIssue = async (req, res) => {
  try {
    const { type, description, severity, location, contact } = req.body;

    const newIssue = new Issue({
      type,
      description,
      severity,
      location,
      file: req.file,
      contact,
      userId:req.params.id
    });

    await newIssue.save()
      .then(data => {
        return res.json({
          status: 200,
          msg: 'Inserted successfully',
          data: data,
        });
      })
      .catch(err => {
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

// View all issues
const viewIssues = (req, res) => {
  Issue.find()
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

const viewPendingIssues = (req, res) => {
  Issue.find({suppStatus:false}).populate('userId')
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

const viewSupportedIssues = (req, res) => {
  Issue.find({suppStatus:true,userId:req.params.id})
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

const viewPendingIssuesByUserId = (req, res) => {
  Issue.find({userId:req.params.id,suppStatus:false})
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
const editIssueById = async (req, res) => {
  const { type, description, severity, location, dateTime, contact } = req.body;

  await Issue.findByIdAndUpdate(
    { _id: req.params.id },
    {
      type,
      description,
      severity,
      location,
      file: req.file,
      dateTime,
      contact,
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
const viewIssueById = (req, res) => {
  Issue.findById({ _id: req.params.id }).populate('userId')
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
const deleteIssueById = (req, res) => {
  Issue.findByIdAndDelete({ _id: req.params.id })
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

// JWT authentication middleware
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.json({ status: 401, msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.json({ status: 401, msg: 'Unauthorized', err: err });
    }

    req.user = decodedToken.userId;
    next();
  });
};

module.exports = {
  registerIssue,
  viewIssues,
  editIssueById,
  viewIssueById,
  deleteIssueById,
  upload,
  requireAuth,
  viewPendingIssues,
  viewPendingIssuesByUserId,
  viewSupportedIssues
};
