const mysql = require('mysql');

class MySQLConnection {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
      } else {
        console.log('Connected to MySQL database');
      }
    });
  }

  disconnect() {
    this.connection.end((err) => {
      if (err) {
        console.error('Error disconnecting from MySQL:', err);
      } else {
        console.log('Disconnected from MySQL database');
      }
    });
  }

  executeQuery(query, params, callback) {
    this.connection.query(query, params, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

  // Operaciones CRUD

  create(table, data, callback) {
    const query = `INSERT INTO ${table} SET ?`;
    this.executeQuery(query, data, callback);
  }

  read(table, condition, callback) {
    let query = `SELECT * FROM ${table}`;
    if (condition) {
      query += ` WHERE ${condition}`;
    }
    this.executeQuery(query, null, callback);
  }

  update(table, data, condition, callback) {
    const query = `UPDATE ${table} SET ? WHERE ${condition}`;
    this.executeQuery(query, data, callback);
  }

  delete(table, condition, callback) {
    const query = `DELETE FROM ${table} WHERE ${condition}`;
    this.executeQuery(query, null, callback);
  }
}

module.exports = MySQLConnection;
