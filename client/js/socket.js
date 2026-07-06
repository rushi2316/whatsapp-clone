// ======================================
// SOCKET CONNECTION
// ======================================

const socket = io("http://localhost:3000");

// ======================================
// CONNECT
// ======================================

socket.on("connect", () => {

    console.log("✅ Connected to Server");
    console.log("Socket ID:", socket.id);

    if (appState.currentUser) {

        socket.emit(
            "userConnected",
            appState.currentUser._id
        );

    }

});

// ======================================
// WELCOME
// ======================================

socket.on("welcome", (message) => {

    console.log(message);

});

// ======================================
// DISCONNECT
// ======================================

socket.on("disconnect", () => {

    console.log("❌ Disconnected from Server");

});

// ======================================
// STORE ONLINE USERS
// ======================================

socket.on("onlineUsers", (users) => {

    console.log("🟢 Online Users:", users);

    // Store the latest online users list
    appState.onlineUsers = users;

    // Update every user's online status
    if (appState.users.length > 0) {

        appState.users.forEach(user => {

            user.isOnline = users.includes(user._id);

        });

        // Refresh sidebar
        renderUsers();

        // Refresh chat header if a chat is open
        if (appState.selectedUser) {

            updateChatHeader();

        }

    }

});
// ======================================
// USER LAST SEEN
// ======================================

socket.on("userLastSeen", ({ userId, lastSeen }) => {

    console.log("🕒 Last Seen Updated:", userId);

    const user = appState.users.find(
        u => u._id === userId
    );

    if (!user) return;

    user.lastSeen = lastSeen;
    user.isOnline = false;

    renderUsers();

    if (
        appState.selectedUser &&
        appState.selectedUser._id === userId
    ) {
        updateChatHeader();
    }

});

// ======================================
// JOIN ROOM
// ======================================

function joinRoom(conversationId) {

    socket.emit("joinRoom", conversationId);

    console.log("📥 Joined:", conversationId);

}

// ======================================
// SEND MESSAGE
// ======================================

function sendSocketMessage(message) {

    socket.emit("sendMessage", message);

}

// ======================================
// RECEIVE MESSAGE
// ======================================

socket.on("receiveMessage", async (message) => {

    console.log("📩 New Message");
    console.log(message);

    if (appState.selectedUser) {

        appState.conversations[appState.selectedUser._id] = {

            lastMessage: message.text,

            time: new Date().toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit"

            })

        };

        renderUsers();

    }

    if (

        !appState.currentConversation ||

        message.conversationId !== appState.currentConversation._id

    ) {

        return;

    }

    await loadMessages();

});