const mongoHandler = require('../models/mongo_handler')
const redisHandler = require('../models/redis_handler')
const bigmlHandler = require('../models/bigml_handler')

exports.makeChart = (req, res) => {
    var labels = mongoHandler.getLabels()
    labels.then(function(result){
        var dataView = mongoHandler.makeMainChart(result)
        
        dataView.then(function(view){
            
            var back = []
            // random colors for chart
            for(var i = 0; i < view.data.length; i++){
                var backbackgd = 'rgb(' + Math.floor(Math.random() * 255) +',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) +', 0.9 )'
                back.push(backbackgd)
            }
            view.backgroundColor = back
            view.borderColor = back
            view.label = '# of receipts'
  
            redisHandler.getGroceries(function(gros){
              res.render('graph', {collInfos: view, labels: result, gros : gros})
            })
            
        })
    })
  }
  
exports.makeGraphOfPricesInNetworks = (req, res) => {
    const from_date = req.body.from
    const to_date = req.body.to
    const product = req.body.ccexpm

    mongoHandler.getPricesBetweenDates(from_date, to_date ,product, function(networkName, price, dates){
        var headline = product + "  " + from_date + " to " + to_date;
        
        var name = networkName[0]
        var countDataset = 1
        var dataset = []
        var startSet = 0
        var endSet = 0
        
        for(var i = 0;  i < networkName.length; i++){
            if(networkName[i] !== name){
                var dataForset = []
                for(var j = startSet; j < endSet; j++){
                    dataForset[j] = price[j]
                }
                var color = 'rgb(' + Math.floor(Math.random() * 255) +',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) +', 0.9 )';
                dataset.push(
                    { 
                        data: dataForset,
                        label: name,
                        backgroundColor: color,
                        borderColor: color,
                        fill: false
                        }
                );
                startSet = i
                countDataset++
                name = networkName[i]
            }
            endSet++
            
            if(endSet == networkName.length && countDataset != dataset.length){
                if(networkName[i] == name){
                    var dataForset = []
                    for(var j = startSet; j < endSet; j++){
                        dataForset[j] = price[j]
                    }
                    var color = 'rgb(' + Math.floor(Math.random() * 255) +',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) +', 0.9 )';
                    dataset.push(
                        { 
                            data: dataForset,
                            label: name,
                            backgroundColor: color,
                            borderColor: color,
                            fill: false
                            }
                    );
                }
            }
        }

        redisHandler.getGroceries(function(gros){
            res.render('graph2.ejs', {collInfos: dataset, labels: dates, gros : gros, prices : price, dates : dates, headline : headline})
        })
    })
  }

exports.makeGraphOfPurchaseVolume = (req, res) =>{
    let first_from_date = req.body.first_from,
        first_to_date = req.body.first_to,
        second_from_date = req.body.second_from,
        second_to_date = req.body.second_to,          
        product = req.body.ccexpm

    mongoHandler.getProductCountBetweenDates(first_from_date, first_to_date, second_from_date, second_to_date, product, function(data, labels){
        var headline = product + "  " + first_from_date + " to " + first_to_date + " & " + second_from_date + " to " + second_to_date;
        var dataset_first = []
        var x = ["Period 1", "Period 2" ]
        
        labels.forEach(element => {
            var dataForset_first = []
            dataForset_first.push(data.first[element])
            dataForset_first.push(data.second[element])
            var color = 'rgb(' + Math.floor(Math.random() * 255) +',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) +', 0.9 )';
            dataset_first.push(
                { 
                    label: element,
                    backgroundColor: color,
                    borderColor: color,
                    data: dataForset_first
                    }
            );
        })

        redisHandler.getGroceries(function(gros){
            res.render('graph3.ejs', { collInfos: dataset_first, gros : gros, headline : headline, labels: x})
        })
    })
}

exports.makeGraphAssociation = (req, res) =>{
    var labels = mongoHandler.getLabels();
    labels.then(function(result){
        let filePath = __dirname + "/dataset.json";
        
        mongoHandler.getFromMongoTobigMl(result, filePath)
        bigmlHandler.makeAssociationWithMongo(filePath);
    })

    redisHandler.getGroceries(function(gros){
        res.render('graph4.ejs', {gros : gros})
    })
}


