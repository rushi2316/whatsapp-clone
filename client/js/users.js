// ======================================
// USERS MODULE
// ======================================

const API_URL = "https://whatsapp-clone-una6.onrender.com/api";

// ======================================
// LOAD USERS FROM DATABASE
// ======================================

async function loadUsers() {

    try {

        const response = await fetch(`${API_URL}/auth/users`, {

            method: "GET",

            headers: {

                Authorization: getToken()

            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        // ------------------------------
        // Store users except yourself
        // ------------------------------

        appState.users = data.filter(user =>

            user._id !== appState.currentUser._id

        );

        // ------------------------------
        // Restore Online Status
        // ------------------------------

        appState.users.forEach(user => {

            user.isOnline =

                appState.onlineUsers?.includes(user._id) || false;

        });

        // ------------------------------
        // Current User Profile Picture
        // ------------------------------

        const currentUserImage =

            document.getElementById("currentUserImage");

        if (currentUserImage) {

            currentUserImage.src =

                appState.currentUser.profilePic ||

                `https://i.pravatar.cc/150?u=${appState.currentUser.email}`;

        }

        renderUsers();

        // ------------------------------
        // Auto Open First Chat
        // ------------------------------

        if (

            appState.users.length > 0 &&

            !appState.selectedUser

        ) {

            appState.selectedUser = appState.users[0];

            openConversation(appState.selectedUser._id);

        }

    }

    catch (err) {

        console.error(

            "❌ Error Loading Users:",

            err.message

        );

    }

}

// ======================================
// RENDER USERS
// ======================================

function renderUsers() {

    const chatList = document.querySelector(".chat-list");

    chatList.innerHTML = "";

    appState.users.forEach(user => {

        const userCard = document.createElement("div");

        userCard.className = "chat-item";

        if (

            appState.selectedUser &&

            appState.selectedUser._id === user._id

        ) {

            userCard.classList.add("active");

        }

        userCard.dataset.id = user._id;

        userCard.innerHTML = `

            <img src="${
                user.profilePic ||
                `https://i.pravatar.cc/150?u=${user.email}`
            }">

            <div class="chat-details">

                <div class="top-row">

                    <h4>
                        ${user.name}

                        ${
                            user.isOnline
                                ? `<span class="online-dot"></span>`
                                : ""
                        }

                    </h4>

                    <span class="chat-time">

                        ${

                            appState.conversations[user._id]?.time || ""

                        }

                    </span>

                </div>

                <p class="last-message ${user.isOnline ? "online" : ""}">

                    ${

                        user.isOnline

                            ? "Online"

                            : (

                                appState.conversations[user._id]?.lastMessage ||

                                formatLastSeen(user.lastSeen)

                            )

                    }

                </p>

            </div>

        `;

        userCard.addEventListener("click", () => {

            document

                .querySelectorAll(".chat-item")

                .forEach(item =>

                    item.classList.remove("active")

                );

            userCard.classList.add("active");

            appState.selectedUser = user;

            openConversation(user._id);

        });

        chatList.appendChild(userCard);

    });

}