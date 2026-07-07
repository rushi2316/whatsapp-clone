// ======================================
// MESSAGE MODULE
// ======================================

// ======================================
// LOAD MESSAGES
// ======================================

async function loadMessages() {

    if (!appState.currentConversation) return;

    try {

        const response = await fetch(

            `https://whatsapp-clone-una6.onrender.com/api/messages/${appState.currentConversation._id}`,

            {

                headers: {

                    Authorization: getToken()

                }

            }

        );

        const messages = await response.json();

        if (!response.ok) {

            throw new Error(messages.message);

        }

        renderMessages(messages);

    }

    catch (err) {

        console.error("❌ Load Messages:", err.message);

    }

}

// ======================================
// RENDER MESSAGES
// ======================================

function renderMessages(messages) {

    const container = document.getElementById("messages");

    container.innerHTML = "";

    messages.forEach(message => {

        // ======================================
        // Bubble
        // ======================================

        const bubble = document.createElement("div");

        const isMine =
            message.sender._id === appState.currentUser._id;

        bubble.className =

            isMine

                ? "message sent"

                : "message received";

        // ======================================
        // Message Text
        // ======================================

        const text = document.createElement("div");

        text.className = "message-text";

        text.textContent = message.text;

        bubble.appendChild(text);

        // ======================================
        // Footer
        // ======================================

        const footer = document.createElement("div");

        footer.className = "message-footer";

        // ======================================
        // Time
        // ======================================

        const time = document.createElement("span");

        time.className = "message-time";

        time.textContent = new Date(

            message.createdAt

        ).toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

        footer.appendChild(time);

        // ======================================
        // Status (Only My Messages)
        // ======================================

        if (isMine) {

            const status = document.createElement("span");

            status.className = "message-status";

            switch (message.status) {

                case "sent":

                    status.textContent = "✓";

                    break;

                case "delivered":

                    status.textContent = "✓✓";

                    break;

                case "seen":

                    status.textContent = "✓✓";

                    status.classList.add("seen");

                    break;

                default:

                    status.textContent = "";

            }

            footer.appendChild(status);

        }

        bubble.appendChild(footer);

        container.appendChild(bubble);

    });

    // ======================================
    // Auto Scroll
    // ======================================

    container.scrollTop = container.scrollHeight;

}