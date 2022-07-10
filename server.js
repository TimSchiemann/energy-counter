const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const app = express()


let db,
    collection

const dbConnectionString = process.env.DB_STRING,
    dbName = 'energy-counter'

MongoClient.connect(dbConnectionString)
.then(client => {
    console.log(`Connected to Database ${dbName}`)
    db = client.db(dbName)
    collection = db.collection('electricity')
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || PORT}`)
})

// app.get('/', async (request, response) => {
//     try {
//         response.render('index.ejs')
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
// })

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    collection.find().toArray()
    .then(results => {
        console.log(results)
        res.render('index.ejs', {electricity: results})
    })
    .catch(error => {
        console.log(error)
    })
})

app.post('/electricity', (req, res) => {
    collection.insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
    console.log(req.body)
})




