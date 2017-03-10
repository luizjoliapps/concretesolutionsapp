/*Importar Biblioteca do MongoDB */
var mongo = require('mongodb');

var connMongoDB = function () {
    var db = new mongo.Db(
        'concretesolutionsdb',
        new mongo.Server(
            'ds127190.mlab.com',
            27190,
            {}
        ),
        {}
    );


    return db;
}

module.exports = function () {
    return connMongoDB;
}