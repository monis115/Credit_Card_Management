import React from "react";
import { useUser } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
// const Wrapper = styled.section`
//   display: flex;
//   justify-content: space-evenly;
//   gap: 50px;
//   padding: 50px;

//   .profile-info,
//   .payment-details {
//     flex: 1;
//     padding: 20px;
//     background-color: #f9f9f9;
//     border-radius: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }

//   .profile-info {
//     max-width: 400px; /* Adjust width as needed */
//   }

//   .payment-details {
//     max-width: 400px; /* Adjust width as needed */
//     background-color: greenyellow;
//   }

//   h2 {
//     font-size: 1.8rem;
//     margin-bottom: 20px;
//     text-align:center;
//     color: #333;
//   }

//   p {
//     font-size: 1.2rem;
//     color: #666;
//     margin-bottom: 10px;
//   }

//   .user-details {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     padding-bottom:60px;
//   }

//   .user-details img {
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 2px solid #fff;
//     box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
//   }
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
//     margin: 0 auto;
//   }

//   .credit-card p {
//     margin-bottom: 10px;
//     font-size: 1.2rem;
//     color: #333;
//   }

//   .card-number {
//     font-size: 1.4rem;
//     font-weight: bold;
//     margin-bottom: 20px;
//   }

//   .expiration-cvv {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//   }

//   .expiration-date,
//   .cvv-code {
//     flex: 1;
//     text-align: center;
//   }
// }
// `;

const Profile = () => {
  const { state } = useUser();
  return (
    <>
      {state.loggedIn ? (
        <div
          style={{
            backgroundImage: `url('https://d3nn873nee648n.cloudfront.net/900x600/3189/20-SM107059.jpg')`,
            // backgroundSize: "cover", // Adjust the background size as needed
            // backgroundPosition: "center center", // Adjust the position of the background image
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "2px",
              color: "white",
              textShadow: "1px 1px blue",
            }}
          >
            {" "}
            Welcome To User Dashboard
          </h2>
          <Navbar />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Profile;
