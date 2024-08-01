const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      
    },
    issueId:{
         type: mongoose.Schema.Types.ObjectId,
    ref: "issues"
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
   lpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "legalprofessionals"
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    suppId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "supporters"
      },
  date:{
      type: Date,
      required: true,
    },
    timestamp:{
      type: String,
    }

  },
  { timestamps: true }
);

const Message = mongoose.model("chats", messageSchema);

module.exports = Message;
