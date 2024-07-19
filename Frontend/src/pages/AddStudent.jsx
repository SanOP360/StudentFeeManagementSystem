import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaClipboard,
  FaDollarSign,
  FaAddressCard,
  FaPhone,
  FaVenusMars,
  FaChalkboardTeacher,
  FaImage,
} from "react-icons/fa";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [fees, setFees] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [address, setAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [gender, setGender] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        rollNumber,
        fees,
        paymentStatus,
        address,
        parentName,
        parentContact,
        gender,
        class: studentClass,
        image,
      };

      await axios.post(
        "https://student-fee-management-system.vercel.app/api/student",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:py-4 bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full md:w-[50%]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaClipboard className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaDollarSign className="absolute top-3 left-3 text-gray-400" />
          <input
            type="number"
            placeholder="Fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaAddressCard className="absolute top-3 left-3 text-gray-400" />
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <div className="mb-4 relative">
          <FaAddressCard className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
          />
        </div>
        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Parent Name"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
          />
        </div>
        <div className="mb-4 relative">
          <FaPhone className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Parent Contact"
            value={parentContact}
            onChange={(e) => setParentContact(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
          />
        </div>
        <div className="mb-4 relative">
          <FaVenusMars className="absolute top-3 left-3 text-gray-400" />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
          >
            <option className="p-2" value="male">
              Male
            </option>
            <option className="p-2" value="female">
              Female
            </option>
            <option className="p-2" value="other">
              Other
            </option>
          </select>
        </div>
        <div className="mb-4 relative">
          <FaChalkboardTeacher className="absolute top-3 left-3 text-gray-400" />
          <input
            type="number"
            placeholder="Class"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaImage className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Image URL (Google Drive link)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 pl-10 rounded-lg border w-full"
          />
          
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}
