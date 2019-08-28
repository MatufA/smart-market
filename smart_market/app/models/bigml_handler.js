require('dotenv').config()
const mongoHandler = require('./mongo_handler')
const bigml = require('bigml')

const conn = new bigml.BigML(process.env.BIGML_USERNAME, process.env.BIGML_API_KEY)



let createAssociation = function(dataCsv, callback){
    var source = new bigml.Source(conn)
    source.create(dataCsv, function(error, sourceInfo) {
        if (!error && sourceInfo) {
            var dataset = new bigml.Dataset(conn)
            dataset.create(sourceInfo, function(error, datasetInfo) {
                if (!error && datasetInfo) {
                    var model = new bigml.Association(conn)
                    model.create(datasetInfo, function (error, modelInfo) {
                        if (!error && modelInfo) {
                            console.log(modelInfo)
                            callback(modelInfo)
                        }
                        return new Error("Creating Association Model Failed.")
                    })
                }
                return new Error("Creating Dataset Failed.")
            })
        }
        return new Error("Creating Source Failed.")
    })
}

let getAssociation = function(resource){
    const model = new bigml.Association(conn)
    model.get(resource, function (error, res) {
        if (!error && res && res.code == 200) {
            console.log(res.code)
            console.log(res.object.status.progress)
            return res.object
        }
        return new Error("Fetching Association Model Failed.")
    })
}

module.exports.makeAssociationWithMongo = function(associaionFilePath){
    createAssociation(associaionFilePath, function(modelInfo) {
        let associaionStatus = 0;
        let associaion;
        while(associaionStatus != 1){
            associaion = getAssociation(modelInfo)
            associaionStatus = associaion.status.progress;
        }
        console.log(associaion)
        return associaion 
    })
}