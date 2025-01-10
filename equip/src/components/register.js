import React, { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, mobileNo, firstName, lastName } = formData;

    if (!email || !password || !firstName || !mobileNo) {
      toast.error("Please fill out all required fields.", { position: "top-center" });
      return;
    }

    try {
      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Prepare user data for the backend
        const userData = {
          email: user.email,
          firstName,
          lastName,
          mobileNo,
        };

        // API call to save user data in the database
        const response = await axios.post("http://localhost:4000/upload-book", userData);

        if (response.status === 201) {
          toast.success("User registered and data saved successfully!", { position: "top-center" });
        } else {
          toast.error("Failed to save user data in the database.", { position: "bottom-center" });
        }
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error(error.message || "Registration failed. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Mobile No</label>
        <input
          type="tel"
          name="mobileNo"
          className="form-control"
          placeholder="Enter mobile number"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>

      <p className="forgot-password text-right">
        Already registered? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
