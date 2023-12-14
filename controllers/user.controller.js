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
        SELECT user.id, name, email, phone
        FROM user 
        LEFT JOIN email_user ON user.id = email_user.user_id
        LEFT JOIN email ON email_user.email_id = email.id
        LEFT JOIN phone_user ON user.id = phone_user.user_id
        LEFT JOIN phone ON phone_user.phone_id = phone.id
        ${filterQuery}`;

    const [rows] = await dbConnection.execute(query);

    res.json({ msg: 'get users API - controller', count: rows.length, rows })
};

const registerUser = async (req, res) => {
    const { name, email, phone } = req.body;
    const query = `CALL sp_register_user("${name}", "${email}", "${phone}")`;

    if(name.length === 0 || email.length === 0 || phone.length === 0) {
        res.status(400).json({
            msg: "not valid info",
            success: false,
            name,
            email,
            phone
        });

        return;
    }

    try {
        await dbConnection.execute(query);

        res.json({
            msg: 'post API - controller',
            success: true,
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
        
    } catch (error) {
        res.status(500).json({
            msg: 'something went wrong',
            error: error.sqlMessage,
            success: false
        })
    }
}

module.exports = {
    getUsers,
    registerUser
}