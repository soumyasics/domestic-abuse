const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },


    date: Date,
    title: {
      type: String,
      required: true,
    },
    supporterId: {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: "supporters",
    },
    lpId: {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: "legalprofessionals",
    },
   counsellorId: {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: "counsellors",
    },
    image: {
      type: Object,
    },
    isActive:{
     type:Boolean,
    default:true
    }
  },

  { timestamps: true }
);
module.exports = new mongoose.model("blogs", blogSchema);
