import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFilter, FaEye, FaEdit, FaPlusCircle } from "react-icons/fa";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const [searchPaymentStatus, setSearchPaymentStatus] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/student", {
          params: {
            name: searchName,
            class: searchClass,
            rollNumber: searchRollNumber,
            paymentStatus: searchPaymentStatus,
            limit: 9,
            startIndex: (pagination.currentPage - 1) * 9,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setStudents(response.data.students);
        setPagination({
          ...pagination,
          totalPages: response.data.pagination.totalPages,
        });
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/sign-in");
    } else {
      fetchStudents();
    }
  }, [
    navigate,
    searchName,
    searchClass,
    searchRollNumber,
    searchPaymentStatus,
    pagination.currentPage,
  ]);

  const handleView = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const handleEdit = (studentId) => {
    navigate(`/edit-student/${studentId}`);
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setPagination({
        ...pagination,
        currentPage: pagination.currentPage - 1,
      });
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination({
        ...pagination,
        currentPage: pagination.currentPage + 1,
      });
    }
  };

  const handleSearch = () => {
    setPagination({
      ...pagination,
      currentPage: 1,
    });
  };

  const handleAddNewStudent = () => {
    navigate("/add-student");
  };

  return (
    <div className="min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4 p-4">Student Management</h2>
        <div className="flex gap-1  flex-col ">
          <div className="flex flex-col lg:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 mx-2 lg:gap-6 ">
            <input
              type="text"
              placeholder="Search by Name"
              className="p-2 md:ml-4 lg:ml-0 rounded-lg border w-full md:w-22"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Class"
              className="p-2 rounded-lg border w-full md:w-22"
              value={searchClass}
              onChange={(e) => setSearchClass(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Roll Number"
              className="p-2 rounded-lg border w-full md:w-22"
              value={searchRollNumber}
              onChange={(e) => setSearchRollNumber(e.target.value)}
            />
            <select
              className="p-2 rounded-lg border w-full md:w-22"
              value={searchPaymentStatus}
              onChange={(e) => setSearchPaymentStatus(e.target.value)}
            >
              <option value="">Select Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-gray-500 text-gray-200 px-4 py-2 rounded-lg flex items-center justify-center hover:bg-opacity-90 h-full"
            >
              <FaFilter className="mr-2" /> Filter
            </button>
          </div>
          <div className="w-full lg:w-[60%] p-4 ">
            <button
              onClick={handleAddNewStudent}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:opacity-90 h-full w-full"
            >
              <FaPlusCircle className="mr-2" /> Add A New Student
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-slate-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b text-center">Name</th>
                <th className="py-2 px-4 border-b text-center">Class</th>
                <th className="py-2 px-4 border-b text-center hidden md:block">
                  Roll Number
                </th>
                <th className="py-2 px-4 border-b text-center">
                  Payment Status
                </th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">
                    {student.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {student.class}
                  </td>
                  <td className="py-2 px-4 border-b text-center hidden md:block">
                    {student.rollNumber}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {student.paymentStatus}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2 flex flex-wrap justify-center gap-1 md:gap-0">
                    <button
                      onClick={() => handleView(student._id)}
                      className="bg-blue-500 text-white px-1 py-1 md:px-4 md:py-2 rounded flex text-xs md:text-sm items-center justify-center hover:bg-blue-600 w-20"
                    >
                      <FaEye className="mr-2" /> View
                    </button>
                    <button
                      onClick={() => handleEdit(student._id)}
                      className="bg-yellow-400 text-white px-1 py-1 md:px-4 md:py-2 rounded flex text-xs md:text-sm items-center justify-center hover:bg-yellow-600 w-20"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handlePreviousPage}
            disabled={pagination.currentPage === 1}
            className={`${
              pagination.currentPage === 1
                ? "bg-gray-300 cursor-default"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded-l-lg`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`${
              pagination.currentPage === pagination.totalPages
                ? "bg-gray-300 cursor-default"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded-r-lg`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
