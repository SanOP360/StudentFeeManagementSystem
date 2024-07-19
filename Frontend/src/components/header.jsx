import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function Header({ username, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/sign-in");
  };

  const handleLoginRedirect = () => {
    navigate("/sign-in");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-slate-700 text-white">
      <div className="flex items-center">
        <h1 className="text-xl font-bold md:block cursor-pointer hover:opacity-90" onClick={()=>{navigate('/')}}>
          <span className="text-gray-300">Student</span>{" "}
          <span className="text-green-300">Manager</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 md:space-x-4">
          <FaUserCircle className="text-2xl text-blue-500 hidden md:block" />
          {username ? (
            <>
              <span className="text-gray-200 text-sm hidden md:block">
                Logged in as
              </span>
              <span className="text-green-500">{username}</span>
            </>
          ) : (
            <span className="text-gray-200 text-sm hidden md:block">
              No user is logged in yet
            </span>
          )}
        </div>
        {username ? (
          <button
            onClick={handleLogout}
            className="ml-4 p-2 bg-red-500 rounded-lg flex items-center space-x-2 hover:bg-red-600"
          >
            <FaSignOutAlt className="text-white" />
            <span className="text-white">Logout</span>
          </button>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="ml-4 p-2 bg-blue-500 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
          >
            <FaSignInAlt className="text-white" />
            <span className="text-white">Login</span>
          </button>
        )}
      </div>
    </header>
  );
}
