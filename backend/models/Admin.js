const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
  },
  password: { type: String, required: true }
}, { timestamps: true }); // adds createdAt & updatedAt

module.exports = mongoose.model("Admin", adminSchema);
