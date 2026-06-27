const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const response = await fetch("/api/users/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            username: document.getElementById("username").value,

            password: document.getElementById("password").value

        })

    });

    const data = await response.json();

    if (data.token) {

        localStorage.setItem("token", data.token);

        window.location.href = "admin.html";

    }

    else {

        alert(data.message);

    }

});