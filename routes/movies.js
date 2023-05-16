const express = require('express')
const router = express.Router()
const mockData = require('../mockData')
const allValidApiKeys = require('../allValidKeys')

let movies = mockData;
let validApiKeys = allValidApiKeys.getKeys();
let isValid;

router.use((req, res, next) => {
    authenticateApiKey(req, res, next)
})

router.get('/', (req, res) => {
    res.json(movies)
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    const movie = movies.find( movie => movie.imdbID === id)
    if (!movie) {
        return res
        .status(404)
        .json({ message: 'No film with that id could be found'})
    }

    res.json(movie)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    const movie = movies.find( movie => movie.imdbID === id)

    if (!movie) {
        return res
        .status(404)
        .json({ message: 'No film with that id could be found'})
    }

    const newMovies = movies.filter( movie => movie.imdbID !== id)
    movies = newMovies;

    res.json(movies)
})

let nextId = 1000

router.post('/', (req, res) => {
    isValid = false;

    const movie = req.body
    const idString = 'tt' + nextId.toString()

    const newMovie = {
        ...movie, 
        id: idString
    }

    nextId++

    validateValues(currentMovie = newMovie, res, method = 'POST')
    
    if (isValid === true) {
        movies = [...movies, newMovie]
    }

    return res.json(movies)
})

router.put('/:id', (req, res) => {
    isValid = false;

    const id = req.params.id;
    const movie = req.body

    const index = movies.findIndex(movie => movie.imdbID === id)

    if (index === -1) {
        return res
        .status(404)
        .json({ message: 'No film with that id could be found'})
    }
    
    const updatedMovie = {...movies[index], ...movie}
    movies[index] = updatedMovie

    validateValues(currentMovie = updatedMovie, res, method = 'PUT')
    
    if (isValid === true) {
        return res.json(updatedMovie);
    } 
})

const validateValues = (currentMovie, res, method) => {

    if (!currentMovie.Title) {
        return res.status(400).json({message: `Please enter a 'Title' of the movie into your ${method} request`})
    }

    if (!currentMovie.Released) {
        return res.status(400).json({message: `Please enter a 'Released' date of the movie into your ${method} request`})
    }

    if (!currentMovie.Year) {
        return res.status(400).json({message: `Please enter a 'Year' of the movie into your ${method} request`})
    }

    if (!currentMovie.Genre) {
        return res.status(400).json({message: `Please enter atleast one 'Genre' of the movie into your ${method} request`})
    }

    if (isNaN(currentMovie.Year)) {
        return res.status(400).json({message: `The movie 'Year' needs to be a number in your ${method} request`})
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    if (currentYear < currentMovie.Year) {
        return res.status(400).json({message: `That 'Year' is yet to happen. Please enter a new year in your ${method} request`})
    }

    if (1800 > currentMovie.Year) {
        return res.status(400).json({message: `Are you sure this movie came out in ${currentMovie.Year}? Please enter a new 'Year' in your ${method} request`})
    }

    return isValid = true
}

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

module.exports = router;