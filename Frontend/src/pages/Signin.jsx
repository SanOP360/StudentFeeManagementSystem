import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `http://localhost:4000/api/auth/signin`,
        formData
      );
      console.log(res.data);
      if (!res.data.token) {
        setError(res.data.message);
        setLoading(false);
        return;
      }
      localStorage.setItem("access_token", res.data.token);
      onLogin(res.data.user);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during sign in."
      );
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto min-h-screen">
      <h1 className="text-3xl text-center font-semibold my-7 p-3 max-w-lg mx-auto">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-5 text-center flex gap-2 hover:underline">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
