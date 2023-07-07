import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigateLogin = () => {
    navigate("/login");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    //Validation
    if (
      !fname ||
      !mname ||
      !lname ||
      !gender ||
      !email ||
      !contact ||
      !address ||
      !password
    ) {
      alert("Please fill in all fields");
      console.log("Please fill in all fields");
      return;
    }

    // Handle form submission logic here (e.g., making API calls)
    console.log("Registration form submitted");
    console.log("First Name:", fname);
    console.log("Middle Name:", mname);
    console.log("Last Name:", lname);
    console.log("Gender:", gender);
    console.log("Email:", email);
    console.log("Contact:", contact);
    console.log("Address:", address);
    console.log("Password:", password);

    // Resetting fields after submission
    setFname("");
    setMname("");
    setLname("");
    setGender("");
    setEmail("");
    setContact("");
    setAddress("");
    setPassword("");

    //fetching
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        mname,
        lname,
        gender,
        email,
        contact,
        address,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Registration Successful");
          navigateLogin();
        } else {
          console.log(data.status);
          alert("Something went wrong, Email/ Phone already registered!");
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        // alert(error);
        alert("An error occurred during registration");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      {/* a) First Name */}
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      {/* b) Middle Name */}
      <div className="mb-3">
        <label>Middle name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Middle name"
          onChange={(e) => setMname(e.target.value)}
        />
      </div>
      {/* c) Last Name */}
      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      {/* d) Gender */}
      <div className="mb-3">
        <label>Gender</label>
        <br></br>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="inlineRadio1"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="inlineRadio2"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Female
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label>Email Id</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* e) Phone Number */}
      <div className="mb-3">
        <label>Phone Number</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Phone Number"
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      {/* f) Address */}
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Address</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>
      <br></br>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered{" "}
        <a href="#" onClick={navigateLogin}>
          sign in?
        </a>
      </p>
    </form>
  );
}
