import React, { useState } from "react";
import { useUserData } from "../context/UserDataContext";
import styled from "styled-components";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
// const CardContainer = styled.div`
//   .credit-card {
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     width: 300px;
//     margin: 20px;
//     transition: transform 0.3s ease-in-out;
//     cursor: pointer;
//   }

//   .credit-card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
//   }

//   .payment-details {
//     margin-bottom: 20px;
//   }

//   .pyy {
//     margin-bottom: 15px;
//     // display: inline-flex;
//     // gap: 30px;
//   }
//   .py {
//     margin-bottom: 15px;
//     display: inline-flex;
//     gap: 30px;
//   }

//   .btt {
//     padding: 8px 16px;
//     background-color: #3f51b5;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }

//   .btt:hover {
//     background-color: #303f9f;
//   }

//   .input-field {
//     margin-bottom: 10px;
//     padding: 5px;
//     border-color: aquamarine;
//     border-radius: 3px;
//     border-style: groove;
//   }

//   .pay-now-button {
//     margin-top: 10px;
//     padding: 8px 16px;
//     background-color: #3f51b5;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }

//   .pay-now-button:hover {
//     background-color: #303f9f;
//   }
//   .cancel-button {
//     padding: 8px 16px;
//     background-color: #f44336;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;

//     &:hover {
//       background-color: #d32f2f;
//     }
//   }
// `;

const CardContainer = styled.div`
  .credit-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    height: 50vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 600px;
    margin: 20px auto;
  }

  .credit-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .payment-details {
    margin-bottom: 20px;
  }

  .pyy {
    margin-bottom: 15px;
  }
  .py {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    width: 100%;
  }

  .btt {
    padding: 8px 16px;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btt:hover {
    background-color: #303f9f;
  }

  .input-field {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid aquamarine;
    border-radius: 3px;
  }

  .pay-now-button,
  .cancel-button {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    margin-left: 4px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pay-now-button:hover,
  .cancel-button:hover {
    background-color: #d32f2f;
  }

  .credit-amount {
    color: green;
    font-weight: bold;
  }

  .outstanding-amount {
    color: red;
    font-weight: bold;
  }
`;
const Statement = () => {
  const { state } = useUser();
  const { userData, fetchUserData } = useUserData();

  const [showPaymentInput, setShowPaymentInput] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentAmount1, setPaymentAmount1] = useState("");
  const [showPaymentInput1, setShowPaymentInput1] = useState(false);

  const handlePayNow = async () => {
    try {
      const response = await axios.post(`/process-payment/${state.email}`, {
        amount: paymentAmount, // Send the paymentAmount to the backend
      });
      if (response.status === 200) {
        fetchUserData();
        alert(response.data.message); // Display the message received from the server

        setShowPaymentInput(false);

        // Hide the payment input after successful payment
      }
      // console.log(response.data); // Log the response from the server

      fetchUserData();
    } catch (error) {
      alert(error);
      console.error(error); // Handle error responses from the server
    }
  };
  const handlePayNow1 = async () => {
    try {
      const response = await axios.post(`/process-payment1/${userData.email}`, {
        amount: paymentAmount1, // Send the paymentAmount to the backend
      });
      if (response.status === 200) {
        fetchUserData();
        alert(response.data.message); // Display the message received from the server

        setShowPaymentInput1(false);

        // Hide the payment input after successful payment
      }
      // console.log(response.data); // Log the response from the server

      fetchUserData();
    } catch (error) {
      alert("Not Enough Money");
      // console.error(error); // Handle error responses from the server
    }
  };
  const handleCancelPayment = (inputNumber) => {
    if (inputNumber === 1) {
      setShowPaymentInput(false);
    } else if (inputNumber === 2) {
      setShowPaymentInput1(false);
    }
  };

  return (
    <>
      {userData ? (
        <CardContainer>
          <button
            style={{
              border: "none",
              color: "white",
              position: "relative",
              top: "12px",
              textAlign: "center",
              textDecoration: "none",
              display: "block",
              fontSize: "16px",
              marginLeft: "auto",
              marginRight: "10px",
              marginBottom: "7px",
              cursor: "pointer",

              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <NavLink
              to="/p"
              style={{
                textDecoration: "none",
                color: "inherit",
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                borderRadius: "5px",
              }}
            >
              <span style={{ position: "relative", top: "2px" }}>
                <FaLongArrowAltRight />
              </span>{" "}
              &nbsp; Dashboard
            </NavLink>
          </button>

          {userData ? (
            userData.paymentDetails.length > 0 ? (
              userData.paymentDetails.map((payment, index) => (
                <div key={index} className="credit-card">
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    Transfer Money
                  </h2>
                  <div className="payment-details">
                    <div className="py">
                      <p
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          padding: "5px",
                          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                          borderRadius: "5px",
                        }}
                      >
                        Credit Amount: &#8377;{payment.credit}
                      </p>
                      <button
                        className="btt"
                        onClick={() => setShowPaymentInput(true)}
                      >
                        Pay
                      </button>
                    </div>

                    {showPaymentInput && (
                      <div className="pyy">
                        <input
                          type="number"
                          placeholder="Enter payment amount"
                          className="input-field"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                        <button
                          className="pay-now-button"
                          style={{ backgroundColor: "green" }}
                          onClick={handlePayNow}
                        >
                          Pay Now
                        </button>
                        <button
                          className="cancel-button"
                          onClick={() => handleCancelPayment(1)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    <div className="py">
                      <p
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          padding: "5px",
                          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                          borderRadius: "5px",
                        }}
                      >
                        Outstanding Amount: &#8377;{payment.outstanding}
                      </p>
                      <button
                        className="btt"
                        onClick={() => setShowPaymentInput1(true)}
                      >
                        Pay
                      </button>
                    </div>

                    {showPaymentInput1 && (
                      <div className="pyy">
                        <input
                          type="number"
                          placeholder="Enter payment amount"
                          className="input-field"
                          value={paymentAmount1}
                          onChange={(e) => setPaymentAmount1(e.target.value)}
                        />
                        <button
                          className="pay-now-button"
                          style={{ backgroundColor: "green" }}
                          onClick={handlePayNow1}
                        >
                          Pay Now
                        </button>
                        <button
                          className="cancel-button"
                          onClick={() => handleCancelPayment(2)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: "black",
                  fontSize: "30px",
                  position: "relative",
                  top: "50px",
                  fontWeight: "bold",
                  height: "100vh",
                  textAlign: "center",
                }}
              >
                Your card is pending right now.
              </p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </CardContainer>
      ) : (
        <p
          style={{
            color: "black",
            fontSize: "30px",
            position: "relative",
            top: "50px",
            fontWeight: "bold",
            height: "100vh",
            textAlign: "center",
          }}
        >
          No Data Found
        </p>
      )}
    </>
  );
};

export default Statement;
