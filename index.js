const express = require('express') //able to use express
const app = express()
const bodyParser = require('body-parser') //let's you use request.body
const path = require('path')
const { callbackify } = require('util')

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://davidrod1865:David123@ghibli2.lvxc6di.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

// parse application/x-www-form-rsurlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// set the view engine to ejs
app.set('view engine', 'ejs');

// // Connect to the database & connection
client.connect()
    .then((client) => {
        const ghibliMovies = client.db("ghibli2")
        const watchList = ghibliMovies.collection("watch-list")
        
        //creates index page on the local host
            app.get('/', (req, res) => {
                fetchMovies(movies => {
                    let movieDetails = {
                        title: movies.title,
                        movieID: movies.id,
                        description: movies.description,
                        movieImage: movies.image
                    }
                    console.log(movies)
                    res.render('pages/index.ejs',  
                        { movieDetails }
                    )
                })
            })
    
            function fetchMovies(movies){
                fetch(`https://ghibliapi.herokuapp.com/films`)
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                            } else {
                                throw "No Path to API";
                                }
                        })
                    .then(res => {
                        return movies(res);
                    })
                    .catch(err => {console.log('API Error')})
            }
            console.log("Database 3000!")

        app.post('/addMovie', async (req, res) => {

        })
    })
    .catch((err) => console.error('Database not connected!'))

//creates server on localhost:3001
app.listen(3001, () => {
    console.log(`Ghibli in this Bitch!`);
});