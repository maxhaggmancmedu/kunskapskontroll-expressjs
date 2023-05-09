const express = require('express')
const movies = require('./routes/movies')
const allValidApiKeys = require('./allValidKeys')
const keys = require('./routes/apiKeys')

const app = express()
const port = 3005

app.use(express.json())

let validApiKeys = allValidApiKeys;

const authenticateApiKey = (req, res, next) => {
    const apiKey = req.query.apiKey;
    
    if (!apiKey) {
        return res
        .status(401)
        .json({message: "No key"})
    }

    if (!(validApiKeys.includes(apiKey))) {
        return res
        .status(403)
        .json({ message: "Invalid key"})
    }
    next()
}

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    console.log(req.query)
    authenticateApiKey(req, res, next)
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/movies', movies)

app.use('/keys', keys)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })