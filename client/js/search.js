const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const chatItems = document.querySelectorAll(".chat-item");

    chatItems.forEach(chat => {

        const name = chat.querySelector("h4").textContent.toLowerCase();

        if (name.includes(value)) {

            chat.style.display = "flex";

        } else {

            chat.style.display = "none";

        }

    });

});