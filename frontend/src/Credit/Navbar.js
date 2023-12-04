import React from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import { FaCoins } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineScore } from "react-icons/md";
const Wrapper = styled.section`
  .bgg {
    bottom: 10px;
  }
  .contaner {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80vh;
    margin-top: 2px;
    // background-color: #fff; /* Background color for the navbar */
    padding: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adding a subtle shadow */
  }

  /* CSS */
  .button-25 {
    background-color: #36a9ae;
    background-image: linear-gradient(#37adb2, #329ca0);
    border: 1px solid #2a8387;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 1px;
    color: #ffffff;
    cursor: pointer;
    display: block;
    font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 17px;
    line-height: 100%;
    margin: 0;
    outline: 0;
    padding: 11px 15px 12px;
    text-align: center;
    transition: box-shadow 0.05s ease-in-out, opacity 0.05s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
  }

  .button-25:hover {
    box-shadow: rgba(255, 255, 255, 0.3) 0 0 2px inset,
      rgba(0, 0, 0, 0.4) 0 1px 2px;
    text-decoration: none;
    transition-duration: 0.15s, 0.15s;
  }

  .button-25:active {
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 4px inset,
      rgba(0, 0, 0, 0.4) 0 1px 1px;
  }

  .button-25:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .button-25:disabled:active {
    pointer-events: none;
  }

  .button-25:disabled:hover {
    box-shadow: none;
  }
  // .nav-link {
  //   color: white;
  // }

  // .nav-link:hover {
  //   color: #00bcd4; /* Hover color for NavLink */
  // }

  // .nav-link svg {
  //   margin-right: 5px;
  // }
`;
const Navbar = () => {
  const { userData } = useUserData();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/atm");
  };
  const handleClick1 = () => {
    navigate("/statement");
  };
  const handleClick2 = () => {
    navigate("/user");
  };
  const handleClick3 = () => {
    navigate("/score");
  };
  const handleClick4 = () => {
    navigate("/pay");
  };
  return (
    <Wrapper>
      <div className="contaner">
        <div>
          <button class="button-25" onClick={handleClick2}>
            <span style={{ top: "2px", position: "relative" }}>
              {" "}
              <CgProfile />
            </span>{" "}
            &nbsp; Profile
          </button>
        </div>
        <div>
          <button class="button-25" onClick={handleClick}>
            <span style={{ top: "2px", position: "relative" }}>
              {" "}
              <BsFillCreditCard2FrontFill />
            </span>{" "}
            &nbsp; Credit Card
          </button>
        </div>
        <div>
          <button class="button-25" onClick={handleClick4}>
            <span style={{ top: "2px", position: "relative" }}>
              {" "}
              <BsFillCreditCard2FrontFill />
            </span>{" "}
            &nbsp; Send payment
          </button>
        </div>
        <div>
          <button class="button-25" onClick={handleClick1}>
            <span style={{ top: "2px", position: "relative" }}>
              {" "}
              <GrTransaction />
            </span>
            &nbsp; Statement
          </button>
        </div>
        <div>
          <button class="button-25" onClick={handleClick3}>
            <span style={{ top: "2px", position: "relative" }}>
              {" "}
              <MdOutlineScore />
            </span>{" "}
            &nbsp; Credit Score
          </button>
        </div>

        <div>
          {userData ? (
            <>
              {userData.paymentDetails.length > 0 ? (
                userData.paymentDetails.map((payment, index) => (
                  <div key={index}>
                    {/* <p>{payment.coin}</p> */}
                    <button class="button-25">
                      {" "}
                      <NavLink to="/product" style={{ color: "white" }}>
                        {" "}
                        Rewards &nbsp;
                        <FaCoins /> {payment.coin}{" "}
                      </NavLink>
                    </button>
                  </div>
                ))
              ) : (
                <button class="button-25">
                  {" "}
                  <NavLink to="/product" style={{ color: "white" }}>
                    {" "}
                    Rewards &nbsp;
                    <FaCoins /> 0
                  </NavLink>
                </button>
              )}
            </>
          ) : (
            <button class="button-25">
              {" "}
              <NavLink to="/product" style={{ color: "white" }}>
                {" "}
                Rewards &nbsp;
                <FaCoins /> 0
              </NavLink>
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
