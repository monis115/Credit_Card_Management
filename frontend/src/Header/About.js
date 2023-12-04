// AboutUs.js

import React from "react";
import styled from "styled-components";
import Question from "../components/Question";
const W = styled.section`
  /* AboutUs.css */

  .about-us-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }

  h1 {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
  }
`;
const About = () => {
  return (
    <>
      <W>
        <div className="about-us-container">
          <h1>Welcome to Benque</h1>
          <p>
            Your gateway to efficient credit card management! Our platform
            focuses on providing users with seamless access to credit cards
            tailored to their document verification and occupation.
          </p>

          <p>
            To begin utilizing our services, users are required to register on
            our website. Once registered, users can apply for a credit card.
            Upon successful document verification, eligible users will be issued
            a credit card with a specific limit based on their salary.
          </p>

          <p>
            One of the key benefits of using Benque is our reward system. We
            offer rewards in the form of coins for every transaction made using
            our credit cards. These coins can be redeemed to purchase a wide
            array of products from leading online retailers such as Amazon and
            Flipkart.
          </p>

          <p>
            At Benque, we prioritize the maintenance of credit card scores. If a
            user's credit score falls below 500, their card will be temporarily
            blocked. However, users with credit scores ranging from 500 to 800
            are considered to have a good credit standing, while those with
            scores surpassing 800 to 900 are labeled as having an excellent
            credit score.
          </p>

          <p>
            Furthermore, our platform offers detailed transaction statements and
            history. In the unfortunate event of fraud occurring during a
            transaction, users are not held liable for payment. Benque takes
            responsibility and covers the expenses on behalf of the affected
            user.
          </p>

          <p>
            Join Benque today and experience a hassle-free, secure, and
            rewarding credit card management system designed to cater to your
            financial needs.
          </p>
        </div>
      </W>
      <Question />
    </>
  );
};

export default About;
