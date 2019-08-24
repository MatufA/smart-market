const MongoClient = require('mongodb').MongoClient

var db = MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, database) => {
            if (err) return console.log(err)  
            db = database.db(process.env.MONGO_DB)
        })

module.exports.getLabels= async function (){
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

module.exports.makeMainChart= async function (collectionsName){
    const promises = collectionsName.map(async name => {
        const collectionsLength = await getCollectionsLength(name)
        return collectionsLength
    })
    
    const collsLength = await Promise.all(promises)

    const dataView = {
        label: '', // supermarket name
        backgroundColor: 'rgb(169,226,138)',
        borderColor: 'rgb(169,226,138)',
        data: collsLength // number of reciepts  
    }
    
    return dataView;
}

const getCollectionsLength = async function (collectionName){
    const res = new Promise(function (resolve, reject){
        db.collection(collectionName).find().toArray((err, result) => {
            if (err) 
                return reject(err)  
            return resolve(result.length)
        })
    })
        return res;   
}

const getCollection = async function(collectionName) {
    const res = new Promise(async function (resolve, reject){
        db.collection(collectionName).find().toArray((err, result) => {
            if (err)  
                return reject(err)
            return resolve(result)
        })
    })
    return res
}

module.exports.getPricesBetweenDates = async function (from_date,to_date,product, callback){
    var from_date1 = from_date.split("-");
    var to_date2 = to_date.split("-");
    
    let collNames = await this.getLabels(this.db)
    collNames = collNames.filter( s => s != "ex_users");
   
    var lable_view = []
    var data_view = []
    var dates_view = []

    const promises = collNames.map(async coll => {
        let collection = await getCollection(coll)
        return collection
    })

    const collections = await Promise.all(promises)

    if (!Array.isArray(collections) || !collections.length)
        return reject(new Error('Empty list'))

    var from = new Date((from_date1[0]), (from_date1[1])-1, (from_date1[2]));  // -1 because months are from 0 to 11
    var to   = new Date((to_date2[0]), (to_date2[1])-1, (to_date2[2]));
    
    collections.forEach(elements =>{
        elements.forEach(element => {
            let date_in_reciepts = element.date.split("/"); 
            var check = new Date((date_in_reciepts[2]), (date_in_reciepts[1])-1, (date_in_reciepts[0]));
            
            if( (check >= from && check <= to) ){
                element.gros.forEach(prod => {
                    if(prod.product_name === product){
                        dates_view.push(element.date)
                        lable_view.push(element.name)
                        data_view.push(prod.price)     
                    }
                })
            }
        })
    })

    callback(lable_view, data_view,dates_view)
}
