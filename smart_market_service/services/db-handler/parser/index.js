const fs = require('fs')
const xmlToJson = require('xml-js')
const csvToJson = require("csvtojson")

exports.parseJsonFile = (filepath) => {
    let file = fs.readFileSync(filepath, 'utf8')
    let recipt = JSON.parse(file)
    return {
        "id": recipt.id,
        "name": recipt.name,
        "date": recipt.date,
        "gros": recipt.gros
    }
}

exports.parseXmlFile = (filepath) => {
    let file = fs.readFileSync(filepath, 'utf8')
    let recipt = xmlToJson.xml2json(file, {compact: true, spaces: 4})
    return {
        "id": recipt.id,
        "name": recipt.name,
        "date": recipt.date,
        "gros": recipt.gros
    }
}

exports.parseCsvFile = async (filepath) => {
    let fullRecipt = await csvToJson().fromFile(filepath)
    const recipt = await Promise.all(fullRecipt)
    console.log(recipt)
    return {
        "id": recipt.id,
        "name": recipt.name,
        "date": recipt.date,
        "gros": recipt.gros
    }
}
