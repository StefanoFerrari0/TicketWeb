const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  lastUserEdit: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  
  isDelete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model("Role", roleSchema);
