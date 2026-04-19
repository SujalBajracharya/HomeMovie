import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userStore.users);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameExist = users.find(
      (member) => member.username === user.username
    );

    const emailExist = users.find(
      (member) => member.email === user.email
    );

    if (usernameExist || emailExist) {
      Swal.fire("Alert", "Username or Email already exists!", "error");
      return;
    }

    dispatch({
      type: "REGISTER",
      username: user.username,
      email: user.email,
      password: user.password,
    });

    Swal.fire("Success", "User has been registered!", "success");

    setUser({ username: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0a0a0a] px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Join and start exploring movies
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-lg"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By registering, you agree to our terms
        </p>
        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account? <Link
            to="/login"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;