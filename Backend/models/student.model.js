const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  fees: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid"], required: true },
  address: String,
  parentName: String,
  parentContact: String,
  gender: String,
  image: String,
  class:Number,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
