const request = require('postman-request');

const getWeather = (lat, long, callback) => {
    const weatherAPIhttpRequest = 'http://api.weatherstack.com/current?access_key=c9afcfdfd25c4f8a18c8d950da7d0f82&query=' + 
    lat + ',' + long + '&units=m';

    request({ url: weatherAPIhttpRequest, json: true }, (error, {body} = {} ) => {
        if (error) {
            callback('Unable to connect to the Weather Service. Please check your network settings and try again.');
        } else if (body.error){
            callback('Unable to find the specified location.');
        } else {
            callback(undefined, {
                location: body.location.name,
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                precipitation: body.current.precip,
                cloudCover: body.current.cloudcover,
                humidity: body.current.humidity
            });
        }
    });
}

module.exports = getWeather;