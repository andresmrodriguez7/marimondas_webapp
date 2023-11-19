var myModal = document.getElementById("signUpModal");
var selectorModal = document.getElementById("staticBackdrop")
var modalOpener = document.getElementById("modalOpener");
var modalCloser = document.getElementById("modalCloser");
var salidaModal2 = document.getElementById("entendido");
var exitModal2 = document.getElementById("exit");
var modalAdultos = document.getElementById("modalAdultos");
var modalNinosOpener = document.getElementById("modalNiños");
var modalNinosCloser = document.getElementById("modalCloser-niños");
var modalNiños = document.getElementById("signUpModal-niños");

// este abre el modal seleccionador entre adultos y niños
// modalOpener.addEventListener("click", () => {
//     selectorModal.style.display = "block";
// });

//este abre el modal de adultos y cierra el selector
modalAdultos.addEventListener("click", () => {
    myModal.style.display = "block";
});

//este abre el modal de niños y cierra el selector
modalNinosOpener.addEventListener("click", () => {
    modalNiños.style.display = "block";
});
//este cierra el modal de los niños
modalNinosCloser.addEventListener("click", () => {
    modalNiños.style.display = "none";
});

modalCloser.addEventListener("click", () => {
    myModal.style.display = "none";
});

let exitModales = document.getElementById("entendido");

modalCloser.addEventListener("click", () => {
    myModal.style.display = "none";
});

salidaModal2.addEventListener("click", () => {
    tituloModal2.innerHTML = "";
    cuerpoModal2.innerHTML = "";
})
exitModal2.addEventListener("click", () => {
    tituloModal2.innerHTML = "";
    cuerpoModal2.innerHTML = "";
})