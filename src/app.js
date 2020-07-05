const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode.js')
const hbs = require('hbs')
const {
    title
} = require('process')
const app = express()
const port = process.env.PORT || 3000
//Define paths
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('view engine',
    'hbs')
app.use(express.static(publicDirectoryPath))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath);
app.set('views', viewsPath);
//Setup handle bars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Suyog'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'SuyogT'


    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please stay safe .Stay home.',
        title: 'Help Page',
        name: 'Suyog'
    })
})
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({
            error: 'Address must be provided'
        })
        return
    }
    geocode(req.query.address, (error, {
        lat,
        lng,
        location
    } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }



        forecast(lat, lng, (err, {
            temp,
            humidity
        }) => {
            if (err) {
                return res.send({
                    err
                })
            }

            res.send({
                forecast: `It is ${temp} degrees outside and humidity is ${humidity}%`,
                location: location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send(({
            error: 'Please provide a search term'
        }))
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 page',
        errMsg: 'Help article not found',
        name: 'Suyog'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errMsg: 'Page not found',
        name: 'Suyog'
    })
})
//Start server
app.listen(port, () => {
    console.log('Server started on port ' + port)
})