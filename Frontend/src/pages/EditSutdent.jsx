import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    rollNumber: "",
    paymentStatus: "Paid",
    address: "",
    parentName: "",
    parentContact: "",
    gender: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `https://student-fee-management-system.vercel.app/api/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setStudent(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching student", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://student-fee-management-system.vercel.app/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating student", error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center md:py-4 bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full md:w-[50%]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Student</h2>
        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaClipboard className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaDollarSign className="absolute top-3 left-3 text-gray-400" />
          <input
            type="number"
            name="fees"
            placeholder="Fees"
            value={formData.fees}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaAddressCard className="absolute top-3 left-3 text-gray-400" />
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
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
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
          />
        </div>
        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="parentName"
            placeholder="Parent Name"
            value={formData.parentName}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
          />
        </div>
        <div className="mb-4 relative">
          <FaPhone className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="parentContact"
            placeholder="Parent Contact"
            value={formData.parentContact}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
          />
        </div>
        <div className="mb-4 relative">
          <FaVenusMars className="absolute top-3 left-3 text-gray-400" />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
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
            name="class"
            placeholder="Class"
            value={formData.class}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <FaImage className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="image"
            placeholder="Image URL (Google Drive link)"
            value={formData.image}
            onChange={handleChange}
            className="p-2 pl-10 rounded-lg border w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
        >
          Update
        </button>
      </form>
    </div>
  );
}
