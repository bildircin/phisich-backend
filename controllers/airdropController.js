const asyncHandler = require('express-async-handler')
const con = require('../dbconnect')

const updateAirdrops = asyncHandler(async (req, res) => {
    const { contract_address, length, tree, hold_token, reward_token, single_reward, total_reward, reward_token_decimal, reward_token_symbol, hold_token_symbol, minimum_hold, hold_token_decimal, id } = req.body
    let insertQuery = "UPDATE airdrops SET contract_address = ?, length = ?, tree = ?, hold_token = ?, reward_token = ?, single_reward = ?, total_reward = ?, reward_token_decimal = ?, reward_token_symbol = ?, hold_token_symbol = ?, minimum_hold = ?, hold_token_decimal = ? WHERE id = ?"
    con.query(insertQuery, [contract_address, length, tree, hold_token, reward_token, single_reward, total_reward, reward_token_decimal, reward_token_symbol, hold_token_symbol, minimum_hold, hold_token_decimal], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})

const addAirdrops = asyncHandler(async (req, res) => {
    const { contract_address, length, tree, hold_token, reward_token, single_reward, total_reward, reward_token_decimal, reward_token_symbol, hold_token_symbol, minimum_hold, hold_token_decimal } = req.body
    let insertQuery = "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    con.query(insertQuery, ["airdrops", 'contract_address', 'length', 'tree', 'hold_token', 'reward_token', 'single_reward', 'total_reward', 'reward_token_decimal', 'reward_token_symbol', 'hold_token_symbol', 'minimum_hold', 'hold_token_decimal', contract_address, length, tree, hold_token, reward_token, single_reward, total_reward, reward_token_decimal, reward_token_symbol, hold_token_symbol, minimum_hold, hold_token_decimal], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            console.log(err)
            res.json(err)
        }
    })
})

const getAirdrops = asyncHandler(async (req, res) => {
    let insertQuery = "SELECT * FROM airdrops"
    con.query(insertQuery, function (err, result) {
        if (!err) {
            res.json(result);
        } else {
            res.json(err)
        }
    })
})

const deleteAirdrops = asyncHandler(async (req, res) => {
    const { id } = req.body
    let insertQuery = "DELETE from airdrops WHERE id = ?"
    con.query(insertQuery, [id], function (err, result) {
        if (!err) {
            res.json({ result });
        } else {
            res.json(err)
        }
    })
})



module.exports = {
    updateAirdrops,
    addAirdrops,
    getAirdrops,
    deleteAirdrops
}