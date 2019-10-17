const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/386cae0f1ccb82e58c2c405ea1d71c6a/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Could not connect to the forecast server');
        } else if (body.error) {
            callback('could not forecast for the co-ordinate provided');
        } else {
            callback(null, {summary: body.daily.data[0].summary, temperature: body.currently.temperature, precipProbability: body.currently.precipProbability});
        }
    });
};

module.exports = forecast;