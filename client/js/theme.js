const themeBtn = document.getElementById("themeBtn");

let darkMode =
localStorage.getItem("darkMode") === "true";

applyTheme();

themeBtn.onclick = () => {

    darkMode = !darkMode;

    localStorage.setItem("darkMode", darkMode);

    applyTheme();

};

function applyTheme(){

    if(darkMode){

        document.body.classList.add("dark");

        themeBtn.className =
        "fa-solid fa-sun";

    }else{

        document.body.classList.remove("dark");

        themeBtn.className =
        "fa-solid fa-moon";

    }

}