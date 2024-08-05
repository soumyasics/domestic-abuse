const LegalProfessionals = require('./legalProfessionalSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const secret = 'LegalProfessionals';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'prefix-'; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'proof', maxCount: 1 }
]);
const uploadSingle = multer({ storage: storage }).single('photo')
// Register Legal Professionals
const registerLegalProfessional = async (req, res) => {
  try {
    const { name, contact, email, password, barAssociationId, firmName, licenseNumber } = req.body;

    const newLegalProfessional = new LegalProfessionals({
      name,
      contact,
      email,
      password,
      barAssociationId,
      firmName,
      
      licenseNumber,
      photo: req.files['photo'][0],
      proof: req.files['proof'][0],
    });
    console.log(newLegalProfessional);
    let existingLegalProfessional = await LegalProfessionals.findOne({ contact });
    if (existingLegalProfessional) {
      return res.json({
        status: 409,
        msg: "Contact Number Already Registered With Us !!",
        data: null
      });
    }

    await newLegalProfessional.save()
      .then(data => {
        return res.json({
          status: 200,
          msg: "Inserted successfully",
          data: data
        });
      })
      .catch(err => {
        console.log(err);
        if (err.code === 11000) {
          return res.json({
            status: 409,
            msg: "Email already in use",
            data: err
          });
        }
        return res.json({
          status: 500,
          msg: "Data not Inserted",
          data: err
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all Legal Professionals
const viewLegalProfessionals = (req, res) => {
  LegalProfessionals.find({adminApproved:true})
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: "Data not obtained",
        Error: err
      });
    });
};

// Update Legal Professional by ID
const editLegalProfessionalById = async (req, res) => {
  let flag = 0;
  const { name, contact, email, password, barAssociationId, firmName, language, licenseNumber } = req.body;
  let existingLegalProfessionals = await LegalProfessionals.find({ contact });
  let legalProfessionalData = await LegalProfessionals.findById(req.params.id);

  existingLegalProfessionals.map(x => {
    if (contact !== legalProfessionalData.contact) {
      if (x.contact !== legalProfessionalData.contact) {
        flag = 1;
      }
    }
  });
  console.log("req.",req.file);

  if (flag === 0) {
    await LegalProfessionals.findByIdAndUpdate(req.params.id, {
      name,
      contact,
      email,
      password,
      barAssociationId,
      firmName,
      language,
      licenseNumber,
      photo: req.file,
    
    })
      .exec()
      .then(data => {
        res.json({
          status: 200,
          msg: "Updated successfully"
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: "Data not Updated",
          Error: err
        });
      });
  } else {
    return res.json({
      status: 409,
      msg: "Contact Number Already Registered With Us !!",
      data: null
    });
  }
};

// View Legal Professional by ID
const viewLegalProfessionalById = (req, res) => {
  LegalProfessionals.findById(req.params.id)
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err
      });
    });
};

// Forgot Password for Legal Professional
const forgotPassword = (req, res) => {
  LegalProfessionals.findOneAndUpdate({ email: req.body.email }, {
    password: req.body.password
  })
    .exec()
    .then(data => {
      if (data !== null) {
        res.json({
          status: 200,
          msg: "Updated successfully"
        });
      } else {
        res.json({
          status: 500,
          msg: "User Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      });
    });
};

// Reset Password for Legal Professional
const resetPassword = async (req, res) => {
  let pwdMatch = false;
console.log(req.body);

  await LegalProfessionals.findById(req.params.id)
    .exec()
    .then(data => {
      if (data.password === req.body.oldPassword) {
        pwdMatch = true;
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      });
    });

  if (pwdMatch) {
    await LegalProfessionals.findByIdAndUpdate(req.params.id, {
      password: req.body.newPassword
    })
      .exec()
      .then(data => {
        if (data !== null) {
          res.json({
            status: 200,
            msg: "Updated successfully"
          });
        } else {
          res.json({
            status: 500,
            msg: "User Not Found"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: "Data not Updated",
          Error: err
        });
      });
  } else {
    res.json({
      status: 405,
      msg: "Your Old Password doesn't match"
    });
  }
};

// Login for Legal Professional
const login = async (req, res) => {
  const { email, password } = req.body;

  await LegalProfessionals.findOne({ email }).then(user => {
    if (!user) {
      return res.json({ status: 405, msg: 'User not found' });
    }
    if (user.password !== password) {
      return res.json({ status: 405, msg: 'Password Mismatch !!' });
    }

    if (!user.adminApproved) {
      return res.json({ status: 409, msg: 'Please wait for Admin Approval !!' });
    }

    if (!user.isActive) {
      return res.json({ status: 409, msg: 'Your Account is Currently De-Activated By Admin !!' });
    }

    const token = createToken(user);

    res.json({
      status: 200,
      data: user,
      token
    });
  }).catch(err => {
    console.log(err);
    return res.json({ status: 500, msg: 'Something went wrong' });
  });
};

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.json({ status: 401, msg: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.json({ status: 401, message: 'Unauthorized', err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.json({ status: 200, msg: 'ok', user: decodedToken.userId });
  });
};

// View all Legal Professionals pending Admin Approval
const viewLegalProfessionalReqsForAdmin = (req, res) => {
  LegalProfessionals.find({ adminApproved: false })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data
      });
    })
    .catch(err => {
      log
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err
      });
    });
};

// Approve Legal Professional by ID
const approveLegalProfessionalById = (req, res) => {
  LegalProfessionals.findByIdAndUpdate(req.params.id, { adminApproved: true, isActive: true })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: "Approved successfully",
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: "Approval Failed",
        Error: err
      });
    });
};

// Deactivate Legal Professional by ID
const deActivateLegalProfessionalById = (req, res) => {
    LegalProfessionals.findByIdAndUpdate(req.params.id, {isActive: false })
      .exec()
      .then(data => {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: "Data not Updated",
          Error: err
        });
      });
  };
  
// Approve Legal Professional by ID
const activateLegalProfessionalById = (req, res) => {
    LegalProfessionals.findByIdAndUpdate(req.params.id, {isActive: true })
      .exec()
      .then(data => {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: "Data not Updated",
          Error: err
        });
      });
  };

// Delete or Reject Legal Professional by ID
const deleteLegalProfessionalById = (req, res) => {
    LegalProfessionals.findByIdAndDelete(req.params.id)
      .exec()
      .then(data => {
        res.json({
          status: 200,
          msg: "Rejected successfully",
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: "Rejection Failed",
          Error: err
        });
      });
  };
  
// Function to create JWT token
function createToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '1h' });
}

module.exports = {
  registerLegalProfessional,
  viewLegalProfessionals,
  editLegalProfessionalById,
  viewLegalProfessionalById,
  forgotPassword,
  resetPassword,
  login,
  requireAuth,
  viewLegalProfessionalReqsForAdmin,
  approveLegalProfessionalById,
  upload,
  deleteLegalProfessionalById,
  activateLegalProfessionalById,
  deActivateLegalProfessionalById,
  uploadSingle
};
