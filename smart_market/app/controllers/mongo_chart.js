
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var path = require('path')
var mongoHandler = require('./mongo_handler')
var redisHandler = require('./redis_handler')

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


app.get('/', (req, res) => {
    var labels = mongoHandler.getLabels(db)
    labels.then(function(result){
        var dataView = mongoHandler.makeMainChart(db, result)
        
        dataView.then(function(view){
            
            var back = []
            // random colors for chart
            for(var i = 0; i < view.data.length; i++){
                var backbackgd = 'rgb(' + Math.floor(Math.random() * 255) +',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) +', 0.5 )'
                back.push(backbackgd)
            }
            view.backgroundColor = back
            view.borderColor = back
            view.label = '# of reciepts'

            res.render('index.ejs', {collInfos: view, labels: result})
        })
    })
})
