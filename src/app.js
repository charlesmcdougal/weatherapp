const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geoCode = require('./utils/geocode.js')
const getWeather = require('./utils/getweather.js')

const app = express()

//this gets the server port number from an environment variable provided by the host machine
//if not available, default to 3000 for localhost testing purposes
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine in express and 'views' location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve static content (images, etc.)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Charles McDougal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Charles McDougal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Charles McDougal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'No address was provided.'
        })
    }
    
    geoCode(req.query.address, (error, {location, latitude, longitude} = {} ) => { 
        if(error) {
            return res.send({ error })
        } else {
            getWeather(latitude, longitude, (error, {description, temperature, feelsLike, precipitation, cloudCover, humidity} = {} ) => {
                if (error){
                    return res.send({error})
                } else {
                    return res.send({ location, description, temperature, feelsLike, precipitation, cloudCover, humidity })
                }
            });
        }
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Charles McDougal',
        errorMessage: '<p>The page you are looking for could not be found. You can <a href="/help">click here</a> to return to the help page.</p>'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Charles McDougal',
        errorMessage: 'The page you are looking for could not be found. You can <a href="/">click here</a> to return to the main page.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

