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

router.delete('/:key', (req, res) => {
    const userKey = req.params.key;
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

    keys = [...keys, keyString]
    
    return res.json(keys)
    
})

module.exports = router;
