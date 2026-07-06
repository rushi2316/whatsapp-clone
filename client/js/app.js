// ======================================
// APP START
// ======================================

console.log("Before protectPage");

protectPage();

console.log("After protectPage");

// ======================================
// APPLICATION STATE
// ======================================

const appState = {

    currentUser: getCurrentUser(),

    users: [],

    selectedUser: null,

    currentConversation: null,

    conversations: {},

    onlineUsers: []

};


console.log("Application Started");
console.log(appState);

loadUsers();