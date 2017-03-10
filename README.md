# concretesolutionsapp
Desafio node.js Concrete Solutions

Detalhes da aplicação

Servidor de banco de dados.

MongoDB - MLAB

SERVER: ds127190.mlab.com
PORT: 27190
DATABASE: concretesolutionsdb 
USER: concreteuser
PASSWORD: concreteuser2017

SERVIDOR DE APLICAÇÃO:

Heroku : Endereço - http://concretesolutionsapp.herokuapp.com/

Task runner para realização de build:
CODESHIP

URLS da aplicação.

Header: Content-Type application/json

POST:http://concretesolutionsapp.herokuapp.com/api/user/signup

Example Json:
{
  "Name": "Luiz Oliveira",
  "Email": "luiz.oliveira@concretesolutions.com.br",
  "Password": "123456",
  "Phones": [
    {
      "numero": "991398604",
      "ddd": "37"
    }
  ]
}

POST:http://concretesolutionsapp.herokuapp.com/api/user/signin

Header: Content-Type application/json

Example Json:
{  
  "Email": "luiz.oliveira@concretesolutions.com.br",
  "Password": "123456"
}


GET: http://concretesolutionsapp.herokuapp.com/api/user/finduser
Example: http://localhost:8080/api/user/finduser?id=26d2f270-0579-11e7-84da-ef575dcc389c
         
         Header: Authorization Bearer fc19035acc9c900399be7617691748c0
                 Content-Type application/json
