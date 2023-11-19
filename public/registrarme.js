let nombres = document.getElementById("nombres");
let firstApellido = document.getElementById("first-apellido");
let secondApellido = document.getElementById("second-apellido");
let documento = document.getElementById("documento");
let numDocumento = document.getElementById("numDocumento");
let fecha = document.getElementById("fechaNacimiento");
let ciudadResidencia = document.getElementById("ciudadResidencia");
let empresa = document.getElementById("empresa");
let edad = document.getElementById("edad");
let trayectoria = document.getElementById("trayectoria");
let email = document.getElementById("email");
let celular = document.getElementById("celular");
let disfraz = document.getElementById("disfraz");
let camiseta = document.getElementById("camEnsayo");
let zapatos = document.getElementById("zapato");
let grupo = document.getElementById("grupo");
let btnRegistrar = document.getElementById("btnRegistrar");
let tituloModal2 = document.getElementById("exampleModalToggleLabel2");
let cuerpoModal2 = document.getElementById("modalBodyToggle2");
var verificar = document.getElementById("button-addon2");
var codigo = document.getElementById("code");
var modal = document.getElementById("formulario-adultos");
var pagoTotal = document.getElementById("pago-total");
var abono = document.getElementById("abono");
var saldo = document.getElementById("saldo");

async function verificarCodigo(params) {
    const response = await fetch("/code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    let json = await response.json();
    console.log(json);
    if (json.status == "OK") {
        console.log(json.data);
        alert(json.descripcion);
        console.log("entro");
        modal.style.display = "block";
        let balance = json.data.inscripcion - json.data.abono;
        pagoTotal.innerHTML = `Pago total: $${json.data.inscripcion}`;
        abono.innerHTML = `Abono: $${json.data.abono}`;
        saldo.innerHTML = `Saldo: $${balance}`;
        localStorage.setItem("pago", json.data.inscripcion);
        localStorage.setItem("abono", json.data.abono);
        localStorage.setItem("codigo", json.data.codigo);
        localStorage.setItem("saldo", balance);
    }
    if (json.status == "Error") {
        alert(json.descripcion);
    }
}

async function usarCodigo(params) {
    const response = await fetch("/usedcode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    let json = await response.json();
    console.log(json);
    if (json.status == 200) {
        alert(json.message)
    }
    if (json.status == 500) {
        alert(json.message);
    }
}

verificar.addEventListener("click", () => {
    let code = codigo.value;
    let code_json = { codigo: code };
    verificarCodigo(code_json);
});

async function crearUsuario(params) {
    const response = await fetch("/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    let json = await response.json();

    tituloModal2.innerHTML = json.descripcion;
    cuerpoModal2.innerHTML = json.mensaje;
}

btnRegistrar.addEventListener("click", () => {
    let valorAbono = Number(localStorage.getItem("abono"));
    let valorPago = Number(localStorage.getItem("pago"));
    let valorSaldo = Number(localStorage.getItem("saldo"));
    let valorCodigo = localStorage.getItem("codigo");
    console.log(valorPago);
    let nuevoUsuario = {
        nombres: nombres.value,
        firstApellido: firstApellido.value,
        secondApellido: secondApellido.value,
        documento: documento.value,
        numDocumento: numDocumento.value,
        nacimiento: fecha.value,
        ciudad: ciudadResidencia.value,
        empresa: empresa.value,
        edad: edad.value,
        trayectoria: trayectoria.value,
        email: email.value,
        celular: celular.value,
        disfraz: disfraz.value,
        camiseta: camiseta.value,
        zapato: zapatos.value,
        grupo: grupo.value,
        abono: valorAbono,
        pago: valorPago,
        saldo: valorSaldo,
        codigo: valorCodigo,
    };
    console.log(nuevoUsuario);
    if (
        nuevoUsuario.grupo === "" ||
        nuevoUsuario.camiseta === "Selecciona tu talla" ||
        nuevoUsuario.nacimiento === "" ||
        nuevoUsuario.nombres === "" ||
        nuevoUsuario.firstApellido === "" ||
        nuevoUsuario.documento === "Tipo documento de identidad" ||
        nuevoUsuario.numDocumento === null ||
        nuevoUsuario.ciudad === "" ||
        nuevoUsuario.edad === null ||
        nuevoUsuario.trayectoria === null ||
        nuevoUsuario.email === "" ||
        nuevoUsuario.celular === null ||
        nuevoUsuario.disfraz === "Selecciona tu talla" ||
        nuevoUsuario.zapato === "Selecciona tu talla"
    ) {
        tituloModal2.innerHTML = "Te faltó algo...";
        cuerpoModal2.innerHTML =
            "Has dejado los siguientes campos sin llenar o con valores no válidos:<br>";

        if (nuevoUsuario.grupo === "") {
            cuerpoModal2.innerHTML += "- Grupo<br>";
        }
        if (nuevoUsuario.camiseta === "Selecciona tu talla") {
            cuerpoModal2.innerHTML += "- Talla de camiseta<br>";
        }
        if (nuevoUsuario.nacimiento === "") {
            cuerpoModal2.innerHTML += "- Fecha de nacimiento<br>";
        }
        if (nuevoUsuario.nombres === "") {
            cuerpoModal2.innerHTML += "- Nombres<br>";
        }
        if (nuevoUsuario.firstApellido === "") {
            cuerpoModal2.innerHTML += "- Apellidos<br>";
        }
        if (nuevoUsuario.documento === "Tipo documento de identidad") {
            cuerpoModal2.innerHTML += "- Tipo de documento<br>";
        }
        if (nuevoUsuario.numDocumento === "") {
            cuerpoModal2.innerHTML += "- Número de documento<br>";
        }
        if (nuevoUsuario.ciudad === "") {
            cuerpoModal2.innerHTML += "- Ciudad<br>";
        }
        if (nuevoUsuario.edad === "") {
            cuerpoModal2.innerHTML += "- Edad<br>";
        }
        if (nuevoUsuario.trayectoria === "") {
            cuerpoModal2.innerHTML += "- Trayectoria<br>";
        }
        if (nuevoUsuario.email === "") {
            cuerpoModal2.innerHTML += "- Email<br>";
        }
        if (nuevoUsuario.celular === "") {
            cuerpoModal2.innerHTML += "- Celular<br>";
        }
        if (nuevoUsuario.disfraz === "") {
            cuerpoModal2.innerHTML += "- Talla de disfraz<br>";
        }
        if (nuevoUsuario.zapato === "") {
            cuerpoModal2.innerHTML += "- Talla de zapato<br>";
        }
        cuerpoModal2.innerHTML += "Por favor, completa todos los campos obligatorios.";
    } else {
        let cambiarCodigo = {
            codigo: valorCodigo,
        }
        usarCodigo(cambiarCodigo);
        crearUsuario(nuevoUsuario);
    }
});