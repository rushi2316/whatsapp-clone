// ======================================
// AUTHENTICATION MODULE
// ======================================

// ======================================
// GET JWT TOKEN
// ======================================

function getToken() {

    return localStorage.getItem("token");

}

// ======================================
// GET LOGGED-IN USER
// ======================================

function getCurrentUser() {

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;

}

// ======================================
// CHECK LOGIN STATUS
// ======================================

function isLoggedIn() {

    return !!getToken();

}

// ======================================
// PROTECT PRIVATE PAGES
// ======================================

function protectPage() {

    if (!isLoggedIn()) {

        alert("Please login first!");

        window.location.replace("login.html");

    }

}

// ======================================
// REDIRECT IF ALREADY LOGGED IN
// Used on login.html & signup.html
// ======================================

function redirectIfLoggedIn() {

    if (isLoggedIn()) {

        window.location.replace("index.html");

    }

}

// ======================================
// LOGOUT
// ======================================

function logout() {

    const confirmLogout = confirm(

        "Are you sure you want to logout?"

    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.replace("login.html");

}