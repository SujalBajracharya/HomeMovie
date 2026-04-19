import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

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
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0a0a0a] px-4">

      {/* Auth Card */}
      <div className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to continue watching
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username / Email */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Username or Email
            </label>
            <input
              name="usernameOrEmail"
              value={form.usernameOrEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter username or email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-lg"
          >
            Sign In
          </button>

        </form>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Secure login for movie experience
        </p>
        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account? <Link
            to="/register"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;