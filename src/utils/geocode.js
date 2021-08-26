const request = require('postman-request');

const geoCode = (address, callback) => {
    const mapboxAPIhttpRequest = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoibWNkb3VnYWxjczciLCJhIjoiY2txYXFsNWVwMDBoaTJwczE3NXJpbGRjMyJ9.48Tl1kR2bYxRRF3IrilZ-g&limit=1';
    request({ url: mapboxAPIhttpRequest, json: true}, (error, {body} = {} ) => {
        if (error) {
            callback('Unable to connect to the geo-location Service. Please check your network settings and try again.');
        }else if (body.message){
            callback('Unable to find the specified location.');
        } else if (body.features.length === 0) {
            callback('There is no location with that name.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geoCode;