const Conversation = require("../models/Conversation");

exports.createConversation = async (req, res) => {

    try {

        const { receiverId } = req.body;

        const senderId = req.user.id;

        let conversation = await Conversation.findOne({

            members: {

                $all: [senderId, receiverId]

            }

        });

        if (conversation) {

            return res.status(200).json(conversation);

        }

        conversation = await Conversation.create({

            members: [

                senderId,

                receiverId

            ]

        });

        res.status(201).json(conversation);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};