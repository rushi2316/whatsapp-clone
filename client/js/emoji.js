const emojiBtn =
document.getElementById("emojiBtn");

const emojiPicker =
document.getElementById("emojiPicker");

const messageInput =
document.getElementById("messageInput");

emojiBtn.onclick = () => {

    emojiPicker.style.display =
        emojiPicker.style.display === "flex"
        ? "none"
        : "flex";

};

document.querySelectorAll("#emojiPicker span")
.forEach(emoji=>{

    emoji.onclick=()=>{

        messageInput.value += emoji.textContent;

        messageInput.focus();

    };

});

document.addEventListener("click",(e)=>{

    if(!emojiPicker.contains(e.target)
       && e.target!==emojiBtn){

        emojiPicker.style.display="none";

    }

});