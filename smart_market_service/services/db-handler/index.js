const parseRecipt = require('./parser') 
const hdfs = require('./hdfs')
const mongoHandler = require('./mongodb-hanler')
const redisHandler = require('./redis-handler')

let parseToJson = (filePath, type) => {
    if(type.toLowerCase().indexOf('csv') > 0)
        return parseRecipt.parseCsvFile(filePath)

    if(type.toLowerCase().indexOf('xml') > 0)
        return parseRecipt.parseXmlFile(filePath)

    if(type.toLowerCase().indexOf('json') > 0)
        return parseRecipt.parseJsonFile(filePath)

    return
}

exports.uploadReciptToDB = (file) => {
    console.log(file)
    let recipt = parseToJson(file.path, file.mimetype)
    // insert recipt to HDFS
    let path = hdfs.mkDir(null, recipt.name)
    hdfs.create(path, file.path, file.filename)
    // insert recipt to mongodb
    mongoHandler.uploadDocuments(recipt, recipt.name)
    // insert groceries to redis 
    let groceries = []
    recipt.gros.forEach(function(element) {
        groceries.push(element.product_name)
    })
    redisHandler.addGroceries(groceries)
}
