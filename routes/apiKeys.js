const express = require('express')
const router = express.Router()
const allKeys = require('../allValidKeys')

let keys = allKeys;

router.get('/', (req, res) => {
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



console.log(typeof nextId)
router.post('/', (req, res) => {
    
    const key = req.body

    const keyString = key.key;

    keys = [...keys, keyString]
    
    return res.json(keys)
    
})

router.put('/:id', (req, res) => {
    const id = req.params.id;

    const key = req.body

    const index = keys.findIndex(key => key.imdbID === id)
    console.log({index})

    if (index === -1) {
        return res
        .status(404)
        .json({ message: 'Ingen karaktär med det idt kunde hittas'})
    }
    

    const updatedKey = {...keys[index], ...key}
    keys[index] = updatedKey

    validateValues(currentKey = updatedKey, res, method = 'PUT')
    console.log(updatedKey.Title)

    res.json(updatedKey)
})

module.exports = router;
