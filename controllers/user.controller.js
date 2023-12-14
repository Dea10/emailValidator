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
        SELECT user.id, name, email, phone, user.isActive
        FROM user 
        LEFT JOIN email_user ON user.id = email_user.user_id
        LEFT JOIN email ON email_user.email_id = email.id
        LEFT JOIN phone_user ON user.id = phone_user.user_id
        LEFT JOIN phone ON phone_user.phone_id = phone.id
        ${filterQuery}`;

    const [rows] = await dbConnection.execute(query);

    res.json({ msg: 'get users API - controller', count: rows.length, rows })
};

const deactivateUser = async (req, res) => {
    const { email } = req.body;
    const query = `CALL sp_deactivate_user("${email}");`;

    const [rows] = await dbConnection.execute(query);

    res.json({
        msg: 'deactivate - controller',
        success: true,
        affectedRows: rows.affectedRows
    })
}

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
        const [rows] = await dbConnection.execute(query);
        if(rows[0][0].error_message) throw new Error("Duplicated user")

        res.json({
            msg: 'post API - controller',
            success: true,
            newUser: {
                email,
                phone
            }
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'something went wrong',
            success: false,
        })
    }
}

module.exports = {
    getUsers,
    deactivateUser,
    registerUser
}