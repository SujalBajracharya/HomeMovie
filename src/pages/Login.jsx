import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.userStore.users);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { usernameOrEmail, password } = form;
    const user = users.find(
      (u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (!user) {
      Swal.fire("Error", "Invalid credentials", "error");
      return;
    }

    dispatch({ type: "LOGIN", payload: { usernameOrEmail, password } });
    Swal.fire("Success", "Logged in successfully", "success");
    navigate("/");
  };

  return (
    <div className="p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>

        <label className="block mb-1">Username or Email</label>
        <input
          name="usernameOrEmail"
          value={form.usernameOrEmail}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        <label className="block mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
