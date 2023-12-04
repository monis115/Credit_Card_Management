// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   firstName: String,
//   lastName: String,
//   gender: String,
//   motherName: String,
//   fatherName: String,
//   dateOfBirth: String,
//   phoneNumber: String,
//   address: String,
//   maritalStatus: String,
//   homeownerStatus: String,
//   grossMonthlyIncome: String,
//   mortgagePayment: String,
//   //   insureCreditCard: String,
//   //   declaration: Boolean,
// });

// const Order = mongoose.model("Order", userSchema);

// module.exports = Order;
// userSchema.js

const mongoose = require("mongoose");
const StatementSchmea = new mongoose.Schema({
  creditAmount: Number,
  DebitAmount: Number,
  Time: Number,
  Day: String,
  Month: Number,
  Year: Number,
  credit_status: Boolean,
  Debit_status: Boolean,
});
const paymentSchema = new mongoose.Schema({
  cardNumber: String,
  expirationDate: String,
  cvCode: String,
  cardOwner: String,
  credit: Number,
  outstanding: Number,
  coin: Number,
  radioValue: { type: Boolean, default: true },
  statement: [StatementSchmea],
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  gender: String,
  motherName: String,
  fatherName: String,
  dateOfBirth: String,
  phoneNumber: String,
  address: String,
  maritalStatus: String,
  homeownerStatus: String,
  grossMonthlyIncome: String,
  mortgagePayment: String,
  paymentDetails: [paymentSchema], // Array to store payment details
});

const Order = mongoose.model("Order", userSchema);

module.exports = Order;
