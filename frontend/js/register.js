async function register() {

    const data = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    const response = await fetch(
        "http://localhost:3000/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

    window.location.href = "login.html";
}