const DatabaseConnection = require('../models/db');
const db = new DatabaseConnection();
const dbConnection = db.setConnection();

const getUsers = async (req, res) => {
    const { email, phone } = req.query;
    const emailQuery = email ? `email = "${email}"` : '';
    const phoneQuery = phone ? `phone = "${phone}"` : '';
    const filterQuery = email && phone ? `WHERE ${emailQuery} AND ${phoneQuery}` :
                        email ? `WHERE ${emailQuery}` : 
                        phone ? `WHERE ${phoneQuery}` : ';';
    const query = `
        SELECT name, email, phone
        FROM user 
        LEFT JOIN email_user ON user.id = email_user.user_id
        LEFT JOIN email ON email_user.email_id = email.id
        LEFT JOIN phone_user ON user.id = phone_user.user_id
        LEFT JOIN phone ON phone_user.phone_id = phone.id
        ${filterQuery}`;

    const [rows] = await dbConnection.execute(query);

    res.json({ msg: 'get users API - controller', rows })
};

const registerUser = async (req, res) => {
    const { name, email, phone } = req.body;

    const userInsertQry = `INSERT INTO user (name) VALUES ("${name}");`;
    const emailInsertQry = `INSERT INTO email (email) VALUES ("${email}")`;
    const phoneInsertQry = `INSERT INTO phone (phone) VALUES ("${phone}")`;

    // insert user
    const [{ insertId: userId }] = await dbConnection.execute(userInsertQry);

    // insert email
    const [{ insertId: emailId }] = await dbConnection.execute(emailInsertQry);

    // phone
    const [{ insertId: phoneId }] = await dbConnection.execute(phoneInsertQry);

    const emailUserInsertQuery = `INSERT INTO email_user (user_id, email_id) VALUES (${userId}, ${emailId})`;
    const phoneUserInsertQuery = `INSERT INTO phone_user (user_id, phone_id) VALUES (${userId}, ${phoneId})`;

    // email_user 
    await dbConnection.execute(emailUserInsertQuery);

    // phone_user
    await dbConnection.execute(phoneUserInsertQuery);

    res.json({
        msg: 'post API - controller',
        newUser: {
            id: userId,
            email,
            phone
        },
        newMail: {
            id: emailId,
            email
        },
        newPhone: {
            id: phoneId,
            phone
        }
    });
}

module.exports = {
    getUsers,
    registerUser
}