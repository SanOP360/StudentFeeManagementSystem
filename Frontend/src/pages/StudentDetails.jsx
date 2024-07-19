import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InvoiceButton from "../components/InvoiceButton";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student", error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Student Details
      </h2>
      <div className="bg-slate-200 shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center lg:items-start">
        <div className="flex-shrink-0 lg:mr-6 mb-4 lg:mb-0">
          <img
            src={student.image}
            alt={student.name}
            className="w-40 lg:w-48 h-auto rounded-full shadow-lg"
          />
        </div>
        <div className="flex-1">
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Name:</strong> {student.name}
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Class:</strong> {student.class}
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Roll Number:</strong>{" "}
            {student.rollNumber}
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Fees:</strong>{" "}
            {student.fees} Rs
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Payment Status:</strong>{" "}
            {student.paymentStatus}
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Address:</strong>{" "}
            {student.address}
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Parent Name:</strong>{" "}
            {student.parentName}
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Parent Contact:</strong>{" "}
            {student.parentContact}
          </p>
          <p className="mb-3 text-lg">
            <strong className="text-gray-700">Gender:</strong> {student.gender}
          </p>
        </div>
      </div>
      <div className="text-center mt-6 flex justify-between">
        <button
          onClick={() => navigate(`/edit-student/${student._id}`)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
        >
          Edit
        </button>
        <InvoiceButton student={student} />
        <button
          onClick={() => navigate(`/`)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}
