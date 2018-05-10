var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

app.set("view engine", "ejs");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library",
    port : 8000
});

connection.connect();


app.use(express.static(__dirname + '/public'));

connection.query('SELECT * FROM books', function (error, results, fields) {
    if (error) throw error;
    app.get('/books', function(req, res){
        res.render("index", {
            books: results
        });  
    })
  });
connection.query('SELECT * FROM books', function (error, results, fields) {
    if (error) throw error;
    app.get('/books/:id', function(req, res){
        res.render("index", {
            books: [results[req.params.id]]
        });  
    })
  });

connection.end();





app.listen(3000);