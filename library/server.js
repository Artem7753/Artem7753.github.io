var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonparder = bodyParser.json();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "library",
    port: 8000
});

pool.getConnection(function (err, connection) {
    app.use(express.static(__dirname + '/public'));


    app.get('/', function (req, res) {
        res.sendfile("index.html");
    });


    app.get('/books', function (req, res) {
        connection.query('SELECT * FROM books', function (error, results, fields) {
            if (error) throw error;
            const mostRecent = () => results.sort(((a, b) => a.rating > b.rating)).filter((el) => el.rating > 4);
            const filter = req.query.filter;
            const search = req.query.search;
            var regExp = new RegExp(search, "i");
            const searchResult = () => results.sort(((a, b) => a.rating > b.rating)).filter((el) => regExp.test(el.name));
            if(search){
                res.send(JSON.stringify(searchResult()));
                return;
            }

            switch (filter) {
                case 'most_recent':
                    res.send(JSON.stringify(mostRecent()));
                    break;

                default:
                    res.send(JSON.stringify(results));
                    break;
            }

        });
    });
    app.post('/books', urlencodedParser, function (req, res) {
        var autor = req.body.autor;
        var description = req.body.description;
        var img = req.body.imageFile;
        if (autor != "" && description != "" && img != "") {
            img = "../img/" + img;
            connection.query('INSERT INTO `books`(`name`, `description`, `image`, `rating`) VALUES (?,?,?,3)', [autor, description, img], function (error, results, fields) {
                res.redirect('/');

            });
        }

        else
            res.redirect('/');
    });

    app.put('/books', jsonparder, function (req, res) {
        var result = req.body;
        console.log(result);
        connection.query('UPDATE books SET rating = ? WHERE id = ?', [result.star, result.id], function (error, results, fields) {
            console.log(results);
            console.log(error);
        });
    });

    app.delete('/books', jsonparder, function (req, res) {
        var result = req.body;
        console.log(result);
        connection.query('DELETE FROM books WHERE id = ?', [result.id], function (error, results, fields) {
        })
    })

});



app.listen(3000);