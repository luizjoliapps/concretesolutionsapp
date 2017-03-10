/*Importar Biblioteca do MongoDB */
var mongo = require('mongodb');

var connMongoDB = function () {
    var db = new mongo.Db(
        'concretesolutionsdb',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );


    return db;
}

module.exports = function () {
    return connMongoDB;
}