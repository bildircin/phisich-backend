const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')

const updateSocials = asyncHandler(async (req, res) => {
    const { name, link, color, id } = req.body
    let insertQuery = "UPDATE sociallinks SET name = ?, link = ?, color = ? WHERE id = ?"
    con.query(insertQuery, [name, link, color, id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const addSocials = asyncHandler(async (req, res) => {
    const { name, link, color } = req.body
    let insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?, ?, ?)"
    con.query(insertQuery, ["sociallinks", 'name', 'link', 'color', name, link, color], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const getSocials = asyncHandler(async (req, res) => {
    let insertQuery = "SELECT * FROM sociallinks"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err)
        }
    })
})

const deleteSocials = asyncHandler(async (req, res) => {
    const { id } = req.body
    let insertQuery = "DELETE from sociallinks WHERE id = ?"
    con.query(insertQuery, [id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})



module.exports = {
    updateSocials,
    getSocials,
    addSocials,
    deleteSocials
}