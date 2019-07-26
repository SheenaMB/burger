//create methods that will execute the necessary MySQL commands in the controllers. These are the methods you will 
// need to use in order to retrieve and store data in your database.
var connection = require("./connection.js")

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    return arr;
}

var orm = {
    all: function (tableName, cb) {
        var queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        var queryString = "INSTERT INTO " + table;

        queryString += " (" + cols.toString() + ") "
        queryString += "VALUES (" + printQuestionMarks(vals.length) + ") "

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    update: function (table, objColVals, condition, cb) {
        console.log("------test-----");
        console.log(table,objColVals);
        var queryString = "UPDATE " + table;

        queryString += " SET " + objToSql(objColVals);
        queryString += " WHERE " + condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

}
//where would these
//selectAll()
//insterOne()
//updateOne()

module.exports = orm;