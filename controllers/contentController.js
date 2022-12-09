const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')

const getContent = asyncHandler(async (req, res) => {
    con.query("SELECT * FROM contents", function (err, result) {
        if (!err) {
            res.json({ result });
        }
    })
})

module.exports = {
    getContent,
}