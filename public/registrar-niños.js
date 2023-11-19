let nNino = document.getElementById("nombres-niños");
let primerApellidoNino = document.getElementById("first-apellido-niños");
let segundoApellidoNino = document.getElementById("second-apellido-niños");
let documentoNino = document.getElementById("documento-niños");
let numDocumentoNino = document.getElementById("numDocumento-niños");
let fechaNino = document.getElementById("fechaNacimiento-niños");
let edadNino = document.getElementById("edad-niños");
let disfrazNino = document.getElementById("disfraz-niños");
let camisaNino = document.getElementById("camEnsayo-niños");
let nAcudiente = document.getElementById("nombres-acudiente");
let aAcudiente = document.getElementById("apellidos-acudiente");
let emailAcudiente = document.getElementById("email-acudiente");
let celAcudiente = document.getElementById("celular-acudiente");
let abonoNino = document.getElementById("pagos-niños");
let btnRsNinos = document.getElementById("btnRegistrar-niños");
var mensajeModal = document.getElementById("modalBody-niños");
var titleModal = document.getElementById("modalTitle-niños");
var codigoNinos = document.getElementById("code-niños");
var verificarNinos = document.getElementById("button-addon3");
var modalNinos = document.getElementById("formulario-niños");
var pagoTotalNinos = document.getElementById("pago-total-niños");
var abonoNinos = document.getElementById("abono-niños");
var saldoNinos = document.getElementById("saldo-niños");

async function verificarCodigoNiños(params) {
    const response = await fetch("/ninoscode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    let jsonNiños = await response.json();
    console.log(jsonNiños);
    if (jsonNiños.status == "OK") {
        console.log(jsonNiños.data);
        alert(jsonNiños.descripcion);
        let balance = jsonNiños.data.inscripcion - jsonNiños.data.abono;
        pagoTotalNinos.innerHTML = `Pago total: $${jsonNiños.data.inscripcion}`;
        abonoNinos.innerHTML = `Abono: $${jsonNiños.data.abono}`;
        saldoNinos.innerHTML = `Saldo: $${balance}`;
        modalNinos.style.display = "block";
        localStorage.setItem("pago", jsonNiños.data.inscripcion);
        localStorage.setItem("abono", jsonNiños.data.abono);
        localStorage.setItem("codigo", jsonNiños.data.codigo);
        localStorage.setItem("saldo", balance);
    }
    if (jsonNiños.status == "Error") {
        alert(jsonNiños.descripcion);
    }
}

verificarNinos.addEventListener("click", () => {
    let code = codigoNinos.value;
    let code_json = { codigo: code };
    verificarCodigoNiños(code_json);
});

async function crearNiño(params) {
    console.log("entro al endpoint");
    const response = await fetch("/marimonditas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    let json = await response.json();

    titleModal.innerHTML = json.descripcion;
    mensajeModal.innerHTML = json.mensaje;
}

btnRsNinos.addEventListener("click", () => {
    let abonoNiño = Number(localStorage.getItem("abono"));
    let pagoNiño = Number(localStorage.getItem("pago"));
    let saldoNiño = Number(localStorage.getItem("saldo"));
    let nuevoNiño = {
        nombres: nNino.value,
        primerApellido: primerApellidoNino.value,
        segundoApellido: segundoApellidoNino.value,
        documento: documentoNino.value,
        nacimiento: fechaNino.value,
        numDocumento: numDocumentoNino.value,
        edad: edadNino.value,
        disfraz: disfrazNino.value,
        camiseta: camisaNino.value,
        abono: abonoNiño,
        pago: pagoNiño,
        saldo: saldoNiño,
        acudiente: `${nAcudiente.value} ${aAcudiente.value}`,
        email: emailAcudiente.value,
        celular: celAcudiente.value,
    };
    if (
        nuevoNiño.nombres === "" ||
        nuevoNiño.apellidos === "" ||
        nuevoNiño.nacimiento === "" ||
        nuevoNiño.numDocumento === "" ||
        nuevoNiño.edad === "Tipo documento de identidad" ||
        nuevoNiño.disfraz === "" ||
        nuevoNiño.camiseta === "" ||
        nuevoNiño.acudiente === " " ||
        nuevoNiño.email === "" ||
        nuevoNiño.documento === "Tipo documento de identidad" ||
        nuevoNiño.celular === ""
    ) {
        titleModal.innerHTML = "Faltan datos en el formulario!";
        mensajeModal.innerHTML =
            "La información del niño y el acudiente es obligatoria, revisa que pudiste haber omitido";
    } else {
        crearNiño(nuevoNiño);
    }
});