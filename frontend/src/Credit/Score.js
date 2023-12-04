import React from "react";

import "./Score.css";
import { useUserData } from "../context/UserDataContext";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Score = ({ score }) => {
  const getScoreRange = (score) => {
    if (score >= 300 && score < 550) {
      return "Poor";
    } else if (score >= 550 && score < 650) {
      return "Average";
    } else if (score >= 650 && score < 750) {
      return "Good";
    } else if (score >= 750 && score <= 900) {
      return "Excellent";
    }
  };
  const scoreRange = getScoreRange(score);
  const normalizedScore = Math.min(Math.max(score, 0), 900); // Ensure score is between 0 and 900
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  const progress = (normalizedScore / 900) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const { userData } = useUserData();
  return (
    <>
      {userData ? (
        <div style={{ backgroundColor: "honeydew", height: "100vh" }}>
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
          <div className="rr">
            <h2
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
                color: "darkgreen",
                textShadow: "1px 1px blue",
              }}
            >
              Credit card Score
            </h2>
            <div className="score-container">
              <svg className="progress-ring" height="120" width="120">
                <circle
                  className="progress-ring__circle"
                  stroke="#0f9d58"
                  strokeWidth="8"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                />
                <circle
                  className="progress-ring__circle--empty"
                  stroke="#e0e0e0"
                  strokeWidth="8"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                  style={{
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: 0,
                  }}
                />
                <circle
                  className="progress-ring__circle--filled"
                  stroke="#0f9d58"
                  strokeWidth="8"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                  style={{
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset,
                  }}
                />
                {/* <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-text"
          >
            <tspan x="0" dy="5" textAnchor="middle">
              {Math.round(progress)}%
            </tspan>
          </text> */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="progress-text"
                >
                  {Math.round(progress)}%
                </text>
              </svg>
              <p style={{ fontWeight: "bold" }}>
                {" "}
                Your Credit Score in percentage: {Math.round(progress)}%
              </p>
            </div>
            <div className="score-value">Your Credit Card Score: {score}</div>
            <div className="score-category">
              Your Credit card Status :{scoreRange}
            </div>
            <div>
              <img src="/credit_score.png" alt="score " />
            </div>
          </div>
        </div>
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

export default Score;
