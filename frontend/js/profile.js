const user =
JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("name").innerText =
user.name;

document.getElementById("email").innerText =
user.email;

document.getElementById("mobile").innerText =
user.mobile;

document.getElementById("username").innerText =
user.username;

const dobDate = new Date(user.dob);

document.getElementById("dob").innerText =
dobDate.toLocaleDateString("en-IN");

document.getElementById("gender").innerText =
user.gender;

document.getElementById("avatar").innerText =
user.name.charAt(0).toUpperCase();

function showEditForm() {

    document.getElementById(
        "editSection"
    ).style.display = "block";

    document.getElementById(
        "editName"
    ).value = user.name;

    document.getElementById(
        "editEmail"
    ).value = user.email;

    document.getElementById(
        "editMobile"
    ).value = user.mobile;

    document.getElementById(
        "editDob"
    ).value = user.dob
        ? user.dob.split("T")[0]
        : "";

    document.getElementById(
        "editGender"
    ).value = user.gender;
}

async function saveProfile() {

    const name =
    document.getElementById(
        "editName"
    ).value;

    const email =
    document.getElementById(
        "editEmail"
    ).value;

    const mobile =
    document.getElementById(
        "editMobile"
    ).value;

    const dob =
    document.getElementById(
        "editDob"
    ).value;

    const gender =
    document.getElementById(
        "editGender"
    ).value;

    try {

        const response =
        await fetch(
            `http://localhost:3000/users/${user.id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    mobile,
                    dob,
                    gender
                })
            }
        );

        const result =
        await response.json();

        alert(result.message);

        user.name = name;
        user.email = email;
        user.mobile = mobile;
        user.dob = dob;
        user.gender = gender;

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        location.reload();

    } catch (error) {

        console.error(error);

        alert(
            "Profile update failed"
        );
    }
}
function showPasswordForm(){

    document.getElementById(
        "passwordSection"
    ).style.display = "block";
}

async function changePassword(){

    const oldPassword =
    document.getElementById(
        "oldPassword"
    ).value;

    const newPassword =
    document.getElementById(
        "newPassword"
    ).value;

    if(!oldPassword || !newPassword){

        alert(
            "Please fill all fields"
        );

        return;
    }

    try{

        const response =
        await fetch(
            `http://localhost:3000/change-password/${user.id}`,
            {
                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    oldPassword,
                    newPassword
                })
            }
        );

        const result =
        await response.json();

        alert(result.message);

        document.getElementById(
            "oldPassword"
        ).value = "";

        document.getElementById(
            "newPassword"
        ).value = "";

    }
    catch(error){

        console.error(error);

        alert(
            "Password update failed"
        );
    }
}
