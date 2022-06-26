// import express
const express = require('express');
// This is something useless I'm adding as a comment
const methodOverride = require('method-override')
// configure the app settings (used by app.listen) for 4000 or Heroku
const PORT = process.env.PORT || 4000;
const controllers = require('./controllers')
// Updated with the env vars

// create instance
const app = express();
const bodyParser = require('body-parser')

// app configs - app.set()
app.set('view engine', 'ejs')

/* 
EXPRESS Middleware - a later topic - this code will run for every route
*/
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(methodOverride('_method'))
// method override middleware
// convert a get/post request to a delete (or put) request
app.use(methodOverride('_method'))

// body-parser middleware -> intercept the data from our post request
// take all of the data in the url-string content and create an object - req.params 
// request body -> data - parsed by the middleware

app.use(express.urlencoded({ extended: false }))


// CONTROLLERS 

app.use('/tutorials', controllers.tutorials) // "products" router
app.use('/reviews', controllers.reviews) // "products" router

/* 
    EXPRESS Routing: express provides route methods that will intercept requests to the server:
    1. filter by method - app.get will only run if the type of request has a GET method
    2. match the url path argument - a requested url from the client - if a match is found a call back function is called
    3. the callback function - provided two arguments by express representing data/methods concerning the request and the response. 
        3a - request {} - a request object provides information about the request made by the client
        3b - response {} - a response object is a collection of properties / methods. 
        3c - response.send() - a response method that closes response cycle -> send back info/data to the browser
    
    Note: A response method call is required for every request otherwise the server will "hang" and timeout after 30-60 seconds
*/


// Products "Home" route 

app.get('/', (request, response) => response.render(`home.ejs`))

/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))