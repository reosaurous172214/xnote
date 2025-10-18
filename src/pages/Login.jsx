import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const aps = process.env.REACT_APP_API_URL;
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${aps}/api/users/login`, {
      email,
      password,
    });

    // Save only the user object from response
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    alert("Login successful: " + storedUser.email);

    navigate("/profile");
  } catch {
    setError("Invalid credentials");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
