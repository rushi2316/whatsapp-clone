// ===============================
// CONTACT DATA
// ===============================

const chats = {

    john: {

        name: "John Doe",

        status: "Online",

        image: "https://i.pravatar.cc/150?img=5",

        lastMessage: "Hello 👋",

        time: "10:30 AM",

        messages: [

            {
                text: "Hello 👋",
                type: "received"
            },

            {
                text: "Hi! How are you?",
                type: "sent"
            },

            {
                text: "I'm good 😄",
                type: "received"
            }

        ]

    },

    alice: {

        name: "Alice",

        status: "Last seen today at 9:45 AM",

        image: "https://i.pravatar.cc/150?img=8",

        lastMessage: "Let's meet today.",

        time: "9:40 AM",

        messages: [

            {
                text: "Let's meet today.",
                type: "received"
            },

            {
                text: "Sure! Where?",
                type: "sent"
            }

        ]

    },

    david: {

        name: "David",

        status: "Typing...",

        image: "https://i.pravatar.cc/150?img=15",

        lastMessage: "😂😂😂",

        time: "Yesterday",

        messages: [

            {
                text: "😂😂😂",
                type: "received"
            }

        ]

    }

};

// ===============================
// CURRENT OPEN CHAT
// ===============================

let currentUser = "john";