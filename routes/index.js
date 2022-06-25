const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const categories = require('./modules/categories')

router.use('/records', records)
router.use('/categories', categories)
router.use('/', home)

module.exports = router