const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { Account } = require("../db");
const { authMiddleware } = require("../middleware");


// =======================
// GET BALANCE
// GET /api/v1/account/balance
// =======================
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    res.status(200).json({
        balance: account.balance
    });
});


// =======================
// TRANSFER MONEY
// POST /api/v1/account/transfer
// =======================
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { to, amount } = req.body;

        // Fetch sender account
        const senderAccount = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Fetch receiver account
        const receiverAccount = await Account.findOne({
            userId: to
        }).session(session);

        if (!receiverAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Debit sender
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        // Credit receiver
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();

        res.status(200).json({
            message: "Transfer successful"
        });

    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Transfer failed"
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;
