import React from "react";
import { MdContacts } from "react-icons/md";
const Order = () => {
  return (
    <>
      <section class="content">
        <div class="container">
          <div class="subtitle">
            <h2>
              Choose Your <span>Bank Card</span> Now!
            </h2>
            <div class="btn">
              <a href="g">Order Card</a>
            </div>
          </div>
        </div>
      </section>

      <section class="order">
        <div class="container">
          <div class="title">
            <h2>How to Order a New Card</h2>
          </div>
          <ol>
            <li>
              <a href="n">
                <i>
                  {" "}
                  <MdContacts />
                </i>
              </a>
              <h3>
                <span>Online Registration</span>
              </h3>
              <p>
                Everything starts with free online registration. Only basic data
                is needed - name, surname, age etc.
              </p>
            </li>
            <li>
              <a href="k">
                <i>
                  <MdContacts />
                </i>
              </a>
              <h3>
                <span>Filling Out a Form</span>
              </h3>
              <p>
                After the basic registration, you will need to fill out a form
                to help us determine your financial goals.
              </p>
            </li>
            <li>
              <a href="j">
                <i>
                  <MdContacts />
                </i>
              </a>
              <h3>
                <span>Signing an Agreement</span>
              </h3>
              <p>
                This stage concludes the procedure of opening an account at
                Banque to start using your card.
              </p>
            </li>
            <li>
              <a href="j">
                <i>
                  <MdContacts />
                </i>
              </a>
              <h3>
                <span>Using Your Card</span>
              </h3>
              <p>
                You can use your card to purchase the products you need or to
                open a secure deposit with lots of benefits.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
};

export default Order;
