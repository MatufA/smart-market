
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var path = require('path')
var mongoHandler = require('./mongo_handler')


const url = "mongodb+srv://yudadb:database@cluster0-ocyw5.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public/views'))


// Connecting mongoDB
var db
MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
        if (err) return console.log(err)  
        db = database.db("yudaMongoDb")
        app.listen(3000, () => {
            console.log('listening on 3000')  
        })
})


// Getting collection from mongoDB to an Array object called results
// app.get('/', (req, res) => {
//     var cursor = db.collection('r1').find().toArray(function(err, results) {
//         console.log(results[3].ProductName)  //send HTML file populated with quotes here
//     })
//     res.sendFile(__dirname + '/index.html')
// })

// Inserting data to mongoDB
app.post('/quotes', (req, res) => {
    db.collection('Shuffersal').insertMany(
        [
            {
                "id": 123456465,
                "name": "Shuffersal",
                "date": "11/7/19",
                "gros":[      
                    { "product_name": "", "price":15.25},
                    { "product_name": "", "price":15.35},
                    { "product_name": "", "price":15.1}
                ]
            },
            {
                "id": 123132434,
                "name": "Shuffersal",
                "date": "28/6/19",
                "gros":[      
                    { "product_name": "", "price":15.25},
                    { "product_name": "", "price":15.35},
                    { "product_name": "", "price":15.1}
                ]
            }
        ],
        // req.body,
         (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')    
        
        res.redirect('/')  
        
    })
    
    
})



app.get('/', (req, res) => {
    var labels = mongoHandler.getLabels(db)
    labels.then(function(result){
        var dataView = mongoHandler.makeMainChart(db, result)
        dataView.then(function(view){
            // console.log(view)
            var back = []
            // random colors for chart
            for(var i = 0; i <view.label.length; i++){
                var backbackgd = 'rgb(' + Math.floor(Math.random() * 255) +',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) +', 0.5 )'
                back.push(backbackgd)
            }
            view.backgroundColor = back
            view.borderColor = back
            //console.log(view.labels)
            res.render('index.ejs', {collInfos: view})
        })
    }) 
    
    
})
