const express = require('express')
const Category = require('../../models/category')
const Record = require('../../models/record')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    const record = await Record.findById(id).lean()
    const categories = await Category.find().sort({ id: 1 }).lean()
    const recordId = Number(record.categoryId)
    console.log(recordId)
    res.render('edit', { record, categories, recordId })
  }
  catch (err) {
    console.log('catch', err)
  }
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