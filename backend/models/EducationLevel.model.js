const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationLevelSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
      required: true,
    },
    slug: {
      type: String,
      default: null,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EducationLevel", educationLevelSchema);
