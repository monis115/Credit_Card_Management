import React from "react";
import styled from "styled-components";
const Wraper = styled.section`
  /* Add styles for the hero section */
  .hero-section {
    text-align: center;
    margin-top: 30px;
  }

  .hero-section h2 {
    font-size: 1.5rem;
    color: #007bff;
    position: relative;
    display: inline-block;
  }

  .hero-section h2::before {
    content: "♥"; /* Heart icon */
    position: absolute;
    top: -10px;
    left: -25px;
    font-size: 1.5em;
    animation: beat 1s infinite; /* Heartbeat animation */
  }

  .hero-section p {
    font-size: 1.2rem;
    color: #333;
    margin-top: 10px;
  }

  /* Heartbeat animation */
  @keyframes beat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const Herosection = () => {
  return (
    <Wraper>
      <div className="hero-section">
        <h2>Welcome to Credit Card Management</h2>
        <p>Manage your credit cards easily and securely.</p>
        <p>
          <strong>Rewards for paying cardit cards </strong>
        </p>
      </div>
    </Wraper>
  );
};

export default Herosection;
