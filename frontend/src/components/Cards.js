import React from "react";
import styled from "styled-components";
const Wrapper = styled.section`
  /* styles.css */

  /* Container for the cards */
  .card-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
   
    gap: 40px;
    margin-left: 10%;
    margin-right: 10%;
   
}

  }

  /* Individual card styles */
  .card {
    width: 250px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    margin-bottom: 20px;
  }

  /* Card image styling */
  .card img {
    width: 100%;
    height: 50%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  /* Card content styling */
  .card h3 {
    text-align: center;
    margin: 10px 0;
    font-size: 1.5rem;
    color: #333;
  }

  .card p {
    text-align: center;
    color: #666;
    padding: 0 15px;
    line-height: 1.5;
  }

  /* Card hover effect */
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Cards = () => {
  return (
    <Wrapper>
      <div className="card-container">
        <div className="card">
          <img
            src="https://d3nn873nee648n.cloudfront.net/900x600/20358/300-SM1020270.jpg"
            alt="Card 1"
          />
          <h3>Card 1</h3>
          <p>This is the content of card 1.</p>
        </div>
        <div className="card">
          <img
            src="https://d3nn873nee648n.cloudfront.net/900x600/20358/300-SM1020270.jpg"
            alt="Card 2"
          />
          <h3>Card 2</h3>
          <p>This is the content of card 2.</p>
        </div>
        <div className="card">
          <img
            src="https://d3nn873nee648n.cloudfront.net/900x600/20358/300-SM1020270.jpg"
            alt="Card 3"
          />
          <h3>Card 3</h3>
          <p>This is the content of card 3.</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cards;
