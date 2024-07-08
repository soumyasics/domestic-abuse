const Supporters = require('./supporterSchema');
  const secret = 'Supporters'; // Replace this with your own secret key
const jwt=require('jsonwebtoken')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
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
  const upload = multer({ storage: storage }).single("image");
const registerSupporters = async (req, res) => {
    try {
         const { name,  contact, email,password,organization} = req.body;

        const newSupporters = new Supporters({
            name,
            contact,
            email,
            image:req.file,
            password,
            organization
        });

        
        let existingSupporters = await Supporters.findOne({ contact });
        if (existingSupporters) {
            return res.json({
                status: 409,
                msg: "contact Number Already Registered With Us !!",
                data: null
            });
        }
        await newSupporters.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
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


// View all Supporterss
const viewSupporters = (req, res) => {
    Supporters.find({adminApproved:true})
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

// Update Supporters by ID
const editSupportersById =async (req, res) => {
    let flag=0
    const { name,  contact, email,password,organization } = req.body;
    let existingSupporters = await Supporters.find({ contact });
    let SupportersData = await Supporters.findById({  _id: req.params.id  });
await existingSupporters.map(x=>{
    if(contact!=SupportersData.contact){
    if (x.contact!=SupportersData.contact) {
      flag=1        
    }
}
})

if(flag==0){
   
   await Supporters.findByIdAndUpdate({ _id: req.params.id }, {
    name,
    contact,
    email,
    image:req.file,
    password,
    organization
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
    }
    else{
        return res.json({
            status: 409,
            msg: "contact Number Already Registered With Us !!",
            data: null
        });
    }
};

// View Supporters by ID
const viewSupportersById = (req, res) => {
    Supporters.findById({ _id: req.params.id })
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


// Forgot Password for Supporters
const forgotPassword = (req, res) => {
    Supporters.findOneAndUpdate({ email: req.body.email }, {
        password: req.body.password
    })
        .exec()
        .then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found"
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

// Reset Password for Supporters
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await Supporters.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });

    if (pwdMatch) {
        await Supporters.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.newpassword
        })
            .exec()
            .then(data => {
                if (data != null)
                    res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                    res.json({
                        status: 500,
                        msg: "User Not Found"
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
        res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
  };
  
  const login =async (req, res) => {
    const { email, password } = req.body;
  
    await Supporters.findOne({ email }).then(user => {
     
  
      if (!user) {
        return res.json({status:405,msg: 'User not found' });
      }
      if (user.password!=password) {
           
          return res.json({ status:405,msg: 'Password Mismatch !!' });
        }
  
        if(user.adminApproved==false)
            {
                return res.json({ status:409,msg: 'Please wait for Admin Approval !!' });

            }
            if(!user.isActive)
                {
                    return res.json({ status:409,msg: 'Your Account is Currently De-Activated By Admin !!' });

                }
                else{
        const token = createToken(user);
  
        res.json({
            status:200,
            data:user, 
            token });
        }
    }).catch(err=>{
     console.log(err);
            return res.json({status:500,msg: 'Something went wrong' });
          
    })
}
  
     
  //validate
  
  const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    console.log("t1",token);
    console.log("secret",secret);
    if (!token) {
      return res.json({status:401,msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        return res.json({status:401, messagge: 'Unauthorized' ,err:err});
      }
  
      req.user = decodedToken.userId;
      next();
      return res.json({ status:200,msg: 'ok' ,user:decodedToken.userId});
    });
    console.log(req.user);
  };
  
  //Login Custome --finished

  // view all Supporters to be accepted/rejected
const viewSupporterReqsForAdmin = (req, res) => {
    Supporters.find({adminApproved:false})
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

// Approve Supporters by ID
const approveSupportersById = (req, res) => {
    Supporters.findByIdAndUpdate({ _id: req.params.id },{adminApproved:true,isActive:true})
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
// Reject Supporters by ID
const rejectSupportersById = (req, res) => {
    Supporters.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Removed successfully",
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

// Remove Supporters by ID
const removeSupportersById = (req, res) => {
    Supporters.findByIdAndUpdate({ _id: req.params.id },{isActive:false})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data removed successfully",
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

// Activate Supporters by ID
const activateSupportersById = (req, res) => {
    Supporters.findByIdAndUpdate({ _id: req.params.id },{isActive:true})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "User Activated successfully",
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
module.exports = {
    registerSupporters,
    viewSupporters,
    editSupportersById,
    viewSupportersById,
    forgotPassword,
    resetPassword,
    login,
    requireAuth,
    upload,
    viewSupporterReqsForAdmin,
    approveSupportersById,
    removeSupportersById,
    rejectSupportersById,
    activateSupportersById
    
};
