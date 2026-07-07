const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch(
            "https://whatsapp-clone-una6.onrender.com/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            // Save JWT Token
            localStorage.setItem("token", data.token);

            // Save Logged-in User
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("🎉 Login Successful!");

            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Server Error!");
    }
});