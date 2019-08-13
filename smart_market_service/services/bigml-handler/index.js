require('dotenv').config()
const bigml = require('bigml')

const conn = new bigml.BigML(process.env.BIGML_USERNAME, process.env.BIGML_API_KEY)

module.exports.createAssociation = function(dataCsv){
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
                            return modelInfo
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

module.exports.getAssociation = function(resource){
    const model = new bigml.Association(conn)
    model.get(resource, function (error, res) {
        if (!error && res && res.code == 200) {
            console.log(res.code)
            console.log(res.object.status.progress)
            if(res.object.status.progress != 1)
                return res.object.status.progress
            else
                return res.object
        }
        return new Error("Fetching Association Model Failed.")
    })
}

