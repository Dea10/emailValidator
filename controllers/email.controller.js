const DatabaseConnection = require('../models/db');
const db = new DatabaseConnection();
const dbConnection = db.setConnection();

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

    const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    const twRes = await client.verify.v2.services(process.env.SERVICE_ID)
        .verifications
        .create({
            channelConfiguration: {
                substitutions: {
                    email_to_verify: email
                }
            },
            to: email,
            channel: 'email',
        });

    res.json({
        sid: twRes.sid,
        msg: 'email sent',
        email
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