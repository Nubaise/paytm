const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/paytm")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error", err));

/* =========================
   USER SCHEMA
========================= */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model("User", userSchema);

/* =========================
   ACCOUNT SCHEMA
========================= */

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema);

/* =========================
   EXPORT
========================= */

module.exports = {
    User,
    Account
};
