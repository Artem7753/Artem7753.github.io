var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

app.set("view engine", "ejs");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "library"
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