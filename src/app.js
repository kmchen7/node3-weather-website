// starting point to node js application
// express is a function that is run to create an express application
// require core modules before npm modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// app stores the express application
// Define paths for Express Config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// this is to set up dynamic content pages - not static pages
// Setup handlebars views engine and views folder location
app.set('view engine', 'hbs')
// this now allows express to correctly point to views directory
// update views path pointer
app.set('views', viewsPath)
// This is all I need for partials
hbs.registerPartials(partialsPath)
// way to customize server
// 4 distinct pages but 1 coming from static directory
// serves up static pages, Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // render a view template, gets view and converts into html
    // 1st param is view name, 2nd param is config object
    res.render('index', {
        title: 'Weather',
        name: 'Kevin Chen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kevin Chen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kevin Chen',
        helpText: 'This is some helpful text.'
    })
})

// app.com
// app.com/help
// app.com/about
// 1 domain on a single express server
// takes in partial url (help, about), function to do
// send html

// send json for code to process
// res is used to send data back from the server (my computer is acting as/mimicking a server)
// response, res is the response shown in the browser
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        // callback chaining, once geocode is finished, run forecast
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // What I just learned was 1) how to enforce a query parameter
    // 2) How to access query parameter which can be used in this way
    // User types in a URL, my express application, processes the response, extracts the user's
    // desired resources, and then executes some code, then returns the user desire back to screen
})

app.get('/products', (req, res) => {
    // Can only send a response once and not twice (cannot do res.send 2 times)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Kevin Chen',
        errorMsg: 'Help article not found.'
    })
})

// * is the wildcard, catches everything else
// when express gets an incomping request, it matches the url
// to the get routes (continues to look for matches linearly)
// if express gets to the wildcard, then we do the 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin Chen',
        errorMsg: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})