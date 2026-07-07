// ======================================
// CONVERSATION MODULE
// ======================================

// ======================================
// OPEN OR CREATE CONVERSATION
// ======================================

async function openConversation(userId) {

    try {

        const response = await fetch(

            "https://whatsapp-clone-una6.onrender.com/api/conversations",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: getToken()

                },

                body: JSON.stringify({

                    receiverId: userId

                })

            }

        );

        const conversation = await response.json();

        if (!response.ok) {

            throw new Error(conversation.message);

        }

        // ------------------------------
        // Save Current Conversation
        // ------------------------------

        appState.currentConversation = conversation;

        // ------------------------------
        // Join Socket Room
        // ------------------------------

        joinRoom(conversation._id);

        console.log("✅ Conversation Loaded");
        console.log(conversation);

        // ------------------------------
        // Update UI
        // ------------------------------

        updateChatHeader();

        await loadMessages();

    }

    catch (err) {

        console.error("❌ Conversation Error:", err.message);

    }

}

// ======================================
// FORMAT LAST SEEN
// ======================================

function formatLastSeen(date) {

    if (!date) {

        return "Offline";

    }

    const lastSeen = new Date(date);
    const now = new Date();

    const time = lastSeen.toLocaleTimeString([], {

        hour: "2-digit",
        minute: "2-digit"

    });

    // Today
    if (lastSeen.toDateString() === now.toDateString()) {

        return `Last seen today at ${time}`;

    }

    // Yesterday
    const yesterday = new Date(now);

    yesterday.setDate(now.getDate() - 1);

    if (lastSeen.toDateString() === yesterday.toDateString()) {

        return `Last seen yesterday at ${time}`;

    }

    // Older dates
    const formattedDate = lastSeen.toLocaleDateString([], {

        day: "numeric",
        month: "short",
        year: "numeric"

    });

    return `Last seen ${formattedDate} at ${time}`;

}

// ======================================
// UPDATE CHAT HEADER
// ======================================

function updateChatHeader() {

    if (!appState.selectedUser) return;

    const chatName = document.getElementById("chatName");
    const chatStatus = document.getElementById("chatStatus");
    const chatImage = document.getElementById("chatImage");

    chatName.textContent = appState.selectedUser.name;

    if (appState.selectedUser.isOnline) {

        chatStatus.textContent = "Online";
        chatStatus.style.color = "#25D366";

    } else {

        chatStatus.textContent = formatLastSeen(
            appState.selectedUser.lastSeen
        );

        chatStatus.style.color = "#667781";

    }

    chatImage.src =
        appState.selectedUser.profilePic ||
        `https://i.pravatar.cc/150?u=${appState.selectedUser.email}`;

}