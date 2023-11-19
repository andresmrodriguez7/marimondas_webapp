let noRepeatCode = async (req, res, next) => {
  console.log("entro al middleware");
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
          let respuesta = {
            status: "Error",
            descripcion: `El código ${codigo} ya existe. Tiene un estado ${req.body.status}.`,
          };
          res.json(respuesta);
        } else {
          next();
        }
      });
  });
};
module.exports = noRepeatCode;
