// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authh = require("../middleware/authh");
const Order = require("../models/Order");
const AddCard = require("../models/AddCard");
const OtpModel = require("../models/OtpModel");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rizwannaik790026@gmail.com", // Your email
    pass: "gjdz rqhj ibbf keuc", // Your password
  },
});
const generateResetToken = () => {
  const tokenLength = 20; // Length of the reset token
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};
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
    console.log("hii1");
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
  console.log("hii");
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

router.post("/generate-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if an unexpired OTP exists for the given email
    const existingOTP = await OtpModel.findOne({
      email,
      expiresAt: { $gt: new Date() },
    });

    if (existingOTP) {
      const { otp } = existingOTP;

      // Resend the OTP through email
      const mailOptions = {
        from: "rizwannaik790026@gmail.com", // Your email
        to: email,
        subject: "Resent OTP Verification",
        text: `Your OTP is: ${otp}`,
      };

      transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to resend OTP" });
        }

        res.status(200).json({ message: "OTP resent successfully" });
      });
    } else {
      // Generate a new OTP and expiry time
      await OtpModel.deleteMany({ email, expiresAt: { $lte: new Date() } });

      const otp = Math.floor(1000 + Math.random() * 9000);
      const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

      const mailOptions = {
        from: "rizwannaik790026@gmail.com", // Your email
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is: ${otp}`,
      };

      transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send OTP" });
        }

        const newOtpEntry = new OtpModel({
          email,
          otp,
          expiresAt: expirationTime,
        });
        await newOtpEntry.save();

        res.status(200).json({ message: "OTP sent successfully" });
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// router.post("/forget", async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }
//     const userOTP = await OtpModel.findOne({ email });

//     if (!userOTP) {
//       return res.status(404).json({ error: "OTP not found" });
//     }

//     if (userOTP.otp !== parseInt(otp)) {
//       return res.status(401).json({ error: "Invalid OTP" });
//     }

//     if (userOTP.expiresAt < new Date()) {
//       return res.status(401).json({ error: "OTP expired" });
//     }

//     const tempPassword = user.password; // Store hashed password temporarily
//     console.log(tempPassword);
//     // Here, you decrypt the hashed password to plaintext
//     const decryptedPassword = await bcrypt.compare(tempPassword, tempPassword);
//     console.log(decryptedPassword);
//     const mailOptions = {
//       from: "rizwannaik790026@gmail.com",
//       to: email,
//       subject: "Forget password",
//       text: `Your Password is: ${decryptedPassword}`,
//     };

//     transporter.sendMail(mailOptions, async (error) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ error: "Failed to send OTP" });
//       }

//       await OtpModel.deleteOne({ email });

//       res.status(200).json({
//         message: "User password sent successfully",
//       });
//     });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ error: "Password recovery failed" });
//   }
// });
router.post("/forget", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userOTP = await OtpModel.findOne({ email });

    if (!userOTP) {
      return res.status(404).json({ error: "OTP not found" });
    }

    if (userOTP.otp !== parseInt(otp)) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (userOTP.expiresAt < new Date()) {
      await OtpModel.deleteOne({ email });
      return res.status(401).json({ error: "OTP expired" });
    }
    await OtpModel.deleteOne({ email });
    const resetToken = generateResetToken(); // Implement your reset token generation logic

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expiration time (1 hour)

    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      from: "rizwannaik790026@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Use this link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send reset link" });
      }

      res.status(200).json({ message: "Reset link sent successfully" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Password recovery failed" });
  }
});
router.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // const hashedPassword = await bcrypt.hash(newPassword, 12);
    // user.password = hashedPassword;
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

router.post("/reg", async (req, res) => {
  console.log("registration is calling");
  try {
    const { full_name, email, password, otp } = req.body;

    if (!full_name || !email || !password || !otp) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res.status(422).json({ error: "Email already exists" });
    }

    // Fetch OTP from the database based on the provided email
    const userOTP = await OtpModel.findOne({ email });

    if (!userOTP) {
      return res.status(404).json({ error: "OTP not found" });
    }

    // Check if the provided OTP matches the stored OTP
    if (userOTP.otp !== parseInt(otp)) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // Check if the OTP is expired
    if (userOTP.expiresAt < new Date()) {
      await OtpModel.deleteOne({ email });
      return res.status(401).json({ error: "OTP expired" });
    }

    // OTP is valid, proceed with user registration
    const newUser = new User({ full_name, email, password });
    await newUser.save();

    // Once OTP is used for validation, delete it from the database
    await OtpModel.deleteOne({ email });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});
router.post("/changepassword", async (req, res) => {
  try {
    const { email, password, newpassword } = req.body;
    const userlogin = await User.findOne({ email: email });

    if (!userlogin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userlogin.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    // Update the password
    userlogin.password = newpassword;
    await userlogin.save();

    res.status(200).json({
      message: "User password changed successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
});

router.post("/log", async (req, res) => {
  console.log(req.body);
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field" });
    }
    const userlogin = await User.findOne({ email: email });
    console.log(userlogin);
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
// router.post("/generate-otp", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if an unexpired OTP exists for the given email
//     const existingOTP = await OtpModel.findOne({
//       email,
//       expiresAt: { $gt: new Date() },
//     });

//     if (existingOTP) {
//       const { otp } = existingOTP;

//       // Resend the OTP through email
//       const mailOptions = {
//         from: "rizwannaik790026@gmail.com", // Your email
//         to: email,
//         subject: "Resent OTP Verification",
//         text: `Your OTP is: ${otp}`,
//       };

//       transporter.sendMail(mailOptions, async (error) => {
//         if (error) {
//           console.error("Error sending email:", error);
//           return res.status(500).json({ error: "Failed to resend OTP" });
//         }

//         res.status(200).json({ message: "OTP resent successfully" });
//       });
//     } else {
//       // Generate a new OTP and expiry time
//       await OtpModel.deleteMany({ email, expiresAt: { $lte: new Date() } });

//       const otp = Math.floor(1000 + Math.random() * 9000);
//       const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

//       const mailOptions = {
//         from: "rizwannaik790026@gmail.com", // Your email
//         to: email,
//         subject: "OTP Verification",
//         text: `Your OTP is: ${otp}`,
//       };

//       transporter.sendMail(mailOptions, async (error) => {
//         if (error) {
//           console.error("Error sending email:", error);
//           return res.status(500).json({ error: "Failed to send OTP" });
//         }

//         const newOtpEntry = new OtpModel({
//           email,
//           otp,
//           expiresAt: expirationTime,
//         });
//         await newOtpEntry.save();

//         res.status(200).json({ message: "OTP sent successfully" });
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// });

// // router.post("/forget", async (req, res) => {
// //   try {
// //     const { email, otp } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(400).json({ error: "User not found" });
// //     }
// //     const userOTP = await OtpModel.findOne({ email });

// //     if (!userOTP) {
// //       return res.status(404).json({ error: "OTP not found" });
// //     }

// //     if (userOTP.otp !== parseInt(otp)) {
// //       return res.status(401).json({ error: "Invalid OTP" });
// //     }

// //     if (userOTP.expiresAt < new Date()) {
// //       return res.status(401).json({ error: "OTP expired" });
// //     }

// //     const tempPassword = user.password; // Store hashed password temporarily
// //     console.log(tempPassword);
// //     // Here, you decrypt the hashed password to plaintext
// //     const decryptedPassword = await bcrypt.compare(tempPassword, tempPassword);
// //     console.log(decryptedPassword);
// //     const mailOptions = {
// //       from: "rizwannaik790026@gmail.com",
// //       to: email,
// //       subject: "Forget password",
// //       text: `Your Password is: ${decryptedPassword}`,
// //     };

// //     transporter.sendMail(mailOptions, async (error) => {
// //       if (error) {
// //         console.error("Error sending email:", error);
// //         return res.status(500).json({ error: "Failed to send OTP" });
// //       }

// //       await OtpModel.deleteOne({ email });

// //       res.status(200).json({
// //         message: "User password sent successfully",
// //       });
// //     });
// //   } catch (error) {
// //     console.log("Error:", error);
// //     res.status(500).json({ error: "Password recovery failed" });
// //   }
// // });
// router.post("/forget", async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const userOTP = await OtpModel.findOne({ email });

//     if (!userOTP) {
//       return res.status(404).json({ error: "OTP not found" });
//     }

//     if (userOTP.otp !== parseInt(otp)) {
//       return res.status(401).json({ error: "Invalid OTP" });
//     }

//     if (userOTP.expiresAt < new Date()) {
//       await OtpModel.deleteOne({ email });
//       return res.status(401).json({ error: "OTP expired" });
//     }
//     await OtpModel.deleteOne({ email });
//     const resetToken = generateResetToken(); // Implement your reset token generation logic

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // Token expiration time (1 hour)

//     await user.save();

//     const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

//     const mailOptions = {
//       from: "rizwannaik790026@gmail.com",
//       to: email,
//       subject: "Reset Password",
//       text: `Use this link to reset your password: ${resetLink}`,
//     };

//     transporter.sendMail(mailOptions, async (error) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ error: "Failed to send reset link" });
//       }

//       res.status(200).json({ message: "Reset link sent successfully" });
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Password recovery failed" });
//   }
// });
// router.post("/reset-password/:resetToken", async (req, res) => {
//   const { resetToken } = req.params;
//   const { newPassword } = req.body;
//   console.log(req.body);
//   try {
//     const user = await User.findOne({
//       resetPasswordToken: resetToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     console.log(user);
//     if (!user) {
//       return res.status(400).json({ error: "Invalid or expired token" });
//     }

//     // const hashedPassword = await bcrypt.hash(newPassword, 12);
//     // user.password = hashedPassword;
//     user.password = newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to reset password" });
//   }
// });

// router.post("/reg", async (req, res) => {
//   console.log("registration is calling");
//   try {
//     const { full_name, email, password, otp } = req.body;

//     if (!full_name || !email || !password || !otp) {
//       return res.status(422).json({ error: "Please fill all fields" });
//     }

//     const userExit = await User.findOne({ email: email });
//     if (userExit) {
//       return res.status(422).json({ error: "Email already exists" });
//     }

//     // Fetch OTP from the database based on the provided email
//     const userOTP = await OtpModel.findOne({ email });

//     if (!userOTP) {
//       return res.status(404).json({ error: "OTP not found" });
//     }

//     // Check if the provided OTP matches the stored OTP
//     if (userOTP.otp !== parseInt(otp)) {
//       return res.status(401).json({ error: "Invalid OTP" });
//     }

//     // Check if the OTP is expired
//     if (userOTP.expiresAt < new Date()) {
//       await OtpModel.deleteOne({ email });
//       return res.status(401).json({ error: "OTP expired" });
//     }

//     // OTP is valid, proceed with user registration
//     const newUser = new User({ full_name, email, password });
//     await newUser.save();

//     // Once OTP is used for validation, delete it from the database
//     await OtpModel.deleteOne({ email });

//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Registration failed" });
//   }
// });
// router.post("/changepassword", async (req, res) => {
//   try {
//     const { email, password, newpassword } = req.body;
//     const userlogin = await User.findOne({ email: email });

//     if (!userlogin) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, userlogin.password);

//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid old password" });
//     }

//     // Update the password
//     userlogin.password = newpassword;
//     await userlogin.save();

//     res.status(200).json({
//       message: "User password changed successfully",
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to change password" });
//   }
// });

// router.post("/log", async (req, res) => {
//   console.log(req.body);
//   try {
//     let token;
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "plz filled the field" });
//     }
//     const userlogin = await User.findOne({ email: email });
//     console.log(userlogin);
//     if (userlogin) {
//       const ismatch = await bcrypt.compare(password, userlogin.password);
//       token = await userlogin.generateAuthToken();

//       // res.cookie("jwtoken", token, {
//       //   expires: new Date(Date.now() + 25892000000),
//       //   httpOnly: true,
//       // });
//       res.cookie("jwtoken", token, {
//         expires: new Date(Date.now() + 25892000000),
//         httpOnly: true,
//         secure: true,
//         sameSite: "none",
//         // Ensure to set the secure flag
//       });

//       if (!ismatch) {
//         res.status(400).json({ message: "invalid carendatinals " });
//       } else {
//         res.status(200).json({
//           message: "user login succesfully",
//           userlogin: userlogin,
//         });
//       }
//     } else {
//       res.status(400).json({ message: "invalid carendatinals " });
//     }
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ error: "login failed" });
//   }
// });
// // router.post("/addcard", async (req, res) => {
// //   try {
// //     const { cardNumber, expirationDate, cvCode, cardOwner } = req.body;

// //     // Create a new user instance using the User model
// //     const newUser = new AddCard({
// //       cardNumber,
// //       expirationDate,
// //       cvCode,
// //       cardOwner,
// //     });

// //     // Save the user data to the database
// //     await newUser.save();

// //     res.status(201).json({ message: "Payment details saved successfully!" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });
// // router.post("/reg", async (req, res) => {
// //   console.log("reg is calling");
// //   try {
// //     const { full_name, email, password } = req.body;

// //     if (!full_name || !email || !password) {
// //       return res.status(422).json({ error: "plz filled all field" });
// //     }
// //     const Userexit = await User.findOne({ email: email });
// //     if (Userexit) {
// //       return res.status(422).json({ error: "email already exist" });
// //     }
// //     // Create a new user instance and save it to the database
// //     const user = new User({ full_name, email, password });
// //     await user.save();

// //     res.status(201).json({ message: "Registration successful" });
// //   } catch (error) {
// //     console.error("Error:", error);
// //     res.status(500).json({ error: "Registration failed" });
// //   }
// // });

// // router.post("/log", async (req, res) => {
// //   console.log("log is calling");
// //   try {
// //     let token;
// //     const { email, password } = req.body;
// //     if (!email || !password) {
// //       return res.status(400).json({ error: "plz filled the field" });
// //     }
// //     const userlogin = await User.findOne({ email: email });
// //     if (userlogin) {
// //       const ismatch = await bcrypt.compare(password, userlogin.password);
// //       token = await userlogin.generateAuthToken();

// //       // res.cookie("jwtoken", token, {
// //       //   expires: new Date(Date.now() + 25892000000),
// //       //   httpOnly: true,
// //       // });
// //       res.cookie("jwtoken", token, {
// //         expires: new Date(Date.now() + 25892000000),
// //         httpOnly: true,
// //         secure: true,
// //         sameSite: "none",
// //         // Ensure to set the secure flag
// //       });

// //       if (!ismatch) {
// //         res.status(400).json({ message: "invalid carendatinals " });
// //       } else {
// //         res.status(200).json({
// //           message: "user login succesfully",
// //           userlogin: userlogin,
// //         });
// //       }
// //     } else {
// //       res.status(400).json({ message: "invalid carendatinals " });
// //     }
// //   } catch (error) {
// //     console.log("Error:", error);
// //     res.status(500).json({ error: "login failed" });
// //   }
// // });
// router.get("/riz", authh, (req, res) => {
//   res.send(req.rootUser);
// });
// // router.get('/rifat',authh ,(req ,res) => {
// //   console.log("nav calling");

// //   })
// router.get("/rifat", authh, (req, res) => {
//   res.json({ userDataa: true });
// });
// // router.get("/about", authh, (req, res) => {
// //   console.log("about");
// //   res.send(req.rootUser);
// // });
// router.get("/about", authh, (req, res) => {
//   if (req.rootUser) {
//     // Assuming req.rootUser is an object
//     res.json(req.rootUser);
//   } else {
//     res.status(401).json({ error: "Unauthorized" }); // Sending a JSON object for unauthorized cases
//   }
// });

// router.get("/logout", authh, (req, res) => {
//   res.clearCookie("jwtoken", {
//     path: "/",
//     secure: true,
//     sameSite: "none",
//   });
//   res.status(200).send("user logout");
// });

module.exports = router;
