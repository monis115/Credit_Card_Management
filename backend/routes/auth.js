// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authh = require("../middleware/authh");
const Orrder = require("../models/Orrder");
const AddCard = require("../models/AddCard");
const Order = require("../models/Order");
// Assume you have already set up your MongoDB connection and schemas
// Assuming you have your Express app initialized and your models imported

// Create a route to handle payment processing
router.post("/process-payment1/:email", async (req, res) => {
  const { email } = req.params;
  const { amount } = req.body; // Assuming the frontend sends the payment amount
  console.log(req.body);
  try {
    const user = await Order.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific payment that matches the condition
    const paymentToUpdate = user.paymentDetails.find(
      (payment) => payment.credit >= 0
    );

    if (!paymentToUpdate) {
      return res
        .status(400)
        .json({ message: "Insufficient credit for payment" });
    }

    // Update the payment details
    paymentToUpdate.outstanding -= parseFloat(amount);
    paymentToUpdate.credit += parseFloat(amount);
    paymentToUpdate.coin += 100;

    // Create a new statement
    const newStatement = {
      creditAmount: 0,
      DebitAmount: amount,
      Time: Date.now(),
      Day: new Date().getDate(),
      Month: new Date().getMonth() + 1, // Months are zero-indexed in JavaScript
      Year: new Date().getFullYear(),
      credit_status: false,
      Debit_status: true,
    };

    paymentToUpdate.statement.push(newStatement);

    await user.save();

    return res.status(200).json({ message: "Payment processed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/process-payment/:email", async (req, res) => {
  const { email } = req.params;
  const { amount } = req.body; // Assuming the frontend sends the payment amount
  console.log(req.body);
  try {
    const user = await Order.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific payment that matches the condition
    const paymentToUpdate = user.paymentDetails.find(
      (payment) => payment.credit >= amount
    );

    if (!paymentToUpdate) {
      return res
        .status(400)
        .json({ message: "Insufficient credit for payment" });
    }

    // Update the payment details
    paymentToUpdate.outstanding += parseFloat(amount);
    paymentToUpdate.credit -= parseFloat(amount);
    paymentToUpdate.coin += 200;

    // Create a new statement
    const newStatement = {
      creditAmount: amount,
      DebitAmount: 0,
      Time: Date.now(),
      Day: new Date().getDate(),
      Month: new Date().getMonth() + 1, // Months are zero-indexed in JavaScript
      Year: new Date().getFullYear(),
      credit_status: true,
      Debit_status: false,
    };

    paymentToUpdate.statement.push(newStatement);

    await user.save();

    return res.status(200).json({ message: "Payment processed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/subtractCoin/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  const { productId, productCoin } = req.body;

  try {
    const user = await Order.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's coins are enough
    if (user.paymentDetails[0].coin >= productCoin) {
      // Subtract coins for the product
      user.paymentDetails[0].coin -= productCoin;

      // Save the updated user data
      await user.save();

      // // Logic to determine if the coupon code should be shown based on the updated coins
      // let showCoupon = false;
      // let couponCode = "";

      // if (user.paymentDetails[0].coin > 500) {
      //   // Some logic to generate the coupon code
      //   couponCode = "SOME_COUPON_CODE";
      //   showCoupon = true;
      // }

      return res.status(200).json({ message: "succesdully coins" });
    } else {
      return res.status(400).json({ message: "Not enough coins" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Assuming you're using Express.js for your backend

// Define a route to get user data by email
router.get("/getUserData/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const userData = await Order.findOne({ email });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addPayment/:email", async (req, res) => {
  const {
    cardNumber,
    expirationDate,
    cvCode,
    cardOwner,
    credit,
    outstanding,
    coin,
  } = req.body;
  const { email } = req.params;

  try {
    let user = await Order.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if payment details already exist for the user
    const existingPayment = user.paymentDetails.find(
      (payment) =>
        payment.cardNumber === cardNumber &&
        payment.expirationDate === expirationDate &&
        payment.cvCode === cvCode &&
        payment.cardOwner === cardOwner &&
        payment.credit === credit &&
        payment.outstanding === outstanding &&
        payment.coin === coin
    );

    if (existingPayment) {
      return res.status(400).json({ message: "Payment details already exist" });
    }

    // Add new payment details to the user's paymentDetails array
    user.paymentDetails.push({
      cardNumber,
      expirationDate,
      cvCode,
      cardOwner,
      credit,
      outstanding,
      coin,
    });

    await user.save();
    return res
      .status(200)
      .json({ message: "Payment details added successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/adduser", async (req, res) => {
  console.log(req.body);
  try {
    const {
      email,
      firstName,
      lastName,
      gender,
      motherName,
      fatherName,
      dateOfBirth,
      phoneNumber,
      address,
      maritalStatus,
      homeownerStatus,
      grossMonthlyIncome,
      mortgagePayment,
      insureCreditCard,
      declaration,
    } = req.body;

    const newUser = new Order({
      email,
      firstName,
      lastName,
      gender,
      motherName,
      fatherName,
      dateOfBirth,
      phoneNumber,
      address,
      maritalStatus,
      homeownerStatus,
      grossMonthlyIncome,
      mortgagePayment,
      insureCreditCard,
      declaration,
    });

    await newUser.save();

    res.status(201).json({ message: "User details saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/addcard", async (req, res) => {
  try {
    const { email, cardNumber, expirationDate, cvCode, cardOwner } = req.body;

    // Find the user based on the provided email
    let user = await AddCard.findOne({ email });

    if (!user) {
      // Create a new user if the email doesn't exist
      user = new AddCard({ email, cards: [] });
    }

    // Add the new card details to the user's cards array
    user.cards.push({ cardNumber, expirationDate, cvCode, cardOwner });

    // Save the updated user data to the database
    await user.save();

    res.status(201).json({ message: "Payment details saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.post("/addcard", async (req, res) => {
//   try {
//     const { cardNumber, expirationDate, cvCode, cardOwner } = req.body;

//     // Create a new user instance using the User model
//     const newUser = new AddCard({
//       cardNumber,
//       expirationDate,
//       cvCode,
//       cardOwner,
//     });

//     // Save the user data to the database
//     await newUser.save();

//     res.status(201).json({ message: "Payment details saved successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.post("/reg", async (req, res) => {
  console.log("reg is calling");
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(422).json({ error: "plz filled all field" });
    }
    const Userexit = await User.findOne({ email: email });
    if (Userexit) {
      return res.status(422).json({ error: "email already exist" });
    }
    // Create a new user instance and save it to the database
    const user = new User({ full_name, email, password });
    await user.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/log", async (req, res) => {
  console.log("log is calling");
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field" });
    }
    const userlogin = await User.findOne({ email: email });
    if (userlogin) {
      const ismatch = await bcrypt.compare(password, userlogin.password);
      token = await userlogin.generateAuthToken();

      // res.cookie("jwtoken", token, {
      //   expires: new Date(Date.now() + 25892000000),
      //   httpOnly: true,
      // });
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // Ensure to set the secure flag
      });

      if (!ismatch) {
        res.status(400).json({ message: "invalid carendatinals " });
      } else {
        res.status(200).json({
          message: "user login succesfully",
          userlogin: userlogin,
        });
      }
    } else {
      res.status(400).json({ message: "invalid carendatinals " });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "login failed" });
  }
});
router.get("/riz", authh, (req, res) => {
  res.send(req.rootUser);
});
// router.get('/rifat',authh ,(req ,res) => {
//   console.log("nav calling");

//   })
router.get("/rifat", authh, (req, res) => {
  res.json({ userDataa: true });
});
// router.get("/about", authh, (req, res) => {
//   console.log("about");
//   res.send(req.rootUser);
// });
router.get("/about", authh, (req, res) => {
  if (req.rootUser) {
    // Assuming req.rootUser is an object
    res.json(req.rootUser);
  } else {
    res.status(401).json({ error: "Unauthorized" }); // Sending a JSON object for unauthorized cases
  }
});

router.get("/logout", authh, (req, res) => {
  res.clearCookie("jwtoken", {
    path: "/",
    secure: true,
    sameSite: "none",
  });
  res.status(200).send("user logout");
});

router.post("/myorder", async (req, res) => {
  try {
    console.log("myorser is calling");
    const { email } = req.body;
    // console.log(email, full_name);
    const usermyorder = await Orrder.find({ email });
    res.status(200).json({
      orders: usermyorder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/orders", async (req, res) => {
  console.log("order is calling");
  try {
    const { email } = req.body;

    // Check if the email already exists in the database
    const existingOrder = await Orrder.findOne({ email });

    if (existingOrder) {
      // If the email exists, add a new order to the existing document
      existingOrder.orders.push(req.body);
      await existingOrder.save();
      res
        .status(201)
        .json({ message: "Order added to existing user successfully" });
    } else {
      // If the email doesn't exist, create a new document
      const newOrder = new Orrder({
        email,
        orders: [req.body],
      });
      await newOrder.save();
      res
        .status(201)
        .json({ message: "New user with order created successfully" });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

module.exports = router;
