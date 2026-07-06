const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createConversation
} = require("../controllers/conversationController");

router.post("/", authMiddleware, createConversation);

module.exports = router;