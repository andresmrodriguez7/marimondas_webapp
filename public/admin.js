let modal = document.getElementById("modal");
let closeModal = document.getElementById("close-modal");
let infoBtn = document.getElementsByClassName("fas fa-info-circle");
let cancelPedido = document.getElementById("liveToastBtn");
let toast = document.getElementById("toast-confirm");
let toastBody = document.getElementById("toast-body");
let closeToast = document.getElementById("cancel-toast");
let nuevoProducto = document.getElementById("prod-nuevo-btn");
let botonUsuarios = document.getElementById("usuarios-btn");
let paginaCrear = document.getElementById("product-creator");
let tablaPedidos = document.getElementById("table-pedido");
let tablaUsuarios = document.getElementById("table-usuarios");
let botonInscritos = document.getElementById("inscritos-btn");
let botonGetOut = document.getElementById("get-out");
let fechaPlacer = document.getElementById("fecha-hoy");
let paginaTallas = document.getElementById("tallas");
let botonTallas = document.getElementById("tallas-btn");
let botonAbonos = document.getElementById("abonos-btn");
let paginaAbonos = document.getElementById("abonos-section");
let newSearchBtn = document.getElementById("search-btn");
let botonCodigos = document.getElementById("codigos-btn");
let paginaCode = document.getElementById("code-container");

setInterval(() => {
    fechaPlacer.innerHTML = moment().format("dddd D MMMM hh:mm:ss a");
}, 1000);

botonAbonos.addEventListener("click", () => {
    tablaUsuarios.style.display = "none";
    paginaTallas.style.display = "none";
    paginaAbonos.style.display = "flex";
    paginaCrear.style.display = "none";
    paginaCode.style.display = "none";
});

botonCodigos.addEventListener("click", () => {
    tablaUsuarios.style.display = "none";
    paginaTallas.style.display = "none";
    paginaAbonos.style.display = "none";
    paginaCrear.style.display = "none";
    paginaCode.style.display = "block";
});

botonTallas.addEventListener("click", () => {
    tablaUsuarios.style.display = "none";
    paginaTallas.style.display = "flex";
    paginaAbonos.style.display = "none";
    paginaCrear.style.display = "none";
    paginaCode.style.display = "none";
});

botonInscritos.addEventListener("click", () => {
    tablaUsuarios.style.display = "flex";
    paginaTallas.style.display = "none";
    paginaAbonos.style.display = "none";
    paginaCrear.style.display = "none";
    paginaCode.style.display = "none";
});

botonGetOut.addEventListener("click", () => {
    window.location.href = "./login.html";
});

nuevoProducto.addEventListener("click", () => {
    paginaCrear.style.display = "block";
    tablaUsuarios.style.display = "none";
    paginaTallas.style.display = "none";
    paginaAbonos.style.display = "none";
    paginaCode.style.display = "none";
});

// selecciono del DOM la tabla de usuarios y subo uno a uno cada registro en la base de datos

// aqui asignamos el evento al boton que creará la petición al endpoint de crear producto
let newProductBtn = document.getElementById("crear-producto-btn");

// rescatamos todos los datos a ser enviados

let nameBuscado = document.getElementById("search-name");
let spinner = document.getElementById("spinner");

let idBuscado = document.getElementById("search-id");
newSearchBtn.addEventListener("click", () => {
    spinner.style.display = "flex";
    let userData = {
        numDocumento: idBuscado.value,
    };
    obtenerBuscado(userData);
});

let obtenerBuscado = async function getBuscado(userData) {
    try {
        let response = await fetch("/buscar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        let jsonBuscado = await response.json();
        spinner.style.display = "none";
        if (jsonBuscado.status === 200) {
            console.log(jsonBuscado.usuario);
            inputAbonoBuscado.value = jsonBuscado.usuario.abono;
            nombreBuscado.innerHTML = jsonBuscado.usuario.nombres;
            primerApellidoBuscado.innerHTML = jsonBuscado.usuario.primerApellido;
            inscripcionBuscado.innerHTML = `Inscripción: $${jsonBuscado.usuario.pago}`;
            saldoBuscado.innerHTML = ` | Saldo: $${jsonBuscado.usuario.saldo}`;
            inputEmailBuscado.value = jsonBuscado.usuario.email;
            inputKitBuscado.value = jsonBuscado.usuario.kit;

            let optionDisfraz = document.createElement("option");
            optionDisfraz.value = jsonBuscado.usuario.disfraz;
            optionDisfraz.innerHTML = `${jsonBuscado.usuario.disfraz}`;
            optionDisfraz.setAttribute("selected", "");
            inputDisfrazBuscado.removeChild(inputDisfrazBuscado.childNodes[0]);
            inputDisfrazBuscado.insertBefore(
                optionDisfraz,
                inputDisfrazBuscado.childNodes[0]
            );

            let optionCamiseta = document.createElement("option");
            optionCamiseta.value = jsonBuscado.usuario.camiseta;
            optionCamiseta.innerHTML = `${jsonBuscado.usuario.camiseta}`;
            optionCamiseta.setAttribute("selected", "");
            inputCamisetaBuscado.removeChild(inputCamisetaBuscado.childNodes[0]);
            inputCamisetaBuscado.insertBefore(
                optionCamiseta,
                inputCamisetaBuscado.childNodes[0]
            );

            let optionZapato = document.createElement("option");
            optionZapato.value = jsonBuscado.usuario.zapato;
            optionZapato.innerHTML = `${jsonBuscado.usuario.zapato}`;
            optionZapato.setAttribute("selected", "");
            inputZapatoBuscado.removeChild(inputZapatoBuscado.childNodes[0]);
            inputZapatoBuscado.insertBefore(
                optionZapato,
                inputZapatoBuscado.childNodes[0]
            );

            let optionGrupo = document.createElement("option");
            optionGrupo.value = jsonBuscado.usuario.grupo;
            optionGrupo.innerHTML = `${jsonBuscado.usuario.grupo}`;
            optionGrupo.setAttribute("selected", "");
            inputGrupoBuscado.removeChild(inputGrupoBuscado.childNodes[0]);
            inputGrupoBuscado.insertBefore(
                optionGrupo,
                inputGrupoBuscado.childNodes[0]
            );


            let optionKit = document.createElement("option");
            optionKit.value = jsonBuscado.usuario.kit;
            optionKit.innerHTML = `${jsonBuscado.usuario.grupo}`;
            optionKit.setAttribute("selected", "");
            inputGrupoBuscado.removeChild(inputGrupoBuscado.childNodes[0]);
            inputGrupoBuscado.insertBefore(
                optionKit,
                inputGrupoBuscado.childNodes[0]
            );
        }
        localStorage.setItem("enVista", JSON.stringify(jsonBuscado.usuario));
    } catch (error) {
        alert("No hay usuarios con esa identificación");
    }
};

let nombreBuscado = document.getElementById("buscado-name");
let primerApellidoBuscado = document.getElementById("buscado-primerApellido");
let segundoApellidoBuscado = document.getElementById("buscado-segundoApellido");
let inscripcionBuscado = document.getElementById("buscado-inscripcion");
let saldoBuscado = document.getElementById("buscado-saldo");
let inputEmailBuscado = document.getElementById("buscado-email");
let inputAbonoBuscado = document.getElementById("buscado-abono");
let inputKitBuscado = document.getElementById("buscado-kit");
let inputEntregaDisfrazBuscado = document.getElementById(
    "buscado-disfraz-entregado"
);
let inputDisfrazBuscado = document.getElementById("talla-disfraz");
let inputCamisetaBuscado = document.getElementById("talla-camiseta");
let inputZapatoBuscado = document.getElementById("talla-zapatos");
let inputGrupoBuscado = document.getElementById("talla-grupo");
let modificarBtn = document.getElementById("modificar-btn");

modificarBtn.addEventListener("click", async(e) => {
    spinner.style.display = "flex";
    let aux = localStorage.getItem("enVista");
    enVista = JSON.parse(aux);
    enVista.correo = inputEmailBuscado.value;
    enVista.abono = inputAbonoBuscado.value;
    enVista.disfraz = inputDisfrazBuscado.value;
    enVista.camiseta = inputCamisetaBuscado.value;
    enVista.zapato = inputZapatoBuscado.value;
    enVista.grupo = inputGrupoBuscado.value;
    enVista.kit = inputKitBuscado.value;
    enVista.saldo = Number(enVista.pago) - inputAbonoBuscado.value;
    localStorage.setItem("enVista", JSON.stringify(enVista));
    let response = await fetch("/modificar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(enVista),
    });
    let status = await response.json();
    window.alert(status.mensaje);
    spinner.style.display = "none";
});

let borrarBtn = document.getElementById("borrar-btn");

borrarBtn.addEventListener("click", async() => {
    if (confirm("¿Está seguro de que desea borrar este usuario?")) {
        spinner.style.display = "flex";
        console.log("aqui");
        if (localStorage.getItem("enVista")) {
            console.log("aqui");
            let enVista = JSON.parse(localStorage.getItem("enVista"));
            console.log(enVista._id);
            let idBorrar = { id: enVista._id };
            let response = await fetch("/borrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(idBorrar),
            });
            let confirmacion = await response.json();
            if (confirmacion.status == 200) {
                spinner.style.display = "none";
                alert(confirmacion.mensaje);
                window.location.reload(false);
            } else {
                alert(
                    "No se pudo eliminar a este usuario, por favor intentelo nuevamente"
                );
            }
        } else {
            alert("No ha realizado ninguna busqueda aún");
        }
    } else {
        alert("Ok, eliminación cancelada");
    }
});

let nuevoCodigo = document.getElementById("nuevoCodigo");
let inscripcion = document.getElementById("inscripcion");
let abono = document.getElementById("abono");
let categoria = document.getElementById("categoria");
let referencia = document.getElementById("referencia");
let crearBtn = document.getElementById("button-crear-code");

crearBtn.addEventListener("click", async() => {
    nuevoCodigo.select();
    document.execCommand("copy");
    let nuevoIngreso = {
        codigo: nuevoCodigo.value,
        inscripcion: inscripcion.value,
        abono: abono.value,
        categoria: categoria.value,
        referencia: referencia.value,
        status: 200,
    };
    let response = await fetch("/newcode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoIngreso),
    });
    let json = await response.json();
    alert(json.descripcion);
});