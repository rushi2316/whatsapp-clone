// ===============================
// SAVE CHATS
// ===============================

function saveChats() {

    localStorage.setItem(
        "whatsappChats",
        JSON.stringify(chats)
    );

}

// ===============================
// LOAD CHATS
// ===============================

function loadChats() {

    const savedChats =
        localStorage.getItem("whatsappChats");

    if(savedChats){

        const data = JSON.parse(savedChats);

        Object.keys(data).forEach(user=>{

            chats[user] = data[user];

        });

    }

}