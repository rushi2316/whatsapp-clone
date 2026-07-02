require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store current room of each socket
const userRooms = {};

// ------------------------------
// Test Route
// ------------------------------
app.get("/", (req, res) => {
    res.send("🚀 WhatsApp Clone Backend is Running!");
});

// ------------------------------
// Socket.IO
// ------------------------------
io.on("connection", (socket) => {

    console.log("✅ User Connected:", socket.id);

    socket.emit("welcome", "Welcome to WhatsApp Clone!");

    socket.on("joinRoom", (room) => {

        if (userRooms[socket.id]) {

            socket.leave(userRooms[socket.id]);

            console.log(`${socket.id} left ${userRooms[socket.id]}`);

        }

        socket.join(room);

        userRooms[socket.id] = room;

        console.log(`${socket.id} joined ${room}`);

    });

    socket.on("sendMessage", (message) => {

        console.log("📨", message);

        console.log("Broadcasting to room:", message.room);

        io.to(message.room).emit("receiveMessage", message);

    });

    socket.on("disconnect", () => {

        delete userRooms[socket.id];

        console.log("❌ User Disconnected:", socket.id);

    });

});

// ------------------------------
// Connect Database
// ------------------------------
connectDB();

// ------------------------------
// Start Server
// ------------------------------
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});