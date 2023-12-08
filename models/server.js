const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.emailPath = '/api/email';

        this.middlewares();

        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // body parse
        this.app.use(express.json());

        // public dir
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/user.routes'));
        this.app.use( this.emailPath, require('../routes/email.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in ', this.port);
        });
    }
}

module.exports = Server;