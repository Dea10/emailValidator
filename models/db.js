const mysql = require('mysql2');

class DatabaseConnection {
    constructor() {
        this.host = 'localhost';
        this.user = 'root';
        this.database = 'email_validator',
        this.password = process.env.DB_PASSWORD
    }

    setConnection() {
        const connection = mysql.createPool({
            host: this.host,
            user: this.user,
            database: this.database,
            password: this.password,
        });

        return connection.promise();
    }
}

module.exports = DatabaseConnection;