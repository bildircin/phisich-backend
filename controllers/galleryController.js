const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')
const fs = require('fs')
const root = require("../root");


const updateGallery = asyncHandler(async (req, res) => {
    const { alt, name, width, height, id } = req.body
    let insertQuery = "UPDATE images SET alt = ?, name = ?, width = ?, height = ? WHERE id = ?"
    con.query(insertQuery, [link, alt, name, width, height, id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const addGallery = asyncHandler(async (req, res) => {
    const { link, alt, name, width, height } = req.body
    let insertQuery = "INSERT INTO ?? (??,??,??,??,??) VALUES (?, ?, ?, ?, ?)"
    con.query(insertQuery, ["images", 'link', 'alt', 'name', 'width', 'height', link, alt, name, width, height], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const getGallery = asyncHandler(async (req, res) => {
    let insertQuery = "SELECT * FROM images"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err)
        }
    })
})

const deleteGallery = asyncHandler(async (req, res) => {
    const { id } = req.body
    let que = "SELECT * FROM images WHERE id = ?"
    con.query(que, [id], function (err, result) {
        if (!err) {
            const directory = root.PROJECT_DIR;
            fs.unlinkSync(directory + '/public/images/' + result[0].link)
        }
    })

    let insertQuery = "DELETE from images WHERE id = ?"
    con.query(insertQuery, [id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})



module.exports = {
    updateGallery,
    getGallery,
    addGallery,
    deleteGallery
}