const nodemailer = require('nodemailer')
const con = require('../dbconnect')



// verify connection configuration
const verify = (server, port, email, password, secure, req, res) => {
    var tls;
    if (Number(secure) == 0) {
        tls = false
    } else { tls = true }
    const transporter = nodemailer.createTransport({
        host: server,
        port: port,
        secure: tls, // upgrade later with STARTTLS
        auth: {
            user: email,
            pass: password,
        },
    });
    transporter.verify(function (error, success) {
        if (error) {
            res.json({ "error": error })
        } else {
            res.json({ "success": success })
        }
    });
}



const sendMail = (options) => {
    let insertQuery = "SELECT * FROM email WHERE id = 1"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            const { id, server, port, email, password, secure } = result[0]
            var tls;
            if (Number(secure) == 0) {
                tls = false
            } else { tls = true }
            const transporter = nodemailer.createTransport({
                host: server,
                port: port,
                secure: tls, // upgrade later with STARTTLS
                auth: {
                    user: email,
                    pass: password,
                },
            });
            options.from = email
            transporter.sendMail(options, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } else {
            res.json(err)
        }
    })




}

module.exports = { verify, sendMail }