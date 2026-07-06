const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.sendMessage = async (req, res) => {

    try {

        const { conversationId, text } = req.body;

        const sender = req.user.id;

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {

            return res.status(404).json({

                message: "Conversation not found"

            });

        }

const message = await Message.create({

    conversationId,

    sender,

    text

});

// Populate sender details
await message.populate("sender", "name profilePic status");

// Get Socket.IO
const io = req.app.get("io");

// Get Online Users
const onlineUsers = req.app.get("onlineUsers");

// Find the receiver
const receiverId = conversation.members.find(

    member => member.toString() !== sender

);

// Get receiver socket
const receiverSocket = onlineUsers[receiverId];

// Send instantly if online
if (receiverSocket) {

    io.to(receiverSocket).emit("newMessage", message);

}

res.status(201).json(message);



    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.getMessages = async (req, res) => {

    try {

        const { conversationId } = req.params;

        const messages = await Message.find({
            conversationId
        })
        .populate("sender", "name profilePic status")
        .sort({
            createdAt: 1
        });

        res.status(200).json(messages);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
// ======================================
// UPDATE MESSAGE STATUS
// ======================================

exports.updateMessageStatus = async (req, res) => {

    try {

        const { messageId } = req.params;

        const { status } = req.body;

        const update = {

            status

        };

        if (status === "delivered") {

            update.deliveredAt = new Date();

        }

        if (status === "seen") {

            update.seenAt = new Date();

        }

        const message = await Message.findByIdAndUpdate(

            messageId,

            update,

            {

                new: true

            }

        );

        if (!message) {

            return res.status(404).json({

                message: "Message not found"

            });

        }

        res.status(200).json(message);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};