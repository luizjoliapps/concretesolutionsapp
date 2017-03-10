function UserDAO(connection) {
    this._connection = connection();
}

UserDAO.prototype.InsertUser = function (user, req, res) {
    this._connection.open(function (err, mongoclient) {
        if (err) {
            res.status(500).json({ "mensagem": "mensagem de erro" });
            return;
        }
        mongoclient.collection('user', function (err, collection) {
            if (err) {
                res.status(500).json({ "mensagem": "mensagem de erro" });
                mongoclient.close();
                return;
            }
            collection.find({ Email: user.Email }).toArray(function (err, result) {
                if (err) {
                    res.status(500).json({ "mensagem": "mensagem de erro" });
                    mongoclient.close();
                    return;
                }
                //Verifica se ja existe registro com o email informado
                if (result.length > 0) {
                    mongoclient.close();
                    res.status(401).json({ "mensagem": "E-mail já existente" });
                }
                //Insere usuário no banco de dados
                else {
                    collection.insert(user);
                    mongoclient.close();
                    res.status(200).json(user);
                }
            });
        });

    });
};

UserDAO.prototype.SignIn = function (user, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {

            collection.find({ Email: user.Email }).toArray(function (err, result) {

                if (err) {
                    mongoclient.close();
                    res.status(500).json({ "mensagem": "mensagem de erro" });
                }

                if (result.length > 0) {
                    var userDb = result[0];

                    if (userDb.Password === user.Password) {

                        userDb.LastLogin = new Date();

                        //Atualiza data do ultimo login
                        collection.update(
                            { Id: userDb.Id },
                            { LastLogin: userDb.LastLogin });

                        mongoclient.close();
                        res.status(200).json(userDb);
                    }
                    else {
                        mongoclient.close();
                        res.status(401).json({ "mensagem": "Usuário e/ou senha inválidos" });
                    }
                }
                else {
                    mongoclient.close();
                    res.status(401).json({ "mensagem": "Usuário e/ou senha inválidos" });
                }

            });
        });
        mongoclient.close();
    });
}

UserDAO.prototype.FindUser = function (id, token, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("user", function (err, collection) {

            collection.find({ Id: id }).toArray(function (err, result) {

                if (err) {
                    mongoclient.close();
                    res.status(500).json({ "mensagem": "mensagem de erro" });
                }

                if (result.length > 0) {
                    var userDb = result[0];

                    if (userDb.Token != token) {
                        mongoclient.close();
                        res.status(401).json({ "mensagem": "Não autorizado" });
                    } else {
                        var dateLL = userDb.LastLogin;
                        var now = new Date();

                        console.log(dateLL);
                        console.log(now);

                        //Diferença de datas em segundos
                        var datediff = (now.getTime() - dateLL.getTime()) / 1000;

                        //Diferença de datas em segundos
                        datediff = datediff / 60;

                        if (datediff < 30) {
                            mongoclient.close();
                            res.status(200).json(userDb);
                        } else {
                            mongoclient.close();
                            res.status(401).json({ "mensagem": "Sessão inválida" });
                        }
                    }
                }
                else {
                    mongoclient.close();
                    res.status(401).json({ "mensagem": "Usuário inexistente para este ID!" });
                }

            });
        });
        mongoclient.close();
    });
}

module.exports = function () {
    return UserDAO;
}
