let mysql = require('mysql');

exports.con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 8888,
  database : 'ReactApp',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});