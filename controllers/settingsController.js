const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')
const mysql = require('mysql');

const updateSettings = asyncHandler(async (req, res) => {
    const { table, value } = req.body
    let insertQuery = "UPDATE settings SET ?? = ? WHERE id = 1"
    con.query(insertQuery, [table, value], function (err, result) {
        if (!err) {
            res.json({ result });
        }
    })
})

const getSettings = asyncHandler(async (req, res) => {
    let insertQuery = "SELECT * FROM settings WHERE id = 1"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err)
        }
    })
})



module.exports = {
    updateSettings,
    getSettings
}