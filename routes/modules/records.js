const express = require('express')
const Category = require('../../models/category')
const Record = require('../../models/record')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const id = req.params.id
    const record = await Record.findOne({ userId, id }).lean()
    const categories = await Category.find().sort({ id: 1 }).lean()
    const recordId = Number(record.categoryId)
    res.render('edit', { record, recordId, categories, id })
  }
  catch (err) {
    console.log('catch', err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const id = req.params.id
    const record = req.body
    const result = await Record.findOne({ userId, id })
    Object.keys(record).forEach(async key => {
      result[key] = record[key]
    })
    await result.save()
    res.redirect('/')
  }
  catch (err) {
    console.log('catch', err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const id = req.params.id
    const result = await Record.findOne({ userId, id })
    await result.remove()
    res.redirect('/')
  }
  catch (err) {
    console.log('catch', err)
  }
})

router.post('/', async (req, res) => {
  try {
    const record = req.body
    record.userId = req.user._id
    await Record.create(record)
    res.redirect('/')
  }
  catch (err) {
    console.log('catch', err)
  }
})

module.exports = router