let callingUSer = async(req, res) => {
    console.log("entro al buscador");
    let numDocumento = req.body.numDocumento;
    const mongodb = require('mongodb').MongoClient;
    const uri = 'mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority';

    mongodb.connect(uri, (err, con) => {
        // si hay error finalizar
        if (err) {
            console.log(`No se puede conectar al servidor de mongo ${uri}`);
            process.exit(1);
        }
        // si no hay error consultar los estudiantes con el id proporcionado
        con.db('AcamicaDB').collection('usuarios')
            .find({}).toArray((err, docs) => {
                    // si hay error entonces finalizar
                    if (err) {
                        console.log(`Error al momento de realizar la consulta`);
                        process.exit(1);
                    }
                    // mostrar los registros
                    const existe = docs.find(e => e.numDocumento == numDocumento)


                    let respuesta = {
                        status: "Rechazado",
                        usuario: existe,
                        mensaje: `Calma, parece que ya estás inscrito. Recuerda validar si ya enviaste el comprobante de tu pago por pre-inscripción a nuestro Whatsapp.`,
                    }
                    res.json(respuesta);
                }

            )
    })
}