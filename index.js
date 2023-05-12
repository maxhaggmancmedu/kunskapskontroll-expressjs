const express = require('express')
const movies = require('./routes/movies')
const keys = require('./routes/apiKeys')

const app = express()

const port = 3005

app.use(express.json())

app.get('/', (res) => {
  res.send({message: "Hello this is a REST api for James bond movies!"})
})

app.use('/movies', movies)

app.use('/keys', keys)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

