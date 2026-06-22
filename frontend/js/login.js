document
.getElementById("loginForm")
.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        loginUser();
    }
);

async function loginUser(){

    const login =
    document.getElementById("login").value;

    const password =
    document.getElementById("password").value;

    const response =
    await fetch(
        "http://localhost:3000/login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                login,
                password
            })
        }
    );

    const result =
    await response.json();

    if(result.message === "Login Successful"){

        localStorage.setItem(
            "user",
            JSON.stringify(result.user)
        );

        window.location.href =
        "dashboard.html";

    }else{

        alert(result.message);
    }
}