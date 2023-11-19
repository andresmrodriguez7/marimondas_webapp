let noRepeat = async(req, res, next) => {
    console.log("entro al middleware");
    let numDocumento = req.body.numDocumento;
    let codigo = req.body.codigo;
    const mongodb = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority";

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar los estudiantes con el id prorpocionado
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
                const existeCedula = docs.find((e) => e.numDocumento == numDocumento);

                if (existeCedula) {
                    let respuesta = {
                        status: "Rechazado",
                        descripcion: `Houston, tenemos un problema!... `,
                        mensaje: `Dí un vistazo a la lista y parece que el número de cedula que ingresaste ya está en nuestra base de datos. Contáctanos a Whatsapp y lo arreglamos de una.`,
                    };
                    res.json(respuesta);
                } else {
                    next();
                }
            });
    });
};
module.exports = noRepeat;