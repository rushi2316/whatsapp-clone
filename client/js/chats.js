// ======================================
// CHAT MODULE
// ======================================

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// ======================================
// TOGGLE SEND BUTTON
// ======================================

function toggleButtons() {

    if (input.value.trim() === "") {

        sendBtn.style.display = "none";
        voiceBtn.style.display = "block";

    } else {

        sendBtn.style.display = "block";
        voiceBtn.style.display = "none";

    }

}

input.addEventListener("input", toggleButtons);

// ======================================
// SEND MESSAGE
// ======================================

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    if (!appState.currentConversation) {

        alert("Please select a chat first.");

        return;

    }

    sendBtn.disabled = true;

    try {

        const response = await fetch(

            "https://whatsapp-clone-una6.onrender.com/api/messages",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: getToken()

                },

                body: JSON.stringify({

                    conversationId: appState.currentConversation._id,

                    text

                })

            }

        );

        const message = await response.json();

        if (!response.ok) {

            throw new Error(message.message);

        }

        // ------------------------------
        // Clear Input
        // ------------------------------

        input.value = "";

        toggleButtons();

        // ------------------------------
        // Update Sidebar
        // ------------------------------

        appState.conversations[appState.selectedUser._id] = {

            lastMessage: "You: " + text,

            time: new Date().toLocaleTimeString([], {

                hour: "2-digit",

                minute: "2-digit"

            })

        };

        renderUsers();

        // ------------------------------
        // Notify Socket Users
        // ------------------------------

        sendSocketMessage(message);

        // ------------------------------
        // Refresh Messages
        // ------------------------------

        await loadMessages();

    }

    catch (err) {

        console.error("❌ Send Message:", err.message);

    }

    finally {

        sendBtn.disabled = false;

    }

}

// ======================================
// EVENTS
// ======================================

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// ======================================
// INITIAL BUTTON STATE
// ======================================

toggleButtons();