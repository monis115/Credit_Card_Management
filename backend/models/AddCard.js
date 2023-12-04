// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   cardNumber: String,
//   expirationDate: String,
//   cvCode: String,
//   cardOwner: String,
// });

// const AddCard = mongoose.model("AddCard", userSchema);

// module.exports = AddCard;
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardNumber: String,
  expirationDate: String,
  cvCode: String,
  cardOwner: String,
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  cards: [cardSchema], // Array of card details
});

const AddCard = mongoose.model("AddCard", userSchema);

module.exports = AddCard;
