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

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendfile("index.html");
});


app.get('/books', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM books', function (error, results, fields) {
            if (error) throw error;
            const mostRecent = () => results.sort(((a, b) => a.rating > b.rating)).filter((el) => el.rating > 4);
            const visibleBooks = () => results.filter((el) => el.visible === 1);
            const filter = req.query.filter;
            const search = req.query.search;
            var regExp = new RegExp(search, "i");
            const searchResult = () => results.sort(((a, b) => a.rating > b.rating)).filter((el) => regExp.test(el.name));
            if (search) {
                res.send(JSON.stringify(searchResult()));
                return;
            }

            switch (filter) {
                case 'most_recent':
                    res.send(JSON.stringify(mostRecent()));
                    break;

                default:
                    res.send(JSON.stringify(visibleBooks()));
                    break;
            }

        });
    });

});
app.post('/books', urlencodedParser, function (req, res) {
    pool.getConnection(function (err, connection) {
        var autor = req.body.autor;
        var description = req.body.description;
        var img = req.body.imageFile;
        var id = req.body.id;
        var time = new Date();
        var action = 'insert book';
        console.log(time);
        console.log("id = " + id);
        if (autor && description && img) {
            img = "../img/" + img;
            connection.query('INSERT INTO `books`(`name`, `description`, `image`, `rating`, `visible`) VALUES (?,?,?,3,1)', [autor, description, img], function (error, results, fields) {
                connection.query('INSERT INTO `lastEdit`(`id_book`, `datetime`, `action`) VALUES (?,?,?)', [id, time, action], function (error, results, fields) {
                    res.redirect('/');
                });
            });
            
        }

        else
            res.redirect('/');
    });
});


app.put('/stars', jsonparder, function (req, res) {
    pool.getConnection(function (err, connection) {
        var result = req.body;
        console.log(result.id);
        var time = new Date();
        var action = 'update rating';
        connection.query('UPDATE books SET rating = ? WHERE id = ?', [result.star, result.id], function (error, results, fields) {
            connection.query('INSERT INTO `lastEdit`(`id_book`, `datetime`, `action`) VALUES (?,?,?)', [result.id, time, action], function (error, results, fields) {
                res.redirect('/');
            });
        });
    });

});

app.put('/books', jsonparder, function (req, res) {
    pool.getConnection(function (err, connection) {
        var result = req.body;
        console.log(result);
        var time = new Date();
        var action = 'delete book';
        connection.query('UPDATE books SET visible = 0 WHERE id = ?', [result.id], function (error, results, fields) {
            connection.query('INSERT INTO `lastEdit`(`id_book`, `datetime`, `action`) VALUES (?,?,?)', [result.id, time, action], function (error, results, fields) {});
        });
        connection.release();
    });

});

app.get('/history', function(req, res){
    pool.getConnection(function(err, connection){
        connection.query('SELECT datetime, books.name, books.description, action FROM lastEdit INNER JOIN books ON id_book = books.id ORDER BY lastEdit.id DESC LIMIT 2', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    })
})







app.listen(3000);