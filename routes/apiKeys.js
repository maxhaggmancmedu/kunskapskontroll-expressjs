const express = require('express')
const router = express.Router()
const allKeys = require('../allValidKeys')

let keys = allKeys;

router.get('/', (req, res) => {
    res.json(keys)
})

router.delete('/', (req, res) => {
    const userKey = req.query.apiKey;
    const key = keys.find( key => key === userKey)

    if (!key) {
        return res
        .status(404)
        .json({ message: 'No key could be found'})
    }

    const newKeys = keys.filter( key => key !== userKey)
    keys = newKeys;

    res.json(keys)
})

router.post('/', (req, res) => {
    
    const keyObject = req.body

    const keyString = keyObject.key;

    if (keys.includes(keyString)) {
        return res
        .status(400)
        .json({message: 'That key already exists. You can either create a new one or use that key for future requests'})
    }

    keys = [...keys, keyString]
    
    return res.json(keys)
    
})

module.exports = router;
