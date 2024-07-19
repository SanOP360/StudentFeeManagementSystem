const express = require("express");
const router = express.Router();
const {
  createStudent,
  editStudent,
  getStudent,
  getStudents,
} = require("../controllers/student.controller");
const { verifyToken } = require("../utils/verifyUser");

router.get("/", verifyToken,getStudents);
router.get("/:id", verifyToken, getStudent);
router.post("/",  verifyToken,createStudent);
router.put("/:id", verifyToken, editStudent);

module.exports = router;
