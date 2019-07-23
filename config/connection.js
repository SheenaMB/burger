var mysql = require('mysql');
var express = require('express');
var app = express();

var PORT = process.env.PORT || 8080;

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "midori14",
    database: "burgers_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected at:" + con.threadId);
});
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("server listening on http://localhost:" + PORT);
});

//is this how we export this connection?
module.exports = con;