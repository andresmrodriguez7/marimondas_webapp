let noRepeatNiño = async(req, res, next) => {
    console.log("entro al middleware");
    let numDocumento = req.body.numDocumento;
    const mongodb = require('mongodb').MongoClient;
    const uri = 'mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority';

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar los estudiantes con el id prorpocionado
        con.db('AcamicaDB').collection('marimonditas')
            .find({}).toArray((err, docs) => {
                // si hay error entonces finalizar
                if (err) {
                    console.log(`Error al momento de realizar la consulta`);
                    process.exit(1);
                }
                // mostrar los registros
                const existe = docs.find(e => e.documento == numDocumento)

                if (existe) {
                    let respuesta = {
                        status: "Error se cayó en el verify",
                        descripcion: `¡Aquí ya hay una marimondita con ese nombre!`,
                        mensaje: `Papito o Mamita, parece que ya ${req.body.nombres} está inscrito. ¿Tienes dudas? Contactanos.`,
                    }
                    res.json(respuesta);
                } else {
                    next();
                }

            })



    })
}
module.exports = noRepeatNiño;