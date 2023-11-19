const { Server } = require("http");

require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PORT || 3000;
server.use(express.json());
console.log("Hola mundo");
const helmet = require("helmet");

const mongoose = require("./conexion");
const { boolean } = require("webidl-conversions");
server.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
server.use(express.static("public"));

const Usuarios = mongoose.model("usuarios", {
    nombres: String,
    primerApellido: String,
    segundoApellido: String,
    documento: String,
    numDocumento: String,
    nacimiento: String,
    ciudad: String,
    empresa: String,
    edad: String,
    trayectoria: String,
    email: String,
    celular: String,
    disfraz: String,
    camiseta: String,
    zapato: String,
    grupo: String,
    abono: Number,
    pago: Number,
    saldo: Number,
    codigo: String,
    kit: String,
    bolsillo: String,
});

const Codigos = mongoose.model("codigos", {
    codigo: String,
    inscripcion: Number,
    abono: Number,
    status: Number,
    categoria: String,
    referencia: String,
    bolsillo: String,
});

const rsNinos = mongoose.model("marimonditas", {
    nombres: String,
    primerApellido: String,
    segundoApellido: String,
    documento: String,
    tipo: String,
    nacimiento: String,
    edad: String,
    disfraz: String,
    camiseta: String,
    abono: Number,
    pago: Number,
    saldo: Number,
    acudiente: String,
    celular: String,
    email: String,
});

let noRepeatCode = require("./verifyCodeNoRepeat");
server.post("/newcode", noRepeatCode, (req, res) => {
    console.log(req.body);
    const nuevoCodigo = req.body;
    const rsCodigo = new Codigos(nuevoCodigo);
    rsCodigo.save();
    let respuesta = {
        status: "OK",
        descripcion: `El codigo ${nuevoCodigo.codigo} ha sido ACTIVADO, se ha copiado al portapapeles, envíelo a su usuario. El dinero de esta inscripción se ha asignado a  ${nuevoCodigo.bolsillo}`,
    };
    res.json(respuesta);
});

server.post("/usedcode", (req, res) => {
    console.log(req.body);
    const codigo = req.body.codigo;
    const mongodb = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority";

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar los codigos con el id proporcionado
        con
            .db("AcamicaDB")
            .collection("codigos")
            .updateOne({ codigo: codigo }, { $set: { status: 400 } }, (err, result) => {
                if (err) {
                    console.log("Error al actualizar el estado del pedido:", err);
                    res.status(500).json({ status: 500, message: "Error al actualizar el estado del pedido." });
                } else {
                    res.json({ status: 200, message: "El código se ha marcado como usado." });
                }
            });
    });
});

server.post("/ninoscode", (req, res) => {
    console.log(req.body);
    const codigo = req.body.codigo;
    const mongodb = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority";

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar los estudiantes con el id proporcionado
        con
            .db("AcamicaDB")
            .collection("codigos")
            .find({})
            .toArray((err, docs) => {
                // si hay error entonces finalizar
                if (err) {
                    console.log(`Error al momento de realizar la consulta`);
                    process.exit(1);
                }
                // mostrar los registros
                const existe = docs.find((e) => e.codigo == codigo);
                if (existe) {
                    if (existe.status == 200 && existe.categoria == "niños") {
                        let respuesta = {
                            status: "OK",
                            descripcion: `Código válido, inicie su pre-inscripción`,
                            data: existe,
                        };
                        res.json(respuesta);
                    } else {
                        let respuesta = {
                            status: "Error",
                            descripcion: `Este código ya ha sido usado o no aplica para esta categoría, contactenos a nuestro Whatsapp!`,
                        };
                        res.json(respuesta);
                    }
                } else {
                    let respuesta = {
                        status: "Error",
                        descripcion: `Este código no existe`,
                    };
                    res.json(respuesta);
                }
            });
    });
});

server.post("/code", (req, res) => {
    console.log(req.body);
    const codigo = req.body.codigo;
    const mongodb = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority";

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar los estudiantes con el id proporcionado
        con
            .db("AcamicaDB")
            .collection("codigos")
            .find({})
            .toArray((err, docs) => {
                // si hay error entonces finalizar
                if (err) {
                    console.log(`Error al momento de realizar la consulta`);
                    process.exit(1);
                }
                // mostrar los registros
                const existe = docs.find((e) => e.codigo == codigo);

                if (existe) {
                    if (existe.status == 200 && existe.categoria == "mayores") {
                        let respuesta = {
                            status: "OK",
                            descripcion: `Código válido, inicie su pre-inscripción`,
                            data: existe,
                        };
                        res.json(respuesta);
                    } else {
                        let respuesta = {
                            status: "Error",
                            descripcion: `Este código ya ha sido usado o no aplica para esta categoría, contactenos a nuestro Whatsapp!`,
                        };
                        res.json(respuesta);
                    }
                } else {
                    let respuesta = {
                        status: "Error",
                        descripcion: `Este código no existe`,
                    };
                    res.json(respuesta);
                }
            });
    });
});

let noRepeat = require("./verifyNoRepeat");
server.post("/registrar", noRepeat, (req, res) => {
    console.log("ENTRO AL SERVIDOR");
    const usuarioNuevo = {
        nombres: req.body.nombres,
        primerApellido: req.body.firstApellido,
        segundoApellido: req.body.secondApellido,
        documento: req.body.documento,
        numDocumento: req.body.numDocumento,
        nacimiento: req.body.nacimiento,
        ciudad: req.body.ciudad,
        empresa: req.body.empresa,
        edad: req.body.edad,
        trayectoria: req.body.trayectoria,
        email: req.body.email,
        celular: req.body.celular,
        disfraz: req.body.disfraz,
        camiseta: req.body.camiseta,
        zapato: req.body.zapato,
        grupo: req.body.grupo,
        abono: req.body.abono,
        pago: req.body.pago,
        saldo: req.body.saldo,
        codigo: req.body.codigo,
        bolsillo: req.body.bolsillo,
    };
    console.log(usuarioNuevo);
    const rsUsuario = new Usuarios(usuarioNuevo);
    rsUsuario.save();
    let respuesta = {
        status: "Ok",
        descripcion: `Listo ${rsUsuario.nombres}, ¡inscripción exitosa!`,
        mensaje: `Bienvenido a las Marimondas del Barrio Abajo, esperamos que lo disfrutes, porque quien lo vive es quien lo goza!`,
    };
    res.json(respuesta);
});

let noRepeatNiños = require("./verifyNoRepeatNiños");
const e = require("express");
const { Db, ObjectId } = require("mongodb");

server.post("/marimonditas", noRepeatNiños, async(req, res) => {
    console.log("ENTRO AL SERVIDOR");
    const rsNuevo = {
        nombres: req.body.nombres,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        documento: req.body.numDocumento,
        tipo: req.body.documento,
        nacimiento: req.body.nacimiento,
        edad: req.body.edad,
        disfraz: req.body.disfraz,
        camiseta: req.body.camiseta,
        abono: req.body.abono,
        pago: req.body.pago,
        saldo: req.body.saldo,
        acudiente: req.body.acudiente,
        celular: req.body.celular,
        email: req.body.email,
    };
    console.log(rsNuevo);
    const rsUsuario = new rsNinos(rsNuevo);

    try {
        const nuevoRegistro = rsUsuario.save();
        let respuesta = {
            status: "Ok",
            descripcion: `Listo ${rsNuevo.acudiente}, ¡has inscrito exitosamente a ${rsNuevo.nombres}!`,
            mensaje: `Una nueva Marimondita del Barrio Abajo ha nacido, Paragüita estaría orgulloso de ${rsNuevo.nombres}`,
        };
        res.json(respuesta);
    } catch (error) {
        let respuesta = {
            status: "Error",
            error: error,
            descripcion: `Uy! justo estamos en mantenimiento`,
            mensaje: `Intentalo nuevamente en unos segundos`,
        };
        res.json(respuesta);
    }
});

server.post("/login", async(req, res) => {
    console.log(req.body);
    const credentials = [
        { email: "lesly-morales@hotmail.com", password: "Marimondas10", role: "admin" },
        { email: "acmesarodriguez@gmail.com", password: "camiloandres", role: "user" },
        { email: "oricacyanideassist@gmail.com", password: "sebasmesa", role: "user" },
        // Agrega más credenciales según necesites
    ];

    const { email, contrasena } = req.body;

    const foundCredential = credentials.find(cred => cred.email === email && cred.password === contrasena);

    if (foundCredential) {
        const respuesta = {
            response: "OK",
            status: 200,
            description: `Ingreso de ${foundCredential.role}`,
        };
        res.json(respuesta);
    } else {
        const respuesta = {
            response: "Error",
            status: 401,
            description: "Usuario o contraseña incorrecto",
        };
        res.status(401).json(respuesta);
    }
});

server.post("/buscar", async(req, res) => {
    console.log("entro al buscador");
    let numDocumento = req.body.numDocumento;
    const mongodb = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority";

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar los estudiantes con el id proporcionado
        con
            .db("AcamicaDB")
            .collection("usuarios")
            .find({})
            .toArray((err, docs) => {
                // si hay error entonces finalizar
                if (err) {
                    console.log(`Error al momento de realizar la consulta`);
                    process.exit(1);
                }
                // mostrar los registros
                const existe = docs.find((e) => e.numDocumento == numDocumento);
                if (existe) {
                    let respuesta = {
                        status: 200,
                        usuario: existe,
                        mensaje: `Calma, parece que ya estás inscrito. Recuerda validar si ya enviaste el comprobante de tu pago por pre-inscripción a nuestro Whatsapp.`,
                    };
                    res.json(respuesta);
                }
            });
    });
});

server.post("/modificar", async(req, res) => {
    const mongodb = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority";

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            alert(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar el usuario con el id obtenido de la busqueda
        let aux = con
            .db("AcamicaDB")
            .collection("usuarios")
            .updateOne({ _id: ObjectId(req.body._id) }, {
                $set: {
                    saldo: req.body.saldo,
                    email: req.body.email,
                    abono: req.body.abono,
                    disfraz: req.body.disfraz,
                    camiseta: req.body.camiseta,
                    zapato: req.body.zapato,
                    grupo: req.body.grupo,
                    kit: req.body.kit,
                    bolsillo: req.body.bolsillo,
                },
            });
        let respuesta = {
            status: 200,
            mensaje: `Actualización exitosa, cambiamos los datos de ${req.body.nombres}`,
        };
        res.json(respuesta);
    });
});

server.post("/borrar", async(req, res) => {
    const mongodb = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority";

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar el usuario con el id obtenido de la busqueda
        try {
            console.log(req.body.id);
            con
                .db("AcamicaDB")
                .collection("usuarios")
                .deleteOne({ _id: ObjectId(req.body.id) });
            let respuesta = {
                status: 200,
                mensaje: `Ok, el usuario ha sido eliminado con exito`,
            };
            res.json(respuesta);
        } catch (e) {
            res.json(e);
        }
    });
});