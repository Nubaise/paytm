const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

// =======================
// ZOD SCHEMAS
// =======================

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    password: zod.string().min(6)
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

const updateSchema = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().min(1).optional(),
    lastName: zod.string().min(1).optional()
});

// =======================
// SIGNUP
// POST /api/v1/user/signup
// =======================

router.post("/signup", async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const { username, firstName, lastName, password } = parsed.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        firstName,
        lastName,
        password: hashedPassword
    });

    // 🎯 CREATE ACCOUNT WITH RANDOM BALANCE
    await Account.create({
        userId: user._id,
        balance: Math.floor(Math.random() * 10000) + 1
    });

    // Generate JWT
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET
    );

    res.status(200).json({
        message: "User created successfully",
        token
    });
});


// =======================
// SIGNIN
// POST /api/v1/user/signin
// =======================

router.post("/signin", async (req, res) => {
    const parsed = signinSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const { username, password } = parsed.data;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET
    );

    res.status(200).json({
        token
    });
});

// =======================
// UPDATE USER (PROTECTED)
// PUT /api/v1/user
// =======================

router.put("/", authMiddleware, async (req, res) => {
    const parsed = updateSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    const updateData = {};

    if (parsed.data.firstName) {
        updateData.firstName = parsed.data.firstName;
    }

    if (parsed.data.lastName) {
        updateData.lastName = parsed.data.lastName;
    }

    if (parsed.data.password) {
        updateData.password = await bcrypt.hash(parsed.data.password, 10);
    }

    await User.updateOne(
        { _id: req.userId },
        { $set: updateData }
    );

    res.status(200).json({
        message: "Updated successfully"
    });
});

// =======================
// BULK USER SEARCH
// GET /api/v1/user/bulk?filter=abc
// =======================

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } }
        ]
    });

    res.status(200).json({
        users: users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
