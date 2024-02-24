import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
const Wrapper = styled.section`
  /* CreditCardForm.css */

  .credit-card-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #f7f7f7;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }

  .credit-card-form h2 {
    text-align: center;
    color: #333;
  }

  .form-section {
    margin-bottom: 20px;
  }

  .form-section h3 {
    margin-bottom: 10px;
    color: #555;
  }

  input[type="text"],
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  input[type="email"],
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input[type="checkbox"] {
    margin-right: 5px;
    vertical-align: middle;
  }

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #45a049;
  }
`;
const CreditCardForm = () => {
  const navigate = useNavigate();
  const { fetchUserData } = useUserData();
  const { state } = useUser();
  console.log(state.email);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    motherName: "",
    fatherName: "",
    dateOfBirth: "",
    phoneNumber: "",
    Pancard: "",
    address: "",
    maritalStatus: "",
    homeownerStatus: "",
    grossMonthlyIncome: "",
    mortgagePayment: "",
    // insureCreditCard: "No",
    // declaration: false,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setFormData({ ...formData, [name]: checked ? "Yes" : "No" });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform form submission logic here
  //   console.log(formData); // Replace with your submission logic
  // };
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      email: state.email,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/adduser", formData);
      // Clear form fields after successful submission (if needed)
      // setFormData({ ...formData, <field>: '' });
      alert("User details submitted successfully!");
      fetchUserData();
      navigate("/p");
    } catch (error) {
      console.error("Error:", error);
      alert("Email alrady Exists or Another error occurred");
    }
  };
  return (
    <>
      {state.loggedIn ? (
        <Wrapper>
          <form className="credit-card-form" onSubmit={handleSubmit}>
            <h2>Enter Your Information for new Card</h2>
            {/* Personal Information Section */}
            <div className="form-section">
              <h3>Personal Information</h3>
              <input
                type="email"
                name="email"
                placeholder={state.email}
                readOnly
              />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
              {/* Add other personal information fields here */}
              <input
                type="text"
                name="gender"
                value={formData.gender}
                placeholder="Gender"
                onChange={handleChange}
              />
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                placeholder="Mother's Name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                placeholder="Father's Name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                placeholder="Date of Birth"
                onChange={handleChange}
              />
              <input
                type="text"
                name="Pancard number"
                value={formData.Pancard}
                placeholder="pancard"
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                placeholder="Address"
                onChange={handleChange}
              />
              <input
                type="text"
                name="maritalStatus"
                value={formData.maritalStatus}
                placeholder="Marital Status"
                onChange={handleChange}
              />
            </div>

            {/* Financial Information Section */}
            <div className="form-section">
              <h3>Financial Information</h3>
              <input
                type="text"
                name="grossMonthlyIncome"
                value={formData.grossMonthlyIncome}
                placeholder="Gross Monthly Income"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mortgagePayment"
                value={formData.mortgagePayment}
                placeholder="Mortgage Payment Monthly"
                onChange={handleChange}
                required
              />
              {/* Add other financial information fields here */}
              <input
                type="text"
                name="homeownerStatus"
                value={formData.homeownerStatus}
                placeholder="Are you a Homeowner, Renter, or Other?"
                onChange={handleChange}
              />
              {/* <label htmlFor="insureCreditCard">
            Would you like to insure your credit card(s)?
            <select
              name="insureCreditCard"
              value={formData.insureCreditCard}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label> */}
            </div>

            {/* Declaration Section */}
            {/* <div className="form-section">
          <label htmlFor="declaration">
            Declaration:
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleCheckboxChange}
              required
            />
          </label>
        </div> */}

            {/* Submit Button */}
            <button type="submit">Sign and Submit</button>
          </form>
        </Wrapper>
      ) : (
        <>
          <div style={{ height: "50vh", marginTop: "10px" }}>
            <p style={{ textAlign: "center" }}>
              Not Registragin yet Yet plz registerd First
            </p>
            <button
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            >
              <NavLink to="/login" style={{ textAlign: "center" }}>
                Login
              </NavLink>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CreditCardForm;
