const Counsellors = require('./counsellorSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const secret = 'CounsellorsSecret'; // Replace this with your own secret key



const registerCounsellors = async (req, res) => {
    try {
        const { name, contact, email, password, experience, specialisation, language, location } = req.body;

        const newCounsellor = new Counsellors({
            name,
            contact,
            email,
            password,
            experience,
            specialisation,
            language,
            location
        });

        let existingCounsellor = await Counsellors.findOne({ contact });
        if (existingCounsellor) {
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }

        await newCounsellor.save()
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
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// View all Counsellors
const viewCounsellors = (req, res) => {
    Counsellors.find({})
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

// Update Counsellors by ID
const editCounsellorsById = async (req, res) => {
    let flag = 0;
    const { name, contact, email, password, experience, specialisation, language, location } = req.body;
    let existingCounsellors = await Counsellors.find({ contact });
    let counsellorData = await Counsellors.findById({ _id: req.params.id });

    await existingCounsellors.map(x => {
        if (contact != counsellorData.contact) {
            if (x.contact != counsellorData.contact) {
                flag = 1;
            }
        }
    });

    if (flag == 0) {
        await Counsellors.findByIdAndUpdate({ _id: req.params.id }, {
            name,
            contact,
            email,
            password,
            experience,
            specialisation,
            language,
            location
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

// View Counsellors by ID
const viewCounsellorsById = (req, res) => {
    Counsellors.findById({ _id: req.params.id })
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

// Forgot Password for Counsellors
const forgotPassword = (req, res) => {
    Counsellors.findOneAndUpdate({ email: req.body.email }, {
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

// Reset Password for Counsellors
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await Counsellors.findById({ _id: req.params.id })
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
        await Counsellors.findByIdAndUpdate({ _id: req.params.id }, {
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

const login = async (req, res) => {
    const { email, password } = req.body;

    await Counsellors.findOne({ email }).then(user => {
        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }
        if (user.password != password) {
            return res.json({ status: 407, msg: 'Password Mismatch !!' });
        }

        if (user.adminApproved == false) {
            return res.json({ status: 409, msg: 'Please wait for Admin Approval !!' });
        }
        if (!user.isActive) {
            return res.json({ status: 409, msg: 'Your Account is Currently De-Activated By Admin !!' });
        } else {
            const token = createToken(user);

            res.json({
                status: 200,
                data: user,
                token
            });
        }
    }).catch(err => {
        console.log(err);
        return res.json({ status: 500, msg: 'Something went wrong' });
    });
};

// validate

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

// View all Counsellors to be accepted/rejected
const viewCounsellorReqsForAdmin = (req, res) => {
    Counsellors.find({ adminApproved: false })
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

// Approve Counsellors by ID
const approveCounsellorsById = (req, res) => {
    Counsellors.findByIdAndUpdate({ _id: req.params.id }, { adminApproved: true, isActive: true })
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

// Reject Counsellors by ID
const rejectCounsellorsById = (req, res) => {
    Counsellors.findByIdAndDelete({ _id: req.params.id })
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

// Remove Counsellors by ID
const removeCounsellorsById = (req, res) => {
    Counsellors.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
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

// Activate Counsellors by ID
const activateCounsellorsById = (req, res) => {
    Counsellors.findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "User Activated successfully",
                data: data
            });
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

module.exports = {
    registerCounsellors,
    viewCounsellors,
    editCounsellorsById,
    viewCounsellorsById,
    forgotPassword,
    resetPassword,
    login,
    requireAuth,
    viewCounsellorReqsForAdmin,
    approveCounsellorsById,
    removeCounsellorsById,
    rejectCounsellorsById,
    activateCounsellorsById
};
