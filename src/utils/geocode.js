const request = require('request');
const axios = require('axios');

const geocode = (address, callback) => {
    const geoCodeUrl =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent
    (address)}.json?access_token=pk.eyJ1IjoiZHJheDEyMTIiLCJhIjoiY2tid2s2MTlxMGdxazJ4dGJibzJ2cDRwZCJ9.S72umgI9DdrMeNz0R48rig&limit=1`;
    request({
            url: geoCodeUrl,
            json: true,
        },
        (err, res) => {
            if (err) {
                callback('No internet', undefined)
            } else if (res.body.features.length === 0) {
                callback("Couldnt find the place entered", undefined);
            } else {
                callback(undefined, {

                    lat: res.body.features[0].geometry.coordinates[1],
                    lng: res.body.features[0].geometry.coordinates[0],
                    location: res.body.features[0].place_name
                })

            }
        }
    );

}

// const geocode = (address) => {

//     const geoCodeUrl =
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent
//     (address)}.json?access_token=pk.eyJ1IjoiZHJheDEyMTIiLCJhIjoiY2tid2s2MTlxMGdxazJ4dGJibzJ2cDRwZCJ9.S72umgI9DdrMeNz0R48rig&limit=1`;
//     const promise = new Promise((resolve, reject) => {

//         request({
//                 url: geoCodeUrl,
//                 json: true,
//             },
//             (err, res) => {

//                 if (err) {

//                     reject('No internet')
//                 } else if (res.body.features.length === 0) {
//                     reject("Couldnt find the place entered");
//                 } else {

//                     resolve({
//                         lat: res.body.features[0].geometry.coordinates[1],
//                         lng: res.body.features[0].geometry.coordinates[0],
//                         location: res.body.features[0].place_name
//                     })


//                 }
//             }
//         );
//     })

//     return promise;

// }


module.exports = geocode