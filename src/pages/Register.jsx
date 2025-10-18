import React, { useState } from "react";
import axios from "axios";
const aps = process.env.REACT_APP_API_URL;
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      const res = await axios.post(`${aps}/api/users/register`, data);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
          onChange={handleChange}
        />
        <input type="file" name="photo" onChange={handleChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
