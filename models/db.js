const mysql = require('mysql2');

class DatabaseConnection {
    constructor() {
        this.host = process.env.DB_HOST,
        this.user = process.env.DB_USER,
        this.database = process.env.DB_NAME,
        this.password = process.env.DB_PASSWORD,
        this.port = process.env.DB_PORT
    }

    setConnection() {
        const connection = mysql.createPool({
            host: this.host,
            user: this.user,
            database: this.database,
            password: this.password,
            port: this.port || 3306
        });

        return connection.promise();
    }
}

module.exports = DatabaseConnection;