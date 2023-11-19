const paginaLogin = document.getElementById("mean-login");
const registerLink = document.getElementById("registerLink");
const inicioLink = document.getElementById("inicioSesion");
const loginBtn = document.getElementById("Login");
const landingPage = document.getElementById("productos");
const logOutBtn = document.getElementById("logOut");
const pedidoBtn = document.getElementById("pedidoBtn");
const modalPedido = document.getElementById("blur-modal");
const cancelPedido = document.getElementById("cancel-pedido");
const confirmPedido = document.getElementById("confirm-pedido");
const floatPedido = document.getElementById("float-pedido");
const addBtns = document.getElementsByClassName("add-icon");
const userInput = document.getElementById("correo");
const confirmedPage = document.getElementById("confirmed");
const seguirPedido = document.getElementById("follow-btn");
const statusPage = document.getElementById("status-pedido");
const detailBack = document.getElementById("detail-goback");
const alertLogin = document.getElementById("setting");
//en estos arreglos se almacenan los articulos favoritos y/o el pedido de un usuario para subirlo al local storage
let pedido = [];
let favorites = [];

userInput.addEventListener("blur", (event) => {
    const resultado = document.getElementById("emailHelp");
    setTimeout(() => {
        resultado.style.display = "block";
    }, 1000);
});

// función asincronica para enviar el login

async function logIn(credentials) {
    let response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    let jsonUser = await response.json();
    console.log(jsonUser);
    if (jsonUser.status == 200) {
        window.location.href = "./admin.html";
    } else if (jsonUser.status == 401) {
        let message = document.createElement("div");
        message.className = "alert alert-danger mt-3";
        message.id = "alert-message";
        message.setAttribute("role", "alert");
        message.innerHTML = jsonUser.description;
        let alert = document.getElementById("alert-message");
        if (alert) {
            console.log("Alerta de credenciales erroneas!");
        } else {
            paginaLogin.appendChild(message);
        }
    } else {
        window.location.href = "./index.html";
    }
}

// seleccionamos los valores ingresados por el usuario
let userEmail = document.getElementById("correo");
let userPassword = document.getElementById("password");

loginBtn.addEventListener("click", () => {
    let credentials = {
        email: userEmail.value,
        contrasena: userPassword.value,
    };
    logIn(credentials);
});