const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a53f8edde6536611f21a527508c4d484&query=' + latitude + ',' + longitude + '&units=f'
    // url alone still sets up url property
    request({url, json: true}, (error, {body}) => {
        // Check if error has data - if so then error has occurred
        // Ever error or response will hold data (black and white, 1 or the other, binary)
        if (error) {
            // error is more for low level error (if wifi is off)
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.error){
            callback('Unable to find location', undefined)
            // console.log(response.body.error)
        }
        else {
            // const data = JSON.parse(response.body)
            // request option parses json for us
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast