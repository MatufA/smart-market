require('dotenv').config()
const express = require('express')
const hdfsApi = require('./routes/index')

const app = express()
const port = 5000

app.use('/api/hdfs', hdfsApi)

app.listen(port, () => console.log(`app listening on port ${port}!`))