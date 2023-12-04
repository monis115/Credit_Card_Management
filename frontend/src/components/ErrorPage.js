// ErrorPage.js
import React from "react";

const ErrorPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <h1
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Error Page
      </h1>
      <p
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Oops! Something went wrong.
      </p>
      {/* You can customize the content/message displayed for the error */}
    </div>
  );
};

export default ErrorPage;
