const sendEmail = async (email) => {
    console.log('email sent from JS');
    
    return ({
        msg: 'email sent from JS',
        src: 'JS',
        success: true,
        email
    })
}

module.exports = sendEmail;