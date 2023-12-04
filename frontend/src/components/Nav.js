import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { IoIosArrowDropdown } from "react-icons/io";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { useUserData } from "../context/UserDataContext";
import styled from "styled-components";
const Navb = styled.nav`
  .attractive-arrow {
    display: inline-block;
    animation: bounce 1s infinite;
    color: yellowgreen;
    position: relative;
    top: 3px;
    /* Apply the bounce animation */
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0); /* Bounce positions */
    }

    40% {
      transform: translateY(-20px); /* Bounce height */
    }

    60% {
      transform: translateY(-10px); /* Bounce height */
    }
  }
  .attractive-box {
    display: inline-block;
    border-radius: 8px; /* Adjust the border-radius as needed for your desired roundness */
    background-color: black; /* Change to your preferred background color */
    padding: 8px 10px; /* Add padding for spacing inside the element */
    position: relative; /* Set text color to white or a color that contrasts well with the background */
    bottom: 6px;
    font-size: 14px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #333;
    color: white;
    padding-bottom: 4px;
    transition: 0.5s;
  }

  .logo-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    animation: bounce 5s infinite;
  }

  .nav-toggle {
    cursor: pointer;
    display: none;
    flex-direction: column;
  }

  .nav-links {
    display: flex;
    gap: 30px;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }

  .nav-links a:hover {
    color: #ffcc00;
  }

  .dropdown-content a {
    color: white;
    padding: 12px 16px;
    display: block;
    text-decoration: none;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #333;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: 160px;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  /* Updated .bar class */
  .bar {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0; /* Adjusted margin for better spacing */
    transition: 0.4s;
  }
  .cart-trolley--link {
    position: relative;
    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }
    .cart-total--item {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: black;
    }
  }
  /* Updated @media query for screens less than 768px */
  @media (max-width: 768px) {
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }
      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }
    .navbar {
      /* flex-direction: column;
    align-items: flex-start; */
      padding: 25px;
    }
    .logo-container {
      margin-bottom: 0px;
    }
    .attractive-box1 {
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
    }
    .dropdown {
      position: relative;
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
    }
    .nav-toggle {
      display: flex;
      align-self: flex-end;
      margin-top: -5px;
    }

    .nav-links {
      display: none;
      flex-direction: column;

      position: absolute;
      top: 50px;
      left: 0;
      background-color: #333;
      width: 100%;
      padding: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      margin-top: 20px;
      z-index: 1;
    }
    .nav-links.show {
      display: flex;
    }

    /* .nav-links a {
    color: white;
    text-decoration: none;
    margin-bottom: 10px;
    font-size: 16px;
    text-align: center;
  } */
    .nav-links a {
      color: white;
      text-decoration: none;
      margin-bottom: 10px;
      font-size: 16px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }
    .dropdown-content {
      display: block;
      padding: 10px;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    /* Adjusted styles for the bars in the nav-toggle */
    .nav-toggle .bar {
      width: 35px;
      height: 2px;
      background-color: white;
      margin: 4px 0;
      margin-bottom: 6px;
      transition: 0.4s;
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Nav = () => {
  // const userData = useUserData();
  const { userData } = useUserData();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCancelShown, setIsCancelShown] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsCancelShown(!isCancelShown);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleCancel = () => {
    setIsNavOpen(!isNavOpen);
    setIsCancelShown(!isCancelShown);
  };

  const { state, dispatch } = useUser();

  const callAbout = async () => {
    try {
      // ... your existing code to fetch user data

      const response = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 400 || !data) {
        dispatch({ type: "CLEAR_USER" });
      } else {
        dispatch({
          type: "SET_USER",
          payload: { name: data.full_name, email: data.email },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "CLEAR_USER" });
      // Handle errors
    }
  };
  useEffect(() => {
    callAbout();
  }, [state.loggedIn]);
  return (
    <Navb>
      <div className={`navbar ${isNavOpen ? "open" : ""}`}>
        <div className="logo-container">
          <div className="logo">Banque!</div>
        </div>
        <div
          className="nav-toggle"
          onClick={isCancelShown ? toggleCancel : toggleNav}
        >
          {isCancelShown ? (
            <div className="cancel-btn">Cancel</div>
          ) : (
            <>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </>
          )}
        </div>
        <div className={`nav-links ${isNavOpen ? "show" : ""}`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {/* <NavLink to="/cc">Order Card</NavLink> */}
          <NavLink to="/product">Product</NavLink>

          {state.loggedIn ? (
            <div
              className="dropdown"
              onMouseEnter={toggleDropdown}
              onMouseLeave={closeDropdown}
            >
              {/* {state.loggedIn ? state.name : "--"}
            <span className="attractive-arrow">
              <IoIosArrowDropdown />
            </span> */}
              <div className="attractive-box">
                {state.loggedIn ? state.name : "--"}
                <span className="attractive-arrow">
                  <IoIosArrowDropdown />
                </span>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <NavLink to="/p">
                    <CgProfile /> &nbsp; Dashboard
                  </NavLink>
                  {/* <NavLink to="/myorder">
                    <BsPersonWorkspace /> &nbsp;My Order
                  </NavLink> */}
                  <NavLink to="/logout">
                    <FiLogOut /> &nbsp;Logout
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <div className="attractive-box1">
              <NavLink to="/login">
                <span className="attractive-arrow">
                  {" "}
                  <FiLogIn />
                </span>
                &nbsp; Sign In
              </NavLink>
            </div>
          )}
          {state.loggedIn ? (
            <>
              {userData ? (
                <>
                  {userData.paymentDetails.length > 0 ? (
                    userData.paymentDetails.map((payment, index) => (
                      <div key={index}>
                        {/* <p>{payment.coin}</p> */}
                        <NavLink to="/product">
                          {" "}
                          <FaCoins /> {payment.coin}{" "}
                        </NavLink>
                      </div>
                    ))
                  ) : (
                    <NavLink to="/product">
                      {" "}
                      <FaCoins /> 0{" "}
                    </NavLink>
                  )}
                </>
              ) : (
                <NavLink to="/product">
                  {" "}
                  <FaCoins /> 0{" "}
                </NavLink>
              )}
            </>
          ) : (
            <>
              <p style={{ display: "none" }}>coin</p>
            </>
          )}
        </div>
      </div>
    </Navb>
  );
};

export default Nav;
