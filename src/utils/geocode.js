const request = require('request')
// So I just wrote a callback function
// 1. Basically I first called a function w/ 2 parameters of Location and callback function
// 2. I defined the function w/ 2 parameters that takes in a url and makes an asynch call
// 3. Inside the call, once the data is READY, I call the callback function to run
//    that populates the error and data parameters of callback function
const geocode = (address, callback) => {
    // console.log('hello')
    // encode encodes special characters for safer functionality
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXBpZ3V5MTM3MTIiLCJhIjoiY2wwMm5jbWptMTJtYjNpbzAyYzJwb2lleCJ9.nqowv6EUsnJDGZ_9vCVAaw'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode