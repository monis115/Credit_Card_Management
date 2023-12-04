import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.section`
  /* Container Style */
  .container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  /* Heading Style */
  .heading {
    text-align: center;
    margin-bottom: 30px;
  }

  .heading h3 {
    margin-top: 0;
    font-size: 24px;
    color: #333;
  }

  .cc-img {
    width: 150px;
    height: auto;
  }

  /* Form Style */
  .form_details form {
    display: flex;
    flex-direction: column;
  }

  .form_details label {
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .btn {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  .btn:hover {
    background-color: #0056b3;
  }
`;

const Addcard = () => {
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvCode: "",
    cardOwner: "",
    credit: "",
    outstanding: "",
    coin: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/addPayment/${formData.email}`, {
        cardNumber: formData.cardNumber,
        expirationDate: formData.expirationDate,
        cvCode: formData.cvCode,
        cardOwner: formData.cardOwner,

        credit: formData.credit,
        outstanding: formData.outstanding,
        coin: formData.coin,
      });

      // Clear form fields after successful submission
      setFormData({
        email: "",
        cardNumber: "",
        expirationDate: "",
        cvCode: "",
        cardOwner: "",
        credit: "",
        outstanding: "",
        coin: "",
      });

      alert("Payment details submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting payment details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="heading">
          <h3 class="text-center">Payment Details</h3>
          <img
            class="cc-img"
            alt="Credit Card Icons"
            src="https://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png"
          />
        </div>
        <div className="form_details">
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Card Number</label>
            <input
              type="tel"
              class="form-control"
              placeholder="Valid Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            <label>EXPIRATION Date</label>
            <input
              type="date"
              class="form-control"
              placeholder="MM / YY"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
            />
            <label>CV CODE</label>
            <input
              type="number"
              class="form-control"
              placeholder="CVC"
              name="cvCode"
              value={formData.cvCode}
              onChange={handleChange}
            />
            <label>cardOwner</label>
            <input
              type="text"
              class="form-control"
              placeholder="Card Holder name"
              name="cardOwner"
              value={formData.cardOwner}
              onChange={handleChange}
            />
            <label>Credit Amount</label>
            <input
              type="number"
              class="form-control"
              placeholder="Credit Amount"
              name="credit"
              value={formData.credit}
              onChange={handleChange}
            />
            <label> outstanding Amount</label>
            <input
              type="number"
              class="form-control"
              placeholder="OutStanding"
              name="outstanding"
              value={formData.outstanding}
              onChange={handleChange}
            />

            <label>coin</label>
            <input
              type="number"
              class="form-control"
              placeholder="coin"
              name="coin"
              value={formData.coin}
              onChange={handleChange}
            />
            <button class="btn" type="submit">
              Process payment
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Addcard;
