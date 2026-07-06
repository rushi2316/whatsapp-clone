const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch("http://localhost:3000/api/auth/signup", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,

                email,

                password

            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("🎉 Account Created Successfully!");

            window.location.href = "login.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error!");

    }

});