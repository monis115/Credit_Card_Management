// Footer.js

import { FaFacebookF, FaLinkedinIn, FaInstagramSquare } from "react-icons/fa";
import styled from "styled-components";
// import "./App.css";
const Wrapper = styled.section`
  /* styles.css */

  /* Footer styles */
  .footer {
    background-color: #333;
    color: #fff;
    // padding: 40px 0;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    max-width: 1200px;
    margin-left: 20%;
  }

  .contact-info,
  .social-media {
    flex: 1;
  }

  .contact-info h3,
  .social-media h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .contact-info p,
  .social-media a {
    color: #ccc;
    text-decoration: none;
    margin-bottom: 8px;
  }

  .social-icons {
    display: flex;
    gap: 15px;
    font-size: 1.5rem;
  }

  .social-icons a {
    color: #fff;
    transition: color 0.3s ease;
  }

  .social-icons a:hover {
    color: #ffcc00;
  }

  .footer-bottom {
    text-align: center;
    margin-top: 20px;
    font-size: 0.9rem;
  }

  /* Media queries for responsiveness */
  @media screen and (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }

    .contact-info,
    .social-media {
      margin-bottom: 30px;
    }

    .social-icons {
      justify-content: center;
    }
  }
`;
const Footer = () => {
  return (
    <Wrapper>
      <footer className="footer">
        <div className="footer-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Email: info@example.com</p>
            <p>Contact No: +123 456 7890</p>
          </div>
          <div className="social-media">
            <h3>Social Media</h3>
            <div className="social-icons">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <i className="fab fa-instagram"></i> */}
                <FaInstagramSquare />
                {/* <FontAwesomeIcon icon={faInstagram} /> */}
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <i className="fab fa-facebook"></i> */}
                {/* <FontAwesomeIcon icon={faFacebook} /> */}
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <i className="fab fa-linkedin"></i> */}
                <FaLinkedinIn />
                {/* <FontAwesomeIcon icon={faLinkedin} /> */}
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p>Copyright © 2023 Rizwan. All rights reserved.</p>
        </div>
      </footer>
    </Wrapper>
  );
};

export default Footer;
