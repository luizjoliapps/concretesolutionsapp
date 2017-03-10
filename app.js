/* importar as configurações do servidor */
var app = require('./config/server');

var port = process.env.PORT || 8080


/* parametrizar a porta de escuta */
app.listen(port, function(){
	console.log('Servidor concretesolutionsapp online na porta ' + port);
})