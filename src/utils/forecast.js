const request = require('request');
const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=18b2f3e87846c76591b9b55d8aeaf454&query=${encodeURIComponent(lat)},${encodeURIComponent(lng)}&units=f`;
    request({
        url,
        json: true
    }, (error, response) => {

        if (error) {
            callback('No internet', undefined)
        } else if (response.body.error) {
            callback('Cannot locate the co-ordinates', undefined);
        } else {
            callback(undefined, {
                temp: response.body.current.temperature,
                humidity: response.body.current.humidity
            })
        }
    })
}

module.exports = forecast;