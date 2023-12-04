import React from "react";
import styled from "styled-components";
const Wraper = styled.section`
  /* CSS */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .logo img {
    /* Adjust the width according to your logo size */
    width: 80px;

    border-radius: 50%;
  }

  .search-bar input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .search-bar button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    margin-left: 0.5rem;
  }

  .auth-buttons button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    margin-left: 0.5rem;
  }
`;
const Nav = () => {
  const handleSearch = () => {
    // Function to handle search functionality
    // Add your search logic here
    console.log("Search button clicked");
  };

  const handleLogin = () => {
    // Function to handle login functionality
    // Add your login logic here
    console.log("Login button clicked");
  };

  const handleLogout = () => {
    // Function to handle logout functionality
    // Add your logout logic here
    console.log("Logout button clicked");
  };

  return (
    <Wraper>
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <img
            // src="https://copyassignment.com/wp-content/uploads/2022/05/Capture-12.png"
            src="data:image/jpeg;base64,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"
            alt="Logo"
          />
        </div>

        {/* Search Input Field */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Login/Logout Buttons */}
        <div className="auth-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </Wraper>
  );
};

export default Nav;
