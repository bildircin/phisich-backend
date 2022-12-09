const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')
const mysql = require('mysql')


const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, 'emre12345')
            //get user from the token
            let id = decoded.id
            let insertQuery = 'SELECT * FROM users WHERE id = ?'
            let query = mysql.format(insertQuery, [id])
            con.query(query, function (err, result) {
                if (err) {
                    res.status(401).send({ error: 'Not Authorized' })
                    console.log(err, result)
                } else {
                    if (result.length == 0) {
                        res.status(401).send({ error: 'Not Authorized' })
                    } else {
                        let q = 'SELECT * FROM settings WHERE id = 1'
                        con.query(q, function (err, resu) {
                            if (err) {
                                console.log(err, resu)

                                res.status(401).send({ error: 'Not Authorized' })
                            } else {
                                const activate = resu[0].activation_enable;
                                if (activate == 1) {
                                    if (result[0].verified == 1) {
                                        req.user = result[0];
                                    } else {
                                        res.status(401).send({ error: 'Account need to be activated' })
                                    }
                                } else {
                                    req.user = result[0];
                                }
                            }
                            next()

                        })

                    }
                }
            })
        } catch (error) {
            res.status(401).send({ error: 'Not Authorized' })
        }
    }
    if (!token) {
        res.status(401).send({ error: 'Not Authorized no token' })
    }
})

const onlyAdmin = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, 'emre12345')
            //get user from the token
            let id = decoded.id
            let insertQuery = 'SELECT * FROM users WHERE id = ?'
            let query = mysql.format(insertQuery, [id])
            con.query(query, function (err, result) {
                if (err) {
                    res.status(401).send({ error: 'Not Authorized' })
                    console.log(err, result)
                } else {
                    if (result.length == 0 || result[0].userrole != 1) {
                        console.log(result[0])
                        res.status(401).send({ error: 'Not Authorized' })
                    } else {
                        req.user = result[0];
                        next()
                    }
                }
            })
        } catch (error) {
            res.status(401).send({ error: 'Not Authorized' })
        }
    }
    if (!token) {
        res.status(401).send({ error: 'Not Authorized' })
    }
})

const registerOpen = asyncHandler(async (req, res, next) => {
    let insertQuery = 'SELECT * FROM settings WHERE id = 1'
    con.query(insertQuery, function (err, result) {
        if (err) {
            res.status(401).send({ error: 'Something wrong' })
        } else {
            if (result.register_enable == 1) {
                next()
            } else {
                res.status(401).send({ error: 'Registration is not available' })
            }
        }
    })
})

module.exports = { protect, onlyAdmin, registerOpen }