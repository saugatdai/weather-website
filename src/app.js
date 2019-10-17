const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define express paths for config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saguat Sigdel'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Saugat Sigdel'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Holus mondus help help helpa gampa',
        title: 'Help',
        name: 'Saugat Sigdel'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        });
    }
    console.log(req.query.address);
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        } else {
            forecast(latitude, longitude, (forecastError, { summary, temperature, precipProbability } = {}) => {
                if (error) {
                    return res.send(forecastError);
                } else {
                    return res.send({summary,temperature,precipProbability,location});
                }
            });
        }
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saugat Sigdel',
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saugat Sigdel',
        message: 'Page not found'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

