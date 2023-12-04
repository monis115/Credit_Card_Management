// import React from "react";
// import { useUserData } from "../context/UserDataContext";
// import styled from "styled-components";
// const Wrapper = styled.section`
//   /* UserProfile.css */
//   body {
//     margin: 0;
//     padding: 0;
//     font-family: "Arial", sans-serif;
//     background-color: #f4f4f4;
//   }

//   .profile-container {
//     max-width: 800px;
//     margin: 20px auto;
//     padding: 20px;
//     background-color: #fff;
//     border-radius: 10px;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//   }

//   .user-info {
//     display: flex;
//     align-items: center;
//   }

//   .profile-image img {
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     margin-right: 20px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }

//   .details p {
//     margin: 5px 0;
//   }

//   .credit-heading {
//     font-size: 24px;
//     margin-top: 20px;
//     margin-bottom: 10px;
//     border-bottom: 1px solid #ccc;
//     padding-bottom: 5px;
//   }

//   .credit-card {
//     padding: 10px;
//     margin-bottom: 20px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     background-color: #f9f9f9;
//     box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
//   }

//   .no-credit,
//   .no-data {
//     text-align: center;
//     font-style: italic;
//     color: #888;
//     margin-top: 20px;
//   }
//   /* Add more styles as needed */
// `;
// const User = () => {
//   const { userData } = useUserData();

//   return (
//     <Wrapper>
//       {userData ? (
//         <div className="profile-container">
//           <div className="user-info">
//             <div className="profile-image">
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGelHqF1z6ZbVqKWcjB5vHrdEF561Wqq1Lvob8i-LHLv1UEWO8ByGU85ZkSVVvvHOTD8&usqp=CAU"
//                 alt="Profile"
//               />
//             </div>
//             <div className="details">
//               <p className="email">Email: {userData.email}</p>
//               <p className="name">
//                 Name: {userData.firstName} {userData.lastName}
//               </p>
//               <p className="name"> Mother name{userData.motherName}</p>
//               <p className="name"> Father Name:{userData.fatherName}</p>
//               <p className="name">DOB: {userData.dateOfBirth}</p>
//               <p className="name"> Adress{userData.address}</p>
//               <p className="name"> Salery{userData.grossMonthlyIncome}</p>
//               <p className="name"> Adress{userData.address}</p>
//             </div>
//           </div>

//           <h2 className="credit-heading">Credit Card Details</h2>
//           {userData.paymentDetails.length > 0 ? (
//             userData.paymentDetails.map((payment, index) => (
//               <div key={index} className="credit-card">
//                 <p className="card-number">Card Number: {payment.cardNumber}</p>
//                 <div className="expiration-cvv">
//                   <p className="expiration-date">
//                     Exp: {payment.expirationDate}
//                   </p>
//                   <p className="cvv-code">CV Code: {payment.cvCode}</p>
//                 </div>
//                 <p>Card Owner: {payment.cardOwner}</p>
//               </div>
//             ))
//           ) : (
//             <p className="no-credit">You don't have any credit card data yet</p>
//           )}
//         </div>
//       ) : (
//         <p className="no-data">You don't have any data yet</p>
//       )}
//     </Wrapper>
//   );
// };

// export default User;

import React from "react";
import { useUserData } from "../context/UserDataContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
const Wrapper = styled.section`
  /* Common styles */
  body {
    margin: 0;
    padding: 0;
    font-family: "Arial", sans-serif;
    // background-image: url("https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701388800&semt=sph");

    background-size: cover; /* Ensures the image covers the entire background */
    background-image: url("https://images.unsplash.com/photo-1631631480669-535cc43f2327?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww");
    // background-repeat: no-repeat;
  }

  /* Profile container */
  .profile-container {
    max-width: 800px;

    padding: 20px;

    margin: auto;

    background-color: azure;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  /* User info */
  .user-info {
    margin-bottom: 20px;
    margin-left: 100px;
    margin-right: 100px;

    display: block;

    align-items: center;

    margin-bottom: 20px;
  }

  .profile-image img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .details p {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 2px lightblue;
  }

  .details .email {
    font-weight: bold;
  }

  .details .name {
    text-transform: capitalize;
  }

  /* Credit card details */
  .credit-heading {
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    color: #333;
  }

  .credit-card1 {
    padding: 20px;

    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 20px;
  }

  .card-number {
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  }

  .expiration-cvv {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #555;
  }

  /* No data message */
  .no-credit,
  .no-data {
    text-align: center;
    font-style: italic;
    color: black;
    position: relative;
    top: 50px;
    font-weight: bold;
    font-size: 30px;

    height: 100vh;
  }
`;

const User = () => {
  const { userData } = useUserData();

  return (
    <Wrapper
      style={{
        backgroundImage: `url('https://d3nn873nee648n.cloudfront.net/900x600/100201/300-ZM1025154.jpg')`,
        backgroundSize: "cover", // Adjust the background size as needed
        backgroundPosition: "center center", // Adjust the position of the background image
      }}
    >
      {userData ? (
        <div className="profile-container">
          <button
            style={{
              border: "none",
              color: "white",

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
          <h2
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              textAlign: "left",
              marginLeft: "330px",
            }}
          >
            Profile{" "}
          </h2>
          <div className="user-info">
            <div style={{ marginLeft: "200px" }} className="profile-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGelHqF1z6ZbVqKWcjB5vHrdEF561Wqq1Lvob8i-LHLv1UEWO8ByGU85ZkSVVvvHOTD8&usqp=CAU"
                alt="Profile"
              />
            </div>
            <div className="details">
              <p className="email">Email: {userData.email}</p>
              <p className="name">
                Name: {userData.firstName} {userData.lastName}
              </p>
              <p className="name"> Mother name{userData.motherName}</p>
              <p className="name"> Father Name:{userData.fatherName}</p>
              <p className="name">DOB: {userData.dateOfBirth}</p>
              <p className="name"> Adress{userData.address}</p>
              <p className="name"> Salery{userData.grossMonthlyIncome}</p>
              <p className="name"> Adress{userData.address}</p>
            </div>
          </div>

          <h2
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              textAlign: "left",
              marginLeft: "250px",
            }}
          >
            Credit Card Details
          </h2>
          {userData.paymentDetails.length > 0 ? (
            userData.paymentDetails.map((payment, index) => (
              <div key={index} className="credit-card1">
                <div className="details">
                  <p className="email">Card Number: {payment.cardNumber}</p>

                  <p className="name">Exp: {payment.expirationDate}</p>
                  <p className="name">CV Code: {payment.cvCode}</p>

                  <p className="name">Card Owner: {payment.cardOwner}</p>
                  <p className="name">Credit Amount: {payment.credit}</p>
                  <p className="name">
                    Outstanding Amount: {payment.outstanding}
                  </p>
                  <p className="name">Your Coin: {payment.coin}</p>
                  <p className="name">Credit Score: 800</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-credit">You don't have any credit card data yet</p>
          )}
        </div>
      ) : (
        <p className="no-data">You don't have any data yet</p>
      )}
    </Wrapper>
  );
};

export default User;
