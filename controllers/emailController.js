const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')
const mysql = require('mysql');
const { verify } = require('./emailSender');


const updateMail = asyncHandler(async (req, res) => {
    const { server, port, email, password, secure } = req.body
    let insertQuery = "UPDATE email SET server = ?, port = ?, email = ?, password = ?, secure = ? WHERE id = 1"
    con.query(insertQuery, [server, port, email, password, secure], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const getMail = asyncHandler(async (req, res) => {
    let insertQuery = "SELECT * FROM email WHERE id = 1"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            res.json(result[0]);
        } else {
            res.json(err)
        }
    })
})

const checkMail = asyncHandler(async (req, res) => {
    let insertQuery = "SELECT * FROM email WHERE id = 1"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            const { id, server, port, email, password, secure } = result[0]
            verify(server, port, email, password, secure, req, res)
        } else {
            res.json(err)
        }
    })
})







module.exports = {
    updateMail,
    getMail,
    checkMail
}