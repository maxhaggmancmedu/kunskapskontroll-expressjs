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
        .json({message: "No key. Please add a valid api key at the end of your request. E.g: http://localhost:3005/movies?apiKey=yourKey"})
    }

    if (!(validApiKeys.includes(apiKey))) {
        return res
        .status(403)
        .json({ message: "Invalid key"})
    }
    next()
}

app.use((req, res, next) => {
    authenticateApiKey(req, res, next)
})

app.get('/', (res) => {
  res.send('Hello this is a REST api for James bond movies!')
})

app.use('/movies', movies)

app.use('/keys', keys)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})