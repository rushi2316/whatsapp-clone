// ===============================
// ELEMENTS
// ===============================

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const messages = document.getElementById("messages");

const chatName = document.getElementById("chatName");
const chatStatus = document.getElementById("chatStatus");
const chatImage = document.getElementById("chatImage");

const chatItems = document.querySelectorAll(".chat-item");

// ===============================
// LOAD CURRENT CHAT
// ===============================

function loadConversation() {

    messages.innerHTML = "";

    const currentChat = chats[currentUser];

    chatName.textContent = currentChat.name;
    chatStatus.textContent = currentChat.status;
    chatImage.src = currentChat.image;

    currentChat.messages.forEach(msg => {

        const div = document.createElement("div");

        div.className = "message " + msg.type;

        div.textContent = msg.text;

        messages.appendChild(div);

    });

    messages.scrollTop = messages.scrollHeight;

}

// ===============================
// GET CURRENT TIME
// ===============================

function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {

        hour: "2-digit",
        minute: "2-digit"

    });

}

// ===============================
// UPDATE SIDEBAR
// ===============================

function updateSidebar() {

    chatItems.forEach(item => {

        const user = item.dataset.user;

        item.querySelector(".last-message").textContent =
            chats[user].lastMessage;

        item.querySelector(".chat-time").textContent =
            chats[user].time;

    });

}

// ===============================
// SEND MESSAGE
// ===============================

function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    chats[currentUser].messages.push({
        text: text,
        type: "sent"
    });

    chats[currentUser].lastMessage = text;
    chats[currentUser].time = getCurrentTime();

    updateSidebar();
    sendSocketMessage(text);
    saveChats();

    input.value = "";

    loadConversation();

    setTimeout(autoReply, 1000);

}

// ===============================
// AUTO REPLY
// ===============================

function autoReply() {

    const replies = [

        "Nice 😊",
        "Okay 👍",
        "😂😂😂",
        "Sure!",
        "Let's do it!",
        "See you soon!",
        "Sounds good!",
        "Awesome 😄"

    ];

    const random =
        replies[Math.floor(Math.random() * replies.length)];

    chats[currentUser].messages.push({

        text: random,
        type: "received"

    });

    chats[currentUser].lastMessage = random;
    chats[currentUser].time = getCurrentTime();

    updateSidebar();

    saveChats();

    loadConversation();

}

// ===============================
// BUTTON
// ===============================

sendBtn.onclick = sendMessage;

// ===============================
// ENTER KEY
// ===============================

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// ===============================
// SWITCH CHAT
// ===============================

chatItems.forEach(item => {

    item.addEventListener("click", () => {

        chatItems.forEach(chat => {

            chat.classList.remove("active");

        });

 currentUser = item.dataset.user;

joinRoom(currentUser);

loadConversation();

    });

});

// ===============================
// INITIAL LOAD
// ===============================
loadChats();

loadConversation();

updateSidebar();

joinRoom(currentUser);
input.addEventListener("input", () => {

    if(input.value.trim() === ""){

        sendBtn.style.display = "none";
        voiceBtn.style.display = "block";

    }
    else{

        sendBtn.style.display = "block";
        voiceBtn.style.display = "none";

    }

});