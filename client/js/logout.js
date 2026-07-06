// ======================================
// LOGOUT MENU
// ======================================

const menuBtn = document.getElementById("menuBtn");
const logoutMenu = document.getElementById("logoutMenu");
const logoutBtn = document.getElementById("logoutBtn");

// ======================================
// TOGGLE MENU
// ======================================

if (menuBtn && logoutMenu) {

    menuBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        logoutMenu.style.display =

            logoutMenu.style.display === "block"
                ? "none"
                : "block";

    });

}

// ======================================
// LOGOUT
// ======================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        logout();

    });

}

// ======================================
// CLOSE MENU ON OUTSIDE CLICK
// ======================================

document.addEventListener("click", (e) => {

    if (

        logoutMenu &&
        menuBtn &&
        !menuBtn.contains(e.target) &&
        !logoutMenu.contains(e.target)

    ) {

        logoutMenu.style.display = "none";

    }

});