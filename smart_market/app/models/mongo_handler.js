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
            console.log(result.length)
            return resolve(result.length)
        })
    })
        return res;   
}



module.exports.getPricesBetweenDates = async function (from_date,to_date,product){
    var from_date1 = from_date.split("-");
    var to_date2 = to_date.split("-");
    
    // console.log(from_date1[0]) // year
    // console.log(from_date1[1]) // month
    // console.log(from_date1[2]) // day
    const collNames = await this.getLabels(this.db)
    const res = new Promise(function (resolve, reject){
        
        collNames.forEach(coll => {
            db.collection(coll).find().toArray((err, result) => {
                result.forEach(element => {
                    var date_in_reciepts = element.date.split("/"); //dateInReciepts[0] - day, dateInReciepts[1] - month, dateInReciepts[2] - year
                    if(    (Number(date_in_reciepts[1]) >= Number(from_date1[1])) 
                        && (Number(date_in_reciepts[1]) <= Number(to_date2[1])) 
                        && (Number(date_in_reciepts[0]) >= Number(from_date1[2])) 
                        && (Number(date_in_reciepts[0]) >= Number(to_date2[2]))     ){
                            var lable_view = []
                            var data_view = []
                            element.gros.forEach(prod => {
                                if (err)  
                                    return reject(err)
                                else if(prod.product_name === product){
                                    lable_view.push(coll)
                                    data_view.push(prod.price)
                                }

                            })
                        return resolve(data_view)
                    }
                });
            })
        });
    })
    const dataView = {
        label: '', 
        backgroundColor: 'rgb(169,226,138)',
        borderColor: 'rgb(169,226,138)',
        data: res // ~~~~~~~~~ data_view is empy here ~~~~~~~~~  
    }

    console.log(res)

    return(res);
    
}
