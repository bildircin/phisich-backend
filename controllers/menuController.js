const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')

const updateMenus = asyncHandler(async (req, res) => {
    const { name, link, menu_place, id } = req.body
    let insertQuery = "UPDATE menu_links SET name = ?, link = ?, menu_place = ? WHERE id = ?"
    con.query(insertQuery, [name, link, menu_place, id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const addMenus = asyncHandler(async (req, res) => {
    const { name, link, menu_place } = req.body
    let insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?, ?, ?)"
    con.query(insertQuery, ["menu_links", 'name', 'link', 'menu_place', name, link, menu_place], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const getMenus = asyncHandler(async (req, res) => {
    let insertQuery = "SELECT * FROM menu_links"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err)
        }
    })
})

const deleteMenus = asyncHandler(async (req, res) => {
    const { id } = req.body
    let insertQuery = "DELETE from menu_links WHERE id = ?"
    con.query(insertQuery, [id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})



module.exports = {
    updateMenus,
    addMenus,
    getMenus,
    deleteMenus
}