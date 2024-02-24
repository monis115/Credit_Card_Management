import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useUserData } from "../context/UserDataContext";
import { FaCoins } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
const Wrapper = styled.section`
  .containerrr {
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

    gap: 30px;

    margin: 20px 10% 20px 10%;
  }

  .cardd {
    width: 200px;
    height: 250px;
    background-color: aliceblue;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease; /* Animation */
  }

  .cardd img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    // border-radius: 50%;
    margin-bottom: 10px;
  }

  .cardd p {
    font-size: 14px;
  }

  .coin-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Animation */
  }

  .coin-button:hover {
    background-color: #2980b9;
  }

  /* Animation on hover */
  .cardd:hover {
    transform: scale(1.05);
  }
`;

const initialProducts = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_UY218_.jpg",
    description: "Get 20% off on buy this product on amzazan    ",
    product: "Apple iPhone 15 Pro Max",
    coupen_staues: false,
    coupon_code: "xyz123",
    coin: 1000,
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/61T1-tI9jdL._AC_UY218_.jpg", // Replace with your image URL
    description: "Get 10% off on buy on amazan",

    product: "boAt Immortal IM-700 7.1",
    coupen_staues: false,
    coupon_code: "xyz123",
    coin: 100,
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/61Zv+ufF51L._AC_UY218_.jpg", // Replace with your image URL
    description: "Get 50% off on buy on Flipkart",
    coupen_staues: false,
    product: "Logitech B170 Wireless Mouse",
    coupon_code: "xyz123",
    coin: 200,
  },
  {
    id: 4,
    image: "https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg",
    description: "Get 40% of on amazan ",
    product: "Keyboard",
    coupen_staues: false,
    coupon_code: "xyz123",
    coin: 100,
  },
  {
    id: 5,
    image: "https://m.media-amazon.com/images/I/61T1-tI9jdL._AC_UY218_.jpg", // Replace with your image URL
    description: "Get 10% off on buy on amazan",

    product: "boAt Immortal IM-700 7.1",
    coupen_staues: false,
    coupon_code: "xyz123",
    coin: 100,
  },
  {
    id: 4,
    image: "https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg",
    description: "Get 40% of on amazan ",
    product: "Keyboard",
    coupen_staues: false,
    coupon_code: "xyz123",
    coin: 300,
  },
  {
    id: 7,
    image: "https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_UY218_.jpg",
    description: "Get 20% off on buy this product on amzazan    ",
    product: "Apple iPhone 15 Pro Max",
    coupen_staues: false,
    coupon_code: "xyz123",
    coin: 1000,
  },
  {
    id: 8,
    image: "https://m.media-amazon.com/images/I/61Zv+ufF51L._AC_UY218_.jpg", // Replace with your image URL
    description: "Get 50% off on buy on Flipkart",
    coupen_staues: false,
    product: "Logitech B170 Wireless Mouse",
    coupon_code: "xyz123",
    coin: 200,
  },

  // Add more product objects as needed...
];

const Product = () => {
  const { fetchUserData } = useUserData();
  const { state } = useUser();
  const userEmail = state.email;
  const [products, setProducts] = useState(initialProducts);

  const handleUseCoin = async (productId, productCoin) => {
    try {
      const response = await axios.post(`/subtractCoin/${userEmail}`, {
        productId,
        productCoin,
      });

      if (response.status === 200) {
        fetchUserData();
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            // Update the coupen_staues based on response.status
            return {
              ...product,
              coupen_staues: true,
            };
          }
          return product;
        });

        setProducts(updatedProducts);

        alert("Coupon code available for this product!");
      } else {
        alert("Not enough coins!");
      }
    } catch (error) {
      alert("not enough coins");
      console.error("Error:", error);
    }
  };

  return (
    <Wrapper>
      <button
        style={{
          backgroundColor: "#4CAF50",
          border: "none",
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
          textDecoration: "none",
          display: "block",
          fontSize: "16px",
          marginLeft: "auto",
          marginRight: "10px",
          marginBottom: "7px",
          marginTop: "10px",
          cursor: "pointer",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavLink to="/p" style={{ textDecoration: "none", color: "inherit" }}>
          <span style={{ position: "relative", top: "2px" }}>
            <FaLongArrowAltRight />
          </span>{" "}
          &nbsp; Dashboard
        </NavLink>
      </button>
      <h2
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Products
      </h2>
      <div className="containerrr">
        {products.map((product) => (
          <div key={product.id} className="cardd">
            <img src={product.image} alt="Product" />
            <p>{product.description}</p>
            <p>{product.product}</p>
            <button
              className="coin-button"
              onClick={() => handleUseCoin(product.id, product.coin)}
            >
              Use Coin <FaCoins /> {product.coin}
            </button>
            {product.coupen_staues && (
              <p>Use this Coupon Code: {product.coupon_code}</p>
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Product;
