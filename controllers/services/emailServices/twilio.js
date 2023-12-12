const sendEmailFromTwilio = async (email) => {
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

    if(!twRes.sid){
        return {
            err: 'something went wrong :(',
            success: false
        }
    }

    return {
        sid: twRes.sid,
        msg: 'email sent from Twilio',
        success: true
    };
}

module.exports = sendEmailFromTwilio;