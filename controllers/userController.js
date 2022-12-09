const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { verify, sendMail } = require('./emailSender.js')
const { v4: uuidv4 } = require('uuid');



const getUser = asyncHandler(async (req, res) => {
    con.query("SELECT * FROM users", function (err, result) {
        if (!err) {
            res.json(result);
        } else {
            console.log(err)
        }
    })
})



const addUser = asyncHandler(async (req, res) => {
    const { name, surname, email, password, verified, verificationtoken, userrole } = req.body


    //hash passwrd
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let q = 'SELECT * FROM users WHERE email=?'
    let que = mysql.format(q, [email]);

    con.query(que, function (err, result) {
        if (!err) {
            if (result.length > 0) {
                res.json({ error: 'user already exists' })
            } else {
                let insertQuery = 'INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)';
                let query = mysql.format(insertQuery, ["users", "name", "surname", "email", "password", "verified", "verificationtoken", "userrole", name, surname, email, hashedPassword, verified, verificationtoken, userrole]);
                con.query(query, function (err, result) {
                    if (!err) {
                        res.json({
                            _id: result.insertId,
                            name,
                            surname,
                            email,
                            token: generateToken(result.insertId)
                        })

                    } else {
                        res.json(err)
                    }
                })
            }
        }
    })




})


const registerUser = asyncHandler(async (req, res) => {
    const verified = 0;
    const random = uuidv4() + uuidv4() + uuidv4();
    var verificationtoken = random.replace(/-/g, "");

    const { name, surname, email, password } = req.body
    const userrole = 0;


    //hash passwrd
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let q = 'SELECT * FROM users WHERE email=?'
    let que = mysql.format(q, [email]);

    con.query(que, function (err, result) {
        if (!err) {
            if (result.length > 0) {
                res.json({ error: 'user already exists' })
            } else {
                let insertQuery = 'INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)';
                let query = mysql.format(insertQuery, ["users", "name", "surname", "email", "password", "verified", "verificationtoken", "userrole", name, surname, email, hashedPassword, verified, verificationtoken, userrole]);
                con.query(query, function (err, result) {
                    if (!err) {
                        const emailOptions = {
                            from: '',
                            to: email,
                            subject: 'Verify your email',
                            text: `Please cick link to verify your email ${process.env.CLIENT_URL + 'verifyaccount?verificationtoken=' + verificationtoken}`
                        }
                        sendMail(emailOptions)
                        res.json({
                            _id: result.insertId,
                            name,
                            surname,
                            email,
                            token: generateToken(result.insertId),
                            verified

                        })

                    } else {
                        res.json(err)
                    }
                })
            }
        }
    })
})

const resendActivation = asyncHandler(async (req, res) => {
    const { email } = req.body
    let insertQuery = "SELECT * FROM users WHERE email = ?"
    con.query(insertQuery, [email], function (err, result) {
        if (!err) {
            if (result.length > 0) {
                console.log(result[0].verified)
                if (result[0].verified == 0 && result[0].verificationtoken.length > 10) {
                    const emailOptions = {
                        from: '',
                        to: email,
                        subject: 'Verify your email',
                        text: `Please cick link to verify your email ${process.env.CLIENT_URL + 'verifyaccount?verificationtoken=' + result[0].verificationtoken}`
                    }
                    sendMail(emailOptions)
                    res.json({ success: 'Email sent' })
                } else {
                    res.json({ error: 'Account verified or token is not acceptable. Create new account or reach us.' })
                }
            }
        } else { res.json({ error: err }) }
    })

})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const insertQuery = 'SELECT * FROM users WHERE email = ?'
    //    
    con.query(insertQuery, [email], async function (err, result) {
        if (err) {
            res.json(err)
        } else {
            if (result.length == 0) {
                res.json({ error: 'user not exists' })
            } else {
                const user = result[0]
                const isPasswordTrue = await bcrypt.compare(password, user.password)
                if (isPasswordTrue) {
                    console.log("true pass")
                    res.json({
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        token: generateToken(user.id),
                        verified: user.verified
                    })
                } else {
                    console.log("error")
                    res.json({ error: 'wrong password' })
                }
            }
        }
    })
})

const updateUsers = asyncHandler(async (req, res) => {
    const { name, surname, email, userrole, verified, id } = req.body


    let insertQuery = "UPDATE users SET name = ?, surname = ?, userrole = ?, verified = ? WHERE id = ?"
    con.query(insertQuery, [name, surname, userrole, verified, id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else { res.json({ err }) }
    })

})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    let insertQuery = "DELETE from users WHERE id = ?"
    con.query(insertQuery, [id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json({ err })
        }
    })
})

const verifyUser = asyncHandler(async (req, res) => {
    const { verificationtoken } = req.body
    let insertQuery = "UPDATE users SET verified = 1 WHERE verificationtoken = ?;";
    insertQuery += "UPDATE users SET verificationtoken = 1 WHERE verificationtoken = ?;"
    con.query(insertQuery, [verificationtoken, verificationtoken], function (err, result) {
        if (!err) {
            res.json({ success: result });
        } else {
            res.json({ error: 'Verification token not found. It is not correct or it is already verified' })
        }
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body.email
    const tok = uuidv4() + uuidv4() + uuidv4() + uuidv4()
    const token = tok.replace(/-/g, "")
    let insertQuery = "SELECT * FROM users WHERE email = ?;";
    insertQuery += "UPDATE users SET passwordtoken = ? WHERE email = ?;"
    con.query(insertQuery, [email, token, email], function (err, result) {
        console.log(email, token, email)
        if (!err) {
            const mailOptions = {
                from: '',
                to: email,
                subject: 'Reset Your Password',
                text: `You can click link to reset your password ${process.env.CLIENT_URL + 'new-password?rptoken=' + token}`
            }
            sendMail(mailOptions)
            res.json({ success: 'Email sent!!' });
        } else {
            console.log(err)
            res.json({ error: 'Email could not found' })
        }
    })
})


const resetLast = asyncHandler(async (req, res) => {
    const { resettoken, newpassword } = req.body
    //hash passwrd
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newpassword, salt)

    let insertQuery = "SELECT * FROM users WHERE passwordtoken = ?;";
    insertQuery += "UPDATE users SET password = ?, passwordtoken = 0 WHERE passwordtoken = ?;"
    con.query(insertQuery, [resettoken, hashedPassword, resettoken], function (err, result) {
        if (!err) {
            res.json({ success: 'Password changed you can go to login page' });
        } else {
            console.log(err)
            res.json({ error: 'This reset token is not valid' })
        }
    })
})



//generate JWT

function generateToken(id) {
    return jwt.sign({ id }, 'emre12345', {
        expiresIn: '30d'
    })
}

module.exports = {
    getUser,
    addUser,
    loginUser,
    updateUsers,
    deleteUser,
    registerUser,
    verifyUser,
    resendActivation,
    resetPassword,
    resetLast
}