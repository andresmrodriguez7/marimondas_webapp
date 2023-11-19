const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://AcamicaDB:W4iXxO3iXcpWXwOI@acamicacurso.lghvv.mongodb.net/AcamicaDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;