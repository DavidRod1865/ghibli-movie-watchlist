//able to use express
const express = require('express') 
const app = express()

//let's you use request.body
const bodyParser = require('body-parser') 
const path = require('path')
const { callbackify } = require('util')

// Database Route
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://davidrod1865:David123@ghibli2.lvxc6di.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use View Engine
app.set('view engine', 'ejs');

// // Connect to the Database & Render Page
client.connect()
    .then((client) => {
        const ghibliMovies = client.db("ghibli2")
        const watchList = ghibliMovies.collection("watch-list")
        
        //creates index page on the local host
        app.get('/', async (req, res) => {
            fetch(`https://ghibliapi.herokuapp.com/films`)
                .then(res => {
                    if (res.ok){
                        let data = res.json()
                        return data
                        } else {
                            console.log("API Not Connected")
                            }
                    })
                .then(data => {
                    Object.keys(data).forEach( key => {
                        console.log(`${key} : ${data[key]}`);
                        });
                    console.log(data[0].id)
                    console.log(data[0].title)
                    console.log(data[0].director)
                })
                .catch(err => { 
                    console.log('API Error') 
                })
            res.render('pages/index.ejs')
        })
    console.log("Database 3000!")
    })
    .catch((err) => console.error('Database not connected!'))

//creates server on localhost:3001
app.listen(3001, () => {
    console.log(`Ghibli in this Bitch!`);
});