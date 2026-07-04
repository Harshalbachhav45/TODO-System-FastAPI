function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://127.0.0.1:8000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            email: email,
            password: password

        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        if(data.message === "Login Successful"){
            window.location.href = "dashboard.html";
        }

    })

    .catch(error => {

        console.log(error);

    });

}