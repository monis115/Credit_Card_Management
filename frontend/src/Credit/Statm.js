// // import React from "react";
// // import { useUserData } from "../context/UserDataContext";

// // const Statm = () => {
// //   const { userData } = useUserData();

// //   return (
// //     <div>
// //       {userData ? (
// //         <>
// //           {userData.paymentDetails.length > 0 ? (
// //             userData.paymentDetails.map((payment, paymentIndex) => (
// //               <div key={paymentIndex} className="credit-card">
// //                 <h2>Credit Transactions:</h2>
// //                 {payment.statement.map((transaction, transactionIndex) =>
// //                   transaction.credit_status ? (
// //                     <div key={transactionIndex} className="transaction credit">
// //                       <p>Credit Amount: {transaction.creditAmount}</p>
// //                       <p>
// //                         Date: {transaction.Day}-{transaction.Month}-
// //                         {transaction.Year}
// //                       </p>

// //                       <p>Time: {transaction.Time}</p>
// //                       <p>Status: Credit</p>
// //                     </div>
// //                   ) : null
// //                 )}

// //                 <h2>Debit Transactions:</h2>
// //                 {payment.statement.map((transaction, transactionIndex) =>
// //                   transaction.Debit_status ? (
// //                     <div key={transactionIndex} className="transaction debit">
// //                       <p>Debit Amount: {transaction.DebitAmount}</p>
// //                       <p>
// //                         Date: {transaction.Day}-{transaction.Month}-
// //                         {transaction.Year}
// //                       </p>
// //                       <p>Time: {transaction.Time}</p>
// //                       {/* Add other fields from StatementSchema as needed */}
// //                       <p>Status: Debit</p>
// //                     </div>
// //                   ) : null
// //                 )}
// //               </div>
// //             ))
// //           ) : (
// //             <p>Your card is empty</p>
// //           )}
// //         </>
// //       ) : (
// //         <p>No data found</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Statm;
// import React from "react";
// import { useUserData } from "../context/UserDataContext";
// import styled from "styled-components";
// const Wrapper = styled.section`
//   .statement-container {
//     margin: 20px;
//   }

//   .credit-card {
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     padding: 10px;
//     margin-bottom: 20px;
//   }

//   .transaction-table {
//     display: flex;
//     flex-direction: column;
//   }

//   .transaction-row {
//     border: 1px solid #ddd;
//     border-radius: 5px;
//     padding: 10px;
//     margin-bottom: 10px;
//   }

//   .credit {
//     background-color: #e6ffe6; /* Light green for credit transactions */
//   }

//   .debit {
//     background-color: #ffe6e6; /* Light red for debit transactions */
//   }
// `;
// const Statm = () => {
//   const { userData } = useUserData();

//   return (
//     <Wrapper>
//       <div className="statement-container">
//         {userData ? (
//           <>
//             {userData.paymentDetails.length > 0 ? (
//               userData.paymentDetails.map((payment, paymentIndex) => (
//                 <div key={paymentIndex} className="credit-card">
//                   <h2>Credit Transactions:</h2>
//                   <div className="transaction-table">
//                     {payment.statement.map((transaction, transactionIndex) =>
//                       transaction.credit_status ? (
//                         <div
//                           key={transactionIndex}
//                           className="transaction-row credit"
//                         >
//                           <p>Credit Amount: {transaction.creditAmount}</p>
//                           <p>
//                             Date: {transaction.Day}-{transaction.Month}-
//                             {transaction.Year}
//                           </p>
//                           <p>Time: {transaction.Time}</p>
//                           <p>Status: Credit</p>
//                         </div>
//                       ) : null
//                     )}
//                   </div>

//                   <h2>Debit Transactions:</h2>
//                   <div className="transaction-table">
//                     {payment.statement.map((transaction, transactionIndex) =>
//                       transaction.Debit_status ? (
//                         <div
//                           key={transactionIndex}
//                           className="transaction-row debit"
//                         >
//                           <p>Debit Amount: {transaction.DebitAmount}</p>
//                           <p>
//                             Date: {transaction.Day}-{transaction.Month}-
//                             {transaction.Year}
//                           </p>
//                           <p>Time: {transaction.Time}</p>
//                           {/* Add other fields from StatementSchema as needed */}
//                           <p>Status: Debit</p>
//                         </div>
//                       ) : null
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>Your card is empty</p>
//             )}
//           </>
//         ) : (
//           <p>No data found</p>
//         )}
//       </div>
//     </Wrapper>
//   );
// };

// export default Statm;

import React from "react";
import { useUserData } from "../context/UserDataContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
const Wrapper = styled.section`
  .statement-container {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    max-width: 850px;
    background-color: white;
  }

  .credit-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
  }

  .transaction-table {
    display: flex;
    flex-direction: column;
  }

  //   .transaction-row {
  //     display: flex;
  //     justify-content: space-between;
  //     border: 1px solid #ddd;
  //     border-radius: 5px;
  //     padding: 10px;
  //     margin-bottom: 10px;
  //   }
  .transaction-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; /* Equal-width columns */
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .transaction-row p {
    margin: 0; /* Remove default paragraph margins */
  }

  .header {
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

const Statm = () => {
  const { userData } = useUserData();
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <Wrapper>
      <div className="statement-container">
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
        {userData ? (
          <>
            {userData.paymentDetails.length > 0 ? (
              userData.paymentDetails.map((payment, paymentIndex) => (
                <div key={paymentIndex} className="credit-card">
                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Credit Transactions:
                  </h2>
                  <div className="transaction-table">
                    <div className="transaction-row header">
                      <p>S No</p>
                      <p>Card Number</p>
                      <p>Amount credit</p>
                      <p>Date</p>
                      <p>Time</p>
                      <p>Status</p>
                    </div>
                    {payment.statement.map((transaction, transactionIndex) =>
                      transaction.credit_status ? (
                        <div
                          key={transactionIndex}
                          className="transaction-row credit"
                        >
                          <p>{transactionIndex + 1}</p>
                          <p>{payment.cardNumber}</p>
                          <p>&#8377;{transaction.creditAmount}</p>
                          <p>
                            {transaction.Day}-{transaction.Month}-
                            {transaction.Year}
                          </p>
                          <p>{formatTime(transaction.Time)}</p>
                          <p style={{ color: "green" }}>Credit</p>
                        </div>
                      ) : null
                    )}
                  </div>

                  <h2
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Debit Transactions:
                  </h2>
                  <div className="transaction-table">
                    <div className="transaction-row header">
                      <p>S No</p>
                      <p>Card Number</p>
                      <p>Amount Debit</p>
                      <p>Date</p>
                      <p>Time</p>
                      <p>Status</p>
                    </div>
                    {payment.statement.map((transaction, transactionIndex) =>
                      transaction.Debit_status ? (
                        <div
                          key={transactionIndex}
                          className="transaction-row debit"
                        >
                          <p>{transactionIndex + 1}</p>
                          <p>{payment.cardNumber}</p>
                          <p>&#8377;{transaction.DebitAmount}</p>
                          <p>
                            {transaction.Day}-{transaction.Month}-
                            {transaction.Year}
                          </p>
                          <p>{formatTime(transaction.Time)}</p>
                          <p style={{ color: "red" }}>Debit</p>
                        </div>
                      ) : null
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
                Your card is empty
              </p>
            )}
          </>
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
            No data found
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default Statm;
