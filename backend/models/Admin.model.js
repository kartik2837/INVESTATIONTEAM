const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    // profilepic: {
    //   type: String,
    //   default: null,
    //   require: true,
    // },
    name: {
      type: String,
      default: null,
      require: true,
    },
    username: {
      type: String,
      default: null,
      require: true,
    },
    email: {
      type: String,
      default: null,
      require: true,
    },
    number: {
      type: String,
      default: null,
      require: true,
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
