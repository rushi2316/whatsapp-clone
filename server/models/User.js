const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePic: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        default: "Hey there! I am using WhatsApp Clone."
    },

    isOnline: {
        type: Boolean,
        default: false
    },

    // ------------------------------
    // Last Seen
    // ------------------------------

    lastSeen: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);