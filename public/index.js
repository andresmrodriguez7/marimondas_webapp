const paginaRegistro = document.getElementById("mean-register");
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


userInput.addEventListener('blur', (event) => {
    const resultado = document.getElementById("emailHelp");
    setTimeout(() => { resultado.style.display = "block" }, 1000)
});

// función asincronica para registrar a un usuario
// si está vacío (error 400) despliqga un pop up
// si son datos existentes (error 403) despliqga un pop up

async function registerUser(userData) {
    let response = await fetch("/usuarios", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    let jsonUser = await response.json();
    console.log(jsonUser);
    if (jsonUser.status === 200) {
        let toast = document.createElement("div");
        toast.className = "toast";
        toast.id = "alert-toast";
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
        toast.setAttribute("aria-atomic", "true");
        toast.setAttribute("autohide", "true");
        toast.innerHTML = ` <div class="toast-header">
        <img  class="rounded me-2" >
        <strong class="me-auto">Delilah Restó</strong>
        <small>just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Tu cuenta ha sido creada ${userData.nombre}! ${jsonUser.description}.
      </div>`;
        let alert = document.getElementById("alert-toast")
        if (alert) {
            console.log("Toast ya ha sido desplegado");
        } else {
            paginaRegistro.appendChild(toast)
            let alert = document.getElementById("alert-toast")
            setTimeout(() => {
                paginaRegistro.removeChild(alert);
            }, 3000)
        }


    } else if (jsonUser.status === 400) {
        let toast = document.createElement("div");
        toast.className = "toast";
        toast.id = "alert-toast";
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
        toast.setAttribute("aria-atomic", "true");
        toast.setAttribute("autohide", "true");
        toast.innerHTML = ` <div class="toast-header">
        <img  class="rounded me-2" >
        <strong class="me-auto">Delilah Restó</strong>
        <small>just now</small>
      </div>
      <div class="toast-body">
${jsonUser.description}      </div>`;
        let alert = document.getElementById("alert-toast")
        if (alert) {
            paginaRegistro.removeChild(alert);
        } else {
            paginaRegistro.appendChild(toast)
            let alert = document.getElementById("alert-toast")
            setTimeout(() => {
                paginaRegistro.removeChild(alert);
            }, 3000)
        }

    } else if (jsonUser.status === 403) {
        let toast = document.createElement("div");
        toast.className = "toast";
        toast.id = "alert-toast";
        toast.setAttribute("role", "alert");
        toast.setAttribute("aria-live", "assertive");
        toast.setAttribute("aria-atomic", "true");
        toast.setAttribute("autohide", "true");
        toast.innerHTML = ` <div class="toast-header">
        <img  class="rounded me-2" >
        <strong class="me-auto">Delilah Restó</strong>
        <small>just now</small>
      </div>
      <div class="toast-body">
        ${jsonUser.description}
      </div>`;
        let alert = document.getElementById("alert-toast")
        if (alert) {
            paginaRegistro.removeChild(alert);
        } else {
            paginaRegistro.appendChild(toast)
            let alert = document.getElementById("alert-toast")
            setTimeout(() => {
                paginaRegistro.removeChild(alert);
            }, 3000)
        }
    }
}

//  instancia de los input del registro
let newUser = document.getElementById("user");
let newName = document.getElementById("nombres");
let newLastName = document.getElementById("apellidos");
let newEmail = document.getElementById("email");
let newPhone = document.getElementById("telefono");
let newAddress = document.getElementById("direccion");
let newPassword = document.getElementById("contrasena");
let registrarBtn = document.getElementById("registrarUsuario");

// evento del boton registrar usuario
registrarUsuario.addEventListener('click', () => {

    let userData = {
        "usuario": newUser.value,
        "nombre": newName.value,
        "apellidos": newLastName.value,
        "email": newEmail.value,
        "telefono": newPhone.value,
        "direccion": newAddress.value,
        "contrasena": newPassword.value
    }
    registerUser(userData);
    paginaRegistro.style.display = "block";
    paginaLogin.style.display = "none";
});

registerLink.addEventListener('click', () => {
    paginaRegistro.style.display = "block";
    paginaLogin.style.display = "none";
});

inicioLink.addEventListener('click', () => {
    paginaRegistro.style.display = "none";
    paginaLogin.style.display = "block";
});

// función asincronica para enviar el login

async function logIn(credentials) {
    let response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    let jsonUser = await response.json();
    console.log(jsonUser);
    if (jsonUser.status == 200) {
        landingPage.style.display = "block";
        paginaLogin.style.display = "none";
        let bienvenida = document.getElementsByClassName("user_nombre");
        for (let i = 0; i < bienvenida.length; i++) {
            const element = bienvenida[i];
            element.innerHTML = jsonUser.body.nombre;
        }
        localStorage.setItem("id_logeado", jsonUser.body.id_usuario);
        localStorage.setItem("nombre_logeado", jsonUser.body.nombre);
        localStorage.setItem("apellidos_logeado", jsonUser.body.apellidos);
        localStorage.setItem("direccion_logeado", jsonUser.body.direccion);
    } else if (jsonUser.status == 100) {
        window.location.href = "./admin.html"
    } else {
        let message = document.createElement("div");
        message.className = "alert alert-danger mt-3";
        message.id = "alert-message";
        message.setAttribute("role", "alert");
        message.innerHTML = jsonUser.description;
        let alert = document.getElementById("alert-message")
        if (alert) {
            console.log("Alerta de credenciales erroneas!");
        } else {
            paginaLogin.appendChild(message);
        }
    }
}

// seleccionamos los valores ingresados por el usuario
let userEmail = document.getElementById("correo");
let userPassword = document.getElementById("password");
loginBtn.addEventListener('click', () => {
    let credentials = {
        "email": userEmail.value,
        "contrasena": userPassword.value
    }
    logIn(credentials);
});

logOutBtn.addEventListener('click', () => {
    window.location.href = "/index.html";

});

// esta función se suscribe a un evento para identificar el ID del producto que se desea incluir en un pedido
// una vez identificado lo guarda en el local storage
let productListPedido = document.getElementById("product-list-pedido");

let dibujarPedido = async() => {
    if (localStorage.getItem("pedido", JSON.stringify(pedido))) {
        pedido = JSON.parse(localStorage.getItem("pedido"));
        let floatPedido = document.getElementById("float-pedido");
        let response = await fetch(`productos`);
        let jsonProduct = await response.json();
        productListPedido.innerHTML = " ";
        for (let i = 0; i < pedido.length; i++) {
            const element = pedido[i];
            let solicitado = jsonProduct.body.find(e => e.id_productos == element);
            console.log(solicitado);
            let product = document.createElement("div");
            product.className = "card";
            product.id = `${element}`;
            product.innerHTML += `   
            <div class="card">
                            <div class="row g-0">
                            <div class="col-md-4">
                                    <img src="./styles/images/${solicitado.url}" alt="${solicitado.descripcion}">
                                    <div>
                                        <h6 class="card-title">${solicitado.nombre}</h6>
                                        <p class=" text-muted"><small class="text-muted">$${solicitado.precio}</small></p>
                                    </div>
                                    <span id=${element} class="fav-icon"><i class="far fa-heart"></i></i></span>
                                    </div>   
                            </div>
                        </div>`;
            productListPedido.appendChild(product);
        }
        floatPedido.style.display = "block"
    }
}

function guardarPedido() {
    let addIcon = document.getElementsByClassName("fas fa-plus-circle");
    for (let i = 0; i < addIcon.length; i++) {
        const element = addIcon[i];
        if (localStorage.getItem("pedido", JSON.stringify(pedido))) {
            pedido = JSON.parse(localStorage.getItem("pedido"));
        }
        element.addEventListener("click", () => {
            let idProduct = (event.target.id);
            if (element.className === "fas fa-plus-circle selected") {
                alert("Este producto ya fue seleccionado");
            } else {
                element.className === "fas fa-plus-circle selected"
                pedido.push(idProduct);
            }
            localStorage.setItem("pedido", JSON.stringify(pedido))
            dibujarPedido();
        })
    }

}

//funcion para consultar los pedidos registrados en el sistema y mostrarlos
let productListContainer = document.getElementById("product-list");

let obtenerProductos = async function getProducts() {
    let response = await fetch("/productos");
    let jsonProducts = await response.json();
    if (jsonProducts.status === 200) {
        productListContainer.innerHTML = "";
        for (let i = 0; i < jsonProducts.body.length; i++) {
            const element = jsonProducts.body[i];
            let product = document.createElement("div");
            product.className = "card";
            product.id = `${element.descripcion}`;
            product.innerHTML += `   
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="./styles/images/${element.url}" alt="${element.descripcion}">
                    <div>
                        <h6 class="card-title">${element.nombre}</h6>
                        <p class=" text-muted"><small class="text-muted">$${element.precio}</small></p>
                    </div>
                    <span class="add-icon"><i id="${element.id_productos}" class="fas fa-plus-circle"></i></span>
                </div>
            </div>`;
            productListContainer.appendChild(product)
        }
        guardarPedido();
    }
}


obtenerProductos();

let desplegarModalPedido = async() => {
    modalPedido.style.display = "block";
    let pedidoList = document.getElementById("pedido-list");
    if (localStorage.getItem("pedido", JSON.stringify(pedido))) {
        pedido = JSON.parse(localStorage.getItem("pedido"));
        let response = await fetch(`productos`);
        let jsonProduct = await response.json();
        pedidoList.innerHTML = " ";
        for (let i = 0; i < pedido.length; i++) {
            const element = pedido[i];
            let solicitado = jsonProduct.body.find(e => e.id_productos == element);
            //añadir un producto al pedido y mostrarlo en el blur que detalla el pedido, ofrece la opción de eliminar el producto del pedido
            let productItem = document.createElement("div");
            productItem.className = "card";
            productItem.style.margin = "0px"
            productItem.id = `${element}`;
            productItem.innerHTML += `   
             <div class="card">
                             <div class="row g-0">
                             <div class="col-md-4">
                                     <img src="./styles/images/${solicitado.url}" alt="${solicitado.descripcion}">
                                     <div>
                                         <h6 class="card-title">${solicitado.nombre}</h6>
                                         <p class=" text-muted"><small class="text-muted">$${solicitado.precio}</small></p>
                                     </div>
                                     <span id=${solicitado.descripcion} class="delete-icon"><i id=${solicitado.id_productos} class="far fa-times-circle"></i></i></span>
                                     </div>   
                             </div>
                         </div>`;
            pedidoList.appendChild(productItem);
            let btnBorrarPedido = document.getElementsByClassName("fa-times-circle")
            for (let i = 0; i < btnBorrarPedido.length; i++) {
                const element = btnBorrarPedido[i];
                // element.addEventListener("click",
                //     () => {
                //         let idRetirado = this.id;
                //         console.log(idRetirado);
                //         let aux = pedido.indexOf(idRetirado);
                //         pedido.splice(aux, 1);

                //         desplegarModalPedido();
                //     })
            }
        }
    }
}

pedidoBtn.addEventListener('click', desplegarModalPedido)


cancelPedido.addEventListener('click', () => {
    modalPedido.style.display = "none";
    floatPedido.style.display = "none";
    localStorage.setItem("pedido", []);
    pedido = [];
});

confirmPedido.addEventListener('click', () => {
    modalPedido.style.display = "none";
    floatPedido.style.display = "none";
    landingPage.style.display = "none";
    confirmedPage.style.display = "flex";
});

seguirPedido.addEventListener('click', () => {
    confirmedPage.style.display = "none";
    statusPage.style.display = "block";
});

detailBack.addEventListener("click", () => {
    statusPage.style.display = "none";
    landingPage.style.display = "block";
})

for (let i = 0; i < addBtns.length; i++) {
    const element = addBtns[i];
    element.addEventListener("click", () => {
        floatPedido.style.display = "block";
    })
};