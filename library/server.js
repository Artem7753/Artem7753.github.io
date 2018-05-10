var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set("view engine", "ejs");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "library"
});

pool.getConnection(function(err, connection) {
app.use(express.static(__dirname + '/public'));


connection.query('SELECT * FROM books', function (error, results, fields) {
    if (error) throw error;
    app.get('/', function(req, res){
        res.sendfile("index.html"); 
    })
  });

//connection.query('SELECT * FROM books', function (error, results, fields) {
//   if (error) throw error;
//   app.get('/:id', function(req, res){
//        res.render("index", {
//            books: [results[req.params.id]]
//        });  
//    })
//  });


connection.query('SELECT * FROM books', function (error, results, fields) {
    if (error) throw error;
    app.get('/test/ajax', function(req, res){
        res.send(JSON.stringify(results));
    })
  });
app.post('/form',urlencodedParser,function(req, res){
    var autor = req.body.autor;
    var description = req.body.description;
    var img = req.body.imageFile;
    if(autor != "" && description != "" && img!= ""){
        img = "../img/" + img;
        connection.query('INSERT INTO `books`(`name`, `description`, `image`, `rating`) VALUES (?,?,?,3)',[autor,description,img] ,function (error, results, fields) {
            res.redirect('/');
            
       });  
    }
        
    else 
        res.redirect('/');
});




});



app.listen(3000);