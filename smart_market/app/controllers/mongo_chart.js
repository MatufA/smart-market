
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


// Getting collection from mongoDB to an Array object called results
// app.get('/', (req, res) => {
//     var cursor = db.collection('r1').find().toArray(function(err, results) {
//         console.log(results[3].ProductName)  //send HTML file populated with quotes here
//     })
//     res.sendFile(__dirname + '/index.html')
// })

app.post('/quotes', (req, res) => {
    var r1 = [
        {
            "id": 49661700,
            "name": "Osher Ad",
            "date": "5/6/19",
            "gros":[      
                { "product_name": "Ski 5%", "price":4.75},
                { "product_name": "Milk 3%", "price":5.94},
                { "product_name": "Parmezanh Cheese - 200gr", "price":22.9},
                { "product_name": "Sesame Rolls - 6 Pack", "price":13.49},
                { "product_name": "Eggs L - 12 Units", "price":11.3},
                { "product_name": "Toilet Paper - 32 Units", "price":37.9},
                { "product_name": "Tommatos - 1KG", "price":3.89},
                { "product_name": "Cucumber - 1KG", "price":4.79},
                { "product_name": "Watermelom - 1KG", "price":3.69},
                { "product_name": "Pita Bread - 13 Units", "price":10.99},
                { "product_name": "Red Onion - 1KG", "price":4.89},
                { "product_name": "Fairy Clean Liquid - 650gr", "price":9.99},
                { "product_name": "Shampoo Neka7 - 750 gr", "price":9.9},
                { "product_name": "Turkish Coffee - 100gr", "price":6.99},
                { "product_name": "Butter - 200gr", "price":5.25},
                { "product_name": "Para Chooclate", "price":5.79},
                { "product_name": "Ricotta Cheese - 200gr", "price":11.99},
                { "product_name": "Nutella - 750gr", "price":23.99},
                { "product_name": "Carrot  - 1KG", "price":4.99}
            ]
        },
        {
            "id": 442221667,
            "name": "Osher Ad",
            "date": "16/6/19",
            "gros":[      
                { "product_name": "Turkish Coffee - 100gr", "price":8.99},
                { "product_name": "Para Chooclate", "price":6.29},
                { "product_name": "Red Onion - 1KG", "price":5.29},
                { "product_name": "Eggs M - 12 Units", "price":10.4},
                { "product_name": "Ricotta Cheese - 200gr", "price":12.49},
                { "product_name": "Tommatos - 1KG", "price":3.89},
                { "product_name": "Cucumber - 1KG", "price":4.79},
                { "product_name": "Pita Bread - 13 Units", "price":10.99},
                { "product_name": "Tuna Starkist - 4 Units", "price":23.99},
                { "product_name": "Milk 3%", "price":5.94},
                { "product_name": "Cotton Sticks Ear Cleaning - 100 Units", "price":2.99},
                { "product_name": "Shoghi Cornflakes - 500gr", "price":21.90},
                { "product_name": "Canola Oil - 750gr", "price":13.49},
                
            ]
        },
        {
            "id": 46822571,
            "name": "Osher Ad",
            "date": "19/6/19",
            "gros":[      
                { "product_name": "Butter - 200gr", "price":5.25},
                { "product_name": "Turkish Coffee - 100gr", "price":8.99},
                { "product_name": "Red Onion - 1KG", "price":5.29},
                { "product_name": "Toilet Paper - 32 Units", "price":29.9},
                { "product_name": "Eggs M - 12 Units", "price":10.4},
                { "product_name": "Tommatos - 1KG", "price":3.89},
                { "product_name": "Cucumber - 1KG", "price":4.79},
                { "product_name": "Carrot  - 1KG", "price":4.99},
                { "product_name": "Potato - 1KG", "price":5.49},
                { "product_name": "Sweet Potato - 1KG", "price":10.49},
                { "product_name": "Gamla Marlo Red Wine", "price":52.99},
                { "product_name": "Challah Bread", "price":4.49},
                { "product_name": "Olive Oil - 750gr", "price":31.99},
                { "product_name": "Eggplant - 1KG", "price":10.99},
                { "product_name": "Tahene El Erez - 500gr", "price":13.9},
                { "product_name": "Hummus Ahla - 750gr", "price":11.49},
                { "product_name": "Basmati Rice - 1KG", "price":13.9},
                { "product_name": "Napoleaon Cake - 600gr", "price":31.99},
                { "product_name": "Salt - 1KG", "price":1.9},
                { "product_name": "Sugar - 1KG", "price":4.29},
                { "product_name": "Green Grapes - 1KG", "price":28.99}
            ]
        },
        {
            "id": 99964815,
            "name": "Osher Ad",
            "date": "24/6/19",
            "gros":[      
                { "product_name": "Turkish Coffee - 100gr", "price":6.99},
                { "product_name": "Para Chooclate", "price":6.29},
                { "product_name": "Red Onion - 1KG", "price":5.29},
                { "product_name": "Eggs M - 12 Units", "price":10.4},
                { "product_name": "Ricotta Cheese - 200gr", "price":12.49},
                { "product_name": "Tommatos - 1KG", "price":2.99},
                { "product_name": "Cucumber - 1KG", "price":3.99},
                { "product_name": "Pita Bread - 13 Units", "price":10.99},
                { "product_name": "Tuna Starkist - 4 Units", "price":23.99},
                { "product_name": "Milk 3%", "price":5.94},
                { "product_name": "Cotton Sticks Ear Cleaning - 100 Units", "price":3.99},
                { "product_name": "Shoghi Cornflakes - 500gr", "price":23.90},
                { "product_name": "Canola Oil - 750gr", "price":13.49},
                { "product_name": "Nutella - 750gr", "price":24.49}
            ]
        },
        {
            "id": 77554444,
            "name": "Osher Ad",
            "date": "1/7/19",
            "gros":[      
                { "product_name": "Ski 5%", "price":4.75},
                { "product_name": "Milk 3%", "price":5.94},
                { "product_name": "Parmezanh Cheese - 200gr", "price":21.9},
                { "product_name": "Sesame Rolls - 6 Pack", "price":13.49},
                { "product_name": "Eggs L - 12 Units", "price":11.3},
                { "product_name": "Toilet Paper - 32 Units", "price":36.9},
                { "product_name": "Tommatos - 1KG", "price":4.89},
                { "product_name": "Cucumber - 1KG", "price":4.99},
                { "product_name": "Watermelom - 1KG", "price":4.69},
                { "product_name": "Red Onion - 1KG", "price":5.29},
                { "product_name": "Gamla Marlo Red Wine", "price":49.9},
                { "product_name": "Hummus Ahla - 750gr", "price":12.49},
                { "product_name": "Tuna Starkist - 4 Units", "price":23.49},
                { "product_name": "Pita Bread - 13 Units", "price":10.9},
                { "product_name": "Turkish Coffee - 100gr", "price":8.99},
                { "product_name": "Butter - 200gr", "price":5.25}
            ]
        },
        {
            "id": 14228796,
            "name": "Osher Ad",
            "date": "12/7/19",
            "gros":[      
                { "product_name": "Turkish Coffee - 100gr", "price":6.99},
                { "product_name": "Milk 3%", "price":5.94},
                { "product_name": "Parmezanh Cheese - 200gr", "price":21.9},
                { "product_name": "Sesame Rolls - 6 Pack", "price":13.49},
                { "product_name": "Eggs L - 12 Units", "price":11.3},
                { "product_name": "Toilet Paper - 32 Units", "price":36.9},
                { "product_name": "Tommatos - 1KG", "price":4.89},
                { "product_name": "Cucumber - 1KG", "price":4.99},
                { "product_name": "Watermelom - 1KG", "price":4.69},
                { "product_name": "Pita Bread - 13 Units", "price":11.99},
                { "product_name": "Red Onion - 1KG", "price":5.29},
                { "product_name": "Gamla Marlo Red Wine", "price":49.9},
                { "product_name": "Hummus Ahla - 750gr", "price":12.49},
                { "product_name": "Tuna Starkist - 4 Units", "price":23.49},
                { "product_name": "Pita Bread - 13 Units", "price":10.9},
                { "product_name": "Turkish Coffee - 100gr", "price":8.99},
                { "product_name": "Butter - 200gr", "price":5.25}
            ]
        }
    
    ]
    
    db.collection('Osher Ad').insertMany(r1 ,
        // req.body,
         (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')

        var groceries = []
        r1.forEach(function(gros) {
            gros.gros.forEach(function(element) {
                groceries.push(element.product_name)
            });
        })
        // Adding gro
        redisHandler.addGroceries(groceries)
        res.redirect('/')  
        
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

            //res.render('index.ejs', {collInfos: view, labels: result, gros : gros})
            res.render('index.ejs', {collInfos: view, labels: result})
        })
    })
})
