const MongoClient = require('mongodb').MongoClient

var db = MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, database) => {
            if (err) return console.log(err)  
            db = database.db(process.env.MONGO_DB)
        })

exports.uploadDocuments = (recipt, supermarketName) => {
    db.collection(supermarketName).insertOne(recipt,
         (err, result) => {
        if (err) return console.log(err)
        console.log(result)
        console.log('saved to database')        
    })
}