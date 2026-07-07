require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");

// NEW
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

// ------------------------------
// Routes
// ------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

// ------------------------------
// Test Route
// ------------------------------

app.get("/", (req, res) => {
    res.send("🚀 ChatConnect Backend is Running!");
});

// ------------------------------
// HTTP Server
// ------------------------------

const server = http.createServer(app);

// ------------------------------
// Socket.IO
// ------------------------------

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// ------------------------------
// Online Users
// ------------------------------

const onlineUsers = {};

app.set("io", io);
app.set("onlineUsers", onlineUsers);

// ------------------------------
// Socket Connection
// ------------------------------

io.on("connection", (socket) => {

    console.log("✅ User Connected:", socket.id);

    // ------------------------------
    // User Logged In
    // ------------------------------

    socket.on("userConnected", async (userId) => {

        onlineUsers[userId] = socket.id;

        try {

            await User.findByIdAndUpdate(userId, {
                isOnline: true
            });

        } catch (err) {

            console.error("❌ Error updating online status:", err.message);

        }

        console.log("🟢 Online Users");
        console.log(onlineUsers);

        io.emit("onlineUsers", Object.keys(onlineUsers));

    });

    // ------------------------------
    // Welcome
    // ------------------------------

    socket.emit(
        "welcome",
        "Welcome to ChatConnect!"
    );

    // ------------------------------
    // Join Conversation
    // ------------------------------

    socket.on("joinRoom", (conversationId) => {

        socket.join(conversationId);

        console.log(`${socket.id} joined ${conversationId}`);

    });

    // ------------------------------
    // Send Message
    // ------------------------------

    socket.on("sendMessage", (message) => {

        console.log("📨 Message Received");

        io.to(message.conversationId).emit(
            "receiveMessage",
            message
        );

    });

    // ------------------------------
    // Disconnect
    // ------------------------------

    socket.on("disconnect", async () => {

        let disconnectedUser = null;

        for (const userId in onlineUsers) {

            if (onlineUsers[userId] === socket.id) {

                disconnectedUser = userId;

                delete onlineUsers[userId];

                break;

            }

        }

        if (disconnectedUser) {

            try {

                const lastSeen = new Date();

await User.findByIdAndUpdate(disconnectedUser, {

    isOnline: false,

    lastSeen

});

// Tell everyone when this user was last seen
io.emit("userLastSeen", {

    userId: disconnectedUser,

    lastSeen

});

            } catch (err) {

                console.error("❌ Error updating last seen:", err.message);

            }

        }

        console.log("❌ User Disconnected:", socket.id);

        console.log("🟢 Online Users");
        console.log(onlineUsers);

        io.emit("onlineUsers", Object.keys(onlineUsers));

    });

});

// ------------------------------
// ------------------------------
// Start Server
// ------------------------------

const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await connectDB();

        server.listen(PORT, () => {

            console.log(`🚀 Server running on http://localhost:${PORT}`);

        });

    } catch (err) {

        console.error("❌ Failed to start server");
        console.error(err);

        process.exit(1);

    }

}

startServer();