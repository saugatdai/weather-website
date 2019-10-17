const request = require('request');

const getGeocode = (location, callback) => {
    console.log(`For location ${location}`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic2F1Z2F0ZGFpIiwiYSI6ImNrMWo5YnJheTF5bjUzaHA2NWdzMjNmOWcifQ.fAZrMi98apkNlhH1GN4zzA&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to the geolocation service. ');
        }else if(body.features.length === 0){
            callback('Unable to recognize the place. ');
        }else{
            callback(null,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name 
            });
        }
    });
};

module.exports = getGeocode;