// console.log('Client side javascript file is loaded!')

// Script is running in client side javascript
// fetches data from url, performs a callback function on data
// converts it to json and then logs it in webpage
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// we'll create a form that will be rendered in the browser
// instead of being dumped in console


// I get back the javascript object representing that element
// and I can now manipulate that html element
const weatherForm = document.querySelector('form')
// search is a representation of input tag
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

// add an event listener
// name of event, callback function
// I get an event object back as a parameter
weatherForm.addEventListener('submit', (e) => {
    // prevents default action of refreshing page
    e.preventDefault()
    // extracts the input value typed into the form  
    const location = search.value
    // console.log(location)
    messageOne.textContent ='Loading...'
    messageTwo.textContent = ' '
    // fetch is client side javascript (runs on the client's browser page)
    // node is more server side javascript w/ node
    // Now we only fetch the data when submit button occurs
    fetch('/weather?address=' + location).then((response) => {
        // response.json takes a response object, the .json method
        // turns the json to a javascript object as a promise to resolve
        // into a javascript object, the .then takes the data and extracts
        // data
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })
})