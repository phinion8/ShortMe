const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
      urlId: {
            type: String,
            required: true,
            unique: true 
      },
      redirectUrl:{
            type: String,
            required: true
      },
      viewHistory: [
            {
                  timeStamp: {type: Number}
            }
      ],
      createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
      }
}, {timestamps: true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;