// ======================================
// SOCKET CONNECTION
// ======================================

const socket = io("http://localhost:3000");

socket.on("connect", () => {

    console.log("✅ Connected to Server");
    console.log("Socket ID:", socket.id);

    // Join current chat when connected
    joinRoom(currentUser);

});

socket.on("welcome", (message) => {

    console.log(message);

});

socket.on("disconnect", () => {

    console.log("❌ Disconnected from Server");

});

// ======================================
// JOIN ROOM
// ======================================

function joinRoom(room) {

    socket.emit("joinRoom", room);

    console.log("📥 Joined Room:", room);

}

// ======================================
// SEND MESSAGE
// ======================================

function sendSocketMessage(text) {

    socket.emit("sendMessage", {

        room: currentUser,
        senderId: socket.id,
        text: text,
        time: new Date().toLocaleTimeString()

    });

}

// ======================================
// RECEIVE MESSAGE
// ======================================

socket.on("receiveMessage", (message) => {

    console.log("📩 Received:", message);

    // Ignore your own echoed message
    if (message.senderId === socket.id) return;

    // Ignore messages for other rooms
    if (message.room !== currentUser) return;

    // Save message
    chats[currentUser].messages.push({

        text: message.text,
        type: "received"

    });

    chats[currentUser].lastMessage = message.text;
    chats[currentUser].time = message.time;

    saveChats();

    updateSidebar();

    loadConversation();

});