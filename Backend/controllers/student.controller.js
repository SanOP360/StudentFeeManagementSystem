const Student = require("../models/student.model");


const getStudents = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const rollNumber = req.query.rollNumber || "";
    const name = req.query.name || "";
    const paymentStatus = req.query.paymentStatus || {
      $in: ["Paid", "Unpaid"],
    };
    const studentClass = parseInt(req.query.class) || { $exists: true };

    const studentsQuery = {
      rollNumber: { $regex: rollNumber, $options: "i" },
      name: { $regex: name, $options: "i" },
      paymentStatus: paymentStatus,
      class: studentClass,
    };

    const students = await Student.find(studentsQuery)
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(startIndex);

    const totalStudents = await Student.countDocuments(studentsQuery);

    return res.status(200).json({
      students,
      pagination: {
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: Math.floor(startIndex / limit) + 1,
      },
    });
  } catch (error) {
    next(error);
  }
};




const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

const editStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const editedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(editedStudent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudent,
  createStudent,
  editStudent,
  getStudents,
};
