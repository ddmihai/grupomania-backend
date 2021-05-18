// PhpMySql connection

let mysql           = require('mysql');
let connection      = mysql.createConnection({
  host     :        'localhost',
  user     :        'root',
  password :        '',
  database :        'grupomania'
});

// testing basic the connection
connection.connect((err) => {
   if (err) throw err;

   console.log('Successfuly connected to the database!');
 });
// exports the connection
module.exports = connection;