const express = require('express')
const Record = require('../../models/record')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  try {
    const record = req.body
    await Record.create(record)
    res.redirect('/')
  }
  catch (err) {
    console.log('catch', err)
  }
})

module.exports = router