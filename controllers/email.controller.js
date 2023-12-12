const DatabaseConnection = require('../models/db');
const CircuitBreaker = require('./services/emailServices/CircuitBreaker');
const db = new DatabaseConnection();
const dbConnection = db.setConnection();
const emailService = new CircuitBreaker();

const verifyEmail = async (req, res) => {
    const { email } = req.query;
    const query = `UPDATE email SET isVerified = true WHERE email = "${email}";`;

    await dbConnection.execute(query)

    res.json({
        msg: 'email verified',
        email
    });
}

const startEmailVerification = async (req, res) => {
    const { email } = req.body;
    
    const resp = await emailService.fire(email);

    res.json({
        msg: 'email sent',
        email,
        resp
    });
}

const getVerified = async (req, res) => {
    const { q } = req.query;
    const query = `SELECT id, email FROM email WHERE isVerified = ${!!q ? 'true' : 'false'};`;

    const [rows] = await dbConnection.execute(query);

    res.json({
        msg: 'get verified email list API - controller',
        rows
    });
}

module.exports = {
    verifyEmail,
    startEmailVerification,
    getVerified
}