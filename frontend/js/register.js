function registerUser() {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://127.0.0.1:8000/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username: username,
            email: email,
            password: password

        })

    })

    .then(response => response.json())

    .then(data => {

       window.location.href = "login.html";  //directly goes to the login page ok

        console.log(data);

    })

    .catch(error => {

        console.log(error);

    });

}