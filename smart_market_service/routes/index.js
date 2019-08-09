const router = require('express').Router()
const bodyParser = require('body-parser')
const logger = require('../services/middlewareLogger')
import { create, listDir, read, mkDir } from '../services/hdfs/index'

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(logger)

router.post('/upload', (req, res) => {
    create(pathDir='/benchmarks/data', file=req.files, fileName=Date.now() + '_' + file.originalname)
})
