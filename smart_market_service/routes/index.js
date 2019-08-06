const router = require('express').Router()
const bodyParser = require('body-parser')
const logger = require('../services/middlewareLogger')
const hdfs = require('../services/hdfs/index')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(logger)
