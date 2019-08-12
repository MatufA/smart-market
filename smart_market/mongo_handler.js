const MongoClient = require('mongodb').MongoClient

module.exports.getLabels= async function (db){
    const res = await new Promise(function (resolve, reject) {
        db.listCollections().toArray(function (err, collInfos) {
            if (err) 
                return reject(err);
            var labels = [];
            for (var i = 0; i < collInfos.length; i++) 
                labels.push(collInfos[i].name);   
            return resolve(labels);
        });
    });
    return res;
}

module.exports.makeMainChart= async function (db, collectionsName){
    const promises = collectionsName.map(async name => {
        const collectionsLength = await getCollectionsLength(db, name)
        return collectionsLength
    })
    
    const collsLength = await Promise.all(promises)
    const dataView = {
        label: collectionsName, // supermarket name
        backgroundColor: 'rgb(169,226,138)',
        borderColor: 'rgb(169,226,138)',
        data: collsLength // number of reciepts  
    }
    
    return dataView;
}

const getCollectionsLength = async function (db, collectionName){
    const res = new Promise(function (resolve, reject){
        db.collection(collectionName).find().toArray((err, result) => {
            if (err) 
                return reject(err)  
            console.log(result.length)
            return resolve(result.length)
        })
    })
        return res;   
}
