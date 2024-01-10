const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logEvents')
const cors = require('cors')
const PORT = process.env.PORT || 3500

// Making custom middleware logger
app.use(logger)

// Cross origin resource sharing
app.use(cors())

// builtin middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }))

// builtin middleware for json
app.use(express.json())

//serve static dfiles
app.use(express.static(path.join(__dirname, '/public')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html') // 302 by default, want 301
})

// Chaining Route handlers
// Example 1
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
}, (req, res) => {
    res.send('hello world')
})

//Example 2:
// Acts similar to middleware
const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res, next) => {
    console.log('three')
    res.send('Finished!')
}

app.get('/chain(.html)?', [one, two, three])

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))