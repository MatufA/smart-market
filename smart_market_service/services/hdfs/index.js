const request = require('request')
const fs = require("fs")
const urlParse = require('url')
const config = require('./config')

const hdfsUrl = function(path){
    return config.protocol + config.host + ':' + + config.port + config.path + path; 
}

module.exports.listDir = () =>function(dirPath){
    const fullUrl = hdfsUrl(dirPath)
    const options = { 
        method: 'GET',
        url: fullUrl,
        qs: { op: 'LISTSTATUS' },
        headers: { 'cache-control': 'no-cache' } 
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
    })
}

module.exports.mkDir = () =>function(path,dirName, perm='777'){
    const fullUrl = hdfsUrl(path=path + '/' + dirName)
    const options = { 
        method: 'PUT',
        url: fullUrl,
        qs: { op: 'MKDIRS', permission: perm },
        headers: { 'cache-control': 'no-cache' } 
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
    })
}

module.exports.create= () => function(pathDir, file, fileName){
    const fullUrl = hdfsUrl(path=pathDir + '/' + fileName)
    const options = { 
        method: 'PUT',
        url: fullUrl,
        qs: { op: 'CREATE', overwrite: 'true' },
        headers: { 'cache-control': 'no-cache' } 
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
        let url_parts = urlParse.parse(response.headers.location, true)
        
        let optionsSec = { 
            method: 'PUT',
            url: config.protocol + config.host + ':' + url_parts.port + url_parts.pathname,
            qs: { op: 'CREATE', 
            overwrite: 'true', 
            namenoderpcaddress: config.host + ':' + url_parts.query.namenoderpcaddress.split(':')[1]},
            headers: { 'cache-control': 'no-cache',
                'content-type': 'application/octet-stream' } 
            }

        fs.createReadStream(file)
        .pipe(request(optionsSec))
        .on('response', function(response) {
            console.log(response.statusCode) 
            return response.statusCode
        }).on('error', function(err) {
            console.error(err)
            return response.statusCode
        })
    })
}

module.exports.read= () => function(pathDir, fileName){
    const fullUrl = hdfsUrl(path=pathDir + '/' + fileName)
    const options = { 
        method: 'GET',
        url: fullUrl,
        qs: { op: 'OPEN' },
        headers: { 'cache-control': 'no-cache' } 
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
        let url_parts = urlParse.parse(response.headers.location, true)
        
        let optionsSec = { 
            method: 'PUT',
            url: config.protocol + config.host + ':' + url_parts.port + url_parts.pathname,
            qs: { op: 'OPEN', 
            offset: 0,
            namenoderpcaddress: config.host + ':' + url_parts.query.namenoderpcaddress.split(':')[1] },
            headers: { 'cache-control': 'no-cache' } 
            }

        request(optionsSec)
        .on('response', function(response) {
            return response
        }).on('error', function(err) {
            throw new Error(err)
        })
    })
}
