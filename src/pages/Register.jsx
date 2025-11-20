import React, { useState } from "react";
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

    const emailExist = users.find((member) => member.email === user.email);

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

    // Reset form
    setUser({ username: "", email: "", password: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-1/2 p-5">
        <label>Username</label>
        <input
          type="text"
          className="w-full border"
          required
          name="username"
          value={user.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          className="w-full border"
          required
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          className="w-full border"
          required
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <button type="submit" className="mt-3 bg-blue-500 text-white p-2">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
