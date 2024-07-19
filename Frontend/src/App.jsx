import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboards";
import EditStudent from "./pages/EditSutdent";
import StudentDetails from "./pages/StudentDetails";
import AddStudent from "./pages/AddStudent";
import Header from "./components/header";
import { useEffect, useState } from "react";

export default function App() {
  const [username, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.username || "");
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserName(user.username);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUserName("");
  };

  return (
    <BrowserRouter>
      <Header username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>
    </BrowserRouter>
  );
}
