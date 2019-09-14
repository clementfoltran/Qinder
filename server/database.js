const mysql = require('mysql');

const db = mysql.createConnection({
  multipleStatements  : true,
  host                : 'localhost',
  user                : 'root',
  password            : '123456',
  database            : 'qinder'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.log('Failed to connect to mysql database');
    return ;
  }
  console.log('Successfully connect to qinder mysql database');
});

module.exports = db;
