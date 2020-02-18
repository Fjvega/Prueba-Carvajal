var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var multer  = require('multer')
const fs = require('fs')
const uri ="mongodb+srv://tester:1234@cluster0-nfm12.mongodb.net/test?retryWrites=true&w=majority";
var jsonData = require('../genres.json');




/*
Metodo : GET

Funcionamiento : Retorna un JSON con  generos de peliculas precargados para así
mantener consistencia en la base de datos.

Parametros : Ninguno


Retorna : JSON 
*/
router.get('/getGenres', function (req, res, next) {

  res.send(jsonData)

})


/*
Metodo : POST

Funcionamiento : Recibe un JSON con los parametros, primero hace una consulta a la db
para confirmar si no existe ninguna pelicula con el nombre enviado , si no existe ningún elemento
con este nombre crea una nueva entrada a la base de datos

Parametros : Se envian desde el body en un JSON {name : String ,description : String , category : String[]}


Retorna : JSON  {state : String}

En caso de ser state = down Ocurrio un error en la base de datos
En caso de ser state = fail Se intento agregar un elemento que ya se encuentra en la db
En caso de ser state = success Se agrego una nueva entrada a la db de manera exitosa


*/

router.post("/add", function(req, res, next) {

  const responseServer= res;
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw responseServer.send({ state: "down"});
    var dbo = db.db("carvajal");
    var myobj = { name : req.body['name'] , description : req.body['description'], category : req.body['category'] };
    const name = req.body['name']

    console.log(name)
    dbo
      .collection("movies")
      .find({ name: name })
      .toArray(function(err, res) {
        console.log(res)
        if (err) throw responseServer.send({ state: "down" });
        if (res.length >0) {
          console.log('duplicado')
          db.close();
          responseServer.send({ state: "fail" });
        }else
        {
          
          dbo.collection("movies").insertOne(myobj, function(err, res) {
            console.log("1 document inserted");
            db.close();
            responseServer.send({ state: "success" });
          });

        } 
      });
   

    
  });
});


/*
Metodo : POST

Funcionamiento : Recibe un JSON con el parametro nombre , se busca en la db el elemento que posee este nombre
y se elimina de esta

Parametros : Se envian desde el body en un JSON {name : String }


Retorna : JSON  {state : String}

En caso de ser state = down Ocurrio un error en la base de datos
En caso de ser state = success Se elimino entrada a la db de manera exitosa


*/
router.post("/delete", function(req, res, next) {


  
  
  const responseServer= res;
  
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw responseServer.send({ state: "down"});
    var dbo = db.db("carvajal");
    

          var myobj = { name:req.body['name']};
          dbo.collection("movies").deleteOne(myobj, function(err, res) {
            if (err) throw responseServer.send({ state: "down" });
            console.log("1 document deleted");
            db.close();
            responseServer.send({ state: "success" });
          });

        
      });
   

    
  });



/*
Metodo : POST

Funcionamiento : Recibe un JSON con los parametros,busca por el nombre de la pelicula en la db 
y actualia los campos de description : String y category : String


Parametros : Se envian desde el body en un JSON {name : String ,description : String , category : String}


Retorna : JSON  {state : String}

En caso de ser state = down Ocurrio un error en la base de datos
En caso de ser state = success Se agrego una nueva entrada a la db de manera exitosa


*/
router.post("/updateMovie", function(req, res, next) {
 
  const name = req.body["name"];
  const description = req.body["description"];
  const category = req.body["category"]

  
  const responseServer= res;
  
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw responseServer.send({ state: "down" });
    var dbo = db.db("carvajal");
    

          var myobj = { name:name};
          dbo.collection("movies").update(myobj,{$set:{description:description,category:category}}, function(err, res) {
            console.log("1 document inserted");
            db.close();
            responseServer.send({ state: "success" });
          });

        
      });
   

    
  });




/*
Metodo : POST

Funcionamiento : Recibe un JSON con los parametros,busca por el nombre de la pelicula en la db 
y actualia los campos de description : String y category : String


Parametros : Se envian desde la url espaciados por slash EJEMPLO : /getMovies/Busqueda implacable/Accion
los parametros de name y category pueden ser none, esto lo maneja el front end para realizar busquedas solo por un parametro
o ninguno


Retorna : JSON  {state : String ,movies :[ ]JSON}

En caso de ser state = down Ocurrio un error en la base de datos
En caso de ser state = success Se retorna la busqueda en movies
En caso de ser state = fail  No se encontro ningun elemento que satisface la busqueda


*/

router.get('/getMovies/:name/:category', function (req, res, next) {

  
  const name = req.params.name
  const category = req.params.category
  const responseServer = res;



  if(category==='none' && name==='none')
  {
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
      if (err) throw responseServer.send({ state: "down"});
      var dbo = db.db("carvajal");
      dbo
        .collection("movies")
        .find({})
        .toArray(function(err, res) {
          if (err) throw responseServer.send({ state: "down" });
          db.close();
          if (res.length > 0) {
            responseServer.send({ state: "success",movies:res});
          } else {
            responseServer.send({ state: "fail",movies:res});
          }
        });
    });
  }else
  {




  if(category==='none')
  {
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("carvajal");
      dbo
        .collection("movies")
        .find({ name: {'$regex' : name, '$options' : 'i'}})
        .toArray(function(err, res) {
          if (err) throw responseServer.send({ state: "down" });
          db.close();
          if (res.length > 0) {
            responseServer.send({ state: "success",movies:res});
          } else {
            responseServer.send({ state: "fail",movies:res});
          }
        });
    });
  
  }else
  {

    if(name==='none')
    {
      MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("carvajal");
        dbo
          .collection("movies")
          .find({ category: category })
          .toArray(function(err, res) {
            if (err) throw responseServer.send({ state: "down" });
            db.close();
            if (res.length > 0) {
              responseServer.send({ state: "success",movies:res});
            } else {
              responseServer.send({ state: "fail",movies:res});
            }
          });
      });
    }else
    {
      MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("carvajal");
        dbo
          .collection("movies")
          .find({ name: {'$regex' : name, '$options' : 'i'}, category: category })
          .toArray(function(err, res) {
            if (err) throw responseServer.send({ state: "down" });
            db.close();
            if (res.length > 0) {
              responseServer.send({ state: "success",movies:res});
            } else {
              responseServer.send({ state: "fail",movies:res});
            }
          });
      });
    

    }

  }


  }

})










module.exports = router;
