const User = require('./userSchema');
const secret = 'your_secret_key'; 
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'prefix-'; 
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single('image');

// Create token
const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password,  dob, gender, address, relation, aadhar } = req.body;
    let existingUser1 = await User.findOne({ aadhar });

    


    const newUser = new User({
      name,
      email,
      contact,
    password,
      dob,
      gender,
      address,
      relation,
      aadhar,
      image: req.file ? req.file : null
    });

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: 409, msg: "Email already registered" });
    }
    if(existingUser1){
      flag=1
      return res.json({ status: 409, msg: "Aadhar Number already been registered with us !!" });
    
    }
    await newUser.save();
    res.status(201).json({ status: 200, msg: "User registered successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// View all Users
const viewUsers = (req, res) => {
  User.find({})
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({ status: 200, msg: "Data obtained successfully", data: data });
      } else {
        res.json({ status: 200, msg: "No data found" });
      }
    })
    .catch(err => {
      res.status(500).json({ status: 500, msg: "Data not obtained", Error: err });
    });
};

// Update User by ID
const editUserById = async (req, res) => {
  let flag = 0;
  const { name, email, contact, dob, gender, address, relation, aadhar } = req.body;

  let existingUser = await User.find({ contact });
  let userData = await User.findById({ _id: req.params.id });

  await existingUser.map(x => {
    if (contact != userData.contact) {
      if (x.contact != userData.contact) {
        flag = 1;
      }
    }
  });

  if (flag == 0) {
    const updatedData = {
      name,
      contact,
      email,
      dob,
      gender,
      address,
      relation,
      aadhar,
      image: req.file
    };

   

    await User.findByIdAndUpdate({ _id: req.params.id }, updatedData)
      .exec()
      .then(data => {
        res.json({ status: 200, msg: "Updated successfully" });
      })
      .catch(err => {
        res.status(500).json({ status: 500, msg: "Data not updated", Error: err });
      });
  } else {
    return res.json({ status: 409, msg: "Contact number or Aadhar Number already been registered with us !!" });
  }
};

// View User by ID
const viewUserById = (req, res) => {
  User.findById({ _id: req.params.id })
    .exec()
    .then(data => {
      res.json({ status: 200, msg: "Data obtained successfully", data: data });
    })
    .catch(err => {
      res.status(500).json({ status: 500, msg: "No data obtained", Error: err });
    });
};


// View User by ID
const activateUserById = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id },{isActive:true})
      .exec()
      .then(data => {
        res.json({ status: 200, msg: "Data obtained successfully", data: data });
      })
      .catch(err => {
        res.status(500).json({ status: 500, msg: "No data obtained", Error: err });
      });
  };
  const deActivateUserById = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id },{isActive:false})
      .exec()
      .then(data => {
        res.json({ status: 200, msg: "Data obtained successfully", data: data });
      })
      .catch(err => {
        res.status(500).json({ status: 500, msg: "No data obtained", Error: err });
      });
  };
// Forgot Password
const forgotPassword = (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, { password: req.body.password })
    .exec()
    .then(data => {
      if (data != null)
        res.json({ status: 200, msg: "Updated successfully" });
      else
        res.json({ status: 500, msg: "User not found" });
    })
    .catch(err => {
      res.status(500).json({ status: 500, msg: "Data not updated", Error: err });
    });
};

// Reset Password
const resetPassword = async (req, res) => {
  let pwdMatch = false;
  console.log("err",req.body);
  await User.findById({ _id: req.params.id })
    .exec()
    .then(data => {
      if (data.password === req.body.oldPassword)
        pwdMatch = true;
    })
    .catch(err => {
      console.log(err);
      
      res.status(500).json({ status: 500, msg: "Data not updated", Error: err });
    });

  if (pwdMatch) {
    await User.findByIdAndUpdate({ _id: req.params.id }, { password: req.body.newPassword })
      .exec()
      .then(data => {
        if (data != null)
          res.json({ status: 200, msg: "Updated successfully" });
        else
          res.json({ status: 500, msg: "User not found" });
      })
      .catch(err => {
        console.log(err);
        
        res.status(500).json({ status: 500, msg: "Data not updated", Error: err });
      });
  } else {
    res.json({ status: 405, msg: "Your old password doesn't match" });
  }
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;
  console.log("data",email,password);
    await User.findOne({ email }).then(user => {
     console.log(user);
  
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
};

// Middleware to require authentication
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

// Export the controller functions
module.exports = {
  registerUser,
  viewUsers,
  editUserById,
  viewUserById,
  forgotPassword,
  resetPassword,
  login,
  requireAuth,
  upload,
  activateUserById,
  deActivateUserById
}
