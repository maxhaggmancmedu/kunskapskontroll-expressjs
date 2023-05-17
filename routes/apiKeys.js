const express = require('express')
const router = express.Router()
const allKeys = require('../allValidKeys')

router.get('/', (req, res) => {
    res.json(allKeys.getKeys())
})

router.delete('/', (req, res) => {
    const userKey = req.query.apiKey;
    const keys = allKeys.getKeys();
    
    const key = keys.find((key) => key === userKey);
  
    if (!key) {
      return res.status(404).json({ message: 'No key could be found' });
    }
  
    const deleted = allKeys.deleteKey(userKey);
    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete the key' });
    }
  
    return res.json({message: `Your key '${userKey}' has been deleted`});
  });

router.post('/', (req, res) => {
    
    const keyObject = req.body;
    const keyString = keyObject.key;
  
    const added = allKeys.addKey(keyString);
    if (!added) {
      return res.status(400).json({
        message: 'That key already exists. You can either create a new one or use that key for future requests',
      });
    }
  
    return res.json({message: `Your key '${keyString}' has been added. You can now use it to fetch data`});
    
})

module.exports = router;
