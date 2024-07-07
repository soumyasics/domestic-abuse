const Safehouse = require('./houseSchema');

const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'safehouse-'; // Add your desired prefix here
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage }).single("image");

// Register a new safehouse
const registerSafehouse = async (req, res) => {
    try {
        const { name, contact, landmark, description, capacity, rent, licenseNo,supporterId } = req.body;

        const newSafehouse = new Safehouse({
            name,
            contact,
            landmark,
            description,
            capacity,
            rent,
            licenseNo,
            image: req.file,
            supporterId
        });
        
        let existingSafehouse = await Safehouse.findOne({ contact });
        if (existingSafehouse) {
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }

        await newSafehouse.save()
            .then(data => {
                console.log("data added",data);
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                console.log("data not added",err);
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

// View all safehouses
const viewSafehouses = (req, res) => {
    Safehouse.find({adminApproved:true})
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
            res.json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Update safehouse by ID
const editSafehouseById = async (req, res) => {
    let flag = 0;
    const { name, contact, landmark, description, capacity, rent, licenseNo } = req.body;
    let existingSafehouses = await Safehouse.findOne({ contact });
    let safehouseData = await Safehouse.findById(req.params.id);
console.log(contact != safehouseData.contact);
  
        if ( contact != safehouseData.contact) {
            console.log(existingSafehouses&&contact == existingSafehouses.contact);
            if (existingSafehouses&& contact == existingSafehouses.contact) {
                flag = 1;
                console.log(contact);
                return res.json({
                    status: 409,
                    msg: "Contact Number Already Registered With Us !!",
                    data: null
                });
                
            }
        }
    console.log("flag",flag);

    if (flag == 0) {
        await Safehouse.findByIdAndUpdate(req.params.id, {
            name,
            contact,
            landmark,
            description,
            capacity,
            rent,
            licenseNo,
            image: req.file
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
       console.log("grfgrfg");
    }
};

// View safehouse by ID
const viewSafehouseById = (req, res) => {
    console.log("id",req.params.id);
    Safehouse.findById({_id:req.params.id}).populate('supporterId')
        .exec()
        .then(data => {
            console.log(data);
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


// View safehouse by ID
const viewSafehouseBySupporterId = (req, res) => {
    console.log("id",req.params.id);
    Safehouse.find({supporterId:req.params.id})
        .exec()
        .then(data => {
            console.log(data);
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
const viewSafehouseReqsForAdmin = (req, res) => {
    Safehouse.find({adminApproved:false})
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

// Approve safehouse by ID
const approveSafehouseById = (req, res) => {
    Safehouse.findByIdAndUpdate(req.params.id, { adminApproved: true, isActive: true })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Safehouse approved successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Reject safehouse by ID
const rejectSafehouseById = (req, res) => {
    Safehouse.findByIdAndDelete(req.params.id)
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

// Remove safehouse by ID
const deActivateSafehouseById = (req, res) => {
    Safehouse.findByIdAndUpdate(req.params.id, { isActive: false })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Safehouse deactivated successfully",
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

// Activate safehouse by ID
const activateSafehouseById = (req, res) => {
    Safehouse.findByIdAndUpdate(req.params.id, { isActive: true })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Safehouse activated successfully",
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
    registerSafehouse,
    viewSafehouses,
    editSafehouseById,
    viewSafehouseById,
    viewSafehouseReqsForAdmin,
    upload,
    approveSafehouseById,
    deActivateSafehouseById,
    rejectSafehouseById,
    activateSafehouseById,
    viewSafehouseBySupporterId
};
