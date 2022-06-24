const express = require('express')
const Item = require('../../models/item')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  try {
    const item = req.body
    await Item.create(item)
    res.redirect('/')
  }
  catch (err) {
    console.log('catch', err)
  }
})

module.exports = router