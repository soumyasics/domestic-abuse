const blogSchema = require("./blogSchema");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('image');

const addBlog = (req, res) => {
  const newBlog = new blogSchema({
   title: req.body.title,
    content: req.body.content,
    supporterId: req.body.supporterId,
    lpId: req.body.lpId,
    counsellorId: req.body.counsellorId,
    date:new Date(),
    image: req.file,
  });
  newBlog
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err.stack,
      });
    });
};

//View   blogs by  id

const viewBlogsById = (req, res) => {
  blogSchema
    .findById({ _id: req.params.id })
    .populate("supporterId")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//View  all blogs

const viewAllBlogs = (req, res) => {
  blogSchema
    .find({isActive:true}).sort({createdAt:-1})
    .populate("supporterId lpId counsellorId")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//View   blogs by RP id

const viewMyBlogsBysupporterId = (req, res) => {
  blogSchema
    .find({ supporterId: req.params.id }).sort({createdAt:-1})
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const viewMyBlogsByCounsellorId = (req, res) => {
  blogSchema
    .find({ counsellorId: req.params.id }).sort({createdAt:-1})
   
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//View   blogs by  id


const viewMyBlogsByLPId = (req, res) => {
  blogSchema
    .find({ lpId: req.params.id }).sort({createdAt:-1})
   
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const deleteBlogsById = (req, res) => {
  blogSchema
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//View   blogs by  id

const editBlogsById = (req, res) => {
  console.log( req.params.id);
  blogSchema
  
    .findByIdAndUpdate({ _id: req.params.id },{
      title: req.body.title,
      content: req.body.content,
      
      image: req.file,
    })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data Updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

module.exports = {
  addBlog,
  upload,
  viewAllBlogs,
  viewBlogsById,
viewMyBlogsBysupporterId,
    deleteBlogsById,
    editBlogsById,
    viewMyBlogsByCounsellorId,
    viewMyBlogsByLPId
};
